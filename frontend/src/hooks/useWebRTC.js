import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { useE2EEncryption } from './useE2EEncryption';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    // Free TURN servers from open-relay (metered.ca) — replace with your own for production
    ...(import.meta.env.VITE_TURN_URL ? [{
      urls: import.meta.env.VITE_TURN_URL,
      username: import.meta.env.VITE_TURN_USERNAME,
      credential: import.meta.env.VITE_TURN_CREDENTIAL,
    }] : []),
  ],
};

export function useWebRTC(session, user, isHost, isParticipant) {
  const [socket, setSocket] = useState(null); // eslint-disable-line no-unused-vars
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isConnecting, setIsConnecting] = useState(true);
  const [remoteUser, setRemoteUser] = useState(null);
  const [remoteCursor, setRemoteCursor] = useState(null);
  const [remoteCode, setRemoteCode] = useState(null);

  const { init: initEncryption, completeKeyExchange, encrypt, decrypt, getPublicKeyB64, isReady: isEncryptionReady } = useE2EEncryption();

  const peerConnection = useRef(null);
  const screenStream = useRef(null);
  const connectionTimeoutRef = useRef(null);
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);
  const keyExchangeDoneRef = useRef(false);
  const stopScreenShareRef = useRef(null);
  const pendingOfferRef = useRef(null); // store offer if stream not ready yet

  // Keep localStreamRef in sync with state
  useEffect(() => {
    localStreamRef.current = localStream;
  }, [localStream]);

  // Initialize socket connection
  useEffect(() => {
    if (!session || !user || (!isHost && !isParticipant)) return;

    const API_URL = import.meta.env.VITE_SOCKET_URL || 
      import.meta.env.VITE_API_URL?.replace('/api', '') || 
      'http://localhost:5000';

    const socketInstance = io(API_URL, {
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionAttempts: 3,
      reconnectionDelay: 3000,
      reconnectionDelayMax: 10000,
      timeout: 60000,
      autoUnref: false,
    });

    connectionTimeoutRef.current = setTimeout(() => {
      setIsConnecting(false);
      toast.error('Server is waking up — please wait 30 seconds and refresh the page.');
    }, 70000);

    socketInstance.on('connect', async () => {
      console.log('Socket connected:', socketInstance.id);
      const pubKeyB64 = await initEncryption();
      socketInstance.emit('e2e-public-key', { roomId: session._id, publicKey: pubKeyB64 });
      socketInstance.emit('join-room', { roomId: session._id, userId: user._id, userName: user.name });
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      toast.error('Failed to connect to server. Please check your connection.');
      setIsConnecting(false);
    });

    socketInstance.on('existing-users', (users) => {
      if (connectionTimeoutRef.current) clearTimeout(connectionTimeoutRef.current);
      if (users.length > 0) {
        setRemoteUser(users[0]);
        // If stream is ready, create offer now. Otherwise store and wait.
        if (localStreamRef.current) {
          createOfferRef.current(users[0].socketId);
        } else {
          pendingOfferRef.current = users[0].socketId;
        }
      }
      setIsConnecting(false);
    });

    socketInstance.on('user-joined', (userData) => {
      setRemoteUser(userData);
      toast.success(`${userData.userName} joined the call`);
      // Reset key exchange so new peer can exchange keys
      keyExchangeDoneRef.current = false;
      const pubKeyB64 = getPublicKeyB64();
      if (pubKeyB64) {
        socketInstance.emit('e2e-public-key', { roomId: session._id, publicKey: pubKeyB64 });
      }
      if (isHost) {
        if (localStreamRef.current) {
          createOfferRef.current(userData.socketId);
        } else {
          pendingOfferRef.current = userData.socketId;
        }
      }
    });

    socketInstance.on('user-left', (userData) => {
      setRemoteUser(null);
      setRemoteStream(null);
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
      toast.info(`${userData.userName} left the call`);
    });

    // BUG FIX #1: guard against infinite key exchange loop
    socketInstance.on('e2e-public-key', async ({ publicKey }) => {
      if (keyExchangeDoneRef.current) return; // already have a shared key, ignore
      await completeKeyExchange(publicKey);
      keyExchangeDoneRef.current = true;
      // Send our key back only once so the other side can also derive
      const myPubKey = getPublicKeyB64();
      if (myPubKey) {
        socketInstance.emit('e2e-public-key', { roomId: session._id, publicKey: myPubKey });
      }
    });

    socketInstance.on('code-change', async ({ encryptedCode, language, userName }) => {
      const decryptedCode = await decrypt(encryptedCode);
      setRemoteCode({ code: decryptedCode, language, userName });
    });

    socketInstance.on('code-cursor', ({ line, column, userName }) => {
      setRemoteCursor({ line, column, userName });
    });

    socketInstance.on('offer', async ({ offer, from, userName }) => {
      console.log('Received offer from:', userName);
      try {
        await handleOfferRef.current(offer, from);
      } catch (e) {
        console.error('Error in offer handler:', e);
      }
    });

    socketInstance.on('answer', async ({ answer }) => {
      if (!peerConnection.current) return;
      try {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (e) {
        console.error('Error handling answer:', e);
      }
    });

    socketInstance.on('ice-candidate', async ({ candidate }) => {
      if (!peerConnection.current) return;
      try {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error('Error handling ICE candidate:', e);
      }
    });

    socketInstance.on('chat-message', (data) => {
      setChatMessages((prev) => [...prev, data]);
    });

    socketInstance.on('user-audio-toggle', ({ userId, enabled }) => {
      console.log(`User ${userId} ${enabled ? 'enabled' : 'disabled'} audio`);
    });

    socketInstance.on('user-video-toggle', ({ userId, enabled }) => {
      console.log(`User ${userId} ${enabled ? 'enabled' : 'disabled'} video`);
    });

    // When remote user starts/stops screen share, force video element refresh
    socketInstance.on('user-screen-share-started', () => {
      setTimeout(() => {
        if (peerConnection.current) {
          const receivers = peerConnection.current.getReceivers();
          const videoReceiver = receivers.find((r) => r.track?.kind === 'video');
          if (videoReceiver?.track) {
            const newStream = new MediaStream([videoReceiver.track]);
            // Also add audio tracks
            receivers.filter((r) => r.track?.kind === 'audio').forEach((r) => newStream.addTrack(r.track));
            setRemoteStream(newStream);
          }
        }
      }, 500);
    });

    socketInstance.on('user-screen-share-stopped', () => {
      setTimeout(() => {
        if (peerConnection.current) {
          const receivers = peerConnection.current.getReceivers();
          const tracks = receivers.map((r) => r.track).filter(Boolean);
          if (tracks.length > 0) {
            setRemoteStream(new MediaStream(tracks));
          }
        }
      }, 500);
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    return () => {
      if (connectionTimeoutRef.current) clearTimeout(connectionTimeoutRef.current);
      socketInstance.disconnect();
    };
  }, [session, user, isHost, isParticipant]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!session || !user || (!isHost && !isParticipant)) return;

    let acquired = null;

    const getLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        acquired = stream;
        localStreamRef.current = stream;
        setLocalStream(stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
        // Create a silent audio-only stream as fallback so WebRTC still works
        try {
          const audioOnly = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
          acquired = audioOnly;
          localStreamRef.current = audioOnly;
          setLocalStream(audioOnly);
          toast('No camera found — connecting with audio only', { icon: '🎤' });
        } catch {
          // No media at all — create empty stream so WebRTC can still connect
          const emptyStream = new MediaStream();
          localStreamRef.current = emptyStream;
          setLocalStream(emptyStream);
          setIsVideoEnabled(false);
          setIsAudioEnabled(false);
          if (error.name === 'NotAllowedError') {
            toast.error('Camera/microphone access denied. Please allow permissions and refresh.');
          } else {
            toast('No camera/mic found — connecting without media', { icon: '⚠️' });
          }
        }
      }

      // Fire pending offer now that stream (or fallback) is ready
      if (pendingOfferRef.current) {
        const pending = pendingOfferRef.current;
        pendingOfferRef.current = null;
        setTimeout(() => createOfferRef.current(pending), 100);
      }
      setIsConnecting(false);
    };

    getLocalStream();

    // BUG FIX #3: capture the stream in closure so cleanup always has the right reference
    return () => {
      if (acquired) {
        acquired.getTracks().forEach((track) => track.stop());
      }
    };
  }, [session, user, isHost, isParticipant]);

  // BUG FIX #2 & #4: use refs for createPeerConnection/createOffer/handleOffer
  // so socket listeners registered at mount always call the latest version
  const createPeerConnectionRef = useRef(null);
  const createOfferRef = useRef(null);
  const handleOfferRef = useRef(null);

  // Keep these refs updated on every render
  createPeerConnectionRef.current = (remoteSocketId) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    const stream = localStreamRef.current;

    if (stream) {
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    }

    pc.ontrack = (event) => {
      // Always create a new MediaStream reference so React re-renders the video element
      const newStream = new MediaStream();
      event.streams[0].getTracks().forEach((track) => newStream.addTrack(track));
      setRemoteStream(newStream);
    };

    // BUG FIX #4: use socketRef.current instead of stale socket state
    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('ice-candidate', { candidate: event.candidate, to: remoteSocketId });
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'connected') toast.success('Connected to peer');
      else if (pc.connectionState === 'failed') toast.error('Connection failed. Please refresh and try again.');
      else if (pc.connectionState === 'disconnected') toast.info('Connection lost. Attempting to reconnect...');
    };

    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === 'failed') toast.error('Network connection failed. Check your firewall settings.');
    };

    peerConnection.current = pc;
    return pc;
  };

  createOfferRef.current = async (remoteSocketId) => {
    const sock = socketRef.current;
    const stream = localStreamRef.current;
    if (!sock || !stream) return;

    const pc = createPeerConnectionRef.current(remoteSocketId);
    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      sock.emit('offer', { offer, to: remoteSocketId });
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  handleOfferRef.current = async (offer, remoteSocketId) => {
    const sock = socketRef.current;

    // Wait up to 10s for stream to be ready before handling offer
    let attempts = 0;
    while (!localStreamRef.current && attempts < 100) {
      await new Promise((r) => setTimeout(r, 100));
      attempts++;
    }

    const stream = localStreamRef.current;
    if (!sock || !stream) {
      console.error('Cannot handle offer: socket or stream not ready');
      return;
    }

    const pc = createPeerConnectionRef.current(remoteSocketId);
    try {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sock.emit('answer', { answer, to: remoteSocketId });
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const toggleAudio = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioEnabled(audioTrack.enabled);
      if (socketRef.current && session) {
        socketRef.current.emit('toggle-audio', { roomId: session._id, enabled: audioTrack.enabled });
      }
    }
  }, [session]);

  const toggleVideo = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
      if (socketRef.current && session) {
        socketRef.current.emit('toggle-video', { roomId: session._id, enabled: videoTrack.enabled });
      }
    }
  }, [session]);

  const stopScreenShare = useCallback(() => {
    if (!screenStream.current) return;
    screenStream.current.getTracks().forEach((track) => track.stop());
    screenStream.current = null;
    setIsScreenSharing(false);

    // Restore camera track or add a black track placeholder
    if (peerConnection.current) {
      const sender = peerConnection.current.getSenders().find((s) => s.track?.kind === 'video');
      if (sender) {
        const cameraTrack = localStreamRef.current?.getVideoTracks()[0];
        if (cameraTrack) {
          sender.replaceTrack(cameraTrack).catch(() => {});
        } else {
          // No camera — replace with null to keep sender alive
          sender.replaceTrack(null).catch(() => {});
        }
      }
    }

    if (socketRef.current && session) {
      socketRef.current.emit('stop-screen-share', { roomId: session._id });
    }
  }, [session]);

  // Keep stopScreenShareRef current so startScreenShare's onended always calls latest version
  stopScreenShareRef.current = stopScreenShare;

  const startScreenShare = useCallback(async () => {
    // If already sharing, stop first
    if (screenStream.current) {
      stopScreenShareRef.current();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      screenStream.current = stream;
      const screenTrack = stream.getVideoTracks()[0];

      if (peerConnection.current) {
        const sender = peerConnection.current.getSenders().find((s) => s.track?.kind === 'video');
        if (sender) {
          await sender.replaceTrack(screenTrack).catch(() => {});
        } else {
          peerConnection.current.addTrack(screenTrack, stream);
        }
      }

      setIsScreenSharing(true);

      if (socketRef.current && session) {
        socketRef.current.emit('start-screen-share', { roomId: session._id });
      }

      screenTrack.onended = () => stopScreenShareRef.current();
    } catch (error) {
      screenStream.current = null;
      if (error.name !== 'NotAllowedError') {
        console.error('Error starting screen share:', error);
        toast.error('Failed to start screen sharing');
      }
    }
  }, [session]);

  const sendMessage = useCallback((message) => {
    if (socketRef.current && session && user) {
      socketRef.current.emit('chat-message', { roomId: session._id, message, userName: user.name });
    }
  }, [session, user]);

  const sendCodeChange = useCallback(async (code, language) => {
    if (!socketRef.current || !session) return;
    const encryptedCode = await encrypt(code);
    socketRef.current.emit('code-change', { roomId: session._id, encryptedCode, language });
  }, [session, encrypt]);

  const sendCursorPosition = useCallback((line, column) => {
    if (!socketRef.current || !session) return;
    socketRef.current.emit('code-cursor', { roomId: session._id, line, column });
  }, [session]);

  const leaveCall = useCallback(() => {
    if (socketRef.current && session) {
      socketRef.current.emit('leave-room', { roomId: session._id });
    }
    const stream = localStreamRef.current;
    if (stream) stream.getTracks().forEach((track) => track.stop());
    if (screenStream.current) screenStream.current.getTracks().forEach((track) => track.stop());
    if (peerConnection.current) peerConnection.current.close();
  }, [session]);

  return {
    localStream,
    remoteStream,
    isAudioEnabled,
    isVideoEnabled,
    isScreenSharing,
    chatMessages,
    isConnecting,
    remoteUser,
    remoteCursor,
    remoteCode,
    isEncryptionReady,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    sendMessage,
    sendCodeChange,
    sendCursorPosition,
    leaveCall,
  };
}

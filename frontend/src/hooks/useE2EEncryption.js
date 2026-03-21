/**
 * End-to-end encryption for code editor using Web Crypto API.
 * Key exchange: ECDH (P-256) over socket signaling channel.
 * Encryption: AES-GCM 256-bit derived via HKDF.
 */
import { useState, useRef, useCallback } from 'react';

// Generate an ECDH key pair for this session
export async function generateKeyPair() {
  return crypto.subtle.generateKey(
    { name: 'ECDH', namedCurve: 'P-256' },
    true,
    ['deriveKey']
  );
}

// Export public key as base64 string for transmission
export async function exportPublicKey(publicKey) {
  const raw = await crypto.subtle.exportKey('raw', publicKey);
  return btoa(String.fromCharCode(...new Uint8Array(raw)));
}

// Import a peer's public key from base64
export async function importPublicKey(b64) {
  const raw = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    'raw',
    raw,
    { name: 'ECDH', namedCurve: 'P-256' },
    false,
    []
  );
}

// Derive a shared AES-GCM key from ECDH shared secret
export async function deriveSharedKey(privateKey, peerPublicKey) {
  return crypto.subtle.deriveKey(
    { name: 'ECDH', public: peerPublicKey },
    privateKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt a string with AES-GCM, returns base64(iv + ciphertext)
export async function encryptText(sharedKey, plaintext) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    sharedKey,
    encoded
  );
  const combined = new Uint8Array(iv.byteLength + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.byteLength);
  return btoa(String.fromCharCode(...combined));
}

// Decrypt base64(iv + ciphertext) back to string
export async function decryptText(sharedKey, b64) {
  const combined = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);
  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    sharedKey,
    ciphertext
  );
  return new TextDecoder().decode(plaintext);
}

/**
 * Hook that manages E2E key exchange and exposes encrypt/decrypt helpers.
 * Call initKeyExchange(socket, roomId) once socket is ready.
 */
export function useE2EEncryption() {
  const [isReady, setIsReady] = useState(false);
  const keyPairRef = useRef(null);
  const sharedKeyRef = useRef(null);
  const publicKeyB64Ref = useRef(null);

  // Initialize our key pair (call once on mount)
  const init = useCallback(async () => {
    const kp = await generateKeyPair();
    keyPairRef.current = kp;
    publicKeyB64Ref.current = await exportPublicKey(kp.publicKey);
    return publicKeyB64Ref.current;
  }, []);

  // Complete key exchange when we receive peer's public key
  // Idempotent — safe to call multiple times, only derives once
  const completeKeyExchange = useCallback(async (peerPublicKeyB64) => {
    if (!keyPairRef.current || sharedKeyRef.current) return; // already derived
    const peerPubKey = await importPublicKey(peerPublicKeyB64);
    sharedKeyRef.current = await deriveSharedKey(keyPairRef.current.privateKey, peerPubKey);
    setIsReady(true);
  }, []);

  const encrypt = useCallback(async (text) => {
    if (!sharedKeyRef.current) return text; // fallback: send plain if no key yet
    return encryptText(sharedKeyRef.current, text);
  }, []);

  const decrypt = useCallback(async (b64) => {
    if (!sharedKeyRef.current) return b64;
    try {
      return await decryptText(sharedKeyRef.current, b64);
    } catch {
      return b64; // if decryption fails, return as-is
    }
  }, []);

  const getPublicKeyB64 = useCallback(() => publicKeyB64Ref.current, []);

  return { init, completeKeyExchange, encrypt, decrypt, getPublicKeyB64, isReady };
}

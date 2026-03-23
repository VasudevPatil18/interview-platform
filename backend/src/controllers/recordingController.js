import Session from "../models/Session.js";

export const uploadRecording = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { duration } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const userId = req.user._id.toString();
    const isAuthorized =
      session.host.toString() === userId ||
      session.participant?.toString() === userId;

    if (!isAuthorized) return res.status(403).json({ message: "Not authorized to upload recording" });
    if (!req.file) return res.status(400).json({ message: "No recording file provided" });

    // Store as base64 in MongoDB (works on any hosting, no filesystem needed)
    const base64Data = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;

    session.recording = {
      data: base64Data,
      mimeType,
      size: req.file.size,
      duration: parseInt(duration) || 0,
      uploadedAt: new Date(),
      uploadedBy: userId,
    };

    await session.save();

    res.status(200).json({
      message: "Recording uploaded successfully",
      recording: { size: req.file.size, duration },
    });
  } catch (error) {
    console.error("Error uploading recording:", error);
    res.status(500).json({ message: "Failed to upload recording" });
  }
};

export const getRecording = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const userId = req.user._id.toString();
    const isAuthorized =
      session.host.toString() === userId ||
      session.participant?.toString() === userId;

    if (!isAuthorized) return res.status(403).json({ message: "Not authorized to view recording" });
    if (!session.recording?.data) return res.status(404).json({ message: "No recording available" });

    const buffer = Buffer.from(session.recording.data, "base64");
    const fileSize = buffer.length;
    const mimeType = session.recording.mimeType || "video/webm";
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": mimeType,
      });
      res.end(buffer.slice(start, end + 1));
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": mimeType,
      });
      res.end(buffer);
    }
  } catch (error) {
    console.error("Error getting recording:", error);
    res.status(500).json({ message: "Failed to get recording" });
  }
};

export const deleteRecording = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const userId = req.user._id.toString();
    if (session.host.toString() !== userId) return res.status(403).json({ message: "Only host can delete recording" });
    if (!session.recording?.data) return res.status(404).json({ message: "No recording to delete" });

    session.recording = undefined;
    await session.save();

    res.status(200).json({ message: "Recording deleted successfully" });
  } catch (error) {
    console.error("Error deleting recording:", error);
    res.status(500).json({ message: "Failed to delete recording" });
  }
};

export const getRecordingInfo = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId)
      .populate("host", "name email")
      .populate("participant", "name email");

    if (!session) return res.status(404).json({ message: "Session not found" });

    const userId = req.user._id.toString();
    const isAuthorized =
      session.host._id.toString() === userId ||
      session.participant?._id.toString() === userId;

    if (!isAuthorized) return res.status(403).json({ message: "Not authorized" });
    if (!session.recording) return res.status(404).json({ message: "No recording available" });

    // Don't send the raw base64 data in info endpoint
    const { data, ...recordingMeta } = session.recording.toObject();
    res.status(200).json({
      recording: {
        ...recordingMeta,
        sessionInfo: {
          problem: session.problem,
          difficulty: session.difficulty,
          host: session.host.name,
          participant: session.participant?.name,
          createdAt: session.createdAt,
        },
      },
    });
  } catch (error) {
    console.error("Error getting recording info:", error);
    res.status(500).json({ message: "Failed to get recording info" });
  }
};

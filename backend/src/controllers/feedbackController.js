import Feedback from "../models/Feedback.js";
import Session from "../models/Session.js";

export async function submitFeedback(req, res) {
  try {
    const { sessionId, rating, review } = req.body;
    const userId = req.user._id;

    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Ensure session completed
    if (session.status !== "completed") {
      return res.status(400).json({ message: "Session not completed yet" });
    }

    // Ensure user is part of session
    const isHost = session.host.toString() === userId.toString();
    const isParticipant =
      session.participant &&
      session.participant.toString() === userId.toString();

    if (!isHost && !isParticipant) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Prevent duplicate feedback
    const existing = await Feedback.findOne({ session: sessionId, givenBy: userId });
    if (existing) {
      return res.status(400).json({ message: "Feedback already submitted" });
    }

    // Decide who receives feedback
    const givenTo = isHost ? session.participant : session.host;

    if (!givenTo) {
      return res.status(400).json({ message: "No user to give feedback to" });
    }

    const feedback = await Feedback.create({
      session: sessionId,
      givenBy: userId,
      givenTo,
      rating,
      review,
    });

    res.status(201).json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function checkFeedback(req, res) {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;

    const existing = await Feedback.findOne({
      session: sessionId,
      givenBy: userId,
    });

    res.json({ alreadyGiven: !!existing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getSessionFeedback(req, res) {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;

    // Return feedback received by this user for this session
    const feedback = await Feedback.findOne({
      session: sessionId,
      givenTo: userId,
    }).populate("givenBy", "name");

    res.json({ feedback: feedback || null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getMyReceivedFeedbacks(req, res) {
  try {
    const userId = req.user._id;

    const feedbacks = await Feedback.find({ givenTo: userId })
      .populate("givenBy", "name")
      .lean();

    // key by sessionId for easy lookup on frontend
    const map = {};
    for (const fb of feedbacks) {
      map[fb.session.toString()] = fb;
    }

    res.json({ feedbacks: map });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
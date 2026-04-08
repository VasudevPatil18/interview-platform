import SiteFeedback from "../models/SiteFeedback.js";

export const submitSiteFeedback = async (req, res) => {
  try {
    const { rating, category, message } = req.body;
    if (!rating || !message) return res.status(400).json({ message: "Rating and message are required" });

    const existing = await SiteFeedback.findOne({ user: req.user._id });
    if (existing) {
      // Update existing feedback
      existing.rating = rating;
      existing.category = category || "general";
      existing.message = message;
      await existing.save();
      return res.status(200).json({ message: "Feedback updated", feedback: existing });
    }

    const feedback = await SiteFeedback.create({
      user: req.user._id,
      rating,
      category: category || "general",
      message,
    });
    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (error) {
    console.error("Error submitting site feedback:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyFeedback = async (req, res) => {
  try {
    const feedback = await SiteFeedback.findOne({ user: req.user._id });
    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllSiteFeedback = async (req, res) => {
  try {
    const feedbacks = await SiteFeedback.find()
      .populate("user", "name email profileImage")
      .sort({ createdAt: -1 });

    const avgRating = feedbacks.length
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : 0;

    res.status(200).json({ feedbacks, total: feedbacks.length, avgRating });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSiteFeedback = async (req, res) => {
  try {
    await SiteFeedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import mongoose from "mongoose";

const siteFeedbackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    category: {
      type: String,
      enum: ["general", "ui", "performance", "feature", "bug"],
      default: "general",
    },
    message: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true }
);

export default mongoose.model("SiteFeedback", siteFeedbackSchema);

import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { submitFeedback, checkFeedback, getSessionFeedback, getMyReceivedFeedbacks } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", protectRoute, submitFeedback);
router.get("/check/:sessionId", protectRoute, checkFeedback);
router.get("/received/:sessionId", protectRoute, getSessionFeedback);
router.get("/my-received", protectRoute, getMyReceivedFeedbacks);

export default router;

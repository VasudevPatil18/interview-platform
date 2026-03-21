import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { submitFeedback, checkFeedback, getSessionFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", protectRoute, submitFeedback);
router.get("/check/:sessionId", protectRoute, checkFeedback);
router.get("/received/:sessionId", protectRoute, getSessionFeedback);

export default router;

import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { adminRoute } from "../middleware/adminRoute.js";
import {
  submitSiteFeedback,
  getMyFeedback,
  getAllSiteFeedback,
  deleteSiteFeedback,
} from "../controllers/siteFeedbackController.js";

const router = express.Router();

router.post("/", protectRoute, submitSiteFeedback);
router.get("/my", protectRoute, getMyFeedback);
router.get("/all", protectRoute, adminRoute, getAllSiteFeedback);
router.delete("/:id", protectRoute, adminRoute, deleteSiteFeedback);

export default router;

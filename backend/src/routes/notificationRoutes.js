import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.patch("/read-all", protectRoute, markAllAsRead);
router.patch("/:id/read", protectRoute, markAsRead);
router.delete("/:id", protectRoute, deleteNotification);

export default router;

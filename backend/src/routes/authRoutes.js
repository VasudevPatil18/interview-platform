import express from "express";
import { signup, login, logout, getMe, forgotPassword, resetPassword, sendPhoneOtp, resetPasswordWithOtp, updatePhone } from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/send-otp", sendPhoneOtp);
router.post("/reset-password-otp", resetPasswordWithOtp);
router.patch("/update-phone", protectRoute, updatePhone);

export default router;

import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { runCode } from "../controllers/codeRunnerController.js";

const router = express.Router();

router.post("/run", protectRoute, runCode);

export default router;

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { serve } from "inngest/express";
import { createServer } from "http";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { initializeSocket } from "./lib/socket.js";

import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import recordingRoutes from "./routes/recordingRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import codeRunnerRoutes from "./routes/codeRunnerRoutes.js";


const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/sessions", sessionRoutes);
app.use("/api/sessions", recordingRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/code", codeRunnerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/schedule", scheduleRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");

    const httpServer = createServer(app);
    initializeSocket(httpServer);
    console.log("✅ Socket.io initialized");

    httpServer.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on port ${ENV.PORT}`);
    });

    // Graceful shutdown
    const shutdown = () => {
      console.log("🛑 Shutting down gracefully...");
      httpServer.close(() => process.exit(0));
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    console.error("💥 Error starting the server:", error.message);
    process.exit(1);
  }
};

startServer();
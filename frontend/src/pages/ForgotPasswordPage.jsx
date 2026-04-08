import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon, MailIcon, PhoneIcon, SendIcon, CheckCircle2Icon, KeyRoundIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "../lib/axios";
import toast from "react-hot-toast";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("email"); // "email" | "phone"

  // Email flow
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [resetUrl, setResetUrl] = useState("");

  // Phone/OTP flow
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [devOtp, setDevOtp] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // --- Email flow ---
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      setEmailSent(true);
      if (res.data.resetUrl) setResetUrl(res.data.resetUrl);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Phone OTP flow ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone) return toast.error("Enter your phone number");
    setIsLoading(true);
    try {
      const res = await axios.post("/auth/send-otp", { phone });
      setOtpSent(true);
      if (res.data.devOtp) setDevOtp(res.data.devOtp);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpReset = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return toast.error("Enter OTP and new password");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");
    setIsLoading(true);
    try {
      await axios.post("/auth/reset-password-otp", { phone, otp, password: newPassword });
      toast.success("Password reset successful!");
      setTimeout(() => navigate("/auth"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Email success screen
  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-base-100 rounded-3xl shadow-2xl p-8 border border-base-300 text-center">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-success/10 mb-6">
            <CheckCircle2Icon className="size-10 text-success" />
          </div>
          <h2 className="text-3xl font-black mb-3">Check Your Email</h2>
          <p className="text-base-content/70 mb-6">
            We've sent a reset link to <strong>{email}</strong>
          </p>
          {resetUrl && (
            <div className="alert alert-info mb-6 text-left">
              <span className="font-semibold text-sm">Dev mode reset link:</span>
              <a href={resetUrl} className="link link-primary text-xs break-all block mt-1" target="_blank" rel="noopener noreferrer">{resetUrl}</a>
            </div>
          )}
          <button onClick={() => setEmailSent(false)} className="btn btn-outline btn-primary w-full mb-3">Try Another Email</button>
          <Link to="/auth" className="btn btn-ghost w-full gap-2"><ArrowLeftIcon className="size-4" />Back to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-base-100 rounded-3xl shadow-2xl p-8 border border-base-300">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-4">
              <KeyRoundIcon className="size-8 text-primary" />
            </div>
            <h2 className="text-3xl font-black mb-2">Forgot Password?</h2>
            <p className="text-base-content/60">Choose how you want to reset your password</p>
          </div>

          {/* Method Toggle */}
          <div className="tabs tabs-boxed mb-6">
            <button
              className={`tab flex-1 gap-2 ${method === "email" ? "tab-active" : ""}`}
              onClick={() => { setMethod("email"); setOtpSent(false); }}
            >
              <MailIcon className="size-4" /> Email Link
            </button>
            <button
              className={`tab flex-1 gap-2 ${method === "phone" ? "tab-active" : ""}`}
              onClick={() => { setMethod("phone"); setEmailSent(false); }}
            >
              <PhoneIcon className="size-4" /> SMS OTP
            </button>
          </div>

          {/* EMAIL METHOD */}
          {method === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <MailIcon className="size-4" /> Email Address
                  </span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="you@example.com"
                />
              </div>
              <button type="submit" disabled={isLoading} className="btn btn-primary w-full gap-2">
                {isLoading ? <span className="loading loading-spinner" /> : <SendIcon className="size-4" />}
                Send Reset Link
              </button>
            </form>
          )}

          {/* PHONE OTP METHOD */}
          {method === "phone" && !otpSent && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <PhoneIcon className="size-4" /> Phone Number
                  </span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="+91 9876543210"
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/50">Include country code (e.g. +91 for India)</span>
                </label>
              </div>
              <button type="submit" disabled={isLoading} className="btn btn-primary w-full gap-2">
                {isLoading ? <span className="loading loading-spinner" /> : <SendIcon className="size-4" />}
                Send OTP
              </button>
            </form>
          )}

          {method === "phone" && otpSent && (
            <form onSubmit={handleOtpReset} className="space-y-5">
              <div className="alert alert-success py-3">
                <CheckCircle2Icon className="size-4" />
                <span className="text-sm">OTP sent to <strong>{phone}</strong></span>
              </div>

              {devOtp && (
                <div className="alert alert-info py-3">
                  <span className="text-sm">Dev OTP: <strong className="font-mono text-lg">{devOtp}</strong></span>
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Enter 6-digit OTP</span>
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  className="input input-bordered w-full text-center text-2xl font-mono tracking-widest focus:input-primary"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">New Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    className="input input-bordered w-full pr-12 focus:input-primary"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content">
                    {showPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isLoading || otp.length < 6} className="btn btn-primary w-full gap-2">
                {isLoading ? <span className="loading loading-spinner" /> : <KeyRoundIcon className="size-4" />}
                Reset Password
              </button>

              <button type="button" onClick={() => setOtpSent(false)} className="btn btn-ghost w-full text-sm">
                Use a different number
              </button>
            </form>
          )}

          <div className="mt-6">
            <Link to="/auth" className="btn btn-ghost w-full gap-2">
              <ArrowLeftIcon className="size-4" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;

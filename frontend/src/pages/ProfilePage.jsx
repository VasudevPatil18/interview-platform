import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { UserIcon, PhoneIcon, MailIcon, SaveIcon, CheckCircle2Icon } from "lucide-react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProfilePage() {
  const { user } = useAuth();
  const [phone, setPhone] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load current phone from backend
    axios.get("/auth/me").then((res) => {
      if (res.data.user?.phone) {
        setPhone(res.data.user.phone);
        setCurrentPhone(res.data.user.phone);
      }
    }).catch(() => {});
  }, []);

  const handleSavePhone = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return toast.error("Enter a phone number");
    setIsLoading(true);
    try {
      await axios.patch("/auth/update-phone", { phone });
      setCurrentPhone(phone);
      setSaved(true);
      toast.success("Phone number saved!");
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save phone number");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-10 max-w-2xl">

        <h1 className="text-3xl font-black mb-8">My Profile</h1>

        {/* Profile Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300 mb-6">
          <div className="card-body">
            <div className="flex items-center gap-5">
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.profileImage || `https://api.dicebear.com/9.x/personas/svg?seed=${user?.name}`}
                    alt={user?.name}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <div className="flex items-center gap-2 text-base-content/60 mt-1">
                  <MailIcon className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
                {currentPhone && (
                  <div className="flex items-center gap-2 text-base-content/60 mt-1">
                    <PhoneIcon className="w-4 h-4" />
                    <span>{currentPhone}</span>
                  </div>
                )}
                <div className="mt-2">
                  <span className={`badge ${user?.role === "admin" ? "badge-accent" : "badge-primary"}`}>
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Number Section */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <PhoneIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Phone Number</h3>
                <p className="text-sm text-base-content/60">Used for SMS OTP password reset</p>
              </div>
            </div>

            <form onSubmit={handleSavePhone} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Mobile Number</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input input-bordered flex-1 focus:input-primary"
                    placeholder="+91 9876543210"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary gap-2"
                    disabled={isLoading || phone === currentPhone}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : saved ? (
                      <CheckCircle2Icon className="w-4 h-4" />
                    ) : (
                      <SaveIcon className="w-4 h-4" />
                    )}
                    {saved ? "Saved!" : "Save"}
                  </button>
                </div>
                <label className="label">
                  <span className="label-text-alt text-base-content/50">
                    Include country code — e.g. +91 for India, +1 for USA
                  </span>
                </label>
              </div>
            </form>

            {currentPhone && (
              <div className="alert alert-success mt-2 py-3">
                <CheckCircle2Icon className="w-4 h-4" />
                <span className="text-sm">Phone number is set. You can use SMS OTP to reset your password.</span>
              </div>
            )}

            {!currentPhone && (
              <div className="alert alert-warning mt-2 py-3">
                <span className="text-sm">No phone number set. Add one to enable SMS-based password reset.</span>
              </div>
            )}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;

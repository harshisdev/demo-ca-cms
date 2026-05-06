"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [pendingForm, setPendingForm] = useState(null);

  // ================= LOGOUT ALL DEVICES =================
  const handleLogoutAll = async () => {
    try {
      const logoutRes = await fetch("/api/auth/logout-all", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: pendingForm.email,
        }),
      });

      const logoutData = await logoutRes.json();

      if (!logoutData.success) {
        return toast.error(logoutData.message);
      }

      toast.success("All devices logged out");

      // Close Modal
      setShowModal(false);

      // Auto Login Again
      const retryRes = await fetch("/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(pendingForm),
      });

      const retryData = await retryRes.json();

      if (retryData.success) {
        toast.success("Login successful 🎉");

        window.location.href = "/dashboard";
      } else {
        toast.error(retryData.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // ================= LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.email || !form.password) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      // Login Success
      if (data.success) {
        window.location.href = "/dashboard";
        toast.success("Login successful 🎉");

        return;
      }

      // Already Logged In
      if (data.logoutAll) {
        setPendingForm(form);

        setShowModal(true);

        setLoading(false);

        return;
      }

      toast.error(data.message==="User not found" ? "Invalid email" : data.message);
    } catch (error) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Login to your admin account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[46px] text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition duration-300 flex justify-center items-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Bottom */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>

        {/* ================= MODAL ================= */}
        {showModal && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-sm bg-white p-6">
              <h2 className="text-lg font-bold text-gray-800">
                Already Logged In
              </h2>

              <p className="mt-3 text-gray-600">
                This account is already logged in on another device.
              </p>

              <p className="mt-1 text-gray-600">
                Do you want to logout all devices?
              </p>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                {/* NO */}
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded border border-gray-300 px-5 py-2 font-medium hover:bg-gray-100"
                >
                  No
                </button>

                {/* YES */}
                <button
                  onClick={handleLogoutAll}
                  className="rounded bg-red-500 px-5 py-2 text-white font-medium hover:bg-red-600"
                >
                  Yes, Logout All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

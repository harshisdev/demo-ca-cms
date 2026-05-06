"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Upload } from "lucide-react";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    image: null,
    preview: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !form.name ||
      !form.email ||
      !form.mobile ||
      !form.address ||
      !form.password ||
      !form.image
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("mobile", form.mobile);
      formData.append("address", form.address);
      formData.append("password", form.password);
      formData.append("role", "admin");
      formData.append("image", form.image);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Admin registered successfully 🎉");
        router.push("/login");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 overflow-hidden">
      {/* Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-gray-200 p-6">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold text-gray-800">Create Admin</h1>

          <p className="text-sm text-gray-500 mt-1">
            Register new admin account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Side Form Fields */}
            <div className="space-y-4">
              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile No <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  placeholder="9876543210"
                  value={form.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setForm({ ...form, mobile: value });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-9 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Right Side Image Upload + Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image <span className="text-red-500">*</span>
              </label>

              <div className="border border-dashed border-gray-300 rounded-xl p-5 bg-gray-50 flex items-center gap-4">
                {/* Preview */}
                <div className="shrink-0">
                  {form.preview ? (
                    <img
                      src={form.preview}
                      alt="Preview"
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-[10px] text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Upload Content */}
                <div className="flex-1">
                  <p className="text-sm text-gray-700 font-medium">
                    Upload Profile
                  </p>

                  <p className="text-xs text-gray-400 mb-2">
                    Only PNG & JPG files allowed
                  </p>

                  <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 cursor-pointer hover:border-indigo-500 transition">
                    <Upload size={16} className="text-indigo-600" />

                    <span className="text-sm text-gray-600">Choose File</span>

                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files[0];

                        if (file) {
                          // Validate image type
                          const allowedTypes = [
                            "image/png",
                            "image/jpg",
                            "image/jpeg",
                          ];

                          if (!allowedTypes.includes(file.type)) {
                            return toast.error(
                              "Only PNG and JPG images allowed",
                            );
                          }

                          setForm({
                            ...form,
                            image: file,
                            preview: URL.createObjectURL(file),
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>

            <textarea
              rows="2"
              placeholder="Enter address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition flex justify-center items-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Create Admin"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";

export default function UserProfileModal({ user, setOpenProfile, onUpdate }) {
  const [formData, setFormData] = useState(user);
  const [isChanged, setIsChanged] = useState(false);

  const fileInputRef = useRef(null);

  // Detect Changes
  useEffect(() => {
    const changed = JSON.stringify(formData) !== JSON.stringify(user);

    setIsChanged(changed);
  }, [formData, user]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
        imageFile: file, // store actual file for API upload
      }));
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6 relative">
          {/* Close Button */}
          <button
            onClick={() => setOpenProfile(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

          {/* Profile Section */}
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="relative group">
              <img
                src={formData.image}
                alt={formData.name}
                className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
              />

              {/* Change Image Overlay */}
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition"
              >
                Change
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Editable Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-4 text-2xl font-bold text-center border-b outline-none"
            />

            <p className="text-gray-500 capitalize">{formData.role}</p>
          </div>

          {/* User Details */}
          <div className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label className="font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="font-semibold">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Address */}
            <div>
              <label className="font-semibold">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Created At */}
            <div>
              <label className="font-semibold">Created At</label>
              <p className="text-gray-700 mt-1">
                {new Date(formData.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setOpenProfile(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>

            {/* Show Update Button Only When Changed */}
            {isChanged && (
              <button
                onClick={() => onUpdate(formData)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

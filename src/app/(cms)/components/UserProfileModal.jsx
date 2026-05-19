import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          <button
            onClick={() => setOpenProfile(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          {/* Profile Section */}
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="relative group">
              <img
                src={formData.image}
                alt={formData.name}
                className="w-20 h-20 rounded-full border-2 border-blue-500 object-cover"
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
            <p className="text-black mt-3">{formData.name}</p>
            <p className="text-gray-500 capitalize">{formData.role}</p>
          </div>

          {/* User Details */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.mobile}
                maxLength={10}
                minLength={10}
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

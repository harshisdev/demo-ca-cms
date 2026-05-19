"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import SuccessPopup from "./SuccessPopup";

export default function EnquiryModal({ isOpen, onClose, locations }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    consult_type: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!formData.full_name.trim())
      newErrors.full_name = "Full Name is required";

    if (!formData.email.match(/^[^ ]+@[^ ]+\.[a-z]{2,}$/i))
      newErrors.email = "Valid email required";

    if (!formData.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "10 digit mobile required";

    if (!formData.consult_type)
      newErrors.consult_type = "Select consultation type";

    if (!formData.location) newErrors.location = "Select location";

    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      consult_type: "",
      location: "",
      message: "",
    });

    setErrors({});
  };
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
          );

          const data = await res.json();

          const cityName = data.display_name;

          setCity(cityName);
        } catch (error) {
          console.log("City fetch error", error);
        }
      },
      () => {
        setFormData((prev) => ({
          ...prev,
          user_city: "Location Denied",
        }));
      },
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Remove error for that field when user types/selects
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await emailjs.send(
        "service_cirbxt4",
        "template_49k5yzv",
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          consult_type: formData.consult_type,
          location: formData.location,
          message: formData.message,
          page_url: window.location.href,
          user_city: city,
          time: new Date().toLocaleString(),
        },
        "fkOFNIbYZNUMfkF3v",
      );

      setShowSuccess(true);

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        consult_type: "",
        location: "",
        message: "",
        page_url: window.location.href,
      });

      setErrors({});
    } catch (error) {
      alert("Failed to send enquiry. Please try again.");
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={() => {
        resetForm();
        onClose();
      }}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold  mb-6">
          CA Consultation Enquiry
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          <span className="text-red-500">*</span> All fields are mandatory
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name *"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
            {errors.full_name && (
              <small className="text-red-500">{errors.full_name}</small>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
            {errors.email && (
              <small className="text-red-500">{errors.email}</small>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number *"
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
            {errors.phone && (
              <small className="text-red-500">{errors.phone}</small>
            )}
          </div>

          {/* Consultation Type */}
          <div>
            <select
              name="consult_type"
              value={formData.consult_type}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">Select Consultation Type *</option>
              <option>GST Registration</option>
              <option>Income Tax Filing</option>
              <option>Company Registration</option>
              <option>Accounting & Bookkeeping</option>
              <option>Audit & Compliance</option>
              <option>Financial Advisory</option>
            </select>
            {errors.consult_type && (
              <small className="text-red-500">{errors.consult_type}</small>
            )}
          </div>
          {/* Location */}
          <div>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">Select Location *</option>
              {locations?.map((loc, index) => (
                <option key={index} value={loc?.location}>
                  {loc?.location}
                </option>
              ))}
            </select>
            {errors.location && (
              <small className="text-red-500">{errors.location}</small>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              rows="3"
              placeholder="Your Requirement *"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            ></textarea>
            {errors.message && (
              <small className="text-red-500">{errors.message}</small>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
            >
              {loading ? "Sending..." : "Submit Enquiry"}
            </button>
          </div>
        </form>
      </div>
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          resetForm();
          onClose();
        }}
      />
    </div>
  );
}

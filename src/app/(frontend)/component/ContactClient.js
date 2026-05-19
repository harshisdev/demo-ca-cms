"use client";

import { useState, useEffect } from "react";
import SuccessPopup from "@/components/SuccessPopup";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { getAllCities } from "@/lib/store";
import Breadcrumb from "./Breadcrumb";
import PageBanner from "./PageBanner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    consult_type: "",
    location: "",
    message: "",
    page_url: "",
    user_city: "",
  });

  const [errors, setErrors] = useState({});

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      page_url: window.location.href,
    }));

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
          );

          const data = await res.json();

          const city = data.display_name;

          setFormData((prev) => ({
            ...prev,
            user_city: city,
          }));
        } catch (error) {
          console.log(error);
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

  const [loading, setLoading] = useState(false);

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
          page_url: formData.page_url,
          user_city: formData.user_city,
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
        user_city: "",
      });

      setErrors({});
    } catch (error) {
      alert("Failed to send enquiry. Please try again.");
    }

    setLoading(false);
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AccountingService",
            "@id": "https://cadelhincr.com/contact#accountingservice",
            name: "CA in Delhi NCR",
            url: "https://cadelhincr.com/contact",
            logo: "https://cadelhincr.com/logo.png",
            description:
              "Professional Chartered Accountant firm providing GST filing, income tax return filing, company registration, audit services and ROC compliance in Delhi NCR including Delhi, Noida and Gurgaon.",
            telephone: "+91-9582300775",
            email: "rahulray100@gmail.com",

            address: {
              "@type": "PostalAddress",
              streetAddress: "Dwarka More",
              addressLocality: "Delhi",
              addressRegion: "Delhi",
              postalCode: "110001",
              addressCountry: "IN",
            },

            geo: {
              "@type": "GeoCoordinates",
              latitude: "28.6139",
              longitude: "77.2090",
            },

            areaServed: [
              {
                "@type": "City",
                name: "Delhi",
              },
              {
                "@type": "City",
                name: "Noida",
              },
              {
                "@type": "City",
                name: "Gurgaon",
              },
            ],

            serviceType: [
              "GST Registration",
              "GST Return Filing",
              "Income Tax Return Filing",
              "Company Registration",
              "Corporate Audit",
              "ROC Compliance",
            ],

            sameAs: [
              "https://www.facebook.com/yourpage",
              "https://www.linkedin.com/company/yourcompany",
            ],
          }),
        }}
      />
      <PageBanner
        title="Contact Chartered Accountant"
        subtitle="Contact our experienced CA for GST registration, income tax return filing, audit, and business compliance services."
      />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-4">
              {" "}
              <FontAwesomeIcon icon={faLocationDot} />
              Delhi | Noida | Gurgaon
            </p>
            <p className="text-gray-600 mb-4">
              <a
                href="tel:+9582300775"
                className="flex items-center gap-2 hover:text-blue-700 transition"
              >
                <FontAwesomeIcon icon={faPhone} />
                +91 9582300775
              </a>
            </p>
            <p className="text-gray-600 mb-4">
              <a
                href="mailto:rahulray100@gmail.com"
                className="flex items-center gap-2 hover:text-blue-700 transition"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                rahulray100@gmail.com
              </a>
            </p>
            <iframe
              src="https://www.google.com/maps?q=Delhi&output=embed"
              width="100%"
              height="250"
              className="rounded-xl shadow-md mt-6"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Form */}
          <div className="order-1 md:order-2 bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              Send Us a Message
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
                  <option>Delhi</option>
                  <option>Noida</option>
                  <option>Gurgaon</option>
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
        </div>
        <SuccessPopup
          isOpen={showSuccess}
          onClose={() => {
            setShowSuccess(false);
            resetForm();
          }}
        />
      </section>
    </>
  );
}

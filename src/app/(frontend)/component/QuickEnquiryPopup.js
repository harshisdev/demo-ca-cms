"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function QuickEnquiryPopup() {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const seen = localStorage.getItem("quick_enquiry_seen");

    if (!seen) {
      setTimeout(() => {
        setShow(true);
      }, 2000);
    }
  }, []);

  const closePopup = () => {
    localStorage.setItem("quick_enquiry_seen", "true");
    setShow(false);
  };

  const closeSuccess = () => {
    setSuccess(false);
  };

  const validate = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      newErrors.mobile = "Enter valid 10 digit mobile number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const templateParams = {
    name: name,
    mobile: mobile,
    time: new Date().toLocaleString(),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    emailjs
      .send(
        "service_cirbxt4",
        "template_fmtrepp",
        templateParams,
        "fkOFNIbYZNUMfkF3v",
      )
      .then(() => {
        setLoading(false);
        setShow(false);
        setSuccess(true);

        localStorage.setItem("quick_enquiry_seen", "true");
      })
      .catch(() => {
        setLoading(false);
        alert("Something went wrong. Please try again.");
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);

    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);

    if (errors.mobile) {
      setErrors((prev) => ({ ...prev, mobile: "" }));
    }
  };

  return (
    <>
      {/* ENQUIRY POPUP */}
      {show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-3 text-gray-500 text-xl cursor-pointer"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Quick Enquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NAME */}
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border p-2 rounded"
                  value={name}
                  onChange={handleNameChange}
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* MOBILE */}
              <div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full border p-2 rounded"
                  value={mobile}
                  maxLength={10}
                  onChange={handleMobileChange}
                />

                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 w-full"
              >
                {loading ? "Sending..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white p-8 rounded-2xl text-center max-w-sm w-full mx-4">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Thank You!
            </h2>

            <p>Your enquiry has been submitted successfully.</p>

            <button
              onClick={closeSuccess}
              className="mt-6 cursor-pointer bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

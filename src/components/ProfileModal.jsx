"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

export default function ProfileModal({
  isOpen,
  onClose,
  form,
  setForm,
  onSubmit,
  isEdit,
}) {
  // AUTO SLUG
  useEffect(() => {
    if (form.name && !form.slug) {
      setForm((prev) => ({
        ...prev,
        slug: prev.name.toLowerCase().replace(/\s+/g, "-"),
      }));
    }
  }, [form.name]);

  if (!isOpen) return null;

  const handleArray = (field, value) => {
    setForm({
      ...form,
      [field]: value.split(",").map((v) => v.trim()),
    });
  };

  const safeJSON = (value, field) => {
    try {
      setForm({ ...form, [field]: JSON.parse(value || "[]") });
    } catch {
      console.log("Invalid JSON");
    }
  };

  // WORKING HOURS CONFIG
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const timeOptions = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-10 z-50">
      <div className="bg-white p-6 py-0 w-[800px] rounded shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center mb-4 pb-2 pt-6">
          <h2 className="text-lg font-bold">
            {isEdit ? "Edit Profile" : "Add Profile"}
          </h2>

          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FontAwesomeIcon icon={faXmark} className="text-xl" />
          </button>
        </div>

        {/* BASIC */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Name"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="input"
            placeholder="Slug"
            value={form.slug || ""}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />

          <input
            className="input"
            placeholder="Designation"
            value={form.designation || ""}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
          />

          <input
            className="input"
            placeholder="Specialization"
            value={form.specialization || ""}
            onChange={(e) =>
              setForm({ ...form, specialization: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Qualification"
            value={form.qualification || ""}
            onChange={(e) =>
              setForm({ ...form, qualification: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Membership"
            value={form.membership || ""}
            onChange={(e) => setForm({ ...form, membership: e.target.value })}
          />
        </div>

        {/* LOCATION */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="City"
            value={form.city || ""}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />

          <input
            className="input"
            placeholder="Areas"
            value={form.areas?.join(", ") || ""}
            onChange={(e) => handleArray("areas", e.target.value)}
          />
        </div>

        {/* BUSINESS */}
        <div className="grid grid-cols-3 gap-4">
          <input
            className="input"
            placeholder="Fee"
            value={form.fee || ""}
            onChange={(e) => setForm({ ...form, fee: e.target.value })}
          />

          <input
            className="input"
            placeholder="Experience"
            value={form.experience || ""}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
          />

          <input
            className="input"
            placeholder="Clients"
            value={form.clients || ""}
            onChange={(e) => setForm({ ...form, clients: e.target.value })}
          />

          <input
            className="input"
            placeholder="Rating"
            value={form.rating || ""}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          />

          <input
            className="input"
            placeholder="Availability"
            value={form.availability || ""}
            onChange={(e) => setForm({ ...form, availability: e.target.value })}
          />
        </div>

        {/* ARRAYS */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Services"
            value={form.services?.join(", ") || ""}
            onChange={(e) => handleArray("services", e.target.value)}
          />

          <input
            className="input"
            placeholder="Languages"
            value={form.languages?.join(", ") || ""}
            onChange={(e) => handleArray("languages", e.target.value)}
          />

          <input
            className="input"
            placeholder="Highlights"
            value={form.highlights?.join(", ") || ""}
            onChange={(e) => handleArray("highlights", e.target.value)}
          />

          <input
            className="input"
            placeholder="Certifications"
            value={form.certifications?.join(", ") || ""}
            onChange={(e) => handleArray("certifications", e.target.value)}
          />
        </div>

        {/* CONTACT */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Phone"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="input"
            placeholder="Email"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="input col-span-2"
            placeholder="Address"
            value={form.address || ""}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        {/* ABOUT */}
        <textarea
          className="input h-24"
          placeholder="About"
          value={form.about || ""}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
        />

        {/* WORKING HOURS */}
        <div>
          <h3 className="font-semibold mb-2">Working Hours</h3>

          {days.map((day) => (
            <div key={day} className="flex items-center gap-3 mb-2">
              <input
                type="checkbox"
                checked={!!form.workingHours?.[day]}
                onChange={(e) => {
                  const updated = { ...form.workingHours };
                  if (e.target.checked) {
                    updated[day] = "10:00 AM - 07:00 PM";
                  } else {
                    delete updated[day];
                  }
                  setForm({ ...form, workingHours: updated });
                }}
              />

              <span className="w-24 capitalize">{day}</span>

              <select
                className="input"
                value={form.workingHours?.[day]?.split(" - ")[0] || ""}
                onChange={(e) => {
                  const end =
                    form.workingHours?.[day]?.split(" - ")[1] || "07:00 PM";
                  setForm({
                    ...form,
                    workingHours: {
                      ...form.workingHours,
                      [day]: `${e.target.value} - ${end}`,
                    },
                  });
                }}
              >
                <option value="">Start</option>
                {timeOptions.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <select
                className="input"
                value={form.workingHours?.[day]?.split(" - ")[1] || ""}
                onChange={(e) => {
                  const start =
                    form.workingHours?.[day]?.split(" - ")[0] || "10:00 AM";
                  setForm({
                    ...form,
                    workingHours: {
                      ...form.workingHours,
                      [day]: `${start} - ${e.target.value}`,
                    },
                  });
                }}
              >
                <option value="">End</option>
                {timeOptions.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* SOCIAL */}
        <div className="grid grid-cols-3 gap-4">
          <input
            className="input"
            placeholder="LinkedIn"
            value={form.social?.linkedin || ""}
            onChange={(e) =>
              setForm({
                ...form,
                social: { ...form.social, linkedin: e.target.value },
              })
            }
          />

          <input
            className="input"
            placeholder="Twitter"
            value={form.social?.twitter || ""}
            onChange={(e) =>
              setForm({
                ...form,
                social: { ...form.social, twitter: e.target.value },
              })
            }
          />

          <input
            className="input"
            placeholder="Facebook"
            value={form.social?.facebook || ""}
            onChange={(e) =>
              setForm({
                ...form,
                social: { ...form.social, facebook: e.target.value },
              })
            }
          />
        </div>

        {/* JSON */}
        <textarea
          className="input h-32"
          placeholder="Reviews JSON"
          value={JSON.stringify(form.reviews || [], null, 2)}
          onChange={(e) => safeJSON(e.target.value, "reviews")}
        />

        <textarea
          className="input h-32"
          placeholder="FAQ JSON"
          value={JSON.stringify(form.faq || [], null, 2)}
          onChange={(e) => safeJSON(e.target.value, "faq")}
        />

        {/* ACTION */}
        <div className="sticky bottom-0 left-0 right-0 bg-white z-20 px-6 py-4 mt-6 shadow-sm">
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>

            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input {
          border: 1px solid #ddd;
          padding: 8px;
          border-radius: 6px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

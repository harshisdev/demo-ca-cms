"use client";

import { useEffect, useState } from "react";

export default function LocationModal({
  isOpen,
  onClose,
  form,
  setForm,
  onSubmit,
  isEdit,
  handleNameChange,
  editSlug,
  setEditSlug,
  errors,
  setErrors,
}) {
  const [parents, setParents] = useState([]);

  // 📦 Fetch locations
  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => setParents(data || []));
  }, []);

  // 🔥 Normalize parent for edit mode
  useEffect(() => {
    if (form.parent && typeof form.parent === "object") {
      setForm((prev) => ({
        ...prev,
        parent: prev.parent?._id || "",
      }));
    }
  }, [form.parent, setForm]);

  // ❌ Close modal
  if (!isOpen) return null;

  // 🔥 Check duplicate slug
  const checkSlugExists = async (slug) => {
    try {
      const res = await fetch("/api/location");

      const data = await res.json();

      // 🔥 Flatten nested structure
      const allLocations = data.flatMap((city) => [
        city,
        ...(city.children || []),
      ]);

      return allLocations.some(
        (item) => item.slug === slug && item._id !== form._id,
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // ✅ Form Validation
  const handleSubmit = async () => {
    let newErrors = {};

    if (!form.name?.trim()) {
      newErrors.name = "Location name is required";
    }

    if (!form.type) {
      newErrors.type = "Location type is required";
    }

    if (form.type === "area" && !form.parent) {
      newErrors.parent = "Parent city is required";
    }

    // 🔥 Slug duplicate check
    const slugExists = await checkSlugExists(form.slug);

    if (slugExists) {
      newErrors.slug = "Slug already exists";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
      <div className="bg-white p-6 w-[500px] rounded-xl shadow-lg">
        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? "Update Location" : "Add New Location"}
        </h2>

        {/* NAME */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-sm">
            Location Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Enter Location Name"
            value={form.name.charAt(0).toUpperCase() + form.name.slice(1) || ""}
            onChange={handleNameChange}
            className={`border p-3 w-full rounded-lg outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-green-500"
            }`}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* SLUG */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-sm">Slug</label>

            <button
              type="button"
              onClick={() => setEditSlug(!editSlug)}
              className="text-sm text-blue-600 hover:underline"
            >
              {editSlug ? "Cancel" : "Change Slug"}
            </button>
          </div>

          <input
            type="text"
            placeholder="Slug"
            value={form.slug || ""}
            disabled={!editSlug}
            onChange={(e) =>
              setForm({
                ...form,
                slug: e.target.value.toLowerCase().trim().replace(/\s+/g, "-"),
              })
            }
            className={`border p-3 w-full rounded-lg outline-none ${
              editSlug ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            } ${
              errors.slug
                ? "border-red-500"
                : "focus:ring-2 focus:ring-green-500"
            }`}
          />

          {errors.slug && (
            <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
          )}
        </div>

        {/* TYPE */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-sm">
            Location Type <span className="text-red-500">*</span>
          </label>
          <select
            value={form.type || ""}
            disabled={isEdit}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
                parent: e.target.value === "city" ? "" : form.parent,
              })
            }
            className={`border p-3 w-full rounded-lg outline-none focus:ring-2 ${
              errors.type
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-green-500"
            }`}
          >
            <option value="">Select Type</option>

            <option value="city">City</option>

            <option value="area">Area</option>
          </select>

          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>

        {/* PARENT CITY */}
        {form.type === "area" && (
          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm">
              Parent City <span className="text-red-500">*</span>
            </label>

            <select
              value={form.parent || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  parent: e.target.value,
                })
              }
              className={`border p-3 w-full rounded-lg outline-none focus:ring-2 ${
                errors.parent
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-green-500"
              }`}
            >
              <option value="">Select Parent City</option>

              {parents
                .filter((p) => p.type?.toLowerCase().trim() === "city")
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
            </select>

            {errors.parent && (
              <p className="text-red-500 text-sm mt-1">{errors.parent}</p>
            )}
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

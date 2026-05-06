"use client";

import { useState } from "react";

export default function SeoModal({
  isOpen,
  onClose,
  form,
  setForm,
  onSubmit,
  isEdit,
  locations,
  data,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const updateNested = (key, subKey, value) => {
    setForm({
      ...form,
      [key]: {
        ...form[key],
        [subKey]: value,
      },
    });
  };

  // ✅ get location name
  const getLocationName = (path) => {
    const loc = locations.find((l) => l.slug === path);
    return loc ? loc.name : "—";
  };

  // ✅ select location
  const handleSelect = (l) => {
    setForm({
      ...form,
      locationName: l.name,
      locationId: l._id,
      path: l.slug,
    });
    setDropdownOpen(false);
    setSearch("");
  };

  const filteredLocations = locations.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase());

    const isAlreadySelected = data?.some((item) => item.path === l.slug); // 👈 check match

    return matchesSearch && !isAlreadySelected; // 👈 exclude it
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-10 overflow-y-auto">
      <div className="bg-white p-6 w-[700px] rounded">
        <h2 className="text-lg font-bold mb-4">
          {isEdit ? "Update SEO" : "Add SEO"}
        </h2>

        {/* ✅ CONDITIONAL UI FIXED */}
        {isEdit ? (
          <>
            <input
              className="border p-2 w-full mb-2 bg-gray-100"
              value={getLocationName(form.path)}
              disabled
            />

            <input
              className="border p-2 w-full mb-2 bg-gray-100"
              value={form.path || ""}
              disabled
            />
          </>
        ) : (
          <div className="relative mb-2">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border p-2 w-full cursor-pointer"
            >
              {form.locationName || "Select Location"}
            </div>

            {dropdownOpen && (
              <div className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto shadow">
                <input
                  placeholder="Search..."
                  className="p-2 w-full border-b outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {filteredLocations.map((l) => (
                  <div
                    key={l._id}
                    onClick={() => handleSelect(l)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {l.name}
                  </div>
                ))}

                {filteredLocations.length === 0 && (
                  <div className="p-2 text-gray-500">No results</div>
                )}
              </div>
            )}
            {form.path && (
              <input
                className="border p-2 w-full mb-2 bg-gray-100 mt-2"
                value={form.path}
                disabled
              />
            )}
          </div>
        )}

        {/* BASIC SEO */}
        <h3 className="font-semibold mt-4">Basic SEO</h3>

        <input
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-2"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Keywords"
          className="border p-2 w-full mb-2"
          value={form.keywords?.join(", ") || ""}
          onChange={(e) =>
            setForm({
              ...form,
              keywords: e.target.value.split(",").map((k) => k.trim()),
            })
          }
        />

        <input
          placeholder="Canonical URL"
          className="border p-2 w-full mb-2"
          value={form.canonical || ""}
          onChange={(e) => setForm({ ...form, canonical: e.target.value })}
        />

        {/* ROBOTS */}
        <h3 className="font-semibold mt-4">Robots</h3>

        <select
          className="border p-2 w-full mb-2"
          value={form.robots?.index || "index"}
          onChange={(e) => updateNested("robots", "index", e.target.value)}
        >
          <option value="index">Index</option>
          <option value="noindex">No Index</option>
        </select>

        <select
          className="border p-2 w-full mb-2"
          value={form.robots?.follow || "follow"}
          onChange={(e) => updateNested("robots", "follow", e.target.value)}
        >
          <option value="follow">Follow</option>
          <option value="nofollow">No Follow</option>
        </select>

        {/* ACTION */}
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-3 py-1">
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="bg-green-600 text-white px-3 py-1"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

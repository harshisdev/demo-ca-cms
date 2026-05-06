"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function PageContentModal({
  isOpen,
  onClose,
  form,
  setForm,
  onSubmit,
  isEdit,
  locations,
  data,
}) {
  const [paths, setPaths] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [contentBlocks, setContentBlocks] = useState([
    {
      type: "p",
      text: "",
    },
  ]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   const fetchPaths = async () => {
  //     const [locRes, profRes] = await Promise.all([
  //       fetch("/api/location"),
  //       fetch("/api/profile"),
  //     ]);

  //     const locations = await locRes.json();
  //     const profiles = await profRes.json();

  //     const locationPaths = locations.map((l) => `/${l.slug}`);
  //     const profilePaths = profiles?.map((p) => `/ca/${p.slug}`);

  //     setPaths([...locationPaths, ...profilePaths]);
  //   };

  //   fetchPaths();
  // }, []);

  if (!isOpen) return null;

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

  // ✅ get location name
  const getLocationName = (path) => {
    const loc = locations.find((l) => l.slug === path);
    return loc ? loc.name : "—";
  };

  // flatten cities + areas
  const allLocations = locations.flatMap((loc) => [
    {
      ...loc,
      displayName: loc.name,
    },

    ...(loc.children || []).map((child) => ({
      ...child,
      displayName: `${child.name} (${loc.name})`,
    })),
  ]);

  const filteredLocations = allLocations.filter((l) => {
    const matchesSearch = l.displayName
      .toLowerCase()
      .includes(search.toLowerCase());

    const isAlreadySelected = data?.some((item) => item.path === l.slug);

    return matchesSearch && !isAlreadySelected;
  });

  const addBlock = (type) => {
    setContentBlocks([
      ...contentBlocks,
      type === "ul" ? { type, items: [""] } : { type, text: "" },
    ]);
  };

  const updateBlock = (index, value) => {
    const updated = [...contentBlocks];

    if (updated[index].type === "ul") {
      updated[index].items = value.split("\n");
    } else {
      updated[index].text = value;
    }

    setContentBlocks(updated);

    setForm({
      ...form,
      content: updated,
    });
  };

  const deleteBlock = (index) => {
    const updated = contentBlocks.filter((_, i) => i !== index);

    setContentBlocks(updated);

    setForm({
      ...form,
      content: updated,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-10 z-50">
      <div className="bg-white p-6 py-0 w-[800px] rounded shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center mb-4 pb-2 pt-6">
          <h2 className="text-lg font-bold">
            {isEdit ? "Update Page Content" : "Add Page Content"}
          </h2>

          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FontAwesomeIcon icon={faXmark} className="text-xl" />
          </button>
        </div>

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
          <div ref={dropdownRef} className="relative mb-2">
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
                    {l.displayName}
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
        {/* TITLE */}
        <input
          placeholder="Page Title"
          className="border p-2 w-full mb-3"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <div className="space-y-3">
          {contentBlocks.map((block, index) => (
            <div key={index} className="border p-3 rounded">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-gray-500 uppercase">
                  {block.type}
                </div>

                <button
                  type="button"
                  onClick={() => deleteBlock(index)}
                  className="text-red-500 text-xs hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {block.type === "ul" ? (
                <textarea
                  className="border p-2 w-full h-24"
                  placeholder="One item per line"
                  value={block.items.join("\n")}
                  onChange={(e) => updateBlock(index, e.target.value)}
                />
              ) : (
                <textarea
                  className="border p-2 w-full h-24"
                  value={block.text}
                  onChange={(e) => updateBlock(index, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
        {/* ACTIONS */}
        <div className="sticky bottom-0 left-0 right-0 bg-white z-20  py-4 shadow-sm">
          <div className="flex gap-2 flex-wrap">
            {["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => addBlock(tag)}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                + {tag.toUpperCase()}
              </button>
            ))}

            <button
              type="button"
              onClick={() => addBlock("p")}
              className="bg-gray-200 px-2 py-1 rounded"
            >
              + Paragraph
            </button>

            <button
              type="button"
              onClick={() => addBlock("ul")}
              className="bg-gray-200 px-2 py-1 rounded"
            >
              + UL List
            </button>
          </div>
          <div className="flex justify-end gap-3 mt-3">
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
    </div>
  );
}

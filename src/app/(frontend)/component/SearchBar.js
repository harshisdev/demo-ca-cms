"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ data, close }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showNotFound, setShowNotFound] = useState(false);
  const router = useRouter();

  const handleChange = (value) => {
    setSearchTerm(value);

    const term = value.trim().toLowerCase();

    if (term.length < 3) {
      setResults([]);
      setShowNotFound(false);
      return;
    }

    const filtered = data.filter(
      (ca) => ca.profileshow && ca.caname.toLowerCase().includes(term),
    );

    if (filtered.length === 0) {
      setResults([]);
      setShowNotFound(true); // ✅ show not found
      return;
    }

    setShowNotFound(false);

    // Exact match first
    const exactMatch = filtered.filter(
      (ca) => ca.caname.toLowerCase() === term,
    );

    const partialMatch = filtered.filter(
      (ca) => ca.caname.toLowerCase() !== term,
    );

    setResults([...exactMatch, ...partialMatch]);
  };

  const handleSelect = (profile) => {
    setSearchTerm("");
    setResults([]);
    setShowNotFound(false);
    if (window.innerWidth <= 1020) {
      close();
    }
    router.push(`/ca/${profile.profileslug}`);
  };

  const handleClear = () => {
    setSearchTerm("");
    setResults([]);
    setShowNotFound(false);
  };

  return (
    <div className="relative w-44">
      <input
        type="text"
        placeholder="Search CA name..."
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") handleClear();
        }}
        className="w-full border px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
      />

      {/* ❌ Clear Button */}
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>
      )}

      {/* 🔽 Results Dropdown */}
      {(results.length > 0 || showNotFound) && (
        <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
          {results.map((ca) => (
            <div
              key={ca.profileslug}
              onClick={() => handleSelect(ca)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="font-medium">
                {ca.caname}, {ca.locationname}
              </div>
              <div className="text-sm text-gray-500">{ca.designation}</div>
            </div>
          ))}

          {/* ✅ CA Not Found */}
          {showNotFound && (
            <div className="px-4 py-3 text-center text-gray-500 font-medium">
              CA Not Listed
            </div>
          )}
        </div>
      )}
    </div>
  );
}

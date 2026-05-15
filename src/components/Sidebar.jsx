"use client";

export default function Sidebar({ setView, view }) {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">
        <svg
          width="220"
          height="60"
          viewBox="0 0 220 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="8" width="44" height="44" rx="10" fill="#1D4ED8" />

          <text
            x="22"
            y="38"
            textAnchor="middle"
            fontFamily="Roboto, sans-serif"
            fontSize="22"
            fontWeight="700"
            fill="white"
          >
            CA
          </text>

          <text
            x="60"
            y="32"
            fontFamily="Roboto, sans-serif"
            fontSize="20"
            fontWeight="700"
            fill="#fff"
          >
            Delhi NCR
          </text>

          <text
            x="60"
            y="48"
            fontFamily="Roboto, sans-serif"
            fontSize="11"
            fill="#1D4ED8"
          >
            Chartered Accountants
          </text>
        </svg>
      </h2>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-left p-2 rounded mb-2 transition bg-slate-500 hover:bg-slate-600 text-white"
      >
        View Website
      </a>
      {/* Locations */}
      <button
        onClick={() => setView("location")}
        className={`block w-full text-left p-2 rounded mb-2 transition ${
          view === "location" ? "bg-blue-600 text-white" : "hover:bg-gray-700"
        }`}
      >
        Locations
      </button>

      {/* CA Profiles */}
      <button
        onClick={() => setView("profile")}
        className={`block w-full text-left p-2 rounded mb-2 transition ${
          view === "profile" ? "bg-blue-600 text-white" : "hover:bg-gray-700"
        }`}
      >
        CA Profiles
      </button>

      {/* SEO */}
      <button
        onClick={() => setView("seo")}
        className={`block w-full text-left p-2 rounded mb-2 transition ${
          view === "seo" ? "bg-blue-600 text-white" : "hover:bg-gray-700"
        }`}
      >
        SEO Metadata
      </button>

      {/* Page Content */}
      <button
        onClick={() => setView("page-content")}
        className={`block w-full text-left p-2 rounded mb-2 transition ${
          view === "page-content"
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-700"
        }`}
      >
        Page Content
      </button>

      <button
        onClick={() => setView("footer")}
        className={`block w-full text-left p-2 rounded mb-2 transition ${
          view === "footer"
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-700"
        }`}
      >
        Footer
      </button>
    </div>
  );
}

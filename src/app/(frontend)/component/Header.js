"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  // API DATA
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `/api/location`,
        );

        const data = await response.json();

        // SAFE ARRAY CHECK
        setLocations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Location API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // NORMALIZE SEARCH TEXT
  const normalizeText = (text = "") => text.toLowerCase().replace(/\s+/g, "");

  // FILTER + SORT LOGIC
  const filteredLocations = useMemo(() => {
    const result = locations
      .map((city) => {
        const cityName = city?.name || "";

        // FILTER CHILDREN
        const filteredChildren =
          city?.children?.filter((child) =>
            normalizeText(child?.name).includes(normalizeText(search)),
          ) || [];

        // CITY MATCH
        const cityMatch = normalizeText(cityName).includes(
          normalizeText(search),
        );

        // RETURN CITY IF MATCHES
        if (cityMatch || filteredChildren.length > 0) {
          return {
            ...city,
            children: cityMatch ? city.children || [] : filteredChildren,
          };
        }

        return null;
      })
      .filter(Boolean);

    // SORT A-Z
    return result.sort((a, b) =>
      (a?.name || "").localeCompare(b?.name || "", "en", {
        sensitivity: "base",
      }),
    );
  }, [locations, search]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <svg
                width="220"
                height="60"
                viewBox="0 0 220 60"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0"
                  y="8"
                  width="44"
                  height="44"
                  rx="10"
                  fill="#1D4ED8"
                />

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
                  fill="#0F172A"
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
            </Link>

            {/* MENU */}
            <nav className="hidden xl:flex items-center gap-8 font-medium text-gray-700">
              <Link href="/">Home</Link>

              <Link href="/services">Services</Link>

              <Link href="/about">About</Link>

              {/* LOCATION */}
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-blue-600 py-5 cursor-pointer">
                  Locations
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* DROPDOWN */}
                <div className="absolute left-0 top-16 hidden group-hover:block w-[650px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5">
                  {/* SEARCH */}
                  <div className="relative mb-5">
                    <input
                      type="text"
                      placeholder="Search location..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-3 text-gray-400 hover:text-black"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* LOCATIONS */}
                  <div className="grid grid-cols-3 gap-6 max-h-[400px] overflow-y-auto pr-2">
                    {loading ? (
                      <div className="col-span-3 text-center py-10">
                        Loading...
                      </div>
                    ) : filteredLocations.length > 0 ? (
                      filteredLocations.map((city) => (
                        <div
                          key={city?._id}
                          className="bg-gray-50 rounded-2xl border border-gray-100 p-4 hover:shadow-lg transition"
                        >
                          {/* CITY NAME */}
                          <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              className="text-blue-600"
                            />

                            {city?.name || "Unknown City"}
                          </h4>

                          {/* LOCATION LINKS */}
                          <ul className="space-y-2">
                            {/* PARENT CITY */}
                            <li>
                              <Link
                                href={`/${city?.slug || ""}`}
                                className="text-sm text-gray-700 hover:text-blue-600 transition"
                              >
                                CA In {city?.name || "Location"}
                              </Link>
                            </li>

                            {/* CHILD LOCATIONS */}
                            {city?.children?.map((child) => (
                              <li key={child?._id}>
                                <Link
                                  href={`/${child?.slug || ""}`}
                                  className="text-sm text-gray-600 hover:text-blue-600 transition"
                                >
                                  CA In {child?.name || "Location"}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-10 text-gray-500">
                        No Locations Found
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Link href="/blog">Blog</Link>

              <Link href="/contact">Contact</Link>
            </nav>

            {/* RIGHT */}
            <div className="hidden xl:flex items-center gap-4">
              <a
                href="tel:+919582300775"
                className="flex items-center gap-2 border px-5 py-2.5 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition"
              >
                <FontAwesomeIcon icon={faPhone} />
                +91-9582300775
              </a>

              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
                Enquire Now
              </button>
            </div>

            {/* MOBILE */}
            <div className="xl:hidden">
              <button onClick={() => setMenuOpen(true)} className="text-3xl">
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

"use client";

import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch("/api/footer");
        const json = await res.json();

        if (json.success) {
          setFooterData(json.data);
        }
      } catch (error) {
        console.error("Footer API Error:", error);
      }
    };

    fetchFooter();
  }, []);

  if (!footerData) {
    return null;
  }

  return (
    <footer className="relative overflow-hidden text-gray-200 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        {/* Company Info */}
        <div>
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
              fill="#fff"
            >
              Chartered Accountants
            </text>
          </svg>

          <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
            {footerData.description}
          </p>

          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <a href={`mailto:${footerData.email}`}>{footerData.email}</a>{" "}
            </p>
            <p>
              <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
              {footerData.location}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white tracking-wide">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm text-gray-300">
            {footerData.quickLinks?.map((link) => (
              <li key={link._id}>
                <a href={link.url} className="hover:text-white transition">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Cities */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white tracking-wide">
            Top Cities in NCR
          </h3>

          <ul className="space-y-2 text-sm text-gray-300">
            {footerData.topCities
              ?.sort((a, b) => (a.label || "").localeCompare(b.label || ""))
              .map((city) => (
                <li key={city._id}>
                  <a
                    href={`/${city.url}`}
                    className="hover:text-white transition"
                  >
                    {city?.label
                      ?.toLowerCase()
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white tracking-wide">
            CA Services
          </h3>

          <ul className="space-y-2 text-sm text-gray-300">
            {footerData.services?.map((service) => (
              <li key={service._id}>
                <a
                  href={service.url || "#"}
                  className="hover:text-white transition"
                >
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* POLICIES */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-4 text-sm text-gray-300">
          {footerData.policies?.map((policy, index) => (
            <div key={policy._id} className="flex items-center gap-4">
              <a href={policy.url} className="hover:text-white transition">
                {policy.label}
              </a>

              {index !== footerData.policies.length - 1 && <span>|</span>}
            </div>
          ))}
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-300 text-sm text-center md:text-left">
            {footerData.copyright}
          </p>

          <p className="text-gray-300 text-sm text-center md:text-right">
            {footerData.developedBy}
          </p>
        </div>
      </div>
    </footer>
  );
}

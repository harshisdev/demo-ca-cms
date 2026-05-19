"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function FloatingContact() {
  return (
    <div className="fixed right-3 bottom-42 z-40 flex flex-col gap-4">
      {/* WhatsApp */}
      <a
        href="https://wa.me/9582300775"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="lg" />

        <span className="hidden sm:block absolute right-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          WhatsApp
        </span>
      </a>

      {/* Call */}
      <a
        href="tel:9582300775"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition"
      >
        <FontAwesomeIcon icon={faPhone} size="lg" />

        <span className="hidden sm:block absolute right-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Call
        </span>
      </a>
    </div>
  );
}

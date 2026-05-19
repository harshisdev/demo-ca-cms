"use client";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function TopScroll() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="group fixed right-3 bottom-24 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition cursor-pointer"
    >
      <FontAwesomeIcon icon={faArrowUp} size="lg" />

      {/* Tooltip */}
      <span className="hidden sm:block absolute right-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
        Back to top
      </span>
    </button>
  );
}

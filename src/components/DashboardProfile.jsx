"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  faChevronDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardProfile() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/userprofile");

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  // close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // logout
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  };

  if (!user) {
    return null;
  }

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* PROFILE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 border px-3 py-2 rounded-lg hover:bg-gray-50"
      >
        <img
          src={user.image}
          alt={user.name}
          width={38}
          height={38}
          className="rounded-full object-cover"
        />

        <div className="text-left">
          <div className="text-sm font-medium">{user.name}</div>

          <div className="text-xs text-gray-500 capitalize">{user.role}</div>
        </div>

        <FontAwesomeIcon
          icon={faChevronDown}
          className="text-gray-500 text-xs"
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 bg-white border shadow-lg z-50 overflow-hidden">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-left"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

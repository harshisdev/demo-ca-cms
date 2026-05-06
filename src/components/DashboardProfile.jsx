"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  faChevronDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserProfileModal from "./UserProfileModal";
import toast from "react-hot-toast";

export default function DashboardProfile() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const dropdownRef = useRef(null);

  const [user, setUser] = useState(null);

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

  const handleUpdateUser = async (updatedUser) => {
    try {
      const formData = new FormData();

      // Append Fields
      formData.append("name", updatedUser.name);
      formData.append("email", updatedUser.email);
      formData.append("mobile", updatedUser.mobile);
      formData.append("address", updatedUser.address);

      // Append Image
      if (updatedUser.imageFile) {
        formData.append("image", updatedUser.imageFile);
      }

      // API Call
      const response = await fetch("/api/auth/userprofile", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Profile updated successfully!");
        // Update Local State
        setUser(data.user);

        // Close Modal
        setOpenProfile(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/userprofile");

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          // Logout if user not found
          if (data.success === false || data.message === "User not found") {
            toast.error("User Multiple Login Detected.");
            handleLogout();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [router]);

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
            onClick={() => setOpenProfile(true)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b"
          >
            View Profile
          </button>

          {openProfile && (
            <UserProfileModal
              user={user}
              setOpenProfile={setOpenProfile}
              onUpdate={handleUpdateUser}
            />
          )}
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

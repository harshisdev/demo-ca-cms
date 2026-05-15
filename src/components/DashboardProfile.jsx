"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useIdleTimer } from "react-idle-timer";

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
  const [sessionExpired, setSessionExpired] = useState(false);

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
    toast.success("Logged out successfully");
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

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/auth/userprofile");

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        return;
      }

      // Session expired
      if (
        data.success === false &&
        data.message === "Session expired due to inactivity"
      ) {
        setSessionExpired(true);
        return;
      }

      // Multiple login detected
      if (
        data.success === false &&
        data.message === "Your account was logged in on another device"
      ) {
        toast.error("Multiple login detected");
        localStorage.clear();
        handleLogout();
        return;
      }

      // Invalid token / user not found
      if (
        data.message === "Invalid token" ||
        data.message === "User not found"
      ) {
        localStorage.clear();
        handleLogout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const continueSession = async () => {
    try {
      const res = await fetch("/api/auth/refresh-session", {
        method: "POST",
      });

      const data = await res.json();

      if (data.success) {
        setSessionExpired(false);

        // refetch profile properly
        await fetchProfile();

        toast.success("Session continued");
      } else {
        handleLogout();
      }
    } catch (error) {
      console.log(error);
      handleLogout();
    }
  };

  useIdleTimer({
    timeout: 60 * 60 * 1000,

    onIdle: () => {
      setSessionExpired(true);
    },

    debounce: 500,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user && !sessionExpired) {
    return null;
  }

  return (
    <>
      {user && (
        <div>
          <div ref={dropdownRef} className="relative inline-block">
            {/* PROFILE BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 border px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <img
                src={user.image}
                alt={user.name}
                className="rounded-full object-cove w-[35px] h-[35px] border rounded-full"
              />

              <div className="text-left">
                <div className="text-sm font-bold">{user.name}</div>

                <div className="text-xs text-gray-500 capitalize">
                  {user.role}
                </div>
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
        </div>
      )}
      {sessionExpired && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
            <h2 className="text-xl font-semibold mb-3">Session Expired</h2>

            <p className="text-gray-600 mb-5">
              Your session expired due to inactivity. Do you want to continue?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>

              <button
                onClick={continueSession}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

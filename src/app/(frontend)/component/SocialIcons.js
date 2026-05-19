"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLinkedinIn,
  faFacebookF,
  faXTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import {
  faShareNodes,
  faCopy,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default function SocialIcons({ social, selectedCA }) {
  const [copied, setCopied] = useState(false);

  if (!social) return null;

  const profileUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://cadelhincr.com/${selectedCA.profileslug}`;

  const iconMap = {
    linkedin: { icon: faLinkedinIn, color: "hover:bg-[#0A66C2]" },
    facebook: { icon: faFacebookF, color: "hover:bg-[#1877F2]" },
    twitter: { icon: faXTwitter, color: "hover:bg-black" },
    instagram: {
      icon: faInstagram,
      color: "hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500",
    },
  };

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedCA.caname,
        text: `Connect with ${selectedCA.caname} - Chartered Accountant`,
        url: profileUrl,
      });
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-sm font-semibold text-gray-500 text-center mb-4">
        Connect with {selectedCA.caname}
      </h3>

      <div className="flex flex-wrap justify-center gap-4">
        {/* Copy Link */}
        <button
          onClick={copyLink}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-700 shadow hover:bg-gray-300 hover:scale-110 transition cursor-pointer"
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>

        {/* Share */}
        <button
          onClick={shareProfile}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-white shadow hover:bg-purple-700 hover:scale-110 transition cursor-pointer"
        >
          <FontAwesomeIcon icon={faShareNodes} />
        </button>

        {/* Social Icons */}
        {Object.keys(iconMap).map((platform) => {
          const url = social[platform];
          if (!url) return null;

          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-700 shadow-md border hover:text-white ${iconMap[platform].color} hover:scale-110 transition`}
            >
              <FontAwesomeIcon icon={iconMap[platform].icon} />
            </a>
          );
        })}
      </div>

      {copied && (
        <p className="text-green-600 text-sm text-center mt-3">
          Profile link copied!
        </p>
      )}
    </div>
  );
}

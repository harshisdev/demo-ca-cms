"use client";

import Link from "next/link";
import { Star } from "lucide-react";

export default function CACard({ ca }) {
  if (!ca) return null;

  const {
    caname,
    designation,
    rating,
    experience,
    specialization,
    profileslug,
    loccationall,
    profileimage,
  } = ca;

  return (
    <div className="w-full md:w-2xl mx-auto relative group">
      {/* Gradient Glow Border */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20 blur-lg group-hover:opacity-40 transition"></div>

      {/* Card */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-8 hover:-translate-y-1 transition duration-300 flex flex-col md:flex-row items-center gap-8">
        {/* Top Rated Badge */}
        <div className="absolute top-5 left-5 bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full shadow">
          ⭐ Top Rated
        </div>

        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={profileimage || "/images/user-profile.png"}
            className="w-28 h-28 rounded-full border-4 border-blue-100 shadow-md object-cover"
            alt={`${caname} Chartered Accountant`}
          />
        </div>

        {/* CA Information */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-blue-900">{caname}</h3>

          {designation && (
            <p className="text-blue-600 text-sm font-medium mt-1">
              {designation}
            </p>
          )}

          {/* Rating */}
          {rating && (
            <div className="flex md:justify-start justify-center items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="text-gray-500 text-sm ml-2">({rating}/5)</span>
            </div>
          )}

          {/* Details */}
          <div className="mt-4 space-y-1 text-gray-600 text-sm">
            {experience && (
              <p>
                <span className="font-semibold text-gray-800">Experience:</span>{" "}
                {experience}
              </p>
            )}

            {specialization && (
              <p>
                <span className="font-semibold text-gray-800">
                  Specialization:
                </span>{" "}
                {specialization}
              </p>
            )}

            {loccationall && (
              <p>
                <span className="font-semibold text-gray-800">Location:</span>{" "}
                {loccationall}
              </p>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="w-full md:w-auto">
          <Link
            href={`/ca/${profileslug}`}
            className="block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow hover:shadow-lg hover:scale-[1.03] transition"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

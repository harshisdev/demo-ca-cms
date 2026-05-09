"use client";

import { Pencil, Trash2, Star, IndianRupee, MapPin } from "lucide-react";

export default function ProfileTable({ data, onEdit, onDelete }) {
  if (!data?.length) {
    return (
      <div className="bg-white rounded-xl border py-14 text-center text-gray-500">
        No profiles found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-5 py-4 font-semibold">Profile</th>

              <th className="px-5 py-4 font-semibold">Location</th>

              <th className="px-5 py-4 font-semibold">Experience</th>

              <th className="px-5 py-4 font-semibold">Fee</th>

              <th className="px-5 py-4 font-semibold">Rating</th>

              <th className="px-5 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((p) => (
              <tr
                key={p._id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                {/* PROFILE */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {/* IMAGE */}
                    {p.profileimage ? (
                      <img
                        src={p.profileimage}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">
                        {p.name?.charAt(0)}
                      </div>
                    )}

                    {/* INFO */}
                    <div>
                      <h3 className="font-semibold text-gray-800">{p.name}</h3>

                      <p className="text-xs text-gray-500">
                        {p.email || "No email"}
                      </p>

                      <p className="text-xs text-indigo-600 mt-1">
                        {p.designation || "-"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* LOCATION */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 text-gray-700">
                    <MapPin size={14} />

                    <span className="font-medium">{p.city?.name || "-"}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.areas?.length ? (
                      p.areas.map((a) => (
                        <span
                          key={a._id}
                          className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
                        >
                          {a.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">No areas</span>
                    )}
                  </div>
                </td>

                {/* EXPERIENCE */}
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-700">
                    {p.experience || "-"}
                  </div>
                </td>

                {/* FEE */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 font-semibold text-gray-800">
                    <IndianRupee size={14} />

                    {p.fee || 0}
                  </div>
                </td>

                {/* RATING */}
                <td className="px-5 py-4">
                  <div className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-lg text-sm font-medium">
                    <Star size={14} fill="currentColor" />

                    {p.rating || 0}
                  </div>
                </td>

                {/* ACTIONS */}
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(p._id)}
                      className="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

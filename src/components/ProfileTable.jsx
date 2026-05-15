"use client";

import { Pencil, Trash2, Star, IndianRupee, MapPin } from "lucide-react";

export default function ProfileTable({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search by ca name"
          className="border p-2 w-full rounded"
          value={""}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="px-4 py-2 border-b font-semibold">Total Locations: </div>
      <div className="max-h-[500px] overflow-y-auto border rounded">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-black uppercase sticky top-0 z-10">
            <tr>
              <th className="text-left px-4 py-4 font-extrabold">Profile</th>

              <th className="text-left px-4 py-4 font-extrabold">Location</th>

              <th className="text-left px-4 py-4 font-extrabold">Experience</th>

              <th className="text-left px-4 py-4 font-extrabold">Fee</th>

              <th className="text-left px-4 py-4 font-extrabold">Rating</th>

              <th className="px-4 py-4 font-extrabold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((p) => (
                <tr
                  key={p._id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  {/* PROFILE */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* IMAGE */}
                      {p.image ? (
                        <img
                          src={p.image}
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
                        <h3 className="font-semibold text-gray-800">
                          {p.name}
                        </h3>

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

                      <span className="font-medium">
                        {p.city || "-"}{" "}
                        <span className="text-xs text-gray-700">
                          ({p.area || "-"})
                        </span>
                      </span>
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
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(p._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No Profile Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

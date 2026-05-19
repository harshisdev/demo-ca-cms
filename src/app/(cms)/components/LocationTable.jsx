"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function LocationTable({ data, onEdit, onDelete }) {
  const [search, setSearch] = useState("");

  // 🔍 Search text
  const searchLower = search.toLowerCase();

  const sortByName = (a, b) => a.name.localeCompare(b.name);

  const cities = [...data].sort(sortByName);

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {/* SEARCH */}
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="px-4 py-2 border-b font-semibold">
        Total Locations:{" "}
        {cities.length +
          cities.reduce((acc, city) => acc + (city.children?.length || 0), 0)}
      </div>

      {/* TABLE */}
      <div className="max-h-[500px] overflow-y-auto border rounded">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-black uppercase sticky top-0 z-10">
            <tr>
              <th className="text-left px-4 py-4 font-extrabold">Location</th>

              <th className="text-left px-4 py-4 font-extrabold">Slug</th>

              <th className="text-left px-4 py-4 font-extrabold">Type</th>

              <th className="text-left px-4 py-4 font-extrabold">Parent</th>

              <th className="text-right px-4 py-4 font-extrabold">Actions</th>
            </tr>
          </thead>

          {cities.map((city) => {
            // 🔍 Search city
            const cityMatch = city.name.toLowerCase().includes(searchLower);

            // 🔍 Search children
            const matchedChildren =
              city.children?.filter((child) =>
                child.name.toLowerCase().includes(searchLower),
              ) || [];

            // ❌ Hide non matching
            if (search && !cityMatch && matchedChildren.length === 0) {
              return null;
            }

            return (
              <tbody key={city._id}>
                {/* CITY ROW */}
                <tr className="bg-gray-50 border-t">
                  <td className="px-4 py-4 text-black font-bold">
                    {city.name.charAt(0).toUpperCase() + city.name.slice(1)}
                  </td>

                  <td className="px-4 py-4 text-gray-500">{city.slug}</td>

                  <td className="px-4 py-4 capitalize">{city.type}</td>

                  <td className="px-4 py-4 text-gray-400">
                    {city.name.charAt(0).toUpperCase() + city.name.slice(1)}
                  </td>

                  <td className="px-4 py-4">
                    {city.children?.length === 0 && (
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => onEdit(city)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => onDelete(city._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>

                {/* CHILD ROWS */}
                {(search ? matchedChildren : city.children)?.map((area) => (
                  <tr key={area._id} className="border-t hover:bg-gray-50">
                    <td className="px-10 py-3 text-gray-700">{area.name}</td>

                    <td className="px-4 py-3 text-gray-500">{area.slug}</td>

                    <td className="px-4 py-3 capitalize">{area.type}</td>

                    <td className="px-4 py-3 text-gray-700">
                      {area.parent?.name
                        ? area.parent.name.charAt(0).toUpperCase() +
                          area.parent.name.slice(1)
                        : "-"}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => onEdit(area)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => onDelete(area._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            );
          })}

          {cities.every((city) => {
            const cityMatch = city.name.toLowerCase().includes(searchLower);

            const matchedChildren =
              city.children?.filter((child) =>
                child.name.toLowerCase().includes(searchLower),
              ) || [];

            return !cityMatch && matchedChildren.length === 0;
          }) && (
            <tbody>
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No locations found.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

"use client";

import React, { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function SeoTable({ data, onEdit, onDelete, locations }) {
  const [search, setSearch] = useState("");

  // flatten locations
  const allLocations = useMemo(() => {
    return locations.flatMap((loc) => [
      {
        slug: loc.slug,
        name: loc.name,
        parent: null,
      },

      ...(loc.children || []).map((child) => ({
        slug: child.slug,
        name: child.name,
        parent: loc.name,
      })),
    ]);
  }, [locations]);

  const groupedData = useMemo(() => {
    // filter
    const filtered = data.filter((item) => {
      const location = allLocations.find((loc) => loc.slug === item.path) || {};

      const keyword = search.toLowerCase();

      return (
        location.name?.toLowerCase().includes(keyword) ||
        location.parent?.toLowerCase().includes(keyword) ||
        item.path?.toLowerCase().includes(keyword) ||
        item.title?.toLowerCase().includes(keyword)
      );
    });

    // group by parent city only
    const grouped = {};

    filtered.forEach((item) => {
      const location = allLocations.find((loc) => loc.slug === item.path) || {};

      if (!location.name) return;

      // parent city
      const parentKey = location.parent || location.name;

      if (!grouped[parentKey]) {
        grouped[parentKey] = {
          city: parentKey,
          items: [],
        };
      }

      grouped[parentKey].items.push({
        ...item,
        location,
      });
    });

    return grouped;
  }, [data, allLocations, search]);

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search by location, path, title"
          className="border p-2 w-full rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="px-4 py-2 border-b font-semibold">
        Total Locations:{" "}
        {Object.values(groupedData).reduce(
          (total, group) => total + group.items.length,
          0,
        )}{" "}
      </div>
      <div className="max-h-[500px] overflow-y-auto border rounded">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-black uppercase sticky top-0 z-10">
            <tr>
              <th className="text-left px-4 py-4 font-extrabold">Location</th>

              <th className="text-left px-4 py-4 font-extrabold">Parent</th>

              <th className="text-left px-4 py-4 font-extrabold">Slug</th>

              <th className="text-left px-4 py-4 font-extrabold">Title</th>

              <th className="text-left px-4 py-4 font-extrabold">
                Description
              </th>

              <th className="text-right px-4 py-4 font-extrabold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Object.values(groupedData).length > 0 ? (
              Object.values(groupedData)
                .sort((a, b) => a.city.localeCompare(b.city))
                .map((group, index) => (
                  <React.Fragment key={`${group.city}-${index}`}>
                    {/* Parent City */}
                    <tr className="bg-gray-100 sticky top-[48px] z-10">
                      <td
                        colSpan={6}
                        className="px-4 py-2 font-bold text-black"
                      >
                        {group.city}
                      </td>
                    </tr>

                    {/* Child Rows */}
                    {group.items.map((item) => (
                      <tr key={item._id} className="border-t hover:bg-gray-50">
                        <td className="px-8 py-4 text-black">
                          {item.location.name}
                        </td>

                        <td className="px-4 py-4 text-black">
                          {item.location.parent || "-"}
                        </td>

                        <td className="px-4 py-4 text-black">{item.path}</td>

                        <td className="px-4 py-4 text-black">{item.title}</td>

                        <td className="px-4 py-4 text-black max-w-[300px]">
                          <div className="truncate">
                            {item.description?.slice(0, 80)}
                            ...
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => onEdit(item)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Pencil size={18} />
                            </button>

                            <button
                              onClick={() => onDelete(item._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No SEO Data Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

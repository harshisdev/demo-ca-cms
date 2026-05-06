"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useMemo, useState } from "react";

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

  // search filter
  const filteredData = data.filter((item) => {
    const location = allLocations.find((loc) => loc.slug === item.path) || {};

    return (
      location.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.path?.toLowerCase().includes(search.toLowerCase()) ||
      item.title?.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (!data.length) {
    return <p className="text-gray-500">No SEO data</p>;
  }

  return (
    <div className="overflow-x-auto">
      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by location, path, title"
          className="border p-2 w-full rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TOTAL */}
      <div className="px-4 py-2 border">
        Total Locations: {filteredData.length}
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="text-left px-3 py-3">Location</th>

            <th className="text-left px-3 py-3">Parent</th>

            <th className="text-left px-3 py-3">Slug</th>

            <th className="text-left px-3 py-3">Title</th>

            <th className="text-left px-3 py-3">Description</th>

            <th className="px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => {
              const location =
                allLocations.find((loc) => loc.slug === item.path) || {};

              return (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  {/* LOCATION */}
                  <td className="px-3 py-2">{location.name || "-"}</td>

                  {/* PARENT */}
                  <td className="px-3 py-2">{location.parent || "-"}</td>

                  {/* SLUG */}
                  <td className="px-3 py-2">{item.path}</td>

                  {/* TITLE */}
                  <td className="px-3 py-2">{item.title}</td>

                  {/* DESCRIPTION */}
                  <td className="px-3 py-2 text-gray-600 max-w-[300px]">
                    <div className="truncate">
                      {item.description?.slice(0, 80)}
                      ...
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-3 py-2 text-right">
                    <button onClick={() => onEdit(item)} className="mr-2">
                      <FontAwesomeIcon icon={faPen} />
                    </button>

                    <button onClick={() => onDelete(item._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

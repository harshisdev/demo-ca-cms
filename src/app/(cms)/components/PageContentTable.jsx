"use client";

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

export default function PageContentTable({ data, onEdit, onDelete }) {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then(setLocations);
  }, []);

  const allLocations = useMemo(() => {
    return locations.flatMap((loc) => [
      {
        slug: loc.slug,
        name: loc.name,
      },

      ...(loc.children || []).map((child) => ({
        slug: child.slug,
        name: `${child.name} (${loc.name})`,
      })),
    ]);
  }, [locations]);

  const groupedData = useMemo(() => {
    // filter data
    const filtered = data.filter((item) => {
      const location = allLocations.find((loc) => loc.slug === item.path) || {};

      const keyword = search.toLowerCase();

      return (
        location.name?.toLowerCase().includes(keyword) ||
        item.path?.toLowerCase().includes(keyword) ||
        item.title?.toLowerCase().includes(keyword)
      );
    });

    // group by parent city
    const grouped = {};

    filtered.forEach((item) => {
      const location = allLocations.find((loc) => loc.slug === item.path) || {};

      if (!location.name) return;

      // detect parent city
      let parentKey = location.name;

      // child location
      if (location.name.includes("(")) {
        parentKey = location.name.split("(")[1].replace(")", "").trim();
      }

      // create group
      if (!grouped[parentKey]) {
        grouped[parentKey] = {
          city: parentKey,
          items: [],
        };
      }

      // push item
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
          placeholder="Search by location, path, title..."
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
              <th className="text-left px-4 py-4 font-extrabold">Slug</th>
              <th className="text-left px-4 py-4 font-extrabold">Title</th>
              <th className="text-left px-4 py-4 font-extrabold">
                Content Preview
              </th>
              <th className="text-right px-4 py-4 font-extrabold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Object.values(groupedData).length > 0 ? (
              Object.values(groupedData)
                .sort((a, b) => a.city.localeCompare(b.city))
                .map((group, groupIndex) => (
                  <React.Fragment key={`${group.city}-${groupIndex}`}>
                    {/* Parent City */}
                    <tr className="bg-gray-100 sticky top-[48] z-10">
                      <td
                        colSpan={6}
                        className="px-4 py-3 font-bold text-black text-base"
                      >
                        {group.city}
                      </td>
                    </tr>

                    {/* Child Rows */}
                    {group.items?.map((item) => (
                      <tr key={item._id} className="border-t hover:bg-gray-50">
                        {/* Location */}
                        <td className="px-8 py-4 text-black font-medium">
                          {item.location.name || item.path}
                        </td>

                        {/* Slug */}
                        <td className="px-4 py-4 text-black">{item.path}</td>

                        {/* Title */}
                        <td className="px-4 py-4 text-black">{item.title}</td>

                        {/* Content */}
                        <td className="px-4 py-4 text-black text-sm text-gray-600 max-w-[300px]">
                          <div className="truncate">
                            {item.content
                              ?.map((block) => {
                                if (block.type === "ul") {
                                  return block.items?.join(", ");
                                }

                                return block.text;
                              })
                              .join(" ")
                              .slice(0, 100)}
                            ...
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 text-black">
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
                  No Page Content Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

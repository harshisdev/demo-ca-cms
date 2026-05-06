"use client";

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

  if (!data.length) {
    return <p className="text-gray-500">No page content found.</p>;
  }

  const filteredData = data.filter((item) => {
    const locationName =
      allLocations.find((loc) => loc.slug === item.path)?.name || "";

    return (
      locationName.toLowerCase().includes(search.toLowerCase()) ||
      item.path?.toLowerCase().includes(search.toLowerCase()) ||
      item.title?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by location, path, title..."
          className="border p-2 w-full rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
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
            <th className="text-left px-3 py-3">Content Preview</th>
            <th className=" px-3 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="px-3 py-2">
                  {allLocations.find((loc) => loc.slug === item.path)?.name ||
                    item.path}
                </td>
                <td className="px-3 py-2">
                  {(() => {
                    let parentName = "-";

                    locations.forEach((loc) => {
                      loc.children?.forEach((child) => {
                        if (child.slug === item.path) {
                          parentName = loc.name;
                        }
                      });
                    });

                    return parentName;
                  })()}
                </td>
                <td className="px-3 py-2">{item.path}</td>
                <td className="px-3 py-2">{item.title}</td>
                <td className="px-3 py-2 text-sm text-gray-600 max-w-[300px]">
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
                <td className="px-3 py-2 flex justify-end gap-2">
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
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

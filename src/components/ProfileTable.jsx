"use client";

export default function ProfileTable({ data, onEdit, onDelete }) {
  if (!data.length) {
    return (
      <div className="text-center py-10 text-gray-500">No profiles found</div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Profile</th>
            <th className="p-3">Location</th>
            <th className="p-3">Experience</th>
            <th className="p-3">Fee</th>
            <th className="p-3">Rating</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p._id} className="border-t hover:bg-gray-50 transition">
              {/* PROFILE */}
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {p.name?.charAt(0)}
                  </div>

                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-gray-500 text-xs">
                      {p.email || "No email"}
                    </div>
                  </div>
                </div>
              </td>

              {/* LOCATION */}
              <td className="p-3">
                <div className="text-sm font-medium">{p.city?.name || "-"}</div>

                <div className="flex flex-wrap gap-1 mt-1">
                  {p.areas?.map((a) => (
                    <span
                      key={a._id}
                      className="bg-gray-200 text-xs px-2 py-1 rounded"
                    >
                      {a.name}
                    </span>
                  ))}
                </div>
              </td>

              {/* EXPERIENCE */}
              <td className="p-3">{p.experience || "-"}</td>

              {/* FEE */}
              <td className="p-3 font-medium">₹{p.fee || 0}</td>

              {/* RATING */}
              <td className="p-3">
                <div className="flex items-center gap-1">
                  ⭐ {p.rating || 0}
                </div>
              </td>

              {/* ACTIONS */}
              <td className="p-3 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(p._id)}
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

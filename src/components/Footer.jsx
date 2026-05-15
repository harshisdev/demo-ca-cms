"use client";

import { PlusIcon, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function FooterCMS() {
  const initialState = {
    logo: "",
    logoText: "",
    title: "",
    description: "",
    email: "",
    location: "",

    quickLinks: [{ label: "", url: "" }],
    topCities: [{ label: "", url: "" }],
    services: [{ label: "", url: "" }],
    policies: [{ label: "", url: "" }],

    copyright: "",
    developedBy: "",
  };

  const [form, setForm] = useState(initialState);

  const [originalForm, setOriginalForm] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [locationOptions, setLocationOptions] = useState([]);

  // CHECK CHANGED
  const isChanged = JSON.stringify(form) !== JSON.stringify(originalForm);

  // GET FOOTER
  const getFooter = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/footer");

      const data = await res.json();

      if (data.success && data.data) {
        setForm(data.data);
        setOriginalForm(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // GET LOCATIONS
  const getLocations = async () => {
    try {
      const res = await fetch("/api/location");

      const data = await res.json();
      if (data) {
        const formatted = getTopCitiesOptions(data);
        setLocationOptions(formatted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFooter();
    getLocations();
  }, []);

  // FORMAT CITY + AREA
  const getTopCitiesOptions = (locations) => {
    const options = [];

    locations.forEach((city) => {
      // CITY
      options.push({
        label: city.name,
        value: city.slug,
        type: "city",
      });

      // AREA
      city.children?.forEach((area) => {
        options.push({
          label: `${area.name} (${city.name})`,
          value: area.slug,
          type: "area",
        });
      });
    });

    return options;
  };

  // TEXT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ARRAY CHANGE
  const handleArrayChange = (section, index, field, value) => {
    const updated = [...form[section]];

    updated[index][field] = value;

    setForm({
      ...form,
      [section]: updated,
    });
  };

  // ADD ITEM
  const addItem = (section) => {
    setForm({
      ...form,
      [section]: [
        ...form[section],
        {
          label: "",
          url: "",
        },
      ],
    });
  };

  // REMOVE ITEM
  const removeItem = (section, index) => {
    const updated = [...form[section]];

    updated.splice(index, 1);

    setForm({
      ...form,
      [section]: updated,
    });
  };

  // SAVE
  const handleSubmit = async () => {
    try {
      setSaving(true);

      const res = await fetch("/api/footer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Footer Updated Successfully!");

        // RESET CHANGED STATE
        setOriginalForm(form);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const selectedTopCities = form.topCities.map((item) => item.url);

  return (
    <div className="h-[calc(100vh_-_115px)] overflow-auto">
      <div className="bg-gray-50 border rounded-2xl p-5 w-5/12 mx-auto mb-5">
        <h3 className="section-title text-center mb-5">Footer Logo</h3>

        <div className="flex items-center justify-center gap-5">
          {/* PREVIEW */}
          {form.logo ? (
            <img
              src={form.logo}
              alt="Logo"
              className="w-24 h-24 rounded-2xl object-cover border"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          {/* UPLOAD */}
          <label className="cursor-pointer">
            <div className="inline-flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
              <Upload size={18} />
              {form.logo ? "Change" : "Upload"} Logo
            </div>

            <input
              type="file"
              hidden
              accept=".png,.jpg,.jpeg,image/png,image/jpeg"
              onChange={async (e) => {
                try {
                  const file = e.target.files[0];

                  if (!file) return;

                  // TYPE VALIDATION
                  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

                  if (!allowedTypes.includes(file.type)) {
                    return toast.error("Only PNG and JPG images allowed");
                  }

                  // SIZE VALIDATION
                  const maxSize = 2 * 1024 * 1024;

                  if (file.size > maxSize) {
                    return toast.error("Image size should be less than 2MB");
                  }

                  // FORM DATA
                  const formData = new FormData();

                  formData.append("file", file);

                  // API CALL
                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const data = await res.json();

                  if (data.success) {
                    setForm({
                      ...form,
                      logo: data.url,
                    });

                    toast.success("Logo uploaded successfully!");
                  } else {
                    toast.error(data.message);
                  }
                } catch (error) {
                  console.log(error);

                  toast.error("Upload failed");
                }
              }}
            />
          </label>
        </div>
      </div>
      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          name="logoText"
          value={form.logoText}
          onChange={handleChange}
          placeholder="Logo Text"
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-3 rounded-lg"
        />
      </div>

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-3 rounded-lg w-full mb-10 h-32"
      />

      {/* DYNAMIC SECTIONS */}
      {[
        {
          title: "Quick Links",
          key: "quickLinks",
        },
        {
          title: "Services",
          key: "services",
        },
        {
          title: "Policies",
          key: "policies",
        },
      ].map((section) => (
        <div key={section.key} className="mb-10">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">{section.title}</h2>

            <button
              type="button"
              onClick={() => addItem(section.key)}
              className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center"
            >
              <PlusIcon size={18} />
            </button>
          </div>

          {/* ITEMS */}
          <div className="space-y-4">
            {form[section.key].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-3 items-center bg-gray-50 border rounded-xl p-3"
              >
                <div className="col-span-5">
                  <input
                    type="text"
                    value={item.label}
                    placeholder="Enter Label"
                    onChange={(e) =>
                      handleArrayChange(
                        section.key,
                        index,
                        "label",
                        e.target.value,
                      )
                    }
                    className="w-full border p-3 rounded-lg"
                  />
                </div>

                <div className="col-span-6">
                  <input
                    type="text"
                    value={item.url}
                    placeholder="Enter URL"
                    onChange={(e) =>
                      handleArrayChange(
                        section.key,
                        index,
                        "url",
                        e.target.value,
                      )
                    }
                    className="w-full border p-3 rounded-lg"
                  />
                </div>

                <div className="col-span-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => removeItem(section.key, index)}
                    className="h-10 w-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* TOP CITIES */}
      <div className="grid items-center bg-gray-50 border rounded-xl p-3 mb-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Top Cities</h2>

          <button
            type="button"
            onClick={() => addItem("topCities")}
            className="h-10 w-10 rounded-lg bg-blue-600 text-white"
          >
            +
          </button>
        </div>

        <div className="space-y-4">
          {form.topCities.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 items-end border border-gray-200 rounded-2xl p-4 bg-white shadow-sm"
            >
              {/* SELECT CITY */}
              <div className="col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select City / Area
                </label>

                <select
                  value={item.url}
                  onChange={(e) => {
                    const selected = locationOptions.find(
                      (loc) => loc.value === e.target.value,
                    );

                    handleArrayChange(
                      "topCities",
                      index,
                      "label",
                      selected?.label || "",
                    );

                    handleArrayChange(
                      "topCities",
                      index,
                      "url",
                      e.target.value,
                    );
                  }}
                  className="w-full h-12 border border-gray-300 rounded-xl px-4 outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Select City / Area</option>

                  {locationOptions
                    ?.filter(
                      (loc) =>
                        !selectedTopCities.includes(loc.value) ||
                        loc.value === item.url,
                    )
                    .map((loc, i) => (
                      <option key={i} value={loc.value}>
                        {loc.label}
                      </option>
                    ))}
                </select>
              </div>

              {/* PATH */}
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Path
                </label>

                <input
                  type="text"
                  value={item.url}
                  disabled
                  placeholder="Selected path..."
                  className="w-full h-12 border border-gray-200 rounded-xl px-4 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* DELETE */}
              <div className="col-span-1 flex justify-center">
                <button
                  type="button"
                  onClick={() => removeItem("topCities", index)}
                  className="h-12 w-12 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="grid grid-cols-2 gap-4 mb-20">
        <input
          type="text"
          name="copyright"
          value={form.copyright}
          onChange={handleChange}
          placeholder="Copyright"
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="developedBy"
          value={form.developedBy}
          onChange={handleChange}
          placeholder="Developed By"
          className="border p-3 rounded-lg"
        />
      </div>

      {/* SAVE BUTTON */}
      <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!isChanged}
          className={`px-6 py-3 rounded-lg text-white transition ${
            !isChanged || saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving..." : "Save Footer"}
        </button>
      </div>
    </div>
  );
}

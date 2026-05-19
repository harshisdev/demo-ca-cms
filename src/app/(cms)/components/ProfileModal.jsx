"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trash2, Upload } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

export default function ProfileModal({
  isOpen,
  onClose,
  form = {},
  setForm,
  onSubmit,
  isEdit,
  locations,
}) {
  // OPTIONS
  const designationOptions = [
    "Chartered Accountant",
    "Tax Consultant",
    "GST Consultant",
    "Financial Advisor",
    "Auditor",
  ];

  const specializationOptions = [
    "GST Filing",
    "Income Tax",
    "Business Registration",
    "Company Audit",
    "TDS Filing",
    "Accounting",
  ];

  const qualificationOptions = [
    "CA",
    "CA Inter",
    "MBA Finance",
    "B.Com",
    "M.Com",
  ];

  const experienceOptions = Array.from(
    { length: 20 },
    (_, i) => `${i + 1} Years`,
  );

  const ratingOptions = ["1", "2", "3", "4", "5"];

  // cities only
  const cityOptions = locations.filter((loc) => loc.type === "city");

  // selected city object
  const selectedCity = locations.find((loc) => loc.name === form.city);

  // areas based on selected city
  const areaOptions = selectedCity?.children || [];

  const serviceOptions = [
    "GST Filing",
    "Income Tax Return",
    "Audit",
    "Company Registration",
    "TDS Filing",
  ];

  const languageOptions = ["Hindi", "English", "Gujarati", "Marathi"];

  const expertiseOptions = [
    "GST",
    "Income Tax",
    "Audit",
    "ROC Filing",
    "Accounting",
  ];

  const certificationOptions = [
    "ICAI Certified",
    "GST Practitioner",
    "ISO Consultant",
  ];

  const highlightOptions = [
    "10+ Years Experience",
    "Trusted Advisor",
    "Quick Response",
    "100+ Clients",
  ];

  const handleCheckbox = (field, value) => {
    const current = form[field] || [];

    if (current.includes(value)) {
      setForm({
        ...form,
        [field]: current.filter((item) => item !== value),
      });
    } else {
      setForm({
        ...form,
        [field]: [...current, value],
      });
    }
  };

  const validateAndSubmit = () => {
    const requiredFields = {
      name: "Name",
      email: "Email",
      mobile: "Mobile Number",
      designation: "Designation",
      specialization: "Specialization",
      qualification: "Qualification",
      city: "City",
      area: "Area",
      experience: "Experience",
      rating: "Rating",
      address: "Address",
      about: "About",
    };

    for (const key in requiredFields) {
      if (!form[key]) {
        return toast.error(`${requiredFields[key]} is required`);
      }
    }

    // Services validation
    if (!form.services?.length) {
      return toast.error("Please select at least one service");
    }

    // Languages validation
    if (!form.languages?.length) {
      return toast.error("Please select at least one language");
    }

    onSubmit();
  };

  const addFaq = () => {
    setForm({
      ...form,
      faq: [
        ...(form.faq || []),
        {
          question: "",
          answer: "",
        },
      ],
    });
  };

  const removeFaq = (index) => {
    const updatedFaq = [...form.faq];

    updatedFaq.splice(index, 1);

    setForm({
      ...form,
      faq: updatedFaq,
    });
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaq = [...form.faq];

    updatedFaq[index][field] = value;

    setForm({
      ...form,
      faq: updatedFaq,
    });
  };

  useEffect(() => {
    if (form.name && !form.slug) {
      setForm((prev) => ({
        ...prev,
        slug: prev.name.toLowerCase().replace(/\s+/g, "-"),
      }));
    }
  }, [form.name]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");

        const data = await res.json();

        if (data.success && data.profiles?.length > 0) {
          const profile = data.profiles[0];

          setForm({
            ...profile,
            services: profile.services || [],
            expertise: profile.expertise || [],
            reviews: Array.isArray(profile.reviews) ? profile.reviews : [],
            certifications: Array.isArray(profile.certifications)
              ? profile.certifications
              : [],
            highlights: profile.highlights || [],
            languages: profile.languages || [],
            faq: profile.faq || [],
            reviews: profile.reviews || [],
            workingHours: profile.workingHours || {},
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);
  const locationOptions = locations.flatMap((city) => [
    {
      label: city.name,
      name: city.name,
      value: city.slug,
      type: "city",
    },

    ...(city.children || []).map((area) => ({
      label: `${city.name} → ${area.name}`,
      name: area.name,
      value: area.slug,
      type: "area",
    })),
  ]);

  // AFTER all hooks
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-10 overflow-y-auto z-20">
      <div className="bg-white w-[700px] rounded relative max-h-[90vh] overflow-auto">
        {/* HEADER */}
        <div className="border-b px-6 py-5 z-20 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isEdit ? "Update CA Profile" : "Add CA Profile"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage chartered accountant professional profile
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* IMAGE */}
          <div className="bg-gray-50 border rounded-2xl p-5 w-7/12 mx-auto">
            <h3 className="section-title text-center">Profile Image</h3>

            <div className="flex items-center justify-center gap-5">
              {/* PREVIEW */}
              {form.image ? (
                <img
                  src={form.image}
                  alt="Preview"
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
                  {form.image ? "Change" : "Upload"} Image
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
                      const allowedTypes = [
                        "image/png",
                        "image/jpeg",
                        "image/jpg",
                      ];

                      if (!allowedTypes.includes(file.type)) {
                        return toast.error("Only PNG and JPG images allowed");
                      }

                      // SIZE VALIDATION
                      const maxSize = 2 * 1024 * 1024;

                      if (file.size > maxSize) {
                        return toast.error(
                          "Image size should be less than 2MB",
                        );
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
                          image: data.url,
                        });

                        toast.success("Image uploaded successfully!");
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

          {/* BASIC */}
          <div className="card">
            <h3 className="section-title">Basic Information</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                className="input"
                placeholder="Full Name *"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="input"
                placeholder="Slug"
                value={form.slug || ""}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />

              <select
                className="input"
                value={form.designation || ""}
                onChange={(e) =>
                  setForm({ ...form, designation: e.target.value })
                }
              >
                <option value="">Select Designation *</option>

                {designationOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                className="input"
                value={form.specialization || ""}
                onChange={(e) =>
                  setForm({ ...form, specialization: e.target.value })
                }
              >
                <option value="">Select Specialization *</option>

                {specializationOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                className="input"
                value={form.qualification || ""}
                onChange={(e) =>
                  setForm({ ...form, qualification: e.target.value })
                }
              >
                <option value="">Select Qualification *</option>

                {qualificationOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <input
                className="input"
                placeholder="Membership Number"
                value={form.membership || ""}
                onChange={(e) =>
                  setForm({ ...form, membership: e.target.value })
                }
              />
            </div>
          </div>

          {/* PROFESSIONAL */}
          <div className="card">
            <h3 className="section-title">Professional Details</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <select
                className="input"
                value={form.experience || ""}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
              >
                <option value="">Select Experience *</option>

                {experienceOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <select
                className="input"
                value={form.rating || ""}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
              >
                <option value="">Select Rating *</option>

                {ratingOptions.map((item) => (
                  <option key={item} value={item}>
                    {item} Star
                  </option>
                ))}
              </select>

              <input
                className="input"
                placeholder="Total Clients"
                value={form.clients || ""}
                onChange={(e) => setForm({ ...form, clients: e.target.value })}
              />

              <input
                className="input"
                placeholder="Consultation Fee"
                value={form.fee || ""}
                onChange={(e) => setForm({ ...form, fee: e.target.value })}
              />
            </div>
          </div>
          {/* EXPERTISE */}
          <div className="card">
            <h3 className="section-title">Expertise</h3>

            <div className="grid md:grid-cols-3 gap-3">
              {expertiseOptions.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 border rounded-xl px-4 py-3"
                >
                  <input
                    type="checkbox"
                    checked={form.expertise?.includes(item) || false}
                    onChange={() => handleCheckbox("expertise", item)}
                  />

                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
          {/* HIGHLIGHTS */}
          <div className="card">
            <h3 className="section-title">Highlights</h3>

            <div className="grid md:grid-cols-2 gap-3">
              {highlightOptions.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 border rounded-xl px-4 py-3"
                >
                  <input
                    type="checkbox"
                    checked={form.highlights?.includes(item) || false}
                    onChange={() => handleCheckbox("highlights", item)}
                  />

                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
          {/* CERTIFICATIONS */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title mb-0">Certifications</h3>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    certifications: [
                      ...(Array.isArray(form.certifications)
                        ? form.certifications
                        : []),
                      "",
                    ],
                  })
                }
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
              >
                + Add Certification
              </button>
            </div>

            {!form.certifications?.length ? (
              <div className="text-sm text-gray-400">
                No certifications added
              </div>
            ) : (
              <div className="space-y-3">
                {form.certifications.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      className="input"
                      placeholder="Certification Name"
                      value={item}
                      onChange={(e) => {
                        const updated = [...form.certifications];

                        updated[index] = e.target.value;

                        setForm({
                          ...form,
                          certifications: updated,
                        });
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...form.certifications];

                        updated.splice(index, 1);

                        setForm({
                          ...form,
                          certifications: updated,
                        });
                      }}
                      className="text-red-500 text-xs hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* REVIEWS */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title mb-0">Client Reviews</h3>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    reviews: [
                      ...(Array.isArray(form.reviews) ? form.reviews : []),
                      {
                        name: "",
                        rating: "",
                        comment: "",
                      },
                    ],
                  })
                }
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
              >
                + Add Review
              </button>
            </div>

            {!form.reviews?.length ? (
              <div className="text-sm text-gray-400">No reviews added</div>
            ) : (
              <div className="space-y-4">
                {form.reviews.map((item, index) => (
                  <div key={index} className="border rounded-xl p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-sm">
                        Review #{index + 1}
                      </h4>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...form.reviews];

                          updated.splice(index, 1);

                          setForm({
                            ...form,
                            reviews: updated,
                          });
                        }}
                        className="text-red-500 text-xs hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        className="input"
                        placeholder="Client Name"
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...form.reviews];

                          updated[index].name = e.target.value;

                          setForm({
                            ...form,
                            reviews: updated,
                          });
                        }}
                      />

                      <select
                        className="input"
                        value={item.rating}
                        onChange={(e) => {
                          const updated = [...form.reviews];

                          updated[index].rating = e.target.value;

                          setForm({
                            ...form,
                            reviews: updated,
                          });
                        }}
                      >
                        <option value="">Select Rating</option>

                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} Star
                          </option>
                        ))}
                      </select>

                      <textarea
                        className="input md:col-span-2 h-24"
                        placeholder="Review Comment"
                        value={item.comment}
                        onChange={(e) => {
                          const updated = [...form.reviews];

                          updated[index].comment = e.target.value;

                          setForm({
                            ...form,
                            reviews: updated,
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* WORKING HOURS */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="section-title mb-0">Working Hours</h3>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    workingHours: [
                      ...(form.workingHours || []),
                      {
                        days: "",
                        from: "",
                        to: "",
                      },
                    ],
                  })
                }
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
              >
                + Add Timing
              </button>
            </div>

            {!form.workingHours?.length ? (
              <div className="text-sm text-gray-400">
                No working hours added
              </div>
            ) : (
              <div className="space-y-4">
                {form.workingHours.map((item, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-4 gap-3 border rounded-xl p-4"
                  >
                    {/* DAYS */}
                    <select
                      className="input col-span"
                      value={item.days}
                      onChange={(e) => {
                        const updated = [...form.workingHours];

                        updated[index].days = e.target.value;

                        setForm({
                          ...form,
                          workingHours: updated,
                        });
                      }}
                    >
                      <option value="">Select Days</option>

                      <option value="Monday-Friday">Monday-Friday</option>

                      <option value="Monday-Saturday">Monday-Saturday</option>

                      <option value="Saturday">Saturday</option>

                      <option value="Sunday">Sunday</option>
                    </select>

                    {/* FROM */}
                    <input
                      type="time"
                      className="input"
                      value={item.from}
                      onChange={(e) => {
                        const updated = [...form.workingHours];

                        updated[index].from = e.target.value;

                        setForm({
                          ...form,
                          workingHours: updated,
                        });
                      }}
                    />

                    {/* TO */}
                    <input
                      type="time"
                      className="input"
                      value={item.to}
                      onChange={(e) => {
                        const updated = [...form.workingHours];

                        updated[index].to = e.target.value;

                        setForm({
                          ...form,
                          workingHours: updated,
                        });
                      }}
                    />

                    {/* REMOVE */}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...form.workingHours];

                        updated.splice(index, 1);

                        setForm({
                          ...form,
                          workingHours: updated,
                        });
                      }}
                      className="text-red-500 text-xs hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* LOCATION */}
          <div className="card">
            <h3 className="section-title">Location Details</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <select
                className="input"
                value={form.city || ""}
                onChange={(e) => {
                  const selectedCity = locations.find(
                    (loc) => loc.name === e.target.value,
                  );

                  setForm({
                    ...form,
                    city: e.target.value,

                    // if no area exists use city name
                    area:
                      selectedCity?.children?.length > 0 ? "" : e.target.value,
                  });
                }}
              >
                <option value="">Select City *</option>

                {cityOptions.map((city) => (
                  <option key={city._id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>

              <select
                className="input"
                value={form.area || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    area: e.target.value,
                  })
                }
                // disable only when city not selected
                disabled={!form.city || areaOptions.length === 0}
              >
                <option value="">
                  {areaOptions.length > 0
                    ? "Select Area *"
                    : "No Area Available"}
                </option>

                {areaOptions.map((area) => (
                  <option key={area._id} value={area.name}>
                    {area.name}
                  </option>
                ))}
              </select>

              <textarea
                className="input md:col-span-2 h-24"
                placeholder="Office Address *"
                value={form.address || ""}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
          </div>

          {/* SERVICES */}
          <div className="card">
            <h3 className="section-title">Services</h3>

            <div className="grid md:grid-cols-3 gap-3">
              {serviceOptions.map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer hover:border-indigo-500"
                >
                  <input
                    type="checkbox"
                    checked={form.services?.includes(service) || false}
                    onChange={() => handleCheckbox("services", service)}
                  />

                  <span>{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* LANGUAGES */}
          <div className="card">
            <h3 className="section-title">Languages</h3>

            <div className="grid md:grid-cols-4 gap-3">
              {languageOptions.map((language) => (
                <label
                  key={language}
                  className="flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer hover:border-indigo-500"
                >
                  <input
                    type="checkbox"
                    checked={form.languages?.includes(language) || false}
                    onChange={() => handleCheckbox("languages", language)}
                  />

                  <span>{language}</span>
                </label>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className="card">
            <h3 className="section-title">Contact Details</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="tel"
                className="input"
                placeholder="Mobile Number *"
                value={form.mobile || ""}
                maxLength={10}
                onChange={(e) => {
                  // ONLY NUMBERS + MAX 10
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);

                  setForm({
                    ...form,
                    mobile: value,
                  });
                }}
              />

              <input
                className="input"
                placeholder="Email Address *"
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* ABOUT */}
          <div className="card">
            <h3 className="section-title">About Professional</h3>

            <textarea
              className="input h-36"
              placeholder="Write professional bio *"
              value={form.about || ""}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
            />
          </div>
          {/* LOCATION SELECT */}

          {/* PROFILE VISIBILITY */}
          <div className="card">
            <h3 className="section-title">Profile Visibility</h3>

            <div className="space-y-5">
              {/* SHOW PROFILE */}
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.profileVisibility?.showProfile ?? true}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      profileVisibility: {
                        ...form.profileVisibility,
                        showProfile: e.target.checked,
                      },
                    })
                  }
                />

                <span>Show Profile</span>
              </label>

              {/* SHOW ALL PAGES */}
              {form.profileVisibility?.showProfile && (
                <>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.profileVisibility?.showOnAllPages ?? false}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          profileVisibility: {
                            ...form.profileVisibility,
                            showOnAllPages: e.target.checked,
                          },
                        })
                      }
                    />

                    <span>Show On All Pages</span>
                  </label>
                  {!form.profileVisibility?.showOnAllPages && (
                    <Select
                      isMulti
                      options={locationOptions}
                      placeholder="Search and select locations..."
                      className="text-sm"
                      value={locationOptions.filter((option) =>
                        form.profileVisibility?.locations?.some(
                          (item) => item.slug === option.value,
                        ),
                      )}
                      onChange={(selected) => {
                        setForm({
                          ...form,
                          profileVisibility: {
                            ...form.profileVisibility,
                            locations: (selected || []).map((item) => ({
                              name: item.name,
                              slug: item.value,
                              type: item.type,
                            })),
                          },
                        });
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title mb-0">Frequently Asked Questions</h3>

              <button
                type="button"
                onClick={addFaq}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
              >
                + Add FAQ
              </button>
            </div>

            {!form.faq?.length ? (
              <div className="text-sm text-gray-400">No FAQ added</div>
            ) : (
              <div className="space-y-4">
                {form.faq.map((item, index) => (
                  <div key={index} className="border rounded-xl p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-sm">FAQ #{index + 1}</h4>

                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Question"
                        className="input"
                        value={item.question}
                        onChange={(e) =>
                          handleFaqChange(index, "question", e.target.value)
                        }
                      />

                      <textarea
                        placeholder="Answer"
                        className="input h-24"
                        value={item.answer}
                        onChange={(e) =>
                          handleFaqChange(index, "answer", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="sticky bottom-0 bg-white border-t py-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              onClick={validateAndSubmit}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
            >
              {isEdit ? "Update Profile" : "Create Profile"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 5px;
          padding: 15px;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #000;
        }

        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          background: #f9fafb;
          border-radius: 5px;
          padding: 7px;
          outline: none;
          transition: 0.2s;
        }

        .input:focus {
          border-color: #000;
          background: white;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
      `}</style>
    </div>
  );
}

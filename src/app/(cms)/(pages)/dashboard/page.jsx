"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import LocationTable from "../../components/LocationTable";
import LocationModal from "../../components/LocationModal";
import ProfileTable from "../../components/ProfileTable";
import ProfileModal from "../../components/ProfileModal";
import SeoTable from "../../components/SeoTable";
import SeoModal from "../../components/SeoModal";
import PageContentTable from "../../components/PageContentTable";
import PageContentModal from "../../components/PageContentModal";
import toast from "react-hot-toast";
import DashboardProfile from "../../components/DashboardProfile";
import FooterCMS from "../../components/Footer";
import Loader from "../../components/Loader";
import Home from "../../components/Home";
import Blog from "../../components/Blog";
import About from "../../components/About";
import Services from "../../components/Services";
import ContactUs from "../../components/ContactUs";

export default function Dashboard() {
  const [locations, setLocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [view, setView] = useState("location");
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [seoList, setSeoList] = useState([]);
  const [editSlug, setEditSlug] = useState(false);
  const [errors, setErrors] = useState({});

  const [pageContentList, setPageContentList] = useState([]);

  const emptyForm = {
    name: "",
    slug: "",
    type: "",
    parent: "",
  };

  const [form, setForm] = useState(emptyForm);

  // ================= FETCH =================
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/location");
      const data = await res.json();
      setLocations(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  const fetchProfiles = async () => {
    try {
      const res = await fetch("/api/profile");

      const data = await res.json();

      setProfiles(data.profiles || []);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 Auto generate slug
  const handleNameChange = (e) => {
    const name = e.target.value;

    // ❌ Don't overwrite manual slug
    if (editSlug) {
      setForm({
        ...form,
        name,
      });

      return;
    }

    const slug = `ca-in-${name.toLowerCase().trim().replace(/\s+/g, "-")}`;

    setForm({
      ...form,
      name,
      slug,
    });

    setErrors((prev) => ({
      ...prev,
      name: "",
      slug: "",
    }));
  };

  // ================= CREATE =================
  const handleCreate = async () => {
    try {
      const res = await fetch("/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // ❌ API Error
      if (!res.ok) {
        toast.error(data.error || "Failed to create location");

        // 🔥 Keep modal open
        setModalOpen(true);

        return;
      }

      // ✅ Success
      toast.success("Location created successfully!");

      setModalOpen(false);

      setForm(emptyForm);

      setEditing(null);

      setEditSlug(false);

      fetchData();
    } catch (err) {
      console.error("Create error:", err);

      toast.error("Something went wrong");

      // 🔥 Keep modal open
      setModalOpen(true);
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      const res = await fetch("/api/location", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editing._id,
          ...form,
        }),
      });

      const data = await res.json();

      // ❌ API Error
      if (!res.ok) {
        toast.error(data.error || "Failed to update location");

        // 🔥 Keep modal open
        setModalOpen(true);

        return;
      }

      // ✅ Success
      toast.success("Location updated successfully!");

      setEditing(null);

      setModalOpen(false);

      setForm(emptyForm);

      setEditSlug(false);

      fetchData();
    } catch (err) {
      console.error("Update error:", err);

      toast.error("Something went wrong");

      // 🔥 Keep modal open
      setModalOpen(true);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await fetch("/api/location", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setEditing(null);
      toast.success("Location deleted successfully!");
    }
  };

  // ================= ADD NEW =================
  const handleAddNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const handleCreateProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Profile created successfully!");

        setModalOpen(false);

        fetchProfiles();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to create profile");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: editing._id,
          ...form,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Profile updated successfully!");

        setModalOpen(false);

        fetchProfiles();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to update profile");
    }
  };

  const handleDeleteProfile = async (id) => {
    try {
      const res = await fetch("/api/profile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Profile deleted successfully!");

        fetchProfiles();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete profile");
    }
  };

  const fetchSeo = async () => {
    const res = await fetch("/api/seo");
    const data = await res.json();
    setSeoList(data);
  };

  const handleCreateSeo = async () => {
    await fetch("/api/seo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    toast.success("SEO metadata created successfully!");

    setModalOpen(false);
    fetchSeo();
  };

  const handleUpdateSeo = async () => {
    const res = await fetch("/api/seo", {
      method: "PUT", // ✅ always PUT for update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    setModalOpen(false);
    setEditing(null);
    fetchSeo(); // ✅ refresh list
    toast.success("SEO metadata updated successfully!");
  };
  const handleDeleteSeo = async (id) => {
    await fetch("/api/seo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // 👈 send id in body
    });

    toast.success("SEO metadata deleted successfully!");
    fetchSeo();
  };

  const fetchPageContent = async () => {
    const res = await fetch("/api/page-content");
    const data = await res.json();
    setPageContentList(data);
  };

  const handleCreatePageContent = async () => {
    await fetch("/api/page-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    toast.success("Page content created successfully!");

    setModalOpen(false);
    fetchPageContent();
  };

  const handleUpdatePageContent = async () => {
    await fetch("/api/page-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    toast.success("Page content updated successfully!");

    setModalOpen(false);
    setEditing(null);
    fetchPageContent();
  };

  const handleDeletePageContent = async (id) => {
    await fetch("/api/page-content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    toast.success("Page content deleted successfully!");
    fetchPageContent();
  };

  useEffect(() => {
    if (view === "location") fetchData();
    if (view === "profile") fetchProfiles();
    if (view === "seo") fetchSeo();
    if (view === "page-content") fetchPageContent();
  }, [view]);

  return (
    <div className="flex">
      <Sidebar view={view} setView={setView} />

      <div className="flex-1 p-5">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">
            {view === "location"
              ? "Add Location"
              : view === "profile"
                ? "CA Profiles"
                : view === "seo"
                  ? "SEO Metadata"
                  : view === "page-content"
                    ? "Page Content"
                    : view === "footer"
                      ? "Footer Content"
                      : view === "home"
                        ? "Home Page"
                        : view === "about"
                          ? "About Page"
                          : view === "blog"
                            ? "Blog Page"
                            : view === "contact"
                              ? "Contact Page"
                              : view === "services"
                                ? "Services Page"
                                : "Dashboard"}
          </h1>
          {!["footer", "home", "about", "blog", "contact", "services"].includes(
            view,
          ) ? (
            <button
              onClick={handleAddNew}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add New{" "}
              {view === "location"
                ? "Location"
                : view === "profile"
                  ? "Profile"
                  : view === "seo"
                    ? "SEO"
                    : "Page Content"}
            </button>
          ) : null}

          <DashboardProfile />
        </div>

        {loading ? (
          <Loader />
        ) : view === "location" ? (
          <LocationTable
            data={locations}
            onEdit={(loc) => {
              setEditing(loc);
              setForm({
                ...loc,
                parent: loc.parent?._id || "",
              });
              setModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        ) : view === "profile" ? (
          <ProfileTable
            data={profiles}
            onEdit={(p) => {
              setEditing(p);
              setForm(p);
              setModalOpen(true);
            }}
            onDelete={handleDeleteProfile}
          />
        ) : view === "seo" ? (
          <SeoTable
            data={seoList}
            locations={locations}
            onEdit={(item) => {
              setEditing(item);
              setForm(item);
              setModalOpen(true);
            }}
            onDelete={handleDeleteSeo}
          />
        ) : view === "page-content" ? (
          <PageContentTable
            data={pageContentList}
            onEdit={(item) => {
              setEditing(item);
              setForm(item);
              setModalOpen(true);
            }}
            onDelete={handleDeletePageContent}
          />
        ) : view === "home" ? (
          <Home />
        ) : view === "about" ? (
          <About />
        ) : view === "services" ? (
          <Services />
        ) : view === "blog" ? (
          <Blog />
        ) : view === "contact" ? (
          <ContactUs />
        ) : view === "footer" ? (
          <FooterCMS />
        ) : null}
      </div>
      {/* MODAL */}
      {view === "location" ? (
        <LocationModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
            setForm(emptyForm);
            setEditSlug(false);
            setErrors({});
          }}
          form={form}
          setForm={setForm}
          isEdit={!!editing}
          onSubmit={editing ? handleUpdate : handleCreate}
          handleNameChange={handleNameChange}
          editSlug={editSlug}
          setEditSlug={setEditSlug}
          errors={errors}
          setErrors={setErrors}
        />
      ) : view === "profile" ? (
        <ProfileModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          form={form}
          setForm={setForm}
          isEdit={!!editing}
          onSubmit={editing ? handleUpdateProfile : handleCreateProfile}
          locations={locations}
        />
      ) : view === "seo" ? (
        <SeoModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          form={form}
          setForm={setForm}
          isEdit={!!editing}
          onSubmit={editing ? handleUpdateSeo : handleCreateSeo}
          locations={locations}
          data={seoList}
        />
      ) : view === "page-content" ? (
        <PageContentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          form={form}
          setForm={setForm}
          isEdit={!!editing}
          onSubmit={editing ? handleUpdatePageContent : handleCreatePageContent}
          locations={locations}
          data={pageContentList}
        />
      ) : null}
    </div>
  );
}

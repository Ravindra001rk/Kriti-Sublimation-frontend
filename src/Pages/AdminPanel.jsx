import { useState, useEffect, useRef } from "react";
import React from "react";
import { logo } from "../assets/frontend_assets";

const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : `http://${window.location.hostname}:5000`;

function useAuth() {
  const [authed, setAuthed] = useState(null);
  useEffect(() => {
    fetch(`${API}/api/admin/check`, { credentials: "include" })
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);
  return [authed, setAuthed];
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.username || !form.password) return setError("Fill all fields");
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error);
      else onLogin();
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100dvh-3rem)] lg:min-h-[calc(100dvh-4rem)] flex items-center justify-center bg-brandBg px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 translate-x-1/3 -translate-y-1/3"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 -translate-x-1/3 translate-y-1/3"
          style={{
            background: "radial-gradient(circle, #db2777, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-lg"
            style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}
          >
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to your dashboard
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="username"
                className="w-full bg-brandBg-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-violet-400 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                className="w-full bg-brandBg-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-violet-400 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            )}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #db2777)",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DESKTOP SIDEBAR ──────────────────────────────────────────────────────────
function Sidebar({ tab, setTab, onLogout }) {
  const items = [
    {
      id: "upload",
      label: "Upload Photo",
      icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
    },
    {
      id: "gallery",
      label: "All Photos",
      icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
      id: "Products",
      label: "Products",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    },
  ];

  return (
    <aside className="hidden md:flex w-56 h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] bg-white border-r border-gray-200 flex-col shadow-sm flex-shrink-0">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div>
            {/* <img src={logo} alt="Logo" className="h-12" /> */}
            <p className="text-black text-2xl font-bold">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === item.id
                ? "text-violet-700 bg-violet-50 border border-violet-100"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={item.icon}
              />
            </svg>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

// ─── MOBILE TOP BAR ───────────────────────────────────────────────────────────
function MobileTopBar({ tab, onLogout }) {
  const titles = {
    upload: "Upload Photo",
    gallery: "All Photos",
    settings: "Settings",
  };
  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}
        >
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <span className="font-bold text-gray-900 text-sm">{titles[tab]}</span>
      </div>
      <button
        onClick={onLogout}
        className="text-red-500 text-xs font-medium flex items-center gap-1"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </div>
  );
}

// ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────
function MobileBottomNav({ tab, setTab }) {
  const items = [
    {
      id: "upload",
      label: "Upload",
      icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
    },
    {
      id: "gallery",
      label: "Photos",
      icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-10 shadow-lg">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setTab(item.id)}
          className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-all ${
            tab === item.id ? "text-violet-600" : "text-gray-400"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={item.icon}
            />
          </svg>
          {item.label}
          {tab === item.id && (
            <span className="w-1 h-1 rounded-full bg-violet-600" />
          )}
        </button>
      ))}
    </nav>
  );
}

// ─── UPLOAD TAB ───────────────────────────────────────────────────────────────
function UploadTab() {
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleFile = (f) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleUpload = async () => {
    if (!phone || phone.length !== 10)
      return setError("Enter a valid 10-digit phone number");
    if (!file) return setError("Select a photo");
    setLoading(true);
    setError("");
    setSuccess("");
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("photo", file);
    try {
      const res = await fetch(`${API}/api/photos/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) setError(data.error);
      else {
        setSuccess("Photo uploaded successfully!");
        setPhone("");
        setFile(null);
        setPreview(null);
      }
    } catch {
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
        Upload Photo
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Attach a photo to a customer's phone number
      </p>

      <div className="space-y-5">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
            Customer Phone Number
          </label>
          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-violet-400 transition-colors shadow-sm">
            <span className="px-4 text-sm font-semibold text-gray-400 border-r border-gray-200 py-3">
              +977
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/, "").slice(0, 10))
              }
              placeholder="98XXXXXXXX"
              className="flex-1 bg-transparent px-4 py-3 text-gray-900 text-sm outline-none placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
            Photo
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all"
          >
            {preview ? (
              <div>
                <img
                  src={preview}
                  alt="preview"
                  className="max-h-40 sm:max-h-48 mx-auto rounded-lg object-cover object-top shadow"
                />
                <p className="text-xs text-gray-400 mt-3">Tap to change</p>
              </div>
            ) : (
              <div>
                <svg
                  className="w-10 h-10 text-gray-300 mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500 text-sm">Tap to select photo</p>
                <p className="text-gray-400 text-xs mt-1">JPG, PNG, JPEG</p>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="text-red-600 text-xs">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <p className="text-green-600 text-xs">{success}</p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-semibold text-sm text-white shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #FE6E4D, #CC1267" }}
        >
          {loading ? "Uploading..." : "Upload Photo"}
        </button>
      </div>
    </div>
  );
}

// ─── GALLERY TAB ──────────────────────────────────────────────────────────────
function GalleryTab() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editPhone, setEditPhone] = useState("");
  const [search, setSearch] = useState("");

  const fetchPhotos = async () => {
    try {
      const res = await fetch(`${API}/api/photos/all`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setPhotos(data.photos);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this photo?")) return;
    await fetch(`${API}/api/photos/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setPhotos((p) => p.filter((ph) => ph._id !== id));
  };

  const handleUpdate = async (id) => {
    if (editPhone.length !== 10) return alert("Enter valid 10-digit number");
    const res = await fetch(`${API}/api/photos/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ phone: editPhone }),
    });
    if (res.ok) {
      setPhotos((p) =>
        p.map((ph) => (ph._id === id ? { ...ph, phone: editPhone } : ph)),
      );
      setEditId(null);
    }
  };

  const filtered = photos.filter((p) => p.phone.includes(search));
  const formatDate = (d) =>
    new Date(d).toLocaleString("en-NP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading)
    return <p className="text-gray-400 animate-pulse">Loading photos...</p>;

  return (
    <div className="w-full">
      {" "}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        {" "}
        <div>
          {" "}
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            {" "}
            All Photos{" "}
          </h2>{" "}
          <p className="text-gray-500 text-sm">
            {photos.length} photos total
          </p>{" "}
        </div>{" "}
        <input
          type="text"
          placeholder="Search by phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors placeholder-gray-400 w-full sm:w-52 shadow-sm"
        />{" "}
      </div>{" "}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          {" "}
          <p className="text-gray-400">No photos found</p>{" "}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {" "}
          {filtered.map((photo) => (
            <div
              key={photo._id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-all shadow-sm"
            >
              {" "}
              <div className="relative group">
                {" "}
                <img
                  src={photo.imageUrl}
                  alt="photo"
                  className="w-full h-36 sm:h-44 object-cover object-top cursor-pointer"
                  onClick={() => window.open(photo.imageUrl, "_blank")}
                />{" "}
              </div>{" "}
              <div className="p-2.5 sm:p-3">
                {" "}
                {editId === photo._id ? (
                  <div className="flex gap-1.5 mb-2">
                    {" "}
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) =>
                        setEditPhone(
                          e.target.value.replace(/\D/, "").slice(0, 10),
                        )
                      }
                      className="flex-1 bg-brandBg-50 border border-gray-200 rounded-lg px-2 py-1.5 text-gray-900 text-xs outline-none focus:border-violet-400 min-w-0"
                    />{" "}
                    <button
                      onClick={() => handleUpdate(photo._id)}
                      className="px-2 py-1.5 rounded-lg text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 flex-shrink-0"
                    >
                      {" "}
                      ✓{" "}
                    </button>{" "}
                    <button
                      onClick={() => setEditId(null)}
                      className="px-2 py-1.5 rounded-lg text-xs text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      {" "}
                      ✕{" "}
                    </button>{" "}
                  </div>
                ) : (
                  <p className="text-gray-800 text-xs sm:text-sm font-semibold mb-1 truncate">
                    {" "}
                    📱 {photo.phone}{" "}
                  </p>
                )}{" "}
                <p className="text-gray-400 text-xs mb-2.5 truncate">
                  {" "}
                  🕒 {formatDate(photo.createdAt)}{" "}
                </p>{" "}
                <div className="flex gap-1.5">
                  {" "}
                  <button
                    onClick={() => {
                      setEditId(photo._id);
                      setEditPhone(photo.phone);
                    }}
                    className="flex-1 py-1.5 rounded-lg text-xs font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors"
                  >
                    {" "}
                    Edit{" "}
                  </button>{" "}
                  <button
                    onClick={() => handleDelete(photo._id)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    {" "}
                    Delete{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
    </div>
  );
}

// ─── SETTINGS TAB ─────────────────────────────────────────────────────────────
function SettingsTab() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    if (form.newPassword !== form.confirmPassword)
      return setError("Passwords don't match");
    if (form.newPassword.length < 8) return setError("Min 8 characters");
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API}/api/admin/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error);
      else {
        setSuccess("Password changed! Please login again.");
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
        Settings
      </h2>
      <p className="text-gray-500 text-sm mb-6">Manage your admin account</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-5">
          Change Password
        </h3>
        <div className="space-y-4">
          {[
            { key: "currentPassword", label: "Current Password" },
            { key: "newPassword", label: "New Password" },
            { key: "confirmPassword", label: "Confirm New Password" },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                {f.label}
              </label>
              <input
                type="password"
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-violet-400 focus:bg-white transition-colors placeholder-gray-400"
              />
            </div>
          ))}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <p className="text-green-600 text-xs">{success}</p>
            </div>
          )}

          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 bg-gradient-to-br from-[#FE6E4D] to-[#CC1267]"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}


// ProductsCustomize TAb ───────────────────────────────────────────────────────────────
function ProductsCustomize(){
  return(
    <h1>thi is products..</h1>
  )
}
// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("upload");

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-4rem)] bg-gray-50">
      {/* Desktop sidebar */}
      <Sidebar tab={tab} setTab={setTab} onLogout={onLogout} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <MobileTopBar tab={tab} onLogout={onLogout} />

        <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24 md:pb-8 overflow-auto">
          {tab === "upload" && <UploadTab />}
          {tab === "gallery" && <GalleryTab />}
          {tab === "settings" && <SettingsTab />}
          {tab === "Products" && <ProductsCustomize />}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileBottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed] = useAuth();

  const handleLogout = async () => {
    await fetch(`${API}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    setAuthed(false);
  };

  if (authed === null)
    return (
      <div className="min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-4rem)] flex items-center justify-center bg-brandBg">
        <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={handleLogout} />;
}

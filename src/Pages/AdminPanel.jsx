import { useState, useEffect, useRef } from "react";
import React from "react";
import { logo } from "../assets/frontend_assets";

const API =
  window.location.hostname === "localhost" ||
  window.location.hostname === "192.168.1.208"
    ? `http://${window.location.hostname}:5000`
    : "https://kriti-sublimation-backend.onrender.com";

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
    <div className="h-screen flex items-center justify-center bg-brandBg px-4">
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
function Sidebar({ tab, setTab, onLogout, pendingCount }) {
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
      id: "products",
      label: "Products",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    },
    {
      id: "manage",
      label: "Manage",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    },
    {
      id: "idcards",
      label: "ID Cards",
      icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    },
  ];

  return (
    <aside className="hidden md:flex w-56 h-screen bg-white border-r border-gray-200 flex-col shadow-sm flex-shrink-0">
      <div className="p-6 border-b border-gray-100">
        <p className="text-black text-2xl font-bold">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === item.id
                ? "text-violet-700 bg-violet-50"
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
            <span className="flex-1 text-left">{item.label}</span>
            {item.id === "idcards" && pendingCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-4">
                {pendingCount}
              </span>
            )}
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
function MobileTopBar({ tab, onLogout, setTab }) {
  const titles = {
    upload: "Upload Photo",
    gallery: "All Photos",
    settings: "Settings",
    manage: "Manage",
    products: "Products",
    idcards: "ID Cards",
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

      <div className="flex items-center gap-3">
        <button
          onClick={() => setTab("settings")}
          className="text-gray-500 flex items-center"
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
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
      id: "idcards",
      label: "ID Cards",
      icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2",
    },
    // {
    //   id: "settings",
    //   label: "Settings",
    //   icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    // },
    {
      id: "products",
      label: "Products",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    },
    {
      id: "manage",
      label: "Manage",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-10 shadow-lg">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setTab(item.id)}
          className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-all ${tab === item.id ? "text-violet-600" : "text-gray-400"}`}
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
          style={{ background: "linear-gradient(135deg, #FE6E4D, #CC1267)" }}
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            All Photos
          </h2>
          <p className="text-gray-500 text-sm">{photos.length} photos total</p>
        </div>
        <input
          type="text"
          placeholder="Search by phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors placeholder-gray-400 w-full sm:w-52 shadow-sm"
        />
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400">No photos found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((photo) => (
            <div
              key={photo._id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-all shadow-sm"
            >
              <div className="relative group">
                <img
                  src={photo.imageUrl}
                  alt="photo"
                  className="w-full h-46 sm:h-54 object-cover object-top cursor-pointer"
                  onClick={() => window.open(photo.imageUrl, "_blank")}
                />
              </div>
              <div className="p-2.5 sm:p-3">
                {editId === photo._id ? (
                  <div className="flex gap-1.5 mb-2">
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) =>
                        setEditPhone(
                          e.target.value.replace(/\D/, "").slice(0, 10),
                        )
                      }
                      className="flex-1 bg-brandBg-50 border border-gray-200 rounded-lg px-2 py-1.5 text-gray-900 text-xs outline-none focus:border-violet-400 min-w-0"
                    />
                    <button
                      onClick={() => handleUpdate(photo._id)}
                      className="px-2 py-1.5 rounded-lg text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 flex-shrink-0"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="px-2 py-1.5 rounded-lg text-xs text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-800 text-xs sm:text-sm font-semibold mb-1 truncate">
                    📱 {photo.phone}
                  </p>
                )}
                <p className="text-gray-400 text-xs mb-2.5 truncate">
                  🕒 {formatDate(photo.createdAt)}
                </p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      setEditId(photo._id);
                      setEditPhone(photo.phone);
                    }}
                    className="flex-1 py-1.5 rounded-lg text-xs font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(photo._id)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("upload");
  const [pendingCount, setPendingCount] = useState(0);

  const refreshPendingCount = () => {
    fetch(`${API}/api/id-applications/all?type=office&status=Pending`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setPendingCount(data.length))
      .catch(() => {});
  };

  useEffect(() => {
    refreshPendingCount();
  }, []);

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-4rem)] bg-gray-50">
      <Sidebar
        tab={tab}
        setTab={setTab}
        onLogout={onLogout}
        pendingCount={pendingCount}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopBar tab={tab} onLogout={onLogout} setTab={setTab} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24 md:pb-8 overflow-auto">
          {tab === "upload" && <UploadTab />}
          {tab === "gallery" && <GalleryTab />}
          {tab === "settings" && <SettingsTab />}
          {tab === "products" && <ProductsTab />}
          {tab === "manage" && <ManageTab />}
          {tab === "idcards" && (
            <IDCardTab onStatusChange={refreshPendingCount} />
          )}
        </main>
      </div>
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

// ─── PRODUCTS TAB ─────────────────────────────────────────────────────────────
function ProductsTab() {
  const [form, setForm] = useState({
    name: "",
    shortDesc: "",
    longDesc: "",
    category: "",
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("upload");
  const fileRef = useRef();

  const categories = [
    "T-Shirts",
    "Cups",
    "Sublimation",
    "Lanyard",
    "ID Cards",
    "Badges",
    "Frames",
    "Holder",
    "Accessories",
  ];

  const fetchProducts = async () => {
    const res = await fetch(`${API}/api/products`, { credentials: "include" });
    const data = await res.json();
    if (res.ok) setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFile = (fileList) => {
    const arr = Array.from(fileList);
    setFiles(arr);
    setPreviews(arr.map((f) => URL.createObjectURL(f)));
  };

  const handleUpload = async () => {
    if (!form.name || !form.shortDesc || !form.category)
      return setError("Fill all fields");
    if (!files.length) return setError("Select at least one image");
    setLoading(true);
    setError("");
    setSuccess("");
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    files.forEach((f) => formData.append("images", f));
    try {
      const res = await fetch(`${API}/api/products/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) setError(data.error);
      else {
        setSuccess("Product uploaded!");
        sessionStorage.removeItem("productsCache");
        setForm({ name: "", shortDesc: "", longDesc: "", category: "" });
        setFiles([]);
        setPreviews([]);
        fetchProducts();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {view === "upload" && (
        <div className="max-w-xl">
          <div className="space-y-4">
            <div
              onClick={() => fileRef.current.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all"
            >
              {previews.length > 0 ? (
                <div className="flex gap-2 flex-wrap justify-center">
                  {previews.map((p, i) => (
                    <img
                      key={i}
                      src={p}
                      className="h-24 w-24 object-cover rounded-lg shadow"
                    />
                  ))}
                  <p className="w-full text-xs text-gray-400 text-center mt-1">
                    Click to change
                  </p>
                </div>
              ) : (
                <div>
                  <svg
                    className="w-10 h-10 text-gray-300 mx-auto mb-2"
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
                  <p className="text-gray-500 text-sm">
                    Click to select images{" "}
                    <span className="text-violet-500">(multiple allowed)</span>
                  </p>
                  <p className="text-gray-400 text-xs mt-1">JPG, PNG, JPEG</p>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFile(e.target.files)}
            />
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={form.name}
                placeholder="Custom T-Shirt"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors placeholder-gray-400 shadow-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Short Description{" "}
                <span className="text-gray-400 normal-case">
                  (shown at top)
                </span>
              </label>
              <textarea
                value={form.shortDesc}
                placeholder="One line summary..."
                onChange={(e) =>
                  setForm({ ...form, shortDesc: e.target.value })
                }
                rows={2}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors placeholder-gray-400 shadow-sm resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Long Description{" "}
                <span className="text-gray-400 normal-case">
                  (shown at bottom)
                </span>
              </label>
              <textarea
                value={form.longDesc}
                placeholder="Detailed product description..."
                onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
                rows={4}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors placeholder-gray-400 shadow-sm resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors shadow-sm"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
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
              className="w-full py-3 rounded-xl font-semibold text-sm text-white shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #db2777)",
              }}
            >
              {loading ? "Uploading..." : "Upload Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MANAGE TAB ───────────────────────────────────────────────────────────────
function ManageTab() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    shortDesc: "",
    longDesc: "",
    category: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editSuccess, setEditSuccess] = useState("");
  const [editError, setEditError] = useState("");
  const [editFiles, setEditFiles] = useState([]);
  const [editPreviews, setEditPreviews] = useState([]);
  const editFileRef = useRef();

  const categories = [
    "T-Shirts",
    "Cup",
    "Caps",
    "Lanyard",
    "ID Cards",
    "Badges",
    "Frames",
    "Holder",
    "Accessories",
    "Other",
  ];

  const fetchProducts = async () => {
    const res = await fetch(`${API}/api/products`, { credentials: "include" });
    const data = await res.json();
    if (res.ok) setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        alert("Delete failed");
        return;
      }
      setProducts((p) => p.filter((pr) => pr._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setEditForm({
      name: product.name,
      shortDesc: product.shortDesc || "",
      longDesc: product.longDesc || "",
      category: product.category,
    });
    setEditFiles([]);
    setEditPreviews([]);
    setEditSuccess("");
    setEditError("");
  };

  const closeEdit = () => setEditProduct(null);

  const handleEditFile = (fileList) => {
    const arr = Array.from(fileList);
    setEditFiles(arr);
    setEditPreviews(arr.map((f) => URL.createObjectURL(f)));
  };

  const handleEditSave = async () => {
    if (!editForm.name || !editForm.shortDesc || !editForm.category)
      return setEditError("Fill all fields");
    setEditLoading(true);
    setEditError("");
    setEditSuccess("");
    const formData = new FormData();
    Object.entries(editForm).forEach(([k, v]) => formData.append(k, v));
    editFiles.forEach((f) => formData.append("images", f));
    try {
      const res = await fetch(`${API}/api/products/id/${editProduct._id}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) setEditError(data.error);
      else {
        setEditSuccess("Product updated!");
        fetchProducts();
        setTimeout(() => closeEdit(), 1000);
      }
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteImage = async (productId, imageUrl) => {
    if (!confirm("Remove this image?")) return;
    try {
      const res = await fetch(`${API}/api/products/id/${productId}/image`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });
      if (!res.ok) {
        alert("Image delete failed");
        return;
      }
      setEditProduct((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== imageUrl),
      }));
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-36 object-cover cursor-pointer"
              onClick={() => window.open(product.images[0], "_blank")}
            />
            <div className="p-3">
              <p className="text-gray-900 text-sm font-semibold truncate">
                {product.name}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{product.category}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openEdit(product)}
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative mx-auto bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Edit Product</h3>
              <button
                onClick={closeEdit}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Current Images
                </label>
                <div className="flex gap-2 flex-wrap">
                  {editProduct.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img}
                        className="h-20 w-20 object-cover rounded-lg shadow"
                      />
                      <button
                        onClick={() => handleDeleteImage(editProduct._id, img)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Add More Images
                </label>
                <div
                  onClick={() => editFileRef.current.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all"
                >
                  {editPreviews.length > 0 ? (
                    <div className="flex gap-2 flex-wrap justify-center">
                      {editPreviews.map((p, i) => (
                        <img
                          key={i}
                          src={p}
                          className="h-16 w-16 object-cover rounded-lg shadow"
                        />
                      ))}
                      <p className="w-full text-xs text-gray-400 mt-1">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Click to add images</p>
                  )}
                </div>
                <input
                  ref={editFileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleEditFile(e.target.files)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors shadow-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Short Description
                </label>
                <textarea
                  value={editForm.shortDesc}
                  onChange={(e) =>
                    setEditForm({ ...editForm, shortDesc: e.target.value })
                  }
                  rows={1}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors shadow-sm resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Long Description
                </label>
                <textarea
                  value={editForm.longDesc}
                  onChange={(e) =>
                    setEditForm({ ...editForm, longDesc: e.target.value })
                  }
                  rows={2}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors shadow-sm resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Category
                </label>
                <select
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors shadow-sm"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              {editError && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-red-600 text-xs">{editError}</p>
                </div>
              )}
              {editSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <p className="text-green-600 text-xs">{editSuccess}</p>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={closeEdit}
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  disabled={editLoading}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #db2777)",
                  }}
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ID CARD TAB ──────────────────────────────────────────────────────────────
function IDCardTab({ onStatusChange }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [statusForm, setStatusForm] = useState({});
  const [saving, setSaving] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(null);

  const statuses = [
    "Pending",
    "Approved",
    "Rejected",
    "Printing",
    "Ready for Collection",
  ];

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-blue-100 text-blue-700",
    Rejected: "bg-red-100 text-red-700",
    Printing: "bg-purple-100 text-purple-700",
    "Ready for Collection": "bg-green-100 text-green-700",
  };

  const statusIcons = {
    Pending: "⏳",
    Approved: "✅",
    Rejected: "❌",
    Printing: "🖨️",
    "Ready for Collection": "🎉",
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.append("status", filterStatus);
      params.append("type", "office");
      if (search) params.append("search", search);
      const res = await fetch(`${API}/api/id-applications/all?${params}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setApplications(data);
        const forms = {};
        data.forEach((app) => {
          forms[app._id] = {
            status: app.status,
            rejectionReason: app.rejectionReason || "",
            estimatedDate: app.estimatedDate
              ? app.estimatedDate.split("T")[0]
              : "",
            adminNotes: app.adminNotes || "",
          };
        });
        setStatusForm(forms);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filterStatus]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchApplications();
  };

  const handleFormChange = (id, field, value) => {
    setStatusForm((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSaveStatus = async (app) => {
    const f = statusForm[app._id];
    if (f.status === "Rejected" && !f.rejectionReason.trim()) {
      alert("Please enter rejection reason");
      return;
    }
    setSaving(app._id);
    setSaveSuccess(null);
    try {
      const res = await fetch(`${API}/api/id-applications/${app._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          status: f.status,
          rejectionReason: f.rejectionReason,
          estimatedDate: f.estimatedDate,
          adminNotes: f.adminNotes,
        }),
      });
      if (res.ok) {
        setSaveSuccess(app._id);
        await fetchApplications();
        onStatusChange();
        setTimeout(() => setSaveSuccess(null), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    try {
      const res = await fetch(`${API}/api/id-applications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a._id !== id));
        setExpanded(null);
        onStatusChange();
      }
    } catch (err) {
      console.error(err);
    }
  };
const handleSendSMS = async (id) => {
  try {
    const res = await fetch(`${API}/api/id-applications/${id}/send-sms`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) alert("SMS sent!");
    else alert(data.message);
  } catch (err) {
    alert("SMS failed");
  }
};
  const pendingCount = applications.filter(
    (a) => a.status === "Pending",
  ).length;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            ID Card Applications
            {pendingCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingCount} pending
              </span>
            )}
          </h2>
          <p className="text-gray-500 text-sm">
            {applications.length} total applications
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input
            type="text"
            placeholder="Search by name or submission ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors placeholder-gray-400 shadow-sm"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}
          >
            Search
          </button>
        </form>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm outline-none focus:border-violet-400 shadow-sm"
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400 animate-pulse">Loading applications...</p>
      ) : applications.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400">No applications found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() =>
                  setExpanded(expanded === app._id ? null : app._id)
                }
              >
                <img
                  src={app.photo}
                  alt="photo"
                  className="w-10 h-12 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(app.photo, "_blank");
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {app.employeeName || app.studentName}
                    </p>
                    <span className="text-xs text-gray-400 font-mono">
                      {app.submissionId}
                    </span>
                    <span className="text-xs text-gray-400 capitalize bg-gray-100 px-2 py-0.5 rounded-full">
                      {app.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {app.officeName || app.schoolName} •{" "}
                    {new Date(app.createdAt).toLocaleDateString("en-NP")}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[app.status] || "bg-gray-100 text-gray-700"}`}
                  >
                    {statusIcons[app.status]} {app.status}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${expanded === app._id ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {expanded === app._id && (
                <div className="border-t border-gray-100 p-4 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Left — Details */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Application Details
                      </p>
                      <div className="space-y-2">
                        <div className="flex gap-3 mb-3">
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Photo</p>
                            <img
                              src={app.photo}
                              alt="photo"
                              className="w-16 h-20 object-cover rounded-xl border border-gray-200 cursor-pointer shadow-sm"
                              onClick={() => window.open(app.photo, "_blank")}
                            />
                          </div>
                          {app.sign && (
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Sign</p>
                              <img
                                src={app.sign}
                                alt="sign"
                                className="w-16 h-20 object-cover rounded-xl border border-gray-200 cursor-pointer shadow-sm"
                                onClick={() => window.open(app.sign, "_blank")}
                              />
                            </div>
                          )}
                        </div>
                        {[
                          ["Submission ID", app.submissionId],
                          ["Office", app.officeName],
                          ["Employee Name", app.employeeName],
                          ["Name (Nepali)", app.employeeNameNepali],
                          ["Designation", app.designation],
                          ["Designation (Nepali)", app.designationNepali],
                          ["Citizenship No", app.citizenshipNo],
                          ["Contact", app.contactNo],
                          ["Blood Group", app.bloodGroup],
                          ["PIS No", app.pisNo],
                          ["Permanent Address", app.permanentAddress],
                          ["Address (Nepali)", app.permanentAddressNepali],
                          ["Other Details", app.otherDetails],
                          [
                            "Submitted",
                            new Date(app.createdAt).toLocaleString("en-NP"),
                          ],
                        ]
                          .filter(([, v]) => v)
                          .map(([label, value]) => (
                            <div key={label} className="flex gap-2 text-sm">
                              <span className="text-gray-400 w-36 flex-shrink-0">
                                {label}:
                              </span>
                              <span className="text-gray-800 font-medium">
                                {value}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Right — Status Management */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Update Status
                      </p>
                      {statusForm[app._id] && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 block mb-1">
                              Status
                            </label>
                            <select
                              value={statusForm[app._id].status}
                              onChange={(e) =>
                                handleFormChange(
                                  app._id,
                                  "status",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors"
                            >
                              {statuses.map((s) => (
                                <option key={s} value={s}>
                                  {statusIcons[s]} {s}
                                </option>
                              ))}
                            </select>
                          </div>

                          {statusForm[app._id].status === "Rejected" && (
                            <div>
                              <label className="text-xs font-semibold text-red-500 block mb-1">
                                Rejection Reason *
                              </label>
                              <textarea
                                value={statusForm[app._id].rejectionReason}
                                onChange={(e) =>
                                  handleFormChange(
                                    app._id,
                                    "rejectionReason",
                                    e.target.value,
                                  )
                                }
                                rows={2}
                                placeholder="Enter reason for rejection..."
                                className="w-full bg-white border border-red-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm outline-none focus:border-red-400 transition-colors resize-none"
                              />
                            </div>
                          )}

                          <div>
                            <label className="text-xs font-semibold text-gray-500 block mb-1">
                              Estimated Collection Date
                            </label>
                            <input
                              type="date"
                              value={statusForm[app._id].estimatedDate}
                              onChange={(e) =>
                                handleFormChange(
                                  app._id,
                                  "estimatedDate",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-gray-500 block mb-1">
                              Admin Notes (internal only)
                            </label>
                            <textarea
                              value={statusForm[app._id].adminNotes}
                              onChange={(e) =>
                                handleFormChange(
                                  app._id,
                                  "adminNotes",
                                  e.target.value,
                                )
                              }
                              rows={2}
                              placeholder="Internal notes, not visible to customer..."
                              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm outline-none focus:border-violet-400 transition-colors resize-none"
                            />
                          </div>

                          {app.statusTimeline &&
                            app.statusTimeline.length > 0 && (
                              <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-2">
                                  Timeline
                                </label>
                                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                                  {[...app.statusTimeline]
                                    .reverse()
                                    .map((item, i) => (
                                      <div
                                        key={i}
                                        className="flex items-start gap-2 text-xs"
                                      >
                                        <span>
                                          {statusIcons[item.status] || "•"}
                                        </span>
                                        <div>
                                          <span className="font-semibold text-gray-700">
                                            {item.status}
                                          </span>
                                          <span className="text-gray-400 ml-1">
                                            {new Date(
                                              item.changedAt,
                                            ).toLocaleString("en-NP")}
                                          </span>
                                          {item.note && (
                                            <p className="text-gray-500">
                                              {item.note}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}

                          <button
                            onClick={() => handleSaveStatus(app)}
                            disabled={saving === app._id}
                            className="w-full py-3 rounded-xl text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                            style={{
                              background:
                                "linear-gradient(135deg, #7c3aed, #db2777)",
                            }}
                          >
                            {saving === app._id
                              ? "Saving..."
                              : saveSuccess === app._id
                                ? "✓ Saved!"
                                : "Save Status"}
                          </button>

                          <button
                            onClick={() => handleSendSMS(app._id)}
                            className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 transition"
                          >
                            📱 Send SMS
                          </button>
                          <button
                            onClick={() => handleDelete(app._id)}
                            className="w-full py-3 rounded-xl text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition"
                          >
                            🗑️ Delete Application
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

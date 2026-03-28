import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";
import { useUserAuth } from "../context/UserAuthContext";

const authHeaders = () => {
  const token = sessionStorage.getItem("userToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ── Status Badge ──
const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-blue-100 text-blue-700",
    Printing: "bg-purple-100 text-purple-700",
    "Ready for Collection": "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${colors[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
};

// ── Change Password Modal ──
const ChangePasswordModal = ({ onClose }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords don't match");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/change-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          credentials: "include",
          body: JSON.stringify({
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to change password");
      setSuccess(true);
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {success ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-7 h-7 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="font-semibold text-gray-900">Password changed!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: "Current Password",
                name: "currentPassword",
                placeholder: "••••••••",
              },
              {
                label: "New Password",
                name: "newPassword",
                placeholder: "Min. 6 characters",
              },
              {
                label: "Confirm New Password",
                name: "confirmPassword",
                placeholder: "Repeat new password",
              },
            ].map(({ label, name, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type="password"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
                />
              </div>
            ))}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-bold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

// ── Logout Confirm Modal ──
const LogoutModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
    >
      <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-7 h-7 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Logout?</h2>
      <p className="text-gray-500 text-sm mb-6">
        You will be signed out of your account.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </motion.div>
  </div>
);

// ── Submission Card ──
const SubmissionCard = ({ submission }) => {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const typeLabel = {
    school: "School Student",
    "school-staff": "School Staff",
    office: "Office",
  };

  const typeColor = {
    school: "bg-blue-50 text-blue-600",
    "school-staff": "bg-purple-50 text-purple-600",
    office: "bg-orange-50 text-orange-600",
  };

  const mainName =
    submission.studentName ||
    submission.staffName ||
    submission.employeeName ||
    "—";

  const orgName = submission.schoolName || submission.officeName || "—";

  // Download photo(s) as zip
  const handleDownloadPhotos = async (e) => {
    e.stopPropagation();
    if (!submission.photo) {
      alert("No photos available to download");
      return;
    }

    setDownloading(true);
    try {
      const zip = new JSZip();

      // If it's a single submission with one photo
      const photoUrl = submission.photo;
      const photoResponse = await fetch(photoUrl);
      if (!photoResponse.ok) throw new Error("Failed to fetch photo");

      const photoBlob = await photoResponse.blob();
      const fileName = `${mainName.replace(/\s+/g, "_")}_${submission.submissionId}.jpg`;
      zip.file(fileName, photoBlob);

      // Generate and download zip
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${submission.submissionId}_photos.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Download failed: ${err.message}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          {submission.photo && (
            <img
              src={submission.photo}
              alt="photo"
              className="w-10 h-10 rounded-xl object-cover border border-gray-100 flex-shrink-0"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900 text-sm">{mainName}</p>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor[submission.type] || "bg-gray-100 text-gray-600"}`}
              >
                {typeLabel[submission.type] || submission.type}
              </span>
              <span className="text-xs text-gray-400">
                {submission.submissionId}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={submission.status} />
          <span className="text-gray-400 text-sm ml-1">{open ? "▲" : "▼"}</span>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-5 py-4 space-y-3">
              {/* Details */}
              <div className="divide-y divide-gray-50">
                {[
                  ["Submission ID", submission.submissionId],
                  ["Organisation", orgName],
                  ["Contact No", submission.contactNo],
                  ["Status", submission.status],
                  submission.type === "school" &&
                    submission.classGrade && [
                      "Class/Grade",
                      submission.classGrade,
                    ],
                  submission.rejectionReason && [
                    "Rejection Reason",
                    submission.rejectionReason,
                  ],
                  submission.estimatedDate && [
                    "Estimated Date",
                    new Date(submission.estimatedDate).toLocaleDateString(),
                  ],
                  [
                    "Submitted On",
                    new Date(submission.createdAt).toLocaleDateString(),
                  ],
                ]
                  .filter(Boolean)
                  .filter(([, v]) => v)
                  .map(([label, value]) => (
                    <div key={label} className="flex gap-2 py-2">
                      <span className="text-xs text-gray-400 w-2/5 flex-shrink-0">
                        {label}
                      </span>
                      <span
                        className={`text-xs font-medium ${label === "Rejection Reason" ? "text-red-600" : "text-gray-800"}`}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Check Status Link */}
              <div className="flex items-center gap-2">
                <Link
                  to={`/status/${submission.submissionId}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] bg-clip-text text-transparent"
                >
                  View full status →
                </Link>
                {submission.photo && (
                  <button
                    onClick={handleDownloadPhotos}
                    disabled={downloading}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#FE6E4D] hover:text-[#CC1267] transition disabled:opacity-50"
                  >
                    {downloading ? "Downloading..." : "⬇ Export"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Main Profile Page ──
const ProfilePage = () => {
  const { user, loading, logout } = useUserAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [subLoading, setSubLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showLogout, setShowLogout] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [user, loading]);

  useEffect(() => {
    if (!user) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/users/getMySubmissions`, {
      credentials: "include",
      headers: authHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        // Backend returns { office: [], students: [], staff: [] }
        const office = (data.office || []).map((s) => ({
          ...s,
          type: "office",
        }));
        const students = (data.students || []).map((s) => ({
          ...s,
          type: "school",
        }));
        const staff = (data.staff || []).map((s) => ({
          ...s,
          type: "school-staff",
        }));
        // Merge and sort by newest first
        const all = [...office, ...students, ...staff].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setSubmissions(all);
      })
      .catch(() => setSubmissions([]))
      .finally(() => setSubLoading(false));
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const tabs = [
    { key: "all", label: "All" },
    { key: "school", label: "Student" },
    { key: "school-staff", label: "Staff" },
    { key: "office", label: "Office" },
  ];

  const filtered =
    activeTab === "all"
      ? submissions
      : submissions.filter((s) => s.type === activeTab);

  const counts = {
    all: submissions.length,
    school: submissions.filter((s) => s.type === "school").length,
    "school-staff": submissions.filter((s) => s.type === "school-staff").length,
    office: submissions.filter((s) => s.type === "office").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#FE6E4D] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4">
      <AnimatePresence>
        {showLogout && (
          <LogoutModal
            onConfirm={handleLogout}
            onCancel={() => setShowLogout(false)}
          />
        )}
        {showChangePassword && (
          <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto space-y-5">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900 truncate">
                {user.name}
              </h1>
              {user.organizationName && (
                <p className="text-sm font-medium text-[#FE6E4D] truncate">
                  {user.organizationName}
                </p>
              )}
              <p className="text-sm text-gray-500">{user.contactNo}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {submissions.length} submission
                {submissions.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              onClick={() => setShowChangePassword(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Change Password
            </button>
            <button
              onClick={() => setShowLogout(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-red-100 text-sm font-medium text-red-500 hover:bg-red-50 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
        </motion.div>

        {/* Submissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            My Submissions
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
            {tabs.map((t) =>
              counts[t.key] > 0 || t.key === "all" ? (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${
                    activeTab === t.key
                      ? "bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {t.label}
                  {counts[t.key] > 0 && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        activeTab === t.key
                          ? "bg-white/20"
                          : "bg-white text-gray-600"
                      }`}
                    >
                      {counts[t.key]}
                    </span>
                  )}
                </button>
              ) : null,
            )}
          </div>

          {/* List */}
          {subLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin w-7 h-7 border-4 border-[#FE6E4D] border-t-transparent rounded-full" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm">No submissions yet.</p>
              <Link
                to="/id-card-application"
                className="inline-block mt-3 text-sm font-semibold bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] bg-clip-text text-transparent"
              >
                Apply for an ID card →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((sub) => (
                <SubmissionCard key={sub._id} submission={sub} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;

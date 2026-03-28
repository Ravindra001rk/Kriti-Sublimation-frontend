import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import imageCompression from "browser-image-compression";
import { useUserAuth } from "../context/UserAuthContext";

// ── Reusable Field (matches SchoolStaffForm exactly) ──
const Field = ({
  label,
  name,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {required && <span className="text-red-500 mr-1">*</span>}
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
    />
  </div>
);

// ── Empty student template ──
const emptyStudent = () => ({
  id: Date.now() + Math.random(),
  studentName: "",
  guardianName: "",
  address: "",
  classGrade: "",
  dateOfBirth: "",
  contactNo: "",
  bloodGroup: "",
  rollNo: "",
  otherDetails: "",
  photo: null,
  photoPreview: null,
});

// ── Login / Register Modal ──
const AuthModal = ({ onClose, onLogin, onBypass }) => {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({
    organizationName: "",
    name: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (tab === "register") {
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
    }

    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const endpoint = tab === "login" ? "login" : "register";
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            organizationName: form.organizationName,
            name: form.name,
            contactNo: form.contactNo,
            password: form.password,
          }),
          signal: controller.signal,
        },
      );

      if (!res.ok) {
        const errorText = await res.text();
        let errorMsg = "Something went wrong";
        try {
          const errorData = JSON.parse(errorText);
          errorMsg = errorData.message || errorMsg;
        } catch {
          errorMsg = errorText || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const data = await res.json();
      onLogin(data.user || data);
    } catch (err) {
      console.error("Auth error:", err);
      if (err.name === "AbortError") {
        setError(
          "Request timed out. Please check your connection and try again.",
        );
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 pt-2  2 bg-black/50 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {tab === "login" ? "Login to Continue" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          You need an account to submit student ID card applications.
        </p>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
          {["login", "register"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setError("");
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                tab === t ? "bg-white shadow text-gray-900" : "text-gray-500"
              }`}
            >
              {t === "login" ? "Login" : "Create Account"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Register-only fields */}
          {tab === "register" && (
            <>
              <Field
                label="Organization Name"
                name="organizationName"
                value={form.organizationName}
                onChange={handleChange}
                required
                placeholder="Organization Name"
              />
              <Field
                label="Representative Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </>
          )}

          <Field
            label="Contact Number"
            name="contactNo"
            value={form.contactNo}
            onChange={handleChange}
            required
            type="tel"
            placeholder="98XXXXXXXX"
          />
          <Field
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            type="password"
            placeholder={tab === "register" ? "Min 6 characters" : "••••••••"}
          />

          {tab === "register" && (
            <Field
              label="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              type="password"
              placeholder="••••••••"
            />
          )}

          {/* Forgot password link — login only */}
          {tab === "login" && (
            <div className="text-right -mt-1">
              <a
                href="/forgot-password"
                className="text-xs text-[#CC1267] hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-bold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : tab === "login"
                ? "Login"
                : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-400">
            {tab === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setTab(tab === "login" ? "register" : "login");
                setError("");
              }}
              className="text-[#CC1267] font-semibold hover:underline"
            >
              {tab === "login" ? "Create one" : "Login"}
            </button>
          </p>
        </form>

        {/* I'm a Student bypass button */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <button
            onClick={onBypass}
            className="w-full py-3 rounded-xl border border-[#FE6E4D] text-[#FE6E4D] font-semibold hover:bg-orange-50 transition"
          >
            I'm a Student — Apply without login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ── Single Student Card ──
const StudentCard = ({
  student,
  index,
  total,
  onChange,
  onRemove,
  forceClose,
  user,
  mode,
}) => {
  const [open, setOpen] = useState(true);

  // Collapse when parent signals forceClose
  React.useEffect(() => {
    if (forceClose) setOpen(false);
  }, [forceClose]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      // iOS compatibility: disable useWebWorker which can cause issues on iOS
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 500,
        useWebWorker: false,
      });
      onChange(student.id, "photo", compressed);
      onChange(student.id, "photoPreview", URL.createObjectURL(compressed));
    } catch (err) {
      console.error("Image compression error:", err);
      // Fallback: use original file if compression fails
      onChange(student.id, "photo", file);
      onChange(student.id, "photoPreview", URL.createObjectURL(file));
    }
  };

  const handleField = (e) =>
    onChange(student.id, e.target.name, e.target.value);

  const isComplete = student.studentName && student.contactNo && student.photo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Card Header */}
      <div
        className="flex items-center justify-between px-6 py-4 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              isComplete
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {isComplete ? "✓" : index + 1}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              Student {index + 1}
              {student.studentName && (
                <span className="text-gray-400 font-normal ml-2">
                  — {student.studentName}
                </span>
              )}
            </p>
            {!isComplete && <p className="text-xs text-gray-400">Incomplete</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(student.id);
              }}
              className="text-red-400 hover:text-red-600 text-xs px-3 py-1 rounded-lg hover:bg-red-50 transition font-medium"
            >
              Remove
            </button>
          )}
          <span className="text-gray-400 text-sm">{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Card Body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-gray-100 pt-5">
              {/* Photo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-red-500 mr-1">*</span>Upload Photo
                </label>
                <label className="block cursor-pointer w-fit">
                  <div className="w-[110px] h-[140px] rounded-xl border-2 border-dashed border-gray-200 hover:border-[#FE6E4D] transition overflow-hidden bg-gray-50 flex items-center justify-center">
                    {student.photoPreview ? (
                      <img
                        src={student.photoPreview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-3">
                        <div className="text-2xl mb-1">📷</div>
                        <p className="text-xs text-gray-400">Click to upload</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/jpg,image/jpeg,image/png,image/webp"
                    onChange={handleFile}
                    className="hidden"
                  />
                </label>
              </div>

              {mode === "login" && user ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    School Name
                  </label>
                  <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium flex items-center">
                    {user.organizationName || "N/A"}
                  </div>
                </div>
              ) : (
                <Field
                  label="School Name"
                  name="schoolName"
                  value={student.schoolName}
                  onChange={handleField}
                  placeholder="Your organization/school name"
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Student Name"
                  name="studentName"
                  value={student.studentName}
                  onChange={handleField}
                  required
                  placeholder="Full name"
                />
                <Field
                  label="Guardian Name"
                  name="guardianName"
                  value={student.guardianName}
                  onChange={handleField}
                  required
                  placeholder="Parent/Guardian name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Class/Grade"
                  name="classGrade"
                  value={student.classGrade}
                  onChange={handleField}
                  placeholder="e.g. LKG 'A', Grade 5, etc."
                  required
                />
                <Field
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={student.dateOfBirth}
                  onChange={handleField}
                  type="text"
                  placeholder="Date of Birth"
                />
                <Field
                  label="Contact No"
                  name="contactNo"
                  value={student.contactNo}
                  onChange={handleField}
                  required
                  type="tel"
                  placeholder="98XXXXXXXX"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Roll No"
                  name="rollNo"
                  value={student.rollNo}
                  onChange={handleField}
                  placeholder="e.g. A-101 (optional)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={student.bloodGroup}
                    onChange={handleField}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
                  >
                    <option value="">Select</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ),
                    )}
                  </select>
                </div> */}
                <Field
                  label="Address"
                  name="address"
                  value={student.address}
                  onChange={handleField}
                  required
                  placeholder="Address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Other Details
                </label>
                <input
                  type="text"
                  name="otherDetails"
                  value={student.otherDetails}
                  onChange={handleField}
                  placeholder="Any additional info (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Main Page ──
const SchoolStudentsPage = () => {
  const { user, loading, login } = useUserAuth();
  const navigate = useNavigate();

  // "choose" = initial choice screen, "guest" = guest single form, "login" = logged-in bulk
  const [mode, setMode] = useState("choose");
  const [showAuth, setShowAuth] = useState(true);
  const [students, setStudents] = useState([emptyStudent()]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState(""); // for guest
  const [error, setError] = useState("");

  // Once user logs in, switch to login mode automatically
  React.useEffect(() => {
    if (user && mode === "choose") setMode("login");
  }, [user]);

  const handleChange = (id, field, value) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  // Validate last student is complete before adding new one
  const isStudentComplete = (s) =>
    s.studentName && s.guardianName && s.address && s.contactNo && s.photo;

  const addStudent = () => {
    const last = students[students.length - 1];
    if (!isStudentComplete(last)) {
      setError(
        `Please complete Student ${students.length}'s form before adding another.`,
      );
      return;
    }
    setError("");
    // Collapse all existing cards, then add new one (new one opens by default)
    setStudents((prev) => prev.map((s) => ({ ...s, _forceClose: true })));
    setTimeout(() => {
      setStudents((prev) => [
        ...prev.map((s) => ({ ...s, _forceClose: false })),
        emptyStudent(),
      ]);
    }, 50);
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const missing = students.findIndex((s) => !s.photo);
    if (missing !== -1) {
      setError(`Student ${missing + 1} is missing a photo.`);
      return;
    }

    setSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout per student

    try {
      const endpoint =
        mode === "guest"
          ? `${import.meta.env.VITE_API_URL}/api/school-applications/guest-submit`
          : `${import.meta.env.VITE_API_URL}/api/school-applications/submit`;

      for (const student of students) {
        const fd = new FormData();
        const schoolName =
          mode === "login" ? user.organizationName : student.schoolName;
        fd.append("schoolName", schoolName);
        fd.append("studentName", student.studentName);
        fd.append("guardianName", student.guardianName);
        fd.append("address", student.address);
        fd.append("classGrade", student.classGrade);
        fd.append("dateOfBirth", student.dateOfBirth);
        fd.append("contactNo", student.contactNo);
        fd.append("bloodGroup", student.bloodGroup);
        fd.append("rollNo", student.rollNo);
        fd.append("otherDetails", student.otherDetails);
        fd.append("photo", student.photo);

        const res = await fetch(endpoint, {
          method: "POST",
          body: fd,
          credentials: "include",
          signal: controller.signal,
        });

        if (!res.ok) {
          const errorText = await res.text();
          let errorMsg = "Submission failed";
          try {
            const errorData = JSON.parse(errorText);
            errorMsg = errorData.message || errorMsg;
          } catch {
            errorMsg = errorText || errorMsg;
          }
          throw new Error(errorMsg);
        }

        const data = await res.json();
        if (mode === "guest") setSubmittedId(data.submissionId || "");
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      if (err.name === "AbortError") {
        setError(
          "Request timed out. Please check your connection and try again.",
        );
      } else {
        setError(err.message || "Failed to submit. Please try again.");
      }
    } finally {
      clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#FE6E4D] border-t-transparent rounded-full" />
      </div>
    );
  }

  // Success screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-500"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Submitted!</h2>
          <p className="text-gray-500 mb-6">
            Your application has been received successfully.
          </p>

          {mode === "guest" && submittedId ? (
            <div className="bg-gradient-to-br from-[#FE6E4D]/10 to-[#CC1267]/10 rounded-2xl p-5 mb-6 border border-[#FE6E4D]/20">
              <p className="text-sm text-gray-500 mb-1">Your Submission ID</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] bg-clip-text text-transparent tracking-wider">
                {submittedId}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Save this ID to check your status later.
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#FE6E4D]/10 to-[#CC1267]/10 rounded-2xl p-5 mb-6 border border-[#FE6E4D]/20 text-left">
              <p className="text-sm text-gray-600 mb-2">
                View your submission IDs and track status in your profile:
              </p>
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] bg-clip-text text-transparent"
              >
                View in Profile →
              </Link>
            </div>
          )}

          <div className="flex gap-3">
            {mode !== "guest" && (
              <Link
                to="/profile"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-medium hover:opacity-90 transition text-center"
              >
                Go to Profile
              </Link>
            )}
            <button
              onClick={() => {
                setSubmitted(false);
                setStudents([emptyStudent()]);
                setSubmittedId("");
              }}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              New Submission
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4">
      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && !user && (
          <AuthModal
            onClose={() => navigate(-1)}
            onLogin={(userData) => {
              login(userData);
              setShowAuth(false);
              setMode("login");
            }}
            onBypass={() => {
              setShowAuth(false);
              setMode("guest");
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        {!(showAuth && !user) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-900">
              School Student ID Card
            </h1>
            <p className="text-gray-400 text-sm">
              विद्यालय विद्यार्थी परिचय पत्र आवेदन
            </p>
          </motion.div>
        )}

        {/* Guest single form */}
        {mode === "guest" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => {
                  setMode("choose");
                  setStudents([emptyStudent()]);
                  setError("");
                }}
                className="text-sm text-gray-400 hover:text-gray-600 transition flex items-center gap-1"
              >
                ← Back
              </button>
              <span className="text-xs text-gray-300">|</span>
              <span className="text-xs text-gray-400">
                Applying as individual student
              </span>
            </div>

            <StudentCard
              student={students[0]}
              index={0}
              total={1}
              onChange={handleChange}
              onRemove={null}
              mode="guest"
              user={null}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-bold text-lg hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                ⚠️ Please verify all details before submitting. Kriti
                Sublimation is not responsible for errors in the submitted
                information.
              </p>
            </div>
          </form>
        )}

        {/* Logged in bulk form */}
        {(mode === "login" || (user && mode !== "guest")) && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-3 text-sm text-green-700">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Submitting as{" "}
              <span className="font-semibold ml-1">{user?.name}</span>
              {user?.organizationName && (
                <span className="text-green-500 ml-1">
                  — {user.organizationName}
                </span>
              )}
            </div>

            <AnimatePresence>
              {students.map((student, index) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  index={index}
                  total={students.length}
                  onChange={handleChange}
                  onRemove={removeStudent}
                  forceClose={student._forceClose}
                  mode="login"
                  user={user}
                />
              ))}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => {
                addStudent();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#FE6E4D] text-gray-400 hover:text-[#FE6E4D] font-semibold transition flex items-center justify-center gap-2"
            >
              <span className="text-xl leading-none">+</span> Add Another
              Student
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Total students</span>
                <span className="font-bold text-gray-900">
                  {students.length}
                </span>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-bold text-lg hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Submitting {students.length} student
                    {students.length > 1 ? "s" : ""}...
                  </span>
                ) : (
                  `Submit ${students.length} Student${students.length > 1 ? "s" : ""}`
                )}
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                ⚠️ Please verify all details before submitting. Kriti
                Sublimation is not responsible for errors in the submitted
                information.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SchoolStudentsPage;

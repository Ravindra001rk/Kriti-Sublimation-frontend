import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ── Outside component to prevent re-mount on keystroke ──
const Field = ({
  label,
  nepali,
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
      {nepali && (
        <span className="text-gray-400 font-normal ml-1 text-xs">
          ({nepali})
        </span>
      )}
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

const UploadBox = ({ label, required, optional, preview, onChange, icon }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {required && <span className="text-red-500 mr-1">*</span>}
      {label}
      {optional && (
        <span className="text-gray-400 text-xs font-normal ml-1">
          (optional)
        </span>
      )}
    </label>
    <label className="block cursor-pointer">
      <div className="w-[110px] h-[140px] rounded-xl border-2 border-dashed border-gray-200 hover:border-[#FE6E4D] transition overflow-hidden bg-gray-50 flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-3">
            <div className="text-2xl mb-1">{icon}</div>
            <p className="text-xs text-gray-400">Click to upload</p>
            <p className="text-xs text-gray-300 mt-0.5">Max 2MB</p>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/jpg,image/jpeg,image/png,image/webp"
        onChange={onChange}
        className="hidden"
      />
    </label>
  </div>
);

// ── Main component ──
const OfficeIdCardForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    officeName: "",
    employeeName: "",
    employeeNameNepali: "",
    designation: "",
    designationNepali: "",
    citizenshipNo: "",
    contactNo: "",
    bloodGroup: "",
    pisNo: "",
    permanentAddress: "",
    permanentAddressNepali: "",
    otherDetails: "",
  });
  const [photo, setPhoto] = useState(null);
  const [sign, setSign] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [signPreview, setSignPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e, type) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    if (type === "photo") {
      setPhoto(file);
      setPhotoPreview(preview);
    } else {
      setSign(file);
      setSignPreview(preview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!photo) {
      setError("Photo is required");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("photo", photo);
      if (sign) fd.append("sign", sign);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/id-applications/office`,
        { method: "POST", body: fd, credentials: "include" },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setSubmissionId(data.submissionId);
      navigator.clipboard.writeText(data.submissionId).catch(() => {});
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──
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
            Your application has been received.
          </p>
          <div className="bg-gradient-to-br from-[#FE6E4D]/10 to-[#CC1267]/10 rounded-2xl p-6 mb-4 border border-[#FE6E4D]/20">
            <p className="text-sm text-gray-500 mb-1">Your Submission ID</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] bg-clip-text text-transparent tracking-wider">
              {submissionId}
            </p>
            <p className="text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              Copied to clipboard
            </p>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Save this ID to check your application status.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/IdCardForm")}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
            >
              Go Back
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  officeName: "",
                  employeeName: "",
                  employeeNameNepali: "",
                  designation: "",
                  designationNepali: "",
                  citizenshipNo: "",
                  contactNo: "",
                  bloodGroup: "",
                  pisNo: "",
                  permanentAddress: "",
                  permanentAddressNepali: "",
                  otherDetails: "",
                });
                setPhoto(null);
                setSign(null);
                setPhotoPreview(null);
                setSignPreview(null);
              }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-medium hover:opacity-90 transition"
            >
              New Application
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/IdCardForm")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition mb-6 text-sm font-medium"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] flex items-center justify-center text-lg">
              🏢
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Office ID Card
              </h1>
              <p className="text-gray-400 text-sm">कार्यालय परिचय पत्र आवेदन</p>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Photo + Sign */}
            <div className="flex gap-6">
              <UploadBox
                label="Upload Photo"
                required
                icon="📷"
                preview={photoPreview}
                onChange={(e) => handleFile(e, "photo")}
              />
              <UploadBox
                label="Upload Sign"
                optional
                icon="✍️"
                preview={signPreview}
                onChange={(e) => handleFile(e, "sign")}
              />
            </div>

            <Field
              label="Office's Name"
              name="officeName"
              value={form.officeName}
              onChange={handleChange}
              placeholder="e.g. Nepal Rastra Bank"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Employee's Name"
                nepali="कर्मचारीको नाम"
                name="employeeName"
                value={form.employeeName}
                onChange={handleChange}
                required
                placeholder="Full name in English"
              />
              <Field
                label="Name in Nepali"
                nepali="नेपालीमा नाम"
                name="employeeNameNepali"
                value={form.employeeNameNepali}
                onChange={handleChange}
                required
                placeholder="पूरा नाम"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Designation"
                nepali="पद"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                required
                placeholder="e.g. Manager"
              />
              <Field
                label="Designation (Nepali)"
                nepali="पद नेपालीमा"
                name="designationNepali"
                value={form.designationNepali}
                onChange={handleChange}
                required
                placeholder="e.g. प्रबन्धक"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Citizenship No"
                nepali="ना.प्र.प.नं."
                name="citizenshipNo"
                value={form.citizenshipNo}
                onChange={handleChange}
                required
                placeholder="e.g. 12-34-56-78901"
              />
              <Field
                label="Contact No"
                name="contactNo"
                value={form.contactNo}
                onChange={handleChange}
                required
                type="tel"
                placeholder="98XXXXXXXX"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
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
              </div>
              <Field
                label="PIS No (कर्मचारी संकेत नं.)"
                name="pisNo"
                value={form.pisNo}
                onChange={handleChange}
                placeholder="e.g. 001"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Permanent Address"
                nepali="स्थायी ठेगाना"
                name="permanentAddress"
                value={form.permanentAddress}
                onChange={handleChange}
                required
                placeholder="Address in English"
              />
              <Field
                label="Address (Nepali)"
                name="permanentAddressNepali"
                value={form.permanentAddressNepali}
                onChange={handleChange}
                required
                placeholder="स्थायी ठेगाना"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Others Detail{" "}
                <span className="text-gray-400 font-normal text-xs">
                  (if any)
                </span>
              </label>
              <textarea
                name="otherDetails"
                value={form.otherDetails}
                onChange={handleChange}
                rows={3}
                placeholder="Any additional information..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800 bg-white resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-bold text-lg hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
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

            <p className="text-xs text-gray-400 text-center">
              <span className="text-red-400">*</span> marked fields are
              required. सबमिट गरेपछि सब्मीशन नम्बर जेनेरट हुनेछ।
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OfficeIdCardForm;

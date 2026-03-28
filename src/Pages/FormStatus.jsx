import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Approved: "bg-blue-100 text-blue-700 border-blue-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
  Printing: "bg-purple-100 text-purple-700 border-purple-200",
  "Ready for Collection": "bg-green-100 text-green-700 border-green-200",
};

const statusIcons = {
  Pending: "⏳",
  Approved: "✅",
  Rejected: "❌",
  Printing: "🖨️",
  "Ready for Collection": "🎉",
};

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

const FormStatus = () => {
  const navigate = useNavigate();
  const { id: urlId } = useParams(); // ← grab :id from the URL

  const [submissionId, setSubmissionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [formType, setFormType] = useState("");
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [resubmitLoading, setResubmitLoading] = useState(false);
  const [resubmitError, setResubmitError] = useState("");
  const [resubmitted, setResubmitted] = useState(false);

  const getEndpointAndType = (id) => {
    if (id.startsWith("stu-"))
      return {
        endpoint: `${import.meta.env.VITE_API_URL}/api/school-applications/status/${id}`,
        type: "student",
      };
    if (id.startsWith("stf-"))
      return {
        endpoint: `${import.meta.env.VITE_API_URL}/api/school-staff/status/${id}`,
        type: "staff",
      };
    return {
      endpoint: `${import.meta.env.VITE_API_URL}/api/id-applications/status/${id}`,
      type: "office",
    };
  };

  const getResubmitEndpoint = (id, type) => {
    if (type === "office")
      return `${import.meta.env.VITE_API_URL}/api/id-applications/${id}/resubmit`;
    if (type === "student")
      return `${import.meta.env.VITE_API_URL}/api/school-applications/${id}/resubmit`;
    if (type === "staff")
      return `${import.meta.env.VITE_API_URL}/api/school-staff/${id}/resubmit`;
  };

  // Core fetch logic extracted so it can be called both from the form and on mount
  const fetchStatus = async (id) => {
    const trimmed = id.trim().toLowerCase();
    if (!trimmed) return;

    setError("");
    setData(null);
    setLoading(true);
    setEditing(false);
    setResubmitted(false);

    try {
      const result = getEndpointAndType(trimmed);
      const res = await fetch(result.endpoint);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Not found");
      setData(json);
      setFormType(result.type);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch when the component mounts with a URL param
  useEffect(() => {
    if (urlId) {
      setSubmissionId(urlId);
      fetchStatus(urlId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlId]);

  const handleCheck = async (e) => {
    e.preventDefault();
    const trimmed = submissionId.trim().toLowerCase();
    if (!trimmed) return;

    // Update the URL so the link becomes shareable
    navigate(`/status/${trimmed}`, { replace: true });

    await fetchStatus(trimmed);
  };

  const handleEditOpen = () => {
    if (formType === "office") {
      setEditForm({
        officeName: data.officeName || "",
        employeeName: data.employeeName || "",
        employeeNameNepali: data.employeeNameNepali || "",
        designation: data.designation || "",
        designationNepali: data.designationNepali || "",
        citizenshipNo: data.citizenshipNo || "",
        contactNo: data.contactNo || "",
        bloodGroup: data.bloodGroup || "",
        pisNo: data.pisNo || "",
        permanentAddress: data.permanentAddress || "",
        permanentAddressNepali: data.permanentAddressNepali || "",
        otherDetails: data.otherDetails || "",
      });
    } else if (formType === "staff") {
      setEditForm({
        schoolName: data.schoolName || "",
        staffName: data.staffName || "",
        designation: data.designation || "",
        contactNo: data.contactNo || "",
        citizenshipNo: data.citizenshipNo || "",
        bloodGroup: data.bloodGroup || "",
        permanentAddress: data.permanentAddress || "",
      });
    } else if (formType === "student") {
      setEditForm({
        schoolName: data.schoolName || "",
        studentName: data.studentName || "",
        guardianName: data.guardianName || "",
        address: data.address || "",
        contactNo: data.contactNo || "",
        dateOfBirth: data.dateOfBirth || "",
        rollNo: data.rollNo || "",
        classGrade: data.classGrade || "",
        otherDetails: data.otherDetails || "",
      });
    }
    setEditing(true);
    setResubmitError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleResubmit = async (e) => {
    e.preventDefault();
    setResubmitError("");
    setResubmitLoading(true);
    try {
      const endpoint = getResubmitEndpoint(data.submissionId, formType);
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Resubmission failed");
      setResubmitted(true);
      setEditing(false);
      setData({ ...data, ...editForm, status: "Pending", rejectionReason: "" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setResubmitError(err.message);
    } finally {
      setResubmitLoading(false);
    }
  };

  const DetailCard = ({ headerText, subHeader, photo, fields }) => (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-md">
      <div className="bg-gradient-to-r text-black text-center py-3 px-4">
        <p className="font-bold text-base tracking-wide">{headerText || "—"}</p>
      </div>
      <div className="bg-white p-4 flex gap-4">
        <div className="flex-1 space-y-2">
          {fields
            .filter(([, v]) => v)
            .map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <span className="text-xs text-gray-400 w-2/5 flex-shrink-0">
                  {label}:
                </span>
                <span className="text-xs text-gray-900 font-semibold">
                  {value}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className="bg-gray-50 border-t border-gray-100 py-2 px-4 text-center">
        <p className="text-xs text-gray-400">
          Submitted:{" "}
          {data?.createdAt
            ? new Date(data.createdAt).toLocaleDateString("en-NP")
            : "—"}
        </p>
      </div>
    </div>
  );

  const renderDetails = () => {
    if (formType === "office")
      return (
        <DetailCard
          headerText={data.officeName}
          subHeader="कर्मचारी परिचय-पत्र"
          photo={data.photo}
          fields={[
            [
              "Employee Name / कर्मचारीको नाम",
              `${data.employeeName || ""} / ${data.employeeNameNepali || ""}`,
            ],
            [
              "Designation / पद",
              `${data.designation || ""} / ${data.designationNepali || ""}`,
            ],
            ["Citizenship No", data.citizenshipNo],
            ["Contact No", data.contactNo],
            ["Blood Group", data.bloodGroup],
            ["PIS No", data.pisNo],
            ["Permanent Address", data.permanentAddress],
          ]}
        />
      );

    if (formType === "staff")
      return (
        <DetailCard
          headerText={data.schoolName}
          subHeader="विद्यालय कर्मचारी परिचय-पत्र"
          photo={data.photo}
          fields={[
            ["Staff Name", data.staffName],
            ["Designation", data.designation],
            ["Citizenship No", data.citizenshipNo],
            ["Contact No", data.contactNo],
            ["Blood Group", data.bloodGroup],
            ["Permanent Address", data.permanentAddress],
          ]}
        />
      );

    if (formType === "student")
      return (
        <DetailCard
          headerText={data.schoolName}
          subHeader="विद्यार्थी परिचय-पत्र"
          photo={data.photo}
          fields={[
            ["Student Name", data.studentName],
            ["Guardian Name", data.guardianName],
            ["Address", data.address],
            ["Contact No", data.contactNo],
            ["Date of Birth", data.dateOfBirth],
            ["Roll No", data.rollNo],
            ["Class/Grade", data.classGrade],
          ]}
        />
      );
  };

  const ResubmitButtons = () => (
    <>
      {resubmitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          {resubmitError}
        </div>
      )}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="flex-1 py-4 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={resubmitLoading}
          className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-bold hover:opacity-90 transition disabled:opacity-60"
        >
          {resubmitLoading ? (
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
              Resubmitting...
            </span>
          ) : (
            "Resubmit Application"
          )}
        </button>
      </div>
    </>
  );

  const renderEditForm = () => {
    if (formType === "office")
      return (
        <form onSubmit={handleResubmit} className="space-y-5">
          <Field
            label="Office's Name"
            name="officeName"
            value={editForm.officeName}
            onChange={handleEditChange}
            placeholder="e.g. Nepal Rastra Bank"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Employee's Name"
              nepali="कर्मचारीको नाम"
              name="employeeName"
              value={editForm.employeeName}
              onChange={handleEditChange}
              required
              placeholder="Full name in English"
            />
            <Field
              label="Name in Nepali"
              name="employeeNameNepali"
              value={editForm.employeeNameNepali}
              onChange={handleEditChange}
              required
              placeholder="पूरा नाम"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Designation"
              nepali="पद"
              name="designation"
              value={editForm.designation}
              onChange={handleEditChange}
              required
              placeholder="e.g. Manager"
            />
            <Field
              label="Designation (Nepali)"
              name="designationNepali"
              value={editForm.designationNepali}
              onChange={handleEditChange}
              required
              placeholder="e.g. प्रबन्धक"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Citizenship No"
              name="citizenshipNo"
              value={editForm.citizenshipNo}
              onChange={handleEditChange}
              required
              placeholder="e.g. 12-34-56-78901"
            />
            <Field
              label="Contact No"
              name="contactNo"
              value={editForm.contactNo}
              onChange={handleEditChange}
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
                value={editForm.bloodGroup}
                onChange={handleEditChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] transition text-gray-800 bg-white"
              >
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="PIS No"
              name="pisNo"
              value={editForm.pisNo}
              onChange={handleEditChange}
              placeholder="e.g. 001"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Permanent Address"
              nepali="स्थायी ठेगाना"
              name="permanentAddress"
              value={editForm.permanentAddress}
              onChange={handleEditChange}
              required
              placeholder="Address in English"
            />
            <Field
              label="Address (Nepali)"
              name="permanentAddressNepali"
              value={editForm.permanentAddressNepali}
              onChange={handleEditChange}
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
              value={editForm.otherDetails}
              onChange={handleEditChange}
              rows={3}
              placeholder="Any additional information..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] transition text-gray-800 bg-white resize-none"
            />
          </div>
          <ResubmitButtons />
        </form>
      );

    if (formType === "staff")
      return (
        <form onSubmit={handleResubmit} className="space-y-5">
          <Field
            label="School's Name"
            name="schoolName"
            value={editForm.schoolName}
            onChange={handleEditChange}
            required
            placeholder="Organization Name"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Staff Name"
              name="staffName"
              value={editForm.staffName}
              onChange={handleEditChange}
              required
              placeholder="Full name"
            />
            <Field
              label="Designation"
              name="designation"
              value={editForm.designation}
              onChange={handleEditChange}
              required
              placeholder="e.g. Teacher"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Citizenship No"
              name="citizenshipNo"
              value={editForm.citizenshipNo}
              onChange={handleEditChange}
              required
              placeholder="e.g. 12-34-56-78901"
            />
            <Field
              label="Contact No"
              name="contactNo"
              value={editForm.contactNo}
              onChange={handleEditChange}
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
                value={editForm.bloodGroup}
                onChange={handleEditChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] transition text-gray-800 bg-white"
              >
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="Permanent Address"
              name="permanentAddress"
              value={editForm.permanentAddress}
              onChange={handleEditChange}
              required
              placeholder="Address"
            />
          </div>
          <ResubmitButtons />
        </form>
      );

    if (formType === "student")
      return (
        <form onSubmit={handleResubmit} className="space-y-5">
          <Field
            label="School's Name"
            name="schoolName"
            value={editForm.schoolName}
            onChange={handleEditChange}
            placeholder="Organization Name"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Student Name"
              name="studentName"
              value={editForm.studentName}
              onChange={handleEditChange}
              required
              placeholder="Full name"
            />
            <Field
              label="Guardian Name"
              name="guardianName"
              value={editForm.guardianName}
              onChange={handleEditChange}
              required
              placeholder="Guardian's name"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Address"
              name="address"
              value={editForm.address}
              onChange={handleEditChange}
              required
              placeholder="Address"
            />
            <Field
              label="Contact No"
              name="contactNo"
              value={editForm.contactNo}
              onChange={handleEditChange}
              required
              type="tel"
              placeholder="98XXXXXXXX"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Date of Birth"
              name="dateOfBirth"
              value={editForm.dateOfBirth}
              onChange={handleEditChange}
              type="date"
            />
            <Field
              label="Roll No"
              name="rollNo"
              value={editForm.rollNo}
              onChange={handleEditChange}
              placeholder="e.g. 01"
            />
          </div>
          <ResubmitButtons />
        </form>
      );
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] pt-20 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Check Status
          </h1>
          <p className="text-gray-400 text-sm">
            Enter your Submission ID to track your application
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <form
            onSubmit={handleCheck}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={submissionId}
              onChange={(e) => setSubmissionId(e.target.value)}
              placeholder="e.g. hari123 / stu-sita111 / stf-rama456"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FE6E4D] focus:ring-2 focus:ring-[#FE6E4D]/20 transition text-gray-800"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? (
                <svg
                  className="animate-spin w-5 h-5 mx-auto"
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
              ) : (
                "Track"
              )}
            </button>
          </form>
        </motion.div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm mb-4">
            {error}
          </div>
        )}

        <AnimatePresence>
          {resubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-4 text-green-700 text-sm mb-4 flex items-center gap-2"
            >
              <span>✅</span> Application resubmitted successfully. Status reset
              to Pending.
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {data && !editing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-white/70 text-xs mb-1">Submission ID</p>
                    <p className="text-2xl font-bold">{data.submissionId}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-white/70 text-xs mb-1">Type</p>
                    <p className="font-semibold capitalize">
                      {formType === "office"
                        ? "Office"
                        : formType === "staff"
                          ? "School Staff"
                          : "School Student"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Current Status
                  </p>
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${statusColors[data.status] || "bg-gray-100 text-gray-700"}`}
                  >
                    <span>{statusIcons[data.status]}</span>
                    {data.status}
                  </div>
                  {data.status === "Rejected" && data.rejectionReason && (
                    <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-sm font-semibold text-red-700 mb-1">
                        Reason for Rejection:
                      </p>
                      <p className="text-sm text-red-600">
                        {data.rejectionReason}
                      </p>
                    </div>
                  )}
                  {data.estimatedDate && (
                    <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-sm font-semibold text-green-700 mb-1">
                        📅 Expected Collection Date:
                      </p>
                      <p className="text-sm text-green-600">
                        {new Date(data.estimatedDate).toLocaleDateString(
                          "en-NP",
                          { dateStyle: "long" },
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {data.statusTimeline && data.statusTimeline.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                      Status Timeline
                    </p>
                    <div className="space-y-3">
                      {[...data.statusTimeline].reverse().map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FE6E4D]/20 to-[#CC1267]/20 flex items-center justify-center text-sm flex-shrink-0">
                            {statusIcons[item.status] || "•"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {item.status}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(item.changedAt).toLocaleString("en-NP")}
                            </p>
                            {item.note && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.note}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Submitted Details
                  </p>
                  {renderDetails()}
                </div>

                {data.status === "Rejected" && (
                  <button
                    onClick={handleEditOpen}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-bold text-base hover:opacity-90 active:scale-[0.98] transition"
                  >
                    ✏️ Edit & Resubmit Application
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {editing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] p-6 text-white">
                <p className="text-white/70 text-xs mb-1">
                  Editing Application
                </p>
                <p className="text-2xl font-bold">{data.submissionId}</p>
              </div>
              <div className="p-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <p className="text-yellow-800 text-sm font-semibold mb-1">
                    ⚠️ Rejection Reason:
                  </p>
                  <p className="text-yellow-700 text-sm">
                    {data.rejectionReason}
                  </p>
                </div>
                {renderEditForm()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FormStatus;

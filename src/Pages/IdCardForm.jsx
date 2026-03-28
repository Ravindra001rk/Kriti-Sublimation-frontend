import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import aanumaatiPatra from "../assets/frontend_assets/Anumati Patra for id card.pdf";

const IdCardForm = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user has already seen the modal
    const hasSeenModal = localStorage.getItem("idCardFormModalSeen");
    if (!hasSeenModal) {
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem("idCardFormModalSeen", "true");
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] poppins pt-14 pb-16 px-4">
      {/* Modal Dialog */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="text-4xl mb-4">💡</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Notice</h2>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                If you want to fill more than one form, please create an
                account.
              </p>

              <p className="text-gray-600 text-xs mb-6">
                Your forms will be saved in your profile.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium transition-colors duration-200 text-sm"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    navigate("/login");
                    handleCloseModal();
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] hover:shadow-lg text-white font-medium transition-all duration-200 text-sm"
                >
                  Create Account
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Original Content */}
      <motion.div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Online ID Card Application Form
        </h1>
      </motion.div>

      {/* Office + School */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {[
          {
            label: "For Office",
            nepali: "कार्यालयको लागि",
            desc: "Employees & Organizations",
            path: "/OfficeIdCardForm",
          },
          {
            label: "For School",
            nepali: "विद्यालयको लागि",
            desc: "Students & School Staff",
            path: "/SchoolIdCardForm",
          },
        ].map((btn, i) => (
          <motion.div
            key={btn.label}
            onClick={() => navigate(btn.path)}
            className="group relative bg-white rounded-2xl px-8 py-3 shadow-sm border border-gray-100 cursor-pointer hover:shadow-2xs 0 transition-all duration-300 overflow-hidden"
          >
            {/* <div className="absolute inset-0 bg-gradient-to-br from-[#FE6E4D]/5 to-[#CC1267]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
            <div className="text-4xl mb-4">{btn.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {btn.label}
            </h2>
            <p className="text-[#CC1267] font-medium text-sm mb-2">
              {btn.nepali}
            </p>
            <p className="text-gray-400 text-sm">{btn.desc}</p>
            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Check Status + Download */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <motion.div
          onClick={() => navigate("/status")}
          className="group relative bg-white rounded-2xl px-8 py-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-2xs hover:border-[#FACC15]/50 transition-all duration-300 overflow-hidden"
        >
          {/* <div className="absolute inset-0 bg-gradient-to-br from-[#FACC15]/10 to-[#FACC15]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Check Status
          </h2>
          <p className="text-gray-500 text-sm">Track your application</p>
        </motion.div>

        <motion.a
          href={aanumaatiPatra}
          download="Anumati Patra for ID Card.pdf"
          className="group relative bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] rounded-2xl p-8 shadow-sm cursor-pointer overflow-hidden block"
        >
          <div className="text-4xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-white mb-1">अनुमति पत्र</h2>
          <p className="text-white/80 text-sm">नमुना Download गर्नुहोस्</p>
        </motion.a>
      </div>

      {/* Notice */}
      <motion.div className="max-w-3xl mx-auto bg-red-50 border-l-4 border-red-500 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-red-600 text-lg">⚠️</span>
          <p className="text-red-700 font-semibold text-lg tracking-wide">
            सूचना (Notice)
          </p>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed mb-3">
          अनलाइन <span className="font-semibold">ID Card Application Form</span>{" "}
          भरेपछि, कार्ड छपाई प्रक्रिया अघि बढाउनका लागि सम्बन्धित संस्थाबाट जारी
          गरिएको{" "}
          <span className="font-semibold text-red-600">
            आधिकारिक अनुमति पत्र
          </span>{" "}
          अनिवार्य रूपमा बुझाउनुपर्नेछ।
        </p>
        <p className="text-gray-800 text-sm leading-relaxed mb-3">
          अनुमति पत्र प्राप्त भएपछि मात्र छपाई प्रक्रिया सुरु गरिनेछ।{" "}
          <span className="font-semibold text-red-600">
            अन्यथा, अनलाइन आवेदन मान्य हुने छैन।
          </span>
        </p>
        <p className="text-gray-600 text-sm leading-relaxed border-t pt-3 mt-3">
          📥 अनुमति पत्रको नमुना (Sample) डाउनलोड सेक्सनमा उपलब्ध छ। कृपया
          डाउनलोड गरी प्रयोग गर्नुहोस्।
        </p>
      </motion.div>
    </div>
  );
};

export default IdCardForm;

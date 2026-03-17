import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import aanumaatiPatra from "../assets/frontend_assets/Anumati Patra for id card.pdf";

const IdCardForm = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F5F2] pt-14 pb-16 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
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
            icon: "🏢",
            path: "/OfficeIdCardForm",
          },
          {
            label: "For School",
            nepali: "विद्यालयको लागि",
            desc: "Students & School Staff",
            icon: "🏫",
            path: "/SchoolIdCardForm",
          },
        ].map((btn, i) => (
          <motion.div
            key={btn.label}
            onClick={() => navigate(btn.path)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="group relative bg-white rounded-2xl px-8 py-3 shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:border-[#FE6E4D]/30 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FE6E4D]/5 to-[#CC1267]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          onClick={() => navigate("/CheckIdStatus")}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="group relative bg-white rounded-2xl px-8 py-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:border-[#FACC15]/50 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FACC15]/10 to-[#FACC15]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Check Status
          </h2>
          <p className="text-gray-500 text-sm">Track your application</p>
        </motion.div>

        <motion.a
          href={aanumaatiPatra}
          download="Anumati Patra for ID Card.pdf"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="group relative bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] rounded-2xl p-8 shadow-sm cursor-pointer overflow-hidden block"
        >
          <div className="text-4xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-white mb-1">अनुमति पत्र</h2>
          <p className="text-white/80 text-sm">नमुना Download गर्नुहोस्</p>
        </motion.a>
      </div>

      {/* Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl mx-auto bg-red-50 border-l-4 border-red-500 rounded-xl p-6 shadow-sm"
      >
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

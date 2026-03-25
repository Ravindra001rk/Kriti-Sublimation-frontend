import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";

const SchoolIdCardForm = () => {
  const navigate = useNavigate();

  return (
    <div className=" bg-[#F7F5F2] pt-16 md:pt-14 pb-26 px-4 poppins">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div className="mb-4">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2">
              Who are you applying for?
            </h1>
          </div>
        </motion.div>

        {/* Two Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* For Students */}
          <motion.div
            onClick={() => navigate("/SchoolIdCardForm/students")}
            className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:border-[#FE6E4D]/30 transition-all duration-300 overflow-hidden"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              For Students
            </h2>
            <p className="text-[#CC1267] font-medium text-sm mb-2">
              विद्यार्थीको लागि
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Student ID card application. Teachers can login to submit on
              behalf of students, or students can apply as guest.
            </p>

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

          {/* For Staff */}
          <motion.div
            onClick={() => navigate("/SchoolIdCardForm/staff")}
            className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:border-[#FE6E4D]/30 transition-all duration-300 overflow-hidden"
          >
            {/* <div className="absolute inset-0 bg-gradient-to-br from-[#FE6E4D]/5 to-[#CC1267]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}

            <h2 className="text-2xl font-bold text-gray-900 mb-2">For Staff</h2>
            <p className="text-[#CC1267] font-medium text-sm mb-2">
              कर्मचारीको लागि
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              School staff ID card application. No login required. Fill in your
              details and submit directly.
            </p>

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
        </div>

        <motion.div className="mt-6 bg-[#F8F6F4] border border-[#E5E1DC] rounded-2xl p-5">
          <p className="text-[#5B4F47] font-semibold text-sm mb-2">ℹ️ Note:</p>
          <p className="text-[#6F6259] text-sm leading-relaxed">
            After submitting your application, you will receive a unique{" "}
            <strong className="text-[#1A1410]">Submission ID</strong>. Save it
            to track your application status on the{" "}
            <strong
              onClick={() => navigate("/status")}
              className="text-blue-800 underline cursor-pointer hover:opacity-70"
            >
              Check Status
            </strong>{" "}
            page.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolIdCardForm;

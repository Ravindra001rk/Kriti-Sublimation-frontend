import React from "react";

const Test = () => {
  return (
    <div>
      <div className="min-h-screen bg-[#F7F5F2] pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl">
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

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted
          </h2>

          <p className="text-gray-500 mb-6">
            Your application has been successfully received.
          </p>

          <div className="bg-gradient-to-br from-[#FE6E4D]/10 to-[#CC1267]/10 rounded-2xl p-6 mb-4 border border-[#FE6E4D]/20">
            <p className="text-sm text-gray-500 mb-1">Your Submission ID</p>

            <p className="text-3xl font-bold bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] bg-clip-text text-transparent tracking-wider">
              STF-RAVI-482
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Format: stf + first 4 letters of your name + last 3 digits of your
              phone number
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
              ID copied to clipboard
            </p>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            Save this ID to check your application status anytime.
          </p>

          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FE6E4D] to-[#CC1267] text-white font-medium hover:opacity-90 transition">
              Check Status
            </button>

            <button className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
              New Application
            </button>
          </div>

          {/* Details =---------- */}
          <div className="text-left border mt-12 border-gray-100 rounded-2xl overflow-hidden mb-4">
            <div className=" text-black text-center py-2 px-4">
              <p className="font-bold">Shree Janata Secondary School</p>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="flex gap-2 px-4 py-2">
                <span className="text-xs text-gray-400 w-2/5 flex-shrink-0">
                  Staff Name
                </span>
                <span className="text-xs text-gray-800 font-medium">
                  Ravi Kumar
                </span>
              </div>

              <div className="flex gap-2 px-4 py-2">
                <span className="text-xs text-gray-400 w-2/5 flex-shrink-0">
                  Designation
                </span>
                <span className="text-xs text-gray-800 font-medium">
                  Office Assistant
                </span>
              </div>

              <div className="flex gap-2 px-4 py-2">
                <span className="text-xs text-gray-400 w-2/5 flex-shrink-0">
                  Citizenship No
                </span>
                <span className="text-xs text-gray-800 font-medium">
                  12345-67890
                </span>
              </div>

              <div className="flex gap-2 px-4 py-2">
                <span className="text-xs text-gray-400 w-2/5 flex-shrink-0">
                  Contact No
                </span>
                <span className="text-xs text-gray-800 font-medium">
                  9812345678
                </span>
              </div>

              <div className="flex gap-2 px-4 py-2">
                <span className="text-xs text-gray-400 w-2/5 flex-shrink-0">
                  Blood Group
                </span>
                <span className="text-xs text-gray-800 font-medium">B+</span>
              </div>

              <div className="flex gap-2 px-4 py-2">
                <span className="text-xs text-gray-400 w-2/5 flex-shrink-0">
                  Permanent Address
                </span>
                <span className="text-xs text-gray-800 font-medium">
                  Birgunj, Parsa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;

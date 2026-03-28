import { Link } from "react-router-dom";
import React from "react";
import { useUserAuth } from "../context/UserAuthContext";

export default function CTAButton({ className = "" }) {
  const { user } = useUserAuth();

  if (user) {
    return (
      <Link to="/profile">
        <button
          className={`relative inline-flex items-center gap-2 px-5 py-2 rounded-full border-[2px] border-[#ff0c00] bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] text-white font-semibold text-[0.9rem] tracking-wide whitespace-nowrap ${className}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Client Dashboard
        </button>
      </Link>
    );
  }

  return (
    <Link to="/login">
      <button
        className={`relative inline-flex items-center gap-2 px-5 py-2 rounded-full border-[2px] border-[#ff0c00] bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] text-white font-semibold text-[0.9rem] tracking-wide whitespace-nowrap ${className}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Login / Sign Up
      </button>
    </Link>
  );
}
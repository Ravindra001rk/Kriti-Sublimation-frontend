import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const GRADIENT = "linear-gradient(to bottom right, #FE6E4D, #CC1267)";

const dropdownItems = [
  { to: "/IdCardForm", label: "ID Card Form" },
  { to: "/gallery", label: "View my photo" },
  { to: "/status", label: "Check Status" },
];

function NavLink({ to, label }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      style={
        isActive
          ? {
              backgroundImage: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }
          : {}
      }
      className="relative inline-flex flex-col overflow-hidden h-[1.2em] cursor-pointer uppercase tracking-[0.08em] text-[15px] font-medium group font-['Poppins']"
    >
      <span
        style={
          isActive
            ? {
                backgroundImage: GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : {}
        }
        className="block leading-[1.2em] text-black transition-transform duration-[250ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
      >
        {label}
      </span>
      <span
        style={{
          backgroundImage: GRADIENT,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        className="absolute top-full left-0 block leading-[1.2em] transition-transform duration-[250ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
      >
        {label}
      </span>
    </Link>
  );
}

function OnlineServicesDropdown() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isAnyActive = dropdownItems.some((item) => pathname === item.to);

  return (
    <div
      className="relative font-['Poppins']"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button className="relative inline-flex flex-col overflow-hidden h-[1.2em] cursor-pointer uppercase tracking-[0.08em] text-[15px] font-medium group focus:outline-none">
        <span
          style={
            isAnyActive || open
              ? {
                  backgroundImage: GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }
              : {}
          }
          className="flex items-center gap-1 leading-[1.2em] text-black transition-transform duration-[250ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
        >
          Online Services
          <svg
            className="w-3 h-3 mt-px flex-shrink-0 transition-transform duration-200"
            style={open ? { transform: "rotate(180deg)" } : {}}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>

        {/* Hover duplicate */}
        <span
          style={{
            backgroundImage: GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          className="absolute top-full left-0 flex items-center gap-1 leading-[1.2em] transition-transform duration-[250ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
        >
          Online Services
          <svg
            className="w-3 h-3 mt-px flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </span>
      </button>

      {/*
        pt-3 creates an invisible "bridge" between the trigger and the panel.
        The mouse stays inside the container while crossing — no gap, no flicker.
      */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56 z-50">
        <div
          className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "scaleY(1)" : "scaleY(0.88)",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          {/* Gradient top strip */}
          <div className="py-2 px-2">
            {dropdownItems.map(({ to, label }) => {
              const isActive = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium uppercase tracking-wide group/item transition-colors duration-150 hover:bg-gray-50"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-150"
                    style={
                      isActive
                        ? { backgroundImage: GRADIENT }
                        : { background: "#d1d5db" }
                    }
                  />
                  <span
                    style={
                      isActive
                        ? {
                            backgroundImage: GRADIENT,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }
                        : {}
                    }
                    className="text-gray-600 transition-all duration-150 group-hover/item:[background-image:linear-gradient(to_bottom_right,#FE6E4D,#CC1267)] group-hover/item:[background-clip:text] group-hover/item:[-webkit-background-clip:text] group-hover/item:[-webkit-text-fill-color:transparent] font-semibold"
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Nav() {
  return (
    <div className="flex items-center justify-center font-['Poppins']">
      <nav className="flex items-center font-bold gap-4 md:gap-6 lg:gap-8 text-sm md:text-base lg:text-lg relative z-50">
        <NavLink to="/products" label="Products" />
        <OnlineServicesDropdown />
        <NavLink to="/about" label="About" />
        <NavLink to="/contact" label="Contact" />
      </nav>
    </div>
  );
}

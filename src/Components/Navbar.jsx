import React, { useEffect, useState } from "react";
import { logo } from "../assets/frontend_assets";
import { Link, NavLink } from "react-router-dom";
import CTAButton from "./CTAButton";
import Nav from "./Nav";
import HamburgerButton from "./HamburgerButton";
import { VscChromeClose } from "react-icons/vsc";
import { IoMdHome } from "react-icons/io";
import { IoMdContact } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Show/hide navbar on scroll
useEffect(() => {
  let lastY = window.scrollY;
  const controlNavbar = () => {
    if (window.scrollY > lastY) {
      setShow(false);
    } else {
      setShow(true);
    }
    lastY = window.scrollY;
  };
  window.addEventListener("scroll", controlNavbar);
  return () => window.removeEventListener("scroll", controlNavbar);
}, []);

  // ✅ FIX 1: Lock scroll on <html> AND <body> to prevent any scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // locks <html> too
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLogoClick = () => window.scrollTo(0, 0);

  return (
    <>
      {/* ── NAVBAR ── */}
      {/* ✅ FIX 2: changed from `relative` to `fixed` so z-index stacking works correctly */}
      <div
        className={` top-0 left-0 w-full z-[100] bg-brandBg backdrop-blur-xs transition-transform duration-300 ease-in-out ${ 
          show ? "translate-y-0" : "-translate-y-0"
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-6 md:px-14 py-3">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="shrink-0">
            <img src={logo} alt="Logo" className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Nav />
          </div>
          <div className="hidden md:flex">
            <CTAButton />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none"
            >
              <HamburgerButton open={mobileMenuOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU (rendered OUTSIDE the navbar div, directly in the DOM tree) ── */}
      {/* ✅ FIX 3: Moved overlay + panel OUTSIDE the navbar so they aren't clipped by it.
           This is the key reason the blur wasn't covering the full screen before. */}
      <div className="md:hidden">
        {/* FULL SCREEN BLUR OVERLAY */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 w-full h-full bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
            mobileMenuOpen
              ? "opacity-100 visible z-[200]"
              : "opacity-0 invisible pointer-events-none z-[0]"
          }`}
        />

        {/* RIGHT SLIDE PANEL */}
        <div
          className={`fixed top-0 right-0 w-[72vw] max-w-[420px] h-dvh z-[210]
            transform transition-transform duration-500 ease-[cubic-bezier(.77,0,.175,1)]
            flex flex-col overflow-hidden
            ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          style={{ background: "#FAFAF7" }}
        >
          {/* Gradient accent bar */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FE6E4D] to-[#CC1267] z-10" />

          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-7 pt-6 pb-5 border-b border-black/10">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
              <img src={logo} className="h-9" alt="logo" />
            </NavLink>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 flex items-center justify-center border border-black/20 rounded-full
                text-black hover:bg-gradient-to-br hover:from-[#FE6E4D] hover:to-[#CC1267] hover:text-white hover:border-transparent transition-all duration-200 text-base"
            >
              <VscChromeClose />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 flex flex-col px-7 pt-8 gap-1 overflow-y-auto min-h-0">
            {[
              { to: "/", label: "Home", num: "01" },
              { to: "/products", label: "Products", num: "02" },
              { to: "/about", label: "About", num: "03" },
              { to: "/contact", label: "Contact", num: "04" },
            ].map(({ to, label, num }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center justify-between py-4 border-b border-black/10
                   transition-all duration-200 poppins
                   ${isActive ? "text-black" : "text-zinc-600 hover:text-black"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded transition-all duration-200"
                        style={{
                          background: isActive
                            ? "linear-gradient(to bottom right, #FE6E4D, #CC1267)"
                            : "transparent",
                          border: "1px solid",
                          borderColor: isActive
                            ? "transparent"
                            : "rgba(0,0,0,0.15)",
                          color: isActive ? "white" : "rgba(0,0,0,0.4)",
                        }}
                      >
                        {num}
                      </span>
                      <span className="text-xl font-semibold">{label}</span>
                    </div>
                    <HiArrowUpRight
                      className={`text-sm transition-all duration-200 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
                      style={isActive ? { color: "#FE6E4D" } : {}}
                    />
                  </>
                )}
              </NavLink>
            ))}

            <div className="pt-8" onClick={() => setMobileMenuOpen(false)}>
              <CTAButton className="w-full justify-center" />
            </div>
          </nav>

          {/* Footer */}
          <div className="flex-shrink-0 px-7 py-5 border-t border-black/10">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background:
                    "linear-gradient(to bottom right, #FE6E4D, #CC1267)",
                }}
              />
              <span className="text-xs font-semibold text-black/40 uppercase tracking-widest poppins">
                Birgunj-13, Nepal
              </span>
            </div>
            <p className="text-[11px] text-black/30 tracking-wide poppins">
              Fast • Affordable • Professional
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

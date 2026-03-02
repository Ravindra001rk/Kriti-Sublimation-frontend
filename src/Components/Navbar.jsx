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

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Show/hide navbar on scroll
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

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
        {/* FULL SCREEN BLUR OVERLAY — now truly covers 100dvh */}
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
          className={`fixed top-0 right-0 w-[65vw] max-w-[490px] h-screen bg-brandBg shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(.77,0,.175,1)] z-[210] ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
              >
               <img src={logo} className="h-10"/>
              </NavLink>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#ff0c00] font-bold text-2xl rounded transition"
            >
              <VscChromeClose />
            </button>
          </div>

          <div className="flex flex-col poppins justify-between px-4 py-8 h-[84vh]">
            <div className="flex flex-col  space-y-6">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-xl font-semibold flex items-center gap-1 ${
                    isActive ? "text-orange-500" : "text-black"
                  }`
                }
              >
                <IoMdHome /> Home
              </NavLink>

              <NavLink
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-xl font-semibold flex items-center gap-1 ${
                    isActive ? "text-orange-500" : "text-black"
                  }`
                }
              >
                <FaBoxOpen />
                Products
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-xl font-semibold flex items-center gap-1 ${
                    isActive ? "text-orange-500" : "text-black"
                  }`
                }
              >
                <IoMdContact />
                About
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-xl font-semibold flex items-center gap-1 ${
                    isActive ? "text-orange-500" : "text-black"
                  }`
                }
              >
                <IoCallSharp />
                Contact
              </NavLink>

              <div className="pt-1" onClick={() => setMobileMenuOpen(false)}>
                <CTAButton />
              </div>
            </div>
            <div>
              <h1 className="text-gray-600">Birgunj-13, Nepal</h1>
              <h1 className="whitespace-nowrap text-gray-600">
                Fast • Affordable • Professional
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

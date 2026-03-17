import React from "react";
import { Link } from "react-router-dom";

function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="relative inline-flex flex-col overflow-hidden h-[1.2em] cursor-pointer uppercase tracking-[0.08em] text-[15px] font-medium group"
    >
      {/* Original text */}
      <span className="block leading-[1.2em] text-black transition-transform duration-[250ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {label}
      </span>

      {/* Hover duplicate */}
      <span className="absolute  top-full left-0 block leading-[1.2em] text-[#ff0c00] transition-transform duration-250 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {label}
      </span>
    </Link>
  );
}

export default function Nav() {
  return (
    <div className=" flex items-center justify-center poppins font-['Syne']">
      <nav className="flex items-center gap-12">
        <NavLink to="/products" label="Products" />
        <NavLink to="/about" label="About" />
        <NavLink to="/contact" label="Contact" />
        <NavLink to="/IdCardForm" label="ID Card Form" />
      </nav>
    </div>
  );
}

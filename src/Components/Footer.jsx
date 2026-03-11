import React from "react";
import { logo } from "../assets/frontend_assets/index";
import { Link } from "react-router-dom";

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-black hover:text-red-400 text-sm transition-colors"
    >
      {children}
    </Link>
  </li>
);

export default function Footer() {
  return (
    <footer className="bg-brandBg text-black pt-20 poppins">
      {/* top border */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* brand */}
          <div className="space-y-5">
            <img src={logo} alt="logo" className="h-10" />

            <p className="text-black text-sm leading-relaxed">
              Fast printing services for offices and schools. ID cards,
              lanyards, badges and other custom printed products with quick
              turnaround.
            </p>

            <div className="space-y-2 text-sm text-black">
              <p>📍 Birgunj, Nepal</p>
              <p>📞 +977 985-5086132</p>
              <p>✉️ hello@kritisublimation.com</p>
            </div>

            {/* social */}
            <div className="flex gap-3">
              {[
                {
                  label: "TikTok",
                  color: "#69C9D0",
                  svg: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  color: "#E1306C",
                  svg: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  color: "#1877F2",
                  svg: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  style={{
                    color: "#64748b",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                    width: "34px",
                    height: "34px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.25s ease",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = social.color;
                    e.currentTarget.style.borderColor = social.color;
                    e.currentTarget.style.background = `${social.color}15`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#64748b";
                    e.currentTarget.style.borderColor = "#1e293b";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/products">Products</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">
              Products
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/products">ID Cards</FooterLink>
              <FooterLink to="/products">Lanyard Printing</FooterLink>
              <FooterLink to="/products">Button Badges</FooterLink>
              <FooterLink to="/products">Sublimation Printing</FooterLink>
            </ul>
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Kriti Sublimation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

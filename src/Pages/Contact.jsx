import { useState, useRef, useEffect } from "react";
import React from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
const BRAND = { from: "#FE6E4D", to: "#CC1267" };

const EMAILJS_SERVICE_ID = "service_bpg3csq";
const EMAILJS_TEMPLATE_ID = "template_4cfao6c"; // Replace with your template ID from EmailJS dashboard
const EMAILJS_PUBLIC_KEY = "MrhDVRZWOBdmeMaGD";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function GradientText({ children }) {
  return (
    <span
      style={{
        background: `linear-gradient(135deg, ${BRAND.from}, ${BRAND.to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

function FloatingInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  required,
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete="off"
        className="w-full px-4 pt-6 pb-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none transition-all duration-200 hover:border-gray-300"
        style={{
          boxShadow: focused ? `0 0 0 2px ${BRAND.from}33` : undefined,
          borderColor: focused ? BRAND.from : undefined,
        }}
      />
      <label
        className="absolute left-4 pointer-events-none select-none transition-all duration-200"
        style={{
          top: active ? "8px" : "50%",
          transform: active ? "none" : "translateY(-50%)",
          fontSize: active ? "10px" : "14px",
          fontWeight: active ? 600 : 400,
          color: focused ? BRAND.from : "#9ca3af",
          letterSpacing: active ? "0.05em" : "0",
          textTransform: active ? "uppercase" : "none",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, name, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={4}
        className="w-full px-4 pt-7 pb-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none resize-none transition-all duration-200 hover:border-gray-300"
        style={{
          boxShadow: focused ? `0 0 0 2px ${BRAND.from}33` : undefined,
          borderColor: focused ? BRAND.from : undefined,
        }}
      />
      <label
        className="absolute left-4 top-3 pointer-events-none select-none transition-all duration-200"
        style={{
          fontSize: active ? "10px" : "14px",
          fontWeight: active ? 600 : 400,
          color: focused ? BRAND.from : "#9ca3af",
          letterSpacing: active ? "0.05em" : "0",
          textTransform: active ? "uppercase" : "none",
          transform: active ? "none" : "translateY(6px)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {label}
      </label>
    </div>
  );
}

function ContactCard({ icon, label, value, href, delay }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const Tag = href ? "a" : "div";
  return (
    <Tag
      ref={ref}
      href={href || undefined}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 no-underline"
      style={{
        cursor: href ? "pointer" : "default",
        boxShadow: hovered
          ? "0 12px 28px -8px rgba(254,110,77,0.18)"
          : "0 2px 8px -2px rgba(0,0,0,0.05)",
        transform: hovered
          ? "translateY(-2px)"
          : visible
            ? "translateY(0)"
            : "translateY(18px)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.5s cubic-bezier(.22,1,.36,1) ${delay}ms, opacity 0.5s ease ${delay}ms, box-shadow 0.25s ease`,
        borderColor: hovered ? `${BRAND.from}35` : undefined,
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 text-base"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${BRAND.from}, ${BRAND.to})`
            : "#f8f4f3",
        }}
      >
        <span
          style={{
            filter: hovered ? "grayscale(1) brightness(10)" : "none",
            transition: "filter 0.3s",
          }}
        >
          {icon}
        </span>
      </div>
      <div className="min-w-0">
        <p
          className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {label}
        </p>
        <p
          className="text-sm font-medium text-gray-800 truncate"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {value}
        </p>
      </div>
    </Tag>
  );
}

function SuccessScreen({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{
          background: `linear-gradient(135deg, ${BRAND.from}, ${BRAND.to})`,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3
        className="text-xl font-bold text-gray-900 mb-2"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Message Sent!
      </h3>
      <p
        className="text-sm text-gray-500 max-w-xs leading-relaxed"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        We'll get back to you within a hour. Thanks for reaching out to Kriti
        Sublimation.
      </p>
      <button
        onClick={onReset}
        className="mt-6 text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all duration-200"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Send another
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          reply_to: form.email,
          phone: form.phone || "Not provided",
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send. Please call us directly at +977 9746522742.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSent(false);
    setError("");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div
      className="min-h-screen bg-[#FAFAF9] relative z-0"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 1.1s linear infinite; }
        .form-card { background: white; position: relative; }
        .form-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 1px;
          background: linear-gradient(135deg, #FE6E4D22, #CC126722);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 relative z-0">
        {/* ── Hero ── */}
        <div
          className="text-center mb-12"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(22px)",
            transition:
              "opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <h2 className="text-4xl pb-12 sm:text-5xl md:text-6xl poppins font-extrabold leading-tight tracking-tight relative z-0">
            <span className="relative inline-block">
              Contact Us
              <svg
                viewBox="0 0 220 14"
                fill="none"
                className="absolute -bottom-1 left-0 w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="underlineGradientPinkOrange"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#FE6E4D" />
                    <stop offset="100%" stopColor="#CC1267" />
                  </linearGradient>
                </defs>

                <motion.path
                  d="M2 10 C50 2, 170 2, 218 10"
                  stroke="url(#underlineGradientPinkOrange)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
                />
              </svg>
            </span>
          </h2>
          <p
            className="text-base text-gray-500 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Fast turnaround, professional quality — ID cards, sublimation, bulk
            prints & more. Based in Birgunj, serving businesses across Nepal.
          </p>
        </div>

        {/* ── Info + Form grid ── */}
        <div className="grid md:grid-cols-5 gap-5 mb-6">
          {/* Contact info */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <ContactCard
              icon="📍"
              label="Location"
              value="Birgunj-13, Nepal"
              href="https://maps.google.com/?q=Kriti+Sublimation+Birgunj"
              delay={100}
            />
            <ContactCard
              icon="📞"
              label="Phone / WhatsApp"
              value="+977 9855086132"
              href="tel:+9779855086132"
              delay={170}
            />

            <ContactCard
              icon="⏰"
              label="Working Hours"
              value="Sun – Fri, 9 AM – 7 PM"
              href={null}
              delay={310}
            />

            {/* Why us card */}
          </div>

          {/* Message form */}
          <div
            className="md:col-span-3 form-card rounded-3xl shadow-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateY(20px)",
              transition:
                "opacity 0.7s ease 0.12s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.12s",
            }}
          >
            {sent ? (
              <SuccessScreen onReset={handleReset} />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-7 md:p-8 flex flex-col gap-4"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-0.5">
                    Send a message
                  </h2>
                  <p
                    className="text-xs text-gray-400"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    We'll respond within a hour.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FloatingInput
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <FloatingInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <FloatingInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />

                <FloatingTextarea
                  label="Your Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />

                {error && (
                  <p
                    className="text-xs text-red-500 -mt-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    ⚠ {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 mt-1 active:scale-[0.985]"
                  style={{
                    background: loading
                      ? "#d1d5db"
                      : `linear-gradient(135deg, ${BRAND.from}, ${BRAND.to})`,
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.02em",
                    boxShadow: loading
                      ? "none"
                      : `0 8px 24px -6px ${BRAND.from}55`,
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="spin-slow"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="white"
                          strokeWidth="2"
                          strokeOpacity="0.3"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </button>

                <p
                  className="text-center text-[11px] text-gray-400"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Or call us:{" "}
                  <a
                    href="tel:+9779855086132"
                    className="font-semibold no-underline"
                    style={{ color: BRAND.from }}
                  >
                    +977 985-5086132
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* ── Map Section ── */}
        <div
          className="rounded-3xl overflow-hidden border border-gray-100"
          style={{
            boxShadow: "0 4px 24px -8px rgba(0,0,0,0.09)",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(20px)",
            transition:
              "opacity 0.8s ease 0.28s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.28s",
          }}
        >
          {/* Map header */}
          <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.from}18, ${BRAND.to}18)`,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                    fill={BRAND.from}
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-sm font-semibold text-gray-900"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Find Us Here
                </p>
                <p
                  className="text-xs text-gray-400"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Birgunj-13, Nepal
                </p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Kriti+Sublimation+Birgunj"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold no-underline px-4 py-2 rounded-full text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${BRAND.from}, ${BRAND.to})`,
                fontFamily: "Inter, sans-serif",
                boxShadow: `0 4px 12px ${BRAND.from}40`,
              }}
            >
              Get Directions →
            </a>
          </div>

          {/* Iframe */}
          <div style={{ height: "380px", lineHeight: 0 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.0116104332214!2d84.88271677508902!3d27.029799055049644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39935563bd13f429%3A0xf58833cb1c5fb980!2sKriti%20Sublimation!5e0!3m2!1sen!2snp!4v1773478087804!5m2!1sen!2snp"
              width="100%"
              height="380"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kriti Sublimation on Google Maps"
            />
          </div>
        </div>

        {/* Footer */}
        <p
          className="text-center text-xs text-gray-400 mt-10"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          © {new Date().getFullYear()} Kriti Sublimation, Birgunj · All rights
          reserved
        </p>
      </div>
    </div>
  );
}

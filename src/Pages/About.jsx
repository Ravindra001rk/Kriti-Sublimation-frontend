import { useEffect, useRef, useState } from "react";
import React from "react";
import { motion } from "framer-motion";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Section 1: Why We Started ──────────────────────────────────────────────
function WhyWeStarted() {
  const [ref, inView] = useInView();
  const [ref2, inView2] = useInView();

  const missing = [
    "Orders often took longer than promised.",
    "Pricing was sometimes unclear until the final bill.",
    "Quality was inconsistent, especially for bulk orders.",
    "Businesses had to visit multiple shops for different printing needs.",
    "Custom merchandise options were very limited in Nepal.",
    "Getting quick support or reprints was often difficult.",
  ];
  const commitments = [
    "Provide clear pricing before starting any order.",
    "Deliver work on time whenever possible.",
    "Handle bulk, custom, and urgent orders in one place.",
    "Maintain consistent print quality for every order.",
    "Treat every client with honesty and professionalism.",
  ];

  return (
    <section className="py-32 px-6 bg-[#fafafa]">
      <div className=" px-6 md:px-14 flex justify-center items-center pb-36">
        <div className="">
          <h2 className="text-4xl sm:text-5xl md:text-6xl poppins font-extrabold leading-tight tracking-tight ">
            <span className="relative inline-block">
              About US
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

          <p className="inter mt-12 max-w-3xl text-zinc-600 leading-relaxed">
            Kriti Sublimation is a printing and customization service based in
            Nepal. We help businesses, offices, and individuals get their
            printing work done quickly and properly. From ID cards and photo
            printing to custom T-shirts, mugs, badges, and bulk orders, our
            focus is simple — good quality, fast service, and fair pricing.
          </p>
        </div>
      </div>
      <div
        ref={ref}
        className="max-w-5xl mx-auto text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(36px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Headline */}
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          But More Importantly, We Had Seen
          <br />
          What Was Missing.
        </h2>
        <p
          className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md mx-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Across Nepal's printing shops, one problem stayed constant: businesses
          needed a reliable partner — and kept getting let down.
        </p>

        {/* Red missing card */}
        <div
          className="rounded-2xl border border-red-200 px-8 py-7 mb-10 text-left space-y-3"
          style={{ background: "#fff1f2" }}
        >
          {missing.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 text-sm font-semibold text-red-700"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span className="mt-0.5 text-red-400 font-bold text-base leading-none flex-shrink-0">
                ?
              </span>
              {item}
            </div>
          ))}
        </div>

        {/* Squiggle arrow */}
        <div className="flex justify-center mb-8">
          <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
            <path
              d="M18 2 C10 10, 26 18, 18 26 C10 34, 18 42, 18 42"
              stroke="#6366F1"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M13 37 L18 43 L23 37"
              stroke="#6366F1"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* "So we started" banner */}
        <div
          className="rounded-xl border-2 border-gray-800 px-4 py-5 mb-8 text-center"
          style={{ background: "#F9FFE9" }}
        >
          <p
            className="text-xl whitespace-nowrap md:text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            So We Started{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FE6E4D, #CC1267)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Kriti Sublimation
            </span>
          </p>
        </div>

        {/* Not / But labels */}
        <div className="flex flex-col items-start gap-1 mb-5 px-1">
          <div
            className="flex items-center gap-2 text-sm text-red-500 font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <span>❌</span> Not as just another print shop.
          </div>
          <div
            className="flex items-center gap-2 text-sm text-green-600 font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <span>✅</span> But as a business-first printing studio that would:
          </div>
        </div>
      </div>

      {/* Green commitments card */}
      <div
        ref={ref2}
        className="max-w-5xl mx-auto"
        style={{
          opacity: inView2 ? 1 : 0,
          transform: inView2 ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div className="rounded-2xl border border-green-200 px-8 py-7 space-y-3 transition duration-300 hover:shadow-lg hover:-translate-y-1">
          {commitments.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 text-sm font-semibold text-green-800"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span className="mt-0.5 text-green-600 font-bold text-base leading-none flex-shrink-0">
                →
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function WhatWeDo() {
  const services = [
    "ID card design and bulk printing for schools, offices, and institutions.",
    "Photo printing, frames, and document photos.",
    "Sublimation printing on T-shirts, mugs, caps, and metal sheets.",
    "Button badges and custom promotional items.",
    "Bulk printing services for businesses and events.",
    "Custom merchandise for branding and gifting.",
  ];

  return (
    <section className="py-32 px-6 bg-[white]">
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          What We Do
        </h2>

        <p
          className="text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          We provide printing and customization services for businesses,
          offices, schools, and individuals in all over Nepal.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {services.map((item) => (
            <div
              key={item}
              className="border border-gray-200 rounded-xl px-6 py-5 flex gap-3 items-start hover:shadow-md transition"
            >
              <span className="text-[#FE6E4D] font-bold">→</span>
              <p
                className="text-gray-700 text-sm font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// ── Section 2: Growing Without Losing Ourselves ────────────────────────────
const BracketCard = ({ children }) => (
  <div className="relative inline-block w-full max-w-lg mx-auto">
    {[
      "top-0 left-0 border-t-2 border-l-2",
      "top-0 right-0 border-t-2 border-r-2",
      "bottom-0 left-0 border-b-2 border-l-2",
      "bottom-0 right-0 border-b-2 border-r-2",
    ].map((cls, i) => (
      <span key={i} className={`absolute w-5 h-5 ${cls} border-gray-400`} />
    ))}
    <div className="rounded-2xl border border-green-200 bg-green-50 px-8  py-7 space-y-3">
      {" "}
      {children}
    </div>
  </div>
);

function GrowingSection() {
  const [ref, inView] = useInView();
  const [ref2, inView2] = useInView();

  const achievements = [
    "Serving businesses, schools, and individuals in all over Nepal.",
    "Providing bulk printing, ID cards, and custom merchandise.",
    "Focused on fast turnaround and reliable service.",
  ];
  const goals = [
    "Complete every order we accept.",
    "Support clients even when deadlines are tight.",
    "Maintain good print quality in every job.",
  ];

  return (
    <section className="py-32 px-6 bg-[#f4f4f5] ">
      <div className="max-w-3xl mx-auto">
        {/* Part A */}
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Growing Without Losing Ourselves
          </h2>

          <BracketCard>
            {achievements.map((a) => (
              <div
                key={a}
                className="rounded-full border border-gray-200 px-5 py-2.5 text-sm text-gray-700 font-medium text-center"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {a}
              </div>
            ))}
          </BracketCard>
        </div>

        <div className="border-t border-gray-200 mb-16" />

        {/* Part B */}
        <div
          ref={ref2}
          className="text-center"
          style={{
            opacity: inView2 ? 1 : 0,
            transform: inView2 ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            But speed was never the goal.
          </h2>
          <p
            className="text-gray-500 text-sm mb-10"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our goal has always been:
          </p>

          <BracketCard>
            {goals.map((g) => (
              <div
                key={g}
                className="rounded-full border border-gray-200 px-5 py-2.5 text-sm text-gray-700 font-medium flex items-center gap-3"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span
                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #FE6E4D, #CC1267)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5l2.5 2.5L8 2"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {g}
              </div>
            ))}
          </BracketCard>
        </div>
      </div>
    </section>
  );
}

// ── Section 3: Let's Print the Next Chapter ────────────────────────────────
function NextChapterSection() {
  const [ref, inView] = useInView();

  const ifYou = [
    "If you need bulk printing done quickly.",
    "If you want custom products that look clean and professional.",
    "If you want a printer that respects deadlines.",
    "If you want reliable printing for your business or office.",
    "If you prefer working with a shop that values long-term clients.",
  ];

  return (
    <section className="py-32 px-6 bg-[#f4f4f5]">
      <div
        ref={ref}
        className="max-w-5xl mx-auto"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(36px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <h2
          className="text-3xl md:text-4xl font-bold text-black text-center mb-10"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Let's Print the Next Chapter Together
        </h2>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Left gradient card */}
          <div
            className="rounded-2xl pt-10 pr-10 pb-10 pl-5 text-white relative overflow-hidden flex flex-col justify-between"
            style={{
              background: "linear-gradient(135deg, #FE6E4D 0%, #CC1267 100%)",
              minHeight: 300,
            }}
          >
            <div className="relative z-10">
              <p
                className="text-white/70 text-sm mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                We believe in
              </p>
              <p
                className="text-3xl whitespace-nowrap items-center font-bold leading-snug mb-3"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                "Quality" &gt; "Quantity"
              </p>
              <p
                className="text-xl font-semibold text-white/90"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                We're Not for Everyone.
              </p>
            </div>
          </div>

          {/* Right: if you list */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 flex flex-col justify-center gap-4">
            {ifYou.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 text-sm text-gray-700"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="mt-0.5 text-[#FE6E4D] font-bold text-base leading-none">
                  →
                </span>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="rounded-2xl border border-gray-200 bg-white px-10 py-8 text-center">
          <p
            className="text-gray-500 text-sm mb-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Then we're already aligned.
          </p>
          <p className="text-2xl poppins md:text-3xl font-bold text-gray-900">
            We're{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FE6E4D, #CC1267)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Kriti Sublimation
            </span>
            . <span>Reliable printing for businesses and individuals.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────
export default function AboutUs() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <WhyWeStarted />
      <WhatWeDo />
      <GrowingSection />
      <NextChapterSection />
    </div>
  );
}

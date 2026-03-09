import { useEffect, useState } from "react";
import React from "react";

export default function UnderDevelopment() {
  const [tick, setTick] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTick((p) => (p + 1) % 3), 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-brandBg flex items-center justify-center overflow-hidden font-serif px-6 md:px-12">
      
      <div
        className="relative z-10 text-center w-full max-w-xl lg:max-w-2xl transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        {/* Dot loader */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300"
              style={{
                background:
                  tick === i
                    ? "linear-gradient(to bottom right, #FE6E4D, #CC1267)"
                    : "#e5e5e5",
                transform: tick === i ? "scale(1.35)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-gray-800 border border-gray-200 rounded-full px-3 sm:px-4 py-1.5 bg-white mb-6 sm:mb-7">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "linear-gradient(to bottom right, #FE6E4D, #CC1267)",
              boxShadow: "0 0 6px #FE6E4D88",
            }}
          />
          WORK IN PROGRESS
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#111] leading-[1.15] tracking-tight mb-4 sm:mb-5">
          This site is currently
          <br />
          <span className="bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] bg-clip-text text-transparent">
            under development.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-base text-zinc-700 leading-relaxed mb-8 sm:mb-9">
          We're building something great.
        </p>

        {/* Divider symbol */}
        <div className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 transition-all duration-500">
          {["◆", "◇", "◈"][tick]}
        </div>

        {/* Footer */}
        <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-gray-600">
          © {new Date().getFullYear()} · Kriti Sublimation, Birgunj
        </p>
      </div>
    </div>
  );
}
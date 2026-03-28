import React, { useEffect, useRef, useState } from "react";
import HighlightedText from "./HighlightedText";
import { motion } from "framer-motion";

const PATH_D =
  "M155.395,383.31 C152.773,390.548 92.401,646.162 250.215,727.041 453.479,831.213 835.629,715.412 832.33,924.268 830.006,1071.385 20.339,1040.965 22.58,1206.204 24.517,1348.994 835.125,1320.378 832.275,1445.504 827.175,1669.362 57.235,1623.348 56.673,1760.63 55.674,2004.272 837.157,1936.609 837.205,2053.845 837.283,2246.807 137.92199,2252.96102 137.92199,2252.96102";

// ── Scroll Path Background ──

// ── Smart Video Component ──
function SmartVideo({ videoKey, className }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState(null);

  const VIDEOS = {
    hero2:
      "https://res.cloudinary.com/dm32whbjq/video/upload/q_60,w_680/262ec80d-507b-4173-97ca-caa5274680fd_tohjab.mp4",
    hero1:
      "https://res.cloudinary.com/dm32whbjq/video/upload/q_60,w_680/af01f2e2-7828-4263-9fce-c04e9a85fb11_mmcvmv.mp4",
    hero3:
      "https://res.cloudinary.com/dm32whbjq/video/upload/q_60,w_680/e2674508-d8c8-4c42-a39f-e126150d2c24_gmddjv.mp4",
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Load video only when visible
          setVideoSrc(VIDEOS[videoKey]);
          video.play().catch(() => {});
        } else {
          video.pause();
          video.muted = true;
          setMuted(true);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoKey]);

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <video
        ref={videoRef}
        className={className}
        src={videoSrc}
        loop
        muted
        playsInline
      />
      <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full pointer-events-none">
        {muted ? "🔇 Tap for audio" : "🔊"}
      </div>
    </div>
  );
}

// ── Generic Hero Text Component ──
function HeroText({ title, description }) {
  return (
    <div>
      <h1
        className="font-black leading-none tracking-tight text-stone-900 mb-6"
        style={{
          fontSize: "clamp(36px,4vw,60px)",
          fontFamily: "poppins, serif",
        }}
      >
        {title.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h1>
      <p className="text-base mt-4 text-zinc-700 font-medium leading-relaxed max-w-sm">
        {description}
      </p>
    </div>
  );
}

// ── Shared Video URLs ──
const VIDEO_CLASS = "rounded-3xl shadow-xl w-full max-w-[380px]";

// ── Main Component ──
export default function KritiHero() {
  return (
    <div>
      <div className="px-6 md:px-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl poppins font-extrabold leading-tight tracking-tight mb-4">
          See It{" "}
          <span className="relative inline-block">
            in action
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
        <HighlightedText
          text="From custom sublimation lanyards to bulk ID cards and branded merchandise — every product you see here is real work, delivered to real businesses. We handle volume without cutting corners, turn around orders within 24 hours."
          highlights={["custom", "businesses", "real work"]}
        />
      </div>

      {/* ── Sections with path background ── */}
      <div className="relative bg-brandBg overflow-hidden px-12 md:px-52">
        {/* SVG path drawn behind everything */}

        {/* Hero 1: Video Left, Text Right */}
        <section className="relative z-10 min-h-screen mt-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-4">
          <div className="flex justify-center items-center">
            <SmartVideo videoKey="hero1" className={VIDEO_CLASS} />
          </div>
          <HeroText
            title={"Sublimation lanyards for offices and events."}
            description="High-quality sublimation lanyards with full-color logo printing for offices, schools, and events. Strong fabric, clear branding, and ideal for bulk orders — offered at one of the best prices in the market with delivery within 24 hours."
          />
        </section>

        {/* Hero 2: Text Left, Video Right */}
        <section className="relative z-10 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-14">
          <div className="order-2 md:order-1">
            <HeroText
              title={"Button badges for promotions & events."}
              description="Button badges with sharp, full-color printing for promotions, offices, schools, and events. Available in 44mm and 58mm sizes, perfect for branding, campaigns, and giveaways — offered at one of the best prices in the market with delivery within 24 hours."
            />
          </div>
          <div className="flex justify-center items-center order-1 md:order-2">
            <SmartVideo videoKey="hero2" className={VIDEO_CLASS} />
          </div>
        </section>

        {/* Hero 3: Video Left, Text Right */}
        <section className="relative z-10 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-14">
          <div className="flex justify-center items-center">
            <SmartVideo videoKey="hero3" className={VIDEO_CLASS} />
          </div>
          <HeroText
            title={"Printed keyrings for branding and promotions."}
            description="High-quality sublimation keyrings with full-color printing for offices, schools, events, and gifts. Available in durable materials, perfect for branding and promotions — offered at one of the best prices in the market with delivery within 24 hours."
          />
        </section>
      </div>
    </div>
  );
}

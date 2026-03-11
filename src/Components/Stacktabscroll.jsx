import React, { useEffect, useState } from "react";
import HighlightedText from "./Home/HighlightedText";
import { motion } from "framer-motion";
import {
  ButtonBadge,
  Dori,
  HolderDori,
  IDCard,
  KeyRing,
} from "../assets/frontend_assets/index";

const services = [
  {
    id: "01",
    title: "Bulk ID Cards",
    subtitle: "Office & Student Ready",
    description:
      "High-quality ID cards in bulk — fast turnaround, sharp print, and digital lanyard printing included. Perfect for offices, schools, and institutions.",
    stat: "1000+",
    statLabel: "Cards Per Day",
    bg: "#C9BEFF",
    text: "#111111",
    accent: "#111111",
    img: IDCard,
  },
  {
    id: "02",
    title: "Sublimation Printing",
    subtitle: "Mugs · Caps · T-Shirts · Metal",
    description:
      "Custom sublimation on anything — T-shirts, ceramic mugs, metal sheets, caps, and more. Vibrant colors that last. Faster than the market, cheaper too.",
    stat: "2000+",
    statLabel: "Items Printed",
    bg: "#FFA8F2",
    text: "#111111",
    accent: "#111111",
    img: Dori,
  },
  {
    id: "03",
    title: "Bulk Printing",
    subtitle: "Flyers · Banners · Brochures",
    description:
      "From business cards to large-format banners — bulk printing for businesses and events. Consistent quality, fast delivery, no compromise.",
    stat: "24hr",
    statLabel: "Turnaround Time",
    bg: "#FFF8F0",
    text: "#111111",
    accent: "#111111",
    img: HolderDori,
  },
  {
    id: "04",
    title: "Key Ring",
    subtitle: "Frames · Badges · Custom Gifts",
    description:
      "Custom button badges, photo frames, and personalized gift items. Turn memories into keepsakes — great for events, anniversaries, and celebrations.",
    stat: "100%",
    statLabel: "Custom Made",
    bg: "#89D4FF",
    text: "#111111",
    accent: "#111111",
    img: KeyRing,
  },
];

function useResponsiveTabs(count) {
  const [tabs, setTabs] = useState({
    TAB_H: 32,
    TAB_W: 120,
    TAB_GAP: 8,
    TAB_STEP: 0,
  });

  useEffect(() => {
    function update() {
      const w = window.innerWidth;

      let TAB_H, TAB_W, TAB_GAP;

      if (w < 480) {
        TAB_H = 26;
        TAB_W = 90; // smaller
        TAB_GAP = 4;
      } else if (w < 768) {
        TAB_H = 38;
        TAB_W = 100;
        TAB_GAP = 8;
      } else if (w < 1024) {
        TAB_H = 32;
        TAB_W = 110;
        TAB_GAP = 10;
      } else {
        TAB_H = 36;
        TAB_W = 152;
        TAB_GAP = 12;
      }

      setTabs({
        TAB_H,
        TAB_W,
        TAB_GAP,
        TAB_STEP: TAB_W + TAB_GAP,
      });
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [count]);

  return tabs;
}

export default function StackTabScroll() {
  const { TAB_H, TAB_W, TAB_STEP } = useResponsiveTabs(services.length);

  return (
    <div>
      {/* Header */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6 md:pb-8">
        <h2 className="text-4xl sm:text-5xl md:text-6xl poppins font-extrabold leading-tight tracking-tight mb-4">
          Our Best{" "}
          <span className="relative inline-block">
            Works
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
      </div>

      {/* Cards */}
      <div
        className="relative "
        style={{ paddingBottom: services.length * TAB_H * 1 }}
      >
        {services.map((service, i) => (
          <div
            key={service.id}
            className="sticky pt-6 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40"
            style={{
              top: 0,
              zIndex: services.length + i,
            }}
          >
            {/* Tab */}
            <div
              style={{
                position: "relative",
                height: TAB_H,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: i * TAB_STEP,
                  bottom: 0,
                  width: TAB_W,
                  height: TAB_H,
                  background: service.bg,
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(10px,2vw,13px)",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    color: "black",
                    fontFamily: "inter, sans-serif",
                    opacity: 1,
                  }}
                >
                  Service/ {service.id}
                </span>
              </div>
            </div>

            {/* Card */}
            <div
              className={`overflow-hidden ${i === 0 ? "rounded-tr-2xl rounded-br-[24px] rounded-bl-[24px] rounded-tl-0" : "rounded-tl-[16px] rounded-tr-[16px] rounded-br-[24px] rounded-bl-[24px]"} shadow-[0_8px_40px_rgba(0,0,0,0.15)] min-h-[80] sm:min-h[96] md:min-h-[105] pt-[${TAB_H}] p-5`}
              style={{ background: service.bg, color: service.text }}
            >
              {/* left side */}
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex flex-col md:justify-between">
                  <div className="px-1 sm:px-5 md:px-5 lg:px-9 xl:px-10 pt-4 sm:pt-5 md:pt-6 pb-4 sm:pb-5">
                    <h2
                      className="font-black font-semibold leading-none mb-1 text-2xl sm:text-3xl md:text-6xl pb-4"
                      style={{
                        color: service.text,
                        fontFamily: "poppins, serif",
                      }}
                    >
                      {service.title}
                    </h2>
                    <p
                      className="text-sm md:text-base leading-relaxed max-w-xs sm:max-w-sm"
                      style={{ color: service.text, opacity: 0.75 }}
                    >
                      {service.description}
                    </p>
                  </div>

                  <div className="px-1 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-5 md:pt-6 pb-4 sm:pb-5">
                    <div>
                      <p
                        className="font-black font-semibold leading-none text-3xl sm:text-4xl md:text-5xl"
                        style={{ color: service.accent }}
                      >
                        {service.stat}
                      </p>
                      <p
                        className="text-xs font-bold tracking-widest uppercase mt-1"
                        style={{ color: service.text, opacity: 0.45 }}
                      >
                        {service.statLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex-1 rounded-2xl overflow-hidden">
                  <img
                    src={service.img}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* extra scroll space */}
    </div>
  );
}

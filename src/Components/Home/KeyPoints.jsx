import { useState } from "react";
import React from "react";

const features = [
  {
    id: "01",
    title: "Affordable Prints",
    description:
      "Get high-quality prints without burning your wallet. We make sure every order is worth every penny.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Fast Delivery",
    description:
      "Need it quick? We print and deliver your orders fast — because waiting is no fun.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Vibrant Colors",
    description:
      "Your prints will pop with vivid, true-to-life colors. Every design looks exactly how you imagined it.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="10.5" r="2.5" />
        <circle cx="8.5" cy="7.5" r="2.5" />
        <circle cx="6.5" cy="12.5" r="2.5" />
        <path d="M12 22c4.97 0 9-4.03 9-9H3c0 4.97 4.03 9 9 9z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Bulk Discounts",
    description:
      "Printing more? Pay less! Save big when you order in bulk — no hidden fees, just honest savings.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];
export default function FeaturesGrid() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div>
      <style>{`
        .feat-card {
          transition: all 0.38s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .feat-card:hover {
          transform: translateY(-6px);
        }

        .icon-wrap {
          transition: all 0.35s ease;
        }
        .feat-card:hover .icon-wrap {
          transform: scale(1.07);
        }

        .slide-bar {
          transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .f1 { animation: fadeUp 0.6s ease both 0.05s; }
        .f2 { animation: fadeUp 0.6s ease both 0.15s; }
        .f3 { animation: fadeUp 0.6s ease both 0.25s; }
        .f4 { animation: fadeUp 0.6s ease both 0.35s; }
        .f5 { animation: fadeUp 0.6s ease both 0.45s; }
        .f6 { animation: fadeUp 0.6s ease both 0.55s; }

        .paper-lines {
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 31px,
            rgba(180,140,60,0.06) 31px,
            rgba(180,140,60,0.06) 32px
          );
        }
      `}</style>

      <div className="paper-lines grid gap-5 py-6 md:grid-cols-2 lg:grid-cols-2 md:py-10">
        {features.map((feature, i) => {
          const isHovered = hoveredId === feature.id;
          const cls = ["f1", "f2", "f3", "f4", "f5", "f6"][i];

          return (
            // boxes
            <div
              key={feature.id}
              className={`feat-card ${cls}  cursor-default overflow-hidden rounded-2xl bg-white px-5 sm:px-6 md:px-7 py-8 sm:py-14 md:py-10 border transition-all duration-300`}
              style={{
                borderColor: isHovered
                  ? "rgba(185,130,45,0.5)"
                  : "rgba(215,195,155,0.6)",
                boxShadow: isHovered
                  ? "0 20px 56px rgba(150,100,30,0.13), 0 4px 16px rgba(150,100,30,0.07)"
                  : "0 2px 14px rgba(180,150,90,0.07)",
              }}
              onMouseEnter={() => setHoveredId(feature.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Top: icon + number */}
              <div className="mb-4 flex items-start justify-between sm:mb-5">
                <div
                  className="icon-wrap inline-flex items-center justify-center rounded-xl p-2 sm:p-3 transition-all duration-300"
                  style={{
                    background: isHovered
                      ? "linear-gradient(135deg, #FE6E4D, #CC1267)"
                      : "#CC1267",
                    color: isHovered ? "#fff" : "#fff",
                    boxShadow: isHovered
                      ? "0 6px 20px rgba(204,18,103,0.35)"
                      : "inset 0 1px 0 rgba(255,255,255,0.8)",
                  }}
                >
                  {feature.icon}
                </div>

                <span
                  className="display-font select-none text-4xl sm:text-5xl md:text-6xl font-bold leading-none transition-all duration-300"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: isHovered
                      ? "1.5px rgba(204,18,103,0.35)" // matches your gradient hover
                      : "1.5px rgba(254,110,77,0.25)", // subtle default outline
                  }}
                >
                  {feature.id}
                </span>
              </div>

              {/* Title */}
              <h3
                className="poppins mb-2 text-xl sm:text-2xl md:text-2xl font-semibold leading-tight transition-colors duration-300"
                style={{ color: isHovered ? "#6b3c08" : "#2e1e06" }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="ui-font text-zinc-800 inter mb-4 sm:mb-5 text-sm sm:text-base md:text-base font-light leading-relaxed">
                {feature.description}
              </p>

              {/* Sliding accent bar */}
              <div className="h-1 w-full overflow-hidden rounded-full bg-gradient-to-br from-[#fe6d4d3c] to-[#cc12662b]">
                <div
                  className="slide-bar h-full rounded-full transition-all duration-300"
                  style={{
                    width: isHovered ? "100%" : "28px",
                    background: isHovered
                      ? "linear-gradient(135deg, #FE6E4D, #CC1267)"
                      : "linear-gradient(135deg, #FFE5DE, #FFD1E3)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

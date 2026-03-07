import React from "react";
import { DrawCircleText } from "../DrawCircleText";
import { motion } from "framer-motion";
import { FlipWords } from "./FlipWords";
import { LiaLongArrowAltDownSolid } from "react-icons/lia";

const HeroSection = () => {
  return (
    <div>
      <div className="flex max-h-screen flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div
          className="mt-6 rounded-full border border-gray-300 bg-white px-4 py-2 
                   sm:text-sm md:text-base font-semibold"
        >
          Fast • Affordable • Professional
        </div>

        <h1
          className="mt-6 font-bold 
               text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
               leading-tight sm:leading-tight md:leading-tight"
        >
          Prints that set the quality standard at{" "}
          <span className="relative inline-block">
            unbeatable
            <svg
              viewBox="0 0 286 73"
              fill="none"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="underlineGradientRedOrange"
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
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.25, ease: "easeInOut" }}
                d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                stroke="url(#underlineGradientRedOrange)"
                strokeWidth="3"
              />
            </svg>
          </span>{" "}
          prices.
        </h1>

        {/* Styled FlipWords section */}
        <div className="mt-19 md:mt-14 flex flex-col items-center gap-2">
          {/* Label above */}
          <p className="text-m uppercase tracking-[0.2em] text-gray-400 font-semibold">
            We print
          </p>

          {/* Pill container with accent left bar */}
          <div className="relative flex items-center">
            {/* Yellow accent bar on left */}
            <span className="absolute -left-4 top-1/2 bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] -translate-y-1/2 w-1.5 h-8 rounded-full" />

            <FlipWords
              words={[
                "Student ID Card",
                "Office ID cARD",
                "Button Pin Badge",
                "Sublimation T-Shirt",
                "Sublimation Mug",
                "Cap Print",
                "Sublimation Metal Sheet",
                "Lanyard/Dori Print",
                "Gift Item",
                "Photo Frame",
              ]}
              className="text-3xl whitespace-nowrap sm:text-3xl md:text-4xl lg:text-5xl font-extrabold capitalize text-gray-900 tracking-tight"
            />
          </div>

          {/* Subtle animated underline */}
          <motion.div
            className="h-0.5 bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            style={{ maxWidth: "200px" }}
          />
        </div>

        {/* Scroll down components */}

        <div>
          <div className="h-full w-full cursor-pointer md:pt-22 pt-42 pb-12 flex justify-center items-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Rotating Text */}
              <svg
                viewBox="0 0 200 200"
                className="absolute w-full h-full rotating-text"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="
                M 100,100
                m -70,0
                a 70,70 0 1,1 140,0
                a 70,70 0 1,1 -140,0
              "
                  />
                </defs>

                <text
                  fill="black"
                  fontSize="14"
                  fontWeight="600"
                  letterSpacing="4"
                >
                  <textPath href="#circlePath" startOffset="0%">
                    • SCROLL • DOWN • SCROLL • DOWN • SCROLL
                  </textPath>
                </text>
              </svg>

              {/* Center Arrow */}
              <LiaLongArrowAltDownSolid className="text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import React from "react";
import { DrawCircleText } from "../Components/DrawCircleText";
import { motion } from "framer-motion";
import { FlipWords } from "../Components/Home/FlipWords";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-brandBg px-6 md:px-12 pt-18">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="mt-6 rounded-4xl border border-gray-300 bg-white px-4 py-2 text-sm md:text-base font-semibold">
          Fast • Affordable • Professional
        </div>

        <h1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
               leading-10 sm:leading-12 md:leading-14 lg:leading-1 xl:leading-[5rem]"
        >
          Prints that set the{" "}
          <span className="relative inline-block">
            benchmark
            <svg
              viewBox="0 0 286 73"
              fill="none"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.25, ease: "easeInOut" }}
                d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                stroke="#FACC15"
                strokeWidth="3"
              />
            </svg>
          </span>{" "}
          for quality at prices below the market.
        </h1>

        {/* Styled FlipWords section */}
        <div className="mt-14 flex flex-col items-center gap-2">
          {/* Label above */}
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
            We print
          </p>

          {/* Pill container with accent left bar */}
          <div className="relative flex items-center">
            {/* Yellow accent bar on left */}
            <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full bg-yellow-400" />

            <FlipWords
              words={[
                "Student ID",
                "Office ID",
                "Badge",
                "T-Shirt",
                "Mug",
                "Cap",
                "Metal Sheet",
                "Bulk Print",
                "Gift Item",
                "Photo Frame",
              ]}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold capitalize text-gray-900 tracking-tight"
            />
          </div>

          {/* Subtle animated underline */}
          <motion.div
            className="h-0.5 bg-yellow-400 rounded-full"
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
      </div>
    </div>
  );
};

export default Home;
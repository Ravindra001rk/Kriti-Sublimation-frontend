import React from "react";
import { motion } from "framer-motion";
import ChooseBox from "./HighlightedText";
import HighlightedText from "./HighlightedText";
import KeyPoints from "./KeyPoints";

const WhyChoose = () => {
  return (
    <div className=" bg-[#e9e9e9] mt-23  bordern border-[bg-brandBg] text-black   md:rounded-tl-[4vw] rounded-tl-[12vw] md:rounded-tr-[4vw] rounded-tr-[12vw] md:rounded-bl-[4vw] rounded-bl-[12vw] md:rounded-br-[4vw] rounded-br-[12vw] min-h-[50vh] pt-18 py-6 px-8 md:px-12 ">
      <h2
        className="text-4xl  sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight poppins 
              bg-gradient-to-br from-[#FE6E4D] to-[#CC1267]  py-2
               bg-clip-text text-transparent"
      >
        क्रिती सब्लीमेशन{" "}
        <span className="relative text-black inline-block">
          नै किन?
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
        text="तपाईंको समयसीमा र बजेट हाम्रो प्राथमिकता हो। त्यसैले हामी छरितो सेवा, प्रतिस्पर्धी मूल्य, र उच्च-गुणस्तरको प्रिन्ट उत्पादन सुनिश्चित गर्छौँ— जसले तपाईंलाई बिना तनाव आफ्ना कामहरू सहज रूपमा अगाडि बढाउन मद्दत गर्छ।"
        highlights={["प्राथमिकता", "उच्च-गुणस्तरको", "कामहरू सहज"]}
      />

      <KeyPoints />
    </div>
  );
};

export default WhyChoose;

import React from "react";
import { motion } from "framer-motion";

const HighlightedText = ({ text, highlights = [], className = "" }) => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const draw = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  const renderText = () => {
    if (!text) return null;

    let result = text;

    highlights.forEach((word) => {
      result = result.replace(word, `__HIGHLIGHT__${word}__END__`);
    });

    const parts = result.split(/(__HIGHLIGHT__.*?__END__)/g);

    return parts.map((part, index) => {
      if (part.startsWith("__HIGHLIGHT__")) {
        const cleanWord = part
          .replace("__HIGHLIGHT__", "")
          .replace("__END__", "");

        return (
          <span key={index} className="relative font-semibold text-zinc-900">
            {cleanWord}
            <motion.svg
              className="absolute -bottom-1 left-0 w-full h-2"
              viewBox="0 0 200 6"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="underlineGradient"
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
                variants={draw}
                d="M0 3 C50 6, 150 0, 200 3"
                stroke="url(#underlineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>
        );
      }

      return part;
    });
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`max-w-3xl mt-10 text-left text-base sm:text-lg md:text-xl lg:text-2xl 
      leading-relaxed md:leading-loose text-zinc-800 font-medium inter relative ${className}`}
    >
      {renderText()}
    </motion.h1>
  );
};

export default HighlightedText;

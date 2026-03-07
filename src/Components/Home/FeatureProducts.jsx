import React from "react";
import { motion } from "framer-motion";
import HighlightedText from "./HighlightedText";
import {
  ButtonBadge,
  Dori,
  HolderDori,
  IDCard,
  KeyRing,
  PressJacket,
} from "../../assets/frontend_assets";
import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: "01",
    image: IDCard,
    title: "ID Card",
    desc: "Customizable, plastic or PVC",
  },
  {
    id: "02",
    image: Dori,
    title: "Lanyard Printing, Wholesale & Beyond.",
    desc: "Available Sizes: 20mm & 16mm",
  },
  {
    id: "03",
    image: HolderDori,
    title: "School dori Attached with holder",
    desc: "Available Sizes: 20mm & 16mm",
  },
  {
    id: "04",
    image: KeyRing,
    title: "Lanyard Keyring",
    desc: "Available Sizes: 20mm & 16mm",
  },
  {
    id: "05",
    image: ButtonBadge,
    title: "Button Pin Badge",
    desc: "Available Sizes: 44mm & 58mm",
  },
  {
    id: "06",
    image: PressJacket,
    title: "Press Jacket",
    desc: "Protective and stylish",
  },
];

const FeatureProducts = () => {
  return (
    <div className="min-h-screen py-12 px-6 md:px-12">
      <h2 className="text-4xl sm:text-5xl md:text-6xl poppins font-extrabold leading-tight tracking-tight mb-4">
        Featured{" "}
        <span className="relative inline-block">
          Products
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
        text="Our most ordered products, trusted by businesses for speed, quality, and fair pricing."
        highlights={["ordered", "businesses"]}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-16">
        {featuredProducts.map((product) => {
          const [isHovered, setIsHovered] = React.useState(false);

          return (
            <div
              key={product.id}
              className="relative overflow-hidden rounded-2xl border-zinc-800 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
            >
              <img
                src={product.image}
                alt={product.title}
                className={`w-full h-full object-cover transition-transform duration-500 ease-in-out transform ${
                  isHovered ? "scale-110" : "scale-103"
                }`}
              />
              <div
                className="absolute bottom-0 left-0 w-full p-3 overflow-hidden 
                     bg-gradient-to-t from-black/100 to-transparent"
              >
                {/* bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] */}
                <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-white">
                  {product.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-white">
                  {product.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="py-5 mt-2 w-full flex justify-center">
        <Link to="/products">
          <button className="px-4 py-2 cursor-pointer bg-white text-black border border-zinc-400 rounded-3xl">
            See More Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeatureProducts;

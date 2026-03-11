import React from "react";
import { motion } from "framer-motion";
import HighlightedText from "./HighlightedText";
import { GoArrowUpRight } from "react-icons/go";
import {
  ButtonBadge,
  Dori,
  DoriWholesale,
  HolderDori,
  IDCard,
  KeyRing,
} from "../../assets/frontend_assets";
import { Link, Links } from "react-router-dom";

const featuredProducts = [
  {
    id: "01",
    image: IDCard,
    title: "ID Card",
    desc: "High-quality PVC or plastic ID cards, perfect for offices, schools, or events.",
  },
  {
    id: "02",
    image: Dori,
    title: "Lanyard Printing",
    desc: "Durable lanyards available in 16mm & 20mm, ideal for ID cards, events, and promotions.",
  },
  {
    id: "03",
    image: HolderDori,
    title: "School Lanyard with Holder",
    desc: "Convenient school lanyard with card holder, available in 16mm & 20mm sizes.",
  },
  {
    id: "04",
    image: KeyRing,
    title: "Lanyard Keyring",
    desc: "Keep your keys handy with our 16mm & 20mm lanyard keyrings, practical for everyday use.",
  },
  {
    id: "05",
    image: ButtonBadge,
    title: "Button Pin Badge",
    desc: "Customizable 44mm & 58mm pin badges, ideal for events, promotions, and gifts.",
  },
  {
    id: "06",
    image: DoriWholesale,
    title: "Wholesale Lanyard",
    desc: "Bulk lanyard supply for schools, offices, or events, combining style and functionality.",
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
                  isHovered ? "scale-105" : "scale-103"
                }`}
              />
              <div
                className="absolute bottom-0 left-0 w-full p-3 overflow-hidden 
                     bg-gradient-to-t from-[#000000a1]  to-transparent"
              >
                {/* bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] */}
                <Link to="/products">
                  <div className="flex justify-between gap-6 items-center">
                    <div className="">
                      <h3 className="font-bold text-lg whitespace-nowrap md:text-xl lg:text-2xl text-white">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-xs text-white">
                        {product.desc}
                      </p>
                    </div>

                    <div>
                      <h1 className="text-white text-3xl">
                        <GoArrowUpRight />
                      </h1>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="py-8 mt-2 w-full flex justify-center">
        <Link to="/products">
          <button
            className="group relative px-8 py-3 cursor-pointer overflow-hidden rounded-full font-semibold text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #FE6E4D, #CC1267)",
              boxShadow: "0 4px 20px rgba(254,110,77,0.4)",
            }}
          >
            {/* Shimmer effect */}
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              }}
            />

            {/* Button content */}
            <span className="relative flex items-center gap-2 text-sm tracking-wide">
              Explore All Products <GoArrowUpRight />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeatureProducts;

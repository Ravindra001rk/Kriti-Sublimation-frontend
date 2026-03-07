import { useState } from "react";
import React from "react";

const photos = [
  {
    src: "https://www.photoforid.com/static/images/thumbnail.jpg",
    rotate: "-rotate-6",
    top: "top-4",
    left: "left-0",
    size: "w-36 h-28 md:w-48 md:h-36",
    zIndex: "z-10",
    delay: "delay-100",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk7NaoF5X6L5Y4ipTnr4ceQncOTnJ569bR5g&s",
    rotate: "rotate-3",
    top: "top-16",
    left: "left-28 md:left-40",
    size: "w-32 h-28 md:w-44 md:h-36",
    zIndex: "z-20",
    delay: "delay-200",
  },
  {
    src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=300&q=80",
    rotate: "-rotate-3",
    top: "top-0",
    left: "left-52 md:left-72",
    size: "w-28 h-24 md:w-40 md:h-32",
    zIndex: "z-10",
    delay: "delay-300",
  },
  {
    src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=300&q=80",
    rotate: "rotate-6",
    top: "top-36 md:top-44",
    left: "left-4",
    size: "w-32 h-28 md:w-44 md:h-36",
    zIndex: "z-30",
    delay: "delay-150",
  },
  {
    src: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=300&q=80",
    rotate: "-rotate-2",
    top: "top-40 md:top-52",
    left: "left-36 md:left-52",
    size: "w-36 h-32 md:w-52 md:h-40",
    zIndex: "z-20",
    delay: "delay-250",
  },
  {
    src: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=300&q=80",
    rotate: "rotate-4",
    top: "top-28 md:top-36",
    left: "left-60 md:left-80",
    size: "w-28 h-24 md:w-40 md:h-32",
    zIndex: "z-10",
    delay: "delay-350",
  },
];

export default function PhotoHero() {
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (phone.length !== 10) {
      setError("Enter a valid 10-digit phone number");
      return;
    }
    window.location.href = `/photos/${phone}`;
  };
  const handleDownload = () => {
    window.open(result.imageUrl, "_blank");
  };

  return (
    <section className="min-h-[calc(100dvh-5rem)] bg-brandBg w-full flex items-center relative overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-0 right-0 w-56 sm:w-72 md:w-96 h-56 sm:h-72 md:h-96 rounded-full opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3"
        style={{
          background: "radial-gradient(circle, #f9a8d4 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 sm:w-60 md:w-80 h-48 sm:h-60 md:h-80 rounded-full opacity-15 pointer-events-none -translate-x-1/3 translate-y-1/3"
        style={{
          background: "radial-gradient(circle, #c084fc 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-10 md:py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl z-10 w-full">
          <h1 className="leading-tight mb-6">
            <span className="block italic font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl bg-linear-to-br from-[#FE6E4D] to-[#CC1267] bg-clip-text text-transparent">
              Find Your Photos
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-xs sm:max-w-sm text-gray-500">
            Enter your phone number to view and download your photos.
          </p>

          {/* Input */}
          <div className="flex items-center w-full max-w-sm mb-4 bg-white rounded-full border border-purple-100 shadow-md focus-within:ring-2 focus-within:ring-pink-300 transition-all overflow-hidden">
            <span className="pl-5 pr-3 text-sm font-semibold text-gray-700 border-r border-gray-200">
              +977
            </span>

            <input
              type="tel"
              placeholder="Enter your phone number"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="flex-1 bg-transparent outline-none px-4 py-3 text-sm sm:text-base text-gray-900 caret-pink-500"
            />
          </div>

          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full max-w-sm py-3 sm:py-4 rounded-full text-white font-bold text-sm sm:text-base tracking-wide bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Searching..." : "View Photos"}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex items-center justify-center relative w-full mt-8 lg:mt-0">

  <div className="relative w-[90%] max-w-[420px] sm:max-w-[500px] md:max-w-[540px] h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] mx-auto">

    {photos.map((photo, i) => (
      <div
        key={i}
        className={`absolute ${photo.rotate} ${photo.top} ${photo.left} ${photo.size} ${photo.zIndex} transition-transform duration-500 hover:scale-110 hover:z-50 cursor-pointer`}
        style={{
          background: "#fff",
          padding: "6px 6px 22px 6px",
          boxShadow:
            "0 6px 24px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.08)",
          borderRadius: "3px",
          animation: `fadeSlideIn 0.7s ease forwards`,
          animationDelay: `${i * 120}ms`,
          opacity: 0,
        }}
      >
        <img
          src={photo.src}
          alt={`memory ${i + 1}`}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
    ))}

  </div>

</div>
      </div>

      <style>{`
    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(24px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `}</style>
    </section>
  );
}

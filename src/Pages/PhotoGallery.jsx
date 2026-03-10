import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";

export default function PhotoGallery() {
  const { phone } = useParams();
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const API =
          window.location.hostname === "localhost"
            ? "http://localhost:5000"
            : "https://kriti-sublimation-backend.onrender.com";

        const res = await fetch(`${API}/api/photos/retrieve/${phone}`); // ← this line was missing
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "No photos found");
        } else {
          setPhotos(data.photos);
        }
      } catch {
        setError("Server error, try again");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [phone]);
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-NP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownload = async (imageUrl, index) => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `photo_${phone}_${index + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, "_blank");
    }
  };

  if (loading)
    return (
      <div className="min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] flex items-center justify-center bg-white">
        <p className="text-gray-400 animate-pulse">Loading your photos...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] flex items-center justify-center bg-white">
        <p className="text-red-400">{error}</p>
      </div>
    );

  return (
    <div className="min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] bg-brandBg from-purple-50 to-pink-50 py-12 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Your Photos</h1>
          <p className="text-m text-zinc-700 mt-1">📱 +977 {phone}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo, i) => (
            <div
              key={photo._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                animation: `fadeIn 0.4s ease forwards`,
                animationDelay: `${i * 80}ms`,
                opacity: 0,
              }}
            >
              <img
                src={photo.imageUrl}
                alt={`photo ${i + 1}`}
                className="w-full h-52 object-cover object-top cursor-pointer"
                onClick={() => window.open(photo.imageUrl, "_blank")}
              />
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-3">
                  🕒 {formatDate(photo.createdAt)}
                </p>
                <button
                  onClick={() => handleDownload(photo.imageUrl, i)}
                  className="w-full py-2 rounded-full text-xs font-bold text-white bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] hover:scale-105 transition-all"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back */}
        <div className="mt-10 text-center">
          <Link to="/gallery">
            <button className="text-sm text-purple-400 hover:text-purple-600 underline">
              ← Search another number
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";

const API =
  window.location.hostname === "localhost" ||
  window.location.hostname === "192.168.1.208"
    ? `http://${window.location.hostname}:5000`
    : "https://kriti-sublimation-backend.onrender.com";

const WHATSAPP = "9779855086132";

const toWebP = (url) => url.replace("/upload/", "/upload/f_webp/");

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetch(`${API}/api/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleOrder = () => {
    const message = `Hello, I am interested in ${product.name}. Please share the price and how I can order it.`;
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Split description — first sentence as short desc, rest as long desc

  if (loading)
    return (
      <div className="bg-brandBg animate-pulse">
      {/* ── Main Section ── */}
      <div className="max-w-6xl pt-12 px-6 md:px-12 pb-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          
          {/* LEFT: Thumbnails + Main Image */}
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 order-2 sm:order-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-200"
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 order-1 sm:order-2">
              <div className="bg-gray-200 rounded-2xl aspect-square w-full" />
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="flex flex-col justify-between">
            <div className="md:w-80 lg:w-96 flex flex-col gap-3">
              {/* Title */}
              <div className="space-y-2 mb-4">
                <div className="h-7 bg-gray-200 rounded-lg w-4/5" />
                <div className="h-7 bg-gray-200 rounded-lg w-3/5" />
              </div>

              {/* Short description */}
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>

              {/* WhatsApp CTA button */}
              <div className="w-full h-14 rounded-xl bg-gray-200 mb-4" />
            </div>

            {/* Hardcoded info */}
            <div>
              <hr className="border-gray-200 mb-4" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-4/5" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
    );

  if (!product)
    return (
      <div className="min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] flex items-center justify-center bg-brandBg">
        <p className="text-gray-400">Product not found</p>
      </div>
    );

  return (
    <div className=" bg-brandBg">
      {/* ── Main Section ── */}
      <div className="max-w-6xl pt-12 px-6 md:px-12 pb-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* LEFT: Thumbnails + Main Image */}
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-visible">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === i
                        ? "border-gray-800"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 order-1 sm:order-2">
              <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square">
                <img
                  src={toWebP(product.images[activeImage])}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className=" flex flex-col justify-between">
            <div className="md:w-80 lg:w-96 flex flex-col gap-3">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
                {product.name}
              </h1>

              {/* Short description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {product.shortDesc}
              </p>

              {/* WhatsApp CTA */}
              <button
                onClick={handleOrder}
                className="w-full py-4 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-3 transition-all hover:opacity-90 hover:shadow-lg active:scale-95 mb-4"
                style={{ background: "#25d366" }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get a Quote
              </button>
            </div>
            {/* Hardcoded info */}
            <div className="">
              <hr className="border-gray-200 mb-4 " />
              <div className="space-y-2">
                <p className="text-xs text-gray-500">
                  ✦ High quality custom printing guaranteed
                </p>
                <p className="text-xs text-gray-500">
                  ✦ Fast turnaround — quicker than market standard
                </p>
                <p className="text-xs text-gray-500">
                  ✦ Bulk orders welcome with special pricing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Long Description Section (bottom) ── */}
      {product.longDesc && (
        <div className="px-4 sm:px-6 md:px-10 lg:px-16 pb-12">
          <div className="border-t border-gray-200">
            {/* Tab header */}
            <div className="flex border-b border-gray-200">
              <div className="px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-semibold text-gray-900 border-b-2 border-gray-900 -mb-px">
                Description
              </div>
            </div>

            {/* Long description */}
            <div className="pt-6 sm:pt-8">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed sm:leading-loose">
                {product.longDesc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

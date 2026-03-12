import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const API =
  window.location.hostname === "localhost" ||
  window.location.hostname === "192.168.1.208"
    ? `http://${window.location.hostname}:5000`
    : "https://kriti-sublimation-backend.onrender.com";

const toWebP = (url) => url.replace("/upload/", "/upload/f_webp/");

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  //fetch product
  useEffect(() => {
    const cached = sessionStorage.getItem("productsCache");
    const cachedTime = sessionStorage.getItem("productsCacheTime");
    const isExpired =
      !cachedTime || Date.now() - parseInt(cachedTime) > 5 * 60 * 1000; // 5 min

    if (cached && !isExpired) {
      setProducts(JSON.parse(cached));
      setLoading(false);
    } else {
      fetch(`${API}/api/products`)
        .then((r) => r.json())
        .then((data) => {
          setProducts(data.products);
          sessionStorage.setItem(
            "productsCache",
            JSON.stringify(data.products),
          );
          sessionStorage.setItem("productsCacheTime", Date.now().toString());
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);
  
  // save scroll positon
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const saved = sessionStorage.getItem("productsScroll");
    sessionStorage.removeItem("productsScroll");
    setVisible(true);

    if (saved) {
      const pos = parseInt(saved);
      setTimeout(() => {
        window.scrollTo({ top: pos, behavior: "instant" });
      }, 10);
    }
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  // skeleton code
  const ProductSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="relative">
        <div className="w-full h-44 bg-gray-200 animate-pulse" />
        <div className="absolute top-2 left-2 w-16 h-5 bg-purple-200 rounded-full animate-pulse" />
      </div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
        <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
        <div className="mt-3 h-3 bg-purple-100 rounded animate-pulse w-1/3" />
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="min-h-screen bg-brandBg py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  return (
    <div
      className={`transition-opacity duration-100 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="min-h-screen bg-brandBg py-12 px-4  sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* search box */}
          {/* Search */}
          <div className="flex justify-end mb-4">
            <div
              className={`relative transition-all duration-500 ease-in-out ${
                search ? "w-full sm:w-72" : "w-full sm:w-48"
              } focus-within:w-full sm:focus-within:w-72`}
            >
              <svg
                className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 outline-none focus:border-violet-400 transition-all duration-500 placeholder-gray-400 shadow-sm"
              />
            </div>
          </div>
          {/* Category Filter */}
          <div className="w-full overflow-x-auto overflow-y-hidden mb-8">
            <div className="flex gap-2 whitespace-nowrap px-1 cursor-grab active:cursor-grabbing">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    activeCategory === cat
                      ? "text-white shadow-md"
                      : "text-gray-500 bg-white border border-gray-200 hover:border-violet-300"
                  }`}
                  style={
                    activeCategory === cat
                      ? {
                          background:
                            "linear-gradient(135deg, #7c3aed, #db2777)",
                        }
                      : {}
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400">No products found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((product, i) => (
                <div
                  key={product._id}
                  onClick={() => {
                    sessionStorage.setItem("productsScroll", window.scrollY);
                    navigate(`/products/${product.slug}`);
                  }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={toWebP(product.images[0])}
                      alt={product.name}
                      className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #db2777)",
                      }}
                    >
                      {product.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-gray-900 font-semibold text-sm truncate">
                      {product.name}
                    </p>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-violet-500 font-medium">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

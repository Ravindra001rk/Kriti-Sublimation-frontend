import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Products from "./Pages/Products";
import Gallery from "./Pages/Gallery";
import About from "./Pages/About";
import SmoothScroll from "./Components/SmoothScroll";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/Home/ScrollToTop";
import PhotoGallery from "./Pages/PhotoGallery";
import AdminPanel from "./Pages/AdminPanel";
import ProductDetail from "./Pages/ProductDetail";
import ClicktoScrollTop from "./Components/ClicktoScrollTop";
import { useLocation } from "react-router-dom";
import ScrollToTopBtn from "./Components/ClicktoScrollTop";
import Footer from "./Components/Footer";
function App() {
  const location = useLocation();
  const hideOn = ["/admin"]; // add more paths if needed
  const showBtn = !hideOn.some((path) => location.pathname.startsWith(path));
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {/* your routes */}
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/photos/:phone" element={<PhotoGallery />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
      </Routes>
      {!isAdmin && <Footer />}
      {showBtn && <ScrollToTopBtn />}
    </>
  );
}
export default App;

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

const App = () => {
  return (
    <div className="">
      <Navbar />
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/photos/:phone" element={<PhotoGallery />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </SmoothScroll>
    </div>
  );
};

export default App;

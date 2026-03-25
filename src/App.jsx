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
import IdCardForm from "./Pages/IdCardForm";
import OfficeIdCardForm from "./Pages/OfficeIdCardForm";
import SchoolIdCardForm from "./Pages/SchoolIdCardForm";
import FormStatus from "./Pages/FormStatus";
import SchoolStaffForm from "./Pages/SchoolStaffForm";
import SchoolStudentsPage from "./Pages/SchoolStudentsPage";
import LoginPage from "./Pages/LoginPage";
import Profile from "./Pages/Profile";
function App() {
  const location = useLocation();
  const hideOn = ["/admin"]; // add more paths if needed
  const showBtn = !hideOn.some((path) => location.pathname.startsWith(path));
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="bg-brandBg pt-16">
      {/* your routes */}
      <Navbar />
      <ScrollToTop />
      <SmoothScroll/>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/photos/:phone" element={<PhotoGallery />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/IdCardForm" element={<IdCardForm />} />
        <Route path="/OfficeIdCardForm" element={<OfficeIdCardForm />} />
        <Route path="/SchoolIdCardForm" element={<SchoolIdCardForm />} />
        <Route
          path="/SchoolIdCardForm/students"
          element={<SchoolStudentsPage />}
        />
        <Route path="/SchoolIdCardForm/staff" element={<SchoolStaffForm />} />
        <Route path="/status" element={<FormStatus />} />
        <Route path="/status/:id" element={<FormStatus />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/IdCardForm/office"
          element={<IdCardForm initialView="office" />}
        />
        <Route
          path="/IdCardForm/school"
          element={<IdCardForm initialView="school" />}
        />
        <Route
          path="/IdCardForm/status"
          element={<IdCardForm initialView="status" />}
        />
      </Routes>
      {!isAdmin && <Footer />}
      {showBtn && <ScrollToTopBtn />}
    </div>
  );
}
export default App;

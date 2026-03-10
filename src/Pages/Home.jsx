import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import WhyChoose from "../Components/Home/WhyChoose";
import FeatureProducts from "../Components/Home/FeatureProducts";
import StackTabScroll from "../Components/Stacktabscroll";
import UnderDevelopment from "../Components/Underdevelopment";

const Home = () => {
  return (
    <div className="w-full bg-brandBg  pt-16">
      <HeroSection />
      <WhyChoose />
      <FeatureProducts />
      <StackTabScroll />
      <UnderDevelopment />
    </div>
  );
};

export default Home;

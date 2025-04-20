import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductSlide from "../components/ProductSlide";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";
import { SearchContext } from "../context/SearchContext";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Hero />
      <ProductSlide categoryName={"Snacks"} />
      <ProductSlide categoryName={"Dairy"} />
      <ProductSlide categoryName={"Cold Drinks"} />
      <ProductSlide categoryName={"Biscuit"} />
      <Footer />
    </div>
  );
};

export default Home;

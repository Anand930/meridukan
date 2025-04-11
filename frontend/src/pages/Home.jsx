import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductSlide from "../components/ProductSlide";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";
import fetchWithAuth from "../utils/fetchWithAuth";

const Home = () => {
  // const { userRender, handleProduct, products } = useContext(UserContext);

  // useEffect(() => {
  //   userRender();
  //   handleProduct();
  // }, [products]);
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <ProductSlide categoryName={"Snacks"} /> */}
      {/* <ProductSlide categoryName={"Dairy"} /> */}
      {/* <ProductSlide categoryName={"Cold Drinks"} /> */}
      {/* <ProductSlide categoryName={"Biscuit"} /> */}
      <Footer />
    </div>
  );
};

export default Home;

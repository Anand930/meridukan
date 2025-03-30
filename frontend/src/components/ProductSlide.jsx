import React, { useContext, useEffect, useState, useRef } from "react";
import Slider from "./Slider";
import { UserContext } from "../context/UserContext";

const ProductSlide = ({ categoryName }) => {
  // const [productSampleCategorywise, setProductSampleCategorywise] = useState([]);
  const prevProducts = useRef([])
  const { products, setProducts } = useContext(UserContext);
  
  const handleProduct = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/product/getproduct"
      );
      const data = await response.json();
      console.log("fetched data", data);
      // Check if products have actually changed before setting state
      if (JSON.stringify(prevProducts.current) !== JSON.stringify(data.products)) {
        setProducts(data.products);
        prevProducts.current = data.products; // Update ref to store latest data
    }
    } catch (error) {
      console.log("Error occurred while getting all the products", error);
    }
  };

  useEffect(() => {
    handleProduct();
    console.log(products);
  }, []);



  let Categories = [];
  products.map((item) => Categories.push(item.categories));

  const productSampleCategorywise = products.filter((item) =>item.categories === categoryName);

  console.log(productSampleCategorywise);

  return (
    <div>
      <h1 className="flex justify-start items-center px-5 mt-6 text-2xl font-bold text-pink-600 cursor-pointer ">
        {categoryName}
      </h1>
      <div className="my-2 px-5">
        <Slider item={productSampleCategorywise} />
      </div>
    </div>
  );
};

export default ProductSlide;

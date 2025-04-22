import React, { useEffect, useState, useContext, useRef } from "react";
// import productSample from '../assets/products.json'
import cheetos from "/cheetos.png";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { UserContext } from "../../context/UserContext";
import fetchWithAuth from "../../utils/fetchWithAuth";

const Product = () => {
  
  const {products, setProducts, user} = useContext(UserContext);

  const prevProducts = useRef([]);
  const handleProduct = async () => {
    try {
      const response = await fetchWithAuth(
        "/api/product/getproduct"
      );
      const data = await response.json();
      
      // Check if products have actually changed before setting state
      if (
        JSON.stringify(prevProducts.current) !== JSON.stringify(data.products)
      ) {
        setProducts(data.products);
        prevProducts.current = data.products; // Update ref to store latest data
      }
    } catch (error) {
      console.log("Error occurred while getting all the products", error);
    }
  };
  
  useEffect(()=>{
    if(products.length==0){
      handleProduct()
    }
    

  },[products])
  return (
    <div>
      <Navbar />
      <div className="md:mx-10 md:my-5 my-2 mx-2">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-col-5 gap-4 md:h-5/6 lg:h-3/4 sm:grid-cols-2 grid-cols-1 ">
          {products.map((p, i) => (
            <div
            
              key={i}
              >
              <Link to={`/productDetails/${p.name}`}>
                <Card item={p}/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

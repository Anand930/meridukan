import React, { useEffect, useState, useContext } from "react";
// import productSample from '../assets/products.json'
import cheetos from "/cheetos.png";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { UserContext } from "../context/UserContext";

const Product = () => {
  
  const {products} = useContext(UserContext);
  useEffect(()=>{
    console.log(products);
    
  },[])
  return (
    <div>
      <Navbar />
      <div className="md:mx-10 md:my-5 my-2 mx-2">
        <div className="grid md:grid-cols-5 gap-4 md:h-5/6 lg:h-3/4 sm:grid-cols-3 grid-cols-2">
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

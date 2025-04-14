import React from "react";
import { createContext, useState, useRef, useEffect } from "react";
import {jwtDecode} from 'jwt-decode'
import fetchWithAuth from "../utils/fetchWithAuth";
import toast from 'react-hot-toast'
import { redirect, useNavigate } from "react-router-dom";


export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);
  
  const prevProducts = useRef([]);
  const handleProduct = async () => {
    try {
      const response = await fetchWithAuth(
        "https://curved-jeniffer-anandsharma-521f7f2a.koyeb.app/api/product/getproduct"
      );
      
      if(response.status===401){
        window.location.href=('/login')
      }
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
  
  const handleLogOut = async () => {
    try {

      const response = await fetchWithAuth(
        "https://curved-jeniffer-anandsharma-521f7f2a.koyeb.app/api/user/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("user logout successfully");
      }
      localStorage.removeItem("authenticated");
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      console.log("Error occured while logging out the user ", error);
    }
  };

  const userRender = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded) {
          console.log(decoded);
          
          setUser(decoded); // Store decoded user data in the state
        }
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        products,
        setProducts,
        handleProduct,
        userRender,
        handleLogOut
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

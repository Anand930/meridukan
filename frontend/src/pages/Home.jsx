import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProductSlide from '../components/ProductSlide'
import Footer from '../components/Footer'
import { UserContext } from '../context/UserContext'
import { useEffect } from 'react'
import fetchWithAuth from '../utils/fetchWithAuth'

const Home = () => {
  const {userRender} = useContext(UserContext)
  const handleProduct = async (e) => {
    // Prevent default link behavior
    try {
      const response = await fetchWithAuth(
        "https://meridukan-1.onrender.com/api/product/getproduct"
      );
      const data = await response.json();
      console.log(data);
      // setProductSample(data.products)
    } catch (error) {
      console.log("Error occurred while getting all the products", error);
    };
    }
    useEffect(()=>{
        userRender()
        handleProduct()
      },[])
  return (
    <div>
      <Navbar/>
      <Hero/>
      <ProductSlide categoryName={"Snacks"}/>
      <ProductSlide categoryName={"Dairy"}/>
      <ProductSlide categoryName={"Cold Drinks"}/>
      <ProductSlide categoryName={"Biscuit"}/>
      <Footer/>
    </div>
  )
}

export default Home

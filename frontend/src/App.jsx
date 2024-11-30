import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import AddCustomers from './pages/AddCustomers'
import AddProduct from './pages/AddProduct'


function App() {
  return (
    <div>
      
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/product"} element={<Product />} />
          <Route path={"/categories"} element={<Categories />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/addcustomers"} element={<AddCustomers />} />
          <Route path={'/addproduct'} element={<AddProduct/>}/>
        </Routes>
      
    </div>
  )
}

export default App

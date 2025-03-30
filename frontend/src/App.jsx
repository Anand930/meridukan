import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import AddCustomers from './pages/AddCustomers'
import AddProduct from './pages/AddProduct'
import Product from './pages/Product'
import Login from './pages/Login'
import SignIn from './pages/SignIn'
import ListCustomer from './pages/ListCustomer'



function App() {
  return (
    <div>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/product/:id"} element={<ProductDetails />} />
          <Route path={"/categories"} element={<Categories />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/addcustomers"} element={<AddCustomers />} />
          <Route path={'/addproduct'} element={<AddProduct/>}/>
          <Route path={'/product'} element={<Product/>}/>
          <Route path={'/profile'} element={<Profile  />}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/SignIn'} element={<SignIn/>}/>
          <Route path={'/listcustomers'} element={<ListCustomer/>}/>
        </Routes>
      
    </div>
  )
}

export default App

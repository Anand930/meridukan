import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import AddCustomers from "./pages/AddCustomers";
import AddProduct from "./pages/AddProduct";
import Product from "./pages/Product";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import ListCustomer from "./pages/ListCustomer";
import PayAmount from "./pages/PayAmount";
import UpdateProduct from "./pages/UpdateProduct";
import UpdateDataCard from "./components/UpdateDataCard";
import UpdateSellingPrice from "./pages/UpdateSellingPrice";
import UpdateCostPrice from "./pages/UpdateCostPrice";
import UpdateProductQuantity from "./pages/UpdateProductQuantity";
import UpdateDescription from "./pages/UpdateDescription";
import Spinner from "./utils/Spinner";

function App() {
  return (
    <div>
      <Suspense fallback={<Spinner/>}>
        <Router>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/product/:id"} element={<ProductDetails />} />
            <Route path={"/categories"} element={<Categories />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/addcustomers"} element={<AddCustomers />} />
            <Route path={"/addproduct"} element={<AddProduct />} />
            <Route path={"/product"} element={<Product />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signIn"} element={<SignIn />} />
            <Route path={"/listcustomers"} element={<ListCustomer />} />
            <Route path={"/payamount"} element={<PayAmount />} />
            <Route path={"/updateproduct"} element={<UpdateProduct />} />
            <Route
              path={"/updateproductdetails"}
              element={<UpdateDataCard />}
            />
            <Route
              path={"/updateproduct/updatesellingprice"}
              element={<UpdateSellingPrice />}
            />
            <Route
              path={"/updateproduct/updatecostprice"}
              element={<UpdateCostPrice />}
            />
            <Route
              path={"/updateproduct/updatequantity"}
              element={<UpdateProductQuantity />}
            />
            <Route
              path={"/updateproduct/updatedescription"}
              element={<UpdateDescription />}
            />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

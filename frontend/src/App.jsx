import React, { useEffect, Suspense,lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Categories = lazy(() => import("./pages/Categories"));
const Profile = lazy(() => import("./pages/Profile"));
const AddCustomers = lazy(() => import("./pages/AddCustomers"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const SignIn = lazy(() => import("./pages/SignIn"));
const ListCustomer = lazy(() => import("./pages/ListCustomer"));
const PayAmount = lazy(() => import("./pages/PayAmount"));
const UpdateProduct = lazy(() => import("./pages/UpdateProduct"));
const UpdateDataCard = lazy(() => import("./components/UpdateDataCard"));
const UpdateSellingPrice = lazy(() => import("./pages/UpdateSellingPrice"));
const UpdateCostPrice = lazy(() => import("./pages/UpdateCostPrice"));
const UpdateProductQuantity = lazy(() => import("./pages/UpdateProductQuantity"));
const UpdateDescription = lazy(() => import("./pages/UpdateDescription"));

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

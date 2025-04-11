import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CustomerContext } from "../context/CustomerContext";
import toast, { Toaster } from "react-hot-toast";
import ProductDetailsCard from "../components/ProductDetailsCard";
import fetchWithAuth from "../utils/fetchWithAuth";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { products, setProducts, handleProduct } = useContext(UserContext);
  
  const [customerNameList, setCustomerNameList] = useState([]);
  const [quantityToSale, setQuantityToSale] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const {
    customers,
    setCustomers,
    allCustomerNameList,
    SetAllCustomerNameList,
    handleListCustomer,
  } = useContext(CustomerContext);

  const { id } = useParams();

  const handleSaleProduct = async () => {
    try {
      const formData = {
        name: product.name,
        quantity: quantityToSale,
        customer: selectedCustomer,
      };

      const response = await fetchWithAuth(
        "https://meridukan-f7iy.onrender.com/api/product/sellproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        }
      );
      const data = await response.json();

      if (data) {
        // Find and update the product in the state
        setProducts((prevProducts) =>
          prevProducts.map((item) =>
            item.id == id
              ? {
                  ...item,
                  availableQuantity: item.availableQuantity - quantityToSale,
                }
              : item
          )
        );
      }
      toast.success("product sold successfully");
    } catch (error) {
      console.log("Error occured while trying to sell the product ", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {

    const customerNames = customers.map((item) => item.name);
    setCustomerNameList(customerNames);
    SetAllCustomerNameList(customerNames);
  }, [customers]); // Runs only when customers change

  useEffect(() => {
    const ProductToGet = products.find((item) => item.id == id);
    

    if (ProductToGet) {
      setProduct(ProductToGet);
      handleListCustomer();
    }
    if (products.length == 0) {
      handleProduct();
    }
  }, [products, product, id]);

  return (
    <div>
      <Navbar />
      <Toaster />

      <ProductDetailsCard
        product={product}
        customerNameList={customerNameList}
        handleSaleProduct={handleSaleProduct}
        quantityToSale={quantityToSale}
        setQuantityToSale={setQuantityToSale}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />
    </div>
  );
};

export default ProductDetails;

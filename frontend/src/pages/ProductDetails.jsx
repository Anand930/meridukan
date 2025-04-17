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

      if (formData.quantity === 0) {
        toast.error("Quantity should not be 0");
        return;
      } else if (!formData.customer) {
        toast.error("Please select a customer");
        return;
      }

      const response = await fetchWithAuth("/api/product/sellproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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
      if(response.status===400){
        toast.error("Not enough stock available")
      }
      if (response.ok) {
        toast.success("product sold successfully");
      }
    } catch (error) {
      console.log("Error occured while trying to sell the product ", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (customers.length > 0) {
      // Only set customer names if customers data is available
      const customerNames = customers.map((item) => item.name);
      setCustomerNameList(customerNames);
      SetAllCustomerNameList(customerNames);
    } else {
      // Handle case when customers data is not available yet
      console.log("No customers available.");
    }
  }, [customers]); // Runs when customers data changes

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

  useEffect(() => {
    handleListCustomer();
  }, []);

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

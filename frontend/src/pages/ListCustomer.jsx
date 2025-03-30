import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { CustomerContext } from "../context/CustomerContext";
import { UserContext } from "../context/UserContext";

const ListCustomer = () => {
  const { customers, setCustomers } = useContext(CustomerContext);
  const { allCustomerNameList } = useContext(CustomerContext);
  const { products } = useContext(UserContext);
  var val = [];
  var netval = 0;

  const handleListCustomer = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/customer/getcustomer"
      );
      const data = await response.json();
      setCustomers(data.customers);
      allCustomerNameList.map((item) => {
        const foundedCustomer = customers.find((c) => c.name === item);
        if (foundedCustomer) {
          foundedCustomer.saleHistory.map((ele) => {
            const product = products.find((item) => item._id == ele.product);
            if (product) {
              val.push(product.sellingPrice * ele.quantity);
            }
          });
        }
      });
    } catch (error) {
      console.log("Error occured while tring to fetch the customer ", error);
    }
  };

  useEffect(() => {
    handleListCustomer();
  }, []);


  console.log(customers);
  console.log("value ", val);

  return (
    <div>
      <Navbar />
      <div>
        <p className="font-bold text-3xl text-pink-600 flex items-center justify-center my-8 underline">
          Customer name and their overdues
        </p>
        {customers.map((customer, i) => (
          <div className="my-8 md:w-1/2 mx-4 md:mx-auto" key={i}>
            <div className="flex items-center justify-center">
              <input
                type="text"
                value={customer.name}
                className="outline-none border-2 border-pink-500 flex items-center justify-center h-10 w-3/4 text-center"
              />
              <div className="border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCustomer;

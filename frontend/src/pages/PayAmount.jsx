import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { CustomerContext } from "../context/CustomerContext";
import toast, { Toaster } from "react-hot-toast";
import fetchWithAuth from "../utils/fetchWithAuth";

const PayAmount = () => {
  const [paidAmount, setPaidAmount] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const {
    customers,
    allCustomerNameList,
    handleListCustomer,
    SetAllCustomerNameList,
  } = useContext(CustomerContext);
  useEffect(() => {
    handleListCustomer();
  }, []);
  useEffect(() => {
    const customerNames = customers.map((item) => item.name);
    SetAllCustomerNameList(customerNames);
  }, [customers]);

  const handlePaidAmount = async() => {
    const formData = {paidAmount, name:selectedCustomer }
    const response = await fetchWithAuth("https://curved-jeniffer-anandsharma-521f7f2a.koyeb.app/api/customer/setdueamount", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    const data = await response.json();
    console.log(data);
    toast.success(data.message)

  };
  return (
    <div>
      <Navbar />
      <Toaster
        position="below-right"
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            color: "white",
            backgroundColor: "grey",
          },
        }}
      />
      <div className="flex flex-row mt-5 items-center justify-center">
        <select
          className="border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center text-center outline-none"
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option className="outline-none  border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center">
            Select a Customer
          </option>
          {allCustomerNameList.map((item, index) => (
            <option
              key={index}
              value={item}
              className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
            >
              {item}
            </option>
          ))}
        </select>
        <input
          className="border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center text-center outline-none"
          type="text"
          value={paidAmount}
          onChange={(e) => setPaidAmount(e.target.value)}
        />
        <button
          className="border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center text-center outline-none m-0 p-0 hover:bg-pink-300"
          onClick={handlePaidAmount}
        >
          Click to pay
        </button>
      </div>
    </div>
  );
};

export default PayAmount;

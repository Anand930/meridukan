import React, { useContext, useEffect, useState } from "react";
import Select from "react-select"; // <-- Import react-select
import Navbar from "../components/Navbar";
import { CustomerContext } from "../context/CustomerContext";
import toast, { Toaster } from "react-hot-toast";
import fetchWithAuth from "../utils/fetchWithAuth";

const PayAmount = () => {
  const [paidAmount, setPaidAmount] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Will store full object
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

  const handlePaidAmount = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }

    const formData = {
      paidAmount,
      name: selectedCustomer.value, // Get name from selected option
    };

    const response = await fetchWithAuth("https://curved-jeniffer-anandsharma-521f7f2a.koyeb.app/apicustomer/setdueamount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);
    toast.success(data.message);
  };

  const customerOptions = allCustomerNameList.map((name) => ({
    value: name,
    label: name,
  }));

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Toaster position="bottom-right" />

      <div className="flex flex-col md:flex-row mt-5 items-center justify-center mx-4 gap-2">
        <div className="w-full md:w-1/4">
          <Select
            options={customerOptions}
            value={selectedCustomer}
            onChange={setSelectedCustomer}
            placeholder="Select a Customer"
            className="text-sm border-2 outline-none"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "#ec4899", // Tailwind pink-500
                height: 40,
                minHeight: 40,
                borderWidth: 2,
                outline: "none",
                "&:hover": {
                  borderColor: "#ec4899", // consistent hover border
                },
              }),
            }}
          />
        </div>

        <input
          className="border-2 border-pink-500 md:w-1/4 w-full bg-gray-50 h-10 px-2 text-sm text-center outline-none"
          type="text"
          value={paidAmount}
          onChange={(e) => setPaidAmount(e.target.value)}
          placeholder="Enter paid amount"
        />

        <button
          className="border-2 border-pink-500 md:w-1/4 w-full h-10 text-center hover:bg-pink-300"
          onClick={handlePaidAmount}
        >
          Click to pay
        </button>
      </div>
    </div>
  );
};

export default PayAmount;

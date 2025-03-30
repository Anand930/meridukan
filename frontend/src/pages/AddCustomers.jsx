import React, { useState } from "react";
import Navbar from "../components/Navbar";

const AddCustomers = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("TajNagar");
  // const [AddCustomer, setAddCustomer] = useState(true);
  // const [customerList, setCustomerList] = useState(false)
  const handleAddCustomer = async() =>{
    try {
      const formData = {fullName, phone, address}
      const response = await fetch('http://localhost:3000/api/customer/addcustomer',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      const data = await response.json();
      console.log("added customer ", data)
    } catch (error) {
      console.log("Error while adding the customer ", error);
      
    }
  }

  return (
    <div>
      <Navbar />
      

      <div>
        <p className="font-bold text-3xl text-pink-600 flex items-center justify-center my-8 underline">
          Customer Register Form
        </p>
        <div className="my-8 md:w-1/2 mx-4 md:mx-auto">
          <div className="flex items-center justify-center">
            <div className="border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center">
              FullName
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="outline-none border-2 border-pink-500 flex items-center justify-center h-10 w-3/4 text-center"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center">
              Phone NO.
            </div>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="outline-none border-2 border-pink-500 flex items-center justify-center h-10 w-3/4 text-center"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center">
              Address
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="outline-none border-2 border-pink-500 flex items-center justify-center h-10 w-3/4 text-center"
            />
          </div>

          <div className="flex items-center justify-end mx-2 my-5 gap-5">
            <button
              className="border-2 border-pink-500 px-1 py-1 rounded-lg md:hover:scale-105 duration-150 hover:bg-pink-500 text-pink-500 hover:text-white"
              onClick={handleAddCustomer}
            >
              Add Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomers;

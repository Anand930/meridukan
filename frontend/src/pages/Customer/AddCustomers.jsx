import React, { useState } from "react";
import toast,{Toaster} from 'react-hot-toast'
import Navbar from "../../components/Navbar";
import fetchWithAuth from "../../utils/fetchWithAuth";

const AddCustomers = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "TajNagar"
  });


  // form change handler
  const handleFormChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // const [AddCustomer, setAddCustomer] = useState(true);
  // const [customerList, setCustomerList] = useState(false)
    


  const handleAddCustomer = async() =>{
    try {
      const response = await fetchWithAuth('https://curved-jeniffer-anandsharma-521f7f2a.koyeb.app/api/customer/addcustomer',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      const data = await response.json();
      toast.success(data.message)
      
      
      setFormData({fullName:"", phone:""})
    } catch (error) {
      toast.error(error.message)
      console.log("Error while adding the customer ", error);
      
    }
  }

  return (
    <div className="bg-gray-50">
      <Navbar />
      
      <Toaster
      position="below-right"
      gutter={8}
      toastOptions={{
        style: {
          color:"white",
          backgroundColor:"grey"
        }
      }}
      />
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
              name="fullName"
              value={formData.fullName}
              onChange={handleFormChange}
              className="outline-none border-2 border-pink-500 flex items-center justify-center h-10 w-3/4 text-center"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center">
              Phone NO.
            </div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              className="outline-none border-2 border-pink-500 flex items-center justify-center h-10 w-3/4 text-center"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center">
              Address
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
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

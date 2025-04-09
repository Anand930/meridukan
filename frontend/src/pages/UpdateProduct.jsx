import React from "react";
import Navbar from "../components/Navbar";
import UpdateCard from "../components/UpdateCard";

const UpdateProduct = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-20">
        <div className="flex justify-start items-center mt-6 text-2xl font-bold text-pink-600 cursor-pointer">
          Products
        </div>
        <div className=" grid grid-cols-8">
          <UpdateCard name={"Update Selling Price"} to={'updatesellingprice'} />
          <UpdateCard name={"Update Cost Price"} to={'updatecostprice'}/>
          <UpdateCard name={"Update Product Quantity"} to={'updatequantity'} />
          <UpdateCard name={"Update Product discription"} to={'updatedescription'} />
          <UpdateCard name={"Custom Update"} to={'customupdate'}/>
        </div>
        <div className="flex justify-start items-center mt-6 text-2xl font-bold text-pink-600 cursor-pointer">
          Customers
        </div>
        <div className=" grid grid-cols-8">
          <UpdateCard name={"Update Customer's Mobile No."} />
          <UpdateCard name={"Update Customer's Address"} />
          <UpdateCard name={"Update Customer's Name"} />
        </div>
        
      </div>
    </div>
  );
};

export default UpdateProduct;

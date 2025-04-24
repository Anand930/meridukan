import React from "react";
import Navbar from "../components/Navbar";
import UpdateCard from "../components/UpdateCard";
import CustomUpdateCard from "../components/CustomUpdateCard";

const UpdateProduct = () => {
  return (
    <div className="bg-gray-50 min-h-full">
      <Navbar />
      <div className="lg:mx-20 mx-2">
        <div className="flex justify-start items-center mt-6 text-2xl font-bold text-pink-600 cursor-pointer">
          Products
        </div>
        <div className=" grid lg:grid-cols-7 grid-col-1 ">
          <UpdateCard name={"Update Selling Price"} to={"updatesellingprice"} />
          <UpdateCard name={"Update Cost Price"} to={"updatecostprice"} />
          <UpdateCard name={"Update Product Quantity"} to={"updatequantity"} />
          <UpdateCard
            name={"Update Product discription"}
            to={"updatedescription"}
          />
          <UpdateCard name={"Custom Update"} to={"customupdateproduct"} />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

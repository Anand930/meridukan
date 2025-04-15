import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CustomerContext } from "../context/CustomerContext";
import { UserContext } from "../context/UserContext";

const ListCustomer = () => {
  const { customers, handleListCustomer} = useContext(CustomerContext);
  const {products} = useContext(UserContext)

  useEffect(() => {
    handleListCustomer();
  }, [products]);

  console.log(customers);

  return (
    <div>
      <Navbar />
      <div>
        <p className="font-bold text-3xl text-pink-600 flex items-center justify-center my-8 underline">
          Customer name and their overdues <Link to={'/payamount'}><span >(payBills)</span></Link>
        </p>
        {customers.map((customer, i) => {
          if(customer.dueAmount>0){
            return<div className="my-2 md:w-1/2 mx-4 md:mx-auto" key={i}>
            <div className="flex items-center justify-center">
              <input
                type="text"
                value={customer.name}
                readOnly={true}
                className="outline-none border-2 border-pink-500 flex items-center justify-center h-10 w-3/4 text-center"
              />
              <input className="border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center text-center outline-none"
              readOnly
              value={customer.dueAmount}/>
              
            </div>
          </div>
          }
})}
      </div>
    </div>
  );
};

export default ListCustomer;

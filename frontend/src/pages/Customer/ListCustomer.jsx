import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { CustomerContext } from "../../context/CustomerContext";
import { UserContext } from "../../context/UserContext";

const ListCustomer = () => {
  const { customers, handleListCustomer } = useContext(CustomerContext);
  const { products } = useContext(UserContext);

  useEffect(() => {
    handleListCustomer();
  }, [products]);

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div>
        <p className="font-bold md:text-3xl text-xl text-pink-600 text-center md:flex items-center justify-center my-8 underline">
          Customer name and their overdues{" "}
          <Link to="/payamount">
            <span className="text-green-400">(payBills)</span>
          </Link>
        </p>

        {customers.length === 0 && (
          <p className="text-center text-gray-500">No customers found.</p>
        )}

        {customers.map((customer, i) => {
          if (customer.dueAmount <= 0) return null

          return (
            <Link
              key={i}
              to={`/customer/salehistory/${customer.name}`}
              className="block group my-2 md:w-1/2 mx-4 md:mx-auto hover:cursor-pointer hover:bg-pink-800 hover:text-white rounded transition-all duration-200"
            >
              <div className="flex items-center justify-center">
                <p
                  type="text"
                  readOnly
                  className="outline-none border-2 border-pink-500 h-10 w-3/4 hover:cursor-pointer flex items-center justify-center text-center group-hover:bg-pink-800 group-hover:text-white"
                >
                  {customer.name}
                </p>
                <span
                  className="border-2 border-pink-500 h-10 w-1/4 text-center outline-none flex items-center justify-center group-hover:bg-pink-800 group-hover:text-white"
                >
                  ₹{customer.dueAmount}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ListCustomer;

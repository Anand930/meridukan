import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { CustomerContext } from "../../context/CustomerContext";
import { UserContext } from "../../context/UserContext";

const SaleHistory = () => {
  const { name } = useParams();
  const { products } = useContext(UserContext);
  const { handleListCustomer, customers } = useContext(CustomerContext);
  const selectedCustomer = customers.find((c) => c.name === name);
  const [productSellingPrice, setProductSellingPrice] = useState([]);

  useEffect(() => {
    handleListCustomer();
  }, []);
  useEffect(() => {
    if (selectedCustomer && products?.length > 0) {
      const prices = selectedCustomer.saleHistory.map((item) =>
        products.find((p) => p.name === item.name)
      );
      setProductSellingPrice(prices);
    }
  }, [selectedCustomer, products]);

  console.log(productSellingPrice);

  return (
    <div>
      <Navbar />
      <table className="table-auto border-collapse w-full md:w-3/4 mx-auto my-4 text-center border border-pink-500">
        <thead className="bg-pink-400">
          <tr>
            <th className="border border-pink-500 p-2 text-white">Product ID</th>
            <th className="border border-pink-500 p-2 text-white">Quantity</th>
            <th className="border border-pink-500 p-2 text-white">Sale Date</th>
            <th className="border border-pink-500 p-2 text-white">Sale Time</th>
            <th className="border border-pink-500 p-2 text-white">Selling Price</th>
            <th className="border border-pink-500 p-2 text-white">Total Value</th>
          </tr>
        </thead>
        <tbody>
          {selectedCustomer?.saleHistory?.map((product, i) => (
            <tr key={i} className="hover:bg-pink-100">
              <td className="border border-pink-500 p-2">
                {product?.name}
              </td>
              <td className="border border-pink-500 p-2">
                {product?.quantity}
              </td>
              <td className="border border-pink-500 p-2">
                {new Date(product?.saleDate).toISOString().split("T")[0]}
              </td>
              <td className="border border-pink-500 p-2">
                {
                  new Date(product?.saleDate)
                    .toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .split(",")[1]
                }
              </td>
              <td className="border border-pink-500 p-2">
              ₹{productSellingPrice[i]?.sellingPrice || "#N/A"}
              </td>
              <td className="border border-pink-500 p-2">
              ₹ {productSellingPrice[i]?.sellingPrice*product?.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleHistory;

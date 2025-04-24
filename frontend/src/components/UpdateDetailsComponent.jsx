import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import fetchWithAuth from "../utils/fetchWithAuth";

const UpdateDetailsComponents = ({
  apiRoute,
  updatedField,
  UpdatingFieldNameInDB,
}) => {
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const { products, handleProduct } = useContext(UserContext);
  const [updatedValue, setUpdatedValue] = useState("");

  const handleUpdateDetails = async () => {
    const formData = { productName, updatedValue };

    try {
      const response = await fetchWithAuth(
        `https://curved-jeniffer-anandsharma-521f7f2a.koyeb.app/api/product/updateproduct/${apiRoute}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(`${updatedField} not updated`);
      console.log(`${updatedField} not updated`, error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const productToGet = products.find((item) => item.name === productName);
      setProduct(productToGet);
    }
  };

  const handleUpdateButtonClick = () => {
    const productToGet = products.find((item) => item.name === productName);
    setProduct(productToGet);
  };

  useEffect(() => {
    handleProduct();
  }, []);
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Toaster />
      <div className="mx-2 my-2 md:flex gap-5 justify-center ">
        <div className="w-full flex item-center justify-center my-0 md:w-3/5 lg:w-2/5  border-2 border-pink-500 rounded-xl lg:h-[725px] ">
          <img
            className="px-10 py-10 w-full h-screen object-contain"
            src={product?.productImage}
            alt=""
          />
        </div>
        <div className=" w-full md:w-2/5 lg:w-1/2">
          <div className="flex w-full items-center justify-center">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg">
              Product Name
            </p>
            <div className="w-1/2 flex">
              <input
                className="w-full min-h-14 border-2 outline-none bg-gray-50 border-pink-500 text-center flex items-center justify-center rounded-l-lg lg:rounded-lg"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleUpdateButtonClick}
                className=" lg:hidden px-1 min-h-14 bg-pink-500 text-white rounded-r-lg  hover:bg-pink-600"
              >
                click
              </button>
            </div>
          </div>
          {/* {UpdatingFieldNameInDB ==='descripition'&&<div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              product description
            </p>
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg">
              {product?.description}
            </p>
          </div>} */}
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center  flex items-center justify-center rounded-lg ">
              {updatedField}
            </p>
            <input
              className="w-1/2 min-h-14 border-2 outline-none border-pink-500 text-center bg-gray-50 flex items-center justify-center rounded-lg"
              value={product?.[UpdatingFieldNameInDB]}
              readOnly
            ></input>
          </div>
          {/* {UpdatingFieldNameInDB==="availableQuantity"&&<div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2  border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Available Quantity
            </p>
            <input
              className="w-1/2 min-h-14 border-2 outline-none border-pink-500 text-center flex items-center justify-center rounded-lg"
              value={product?.availableQuantity}
              readOnly
            ></input>
          </div>} */}
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2  border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Updated {updatedField}
            </p>
            <input
              className="w-1/2 min-h-14 border-2 outline-none border-pink-500 bg-gray-50 text-center flex items-center justify-center rounded-lg"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            ></input>
          </div>

          <button
            className="w-full border-2 border-pink-500 text-center flex items-center justify-center rounded-lg mt-8 h-40 text-4xl text-pink-600 hover:bg-pink-600 hover:text-white"
            onClick={handleUpdateDetails}
          >
            Click Here to Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetailsComponents;

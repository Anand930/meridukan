import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import toast,{Toaster} from 'react-hot-toast'
import Navbar from "./Navbar";
import fetchWithAuth from "../utils/fetchWithAuth";

const CustomUpdateCard = () => {
  
  const { products, handleProduct } = useContext(UserContext); // getting product and handle product from userContext

  const [requiredProductToUpdateName, setRequiredProductToUpdateName] =
    useState(""); // handleing the name field state
  const [requiredProductToUpdate, setRequiredProductToUpdate] = useState({}); // handling the product state whicch we have to update

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(products);

      const productToGet = products.find(
        (item) => item.name === requiredProductToUpdateName
      );
      if(!productToGet){
        toast.error("Product is not available") 
        return;
      }
      toast.success("product got")
      console.log("productToGet ", productToGet);

      setRequiredProductToUpdate(productToGet);
    }
  };

  // handle key down method used to set all the field when we press 'enter'

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };
  // A function used to conver the date into the format which we can display

  const customProductUpdateOnChangeHandler = (e) =>{
    const {name, value} = e.target;
    setRequiredProductToUpdate(prev=>({
      ...prev,[name]:value
    }))
  }

  // product update hanlder method 
  const handleProductUpdate = async()=>{
    try {
      console.log(requiredProductToUpdate);
      
      const response = await fetchWithAuth('https://curved-jeniffer-anandsharma-521f7f2a.koyeb.apphttps://curved-jeniffer-anandsharma-521f7f2a.koyeb.app/api/product/updateproduct/updatewholeproduct',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(requiredProductToUpdate)
      })
      if(response.status===400){
        toast.error('all fields are required')
      }else if(response.status===302){
        toast.error('Please edit any field to update')
      }
      const data = await response.json();
      console.log(data);
      

    } catch (error) {
      toast.error('Product not updated')
      console.log("something went wrong while updating ",error);
    }
  }
  
  useEffect(() => {
    handleProduct();
  }, []);
  // calling handleproduct method in the useeffect so that everytime the page re-renders, all product will get fetched

  return (
    <div>
        <Navbar/>
        <Toaster/>
      <div className="mx-2 my-2 md:flex gap-5 justify-center ">
        <div className="w-full flex item-center justify-center my-0 md:w-3/5 lg:w-2/5  border-2 border-pink-500 rounded-xl lg:h-[725px] ">
          <img
            className="px-10 py-10 w-full h-screen object-contain"
            src={requiredProductToUpdate?.productImage}
            name='productImage'
            alt=""
            onChange={customProductUpdateOnChangeHandler}
          />
        </div>
        <div className=" w-full md:w-2/5 lg:w-1/2">
          <div className="flex w-full items-center justify-center">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg">
              Product Name
            </p>
            <input
              className="w-1/2 min-h-14 border-2 border-pink-500 text-center outline-none flex items-center justify-center rounded-lg"
              value={requiredProductToUpdateName}
              onChange={(e) => {setRequiredProductToUpdateName(e.target.value);}}
              onKeyDown={handleKeyDown}
            ></input>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              product description
            </p>
            <input
              className="w-1/2 min-h-14 border-2 border-pink-500 text-center outline-none flex items-center justify-center rounded-lg"
              name="description"
              value={requiredProductToUpdate?.description}
              onChange={customProductUpdateOnChangeHandler}
            ></input>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Cost price
            </p>
            <input
              className="w-1/2 min-h-14 border-2 border-pink-500 text-center outline-none flex items-center justify-center rounded-lg"
              name="costPrice"
              value={requiredProductToUpdate?.costPrice}
              onChange={customProductUpdateOnChangeHandler}
            ></input>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Selling price
            </p>
            <input
              className="w-1/2 min-h-14 border-2 border-pink-500 text-center outline-none flex items-center justify-center rounded-lg"
              name="sellingPrice"
              value={requiredProductToUpdate?.sellingPrice}
              onChange={customProductUpdateOnChangeHandler}
            ></input>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Available Quantity
            </p>
            <input
              className="w-1/2 min-h-14 border-2 border-pink-500 text-center outline-none flex items-center justify-center rounded-lg"
              name="availableQuantity"
              value={requiredProductToUpdate?.availableQuantity}
              onChange={customProductUpdateOnChangeHandler}
            ></input>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Expiry Date
            </p>
            <input
              className="w-1/2 min-h-14 border-2 border-pink-500 text-center outline-none flex items-center justify-center rounded-lg"
              type="Date"
              name="expiryDate"
              value={
                requiredProductToUpdate?.expiryDate
                  ? formatDate(requiredProductToUpdate.expiryDate)
                  : ""
              }
              onChange={customProductUpdateOnChangeHandler}
            ></input>
          </div>

          <button
            // onClick={handleSaleProduct}
            className="w-full border-2 border-pink-500 text-center flex items-center justify-center rounded-lg mt-8 h-40 text-4xl text-pink-600 hover:bg-pink-600 hover:text-white"
            onClick={handleProductUpdate}
          >
            Click Here to Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomUpdateCard;

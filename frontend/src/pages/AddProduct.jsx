import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import toast, {Toaster} from "react-hot-toast";
// import { data } from "react-router-dom";
import fetchWithAuth from "../utils/fetchWithAuth.js";

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    costPrice: 0,
    sellingPrice: 0,
    purchaseDate:null,
    expiryDate:null,
    supplierName: "",
  });


  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
  
    let newValue = value;
    if (["costPrice", "sellingPrice", "productQuantity"].includes(name)) {
      newValue = parseFloat(value) || 0;
    } else if (name === "purchaseDate" || name === "expiryDate") {
      newValue = value ? value : ""; // Keep it in 'YYYY-MM-DD' format
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  


  const [productImage, setProductImage] = useState(null);
  const categories = [
    "Dairy",
    "Snacks",
    "Children's Snacks",
    "Toffes and Candys",
    "Biscuit",
    "Stationary",
    "Cereals",
    "Cold Drinks",
    "Others",
  ];

  

  const handleAddProduct = async () => {
    if (!productImage) {
      alert("Please select a product image.");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.productName);
    formDataToSend.append("id", formData.productId);
    formDataToSend.append("categories", selectedCategory);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("costPrice", formData.costPrice);
    formDataToSend.append("sellingPrice", formData.sellingPrice);
    formDataToSend.append("purchaseDate", formData.purchaseDate);
    formDataToSend.append("expiryDate", formData.expiryDate);
    formDataToSend.append("supplierName", formData.supplierName);
    formDataToSend.append("productQuantity", formData.productQuantity);
    formDataToSend.append("productImage", productImage)

    try {
      const response = await fetch(
        "https://meridukan-f7iy.onrender.com/api/product/addproduct",
        {
          method: "POST",
          body: formDataToSend // No need to stringify FormData
        }
      );

      const productData = await response.json();
      
      setFormData({productName: "",
        description: "",
        costPrice: 0,
        sellingPrice: 0,
        purchaseDate:null,
        expiryDate:null,
        supplierName: ""})
        console.log(productData);
        
      toast.success(productData.message)
    } catch (error) {
      toast.error(error.message)
      console.error("Error while adding product:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <Toaster
        position="below-right"
        gutter={8}
        toastOptions={{
          duration:5000,
          style: {
            color: "white",
            backgroundColor: "grey",
          },
        }}
      />
      <div className="flex itmes-center justify-center font-bold text-3xl mt-5 text-pink-500">
        <p className="underline">Product Addition Form</p>
      </div>
      <div className="md:mx-60 mx-4 my-10">
        <div className="flex items-center justify-center ">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center">
            Product Name
          </div>
          <input
            type="text"
            value={formData.productName}
            name="productName"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex items-center justify-center ">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center">
            Product ID
          </div>
          <input
            type="text"
            value={formData.productId}
            name="productId"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center">
            Product Category
          </div>
          <select
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option
              value=""
              disabled
              className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
            >
              Select a Category
            </option>
            {categories.map((category, index) => (
              <option
                key={index}
                value={category}
                className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center">
            Product Description
          </div>
          <input
            type="text"
            value={formData.description}
            name="description"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center">
            Product Quantity
          </div>
          <input
            type="text"
            value={formData.productQuantity}
            name="productQuantity"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center">
            Product Cost Price
          </div>
          <input
            type="text"
            value={formData.costPrice}
            name="costPrice"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center">
            Product Selling Price
          </div>
          <input
            type="text"
            value={formData.sellingPrice}
            name="sellingPrice"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center">
            Product Purchase Date
          </div>
          <input
            type="date"
            value={formData.purchaseDate}
            name="purchaseDate"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center">
            Product Expiry Date
          </div>
          <input
            type="date"
            value={formData.expiryDate}
            name="expiryDate"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center">
            Product Supplier Name
          </div>
          <input
            type="text"
            value={formData.supplierName}
            name="supplierName"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center">
            Product Image
          </div>
          <input
            type="file"
            name="productImage"
            onChange={(e) => setProductImage(e.target.files[0])}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
          />
        </div>

        <div className="flex items-center justify-end mx-2 my-5 gap-5 ">
          <button
            className="border-2 border-pink-500 px-1 py-1 rounded-lg"
            onClick={() => handleAddProduct()}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import toast, { Toaster } from "react-hot-toast";
// import { data } from "react-router-dom";
import fetchWithAuth from "../../utils/fetchWithAuth.js";
import Spinner from "../../utils/Spinner.jsx";

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const {loading, setLoading} = useContext(UserContext)
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    purchaseDate: "",
    expiryDate: "",
    supplierName: "",
    productQuantity: "",
  });

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;

    var newValue = value;
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
    formDataToSend.append("productImage", productImage);

    try {
      const response = await fetchWithAuth("https://curved-jeniffer-anandsharma-521f7f2a.koyeb.app/api/product/addproduct", {
        method: "POST",
        body: formDataToSend, // No need to stringify FormData
      });
      
      setLoading(true)

      const productData = await response.json();
      if(productData){
        setLoading(false)
      }
      setFormData({
        productName: "",
        description: "",
        costPrice: "",
        sellingPrice: "",
        purchaseDate: "",
        expiryDate: "",
        supplierName: "",
      });
      setProductImage(null)
      console.log(productData);
      if (response.status === 400) {
        return toast.error("All fields are required");
      }
      if (productData.error) {
        return toast.error(productData.message);
      }
      toast.success(productData.message)
    } catch (error) {
      toast.error(error.message);
      console.error("Error while adding product:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="bg-gray-50 min-h-full">
      {loading&& <Spinner/>}
      <Navbar />
      <Toaster />
      <div className="flex itmes-center justify-center font-bold text-3xl mt-5 text-pink-500">
        <p className="underline">Product Addition Form</p>
      </div>
      <div className="md:mx-60 mx-4 my-10">
        <div className="flex items-center justify-center ">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/2 md:h-10 h-12 flex items-center justify-center">
            Product Name
          </div>
          <input
            type="text"
            value={formData.productName}
            name="productName"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex items-center justify-center ">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/2 md:h-10 h-12 flex items-center justify-center">
            Product ID
          </div>
          <input
            type="text"
            value={formData.productId}
            name="productId"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/2 md:h-10 h-12 flex items-center justify-center">
            Product Category
          </div>
          <select
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option
              value=""
              disabled
              className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
            >
              Select a Category
            </option>
            {categories.map((category, index) => (
              <option
                key={index}
                value={category}
                className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/2 md:h-10 h-12 flex items-center justify-center">
            Product Description
          </div>
          <input
            type="text"
            value={formData.description}
            name="description"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/2 md:h-10 h-12 flex items-center justify-center">
            Product Quantity
          </div>
          <input
            type="number"
            value={formData.productQuantity}
            name="productQuantity"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/2 md:h-10 h-12 flex items-center justify-center">
            Product Cost Price
          </div>
          <input
            type="number"
            step={"0.01"}
            value={formData.costPrice}
            name="costPrice"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/2 md:h-10 h-12 flex items-center justify-center">
            Product Selling Price
          </div>
          <input
            type="number"
            step={"0.01"}
            value={formData.sellingPrice}
            name="sellingPrice"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/2 md:h-10 h-12 flex items-center justify-center">
            Product Purchase Date
          </div>
          <input
            type="date"
            value={formData.purchaseDate}
            name="purchaseDate"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/2 md:h-10 h-12 flex items-center justify-center">
            Product Expiry Date
          </div>
          <input
            type="date"
            value={formData.expiryDate}
            name="expiryDate"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/2 md:h-10 h-12 flex items-center justify-center">
            Product Supplier Name
          </div>
          <input
            type="text"
            value={formData.supplierName}
            name="supplierName"
            onChange={handleProductFormChange}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
          />
        </div>
        <div className="flex  items-center justify-center text-center">
          <div className="border-2 border-pink-500 md:w-1/4 w-1/2 md:h-10 h-12 flex items-center justify-center">
            Product Image
          </div>
          <input
            type="file"
            name="productImage"
            onChange={(e) => setProductImage(e.target.files[0])}
            className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-12 md:w-3/4 w-2/3 text-center"
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

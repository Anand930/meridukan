import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CustomerContext } from "../context/CustomerContext";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";


const ProductDetails = ({}) => {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("")
  const { products, setProducts, handleProduct } = useContext(UserContext);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customerNameList, setCustomerNameList] = useState([]);
  const [quantityToSale, setQuantityToSale] = useState(0);
  const { customers, SetAllCustomerNameList, handleListCustomer } =
    useContext(CustomerContext);

  const { id } = useParams();
  // const pathname = useLocation().pathname
  // console.log("pathname is ",pathname);
  

  const handleKeyPress = (e) =>{
    if(e.key==="Enter"){
        const productToGet = products.find((item)=>item.name === name);
        console.log("productToGet ", productToGet);
        if(!productToGet){
            console.log("Product is not available with given name");
            toast.error("product is not available with given name")
        }
        setProduct(productToGet)
        
    }
  }

  const handleSaleProduct = async () => {
    try {
      const formData = {
        name: product.name,
        quantity: quantityToSale,
        customer: selectedCustomer,
      };

      const response = await fetch(
        "https://meridukan-1.onrender.com/api/product/sellproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        // Find and update the product in the state
        setProducts((prevProducts) =>
          prevProducts.map((item) =>
            item.id == id
              ? {
                  ...item,
                  availableQuantity: item.availableQuantity - quantityToSale,
                }
              : item
          )
        );
      }
      toast.success("product sold successfully");
    } catch (error) {
      console.log("Error occured while trying to sell the product ", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    console.log("customers", customers);

    const customerNames = customers.map((item) => item.name);
    setCustomerNameList(customerNames);
    SetAllCustomerNameList(customerNames);
  }, [customers]); // Runs only when customers change

  useEffect(() => {
    const ProductToGet = products.find((item) => item.id == id);
    console.log(ProductToGet);

    if (ProductToGet) {
      setProduct(ProductToGet);
      handleListCustomer();
    }
    if (products.length == 0) {
      handleProduct();
    }
    console.log("product is ", product);
  }, [products, product, id]);

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="mx-2 my-2 md:flex gap-5 justify-center ">
        <div className="w-full flex item-center justify-center my-0 md:w-3/5 lg:w-2/5  border-2 border-pink-500 rounded-xl lg:h-[725px] ">
          <img
            className="px-10 py-10 w-full h-full object-contain"
            src={product?.productImage}
            alt=""
          />
        </div>
        <div className=" w-full md:w-2/5 lg:w-1/2">
          <div className="flex w-full items-center justify-center">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg">
              Product Name
            </p>
            <input className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg outline-none"
            value={name}
            onKeyDown={handleKeyPress}
            onChange={(e)=>setName(e.target.value)}></input>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              product description
            </p>
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg">
              {product?.description}
            </p>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Cost price
            </p>
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg">
              {product?.costPrice}
            </p>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Selling price
            </p>
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg">
              {product?.sellingPrice}
            </p>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Available Quantity
            </p>
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg">
              {product?.availableQuantity}
            </p>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Expiry Date
            </p>
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg">
              {" "}
              25-06-2027
            </p>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Quantity to sell
            </p>
            <input
              className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg outline-none"
              type="number"
              value={quantityToSale}
              onChange={(e) => {
                setQuantityToSale(e.target.value);
              }}
            />
          </div>
          <div className="flex mt-3">
            <p className="w-3/4 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Customer to sell
            </p>
            <select
              className="outline-none min-h-14  border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option className="outline-none  border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center">
                Select a Category
              </option>
              {customerNameList.map((item, index) => (
                <option
                  key={index}
                  value={item}
                  className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSaleProduct}
            className="w-full border-2 border-pink-500 text-center flex items-center justify-center rounded-lg mt-8 h-40 text-4xl text-pink-600 hover:bg-pink-600 hover:text-white"
          >
            Click Here to Sell it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

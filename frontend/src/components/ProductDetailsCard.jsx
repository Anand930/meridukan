import React,{useState} from "react";



const ProductDetailsCard = ({product,  customerNameList, handleSaleProduct, quantityToSale, setQuantityToSale, selectedCustomer, setSelectedCustomer}) => {
    const FormatedDate = product?.expiryDate.split('T')[0]
  return (  
    <div>
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
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg">
              {product?.name}
            </p>
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
            <input className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg"
            value={product?.costPrice}
            readOnly>
            </input>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Selling price
            </p>
            <input className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg"
            value={product?.sellingPrice}
            readOnly
            >
              
            </input>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Available Quantity
            </p>
            <input className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg"
            value={product?.availableQuantity}
            readOnly>
            </input>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Expiry Date
            </p>
            <input className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg"
            type="Date"
            value={FormatedDate}
            readOnly>
            </input>
          </div>
          <div className="flex mt-3">
            <p className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Quantity to sell
            </p>
            <input
              className="w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg outline-none"
              type="number"
              value={quantityToSale}
              onChange={(e)=>{setQuantityToSale(e.target.value)}}
            />
          </div>
          <div className="flex mt-3">
            <p className="w-3/4 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg ">
              Customer to sell
            </p>
            <select
              className="outline-none min-h-14  border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
              value={selectedCustomer}
              onChange={(e)=>setSelectedCustomer(e.target.value)}
            >
              <option
                className="outline-none  border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
              >
                Select a Category
              </option>
              {customerNameList.map((item, index) => (
                <option
                  key={index}
                  className="outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleSaleProduct} className="w-full border-2 border-pink-500 text-center flex items-center justify-center rounded-lg mt-8 h-40 text-4xl text-pink-600 hover:bg-pink-600 hover:text-white">
            Click Here to Sell it 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;

import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();

  const handleCardOnClick = (e) => {
    e.preventDefault();
    navigate(`/product/${item.id}`);
  };

  return (
    <div
      className="card bg-white w-80 shadow-md border border-pink-300 m-4 cursor-pointer hover:shadow-xl transition hover:bg-pink-300 "
      onClick={handleCardOnClick}
    >
      <figure className="w-full h-48 overflow-hidden flex items-center justify-center hover:bg-pink-300">
        <img
          src={item.productImage}
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </figure>
      <hr className="hidden hover:block " />
      <div className="card-body p-4 flex flex-row justify-between hover:text-white">
        <div >
          <h2 className="card-title text-lg font-semibold text-pink-500 ">{item.name}</h2>
          <p className="text-sm text-pink-500">{item.description}</p>
        </div>
        <div>
          <p className="text-xl font-bold text-pink-500">₹ {item.sellingPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

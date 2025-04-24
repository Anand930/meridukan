import React from "react";
import { Link } from "react-router-dom";

const UpdateCard = ({ name, to }) => {
  return (
    <Link to={to}>
      <button className="border-2 border-pink-500 mx-2 mb-4 mt-2 rounded-lg cursor-pointer hover:bg-pink-500 hover:text-white md:hover:scale-105 lg:w-36 lg:h-40 h-36 w-80 flex items-center justify-center">
        <p className="w-full h-screen flex items-center justify-center text-pink-500 hover:text-white font-bold text-2xl">
          {name}
        </p>
      </button>
    </Link>
  );
};

export default UpdateCard;

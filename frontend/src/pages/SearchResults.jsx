import React, { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const SearchResults = () => {
  const { filteredData, searchTerm } = useContext(SearchContext);

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="my-5 ">
        <p className="text-bold text-3xl px-10 text-pink-500">
          {filteredData.length} Search Result for "{searchTerm}"
        </p>
        <div className="md:mx-10 md:my-5 my-2 mx-2">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-col-5 gap-4 md:h-5/6 lg:h-3/4 sm:grid-cols-2 grid-cols-1 ">
            {filteredData.length >= 0 &&
              filteredData.map((p, i) => (
                <div key={i}>
                  <Link to={`/productDetails/${p.name}`}>
                    <Card item={p} />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

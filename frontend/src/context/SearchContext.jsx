import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
// import { useLocation } from "react-router-dom";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [focus, setFocus] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filteredData, setFilteredData] = useState([]); // filterdata array to handle filterdata state
  const [searchTerm, setSearchTerm] = useState(""); // input value handling state
  const [finalSearchValue, setFinalSearchValue] = useState("");
  // const location = useLocation();
  // const searchResultPage = location.pathname === "/product/searchresult";

  const { products } = useContext(UserContext);

  return (
    <SearchContext.Provider
      value={{
        focus,
        setFocus,
        selectedIndex,
        setSelectedIndex,
        filteredData,
        setSearchTerm,
        searchTerm,
        finalSearchValue,
        setFinalSearchValue,
        products,
        setFilteredData
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

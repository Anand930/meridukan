import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import searchIcon from "../assets/images/searchIcon.png";
import { SearchContext } from "../context/SearchContext";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, userRender } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filterDataToRender, setFilterDataToRender] = useState([]);

  const {
    focus,
    setFocus,
    selectedIndex,
    setSelectedIndex,
    filteredData,
    searchTerm,
    setSearchTerm,
    finalSearchValue,
    setFinalSearchValue,
    products,
    setFilteredData
  } = useContext(SearchContext);

  const location = useLocation();
  const searchResultPage = location.pathname === "/product/searchresult";

  const handleKeyDown = (e) => {
    // Prevent default behavior for arrow keys
    if (["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prev) =>
          prev < filteredData.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        if (selectedIndex >= 0 && filteredData[selectedIndex]) {
          navigate(`/product/${filteredData[selectedIndex].id}`);
          setFocus(false);
        } else if (selectedIndex < 0) {
          navigate("/product/searchresult");
          setFocus(false);
        } else if (searchResultPage) {
          
        }
        break;
      case "Escape":
        setFocus(false);
        break;
      default:
        break;
    }
  };

  const handleFilteredData = () => {
    if (!products) return;
    const filteredProduct = products.filter((item, i) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // if (searchResultPage) {
    //   const filteredProduct = products.filter((item, i) =>
    //     item.name.toLowerCase().includes(finalSearchValue.toLowerCase())
    //   );
    //   setFilteredData(filteredProduct);
    // }
    setFilteredData(filteredProduct);
  };

  const resetSelection = () => {
    setSelectedIndex(-1);
  }; // reset selection function used to set the selected item is the item at index -1, it means it will remove all the selection whenever a new letter get added to the search;

  useEffect(() => {
    if (searchResultPage) {
      
    }
    handleFilteredData();
    resetSelection();
  }, [searchTerm, searchResultPage]); // setting the filtered data from all the products on the basis of the search

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");
    if (isAuthenticated === "true") {
      setLoggedIn(true);
    }
    userRender();
  }, []);

  const navLinkStyle =
    "hover:bg-white hover:text-black text-pink-600 py-1 px-3 rounded-xl transition duration-200 ";

  const navLinks = (
    <>
      {loggedIn && (
        <>
          <div className="dropdown md:dropdown-hover  md:dropdown-bottom ">
            <label
              tabIndex={0}
              className={`btn  outline-none bg-transparent border-none shadow-none ${navLinkStyle} py-0`}
            >
              Customer
            </label>
            <ul
              tabIndex={0}
              className={`dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52 absolute ${navLinkStyle} `}
            >
              <li className="hover:bg-pink-300 rounded-lg hover:text-white">
                <Link to="/addcustomers">Add Customer</Link>
              </li>
              <li className="hover:bg-pink-300 rounded-lg hover:text-white">
                <Link to="/listcustomers">ListCustomer</Link>
              </li>
            </ul>
          </div>
          <div className="dropdown md:dropdown-hover  md:dropdown-bottom ">
            <label
              tabIndex={0}
              className={`btn  outline-none bg-transparent border-none shadow-none ${navLinkStyle} py-0`}
            >
              Product
            </label>
            <ul
              tabIndex={0}
              className={`dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-52 absolute ${navLinkStyle} `}
            >
              <li className="hover:bg-pink-300 rounded-lg hover:text-white">
                <Link to="/product">List Product</Link>
              </li>
              <li className="hover:bg-pink-300 rounded-lg hover:text-white">
                <Link to="/addproduct">Add Product</Link>
              </li>
              <li className="hover:bg-pink-300 rounded-lg hover:text-white">
                <Link to="/updateproduct">Update Product</Link>
              </li>
            </ul>
          </div>
          <div className="dropdown md:dropdown-hover  md:dropdown-bottom ">
            <li
              tabIndex={0}
              className={`btn  outline-none bg-transparent border-none shadow-none ${navLinkStyle} py-0`}
            >
              <Link to={"/payamount"}>PayAmount</Link>
            </li>
            <li
              tabIndex={0}
              className={`btn  outline-none bg-transparent border-none shadow-none ${navLinkStyle} py-0`}
            >
              <Link to={"/analytics"}>Analytics</Link>
            </li>
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="w-full bg-custom1 px-4 py-1 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Logo and Hamburger */}
        <div className="flex items-center gap-4">
          {/* Hamburger for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-circle"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <ul className="absolute mt-2 z-50 bg-white shadow-lg rounded-lg p-3 w-42 space-y-2 flex lg:block flex-col md:dropdown-bottom dropdown-right">
                {navLinks}
              </ul>
            )}
          </div>

          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold tracking-wide">
            MERI <span className="text-pink-600">DUKAN</span>
          </Link>
        </div>

        {/* Center - Desktop Nav Links */}
        <ul className="hidden lg:flex gap-6 items-center text-lg font-medium">
          {navLinks}
        </ul>
        <div className="flex gap-2">
          <input
            className={`border-2 border-pink-500 h-10 w-64 rounded-lg outline-none pl-2 hidden lg:block caret-pink-500`}
            placeholder="Search your products here..."
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 150)}
            value={searchTerm}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <img
            src={searchIcon}
            alt=""
            width={"25px"}
            height={"15px"}
            className="cursor-pointer"
          />
        </div>

        <div className="absolute right-52 top-14 z-50">
          <ul className="flex flex-col gap-1 bg-gray-100 p-2 rounded-xl">
            {focus &&
              filteredData.length > 0 &&
              filteredData.slice(0, 9).map((item, index) => (
                <div
                  className="w-72 border-1 border-pink-600 hover:border-pink-500 "
                  key={index}
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    if (!focus) setSearchTerm("");
                  }}
                >
                  <button
                    className={`text-pink-500 h-10 border-2 border-pink-500 w-full rounded-lg hover:text-white hover:bg-pink-300 ${
                      selectedIndex === index ? "bg-pink-500 text-white" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
          </ul>
        </div>

        {/* Right - Auth / Profile */}
        <div className="flex items-center gap-4">
          {loggedIn ? (
            <Link to="/profile">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-600">
                <img
                  src={user?.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <div className="text-pink-600 font-semibold space-x-2">
              <Link to="/login">
                <button className="hover:underline">Login</button>
              </Link>
              /
              <Link to="/signin">
                <button className="hover:underline">SignUp</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

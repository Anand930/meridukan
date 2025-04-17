import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, userRender } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              className={`dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-52 absolute ${navLinkStyle} `}
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
              <Link to={'/payamount'}>PayAmount</Link>
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

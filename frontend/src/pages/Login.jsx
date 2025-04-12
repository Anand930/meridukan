import React, { useContext, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import fetchWithAuth from "../utils/fetchWithAuth";
import toast, { Toaster } from "react-hot-toast";
// import Cookies from "js-cookie";

const Login = () => {
  const { setUser } = useContext(UserContext); // User State Context to get teh user data throughout the pages
  const navigate = useNavigate(); // navigate hook to navigate to the home page after login

  //form state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // form change function
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: String(value) }));
  };

  // login handler function
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      console.log("All fields are mandatory to fill");
      toast.error("All fields are required");
      return;
    }

    // creating formdata object
    const formData = {
      emailOrUsername: form.email, // emailOrUsername because we actually do not know whether the data provided by the user is either username or email
      password: form.password,
    };

    try {
      const response = await fetchWithAuth("https://curved-jeniffer-anandsharma-521f7f2a.koyeb.app//api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const userData = await response.json();

      setUser(userData.user);
      // Cookies.set("user", userData.user);
      if (userData.user) {
        localStorage.setItem("accessToken", userData?.user?.accessToken);
        localStorage.setItem("authenticated", "true");
        toast.success("user looged in successFully");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.message);
      alert("Error occured while signIN");
    }
  };
  return (
    <div className="items-center justify-center flex flex-col min-h-screen  ">
      <Toaster />
      <h1 className="text-pink-500 py-4 font-bold text-2xl">Login</h1>
      <form
        className="border-4 border-pink-500 p-4 rounded-lg"
        onSubmit={handleLogin}
      >
        <Link to={"/"}>
          <p className="text-right  text-pink-500  font-bold text-xl my-[-6px] hover:cursor-pointer ">
            X
          </p>
        </Link>

        <div className="my-2">
          <input
            className="text-pink-500 outline-none border-4 px-2 border-pink-500 h-12 w-80 rounded-lg"
            type="text"
            placeholder="Enter Your Email"
            name="email"
            onChange={handleFormChange}
          />
        </div>
        <div className="my-2">
          <input
            className="text-pink-500 outline-none border-4 px-2 border-pink-500 h-12 w-80 rounded-lg"
            type="password"
            placeholder="Enter Your Password"
            name="password"
            onChange={handleFormChange}
          />
        </div>
        <div className="my-2">
          <button className="text-pink-500 outline-none border-4 px-2 border-pink-500 h-12 w-80 rounded-lg hover:bg-pink-500 hover:text-white font-bold text-xl">
            Login
          </button>
        </div>
        <p className="text-black text-right">
          Create an account{" "}
          <Link to={"/signin"}>
            <span className="hover:cursor-pointer underline text-blue-700 ">
              Signup
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

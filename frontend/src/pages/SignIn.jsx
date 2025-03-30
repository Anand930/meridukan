import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  
  const handleSignIn = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!form.fullname || !form.username || !form.email || !form.password) {
      console.error("All fields are mandatory to fill.");
      alert("All fields are required.");
      return;
    }
    
    const formData = {
      fullname: form.fullname,
      username: form.username,
      email: form.email,
      password: form.password
    };

    
    // if(form.profileImage){
    //   formData.append('profileImage',form.profileImage)
    // }
    



    try {
      const response = await fetch("http://localhost:3000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });
      const userData = await response.json();
      console.log("userDAta ",userData);
      localStorage.setItem("accessToken", userData?.user?.accessToken);
      localStorage.setItem("authenticated", "true");
      navigate("/");
    } catch (error) {
      console.log("Error in Signin ", error);
      alert("Error occured while signIN");
    }
  };
  return (
    <div className="items-center justify-center flex flex-col min-h-screen  ">
      <h1 className="text-pink-500 py-4 font-bold text-2xl">SignIn</h1>
      <form
        className="border-4 border-pink-500 p-4 rounded-lg"
        onSubmit={handleSignIn}
      >
        <Link to={"/"}>
          <p className="text-right  text-pink-500  font-bold text-xl my-[-6px] hover:cursor-pointer ">
            X
          </p>
        </Link>
        <div className="my-2">
          <input
            className="text-pink-500 outline-none border-4 px-2  border-pink-500 h-12 w-80 rounded-lg"
            type="text"
            placeholder="Enter Your FullName"
            name="fullname"
            onChange={handleFormChange}
          />
        </div>
        <div className="my-2">
          <input
            className="text-pink-500 outline-none border-4 px-2 border-pink-500 h-12 w-80 rounded-lg"
            type="text"
            placeholder="Enter Your Username"
            name="username"
            onChange={handleFormChange}
          />
        </div>
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
            type="text"
            placeholder="Enter Your Password"
            name="password"
            onChange={handleFormChange}
          />
        </div>
        
        <div className="my-2">
          <button className="text-pink-500 outline-none border-4 px-2 border-pink-500 h-12 w-80 rounded-lg hover:bg-pink-500 hover:text-white font-bold text-xl">
            SignIn
          </button>
        </div>
        <p className="text-black text-right">
          Already have an account{" "}
          <Link to={"/login"}>
            <span className="hover:cursor-pointer underline text-blue-700">
              Login
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

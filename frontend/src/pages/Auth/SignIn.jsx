import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import fetchWithAuth from "../../utils/fetchWithAuth";
// import Cookies from 'js-cookie'

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);
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
      toast.error("All fields are required")
      return;
    }

    const formData = new FormData();
    formData.append("fullname", form.fullname);
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("profileImage", profileImage);

    try {
      const response = await fetchWithAuth("https://curved-jeniffer-anandsharma-521f7f2a.koyeb.app/apiuser/signin", {
        method: "POST",
        credentials: "include",
        body: formData
      });
      const userData = await response.json();

      if(response.status===400){
        toast.error("user with given email or username exist already")
      }
      
      if (userData.user) {
        setUser(userData.user)
        // Cookies.set("user", userData.user)
        localStorage.setItem("accessToken", userData?.user?.accessToken);
        localStorage.setItem("authenticated", "true");
        setTimeout(() => {
          toast.success("user loggedIn")
        }, 1000);
        navigate("/");
      }
    } catch (error) {
      toast.error("Error occured while signing in")
      console.log("Error in Signin ", error);
    }
  };
  return (
    <div className="items-center justify-center flex flex-col min-h-screen  ">
      <Toaster/>
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
            type="email"
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
          <input
            className="text-pink-500 outline-none border-4 px-2 border-pink-500 h-12 w-80 rounded-lg"
            type="file"
            placeholder="Upload the image"
            name="profileImage"
            onChange={(e) => {setProfileImage(e.target.files[0])}}
          >
          </input>

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

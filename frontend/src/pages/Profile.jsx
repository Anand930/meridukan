import React, { useContext, useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode'
import Navbar from "../components/Navbar";
import cheetos from "/cheetos.png";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
// import getUserFromToken from '../utils/decodeToken.js'

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [Editable, setEditable] = useState(false);
  
  useEffect(() => {
    // Retrieve user data from the token on page load
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);  // Store decoded user data in the state
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);
  
  const handleLogOut = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/logout",{
        method:'POST',
        "Content-Type":"application/json",
        credentials:"include"
      });
      const data = await response.json();
      console.log(data);
      localStorage.removeItem("authenticated");
      localStorage.removeItem('accessToken')
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="text-center">
        <div className="flex items-center justify-center mt-10">
          <img
            className=" border-2 border-pink-500 rounded-full"
            width={"100px"}
            height={"100px"}
            src={cheetos}
            alt=""
          />
        </div>
        <div className="my-8 w-1/2 mx-auto">
          <div className="flex items-center justify-center ">
            <div className="border-2 border-pink-500 w-1/4">FullName</div>
            <input
              type="text"
              readOnly
              value={user?.fullname}
              className="outline-none border-2 border-pink-500 w-3/4 text-center"
            />
          </div>
          
          <div className="flex items-center justify-center">
            <div className="border-2 border-pink-500 w-1/4">Email Id</div>
            <input
              type="text"
              readOnly={!Editable}
              value={user.email}
              onChange={(e) => setEmail(e.target.Email)}
              className="outline-none border-2 border-pink-500 w-3/4 text-center"
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="border-2 border-pink-500 w-1/4">Username</div>
            <input
              type="text"
              readOnly={!Editable}
              value={user?.username}
              onChange={(e) => setUsername(e.target.Username)}
              className="outline-none border-2 border-pink-500 w-3/4 text-center"
            />
          </div>
          <div className="flex items-center justify-between mx-2 my-5 gap-5 ">
            <button
              className="border-2 border-pink-500 px-1 py-1 rounded-lg"
              onClick={() => setEditable((val) => !val)}
            >
              {Editable ? "Save" : "Edit"}
            </button>
            <button
              className="border-2 border-pink-500 px-1 py-1 rounded-lg"
              onClick={handleLogOut}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

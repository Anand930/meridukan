import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import fetchWithAuth from "../utils/fetchWithAuth.js";
import toast,{Toaster} from 'react-hot-toast'

// import getUserFromToken from '../utils/decodeToken.js'

const Profile = () => {
  const navigate = useNavigate();
  const { user, userRender } = useContext(UserContext);
  const [Editable, setEditable] = useState(false);

  useEffect(() => {
    // Retrieve user data from the token on page load
    userRender();
  }, []);

  const handleLogOut = async () => {
    try {

      const response = await fetchWithAuth(
        "https://curved-jeniffer-anandsharma-521f7f2a.koyeb.app/api/user/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("user logout successfully");
      }
      localStorage.removeItem("authenticated");
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      console.log("Error occured while logging out the user ", error);
    }
  };


  
  return (
    <div>
      <Navbar />
      <Toaster/>
      <div className="text-center flex items-center justify-center flex-col">
        <div className="flex items-center justify-center mt-10">
          <div className="border-2 border-pink-500 rounded-full w-24 h-24 overflow-hidden">
            <img className="bg-contain  " src={user?.profileImage} alt="" />
          </div>
        </div>
        <div className="my-8 md:w-1/2 w-6/7 mx-2 md:mx-auto">
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
              value={user?.email}
              onChange={(e) => setEmail(e.target.email)}
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

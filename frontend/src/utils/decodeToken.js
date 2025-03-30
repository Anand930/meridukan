import jwt_decode from 'jwt-decode'

// Function to get user data from the accessToken
export default getUserFromToken = () => {
  const token = localStorage.getItem("accessToken");  // or from cookies/sessionStorage
  
  if (!token) {
    return null;
  }

  try {
    // Decode the JWT token to get the user info
    const decodedToken = jwt_decode(token);
    return decodedToken;  // This will return the payload of the JWT (user details)
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};


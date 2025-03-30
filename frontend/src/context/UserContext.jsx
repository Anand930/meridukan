import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([])
  return (
    <UserContext.Provider value={{ user, setUser, products, setProducts }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserProvider;
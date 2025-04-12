import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import fetchWithAuth from "../utils/fetchWithAuth";

export const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [allCustomerNameList, SetAllCustomerNameList] = useState([]);
  const { products, setProducts } = useContext(UserContext);

  const handleListCustomer = async () => {
    try {
      const response = await fetchWithAuth(
        "https://curved-jeniffer-anandsharma-521f7f2a.koyeb.app/api/customer/getcustomer"
      );
      const data = await response.json();
      setCustomers(data.customers);
      
    } catch (error) {
      console.log("Error occured while tring to fetch the customer ", error);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        setCustomers,
        allCustomerNameList,
        SetAllCustomerNameList,
        handleListCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerProvider;

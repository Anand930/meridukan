import {  createContext, useState } from "react";

export const CustomerContext = createContext()

const CustomerProvider = ({children}) =>{
    const [customers, setCustomers] = useState([]);
    const [allCustomerNameList, SetAllCustomerNameList] = useState([])
    return(
        <CustomerContext.Provider value={{customers,setCustomers, allCustomerNameList, SetAllCustomerNameList}}>
            {children}
        </CustomerContext.Provider>
    )
}

export default CustomerProvider;
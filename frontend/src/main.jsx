import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserProvider from "./context/UserContext.jsx";
import CustomerProvider from "./context/CustomerContext.jsx";
import {SearchProvider} from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <CustomerProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </CustomerProvider>
  </UserProvider>
);

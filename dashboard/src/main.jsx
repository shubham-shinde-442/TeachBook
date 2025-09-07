import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({
  isAuthenticated: false,
  userRole: null,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});
  const [userRole, setUserRole] = useState(null);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        admin,
        setAdmin,
        userRole,
        setUserRole,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

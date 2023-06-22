import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Auth from "./auth";
import "./index.css";
import { userContext } from "./context/user-context";
import { CookiesProvider } from "react-cookie";

function Root() {
  const [userData, setUserData] = useState();
  const [remoteUserData, setRemoteUserData] = useState();
  const [connectionState, setConnectionState] = useState(false);
  
  return (
    <BrowserRouter>
      <userContext.Provider
        value={{
          userData,
          setUserData,
          remoteUserData,
          setRemoteUserData,
          connectionState,
          setConnectionState,
        }}
      >
        <CookiesProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </CookiesProvider>
      </userContext.Provider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

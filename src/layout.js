import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userContext } from "./context/auth-context";
import Home from "./App";
import { useState } from "react";
import Auth from "./auth";
export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCookies, setUserCookies] = useState(null);
  return (
    <BrowserRouter>
      <userContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, userCookies, setUserCookies }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}

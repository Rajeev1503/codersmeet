import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./auth";
import Layout from "./layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<Layout/>
);

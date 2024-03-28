import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Imageprovider from "./store/Image-provider.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import {BrowserRouter} from "react-router-dom"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Imageprovider>
        <App />
        <ToastContainer/>
      </Imageprovider>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import axios from "axios";
import { Provider } from "react-redux";

axios.defaults.withCredentials = true;
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//import Context
import { ModalContextProvider } from "context/ModalContext";
import { NavigationContextProvider } from "context/NavigationContext";
import { FollowContextProvider } from "context/FollowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavigationContextProvider>
      <ModalContextProvider>
        <FollowContextProvider>
          <App />
        </FollowContextProvider>
      </ModalContextProvider>
    </NavigationContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

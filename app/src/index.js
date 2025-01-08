// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import { Provider, useSelector, useDispatch } from "react-redux";
// import store from "./store";
// import Login from "./screens/connection/loginScreen";
// import SplashScreen from "./screens/app/splashscreen";
// import App from "./App";
// import "./index.css";
// import { setAuthenticated } from "./states/authSlice"; // Import the setAuthenticated action

// const Root = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const [showSplash, setShowSplash] = useState(true);
//   const dispatch = useDispatch();

//   const handleSplashComplete = () => {
//     setShowSplash(false);
//     // Check if a valid session exists or authenticate again here
//     if (localStorage.getItem("authToken")) {
//       dispatch(setAuthenticated(true)); // Dispatch authentication based on token
//     }
//   };

//   useEffect(() => {
//     if (showSplash) {
//       const timeout = setTimeout(() => {
//         handleSplashComplete();
//       }, 3000); // Assuming the splash screen stays for 3 seconds
//       return () => clearTimeout(timeout);
//     }
//   }, [showSplash], [handleSplashComplete]);

//   return showSplash ? (
//     <SplashScreen onComplete={handleSplashComplete} />
//   ) : isAuthenticated ? (
//     <App />
//   ) : (
//     <Login />
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Root />
//     </Provider>
//   </React.StrictMode>
// );

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
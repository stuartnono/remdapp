// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./states/authSlice";
// import connectionReducer from "./states/connectionSlice";
// import logger from 'redux-logger'; // Import the logger

// // Store configuration
// const store = configureStore({
//   reducer: {
//     auth: authReducer, // Handle authentication state
//     connection: connectionReducer, // Handle session and connection-related state
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Only needed if you're managing non-serializable values
//     }).concat(logger), // Add redux-logger middleware after default middleware
//   devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
// });


// export default store;


import { configureStore } from "@reduxjs/toolkit";
import connectionSlice from "./states/connectionSlice";
import authReducer from "./states/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Handle authentication state
    connection: connectionSlice
  },
});

export default store;
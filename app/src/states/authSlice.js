import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("authToken") ? true : false, // Check localStorage for authToken
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      if (action.payload) {
        localStorage.setItem("authToken", "your-auth-token"); // Store token in localStorage
      } else {
        localStorage.removeItem("authToken"); // Clear token on logout
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("authToken"); // Clear token on logout
    },
  },
});

export const { setAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isAuthenticated: false,
//   },
//   reducers: {
//     setAuthenticated: (state, action) => {
//       state.isAuthenticated = action.payload;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { setAuthenticated, logout } = authSlice.actions;
// export default authSlice.reducer;

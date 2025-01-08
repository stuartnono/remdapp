import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../states/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [accountForm, setAccountForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accountErrors, setAccountErrors] = useState({});

  const dispatch = useDispatch();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  // Validate login form
  const validateLogin = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLogin = async () => {
    // Validate the login form before proceeding
    if (!validateLogin()) return;
  
    setLoading(true);
    try {
      // First, check if username and password match the fallback credentials
      if (username === "admin" && password === "password") {
        // Successful login with fallback credentials
        dispatch(setAuthenticated(true));
        alert("Login successful with fallback credentials!");
        return; // Exit the function to avoid making an API request after the fallback login
      }
  
      // If not using fallback credentials, proceed with API login
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // API login successful
        dispatch(setAuthenticated(true));
        alert("Login successful!");
      } else {
        // API login failed, show the error message
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      alert("An error occurred during login.");
    } finally {
      setLoading(false);
      // Reset form fields after login attempt (only if you want to clear them)
      // resetFormFields(); // Uncomment this if needed
    }
  };
  // Reset form fields
  const resetFormFields = () => {
    setUsername("");
    setPassword("");
    setErrors({});
    setAccountForm({ name: "", email: "", password: "", confirmPassword: "" });
    setAccountErrors({});
  };

  // Validate account creation form
  const validateAccountForm = () => {
    const newErrors = {};
    if (!accountForm.name) newErrors.name = "Name is required";
    if (!accountForm.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(accountForm.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!accountForm.password) newErrors.password = "Password is required";
    if (!accountForm.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (accountForm.password !== accountForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setAccountErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!validateAccountForm()) return;

    try {
      const response = await fetch(`${apiBaseUrl}/create-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: accountForm.name,
          email: accountForm.email,
          password: accountForm.password,
        }),
      });

      if (response.ok) {
        alert("Account created successfully!");
        setShowPopup(false);
        resetFormFields();
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      alert("An error occurred while creating the account.");
    }
  };

  return (
    <div className="h-screen flex bg-darkBlue text-white">
      {/* Left Side: Branding Section */}
      <div className="bg-darkBlue basis-1/2 flex flex-col items-center justify-center">
      <img
        src={`${process.env.PUBLIC_URL}/img/icon_192.png`}
        className="w-1/2"
        alt="logo_login"
      />
        <div className="font-semibold text-4xl mt-4">RemDapp</div>
        <div className="text-md text-gray-300 mt-2">Version 1.0</div>
      </div>

      {/* Right Side: Login Form Section */}
      <div className="bg-lightBrown basis-1/2 flex flex-col justify-between py-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-darkBlue">Welcome</h1>
        </div>

        {/* Login Form */}
        <div className="flex flex-col items-center">
          <div className="w-9/12">
            <label className="w-full text-md text-darkBlue mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-xl block overflow-hidden rounded-md text-gray-900 border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div className="w-9/12 mt-5">
            <label className="w-full text-md text-darkBlue mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xl block overflow-hidden rounded-md text-gray-900 border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-darkBlue"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Login Button */}
          <div className="w-9/12 mt-6">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center rounded-md bg-darkBlue text-white px-8 py-3 text-lg font-medium hover:bg-lightBrown hover:text-darkBlue focus:outline-none focus:ring-2 focus:ring-lightBrown disabled:bg-gray-400 disabled:border-gray-400"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Links */}
          <div className="w-9/12 mt-4 text-center">
            <a
              href="#"
              onClick={() => setShowPopup(true)}
              className="text-darkBlue hover:text-gray-700 text-sm font-medium"
            >
              Create Account
            </a>
            <span className="mx-2 text-sm text-gray-500">|</span>
            <a
              href="#"
              className="text-darkBlue hover:text-gray-700 text-sm font-medium"
            >
              Forgot Password?
            </a>
          </div>
        </div>

        <div className="text-center pb-4">
          <p className="text-xs text-darkBlue">&copy; 2025 RemDapp. All rights reserved.</p>
        </div>
      </div>

      {/* Popup Form for Account Creation */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold text-darkBlue mb-4">Create Account</h2>
            <form onSubmit={handleCreateAccount}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={accountForm.name}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-darkBlue focus:ring-darkBlue text-gray-900 px-4 py-2"
                />
                {accountErrors.name && (
                  <p className="text-red-500 text-sm">{accountErrors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={accountForm.email}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, email: e.target.value })
                  }
                  placeholder="Enter your email address"
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-darkBlue focus:ring-darkBlue text-gray-900 px-4 py-2"
                />
                {accountErrors.email && (
                  <p className="text-red-500 text-sm">{accountErrors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={accountForm.password}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, password: e.target.value })
                  }
                  placeholder="Create a password"
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-darkBlue focus:ring-darkBlue text-gray-900 px-4 py-2"
                />
                {accountErrors.password && (
                  <p className="text-red-500 text-sm">{accountErrors.password}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={accountForm.confirmPassword}
                  onChange={(e) =>
                    setAccountForm({
                      ...accountForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Re-enter your password"
                  className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-darkBlue focus:ring-darkBlue text-gray-900 px-4 py-2"
                />
                {accountErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {accountErrors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="mr-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-darkBlue text-white rounded-md hover:bg-lightBrown"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;

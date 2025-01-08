import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../states/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-4"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

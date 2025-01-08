import React, { useState } from "react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotifications(!notifications);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-lightBrown p-8">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Settings
        </h1>

        {/* Dark Mode Setting */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-xl hover:bg-gray-50 transition duration-300 ease-in-out">
          <span className="text-lg font-medium text-gray-800">Dark Mode</span>
          <button
            onClick={toggleDarkMode}
            className={`${
              darkMode ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            } px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out`}
          >
            {darkMode ? "Enabled" : "Disabled"}
          </button>
        </div>

        {/* Notifications Setting */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-xl hover:bg-gray-50 transition duration-300 ease-in-out">
          <span className="text-lg font-medium text-gray-800">Notifications</span>
          <button
            onClick={toggleNotifications}
            className={`${
              notifications ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
            } px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out`}
          >
            {notifications ? "Enabled" : "Disabled"}
          </button>
        </div>

        {/* Privacy Settings */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-xl hover:bg-gray-50 transition duration-300 ease-in-out">
          <span className="text-lg font-medium text-gray-800">Privacy</span>
          <button
            onClick={() => alert("Privacy Settings")}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
          >
            Manage
          </button>
        </div>

        {/* Account Settings */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-xl hover:bg-gray-50 transition duration-300 ease-in-out">
          <span className="text-lg font-medium text-gray-800">Account</span>
          <button
            onClick={() => alert("Account Settings")}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-300 ease-in-out"
          >
            Manage
          </button>
        </div>

        {/* General Settings */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-xl hover:bg-gray-50 transition duration-300 ease-in-out">
          <span className="text-lg font-medium text-gray-800">General</span>
          <button
            onClick={() => alert("General Settings")}
            className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 ease-in-out"
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

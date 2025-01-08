import React, { useState } from "react";

const FavouritesPage = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: "Device 1" },
    { id: 2, name: "Device 2" },
    { id: 3, name: "Device 3" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to delete device
  const deleteDevice = (id) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  // Function to modify device
  const modifyDevice = (id) => {
    const newName = prompt("Enter new device name:");
    if (newName) {
      setDevices(
        devices.map((device) =>
          device.id === id ? { ...device, name: newName } : device
        )
      );
    }
  };

  // Function to add a new device
  const addDevice = () => {
    const newName = prompt("Enter device name:");
    if (newName) {
      const newDevice = {
        id: devices.length + 1,
        name: newName,
      };
      setDevices([...devices, newDevice]);
    }
  };

  // Filter devices based on search query
  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center h-full bg-lightBrown p-8">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Favourite Devices
        </h1>

        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search devices..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Add device button */}
        <div className="mb-6 text-center">
          <button
            onClick={addDevice}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Add Device
          </button>
        </div>

        {/* Device list */}
        <div className="space-y-4">
          {filteredDevices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-4 border-b border-gray-200 rounded-xl hover:bg-gray-50 transition duration-300 ease-in-out"
            >
              <span className="text-lg font-medium text-gray-800">{device.name}</span>
              <div className="flex space-x-4">
                <button
                  onClick={() => modifyDevice(device.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Modify
                </button>
                <button
                  onClick={() => deleteDevice(device.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;

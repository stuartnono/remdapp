import { useDispatch, useSelector } from "react-redux";
import { setShowSessionDialog } from "./states/connectionSlice";
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter,HashRouter, Route, Routes, NavLink } from "react-router-dom";
//import ConnectionScreen from "./screens/connection/ConnectionScreen";
import ConnectionScreen from "./screens/sidebar/connectionPage";
import AppScreen from "./screens/app/AppScreen";
import FavouritesPage from "./screens/sidebar/FavouritesPage";
import SettingsPage from "./screens/sidebar/settingsPage";
import LogoutButton from "./screens/sidebar/logoutButton";
import io from "socket.io-client";
const { ipcRenderer } = window.require("electron");



const App = () => {
  const callRef = useRef();
  const socket = io("http://127.0.0.1:5000");

  const remoteId = useSelector((state) => state.connection.remoteConnectionId);
  const [sessionEnded, setSessionEnded] = useState(false);

  // Socket connection
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("connect_error", (e) => {
      console.log("Socket connection error, retrying..." + e);
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      if (remoteId) {
        socket.emit("remotedisconnected", { remoteId: remoteId });
      }
    });

    socket.on("remotedisconnected", () => {
      //alert("Remote disconnected");
      setSessionEnded(true);
    });

    // --------- MOUSE AND KEYBOARD EVENTS ----------

    socket.on("mousemove", (event) => {
      //console.log(`Mousemove: x=${event.x} y=${event.y}`);
      ipcRenderer.send("mousemove", event);
    });

    socket.on("mousedown", (event) => {
      console.log(`Mouse down: ${event.button}`);
      ipcRenderer.send("mousedown", event);
    });

    socket.on("scroll", (event) => {
      console.log(`Scroll: ${event.scroll}`);
      ipcRenderer.send("scroll", event);
    });

    socket.on("keydown", (event) => {
      console.log(`Key pressed: ${event.keyCode}`);
      ipcRenderer.send("keydown", event);
    });
  }, []);

  const linkStyles = ({ isActive }) =>
    isActive
      ? "bg-red-500 text-white font-bold p-4 rounded"
      : "text-gray-300 hover:text-white p-4";

  return (
    socket && (
      <HashRouter>
        <div className="h-screen flex">
          {/* Sidebar */}
          <div className="bg-gray-800 text-white w-1/4 h-full flex flex-col">
            <div className="font-bold text-xl py-4 text-center">RemDapp</div>
            <nav className="flex flex-col space-y-2 mt-4">
              <NavLink to="/" className={linkStyles}>
                Connection
              </NavLink>
              <NavLink to="/favourite" className={linkStyles}>
                Favourites
              </NavLink>
              <NavLink to="/settings" className={linkStyles}>
                Settings
              </NavLink>
            </nav>
            <LogoutButton />
          </div>

          {/* Main content area */}
          <div className="flex-grow">
            <Routes>
              <Route
                path="/"
                exact
                element={<ConnectionScreen callRef={callRef} socket={socket} />}
              />
              <Route
                path="/app"
                element={
                  <AppScreen
                    callRef={callRef}
                    socket={socket}
                    sessionEnded={sessionEnded}
                  />
                }
              />
              <Route path="/favourite" element={<FavouritesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="*"
                element={<div>RemDapp Error: Page not found</div>}
              />
            </Routes>
          </div>
        </div>
      </HashRouter>
    )
  );
};

export default App;





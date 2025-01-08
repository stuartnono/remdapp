import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SessionInfo from "../../components/SessionInfo";
import SessionLoading from "../../components/SessionLoading";
import {
  setSessionMode,
  setSessionStartTime,
  setShowSessionDialog,
} from "../../states/connectionSlice";

import { ImConnection } from "react-icons/im";
import { Navigate, useNavigate } from "react-router-dom";

const AppScreen = ({ callRef, socket, sessionEnded }) => {
  const videoRef = useRef();
  const [remoteConnecting, setRemoteConnecting] = useState(true);
  const dispatch = useDispatch();

  const showSessionDialog = useSelector(
    (state) => state.connection.showSessionDialog
  );

  const userId = useSelector((state) => state.connection.userConnectionId);
  const remoteId = useSelector((state) => state.connection.remoteConnectionId);
  const navigate = useNavigate();

  useEffect(() => {
    // When call is accepted
    callRef.current.on("stream", function (remoteStream) {
      setRemoteConnecting(false);
      dispatch(setSessionMode(1));
      dispatch(setSessionStartTime(new Date()));
      dispatch(setShowSessionDialog(true));
      videoRef.current.srcObject = remoteStream;
      videoRef.current.play();
    });

    callRef.current.on("close", function () {
      alert("Connection closed");
      console.log("Closed");
    });

    callRef.current.on("error", function () {
      alert("Connection error");
      console.log("Error");
    });
  }, []);

  // Handling key press
  useEffect(() => {
    if (socket) {
      // -------- MOUSE CURSOR COORDINATES -------
      let mousePos = null;
      let lastPos = null;
      // Whenever user moves cursor, save its coordinates in a variable
      document.addEventListener("mousemove", (e) => {
        mousePos = e;
      });

      // Every 100ms delay, share coordinates with connected user
      setInterval(() => {
        if (mousePos) {
          socket.emit("mousemove", {
            userId: userId,
            remoteId: remoteId,
            event: { x: mousePos.pageX, y: mousePos.pageY },
          });
        }
      }, 100);

      // -------- MOUSE LMB (0), MMB (1), RMB (2) CLICK -------
      document.addEventListener("mousedown", (e) => {
        socket.emit("mousedown", {
          userId: userId,
          remoteId: remoteId,
          event: { button: e.button },
        });
      });

      // ------- SCROLL ----------

      document.addEventListener("wheel", (e) => {
        console.log("Scrolling " + e.deltaY);
        socket.emit("scroll", {
          userId: userId,
          remoteId: remoteId,
          event: { scroll: e.deltaY },
        });
      });

      // ------- KEYBOARD ----------
      document.addEventListener("keydown", (e) => {
        socket.emit("keydown", {
          userId: userId,
          remoteId: remoteId,
          event: { keyCode: e.key },
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (sessionEnded) {
      navigate("/");
      window.location.reload();
    }
  }, [sessionEnded]);

  return (
    <div className="h-screen bg-gray-700">
      <video ref={videoRef} style={{ width: "100vw", height: "100vh" }} />
      <button
        onClick={() => dispatch(setShowSessionDialog(true))}
        class="fixed flex items-center justify-center text-xl right-0 mt-5 mr-10 top-0 text-white px-4 w-auto h-12 bg-sky-600 rounded-full hover:bg-sky-500 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
      >
        <ImConnection />
        <span className="ml-2 text-lg">Session Info</span>
      </button>
      {/* {remoteConnecting && <SessionLoading />} */}
      {showSessionDialog && <SessionInfo socket={socket} />}
    </div>
  );
};

export default AppScreen;
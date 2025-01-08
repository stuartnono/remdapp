import { useEffect, useRef, useState } from "react";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import SessionInfo from "../../components/SessionInfo";
import { useDispatch, useSelector } from "react-redux";
import { Peer } from "peerjs";
import {
  setRemoteConnectionId,
  setSessionMode,
  setSessionStartTime,
  setShowSessionDialog,
  setUserConnectionId,
} from "../../states/connectionSlice";
const { ipcRenderer } = window.require("electron");

const ConnectionPage = ({ callRef, socket }) => {
  const [remoteConnecting, setRemoteConnecting] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [remoteId, setRemoteId] = useState("");

  const sourceIdRef = useRef(null); // useRef for sourceId
  const peerInstance = useRef(null);
  const remoteVideoRef = useRef();

  const showSessionDialog = useSelector(
    (state) => state.connection.showSessionDialog
  );

  const handleCopied = (e) => {
    navigator.clipboard.writeText(e.target.value);
    setShowCopied(true);
  };

  useEffect(() => {
    if (showCopied) {
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    }
  }, [showCopied]);

  useEffect(() => {
    const max = 9999999999;
    const min = 1000000000;
    const uid = Math.floor(Math.random() * (max - min + 1)) + min;

    setUserId(uid);
    dispatch(setUserConnectionId(uid));

    socket.emit("join", "User" + uid);

    const peerOptions = {
      host: "127.0.0.1",
      port: 5000,
      path: "/peerjs",
      config: {
        iceServers: [
          { url: "stun:stun01.sipphone.com" },
          { url: "stun:stun.ekiga.net" },
          { url: "stun:stunserver.org" },
          { url: "stun:stun.softjoys.com" },
          { url: "stun:stun.voiparound.com" },
          { url: "stun:stun.voipbuster.com" },
          { url: "stun:stun.voipstunt.com" },
          { url: "stun:stun.voxgratia.org" },
          { url: "stun:stun.xten.com" },
          {
            url: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
          {
            url: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
        ],
      },
    };

    const peer = new Peer(uid);

    peer.on("call", (call) => {
      if (window.confirm("Incoming call from " + call.peer) === true) {
        navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: sourceIdRef.current, // Use sourceIdRef.current
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720,
              },
            },
          })
          .then((mediaStream) => {
            setRemoteId(call.peer);
            dispatch(setRemoteConnectionId(call.peer));

            call.answer(mediaStream);
            dispatch(setSessionMode(0));
            dispatch(setSessionStartTime(new Date()));
            dispatch(setShowSessionDialog(true));

            call.on("stream", function (remoteStream) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            });
          })
          .catch((e) => console.log("Error: " + e));
      }
    });

    ipcRenderer.on("SET_SOURCE", async (event, id) => {
      sourceIdRef.current = id; // Update the sourceIdRef
    });

    peerInstance.current = peer;
  }, [dispatch, socket]); 

  const connect = () => {
    if (!remoteId || remoteId.length < 10) {
      alert("Invalid Remote ID");
      return;
    } else if (!remoteId.match(/^\d+$/)) {
      alert("Remote ID cannot be a string");
      return;
    } else if (parseInt(remoteId) === parseInt(userId)) {
      alert("User ID and Remote ID cannot be same");
      return;
    }

    setRemoteConnecting(true);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        const call = peerInstance.current.call(remoteId, mediaStream);
        callRef.current = call;
        navigate("/app");
      })
      .catch((e) => console.log("Error: " + e));
  };

  return (
    <div className="h-screen flex bg-lightBrown">
      <div className="bg-white p-8 rounded-lg shadow-xl w-3/4 mx-auto my-auto flex flex-col items-center">
        <div className="w-full text-xl font-medium text-gray-800 mb-4">Your Connection ID</div>
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="XXXXXXXXXX"
            value={userId}
            readOnly
            className="w-full text-2xl block rounded-md text-gray-800 border border-gray-300 px-4 py-2 focus:outline-none"
            title="Click here to copy"
            onClick={handleCopied}
          />
          {showCopied && (
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 text-sm">(Copied)</span>
          )}
        </div>

        <div className="w-full text-xl font-medium text-gray-800 mb-4">Remote Connection ID</div>
        <input
          type="text"
          placeholder="9876543210"
          className="w-full text-2xl block rounded-md text-gray-800 border border-gray-300 px-4 py-2 focus:outline-none"
          value={remoteId}
          onChange={(e) => {
            setRemoteId(e.target.value);
            dispatch(setRemoteConnectionId(e.target.value));
          }}
        />

        <div className="w-full mt-8">
          <button
            onClick={connect}
            disabled={remoteConnecting}
            className="w-full flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-xl font-semibold text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-500 focus:outline-none"
          >
            <span className={remoteConnecting ? "mr-3" : ""}>{remoteConnecting ? "Connecting" : "Connect"}</span>
            {remoteConnecting && <Loading />}
          </button>
        </div>
      </div>
      <div className="hidden">
        <video ref={remoteVideoRef} />
      </div>
      {showSessionDialog && <SessionInfo socket={socket} />}
    </div>
  );
};

export default ConnectionPage;

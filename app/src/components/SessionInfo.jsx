import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setShowSessionDialog } from "../states/connectionSlice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { IoMdTimer } from "react-icons/io";

const SessionInfo = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.connection.userConnectionId);
  const remoteId = useSelector((state) => state.connection.remoteConnectionId);
  const sessionStart = useSelector(
    (state) => state.connection.sessionStartTime
  );

  const sessionMode = useSelector((state) => state.connection.sessionMode);

  const [timeElapsed, setTimeElapsed] = useState(false);

  const formatNumber = (num) => {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

  const closeSession = () => {
    if (window.confirm("Are you sure you want to end this session")) {
      dispatch(setShowSessionDialog(false));
      socket.emit("remotedisconnected", { remoteId: remoteId });
      if (sessionMode === 1) {
        navigate("/");
      }
      window.location.reload();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = moment.duration(
        moment(new Date()).diff(moment(sessionStart))
      );
      const seconds = formatNumber(duration.seconds());
      const minutes = formatNumber(duration.minutes());
      const hours = formatNumber(duration.hours());

      const timeDiff = `${hours}:${minutes}:${seconds}`;
      setTimeElapsed(timeDiff);
    }, 1000);
    return () => clearTimeout(interval);
  }, []);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();

        if (sessionMode === 0) {
          return;
        }

        if (e.target === e.currentTarget) {
          dispatch(setShowSessionDialog(false));
        }
      }}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40"
    >
      <div className="w-full sm:w-[450px] bg-white rounded-xl shadow-lg transform transition-all duration-300 ease-in-out">
        {/* Header Section */}
       
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-5xl py-6 text-center rounded-t-xl">
        <IoMdTimer className="inline-block text-7xl mb-2 animate-pulse" />
        <div className="font-semibold text-2xl">Session Started</div>
      </div>
      
        {/* Session Info - Modern Cards */}
        <div className="p-6">
          <div className="space-y-4">
            {/* User Connection Card */}
            <div className="flex justify-between items-center py-3 px-5 bg-gray-50 rounded-lg shadow-sm">
              <div className="text-lg font-medium text-gray-600">User Connection Id</div>
              <div className="text-lg text-gray-800">{userId}</div>
            </div>

            {/* Remote Connection Card */}
            <div className="flex justify-between items-center py-3 px-5 bg-gray-50 rounded-lg shadow-sm">
              <div className="text-lg font-medium text-gray-600">Remote Connection Id</div>
              <div className="text-lg text-gray-800">{remoteId}</div>
            </div>

            {/* Session Start Card */}
            <div className="flex justify-between items-center py-3 px-5 bg-gray-50 rounded-lg shadow-sm">
              <div className="text-lg font-medium text-gray-600">Session Date</div>
              <div className="text-lg text-gray-800">
                {moment(sessionStart).format("MMMM Do, h:mm:ss a")}
              </div>
            </div>

            {/* Time Elapsed Card */}
            <div className="flex justify-between items-center py-3 px-5 bg-gray-50 rounded-lg shadow-sm">
              <div className="text-lg font-medium text-gray-600">Session Duration</div>
              <div className="text-lg text-gray-800">{timeElapsed}</div>
            </div>
          </div>
        </div>

        {/* End Session Button */}
        <div className="flex justify-center mb-6 px-6">
          <button
            onClick={closeSession}
            className="w-full sm:w-auto py-3 px-6 text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            End Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;



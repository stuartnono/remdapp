import React, { useEffect } from "react";

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // Adjust the delay (in milliseconds) as needed

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [onComplete]);

  return (
    <div className="h-screen flex items-center justify-center bg-darkBlue text-white">
      <div className="text-center">
        <img src={`${process.env.PUBLIC_URL}/img/icon_192.png`} className="w-1/4 mx-auto" alt="logo" />
        <h1 className="text-4xl font-bold mt-4">Welcome to RemDapp</h1>
        <p className="text-gray-300 mt-2">Version 1.0</p>
      </div>
    </div>
  );
};

export default SplashScreen;

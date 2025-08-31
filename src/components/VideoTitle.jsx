import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="flex gap-3">
        <button className="bg-white hover:bg-white/80 cursor-pointer text-black my-1 px-3 py-1 md:px-16 md:p-4 rounded-md text-sm">
          ⏵ Play
        </button>
        <button className="hidden md:inline-block bg-gray-500/50 text-white cursor-pointer px-16 p-4 rounded-md text-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

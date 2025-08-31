import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { Background_URL } from "../utils/constants";
const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10 flex">
        <img className="w-full h-screen md:h-full object-cover flex-grow" src={Background_URL} alt="background image" />
      </div>
      <div className="pt-[25%] md:p-0">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;

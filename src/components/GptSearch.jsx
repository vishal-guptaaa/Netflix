import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { Background_URL } from "../utils/constants";
const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img src={Background_URL} alt="background image" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;

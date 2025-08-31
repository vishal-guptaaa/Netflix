import React from "react";
import { CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-48">
      <img src={CDN_URL + posterPath} alt="movie image" />
    </div>
  );
};

export default MovieCard;

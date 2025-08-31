import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-6">  
      <h1 className=" text-2xl md:text-3xl font-semibold text-white">{title}</h1>
      <div className="flex  overflow-x-scroll py-4">
        <div className="flex gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

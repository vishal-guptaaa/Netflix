import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.notPlayingMovies);
  //   Early Return
  if (!movies) return;

  const mainMovie = movies[7];

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="overflow-x-hidden">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;

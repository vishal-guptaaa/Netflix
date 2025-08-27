import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRated from "../hooks/useTopRated";
import useUpcoming from "../hooks/useUpcoming";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useUpcoming();
  useTopRated();


  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/* 
        MainContainer
          - videoBackground
          - videoTitle
        SecondaryContainer
          - MovieList * n
            - Cards * n
      */}
    </div>
  );
};

export default Browse;

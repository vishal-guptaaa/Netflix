import { useEffect } from "react";
import { API_Options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  // Fetch data from TMDB API  and update the store
  const dispatch = useDispatch();

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_Options
    );
    const json = await data.json();
    dispatch(addPopularMovies(json?.results));
  };
};

export default usePopularMovies;

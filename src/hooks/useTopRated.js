import { useEffect } from "react";
import { addTopRated } from "../utils/moviesSlice";
import { API_Options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

const useTopRated = () => {
  // Fetch data from TMDB API  and update the store
  const dispatch = useDispatch();

  const topRated = useSelector((store) => store.movies.topRated);

  useEffect(() => {
    !topRated && getTopRated();
  }, []);

  const getTopRated = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_Options
    );
    const json = await data.json();
    dispatch(addTopRated(json?.results));
  };
};

export default useTopRated;

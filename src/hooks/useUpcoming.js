import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpcoming } from "../utils/moviesSlice";
import { API_Options } from "../utils/constants";

const useUpcoming = () => {
  // Fetch data from TMDB API  and update the store
  const dispatch = useDispatch();

  useEffect(() => {
    getUpcoming();
  }, []);

  const getUpcoming = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_Options
    );
    const json = await data.json();
    dispatch(addUpcoming(json?.results));
  };
};
export default useUpcoming;

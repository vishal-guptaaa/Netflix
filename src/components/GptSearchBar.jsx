import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import gemini from "../utils/gemini";
import { API_Options } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_Options
    );

    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    // Make an API call to GPT API and get movie results

    const geminiQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query" +
      searchText.current.value +
      "only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Don, Sholey, khiladi, phool aur kaate";

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: geminiQuery,
    });
    
    if (!response.text) return;

    console.log(response.text.split(","));
    const gptMovies = response.text.split(", ");

    // For each movie I will search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black text-white grid grid-cols-12 rounded-md cursor-pointer"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 m-4 border col-span-9 rounded-md"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 px-4 py-2 bg-red-700 rounded-md cursor-pointer"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

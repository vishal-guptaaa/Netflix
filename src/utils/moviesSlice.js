import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    notPlayingMovies: null,
    tailerVideo: null,
    popularMovies: null,
    topRated: null,
    upcoming: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.notPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    addUpcoming: (state, action) => {
      state.upcoming = action.payload;
    },
    addTailerVideo: (state, action) => {
      state.tailerVideo = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTailerVideo,
  addPopularMovies,
  addTopRated,
  addUpcoming,
} = moviesSlice.actions;

export default moviesSlice.reducer;

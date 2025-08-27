import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    notPlayingMovies: null,
    tailerVideo: null
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.notPlayingMovies = action.payload;
    },
    addTailerVideo: (state, action) => {
      state.tailerVideo = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTailerVideo } = moviesSlice.actions;

export default moviesSlice.reducer;

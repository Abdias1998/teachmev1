import { createSlice } from "@reduxjs/toolkit";

export const videoUnWatchedSlice = createSlice({
  name: "videosUnWatched",
  initialState: {
    videosUnWatched: [],
  },
  reducers: {
    setGetVideoUnWatched: (state, { payload }) => {
      state.videosUnWatched = payload;
    },
  },
});
export const { setGetVideoUnWatched } = videoUnWatchedSlice.actions;

export default videoUnWatchedSlice.reducer;

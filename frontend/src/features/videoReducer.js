import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
  },
  reducers: {
    setGetVideo: (state, { payload }) => {
      state.videos = payload;
    },
  },
});
export const { setGetVideo } = videoSlice.actions;

export default videoSlice.reducer;

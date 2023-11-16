import { createSlice } from "@reduxjs/toolkit";

export const videoget55Slice = createSlice({
  name: "videosget55",
  initialState: {
    videosget55: [],
  },
  reducers: {
    setGetVideo55: (state, { payload }) => {
      state.videosget55 = payload;
    },
  },
});
export const { setGetVideo55 } = videoget55Slice.actions;

export default videoget55Slice.reducer;

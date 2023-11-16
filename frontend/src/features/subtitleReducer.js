import { createSlice } from "@reduxjs/toolkit";

export const subtitleSlice = createSlice({
  name: "subtitles",
  initialState: {
    subtitles: [],
  },
  reducers: {
    setGetVideoSubtitles: (state, { payload }) => {
      state.subtitles = payload;
    },
  },
});
export const { setGetVideoSubtitles } = subtitleSlice.actions;

export default subtitleSlice.reducer;

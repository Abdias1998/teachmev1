import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
  },
  reducers: {
    setEmail: (state, { payload }) => {
      state.user = payload;
    },
    setGetUser: (state, { payload }) => {
      state.user = payload;
    },
    logOut: (state, { payload }) => {
      state.user = payload;
    },
  },
});
export const { setGetUser, logOut, setEmail } = userSlice.actions;

export default userSlice.reducer;

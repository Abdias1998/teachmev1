import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userReducer";
import videosReducer from "../features/videoReducer";
import videosUnWatchedReducer from "../features/videoUnWatchedReducer";
export default configureStore({
  reducer: {
    user: userReducer,
    videos: videosReducer,
    videosUnWatched: videosUnWatchedReducer,
  },
});

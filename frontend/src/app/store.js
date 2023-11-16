import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userReducer";
import videosReducer from "../features/videoReducer";
import videosUnWatchedReducer from "../features/videoUnWatchedReducer";
import videosget55Reducer from "../features/videoTop55Reducer";
import videosSubtitles from "../features/subtitleReducer";
export default configureStore({
  reducer: {
    user: userReducer,
    videos: videosReducer,
    videosUnWatched: videosUnWatchedReducer,
    videosget55: videosget55Reducer,
    subtitles: videosSubtitles,
  },
});

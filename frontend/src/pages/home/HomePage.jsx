import React, { useEffect, useState } from "react";
import { dataImageSlider, movie } from "../../data/sliderImage";
import { Row } from "../../component/home/Row";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setGetUser } from "../../features/userReducer";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  getVideo,
  getVideoUnWatched,
  getVideo55,
  getVideoSubtitles,
} from "../../endpoint/request";
import VideoPlayer from "../../component/home/VideoPlayer";
import Navbar from "../../component/home/navbar/Navbar";
import CircleLoader from "../../component/circle-loader";
import Banner from "../../component/banner";
import VideoList from "../../component/card";
import { setGetVideo } from "../../features/videoReducer";
import { setGetVideoUnWatched } from "../../features/videoUnWatchedReducer";
import { setGetVideo55 } from "../../features/videoTop55Reducer";
import { setGetVideoSubtitles } from "../../features/subtitleReducer";
axios.defaults.withCredentials = true;
export const HomePage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const videos = useSelector((state) => state.videos.videos);
  const videosUnWatched = useSelector(
    (state) => state.videosUnWatched.videosUnWatched
  );
  const getVideoMoreViews = useSelector(
    (state) => state.videosget55.videosget55.mostViewed
  );
  const subtitles = useSelector((state) => state.subtitles.subtitles);

  console.log(getVideoMoreViews, "views");
  const userId = user && user._id; // Utilisez une vérification supplémentaire ici
  console.log(userId);

  useEffect(() => {
    if (userId) {
      getUser()
        .then((data) => {
          dispatch(setGetUser(data.user));
          console.log(data);
        })
        .then(async () => {
          await getVideoUnWatched(userId).then((data) => {
            console.log(data.unwatchedPreaches);
            dispatch(setGetVideoUnWatched(data.unwatchedPreaches));
          });
        })
        .catch((error) => {
          console.log(error);
          // <CircleLoader />;
          // setTimeout(() => {
          //   history("/login");
          // }, 5000);
        });
    }
  }, [userId]); // Assurez-vous que useEffect dépend de userId pour être exécuté lorsque userId change
  useEffect(() => {
    getVideo().then((data) => {
      dispatch(setGetVideo(data));
    });
  }, []);
  useEffect(() => {
    getVideo55().then((data) => {
      dispatch(setGetVideo55(data));
    });
  }, []);
  useEffect(() => {
    getVideoSubtitles().then((data) => {
      dispatch(setGetVideoSubtitles(data));
      console.log(data, "subtitles");
    });
  }, []);
  return (
    <div>
      {user ? (
        //  && videos?.length > 0
        <div>
          <Navbar />
          <br />
          <br />
          <br />
          <Banner videos={videos} />
          <Row
            isLarger={true}
            title="Les prédicateurs les plus écoutés"
            getVideoMoreViews={getVideoMoreViews}
          />
          <Row title="Une gamme de vidéo sous-titré" subtiles={subtitles} />
          <VideoList videosUnWatched={videosUnWatched} />
          {/* <Watch /> */}

          {/* <VideoPlayer /> */}
        </div>
      ) : (
        <CircleLoader />
      )}
    </div>
  );
};

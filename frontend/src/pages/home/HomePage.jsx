import React, { useEffect, useState } from "react";
import { dataImageSlider, movie } from "../../data/sliderImage";
import { Row } from "../../component/home/Row";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setGetUser } from "../../features/userReducer";
import { useNavigate } from "react-router-dom";
import { getUser, getVideo } from "../../endpoint/request";
import VideoPlayer from "../../component/home/VideoPlayer";
import Navbar from "../../component/home/navbar/Navbar";
import CircleLoader from "../../component/circle-loader";
import Banner from "../../component/banner";
import VideoList from "../../component/card";
axios.defaults.withCredentials = true;
export const HomePage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  console.log(userId);
  useEffect(() => {
    getUser()
      .then((data) => {
        dispatch(setGetUser(data.user));
        console.log(data);
      })
      .catch((error) => {
        // console.log(error);
        // <CircleLoader />;
        // setTimeout(() => {
        //   history("/login");
        // }, 5000);
      });
  }, []);
  useEffect(() => {
    getVideo(userId)
      .then((data) => {
        // dispatch(setGetUser(data.user));
        console.log(data);
        // setVideos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {!user ? (
        //  && videos?.length > 0
        <div>
          <Navbar />
          <Banner />
          <Row
            isLarger={true}
            title="Les prédicateurs les plus écoutés"
            movie={dataImageSlider}
          />
          <Row title="Une gamme de vidéo sous-titré" movie={movie} />
          <VideoList />

          {/* <VideoPlayer /> */}
        </div>
      ) : (
        <CircleLoader />
      )}
    </div>
  );
};

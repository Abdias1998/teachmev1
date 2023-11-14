import React, { useEffect } from "react";
import { dataImageSlider, movie } from "../../data/sliderImage";
import { Row } from "../../component/home/Row";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setGetUser } from "../../features/userReducer";
import { useNavigate } from "react-router-dom";
import request from "../../endpoint/request";
import VideoPlayer from "../../component/home/VideoPlayer";
import Navbar from "../../component/home/navbar/Navbar";
import CircleLoader from "../../component/circle-loader";
import Banner from "../../component/banner";
import VideoList from "../../component/card";
axios.defaults.withCredentials = true;
export const HomePage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const sendRequest = async () => {
    const res = await axios.get(`${request.user_info}`, {
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  };
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    sendRequest()
      .then((data) => {
        dispatch(setGetUser(data.user));
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        // <CircleLoader />;
        // setTimeout(() => {
        //   history("/login");
        // }, 5000);
      });
  });
  return (
    <div>
      {/* <Row isLarger={true} title="NETFLIX ORIGINAL" movie={dataImageSlider} />
      <Row title="Trending Now" movie={movie} /> */}
      {!user ? (
        <div>
          <Navbar />
          <Banner />
          <VideoList />

          {/* <VideoPlayer /> */}
        </div>
      ) : (
        <CircleLoader />
      )}
    </div>
  );
};

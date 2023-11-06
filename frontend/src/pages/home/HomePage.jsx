import React, { useEffect } from "react";
import { dataImageSlider, movie } from "../../data/sliderImage";
import { Row } from "../../component/home/Row";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setGetUser } from "../../features/userReducer";
import { useNavigate } from "react-router-dom";
import request from "../../endpoint/request";
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
        setTimeout(() => {
          history("/login");
        }, 5000);
      });
  });
  return (
    <div>
      {/* <Row isLarger={true} title="NETFLIX ORIGINAL" movie={dataImageSlider} />
      <Row title="Trending Now" movie={movie} /> */}
      <h1>{user.pseudo}</h1>
      <p>
        Besoin urgent d'un developpeur frontend react, de deux graphiste, d'un
        community manager , un administrateur réseau
      </p>
    </div>
  );
};

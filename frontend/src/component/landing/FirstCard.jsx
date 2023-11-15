import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { dataImageSlider } from "../../data/sliderImage";
export const FirstCard = ({
  titre,
  paragraph,
  slider,
  sliderMovie,
  isLarger,
}) => {
  //   const header = (
  //     <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
  // );
  function truncate(str, n) {
    return str?.length > n ? str?.substr(0, n - 1) + "..." : str;
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="m-4 " style={{ backgroundColor: "#111" }}>
        <h2 className=" ">{titre}</h2>
        <p className="mt-4">{paragraph}</p>
        <Slider {...settings}>
          {slider?.map((img, index) => {
            const header = (
              <img
                height={150}
                style={{ objectFit: "cover" }}
                alt="Card"
                src={img.url}
              />
            );
            const title = (
              <>
                <h1 style={{ color: "white" }} className="text-xl">
                  {truncate(img.title, 130)}
                </h1>
              </>
            );
            const subtitle = (
              <>
                <h3 style={{ color: "white" }} className="text-sm">
                  {img.des}
                </h3>
              </>
            );
            const footer = (
              <>
                <p style={{ color: "white" }} className="text-sm">
                  {truncate(img.text, 130)}
                </p>
              </>
            );
            return (
              <div className="mt-4 card flex justify-content-between ">
                <Card
                  title={title}
                  subTitle={subtitle}
                  footer={footer}
                  header={header}
                  className="hover m-2 "
                  style={{ backgroundColor: "#111" }}
                ></Card>
              </div>
            );
          })}
        </Slider>

        <div className={`ov `}>
          {sliderMovie?.map((el, index) => {
            return (
              <>
                <img
                  width={100}
                  style={{
                    opacity: 1,
                  }}
                  className={`im ${isLarger && "row_larger"}`}
                  src={isLarger ? el.url : el.url}
                  alt="Card"
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

import React from "react";
import { movie } from "../../data/sliderImage";

export const Row = ({ title, getVideoMoreViews, subtiles, isLarger }) => {
  console.log("getVideoMoreViews", getVideoMoreViews);
  return (
    <div>
      <h2 className="px-4 pt-4">{title}</h2>
      <div className={`ov `}>
        {getVideoMoreViews?.map((el, index) => {
          return (
            <>
              <h2 className="px-4 pt-4 bg-red-500">{el.title}</h2>
              <img
                key={el._id}
                width={100}
                className={`im ${isLarger && "row_larger"}`}
                src={isLarger ? el.coverImage : el.back_drop}
                alt=""
              />
            </>
          );
        })}
      </div>
      <div className={`ov `}>
        {subtiles?.map((el, index) => {
          return (
            <>
              <h2 className="px-4 pt-4 bg-red-500">{el.title}</h2>
              <img
                key={el._id}
                width={100}
                className={`im ${isLarger && "row_larger"}`}
                src={isLarger ? el.coverImage : el.back_drop}
                alt=""
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

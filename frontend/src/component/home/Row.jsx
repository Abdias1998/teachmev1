import React from "react";
import { movie } from "../../data/sliderImage";

export const Row = ({ title, movie, isLarger }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className={`ov `}>
        {movie.map((el, index) => {
          return (
            <>
              <img
                width={100}
                className={`im ${isLarger && "row_larger"}`}
                src={isLarger ? el.urlDrop : el.url}
                alt=""
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

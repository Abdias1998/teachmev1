import React from "react";

export default function CardLibraryListe({ title, movie }) {
  return (
    <div>
      <h4 style={{ fontWeight: 600 }} className="px-4">
        {title}
      </h4>
      <div className="flex align-content-center  justify-content-center align-items-center ">
        <div
          style={{ flexWrap: "wrap" }}
          className="flex justify-content-start align-items-center align-content-center  "
        >
          {movie?.map((el) => {
            return (
              // <img
              //   className="mx-1 md:mx-3 w-2 md:w-1  "
              //   src={el.url}
              //   alt=""
              //   style={{
              //     // width: "150px",
              //     // height: "100px",
              //     objectFit: "cover",
              //   }}
              // />
              <p>{el.title}</p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

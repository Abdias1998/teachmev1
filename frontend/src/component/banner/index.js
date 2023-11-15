// import React, { useState, useEffect } from "react";
// import "./index.css";
// import { Button } from "primereact/button";
// const films = [
//   {
//     id: 1,
//     title: "Titre du Film 1",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     image: "./assets/pastor/adeboye.jfif",
//     videoUrl: "lien_vers_la_video_1",
//   },
//   {
//     id: 2,
//     title: "Titre du Film 2",
//     description:
//       "Description du film 2. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Description du film 2. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Description du film 2. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     image: "./assets/movie/film1.jfif",
//     videoUrl: "lien_vers_la_video_2",
//   },
//   // ... Ajoute autant d'objets de film que nécessaire
// ];

// const Banner = () => {
//   const [currentFilmIndex, setCurrentFilmIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentFilmIndex((prevIndex) => (prevIndex + 1) % films.length);
//     }, 5000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   const currentFilm = films[currentFilmIndex];

//   return (
//     <div
//       className="banner"
//       style={{
// backgroundImage: `url(${currentFilm.image})`,
// backgroundSize: "cover",
// backgroundPosition: "center",
// position: "relative",
// backgroundRepeat: "no-repeat",
// objectFit: "cover",
// display: "flex",
// justifyContent: "center",
// alignItems: "center",
//         // width: "403px",
//         height: "403px", // Hauteur par défaut
//       }}
//     >
// <div
//   style={{
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: "20px",
//     color: "#fff",
//     width: "90%", // ajuster la largeur selon vos besoins
//   }}
// >
//   <h1>{currentFilm.title}</h1>
//   <p>
//     {currentFilm.description.length >= 300
//       ? currentFilm.description.slice(0, 300) + "..."
//       : currentFilm.description}
//   </p>
//   {/* <button onClick={() => window.open(currentFilm.videoUrl, "_blank")}>
//     Lecture
//   </button> */}
//   <br />
//   <Button style={{ background: "#111" }} label="Lire la vidéo" />
// </div>
//     </div>
//   );
// };

// export default Banner;

import React from "react";
import { useState, useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { medias } from "../../data/sliderImage";
import { Button } from "primereact/button";
import "./index.css";
const baseUrl = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % medias.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [medias]);

  const currentMedia = medias[currentMediaIndex];

  return (
    <div
      style={{
        backgroundImage: `url(${
          currentMedia?.backdrop_path || currentMedia?.poster_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        backgroundRepeat: "no-repeat",
        height: "350px",
        objectFit: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="flex-column space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 lg:pl-24"
    >
      <div className="relative h-[95vh] w-screen z-1">
        {/* <img
          src={`${currentMedia?.backdrop_path || currentMedia?.poster_path}`}
          alt="Banner"
          className="w-full h-full object-cover"
        /> */}
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-2" />
      </div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          color: "#fff",
          width: "90%", // ajuster la largeur selon vos besoins
        }}
      >
        <h1>{currentMedia?.title}</h1>
        <p>
          {currentMedia?.description.length >= 300
            ? currentMedia?.description.slice(0, 300) + "..."
            : currentMedia?.description}
        </p>

        <br />
        <Button label="Lire la vidéo" className="watch-button" />
      </div>
    </div>
  );
};

export default Banner;

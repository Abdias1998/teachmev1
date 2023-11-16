// import React from "react";
// import "./index.css";
// import { AiOutlineClockCircle, AiOutlineHeart } from "react-icons/ai";
// const videos = [
//   {
//     id: 1,
//     title: "Titre de la vidéo 1",
//     description:
//       "Description de la vidéo 1. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     thumbnail: "https://example.com/thumbnail1.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=videoid1",
//   },
//   {
//     id: 2,
//     title: "Titre de la vidéo 2",
//     description:
//       "Description de la vidéo 2. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     thumbnail: "https://example.com/thumbnail2.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=videoid2",
//   },
//   {
//     id: 3,
//     title: "Titre de la vidéo 3",
//     description:
//       "Description de la vidéo 3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     thumbnail: "https://example.com/thumbnail2.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=videoid2",
//   },
//   {
//     id: 4,
//     title: "Titre de la vidéo 4",
//     description:
//       "Description de la vidéo 4. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     thumbnail: "https://example.com/thumbnail2.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=videoid2",
//   },
//   {
//     id: 5,
//     title: "Titre de la vidéo 5",
//     description:
//       "Description de la vidéo 5. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     thumbnail: "https://example.com/thumbnail2.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=videoid2",
//   },
//   {
//     id: 6,
//     title: "Titre de la vidéo 6",
//     description:
//       "Description de la vidéo 6. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     thumbnail: "https://example.com/thumbnail2.jpg",
//     videoUrl: "https://www.youtube.com/watch?v=videoid2",
//   },
//   // Ajoute d'autres vidéos au besoin
// ];

// const VideoCard = ({ video }) => {
//   return (
//     <div className="card">
//       <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
//         <img
//           src={"./assets/large.webp"}
//           alt={video.title}
//           className="thumbnail"
//         />
//       </a>
//       <div className="content">
//         <h3>{video.title}</h3>
//         <p>{video.description}</p>

//         <div className="overlay">
//           <div className="overlay-icons">
//             <div className="tooltip">
//               <AiOutlineClockCircle className="watch-later-icon" />
//               <span class="tooltiptextlater">A Regarder plus tard</span>
//             </div>
//             <div className="tooltip">
//               <AiOutlineHeart className="favorite-icon" />
//               <span class="tooltiptextheart">Ajouter aux favoris</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const VideoList = () => {
//   return (
//     <div className="video-list">
//       {videos.map((video) => (
//         <VideoCard key={video.id} video={video} />
//       ))}
//     </div>
//   );
// };

// export default VideoList;

import React from "react";
import "./index.css";
import { AiOutlineClockCircle, AiOutlineHeart } from "react-icons/ai";
import CircleLoader from "../circle-loader";
import Favorite from "./favorite";
import WatchLater from "./watchLater";

const VideoCard = ({ video }) => {
  return (
    <div>
      <div className={`card`}>
        <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={"./assets/large.webp"}
            alt={video.title}
            className="thumbnail"
          />
        </a>

        <div className="content">
          <>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <div className="overlay">
              <div className="overlay-icons">
                <WatchLater videoId={video._id} />
                <Favorite videoId={video._id} video={video} />
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

const VideoList = ({ videosUnWatched }) => {
  return (
    <div>
      <h2 className="px-4 pt-4">Découvrez plus de vidéo de foi</h2>
      <div className="video-list">
        {videosUnWatched?.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoList;

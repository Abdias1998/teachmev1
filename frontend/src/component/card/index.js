import React from "react";
import "./index.css";
const videos = [
  {
    id: 1,
    title: "Titre de la vidéo 1",
    description:
      "Description de la vidéo 1. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    thumbnail: "https://example.com/thumbnail1.jpg",
    videoUrl: "https://www.youtube.com/watch?v=videoid1",
  },
  {
    id: 2,
    title: "Titre de la vidéo 2",
    description:
      "Description de la vidéo 2. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    thumbnail: "https://example.com/thumbnail2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=videoid2",
  },
  {
    id: 3,
    title: "Titre de la vidéo 3",
    description:
      "Description de la vidéo 3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    thumbnail: "https://example.com/thumbnail2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=videoid2",
  },
  {
    id: 4,
    title: "Titre de la vidéo 4",
    description:
      "Description de la vidéo 4. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    thumbnail: "https://example.com/thumbnail2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=videoid2",
  },
  {
    id: 5,
    title: "Titre de la vidéo 5",
    description:
      "Description de la vidéo 5. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    thumbnail: "https://example.com/thumbnail2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=videoid2",
  },
  {
    id: 6,
    title: "Titre de la vidéo 6",
    description:
      "Description de la vidéo 6. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    thumbnail: "https://example.com/thumbnail2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=videoid2",
  },
  // Ajoute d'autres vidéos au besoin
];

const VideoCard = ({ video }) => {
  return (
    <div className="card">
      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={"./assets/large.webp"}
          alt={video.title}
          className="thumbnail"
        />
      </a>
      <div className="content">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <div className="overlay-buttons">
          <button className="favorite-button">Add to Favorites</button>
          <button className="watch-later-button">Watch Later</button>
        </div>
        <a
          href={video.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="watch-button"
        >
          Watch Now
        </a>
      </div>
    </div>
  );
};

const VideoList = () => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;

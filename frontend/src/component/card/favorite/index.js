import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { addToFavorites } from "../../../endpoint/request";
import { useSelector } from "react-redux";

export default function Favorite({ videoId, video }) {
  const [addFavorite, setAddFavorite] = useState(false);
  const user = useSelector((state) => state.user.user);
  const userId = user._id;
  const favorites = user?.favorites;

  const isVideoInFavorites = favorites.includes(videoId);
  console.log(isVideoInFavorites, "isVideoInFavorites");
  console.log(favorites, "favorites");
  console.log(video, "videorecu");

  // const handleToggleFavorite = () => {
  //   if (isVideoInFavorites) {
  //     // Si la vidéo est déjà dans les favoris, la retirer
  //     setFavorites(favorites.filter((id) => id !== videoId));
  //   } else {
  //     // Si la vidéo n'est pas dans les favoris, l'ajouter
  //     setFavorites([...favorites, videoId]);
  //   }
  // };
  const handleAddTofavorite = () => {
    addToFavorites(userId, videoId)
      .then((data) => {
        console.log(data, "addfavorite");
      })
      .catch((err) => {
        console.log(err, "err favorite");
      });
  };

  return (
    <div className="tooltip">
      <AiOutlineHeart onClick={handleAddTofavorite} className="favorite-icon" />
      <span className="tooltiptextheart">Ajouter aux favoris</span>
    </div>
  );
}

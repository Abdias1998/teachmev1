import React, { useEffect, useState } from "react";
import CardLibraryListe from "./CardLibraryListe";
// import { movie } from "../../data/sliderImage";
import { getFavorites } from "../../endpoint/request";
import { useSelector } from "react-redux";

export default function CardLibrary() {
  const user = useSelector((state) => state.user.user);
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    getFavorites(user._id).then((data) => {
      console.log(data, "Favorites data");
      setMovie(data.favoritesVideos);
    });
  });
  return (
    <div>
      <CardLibraryListe title="Historique" />
      <CardLibraryListe title="A regarder plus tard" />
      <CardLibraryListe movie={movie} title="Vos favoris" />
    </div>
  );
}

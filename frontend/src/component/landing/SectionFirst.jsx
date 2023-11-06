import React from "react";
import { FirstCard } from "./FirstCard";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { dataImageSlider, movie } from "../../data/sliderImage";
export const SectionFirst = () => {
  return (
    <div>
      <FirstCard
        titre="Plus de 200 prédicateur selectionnées pour vous"
        paragraph=" Les prédicateurs sélectionnés représentent une variété de ministères
          chrétienne, permettant ainsi à chaque utilisateur de trouver des
          leaders selon leur conviction. Ces prédicateurs sont choisis pour leur
          sagesse, leur connaissance approfondie des écritures de la Bible et
          leur capacité à communiquer des enseignements complexes de manière
          claire et accessible. Ils peuvent aborder une variété de sujets, tels
          que la paix intérieure, la croissance spirituelle, la sanctification, le salut et la prière. Leurs enseignements offrent une source d'inspiration et renforce votre
          foi."
        slider={dataImageSlider}
      />
      <FirstCard
        titre="Les meilleures séries chrétiennes pour vous"
        paragraph="


        Découvrez une palette de séries africaines, européennes, et bien d'autres, issues de divers coins du globe. Plongez dans des histoires captivantes chrétienne venues d'Afrique, d'Europe, et d'autres continents. Qu'il s'agisse de drames, de comédies, ou de séries documentaires, vous trouverez une richesse de divertissements pour satisfaire tous les goûts et vous transporter dans des mondes fascinants. "
        sliderMovie={movie}
        isLarger={true}
      />
    </div>
  );
};

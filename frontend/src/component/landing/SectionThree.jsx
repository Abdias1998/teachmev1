import { Button } from "primereact/button";
import React from "react";

export const SectionThree = () => {
  function redirectTofacebook() {
    window.open(
      "https://www.facebook.com/profile.php?id=61553464604556",
      "_blank"
    );
  }
  return (
    <div className=" mt-4 mb-6 " style={{ background: "#111" }}>
      <div className="w-full bg-black flex flex-column md:flex-row justify-content-around align-items-center align-content-start ">
        <div className="w-12  md:w-6 p-4 ">
          <h2 className=" "> Profitez-en sur votre téléviseur</h2>
          <p className="mt-4 text-left  ">
            Découvrez une expérience spirituelle inégalée des enseignements et
            prédications sur votre téléviseur. Plongez-vous dans la sagesse des
            hommes de Dieu les plus respectés d'Afrique et du monde entier,
            depuis le confort de votre foyer. Avec une qualité d'image
            exceptionnelle et un son inspirant, vous pouvez désormais vivre des
            moments de foi et de réflexion sur grand écran.
          </p>

          <Button
            style={{ zIndex: "2", backgroundColor: "#E50913", color: "#fff" }}
            className="block md:inline ml-1 w-12 md:w-6 mt-4 md:h-2 h-1 text-sm  "
            label="Nous suivre sur Facebook"
            onClick={redirectTofacebook}
          />
          <Button
            style={{ zIndex: "2", backgroundColor: "#E50913", color: "#fff" }}
            className="block md:inline text-sm  w-12 md:w-6 mt-4 h-2 "
            label="Nous suivre sur Instagram"
          />
        </div>
        <div className="w-12 md:w-6">
          <img
            style={{ objectFit: "cover", maxHeight: "350px", width: "100%" }}
            className="w-full "
            src="./assets/images/watch.jpg"
            alt="watch"
          />
        </div>
      </div>
    </div>
  );
};

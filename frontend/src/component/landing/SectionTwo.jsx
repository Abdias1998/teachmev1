import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SectionTwo = () => {
  const history = useNavigate();
  function redirectToRegisterPage() {
    history("/register");
  }
  function redirectToYoutube() {
    window.open("https://www.youtube.com/@MoreofJesus-kb5uq", "_blank");
  }
  return (
    <div
      className=" mb-6 w-full bg-black flex flex-column-reverse md:flex-row justify-content-between align-items-start mt-4"
      style={{ background: "#111" }}
    >
      <div className="w-12 md:w-6">
        <img
          style={{ objectFit: "cover", maxHeight: "350px", width: "100%" }}
          className="w-full "
          src="./assets/images/download.jfif"
          alt="download"
        />
      </div>
      <div className="w-12  md:w-6 p-4  ">
        <h2>Téléchargez vos enseignements pour les regarder hors ligne </h2>
        <p className="mt-4">
          Vous pouvez télécharger les enseignements de vos choix pour les
          consulter hors ligne, à votre propre rythme. Inscrivez-vous
          gratuitement, explorez notre bibliothèque, et enrichissez votre vie
          spirituelle?
        </p>
        {/* <Button
          style={{ zIndex: "2", backgroundColor: "#E50913", color: "#fff" }}
          className="block md:inline text-sm w-12 md:w-6 mt-4 h-2 "
          label="Commencer l'inscription"
        /> */}
        <Button
          style={{ zIndex: "2", backgroundColor: "#E50913", color: "#fff" }}
          onClick={redirectToYoutube}
          className="block md:inline text-sm w-12 md:w-6 mt-4 h-2 "
          label="Abonnée vous a notre chaîne YouTube."
        />
      </div>
    </div>
  );
};

import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SectionTwo = () => {
  const history = useNavigate();
  function redirectToRegisterPage() {
    history("/register");
  }
  return (
    <div
      className="w-full bg-black flex flex-column-reverse md:flex-row justify-content-between align-items-start mt-2"
      style={{ background: "#111" }}
    >
      <div className="w-12 md:w-6">
        <img
          style={{ objectFit: "cover", maxHeight: "350px", width: "100%" }}
          className="w-full "
          src="./assets/images/download.jfif"
          alt=""
        />
      </div>
      <div className="w-12  md:w-6 p-4  ">
        <h2>Téléchargez vos enseignements pour les regarder hors ligne </h2>
        <p className="mt-4  text-left text-sm md:text-lg">
          Vous pouvez télécharger les enseignements de vos choix pour les
          consulter hors ligne, à votre propre rythme. Inscrivez-vous
          gratuitement, explorez notre bibliothèque, et enrichissez votre vie
          spirituelle?
        </p>
        <Button
          style={{ zIndex: "2", backgroundColor: "#E50913", color: "#fff" }}
          className="block md:inline text-sm md:text-lg w-12 md:w-6 mt-4 h-2 "
          label="Commencer l'inscription"
        />
      </div>
    </div>
  );
};

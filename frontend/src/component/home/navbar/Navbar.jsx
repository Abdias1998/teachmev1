import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <div className="h-2rem md:h-4rem w-full bg-red-500 shadow-8 relative  flex justify-content-between align-items-center align-content-center ">
      {/* Logo du plateforme */}
      <div>
        <h1 className="bg-green-500 text-sm md:text-lg px-4 ">TeachMe</h1>
      </div>
      {/* Les différentes pages */}
      <div className="hidden md:flex bg-green-500">
        {" "}
        <NavLink>Accueil</NavLink> <NavLink>Accueil</NavLink>{" "}
        <NavLink>Accueil</NavLink> <NavLink>Accueil</NavLink>{" "}
        <NavLink>Accueil</NavLink>
      </div>
      {/* Profil de l'utilisateur */}
      <div
        style={{ left: "2rem" }}
        className="bg-green-500 relative md:static px-4"
      >
        Profil
      </div>
      {/* Menu burger */}
      <div
        style={{ left: "2rem" }}
        className="block md:hidden bg-green-500 px-4 relative   "
      >
        <i className=""></i>
      </div>
      {/* Recherche */}
      <div className="px-4 bg-green-500">
        {" "}
        <i className="pi-align-justify"></i>
      </div>
    </div>
  );
}

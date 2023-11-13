import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

export default function Navbar({ user }) {
  return (
    <div className="h-2rem md:h-4rem w-full  shadow-8 relative  flex justify-content-between align-items-center align-content-center ">
      {/* Logo du plateforme */}
      <div>
        <h1 className=" text-sm md:text-lg px-4 ">TeachMe</h1>
      </div>
      {/* Les différentes pages */}
      <div className="hidden md:flex bg-green-500">
        {" "}
        <NavLink>Accueil</NavLink> <NavLink>Accueil</NavLink>{" "}
        <NavLink>Accueil</NavLink> <NavLink>Accueil</NavLink>{" "}
        <NavLink>Accueil</NavLink>
      </div>
      {/* Profil de l'utilisateur */}
      <div style={{ left: "2rem" }} className=" relative md:static px-4">
        <Avatar icon="pi pi-user" size="xlarge md:xlarge" shape="circle" />
      </div>
      {/* Menu burger */}
      <div
        style={{ left: "2rem" }}
        className="block md:hidden  px-4 relative   "
      >
        <i className="pi pi-align-left"></i>
      </div>
      {/* Recherche */}
      <div className="px-4 ">
        {" "}
        <i className="pi pi-search"></i>
      </div>
    </div>
  );
}

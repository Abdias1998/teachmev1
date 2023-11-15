import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "./index.css";

// Utilisation des icônes
const UserIcon = <FaUser />;
const SearchIcon = <FaSearch />;
const MenuIcon = <FaBars />;
const CloseIcon = <FaTimes />;

export default function Navbar({ user }) {
  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     const navbar = document.getElementById("navbar");
  //     const menu = document.getElementById("menu");

  //     if (
  //       navbar &&
  //       !navbar.contains(event.target) &&
  //       !menu.contains(event.target)
  //     ) {
  //       setCloseMenu(true);
  //     }
  //   };

  //   document.body.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.body.removeEventListener("click", handleClickOutside);
  //   };
  // }, [closeMenu]);

  return (
    <div
      id="navbar"
      className="h-3rem md:h-4rem w-full shadow-8 flex justify-content-between align-items-center align-content-center "
    >
      {/* Logo du plateforme */}
      <div>
        <h1 className="text-sm md:text-lg px-4">TeachMe</h1>
      </div>
      {/* Les différentes pages */}
      <div
        id="menu"
        className={` ${
          closeMenu &&
          "flex flex-column z-4 h-12 w-12 absolute top-100 bgColorActive"
        } hidden md:flex `}
      >
        <NavLink></NavLink>
        <NavLink>Accueil</NavLink>
        <NavLink>Accueil</NavLink>
        <NavLink>Accueil</NavLink>
        <NavLink>Paramètre</NavLink>
      </div>
      {/* Profil de l'utilisateur */}
      <div style={{ left: "2rem" }} className="relative md:static px-4">
        {UserIcon}
      </div>
      {/* Menu burger */}
      <div
        style={{ left: "2rem", cursor: "pointer" }}
        onClick={handleCloseMenu}
        className={`block md:hidden px-4 relative`}
      >
        {closeMenu ? CloseIcon : MenuIcon}
      </div>
      {/* Recherche */}
      <div className="px-4">{SearchIcon}</div>
    </div>
  );
}

import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../../features/userReducer"; // Importez le slice que vous avez créé

export const Heroes = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [emailLocal, setEmailLocal] = useState("");
  const email = useSelector((state) => state.user.user); // Accédez à l'adresse e-mail depuis l'état global

  function redirectToLoginPage() {
    history("/login");
  }
  const handleEmailChange = (e) => {
    setEmailLocal(e.target.value); // Mettez à jour l'adresse e-mail dans l'état global
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Enregistrez l'adresse e-mail dans l'état global ici
    dispatch(setEmail(emailLocal));
    console.log(email);
    history("/login");
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: "url('assets/images/fond.jfif')",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // height: "600px",
        // color: "white",
      }}
      className=" relative h-screen  "
    >
      <div className=" relative flex justify-content-between align-items-center align-content-center">
        {/* <img
          style={{}}
          className=""
          src="./assets/images/logo.png"
          alt="logo"
        /> */}
        <h1
          style={{ zIndex: "2", color: "#E50913" }}
          className="m-4 text-2xl md:text-4xl font-bold ml-6"
        >
          <img
            src="./assets/images/logo.jfif"
            width={70}
            height={70}
            style={{ borderRadius: "100%", objectFit: "cover" }}
            alt=""
          />
        </h1>
        {/* <p>
          <Button
            className="mr-6  text-sm md:text-md"
            style={{ zIndex: "2", backgroundColor: "#E50913", color: "#fff" }}
            label="Connexion"
            onClick={redirectToLoginPage}
          />
        </p> */}
        <p>
          <Button
            className="mr-6  text-sm md:text-md"
            style={{ zIndex: "2", backgroundColor: "#E50913", color: "#fff" }}
            label="Connexion"
            onClick={redirectToLoginPage}
          />
        </p>
      </div>
      <div className="flex flex-column justify-content-start align-items-center align-content-center mt-6">
        {/* <h1 className=" font-bold text-center m-4">
          Exploration Profonde de la Parole de Dieu par les Prédicateurs
          Renommés
        </h1> */}
        {/* <h2
          className=" text-center m-2
        "
        >
          Exploration Profonde de la Parole de Dieu par les Prédicateurs
          Africains Renommés{" "}
        </h2> */}
        {/* <h3 className="text-center p-2 m-1">
          Regarder vos vidéos sans abonnement ni publicité
        </h3> */}
        <p style={{ zIndex: "2" }}>
          {/* <form onSubmit={handleSubmit}>
            <InputText
              className="w-12 text-center  m:12 h-2 "
              placeholder="Email adress"
              style={{ color: "#FFF" }}
              value={emailLocal}
              onChange={handleEmailChange}
            />
          </form> */}
          {/* <Button
            type="submit"
            onClick={() => history("/register")}
            style={{ zIndex: "2", backgroundColor: "#E50913", color: "#fff" }}
            className="w-12 text-sm md:text-lg mt-4 h-2 "
            label="Commencer l'inscription"
          /> */}
        </p>
      </div>
      <div
        style={{
          zIndex: "1",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, .1), rgba(0, 0, 0, 1))",
        }}
        className="overlay"
      ></div>
    </div>
  );
};

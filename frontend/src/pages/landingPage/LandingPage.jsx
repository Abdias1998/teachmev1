import React from "react";
import { Heroes } from "../../component/landing/Heroe";
import { FirstCard } from "../../component/landing/FirstCard";
import { SectionTwo } from "../../component/landing/SectionTwo";
import { SectionThree } from "../../component/landing/SectionThree";
import { Footer } from "../../component/landing/Footer";
import "./index.css";
import { SectionFirst } from "../../component/landing/SectionFirst";
export const LandingPage = () => {
  return (
    <div>
      <div style={{ backgroundColor: "#111" }}>
        <Heroes />
        <br />
        <hr
          style={{
            background: "#232323",
            border: "1px solid black",
            height: "12px",
          }}
        />
        <SectionFirst />
        <br />
        <hr
          style={{
            background: "#232323",
            border: "1px solid black",
            height: "12px",
          }}
        />

        <SectionTwo />
        <br />
        <hr
          style={{
            background: "#232323",
            border: "1px solid black",
            height: "12px",
          }}
        />

        <SectionThree />
        <br />
        <hr
          style={{
            background: "#232323",
            border: "1px solid black",
            height: "12px",
          }}
        />

        <Footer />
      </div>
    </div>
  );
};

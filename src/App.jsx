// src/App.jsx
import React from "react";
import Theme from "./Theme";               // <-- add
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Websites from "./components/Websites";
import LogoShowCase from "./components/LogoShowCase";
import SocialMgmt from "./components/SocialMgmt";
import Projects from "./components/Projects";
import Badges from "./components/Badges";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Theme />                             {/* sets CSS variables from content.brandColor */}
      <Navbar />
      <Hero />
      <About />
      <Websites />
      <LogoShowCase />
      <SocialMgmt />
      <Projects />
      <Badges />
      <Contact />
      <Footer />
    </>
  );
}

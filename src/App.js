import React from "react";

import Header from "./components/Header.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

import "./styles/App.scss";

function App() {
  return (
    <>
      <Header></Header>
      <Portfolio></Portfolio>
      <Contact></Contact>
      <Footer></Footer>
    </>
  );
}

export default App;

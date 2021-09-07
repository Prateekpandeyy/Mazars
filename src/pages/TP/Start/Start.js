import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";


function Start() {
  return (
    <>
      <Header mtp="mtp"/>
      <div class="content_register">
        <Link to="/taxprofessional/login">
          <h1 style={{color: "#2b345f"}}>MTP LOGIN</h1>
          </Link>
      </div>
      <Footer />
    </>
  );
}

export default Start;

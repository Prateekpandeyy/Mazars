import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Common/CustomHeading";
import CustomHeading from "../../../components/Common/CustomHeading";


function Start() {
  return (
    <>
      <Header mtp="mtp"/>
      <div class="content_register">
        <Link to="/taxprofessional/login">
          <CustomHeading>
          Tax professional login
          </CustomHeading>
          {/* <h1 style={{color: "#2b345f"}}>Tax professional login</h1> */}
          </Link>
      </div>
    
    </>
  );
}

export default Start;

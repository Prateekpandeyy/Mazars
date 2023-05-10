import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import CustomHeading from "../../../components/Common/CustomHeading";


function Start() {
  return (
    <>
       <Header mtl="mtl"/>
      <div class="content_register">
        <Link to="/teamleader/login">
        <CustomHeading>
        Teamleader login
          </CustomHeading>
         </Link>
      </div>
     
    </>
  );
}

export default Start;

import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import CustomHeading from "../../../components/Common/CustomHeading";
function Start() {
  return (
    <>
      <Header admin="admin"/>
      <div className="content_register">
        <Link to="/admin/login">
          <CustomHeading>
          Admin login
          </CustomHeading>
        </Link>
      </div>
     
    </>
  );
}

export default Start;

import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import CustomHeading from "../../../components/Common/CustomHeading";

function Start() {
  return (
    <>
      <Header mtp="mtp" />
      <div className="content_register">
        <Link to="/taxprofessional/login">
          <CustomHeading>Tax professional login</CustomHeading>
        </Link>
      </div>
    </>
  );
}

export default Start;

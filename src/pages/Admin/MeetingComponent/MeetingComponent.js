
import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import Meeting from "../meeting/index";

function MeetingComponent(props) {
  const userid = window.localStorage.getItem("adminkey");
  const adminEmail = window.localStorage.getItem("adminkey");

  return (
   
      <Meeting id={props.match.params.id}
      adminEmail = {adminEmail} />
   
   
  );
}

export default MeetingComponent;
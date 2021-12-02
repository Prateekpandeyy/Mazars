import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import Meeting from "../meeting/index";

function MeetingComponent(props) {
  const userid = window.localStorage.getItem("tlkey");
  const tlEmail = window.localStorage.getItem("tlkey");

  return (
   
      <Meeting id={props.match.params.id} 
      tlEmail = {tlEmail}/>
 
  );
}

export default MeetingComponent;
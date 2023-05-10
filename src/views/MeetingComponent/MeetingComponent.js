import React from "react";
import Layout from "../../components/Layout/Layout";
import Meeting from "../../components/meeting/index";

function MeetingComponent(props) {
  const userId = window.localStorage.getItem("userid");
console.log("propsId", props)
  return (
    
      <Meeting id={props.match.params.id}/>
   
  );
}

export default MeetingComponent;

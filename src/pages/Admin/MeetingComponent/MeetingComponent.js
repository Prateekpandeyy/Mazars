import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import Meeting from "../meeting/index";

function MeetingComponent(props) {
  const userid = window.localStorage.getItem("adminkey");
  const adminEmail = window.localStorage.getItem("adminkey");
  console.log(
    "myid",
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ]
  );
  return (
    <Meeting
      id={
        window.location.pathname.split("/")[
          window.location.pathname.split("/").length - 1
        ]
      }
      adminEmail={adminEmail}
    />
  );
}

export default MeetingComponent;

import React from "react";
import Layout from "../../components/Layout/Layout";
import Meeting from "../../components/meeting/index";

function MeetingComponent(props) {
  const userId = window.localStorage.getItem("userid");

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Meeting />
    </Layout>
  );
}

export default MeetingComponent;

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Index from "../../components/InputRoom/index";

function VideoCall() {
  const userId = window.localStorage.getItem("userid");

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
        <Index />
    </Layout>
  );
}

export default VideoCall;

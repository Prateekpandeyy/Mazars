import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import {  useParams } from "react-router-dom";
import ProposalComponent from "./ProposalComponent";


function SendProposal() {
    const { id } = useParams();
  const userid = window.localStorage.getItem("tpkey");
  console.log("userid", userid)
  return (
    <>
   <Layout TPDashboard="TPDashboard" TPuserId={userid}>
        <ProposalComponent id={id}/>
      </Layout>
    </>
  );
}

export default SendProposal;

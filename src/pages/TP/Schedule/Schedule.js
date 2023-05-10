import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Recording from "../Recording/Recording";
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Demo from "./Demo";
import "../../Admin/AdminStyle/style.css";
function Schedule() {
    const userid = window.localStorage.getItem("tpkey");
    const [tabIndex, setTabIndex] = useState(0);
    const myStyle1 = {
      backgroundColor: "grey",
      padding: "12px",
      borderRadius: "50px",
      width: "200px",
      textAlign: "center",
      color: "white",
      cursor: "pointer",
    };
    const myStyle2 = {
      padding: "12px",
      borderRadius: "50px",
      width: "200px",
      textAlign: "center",
      backgroundColor: "blue",
      color: "white",
      cursor: "pointer",
    };
  
    return (
      <Layout TPDashboard="TPDashboard" TPuserId={userid}>
     <Demo />
    </Layout>
    );
}

export default Schedule;
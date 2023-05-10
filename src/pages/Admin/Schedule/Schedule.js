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
    const userid = window.localStorage.getItem("adminkey");
    const [tabIndex, setTabIndex] = useState(0);

  
    return (
        <Layout adminDashboard="adminDashboard" adminUserId={userid}>
     <Demo />
    </Layout>
    );
}

export default Schedule;
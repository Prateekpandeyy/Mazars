import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";


import AllAssignment from "./AllAssignment";
import DraftReportTab from "./DraftReportTab";
import DeliveryFinalTab from "./DeliveryFinalTab";



function QueriesTab(props) {
  const userid = window.localStorage.getItem("tpkey");
  const [tabIndex, setTabIndex] = useState(0);


  const [allAssignmentCount, setAllAssignmentCount] = useState("");
  const [draft, setDraft] = useState("");
  const [final, setFinal] = useState();


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


  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);




  useEffect(() => {

    const AllAssignment = () => {
      axios
        .get(`${baseUrl}/tl/getAssignments?tp_id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setAllAssignmentCount(res.data.result.length);
          }
        });
    };

    const getDraftReports = () => {
      axios
        .get(`${baseUrl}/tl/getAssignments?tp_id=${JSON.parse(userid)}&assignment_status=Draft_Report&stages_status=1`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setDraft(res.data.result.length);
          }
        });
    };

    const getFinalReports = () => {
      axios
        .get(`${baseUrl}/tl/getAssignments?tp_id=${JSON.parse(userid)}&assignment_status=Delivery_of_report&stages_status=1`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setFinal(res.data.result.length);
          }
        });
    };

    AllAssignment();
    getDraftReports();
    getFinalReports();
  }, []);



  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
      <div>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList
            style={{
              listStyleType: "none",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Tab style={tabIndex == 0 ? myStyle2 : myStyle1}>
              All Assignments ({allAssignmentCount})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
              Inprogress; Draft Reports ({draft})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Inprogress; Delivery of Final ({final})
            </Tab>
          </TabList>

          <TabPanel>
            <AllAssignment />
          </TabPanel>

          <TabPanel>
            <DraftReportTab />
          </TabPanel>

          <TabPanel>
            <DeliveryFinalTab />
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default QueriesTab;


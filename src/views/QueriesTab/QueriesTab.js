import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";

import AllQueriesData from "./AllQueriesData";
import InprogressAllocation from "./InprogressAllocation";
import InprogressProposal from "./InprogressProposal";
import DeclinedQueries from "./DeclinedQueries";




function QueriesTab(props) {

  const userId = window.localStorage.getItem("userid");


  const [tabIndex, setTabIndex] = useState(0);
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);


  const [allQueriesCount, setAllQueriesCount] = useState("");
  const [inprogressAllocation, setInprogressAllocation] = useState("");
  const [inprogressProposal, setInprogressProposal] = useState("");
  const [declined, setDeclined] = useState("");


  useEffect(() => {
    CountAllQuery();
    CountInprogressAllocation();
    CountInprogressProposal();
    CountDeclined();
  }, []);


  const CountAllQuery = (data) => {
    axios.get(`${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}`)
      .then((res) => {
       
        if (res.data.code === 1) {
          setAllQueriesCount(res.data.result.length);
        }
      });
  };

  const CountInprogressAllocation = () => {
    axios.get(`${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}&status=1`).then((res) => {
     
      if (res.data.code === 1) {
        setInprogressAllocation(res.data.result.length);
      }
    });
  };

  const CountInprogressProposal = () => {
    axios.get(`${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}&status=2`).then((res) => {
     
      if (res.data.code === 1) {
        setInprogressProposal(res.data.result.length);
      }
    });
  };

  const CountDeclined = () => {
    axios.get(`${baseUrl}/customers/declinedQueries?uid=${JSON.parse(userId)}`).then((res) => {
     
      if (res.data.code === 1) {
        setDeclined(res.data.result.length);
      }
    });
  };

  
  const myStyle1 = {
    backgroundColor: "rgb(120, 120, 120)",
    padding: "12px 24px",
    borderBottomLeftRadius: "1.75rem",
    width: "auto",
    textAlign: "center",
    color: "white",
    cursor: "pointer",
    margin: "10px auto"
  };
  const myStyle2 = {
    padding: "12px 24px",
   borderBottomLeftRadius: "1.75rem",
    width: "auto",
    textAlign: "center",
    backgroundColor: "rgb(61, 71, 117)",
    color: "white",
    cursor: "pointer",
    margin: "10px auto"
  };


  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
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
              All Queries ({allQueriesCount})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
              Inprogress; Queries({inprogressAllocation})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Completed; Queries ({inprogressProposal})
            </Tab>

            <Tab style={tabIndex == 3 ? myStyle2 : myStyle1}>
              Declined; Queries ({declined})
            </Tab>
          </TabList>

          <TabPanel>
            <AllQueriesData />
          </TabPanel>

          <TabPanel>
            <InprogressAllocation />
          </TabPanel>

          <TabPanel>
            <InprogressProposal />
          </TabPanel>

          <TabPanel>
            <DeclinedQueries />
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default QueriesTab;





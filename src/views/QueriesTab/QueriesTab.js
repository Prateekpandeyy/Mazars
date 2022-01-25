import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import AllQueriesData from "./AllQueriesData";
import InprogressAllocation from "./InprogressAllocation";
import InprogressProposal from "./InprogressProposal";
import DeclinedQueries from "./DeclinedQueries";
import style from './QueryStyle.module.css';



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
    display : "flex",
    backgroundColor: "grey",
    padding: "12px 24px",
    margin : "10px auto",
    borderRadius: "50px",
    width: "auto",
    textAlign: "center",
    color: "white",
    cursor: "pointer",
  };
  const myStyle2 = {
    display : "flex",
    padding: "12px 24px",
    margin : "10px auto",
    borderRadius: "50px",
    width: "auto",
    textAlign: "center",
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
  };

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div className={style.tabDivStyle}>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className={style.tabStyle}>
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





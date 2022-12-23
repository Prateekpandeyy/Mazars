import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";

import { Tab, Tabs, TabPanel, TabList } from "react-tabs";

import AllQueriesData from "./AllQueriesData";
import InprogressAllocation from "./InprogressAllocation";
import InprogressProposal from "./InprogressProposal";
import DeclinedQueries from "./DeclinedQueries";

function QueriesTab(props) {
  const userId = window.localStorage.getItem("userid");

  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

  const [tabIndex, setTabIndex] = useState(0);
  const [allQueriesCount, setAllQueriesCount] = useState([]);
  const [inprogressAllocation, setInprogressAllocation] = useState([]);
  const [inprogressProposal, setInprogressProposal] = useState([]);
  const [declined, setDeclined] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allResult, setAllResult] = useState({
    allQuery: 0,
    inprogressQuery: 0,
    completeQuery: 0,
    declinedQuery: 0,
  });
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    CountAllQuery();
    CountInprogressAllocation();
    CountInprogressProposal();
    CountDeclined();
  }, []);

  const CountAllQuery = (data) => {
    axios
      .get(
        `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setAllQueriesCount(res.data.result);
          setAllResult((preValue) => {
            return {
              ...preValue,
              allQuery: res.data.result.length,
            };
          });
        }
      });
  };

  const CountInprogressAllocation = () => {
    axios
      .get(
        `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
          userId
        )}&status=1`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setInprogressAllocation(res.data.result);
          setAllResult((preValue) => {
            return {
              ...preValue,
              inprogressQuery: res.data.result.length,
            };
          });
        }
      });
  };

  const CountInprogressProposal = () => {
    axios
      .get(
        `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
          userId
        )}&status=2`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setInprogressProposal(res.data.result);
          setAllResult((preValue) => {
            return {
              ...preValue,
              completeQuery: res.data.result.length,
            };
          });
        }
      });
  };

  const CountDeclined = () => {
    axios
      .get(
        `${baseUrl}/customers/declinedQueries?uid=${JSON.parse(userId)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          console.log("api called");
          setDeclined(res.data.result);
          setAllResult((preValue) => {
            return {
              ...preValue,
              declinedQuery: res.data.result.length,
            };
          });

          setLoading(true);
        }
      });
  };
  const tableIndex = (index) => {
    setTabIndex(index);
  };

  const myStyle1 = {
    margin: "10px auto",
    fontSize: "1rem",
  };
  const myStyle2 = {
    margin: "10px auto",
    fontSize: "1rem",
    color: "#55425f",
    fontWeight: 1000,
  };

  return (
    <>
      <Layout custDashboard="custDashboard" custUserId={userId}>
        {loading && (
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => tableIndex(index)}
          >
            <TabList className="fixedTab">
              <Tab
                style={tabIndex == 0 ? myStyle2 : myStyle1}
                className="tabHover"
              >
                All queries ({allResult.allQuery})
              </Tab>
              <Tab
                style={tabIndex == 1 ? myStyle2 : myStyle1}
                className="tabHover"
              >
                Inprogress; queries({allResult.inprogressQuery})
              </Tab>
              <Tab
                style={tabIndex == 2 ? myStyle2 : myStyle1}
                className="tabHover"
              >
                Completed; queries ({allResult.completeQuery})
              </Tab>

              <Tab
                style={tabIndex == 3 ? myStyle2 : myStyle1}
                className="tabHover"
              >
                Declined; queries ({allResult.declinedQuery})
              </Tab>
            </TabList>

            <TabPanel>
              <AllQueriesData
                setAllQueriesCount={setAllQueriesCount}
                allQueriesCount={allQueriesCount}
                CountAllQuery={CountAllQuery}
              />
            </TabPanel>

            <TabPanel>
              <InprogressAllocation
                setAllQueriesCount={setInprogressAllocation}
                allQueriesCount={inprogressAllocation}
                CountAllQuery={CountInprogressAllocation}
              />
            </TabPanel>

            <TabPanel>
              <InprogressProposal
                setAllQueriesCount={setInprogressProposal}
                allQueriesCount={inprogressProposal}
                CountAllQuery={CountInprogressProposal}
              />
            </TabPanel>

            <TabPanel>
              <DeclinedQueries
                setAllQueriesCount={setDeclined}
                allQueriesCount={declined}
                CountAllQuery={CountDeclined}
              />
            </TabPanel>
          </Tabs>
        )}
      </Layout>
    </>
  );
}

export default QueriesTab;

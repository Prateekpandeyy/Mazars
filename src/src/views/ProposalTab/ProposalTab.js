import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";


import AllProposal from "./AllProposal";
import InprogressProposal from "./InprogressProposal";
import AcceptedProposal from "./AcceptedProposal";
import DeclinedProposal from "./DeclinedProposal";




function Proposal(props) {
  const userId = window.localStorage.getItem("userid");

  const [tabIndex, setTabIndex] = useState(0);
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);


  const [allProposalCount, setAllProposalCount] = useState("");
  const [inprogressProposalCount, setInprogressProposalCount] = useState("");
  const [acceptedProposalCount, setAcceptedProposalCount] = useState("");
  const [declinedProposalCount, setDeclinedProposalCount] = useState("");


  useEffect(() => {
    getAllProposal();
    getInprogressProposal();
    getAcceptedProposal();
    getDeclinedProposal();
  }, []);


  const getAllProposal = () => {
    axios
      .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}`)
      .then((res) => {
        console.log(res);
        setAllProposalCount(res.data.result.length);
      });
  };

  const getInprogressProposal = () => {
    axios
      .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}&status=1`)
      .then((response) => {
        console.log("code---", response);
        if (response.data.code === 1) {
          setInprogressProposalCount(response.data.result.length);
        }
      })
  };

  const getAcceptedProposal = () => {
    axios
      .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}&status=2`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setAcceptedProposalCount(res.data.result.length);
        }
      });
  };

  const getDeclinedProposal = () => {
    axios
      .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}&status=3`)
      .then((response) => {
        console.log("code---", response);
        if (response.data.code === 1) {
          setDeclinedProposalCount(response.data.result.length);
        }
      })
  };



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


  console.log("allProposalCount", allProposalCount)


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
              All Proposals ({allProposalCount})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
              Inprogress; Proposals ({inprogressProposalCount})
            </Tab>

            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Accepted; Proposals ({acceptedProposalCount})
            </Tab>

            <Tab style={tabIndex == 3 ? myStyle2 : myStyle1}>
              Declined; Proposals ({declinedProposalCount})
            </Tab>
          </TabList>

          <TabPanel>
            <AllProposal />
          </TabPanel>

          <TabPanel>
            <InprogressProposal />
          </TabPanel>

          <TabPanel>
            <AcceptedProposal />
          </TabPanel>

          <TabPanel>
            <DeclinedProposal />
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default Proposal;





import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";

import AllProposalComponent from "../AllProposalComponent/AllProposalComponent";
import PendingForAcceptence from "../../../components/PendingForAcceptence/PendingForAcceptence";
import AcceptedProposal from "../AcceptedProposal/AcceptedProposal";
import DeclinedPropoal from "../DeclinedProposal/DeclinedPropoal";

function Proposal(props) {
  const userid = window.localStorage.getItem("adminkey");

  const [allProposalCount, setAllProposalCount] = useState("");
  const [pendingProposalCount, setPendingProposalCount] = useState("");
  const [acceptedProposalCount, setAcceptedProposalCount] = useState("");
  const [declinedProposalCount, setDeclinedProposalCount] = useState("");



  useEffect(() => {
    const getAllProposal = () => {
      axios
        .get(`${baseUrl}/admin/getProposals`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setAllProposalCount(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getAcceptedProposal = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?status1=2`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setAcceptedProposalCount(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getDeclinedProposal = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?&status=6`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setDeclinedProposalCount(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getPendingForAcceptence = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?status1=1`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setPendingProposalCount(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    getAllProposal();
    getAcceptedProposal();
    getDeclinedProposal();
    getPendingForAcceptence();
  }, []);

  const [tabIndex, setTabIndex] = useState(0);
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

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
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
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
              Inprogress; Proposals ({pendingProposalCount})
            </Tab>

            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Accepted; Proposals ({acceptedProposalCount})
            </Tab>

            <Tab style={tabIndex == 3 ? myStyle2 : myStyle1}>
              Customer Declined; Proposals ({declinedProposalCount})
            </Tab>
          </TabList>

          <TabPanel>
            <AllProposalComponent />
          </TabPanel>

          <TabPanel>
            <PendingForAcceptence />
          </TabPanel>

          <TabPanel>
            <AcceptedProposal />
          </TabPanel>

          <TabPanel>
            <DeclinedPropoal />
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default Proposal;


// const allProposal = (data) => {
//   setAllProposalCount(data);
// };

// const pendingProposal = (data) => {
//   setPendingProposalCount(data);
// };

// const acceptedProposal = (data) => {
//   setAcceptedProposalCount(data);
// };

// const declinedProposal = (data) => {
//   setDeclinedProposalCount(data);
// };

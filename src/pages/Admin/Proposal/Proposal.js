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
  const [bgColor, setbgColor] = useState("#42566a")

  const token = window.localStorage.getItem("adminToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  useEffect(() => {
    const getAllProposal = () => {
      axios
        .get(`${baseUrl}/admin/getProposals`, myConfig)
        .then((response) => {
          
          if (response.data.code === 1) {
            setAllProposalCount(response.data.result.length);
          }
        })
        .catch((error) => {
          
        });
    };

    const getAcceptedProposal = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?status1=2`, myConfig)
        .then((response) => {
          
          if (response.data.code === 1) {
            setAcceptedProposalCount(response.data.result.length);
          }
        })
        .catch((error) => {
          
        });
    };

    const getDeclinedProposal = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?&status=6`, myConfig)
        .then((response) => {
          
          if (response.data.code === 1) {
            setDeclinedProposalCount(response.data.result.length);
          }
        })
        .catch((error) => {
          
        });
    };

    const getPendingForAcceptence = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?status1=1`, myConfig)
        .then((response) => {
          
          if (response.data.code === 1) {
            setPendingProposalCount(response.data.result.length);
          }
        })
        .catch((error) => {
          
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

  const tableIndex = (index) => {
    setTabIndex(index)
    console.log(index)
    if(index === 0){
      setbgColor("#42566a")
    }
    else if(index === 1){
      setbgColor("#5f7b97")
    }
    else if(index === 2){
      setbgColor("#5f7b97")
    }
    else if(index === 3){
      setbgColor("#5f7b97")
    }
  }
  const myStyle1 = {
    margin: "10px auto",
    fontSize : "14px"
  };
  const myStyle2 = {
 margin: "10px auto",
 
 color : "#42566a",
 fontWeight : 1000
  };

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <div>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
          <TabList
className="fixedTab"
          >
            <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
              All proposals ({allProposalCount})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
              Inprogress; Proposals ({pendingProposalCount})
            </Tab>

            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
              Accepted; Proposals ({acceptedProposalCount})
            </Tab>

            <Tab style={tabIndex == 3 ? myStyle2 : myStyle1} className="tabHover">
              Client Declined; Proposals ({declinedProposalCount})
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


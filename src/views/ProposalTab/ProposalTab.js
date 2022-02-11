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

 
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

  const [tabIndex, setTabIndex] = useState(0);
  const [allProposalCount, setAllProposalCount] = useState("");
  const [inprogressProposalCount, setInprogressProposalCount] = useState("");
  const [acceptedProposalCount, setAcceptedProposalCount] = useState("");
  const [declinedProposalCount, setDeclinedProposalCount] = useState("");
  const [bgColor, setbgColor] = useState("#42566a")

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

        setAllProposalCount(res.data.result.length);
      });
  };

  const getInprogressProposal = () => {
    axios
      .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}&status=1`)
      .then((response) => {
      
        if (response.data.code === 1) {
          setInprogressProposalCount(response.data.result.length);
        }
      })
  };

  const getAcceptedProposal = () => {
    axios
      .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}&status=2`)
      .then((res) => {
       
        if (res.data.code === 1) {
          setAcceptedProposalCount(res.data.result.length);
        }
      });
  };

  const getDeclinedProposal = () => {
    axios
      .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}&status=3`)
      .then((response) => {
        
        if (response.data.code === 1) {
          setDeclinedProposalCount(response.data.result.length);
        }
      })
  };

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
    backgroundColor: "rgb(61, 71, 117)",
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
    backgroundColor: `${bgColor}`,
    color: "white",
    cursor: "pointer",
    margin: "10px auto"
  };


  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
    
      <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
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
     
    </Layout>
  );
}

export default Proposal;





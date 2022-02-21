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


  
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

  const [tabIndex, setTabIndex] = useState(0);
  const [allQueriesCount, setAllQueriesCount] = useState("");
  const [inprogressAllocation, setInprogressAllocation] = useState("");
  const [inprogressProposal, setInprogressProposal] = useState("");
  const [declined, setDeclined] = useState("");
  const [bgColor, setbgColor] = useState("#55425F")


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
const tableIndex = (index) => {
  setTabIndex(index)
  console.log(index)
  if(index === 0){
    setbgColor("#55425F")
  }
  else if(index === 1){
    setbgColor("#6e557b")
  }
  else if(index === 2){
    setbgColor("#6e557b")
  }
  else if(index === 3){
    setbgColor("#6e557b")
  }
}
  
const myStyle1 = {
  margin: "10px auto",
  fontSize : "14px"
};
const myStyle2 = {
margin: "10px auto",

color : "#55425f",
fontWeight : 1000
};


  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      
        <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
          <TabList className="fixedTab">
            <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
              All Queries ({allQueriesCount})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
              Inprogress; Queries({inprogressAllocation})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
              Completed; Queries ({inprogressProposal})
            </Tab>

            <Tab style={tabIndex == 3 ? myStyle2 : myStyle1} className="tabHover">
              Declined; Queries ({declined})
            </Tab>
          </TabList>

          <TabPanel>
            <AllQueriesData snWidth = {50}/>
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
     
    </Layout>
  );
}

export default QueriesTab;





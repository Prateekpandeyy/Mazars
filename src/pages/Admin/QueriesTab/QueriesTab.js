import React, { useState, useEffect, useLayoutEffect , createContext} from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import PendingForAllocation from "../../../components/PendingForAllocation/PendingForAllocation";
import PendingForProposals from "../../../components/PendingForProposals/PendingForProposals";
import DeclinedQueries from "../../../components/DeclinedQueries/DeclinedQueries";
import AllQueriesData from "../../../components/AllQueriesData/AllQueriesData";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";

function QueriesTab(props) {
  

  const userid = window.localStorage.getItem("adminkey");
  const [allData, setAllData] = useState()
  const [allQueriesCount, setAllQueriesCount] = useState("");
  const [pendingProposalCount, setPendingProposalCount] = useState("");
  const [declined, setDeclined] = useState("");
  const [inprogressAllocation, setInprogressAllocation] = useState();
  const [bgColor, setbgColor] = useState("#55425F")
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    CountAllQuery();
    CountInprogressAllocation();
    CountInprogressProposal();
    CountDeclined();
  }, []);


  const CountAllQuery = (data) => {
    axios.get(`${baseUrl}/admin/getAllQueries`).then((res) => {
     
      if (res.data.code === 1) {
        setAllQueriesCount(res.data.result.length);
        setAllData(res.data.result);
      }
    });
  };

  const CountInprogressAllocation = () => {
    axios.get(`${baseUrl}/admin/pendingAllocation`).then((res) => {
     
      if (res.data.code === 1) {
        setInprogressAllocation(res.data.result.length);
      }
    });
  };

  const CountInprogressProposal = () => {
    axios.get(`${baseUrl}/admin/pendingProposal`).then((res) => {
     
      if (res.data.code === 1) {
        setPendingProposalCount(res.data.result.length);
      }
    });
  };

  const CountDeclined = () => {
    axios.get(`${baseUrl}/admin/declinedQueries`).then((res) => {
     
      if (res.data.code === 1) {
        setDeclined(res.data.result.length);
      }
    });
  };



  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);


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
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
    
      
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="fixedTab">
            <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
              All Queries ({allQueriesCount})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
              Inprogress; Allocation ({inprogressAllocation})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
              Inprogress; Proposals ({pendingProposalCount})
            </Tab>

            <Tab style={tabIndex == 3 ? myStyle2 : myStyle1} className="tabHover">
              Declined Queries ({declined})
            </Tab>
          </TabList>

          <TabPanel>
            <AllQueriesData allData={allData}/>
          </TabPanel>

          <TabPanel>
            <PendingForAllocation />
          </TabPanel>

          <TabPanel>
            <PendingForProposals />
          </TabPanel>

          <TabPanel>
            <DeclinedQueries />
          </TabPanel>
        </Tabs>
     
     
    </Layout>
  );
}

export default QueriesTab;
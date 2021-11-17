import React, { useState, useEffect, useLayoutEffect , createContext} from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import PendingForAllocation from "../../../components/PendingForAllocation/PendingForAllocation";
import PendingForProposals from "../../../components/PendingForProposals/PendingForProposals";
import DeclinedQueries from "../../../components/DeclinedQueries/DeclinedQueries";
import AllQueriesData from "../../../components/AllQueriesData/AllQueriesData";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
const QueryData = createContext()
function QueriesTab(props) {
 

  const userid = window.localStorage.getItem("adminkey");
  const [allData, setAllData] = useState()
  const [allQueriesCount, setAllQueriesCount] = useState();
  const [pendingProposalCount, setPendingProposalCount] = useState("");
  const [allInprogressQuery, setAllInprogressQuery] = useState();
  const [declined, setDeclined] = useState("");
  const [allDeclinedQuery, setAllDeclinedQuery] = useState()
  const [inprogressAllocation, setInprogressAllocation] = useState();
  const [allInprogressAllocation, setAllInprogressAllocation] = useState()

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
        setAllInprogressAllocation(res.data.result)
      }
    });
  };

  const CountInprogressProposal = () => {
    axios.get(`${baseUrl}/admin/pendingProposal`).then((res) => {
     
      if (res.data.code === 1) {
        setPendingProposalCount(res.data.result.length);
        setAllInprogressQuery(res.data.result)
      }
    });
  };

  const CountDeclined = () => {
    axios.get(`${baseUrl}/admin/declinedQueries`).then((res) => {
     
      if (res.data.code === 1) {
        setDeclined(res.data.result.length);
        setAllDeclinedQuery(res.data.result);
      }
    });
  };


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
const qdata = {allData, allQueriesCount, setAllData, setAllQueriesCount, CountAllQuery,
  inprogressAllocation, allInprogressAllocation, setInprogressAllocation, setAllInprogressAllocation,  CountInprogressAllocation , 
  pendingProposalCount ,  allInprogressQuery,  setPendingProposalCount, setAllInprogressQuery, CountInprogressProposal, 
  allDeclinedQuery, declined, setDeclined, setAllDeclinedQuery, CountDeclined
}
  return (
    <>
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
  <QueryData.Provider value={qdata}>
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
              Inprogress; Allocation ({inprogressAllocation})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Inprogress; Proposals ({pendingProposalCount})
            </Tab>

            <Tab style={tabIndex == 3 ? myStyle2 : myStyle1}>
              Declined Queries ({declined})
            </Tab>
          </TabList>

          <TabPanel>
            <AllQueriesData />
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
      </div>
     </QueryData.Provider>
     
    </Layout>
    </>
  );
}

export default QueriesTab;
export {QueryData}


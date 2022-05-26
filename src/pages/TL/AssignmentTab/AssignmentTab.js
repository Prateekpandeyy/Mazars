import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";


import AllAssignment from "./AllAssignment";
import DraftReportTab from "./DraftReportTab";
import DeliveryFinalTab from "./DeliveryFinalTab";



function QueriesTab(props) {
  const userid = window.localStorage.getItem("tlkey");
  const [tabIndex, setTabIndex] = useState(0);


  const [allAssignmentCount, setAllAssignmentCount] = useState("");
  const [draft, setDraft] = useState("");
  const [final, setFinal] = useState();
  const [bgColor, setbgColor] = useState("#615339")
  const token = window.localStorage.getItem("tlToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  const tableIndex = (index) => {
    setTabIndex(index)
    console.log(index)
    if(index === 0){
      setbgColor("#615339")
    }
    else if(index === 1){
      setbgColor("#907b56")
    }
    else if(index === 2){
      setbgColor("#907b56")
    }
    else if(index === 3){
      setbgColor("#907b56")
    }
  }
    
  const myStyle1 = {
    margin: "10px auto"
  };
  const myStyle2 = {
    margin: "10px auto",
 
    color : "#5a625a",
    fontWeight : 1000
     };
  
  



  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);




  useEffect(() => {

    const AllAssignment = () => {
      axios
        .get(`${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(userid)}`, myConfig)
        .then((res) => {
          
          if (res.data.code === 1) {
            setAllAssignmentCount(res.data.result.length);
          }
        });
    };

    const getDraftReports = () => {
      axios
        .get(`${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(userid)}&assignment_status=Draft_Report&stages_status=1`, myConfig)
        .then((res) => {
          
          if (res.data.code === 1) {
            setDraft(res.data.result.length);
          }
        });
    };

    const getFinalReports = () => {
      axios
        .get(`${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(userid)}&assignment_status=Delivery_of_report&stages_status=1` , myConfig)
        .then((res) => {
          
          if (res.data.code === 1) {
            setFinal(res.data.result.length);
          }
        });
    };

    AllAssignment();
    getDraftReports();
    getFinalReports();
  }, []);



  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
         <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
      <TabList
          className="fixedTab"
          >
             
            <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
              All Assignments ({allAssignmentCount})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
              Inprogress; Draft Reports ({draft})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
              Inprogress; Delivery of Final Report({final})
            </Tab>
          </TabList>

          <TabPanel>
            <AllAssignment />
          </TabPanel>

          <TabPanel>
            <DraftReportTab />
          </TabPanel>

          <TabPanel>
            <DeliveryFinalTab />
          </TabPanel>
        </Tabs>
     
    </Layout>
  );
}

export default QueriesTab;


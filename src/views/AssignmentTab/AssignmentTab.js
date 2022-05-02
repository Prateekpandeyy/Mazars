import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";


import AllAssignment from "./AllAssignment";
import InprogressAssignment from "./InprogressAssignment";
import CompletedAssignment from "./CompletedAssignment";
import CustomerDeclinedPayment from "./CustomerDeclinedPayment";



function AssignmentTab(props) {
  const userId = window.localStorage.getItem("userid");

 
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

  const [tabIndex, setTabIndex] = useState(0);
  const [allassignment, setAllAssignment] = useState("");
  const [inprogressAssignmentCount, setInprogressAssignmentCount] = useState("");
  const [completeAssignment, setCompleteAssignment] = useState("");
  const [declinedAssignment, setDeclinedAssignment] = useState("");
  const [bgColor, setbgColor] = useState("#615339")
  const token = window.localStorage.getItem("clientToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }

  useEffect(() => {
    getAllAssignment();
    getInprogressAssignment();
    getCompletedAssignment();
    getCustomerDeclinedPayment();
  }, []);


  const getAllAssignment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`, myConfig)
      .then((res) => {
        
        setAllAssignment(res.data.result.length);
      });
  };

  const getInprogressAssignment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}&status=1`, myConfig)
      .then((response) => {
       
        if (response.data.code === 1) {
          setInprogressAssignmentCount(response.data.result.length);
        }
      })
  };

  const getCompletedAssignment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}&status=2`, myConfig)
      .then((res) => {
      
        if (res.data.code === 1) {
          setCompleteAssignment(res.data.result.length);
        }
      });
  };

  const getCustomerDeclinedPayment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}&status=3`, myConfig)
      .then((response) => {
     
        if (response.data.code === 1) {
          setDeclinedAssignment(response.data.result.length);
        }
      })
  };


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
  
  




  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
      <TabList
          className="fixedTab"
          >
            <Tab style={tabIndex === 0 ? myStyle2 : myStyle1} className="tabHover">
              All Assignment ({allassignment})
            </Tab>
            <Tab style={tabIndex === 1 ? myStyle2 : myStyle1} className="tabHover">
              Inprogress; Assignments ({inprogressAssignmentCount})
            </Tab>

            <Tab style={tabIndex === 2 ? myStyle2 : myStyle1} className="tabHover">
              Completed; Assignments ({completeAssignment})
            </Tab>

            <Tab style={tabIndex === 3 ? myStyle2 : myStyle1} className="tabHover">
              Client Declined; Payment ({declinedAssignment})
            </Tab>
          </TabList>

          <TabPanel>
            <AllAssignment />
          </TabPanel>

          <TabPanel>
            <InprogressAssignment />
          </TabPanel>

          <TabPanel>
            <CompletedAssignment />
          </TabPanel>

          <TabPanel>
            <CustomerDeclinedPayment />
          </TabPanel>
        </Tabs>
     
    </Layout>
  );
}

export default AssignmentTab;





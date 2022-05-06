import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import PendingForAcceptence from "../PendingForAcceptence/PendingForAcceptence";
import InCompleteData from "../InCompleteData/InCompleteData";
import CompleteData from "../CompleteData/CompleteData";
import DeclinedQuery from "../DeclinedQuery/DeclinedQuery";
import AllQuery from "./AllQuery";



function QueriesTab(props) {
  
  const userid = window.localStorage.getItem("tpkey");
  const [tabIndex, setTabIndex] = useState(0);
const [allQdata, setAllQdata] = useState([])
  const [pendindForAccepttence, setPendingForAcceptence] = useState("");
  const [incomplete, setIncomplete] = useState("");
  const [complete, setcomplete] = useState("");
const [incompleteData, setIncompleteData] = useState([])
  const [allQuery, setAllQuery] = useState("");
  const [declined, setDeclined] = useState("");
  const [bgColor, setbgColor] = useState("#55425F")
const [pendingData, setPendingData] = useState([])


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



  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);


  const token = window.localStorage.getItem("tptoken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
    const allQuery22 = () => {
      axios
        .get(`${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}`, myConfig)
        .then((res) => {
         
          if (res.data.code === 1) {
            setAllQuery(res.data.result.length);
            setAllQdata(res.data.result)
          }
        });
    };
  useEffect(() => {
    

    const getPendindForAccepttence = () => {
      axios
        .get(`${baseUrl}/tl/pendingQues?tp_id=${JSON.parse(userid)}`, myConfig)
        .then((res) => {
         
          if (res.data.code === 1) {
            setPendingData(res.data.result)
            setPendingForAcceptence(res.data.result.length);
          }
        });
    };

    const getIncomplete = () => {
      axios
        .get(`${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}&status=1`, myConfig)
        .then((res) => {
         
          if (res.data.code === 1) {
            setIncompleteData(res.data.result)
            setIncomplete(res.data.result.length);
          }
        });
    };

    const getComplete = () => {
     
      axios
     
        .get(`${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}&status=2`, myConfig)
        .then((res) => {
    
          if (res.data.code === 1) {
         
            setcomplete(res.data.result.length);
          }
        });
    };

    const Declined = () => {
   
      axios
        .get(`${baseUrl}/tl/declinedQueries?tp_id=${JSON.parse(userid)}`, myConfig)
        .then((res) => {
         
          if (res.data.code === 1) {
            setDeclined(res.data.result.length);
          }
        });
    };
  
    getPendindForAccepttence();
    getIncomplete();
    getComplete();
    allQuery22();
   
  }, []);

  const updateTab = (key) => {
    setTabIndex(key)
  }

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
    <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
          <TabList className="fixedTab">
            <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
              All Query ({allQuery})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover"> 
              Pending For Acceptance ({pendindForAccepttence})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
              Inprogress; Queries ({incomplete})
            </Tab>
       
          </TabList>


          <TabPanel>
            <AllQuery
           data = {allQdata}
           allQuery = {allQuery22}
           setAllQdata = {setAllQdata}
            />
          </TabPanel>
          <TabPanel>
            <PendingForAcceptence
            data= {pendingData}
              updateTab={updateTab}
            />
          </TabPanel>
          <TabPanel>
            <InCompleteData
            data={incompleteData}
            />
          </TabPanel>
         
        </Tabs>
    
    </Layout>
  );
}

export default QueriesTab;


 
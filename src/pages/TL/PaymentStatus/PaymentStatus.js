import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import AllPayment from "./AllPayment";
import Unpaid from "./Unpaid";
import Paid from "./Paid";



function QueriesTab(props) {
  const userId = window.localStorage.getItem("tlkey");
  const [tabIndex, setTabIndex] = useState(0);
  const [allPayment, setAllPayment] = useState("");
  const [paid, setPaid] = useState("");
  const [unpaid, setUnpaid] = useState("");
  const [bgColor, setbgColor] = useState("#2b5f55")

  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);



  


  useEffect(() => {
    getAllPaid();
    getPaid();
    getUnpaid();
  }, []);


  const getAllPaid = () => {
    axios
      .get(`${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userId)}`)
      .then((res) => {
       
        setAllPayment(res.data.result.length);
      });
  };

  const getPaid = () => {
    axios
      .get(`${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userId)}&status=1`)
      .then((res) => {
       
        setPaid(res.data.result.length);
      });
  };

  const getUnpaid = () => {
    axios
      .get(`${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userId)}&status=2`)
      .then((res) => {
       
        setUnpaid(res.data.result.length);
      });
  };


  
  const tableIndex = (index) => {
    setTabIndex(index)
    console.log(index)
    if(index === 0){
      setbgColor("#2b5f55")
    }
    else if(index === 1){
      setbgColor("#3e8678")
    }
    else if(index === 2){
      setbgColor("#3e8678")
    }
    else if(index === 3){
      setbgColor("#3e8678")
    }
  }
    
  const myStyle1 = {
    margin: "10px auto",
    fontSize : "14px"
  };
  const myStyle2 = {
 margin: "10px auto",

 color : "#2b5f55",
 fontWeight : 1000
  };





  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userId}>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
        <TabList
           className="fixedTab"
          >
            <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
              All Payment ({allPayment})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
              Unpaid ({paid})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
              Paid ({unpaid})
            </Tab>

          </TabList>

          <TabPanel>
            <AllPayment />
          </TabPanel>

          <TabPanel>
            <Unpaid />
          </TabPanel>

          <TabPanel>
            <Paid />
          </TabPanel>
        </Tabs>
      
    </Layout>
  );
}

export default QueriesTab;



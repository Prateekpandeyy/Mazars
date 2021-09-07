import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";


import AllPayment from "./AllPayment";
import Paid from "./Paid";
import Unpaid from "./Unpaid";




function PaymentStatus(props) {
  const userId = window.localStorage.getItem("adminkey");

  const [allPayment, setAllPayment] = useState("");
  const [paid, setPaid] = useState("");
  const [unpaid, setUnpaid] = useState("");


  useEffect(() => {
    getAllPaid();
    getPaid();
    getUnpaid();
  }, []);


  const getAllPaid = () => {
    axios
      .get(`${baseUrl}/tl/getUploadedProposals`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setAllPayment(res.data.result.length);
        }
      });
  };

  const getPaid = () => {
    axios
      .get(`${baseUrl}/tl/getUploadedProposals?status=1`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setPaid(res.data.result.length);
        }
      });
  };

  const getUnpaid = () => {
    axios
      .get(`${baseUrl}/tl/getUploadedProposals?status=2`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setUnpaid(res.data.result.length);
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

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>
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
              All Payment ({allPayment})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
              Unpaid ({paid})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Paid ({unpaid})
            </Tab>
          </TabList>
          <TabPanel>
            <AllPayment />
          </TabPanel>

          <TabPanel>
            <Paid />
          </TabPanel>

          <TabPanel>
            <Unpaid />
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default PaymentStatus;

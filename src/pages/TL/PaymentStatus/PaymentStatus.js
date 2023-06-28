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
  const [bgColor, setbgColor] = useState("#2b5f55");

  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);
  
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  useEffect(() => {
    getPaid();
    getAllPaid();
    getUnpaid();
  }, []);
  const getAllPaid = () => {
    axios
      .get(
        `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userId)}&count=1`,
        myConfig
      )
      .then((res) => {
        setAllPayment(res?.data?.result?.recordcount);
      });
  };

  const getPaid = () => {
    axios
      .get(
        `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
          userId
        )}&status=1&count=1`,
        myConfig
      )
      .then((res) => {
        setPaid(res?.data?.result?.recordcount);
      });
  };

  const getUnpaid = () => {
    axios
      .get(
        `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
          userId
        )}&status=2&count=1`,
        myConfig
      )
      .then((res) => {
        setUnpaid(res?.data?.result?.recordcount);
      });
  };

  const tableIndex = (index) => {
    setTabIndex(index);

    if (index === 0) {
      setbgColor("#2b5f55");
    } else if (index === 1) {
      setbgColor("#3e8678");
    } else if (index === 2) {
      setbgColor("#3e8678");
    } else if (index === 3) {
      setbgColor("#3e8678");
    }
  };

  const myStyle1 = {
    margin: "10px auto",
    fontSize: "18px",
    cursor: "pointer",
  };
  const myStyle2 = {
    margin: "10px auto",
    color: "#42566a",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userId}>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
        <TabList className="fixedTab">
          <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
            All payment ({allPayment})
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

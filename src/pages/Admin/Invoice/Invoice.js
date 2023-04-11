import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import CreateInvoice from "./CreateInvoice";
import Generated from "./Generated";
const InvoiceTab = () => {
  const userid = window.localStorage.getItem("adminkey");
  const [tabIndex, setTabIndex] = useState(0);
  const [bgColor, setbgColor] = useState("#42566a");

  const tableIndex = (index) => {
    setTabIndex(index);

    if (index === 0) {
      setbgColor("#42566a");
    } else if (index === 1) {
      setbgColor("#5f7b97");
    } else if (index === 2) {
      setbgColor("#5f7b97");
    } else if (index === 3) {
      setbgColor("#5f7b97");
    }
  };
  const myStyle1 = {
    margin: "10px auto",
    fontSize: "14px",
  };
  const myStyle2 = {
    margin: "10px auto",

    color: "#42566a",
    fontWeight: 1000,
  };

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="fixedTab">
          <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
            View invoice
          </Tab>
          <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
            Create invoice
          </Tab>
        </TabList>

        <TabPanel>
          <CreateInvoice />
        </TabPanel>

        <TabPanel>
          <Generated />
        </TabPanel>
      </Tabs>
      {/* <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
        <TabList className="fixedTab">
          <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
            View invoice
          </Tab>
          <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
            Create invoice
          </Tab>
        </TabList>

        <TabPanel>
          <Generated />
        </TabPanel>
        <TabPanel>
          <CreateInvoice />
        </TabPanel>
      </Tabs> */}
    </Layout>
  );
};
export default InvoiceTab;

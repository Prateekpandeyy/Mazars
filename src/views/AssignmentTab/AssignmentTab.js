import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import AdminAssignment from "./AdminAssignment";
import AllAssignment from "./AllAssignment";
import InprogressAssignment from "./InprogressAssignment";
import CompletedAssignment from "./CompletedAssignment";
import CustomerDeclinedPayment from "./CustomerDeclinedPayment";
import { useHistory } from "react-router-dom";
import { clientLogout } from "../../components/Logout/ClientLogout";

function AssignmentTab(props) {
  const userId = window.localStorage.getItem("userid");
  let history = useHistory();
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

  const [tabIndex, setTabIndex] = useState(0);
  const [allassignment, setAllAssignment] = useState("");
  const [inprogressAssignmentCount, setInprogressAssignmentCount] =
    useState("");
  const [completeAssignment, setCompleteAssignment] = useState("");
  const [declinedAssignment, setDeclinedAssignment] = useState("");
  const [adminDeclined, setAdminDecliend] = useState(0);
  const [bgColor, setbgColor] = useState("#615339");
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  useEffect(() => {
    getAllAssignment();
    getInprogressAssignment();
    getCompletedAssignment();
    getCustomerDeclinedPayment();
    getADminDeclinedPayment();
  }, []);

  const getAllAssignment = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setAllAssignment(res.data.total);
        } else if (res.data.code === 102) {
          clientLogout(axios, history);
        }
      });
  };

  const getInprogressAssignment = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
          userId
        )}&status=1`,
        myConfig
      )
      .then((response) => {
        if (response.data.code === 1) {
          setInprogressAssignmentCount(response.data.total);
        } else if (response.data.code === 102) {
          clientLogout(axios, history);
        }
      });
  };

  const getCompletedAssignment = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
          userId
        )}&status=2`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setCompleteAssignment(res.data.total);
        } else if (res.data.code === 102) {
          clientLogout(axios, history);
        }
      });
  };

  const getCustomerDeclinedPayment = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
          userId
        )}&status=3`,
        myConfig
      )
      .then((response) => {
        if (response.data.code === 1) {
          setDeclinedAssignment(response.data.total);
        } else if (response.data.code === 102) {
          clientLogout(axios, history);
        }
      });
  };

  const getADminDeclinedPayment = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignmentspermission?user=${JSON.parse(
          userId
        )}`,
        myConfig
      )
      .then((response) => {
        if (response.data.code === 1) {
          setAdminDecliend(response.data.total);
        } else if (response.data.code === 102) {
          clientLogout(axios, history);
        }
      });
  };

  const tableIndex = (index) => {
    setTabIndex(index);
    if (index === 0) {
      setbgColor("#615339");
    } else if (index === 1) {
      setbgColor("#907b56");
    } else if (index === 2) {
      setbgColor("#907b56");
    } else if (index === 3) {
      setbgColor("#907b56");
    }
  };

  const myStyle1 = {
    margin: "10px auto",
  };
  const myStyle2 = {
    margin: "10px auto",

    color: "#5a625a",
    fontWeight: 1000,
  };

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
        <TabList className="fixedTab">
          <Tab
            style={tabIndex === 0 ? myStyle2 : myStyle1}
            className="tabHover"
          >
            All assignment ({allassignment})
          </Tab>
          <Tab
            style={tabIndex === 1 ? myStyle2 : myStyle1}
            className="tabHover"
          >
            Inprogress; assignments ({inprogressAssignmentCount})
          </Tab>

          <Tab
            style={tabIndex === 2 ? myStyle2 : myStyle1}
            className="tabHover"
          >
            Completed; assignments ({completeAssignment})
          </Tab>

          <Tab
            style={tabIndex === 3 ? myStyle2 : myStyle1}
            className="tabHover"
          >
            Client declined; payment ({declinedAssignment})
          </Tab>
          <Tab
            style={tabIndex === 4 ? myStyle2 : myStyle1}
            className="tabHover"
          >
            Permission; to issue invoice ({adminDeclined})
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
        <TabPanel>
          <AdminAssignment />
        </TabPanel>
      </Tabs>
    </Layout>
  );
}

export default AssignmentTab;

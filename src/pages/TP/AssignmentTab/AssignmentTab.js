import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import AllAssignment from "./AllAssignment";
import DraftReportTab from "./DraftReportTab";
import DeliveryFinalTab from "./DeliveryFinalTab";
import AdminPermission from "./AdminPermission";
import ShowError from "../../../components/LoadingTime/LoadingTime";

function QueriesTab(props) {
  const userid = window.localStorage.getItem("tpkey");
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allAssignmentCount, setAllAssignmentCount] = useState("");
  const [draft, setDraft] = useState("");
  const [final, setFinal] = useState();
  const [bgColor, setbgColor] = useState("#615339");
  const [adminCount, setAdminCount] = useState(0);
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
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
    fontSize: "18px",
    cursor: "pointer",
  };
  const myStyle2 = {
    margin: "10px auto",
    fontSize: "18px",
    cursor: "pointer",
    color: "#5a625a",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

  useEffect(() => {
    const AllAssignment = () => {
      axios
        .get(
          `${baseUrl}/tl/getAssignments?tp_id=${JSON.parse(userid)}&count=1`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setAllAssignmentCount(res?.data?.result?.recordcount);
          }
        });
    };
    const getDraftReports = () => {
      axios
        .get(
          `${baseUrl}/tl/getAssignments?tp_id=${JSON.parse(
            userid
          )}&assignment_status=Draft_Report&stages_status=1&count=1`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setDraft(res?.data?.result?.recordcount);
          }
        });
    };
    const getFinalReports = () => {
      axios
        .get(
          `${baseUrl}/tl/getAssignments?tp_id=${JSON.parse(
            userid
          )}&assignment_status=Delivery_of_report&stages_status=1&count=1`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setFinal(res?.data?.result?.recordcount);
          }
        });
    };
    const AdminAssignment = () => {
      axios
        .get(
          `${baseUrl}/tl/getadminpermissiona?tp_id=${JSON.parse(
            userid
          )}&count=1`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setAdminCount(res?.data?.result?.recordcount);
          }
        });
    };
    AdminAssignment();
    AllAssignment();
    getDraftReports();
    getFinalReports();
  }, []);

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
        <TabList className="fixedTab">
          <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
            All Assignments ({allAssignmentCount})
          </Tab>
          <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
            Inprogress; Draft reports ({draft})
          </Tab>
          <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
            Inprogress; Delivery of final report ({final})
          </Tab>
          <Tab style={tabIndex == 3 ? myStyle2 : myStyle1} className="tabHover">
            Permission; to issue invoice ({adminCount})
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
        <TabPanel>
          <AdminPermission />
        </TabPanel>
      </Tabs>
    </Layout>
  );
}

export default QueriesTab;

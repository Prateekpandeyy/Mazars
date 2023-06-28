import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import AllAssignment from "./AllAssignment";
import DraftReportTab from "./DraftReportTab";
import DeliveryFinalTab from "./DeliveryFinalTab";
import AdminPermission from "./AdminPermission";

function QueriesTab(props) {
  const userid = window.localStorage.getItem("tlkey");
  const [tabIndex, setTabIndex] = useState(0);
  const [allAssignmentCount, setAllAssignmentCount] = useState("");
  const [draft, setDraft] = useState("");
  const [final, setFinal] = useState();
  const [permission, setPermission] = useState(0);
  const [bgColor, setbgColor] = useState("#615339");
  const token = window.localStorage.getItem("tlToken");
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
    fontWeight: "bold",
    textDecoration: "underline",
  };

  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

  useEffect(() => {
    const getAllAssigments = () => {
      axios
        .get(
          `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(userid)}&count=1`,
          myConfig
        )
        .then((res) => {
          // console.log("called", res.data.total);
          if (res.data.code === 1) {
            setAllAssignmentCount(res?.data?.total);
          }
        });
    };

    const getDraftReports = () => {
      axios
        .get(
          `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(
            userid
          )}&assignment_status=Draft_Report&stages_status=1&count=1`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setDraft(res?.data?.total);
          }
        });
    };

    const getFinalReports = () => {
      axios
        .get(
          `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(
            userid
          )}&assignment_status=Delivery_of_report&stages_status=1&count=1`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setFinal(res?.data?.total);
          }
        });
    };
    const getAdminPermissionCount = () => {
      axios
        .get(`${baseUrl}/tl/getadminpermissiona?count=1`, myConfig)
        .then((res) => {
          if (res.data.code === 1) {
            setPermission(res?.data?.total);
          }
        });
    };
    getAllAssigments();
    getDraftReports();
    getFinalReports();
    getAdminPermissionCount();
  }, []);

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
        <TabList className="fixedTab">
          <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
            All assignments ({allAssignmentCount})
          </Tab>
          <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
            Inprogress; Draft reports ({draft})
          </Tab>
          <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
            Inprogress; Delivery of final report({final})
          </Tab>
          <Tab style={tabIndex == 3 ? myStyle2 : myStyle1} className="tabHover">
            Permission; to issue invoice ({permission})
          </Tab>
        </TabList>

        <TabPanel>
          <AllAssignment setAllAssignmentCount={setAllAssignmentCount} />
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

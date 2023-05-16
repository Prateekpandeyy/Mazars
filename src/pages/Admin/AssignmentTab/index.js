import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import AssignmentComponent from "./AllAssignment";
import DraftReport from "./DraftReport";
import FinalReport from "./FinalReport";
import AdminPermission from "./AdminPermission";
function AssignmentTab(props) {
  const userid = window.localStorage.getItem("adminkey");

  const [allAssignmentCount, setAllAssignmentCount] = useState("");
  const [draft, setDraft] = useState("");
  const [final, setFinal] = useState();
  const [adminPermission, setAdminPermission] = useState(0);
  const [bgColor, setbgColor] = useState("#615339");
  const [tabIndex, setTabIndex] = useState(0);
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    CountAllAssignment();
    CountDraftReport();
    CountFinalReport();
    CountAdminPermission();
  }, []);

  const CountAllAssignment = (data) => {
    axios
      .get(`${baseUrl}/admin/getAssignments?count=1`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          setAllAssignmentCount(res?.data?.result?.recordcount);
        }
      });
  };

  const CountDraftReport = () => {
    axios
      .get(
        `${baseUrl}/admin/getAssignments?assignment_status=Draft_Report&stages_status=1&count=1`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setDraft(res?.data?.result?.recordcount);
        }
      });
  };

  const CountFinalReport = () => {
    axios
      .get(
        `${baseUrl}/admin/getAssignments?assignment_status=Delivery_of_report&stages_status=1&count=1`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFinal(res?.data?.result?.recordcount);
        }
      });
  };
  const CountAdminPermission = () => {
    axios
      .get(`${baseUrl}/admin/getadminpermissiona?count=1`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          setAdminPermission(res?.data?.result?.recordcount);
        }
      });
  };
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

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
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
        <TabList className="fixedTab">
          <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
            All assignments ({allAssignmentCount})
          </Tab>
          <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
            Inprogress; Draft reports ({draft})
          </Tab>
          <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
            Inprogress; Delivery of final reports ({final})
          </Tab>

          <Tab style={tabIndex == 3 ? myStyle2 : myStyle1} className="tabHover">
            Permission; to issue invoice ({adminPermission})
          </Tab>
        </TabList>

        <TabPanel>
          <AssignmentComponent />
        </TabPanel>

        <TabPanel>
          <DraftReport />
        </TabPanel>

        <TabPanel>
          <FinalReport />
        </TabPanel>
        <TabPanel>
          <AdminPermission />
        </TabPanel>
      </Tabs>
    </Layout>
  );
}

export default AssignmentTab;

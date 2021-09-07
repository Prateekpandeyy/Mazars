import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import AssignmentComponent from "./AllAssignment";
import DraftReport from "./DraftReport";
import FinalReport from "./FinalReport";

function AssignmentTab(props) {
    // console.log("queries tab: ", props);

    const userid = window.localStorage.getItem("adminkey");

    const [allAssignmentCount, setAllAssignmentCount] = useState("");
    const [draft, setDraft] = useState("");
    const [final, setFinal] = useState();


    useEffect(() => {
        CountAllAssignment();
        CountDraftReport();
        CountFinalReport();
    }, []);


    const CountAllAssignment = (data) => {
        axios.get(`${baseUrl}/tl/getAssignments`).then((res) => {
            console.log(res);
            if (res.data.code === 1) {
                setAllAssignmentCount(res.data.result.length);
            }
        });
    };

    const CountDraftReport = () => {
        axios.get(`${baseUrl}/tl/getAssignments?assignment_status=Draft_Report&stages_status=1`).then((res) => {
            console.log(res);
            if (res.data.code === 1) {
                setDraft(res.data.result.length);
            }
        });
    };

    const CountFinalReport = () => {
        axios.get(`${baseUrl}/tl/getAssignments?assignment_status=Delivery_of_report&stages_status=1`).then((res) => {
            console.log(res);
            if (res.data.code === 1) {
                setFinal(res.data.result.length);
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
        <Layout adminDashboard="adminDashboard" adminUserId={userid}>
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
                            All Assignments ({allAssignmentCount})
                        </Tab>
                        <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
                            Inprogress; Draft Reports  ({draft})
                        </Tab>
                        <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
                        Inprogress; Delivery of Final Reports ({final})
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
                </Tabs>
            </div>
        </Layout>
    );
}

export default AssignmentTab;


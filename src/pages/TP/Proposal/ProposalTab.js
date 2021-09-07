import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import AllProposal from "./AllProposal";
import InprogressProposal from "./InprogressProposal";
import AcceptedProposal from "./AcceptedProposal";
import DeclinedProposal from "./DeclinedProposal";




function ProposalTab(props) {
    const userid = window.localStorage.getItem("tpkey");
    const [tabIndex, setTabIndex] = useState(0);


    const [allProposal, setAllProposal] = useState("");
    const [inprogressProposal, setInprogressProposal] = useState("");
    const [acceptedProposal, setAcceptedProposal] = useState("");
    const [declinedProposal, setDeclinedProposal] = useState("");




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


    useLayoutEffect(() => {
        setTabIndex(props.location.index || 0);
    }, [props.location.index]);



    useEffect(() => {

        const AllProposal = () => {
            axios
                .get(`${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(userid)}`)
                .then((response) => {
                    console.log("code---", response);
                    if (response.data.code === 1) {
                        setAllProposal(response.data.result.length);
                    }
                })
        };

        const InprogressProposal = () => {
            axios
                .get(`${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(userid)}&status=1`)
                .then((response) => {
                    console.log("code---", response);
                    if (response.data.code === 1) {
                        setInprogressProposal(response.data.result.length);
                    }
                })
        };

        const AcceptedProposal = () => {
            axios
                .get(`${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(userid)}&status=2`)
                .then((response) => {
                    console.log("code---", response);
                    if (response.data.code === 1) {
                        setAcceptedProposal(response.data.result.length);
                    }
                })
        };

        const DeclinedProposal = () => {
            axios
                .get(`${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(userid)}&status=3`)
                .then((response) => {
                    console.log("code---", response);
                    if (response.data.code === 1) {
                        setDeclinedProposal(response.data.result.length);
                    }
                })
        };

        AllProposal();
        InprogressProposal();
        AcceptedProposal();
        DeclinedProposal();
    }, []);



    return (
        <Layout TPDashboard="TPDashboard" TPuserId={userid}>
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
                            All Proposals ({allProposal})
                        </Tab>
                        <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
                            Inprogress; Proposals ({inprogressProposal})
                        </Tab>
                        <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
                            Accepted; Proposals ({acceptedProposal})
                        </Tab>
                        <Tab style={tabIndex == 3 ? myStyle2 : myStyle1}>
                            Customer Declined; Proposals ({declinedProposal})
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <AllProposal />
                    </TabPanel>
                    <TabPanel>
                        <InprogressProposal />
                    </TabPanel>
                    <TabPanel>
                        <AcceptedProposal />
                    </TabPanel>
                    <TabPanel>
                        <DeclinedProposal />
                    </TabPanel>
                </Tabs>
            </div>
        </Layout>
    );
}

export default ProposalTab;



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
  const userid = window.localStorage.getItem("tlkey");
  const [tabIndex, setTabIndex] = useState(0);

  const [allProposal, setAllProposal] = useState("");
  const [inprogressProposal, setInprogressProposal] = useState("");
  const [acceptedProposal, setAcceptedProposal] = useState("");
  const [declinedProposal, setDeclinedProposal] = useState("");
  const [bgColor, setbgColor] = useState("#42566a");

  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const tableIndex = (index) => {
    setTabIndex(index);
    console.log(index);
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
    fontSize: "18px",
    cursor: "pointer",
  };
  const myStyle2 = {
    margin: "10px auto",

    color: "#42566a",
    fontSize: "18px",
    cursor: "pointer",
  };
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

  useEffect(() => {
    const AllProposal = () => {
      axios
        .get(
          `${baseUrl}/tl/getProposalTl?id=${JSON.parse(userid)}&count=1`,
          myConfig
        )
        .then((response) => {
          if (response.data.code === 1) {
            setAllProposal(response?.data?.result?.recordcount);
          }
        });
    };

    const InprogressProposal = () => {
      axios
        .get(
          `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
            userid
          )}&status=1&count=1`,
          myConfig
        )
        .then((response) => {
          if (response.data.code === 1) {
            setInprogressProposal(response?.data?.result?.recordcount);
          }
        });
    };

    const AcceptedProposal = () => {
      axios
        .get(
          `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
            userid
          )}&status=2&count=1`,
          myConfig
        )
        .then((response) => {
          if (response.data.code === 1) {
            setAcceptedProposal(response?.data?.result?.recordcount);
          }
        });
    };

    const DeclinedProposal = () => {
      axios
        .get(
          `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
            userid
          )}&status=3&count=1`,
          myConfig
        )
        .then((response) => {
          if (response.data.code === 1) {
            setDeclinedProposal(response?.data?.result?.recordcount);
          }
        });
    };

    AllProposal();
    InprogressProposal();
    AcceptedProposal();
    DeclinedProposal();
  }, []);

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
        <TabList className="fixedTab">
          <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
            All proposals ({allProposal})
          </Tab>
          <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
            Inprogress; Proposals ({inprogressProposal})
          </Tab>
          <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
            Accepted; Proposals ({acceptedProposal})
          </Tab>
          <Tab style={tabIndex == 3 ? myStyle2 : myStyle1} className="tabHover">
            Client Declined; Proposals ({declinedProposal})
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
    </Layout>
  );
}

export default ProposalTab;

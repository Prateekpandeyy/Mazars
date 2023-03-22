import React, { useState, useEffect, useLayoutEffect, Suspense } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import AllQuery from "./AllQuery";
import PendingForAcceptence from "../PendingForAcceptence/PendingForAcceptence";
import InCompleteData from "../InCompleteData/InCompleteData";
import CompleteData from "../CompleteData/CompleteData";
function QueriesTab(props) {
  const userid = window.localStorage.getItem("tlkey");
  const [tabIndex, setTabIndex] = useState(0);

  const [pendindForAccepttence, setPendingForAcceptence] = useState("");
  const [incomplete, setIncomplete] = useState("");
  const [complete, setcomplete] = useState("");

  const [allQuery, setAllQuery] = useState("");

  const [bgColor, setbgColor] = useState("#55425F");

  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const tableIndex = (index) => {
    setTabIndex(index);

    if (index === 0) {
      setbgColor("#55425F");
    } else if (index === 1) {
      setbgColor("#6e557b");
    } else if (index === 2) {
      setbgColor("#6e557b");
    } else if (index === 3) {
      setbgColor("#6e557b");
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
    color: "#55425f",
    cursor: "pointer",
  };

  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

  useEffect(() => {
    const getPendindForAccepttence = () => {
      axios
        .get(
          `${baseUrl}/tl/pendingQues?id=${JSON.parse(userid)}&count=1`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setPendingForAcceptence(res?.data?.result?.recordcount);
          }
        });
    };

    const getIncomplete = () => {
      axios
        .get(
          `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(
            userid
          )}&status=1&count=1`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setIncomplete(res?.data?.result?.recordcount);
          }
        });
    };

    const getComplete = () => {
      axios
        .get(
          `${baseUrl}/tl/pendingAllocation?uid=${JSON.parse(userid)}&count=1`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setcomplete(res?.data?.result?.recordcount);
          }
        });
    };

    // const Declined = () => {
    //   axios
    //     .get(`${baseUrl}/tl/declinedQueries?id=${JSON.parse(userid)}`, myConfig)
    //     .then((res) => {
    //       if (res.data.code === 1) {
    //         setDeclined(res.data.result.length);
    //       }
    //     });
    // };

    getPendindForAccepttence();
    getIncomplete();
    getComplete();
  }, []);

  const updateTab = (key) => {
    setTabIndex(key);
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
        <TabList className="fixedTab">
          <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
            All queries ({allQuery})
          </Tab>

          <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
            Inprogress; Queries ({incomplete})
          </Tab>
          <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
            Pending For acceptance ({pendindForAccepttence})
          </Tab>
          <Tab style={tabIndex == 3 ? myStyle2 : myStyle1} className="tabHover">
            Inprogress assignment to TP ({complete})
          </Tab>
        </TabList>

        <TabPanel>
          <AllQuery setAllQuery={setAllQuery} />
        </TabPanel>

        <TabPanel>
          <InCompleteData />
        </TabPanel>
        <TabPanel>
          <PendingForAcceptence updateTab={updateTab} />
        </TabPanel>
        <TabPanel>
          <CompleteData updateTab={updateTab} />
        </TabPanel>
      </Tabs>
    </Layout>
  );
}

export default React.memo(QueriesTab);

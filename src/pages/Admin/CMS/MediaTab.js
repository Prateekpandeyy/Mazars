import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { styled } from "@mui/material";
import { Container, Box, Paper } from "@material-ui/core";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import MediaContent from "./MediaContent";
import VideoMedia from "./VideoMedia";
import MediaText from "./MediaText";
const MyContainer = styled(Container)({});
const MediaTab = () => {
  const userId = window.localStorage.getItem("adminkey");
  const [tabIndex, setTabIndex] = useState(0);
  const [bgColor, setbgColor] = useState("#615339");
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
    <Layout cmsDashboard="cmsDashboard">
      <MyContainer>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
          <TabList className="fixedTab">
            <Tab
              style={tabIndex == 0 ? myStyle2 : myStyle1}
              className="tabHover"
            >
              Photo Gallery
            </Tab>
            <Tab
              style={tabIndex == 1 ? myStyle2 : myStyle1}
              className="tabHover"
            >
              Video Gallery
            </Tab>
            <Tab
              style={tabIndex == 2 ? myStyle2 : myStyle1}
              className="tabHover"
            >
              Media News
            </Tab>
          </TabList>

          <TabPanel>
            <MediaContent />
          </TabPanel>

          <TabPanel>
            <VideoMedia />
          </TabPanel>

          <TabPanel>
            <MediaText />
          </TabPanel>
        </Tabs>
      </MyContainer>
    </Layout>
  );
};
export default MediaTab;

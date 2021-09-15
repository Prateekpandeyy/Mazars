import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Recording from "../Recording/Recording";
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Demo from "./Demo";

function Schedule() {
    const userid = window.localStorage.getItem("tlkey");
    const [tabIndex, setTabIndex] = useState(0);
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
        <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
        <Row>
            <Col md="7">
              <CardTitle tag="h4">Schedule </CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList
            style={{
              listStyleType: "none",
              display: "flex",
              justifyContent: "space-around",
            }}
          > 
           <Tab style={tabIndex == 0 ? myStyle2 : myStyle1}>
            Scheduler
            </Tab>
           
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
           Meeting Records
            </Tab>
          </TabList>

          <TabPanel>
          <Demo />
          </TabPanel>
         
          <TabPanel>
           <Recording />
          </TabPanel>
          </Tabs>
         
        </CardHeader>
      
      </Card>
    </Layout>
    );
}

export default Schedule;
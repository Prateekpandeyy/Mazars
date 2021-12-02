import React from "react";
import Layout from "../../components/Layout/Layout";
import {
  Card,
  CardHeader,
 
  CardTitle,
  Row,
  Col,
 
} from "reactstrap";
import Demo from "./demo";



function Schedule() {
  const userId = window.localStorage.getItem("userid");

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
        <Row>
            <Col md="7">
              <CardTitle tag="h4">Schedule </CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
      
         
        </CardHeader>
    
      <Demo />
      
      </Card>
    </Layout>
  );
}

export default Schedule;

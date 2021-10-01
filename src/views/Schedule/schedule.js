import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import Demo from "./demo";
import Swal from "sweetalert2";

const thankyour = () => {
  Swal.fire({
    "title" : "Scuuess",
    html : `<h1>Thank you </h1>`,
    icon : "success"
  })
}
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

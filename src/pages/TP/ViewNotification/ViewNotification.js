import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import { useHistory, useParams } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Tooltip,
} from "reactstrap";
import CommonServices from "../../../common/common";

function ViewNotification() {
  const userid = window.localStorage.getItem("tpkey");
  const history = useHistory();
  const { id } = useParams();

  const [data, setData] = useState({});
  const token = window.localStorage.getItem("tptoken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  useEffect(() => {
    getChatting();
  }, [id]);

  const getChatting = () => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("uid", JSON.parse(userid));

    axios({
      method: "POST",
      url: `${baseUrl}/tl/viewNotification`,
      headers : {
        uit : token
      },
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setData(response.data.result[0]);
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  console.log("data-", data);

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button
                class="autoWidthBtn ml-3"
                onClick={() => history.goBack()}
              >
           
                Go Back
              </button>
            </Col>
            <Col md="4" align="center">
              <h4>Message Details</h4>
            </Col>
            <Col md="4"></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <table class="table table-bordered">
           
            <tbody>
              <tr>
                <th scope="row">Query No</th>
                <td>{data.assign_no}</td>
              </tr>
              <tr>
                <th scope="row"> Sender</th>
                <td>{data.name}</td>
              </tr>
              <tr>
                <th scope="row">Date</th>
                <td>
                  {CommonServices.removeTime(data.setdate)}
                </td>
              </tr>
              <tr>
                <th scope="row">Message</th>
                <td>{data.message}</td>
              </tr>
              <tr>
                <th scope="row">Type</th>
                <td>
                  {data.type}
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default ViewNotification;

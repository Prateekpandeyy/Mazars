import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Layout from "../../components/Layout/Layout";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import CommonServices from "../../common/common";

function ViewNotification() {
  const userId = window.localStorage.getItem("userid");
  const history = useHistory();
  const { id } = useParams();

  const [data, setData] = useState({});
  const token = window.localStorage.getItem("clientToken");

  const getChatting = () => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("uid", JSON.parse(userId));

    axios({
      method: "POST",
      url: `${baseUrl}/customers/viewNotification`,
      headers: {
        uit: token,
      },
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          setData(response.data.result[0]);
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getChatting();
  }, [id]);
  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
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
              <h4 className="contentTitle">Message Details</h4>
            </Col>
            <Col md="4"></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th className="contentTitle" scope="row">
                  Query no
                </th>
                <td>{data.assign_no}</td>
              </tr>
              <tr>
                <th className="contentTitle" scope="row">
                  {" "}
                  Sender
                </th>
                <td>{data.name}</td>
              </tr>
              <tr>
                <th className="contentTitle" scope="row">
                  Date
                </th>
                <td>{CommonServices.removeTime(data.setdate)}</td>
              </tr>
              <tr>
                <th className="contentTitle" scope="row">
                  Message
                </th>
                <td>{data.message}</td>
              </tr>
              <tr>
                <th className="contentTitle" scope="row">
                  Type
                </th>
                <td>{data.type}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default ViewNotification;

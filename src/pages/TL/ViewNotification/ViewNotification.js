import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import { useHistory, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
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
  const userid = window.localStorage.getItem("tlkey");
  const history = useHistory();
  const { id } = useParams();

  const [data, setData] = useState({});

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
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
            <Col md="8">
              <h4>Message Details</h4>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <table class="table table-bordered">
            {/* <thead>
              <tr>
                <th scope="col">Titles</th>
                <th scope="col">Data</th>
              </tr>
            </thead> */}
            <tbody>
              <tr>
                <th scope="row">Query No</th>
                <td>{data.assign_no}</td>
              </tr>
              <tr>
                <th scope="row"> System Generated</th>
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
                  {data.type == "1"
                    ? "Others"
                    : data.type == "2"
                      ? "Proposal Discussion"
                      : data.type == "3"
                        ? "Assignment Discussion"
                        : data.type == "4"
                          ? "Query Discussion"
                          :
                          data.type == "5"
                            ? "Payment Discussion"
                            :
                            null
                  }
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

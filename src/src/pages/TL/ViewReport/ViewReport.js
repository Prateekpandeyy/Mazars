import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, ReportUrl } from "../../../config/config";
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

function ViewReport() {
  const userid = window.localStorage.getItem("tlkey");
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

  const getReport = () => {
    let formData = new FormData();
    formData.append("assign_no", id);
    formData.append("uid", JSON.parse(userid));
    formData.append("stages_type", 2);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/getstagesinfo`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setData(response.data.result);
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

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
              <h4>ViewReport</h4>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div class="my-3">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="row">S.No</th>
                  <th scope="row">Report</th>
                </tr>
              </thead>
              {data.length > 0
                ? data.map((p, i) => (
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        {p.document && (
                          <p style={{ display: "flex" }}>
                            <a
                              href={`${ReportUrl}/${p.assign_no}/${p.document}`}
                              target="_blank"
                            >
                              <i class="fa fa-photo"></i>
                            </a>
                            <p style={{ marginLeft: "15px" }}>{p.document}</p>
                          </p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))
                : null}
            </table>
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default ViewReport;

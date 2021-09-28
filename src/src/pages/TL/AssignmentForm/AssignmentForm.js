import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl,ReportUrl } from "../../../config/config";
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
import { useForm } from "react-hook-form";

function AssignmentForm(props) {
  console.log("props", props.location.clients);

  const alert = useAlert();
  const { handleSubmit, register, errors, reset, setValue } = useForm();
  const history = useHistory();
  const { id } = useParams();
  const userid = window.localStorage.getItem("tlkey");
  const [assignNo, setAssignNo] = useState(null);
  const [data, setData] = useState([]);
  const [store, setStore] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    getAssignmentList();
  }, []);

  const getAssignmentList = () => {
    axios
      .get(`${baseUrl}/tl/getUploadedProposals?assign_no=${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data.result);
        if (res.data.code === 1) {
          setAssignNo(res.data.result[0].assign_no);
        }
      });
  };

  useEffect(() => {
    getDetails();
  }, [assignNo]);

  const getDetails = (value) => {
    console.log("value :", value);
    let formData = new FormData();
    formData.append("assign_no", assignNo);
    formData.append("uid", JSON.parse(userid));
    formData.append("stages_type", "client_discussion");

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

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("assign_id", id);
    formData.append("assign_no", assignNo);
    formData.append("uid", JSON.parse(userid));
    formData.append("stages_type", "client_discussion");
    formData.append("notes", value.p_notes);
    formData.append("receive_sent_date", value.p_date);
    formData.append("notes_type", value.p_type);
    formData.append("type_info", value.p_info);
    formData.append("upload", value.p_upload[0]);
    formData.append("send_received", item);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/addAssignmentStages`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success(<Msg />);
          getDetails();
          reset();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  //alert msg
  const Msg = () => {
    return (
      <>
        <p style={{ fontSize: "10px" }}>success</p>
      </>
    );
  };

  console.log("item - ", item);
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
              <h4>Client Discussion Information</h4>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          {props.location.clients == "completed" ? (
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Titles</label>
                      <textarea
                        className="form-control"
                        id="textarea"
                        rows="2"
                        name="p_notes"
                        ref={register}
                        disabled
                      ></textarea>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        name="p_date"
                        className="form-control"
                        ref={register}
                        disabled
                      />
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Upload Documents</label>
                      <input
                        type="file"
                        name="p_upload"
                        ref={register}
                        className="form-control-file"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Send/Received</label>
                      <select
                        class="form-control"
                        ref={register}
                        name="p_type"
                        onChange={(e) => setItem(e.target.value)}
                        disabled
                      >
                        <option value="">--select--</option>
                        <option value="send">Send</option>
                        <option value="received">Received</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Notes Type</label>
                      <select
                        class="form-control"
                        ref={register}
                        name="p_type"
                        onChange={(e) => setStore(e.target.value)}
                        disabled
                      >
                        <option value="">--select type--</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-2">
                    <div class="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Titles</label>
                      <textarea
                        className="form-control"
                        id="textarea"
                        rows="2"
                        name="p_notes"
                        ref={register}
                      ></textarea>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        name="p_date"
                        className="form-control"
                        ref={register}
                      />
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Upload Documents</label>
                      <input
                        type="file"
                        name="p_upload"
                        ref={register}
                        className="form-control-file"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Send/Received</label>
                      <select
                        class="form-control"
                        ref={register}
                        name="p_type"
                        onChange={(e) => setItem(e.target.value)}
                      >
                        <option value="">--select--</option>
                        <option value="send">Send</option>
                        <option value="received">Received</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Notes Type</label>
                      <select
                        class="form-control"
                        ref={register}
                        name="p_type"
                        onChange={(e) => setStore(e.target.value)}
                      >
                        <option value="">--select type--</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {store == "email" && (
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          name="p_info"
                          className="form-control"
                          ref={register}
                        />
                      </div>
                    </div>
                  )}

                  {store == "phone" && (
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Phone</label>
                        <input
                          type="text"
                          name="p_info"
                          className="form-control"
                          ref={register}
                        />
                      </div>
                    </div>
                  )}
                  {store == "other" && (
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Notes info</label>
                        <input
                          type="text"
                          name="p_info"
                          className="form-control"
                          ref={register}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div class="row">
                  <div class="col-md-2">
                    <div class="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </CardHeader>

        <CardBody>
          <CardHeader>
            <Row>
              <Col md="4">
                <h4>List</h4>
              </Col>
            </Row>
          </CardHeader>
          <div class="my-3">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="row">S.No</th>
                  <th scope="row">Documents</th>
                  <th scope="row">Titles</th>
                  <th scope="row">Notes type</th>
                  <th scope="row">Notes Info</th>
                  <th scope="row">Date</th>
                  <th scope="row">send/Received</th>
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
                      <td>{p.notes}</td>
                      <td>{p.notes_type}</td>
                      <td>{p.type_info}</td>
                      <td>{p.receive_sent_date}</td>
                      <td>{p.send_received}</td>
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

export default AssignmentForm;

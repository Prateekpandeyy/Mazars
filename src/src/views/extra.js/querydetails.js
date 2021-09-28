import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useParams, useHistory } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { baseUrl, baseUrl2 } from "../../config/config";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";

function MyAssingment() {
  const alert = useAlert();
  const { handleSubmit, register, reset } = useForm();

  const [submitData, setSubmitData] = useState([]);
  const [assingNo, setAssingmentNo] = useState();
  const [displayQuery, setDisplayQuery] = useState([]);
  const [diaplaySpecific, setDisplaySpecific] = useState([]);

  const [diaplayProposal, setDisplayProposal] = useState({
    amount: "",
    accepted_amount: "",
    payment_received: "",
    cust_accept_date: "",
    proposal_date: "",
  });

  const [diaplayAssignment, setDisplayAssignment] = useState([
    {
      assignment_number: "",
      assignment_date: "",
    },
  ]);

  const [diaplayHistory, setDisplayHistory] = useState([
    {
      tlname: "",
      date_of_allocation: "",
      date_of_delivery: "",
    },
  ]);

  const [addModal, setAddModal] = useState(false);
  const addHandler = () => setAddModal(!addModal);

  const { id } = useParams();
  const history = useHistory();
  const userId = window.localStorage.getItem("userid");

  const {
    amount,
    accepted_amount,
    payment_received,
    cust_accept_date,
    proposal_date,
  } = diaplayProposal;

  const {
    assignment_number,
    assignment_date,
    date_of_delivery,
  } = diaplayAssignment;
  const { tlname, date_of_allocation } = diaplayHistory;


  useEffect(() => {
    const getSubmittedAssingment = () => {
      axios.get(`${baseUrl}/customers/getQueryDetails?id=${id}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setSubmitData(res.data.result);
          setDisplaySpecific(res.data.additional_queries);
          setAssingmentNo(res.data.result[0].assign_no);

          if (res.data.proposal_queries.length > 0) {
            setDisplayProposal({
              accepted_amount: res.data.proposal_queries[0].accepted_amount,
              payment_received: res.data.proposal_queries[0].paid_amount,
              amount: res.data.proposal_queries[0].amount,
              cust_accept_date: res.data.proposal_queries[0].cust_accept_date,
              proposal_date: res.data.proposal_queries[0].created,
            });
          }

          if (res.data.assignment.length > 0) {
            setDisplayAssignment({
              assignment_number: res.data.assignment[0].assignment_number,
              assignment_date: res.data.assignment[0].created,
              date_of_delivery: res.data.assignment[0].date_of_delivery,
            });
          }
          if (res.data.history_queries.length > 0) {
            setDisplayHistory({
              tlname: res.data.history_queries[0].tname,
              date_of_allocation:
                res.data.history_queries[0].date_of_allocation,
            });
          }
        }
      });
    };
    getQuery();
    getSubmittedAssingment();
  }, [assingNo]);

  // console.log(diaplaySpecific);

  const getQuery = () => {
    axios
      .get(`${baseUrl}/tl/GetAdditionalQueries?assignno=${assingNo}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setDisplayQuery(res.data.result);
        }
      });
  };

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("assign_no", assingNo);
    formData.append("query", value.p_addqueri);
    formData.append("upload", value.p_upload[0]);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/PostAdditionalQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success(<Msg />);
          reset();
          getQuery();
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
        <p style={{ fontSize: "10px" }}>Additional Queries added</p>
      </>
    );
  };


  function proposalStatus(accepted) {
    console.log("accepted", accepted);
    if (accepted == 1) {
      return "accepted";
    } else {
      return "Pending";
    }
  }

  //change date format
  function ChangeFormateDate(oldDate) {
    console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

  //remove time with date
  function RemoveTime(oldDate) {
    console.log("RemoveTime - ", oldDate);

    var updatedate = oldDate.split(" ")[0];
    console.log(updatedate);
    if (updatedate == null) {
      return null;
    }
    return updatedate.toString().split("-").reverse().join("-");
  }

  // console.log("diaplayProposal -", amount);
  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="schedule">
            <h3>Query Detail</h3>
          </div>
        </div>

        <div class="col-xl-12 col-lg-12 col-md-12">
          {submitData.map((p, i) => (
            <div class="card" key={i}>
              <div
                class="card-header"
                id="headingOne"
                style={{ padding: ".5rem .1rem" }}
              >
                <h2 class="mb-0 query">
                  <button
                    class="btn btn-success ml-3"
                    onClick={() => history.goBack()}
                  >
                    <i class="fas fa-arrow-left mr-2"></i>
                    Go Back
                  </button>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <p class="m-0" style={{ fontSize: "15px" }}>
                      Submitted on
                    </p>
                    <p class="m-0" style={{ fontSize: "15px" }}>
                      : {ChangeFormateDate(p.created)}
                    </p>
                  </div>
                  <div class="d-flex">
                    <div class="additional">
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={addHandler}
                      >
                        Additional Query
                      </button>
                    </div>
                  </div>
                </h2>
              </div>

              <div class="card-body">
                <div>
                  <p
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: "18px",
                    }}
                  >
                    BASIC INFORMATION
                  </p>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Titles</th>
                        <th scope="col">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Query No</th>
                        <td>{p.assign_no}</td>
                      </tr>
                      <tr>
                        <th scope="row">Query Date</th>
                        <td>{ChangeFormateDate(p.created)}</td>
                      </tr>
                      <tr>
                        <th scope="row">Customer ID</th>
                        <td>{p.user_id}</td>
                      </tr>
                      <tr>
                        <th scope="row">Category</th>
                        <td>{p.cat_name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Sub- Category</th>
                        <td>{p.sub_cat_name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Name of the Case</th>
                        <td>{p.case_name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Assessment Year</th>
                        <td>{p.assessment_year}</td>
                      </tr>
                      <tr>
                        <th scope="row">Fact of the Case</th>
                        <td>{p.fact_case}</td>
                      </tr>
                      <tr>
                        <th scope="row">Uploaded Documents</th>
                        <td>
                          {p.upload_doc_1 == null ? (
                            ""
                          ) : (
                            <p>
                              <a
                                href={`${baseUrl2}/mazarapi/assets/image/${p.upload_doc_1}`}
                              >
                                <i class="fa fa-photo"></i>
                              </a>
                            </p>
                          )}

                          {p.upload_doc_2 == null ? (
                            ""
                          ) : (
                            <p>
                              <a
                                href={`${baseUrl2}/mazarapi/assets/image/${p.upload_doc_2}`}
                              >
                                <i class="fa fa-photo"></i>
                              </a>
                            </p>
                          )}

                          {p.upload_doc_3 == null ? (
                            ""
                          ) : (
                            <p>
                              <a
                                href={`${baseUrl2}/mazarapi/assets/image/${p.upload_doc_3}`}
                              >
                                <i class="fa fa-photo"></i>
                              </a>
                            </p>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">specific questions</th>
                        <td colspan="1">
                          {diaplaySpecific.map((p, i) => (
                            <p>{p.text}</p>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Purpose for which Opinion is sought</th>
                        <td colspan="1">{p.purpose_opinion}</td>
                      </tr>
                      <tr>
                        <th scope="row">Format in which Opinion is required</th>
                        <td colspan="1">
                          <p>
                            {p.softcopy_word === "1" && "Softcopy - Word/ Pdf"}
                          </p>
                          <p>
                            {p.softcopy_digitally_assigned === "1" &&
                              "SoftCopy- Digitally Signed"}
                          </p>

                          <p>
                            {p.printout_physically_assigned === "1" &&
                              "Printout- Physically Signed"}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          Timelines within which Opinion is Required
                        </th>
                        <td colspan="1">{p.Timelines}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <p
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: "18px",
                    }}
                  >
                    PROCESSING OF QUERY
                  </p>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Titles</th>
                        <th scope="col">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Date of Allocation</th>
                        <td>{ChangeFormateDate(date_of_allocation)}</td>
                      </tr>
                      <tr>
                        <th scope="row">Name of Team Leader</th>
                        <td>{tlname}</td>
                      </tr>
                      <tr>
                        <th scope="row">Name of Tax Professional(s)</th>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">Date of Proposal</th>
                        <td>{proposal_date}</td>
                      </tr>
                      <tr>
                        <th scope="row">Proposal Description</th>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">Proposed Amount</th>
                        <td>{amount}</td>
                      </tr>
                      <tr>
                        <th scope="row">Proposal Status</th>
                        <td>
                          </td>
                      </tr>
                      <tr>
                        <th scope="row">Amount Accepted</th>
                        <td>{accepted_amount}</td>
                      </tr>
                      <tr>
                        <th scope="row">Date of Acceptance</th>
                        <td>{cust_accept_date}</td>
                      </tr>
                      <tr>
                        <th scope="row">Payment Terms</th>
                        <td>
                          <tr>
                            <th>Date</th>
                            <th>Amount</th>
                          </tr>
                          <tr>
                            <td>{cust_accept_date}</td>
                            <td>{payment_received}</td>
                          </tr>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Payment Received</th>
                        <td>{payment_received}</td>
                      </tr>
                      <tr>
                        <th scope="row">Payment Due</th>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">Payment Outstanding</th>
                        <td>{accepted_amount - payment_received}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <p
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: "18px",
                    }}
                  >
                    PROCESSING OF ASSIGNMENT
                  </p>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Titles</th>
                        <th scope="col">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Assignment Number</th>
                        <td>{assignment_number}</td>
                      </tr>
                      <tr>
                        <th scope="row">Assignment Date</th>
                        <td>{assignment_date}</td>
                      </tr>
                      <tr>
                        <th scope="row">Proposed Date of Completion</th>
                        <td>{date_of_delivery}</td>
                      </tr>
                      {p.query_status >= 9 ? (
                        <tr>
                          <th scope="row">Assignment Status</th>
                          <td>
                            <tr>
                              <th>Assignment Stage</th>
                              <th>Status</th>
                            </tr>
                            <tr>
                              <td>Client Discussion</td>
                              <td>{p.client_discussion}</td>
                            </tr>
                            <tr>
                              <td>Draft report</td>
                              <td>{p.draft_report}</td>
                            </tr>
                            <tr>
                              <td>Final Discussion</td>
                              <td>{p.final_discussion}</td>
                            </tr>
                            <tr>
                              <td> Delivery of report</td>
                              <td>{p.draft_report}</td>
                            </tr>
                            <tr>
                              <td>Complete</td>
                              <td>{p.other_stage}</td>
                            </tr>
                          </td>
                        </tr>
                      ) : null}
                      <tr>
                        <th scope="row">
                          Time taken to complete the assignment
                        </th>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <p
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: "18px",
                    }}
                  >
                    ADDITIONAL QUERIES
                  </p>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "33.3%" }}>
                          Additional Queries
                        </th>
                        <th scope="col">Date Submission</th>
                        <th scope="col">Documents</th>
                      </tr>
                    </thead>
                    {displayQuery.map((p, i) => (
                      <tbody>
                        <tr key={i}>
                          <td>{p.additional_queries}</td>
                          <td>{ChangeFormateDate(p.created)}</td>
                          <td>
                            {p.upload_doc == "" ? (
                              ""
                            ) : (
                              <p>
                                <a
                                  href={`${baseUrl2}/mazarapi/assets/image/${p.upload_doc}`}
                                >
                                  <i class="fa fa-photo"></i>
                                </a>
                              </p>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          ))}

          <Modal isOpen={addModal} toggle={addHandler} size="md">
            <ModalHeader toggle={addHandler}>Add. Query</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Additional Queries</label>
                  <textarea
                    className="form-control"
                    id="textarea"
                    rows="6"
                    name="p_addqueri"
                    ref={register}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload Your Document</label>
                  <input
                    type="file"
                    name="p_upload"
                    ref={register}
                    className="form-control-file"
                  />
                </div>

                <div class="modal-footer">
                  <button
                    type="submit"
                    onClick={addHandler}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default MyAssingment;

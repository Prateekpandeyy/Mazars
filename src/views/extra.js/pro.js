import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import AcceptModal from "./AcceptModal";
import PaymentModal from "./PaymentModal";
import "./index.css";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import BootstrapTable from "react-bootstrap-table-next";

function ProposalTab() {
  const alert = useAlert();

  const userId = window.localStorage.getItem("userid");
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [proposalCount, setCountProposal] = useState("");

  const [id, setId] = useState(null);
  const [reject, setRejected] = useState(true);
  const [pay, setPay] = useState({
    pay: "",
    amount: "",
  });

  // accept modal
  const [acceptedModal, setAcceptedModal] = useState(false);
  const acceptedHandler = (id) => {
    setAcceptedModal(!acceptedModal);
    setId(id);
  };

  const [addPaymentModal, setPaymentModal] = useState(false);

  useEffect(() => {
    getProposalData();
  }, []);

  const getProposalData = () => {
    axios
      .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setProposalDisplay(res.data.result);
          setCountProposal(res.data.result.length);
        }
      });
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",
      style: {
        fontSize: "11px",
      },
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: "11px", width: "50px" };
      },
    },
    {
      text: "Date of Query",
      dataField: "created",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.created);
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <Link to={`/customer/my-assingment/${row.id}`}>
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      text: "Proposal No",
      dataField: "proposal_number",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Category",
      dataField: "parent_id",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Sub Category",
      dataField: "cat_name",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Date of Proposal",
      dataField: "DateofProposal",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.DateofProposal);
        var oldDate = row.DateofProposal;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Date of acceptance of Proposal",
      dataField: "cust_accept_date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Status",
      dataField: "status",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Proposed Amout",
      dataField: "ProposedAmount",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Amount Accepted",
      dataField: "accepted_amount",
      sort: true,
      style: {
        fontSize: "11px",
        color: "#21a3ce",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "#21a3ce" };
      },
    },
    {
      text: "Amount Paid",
      dataField: "paid_amount",
      sort: true,
      style: {
        fontSize: "11px",
        color: "#064606",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "#064606" };
      },
    },
    {
      text: "Date of Payment",
      dataField: "cust_paid_date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Amount Outstanding",
      dataField: "",
      sort: true,
      style: {
        fontSize: "11px",
        color: "darkred",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "darkred" };
      },
      formatter: function amountOutstading(cell, row) {
        console.log("dt", row.paid_amount);
        console.log("dt", row.accepted_amount);
        var p = row.paid_amount;
        var a = row.accepted_amount;
        if (p == 0) {
          return "0";
        } else return a - p;
      },
    },
    {
      text: "Date of Completion",
      dataField: "",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Action",
      dataField: "",
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function (cell, row) {
        // console.log(row.final_report);
        return (
          <>
            {row.statuscode === "6" ? null : (
              <div>
                {row.negotiated_amount === "0" &&
                row.accepted_amount === "0" ? (
                  <div>
                    <div style={{ cursor: "pointer" }}>
                      <i
                        class="fa fa-check"
                        style={{
                          color: "green",
                          fontSize: "16px",
                        }}
                        onClick={() => accepted(row.q_id)}
                      ></i>
                    </div>

                    <div style={{ cursor: "pointer" }}>
                      <i
                        class="fa fa-times"
                        style={{ color: "red", fontSize: "16px" }}
                        onClick={() => rejected(row.q_id)}
                      ></i>
                    </div>
                  </div>
                ) : (
                  (row.negotiated_amount === "0" || row.accepted_amount) && ""
                )}

                {row.statuscode == 5 ||
                row.statuscode == 7 ||
                row.statuscode == 8 ? (
                  <div>
                    <div style={{ cursor: "pointer" }}>
                      <i
                        class="fa fa-credit-card"
                        style={{ color: "green", fontSize: "16px" }}
                        onClick={() => paymentHandler(row)}
                      ></i>
                    </div>
                    <div style={{ cursor: "pointer" }}>
                      <i
                        class="fa fa-file-text"
                        style={{
                          color: "orange",
                          fontSize: "16px",
                        }}
                        onClick={() => acceptedHandler(row.up_id)}
                      ></i>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </>
        );
      },
    },
  ];

  const paymentHandler = (key) => {
    console.log(key);
    setPaymentModal(!addPaymentModal);
    setPay({
      amount: key.accepted_amount,
      id: key.q_id,
    });
  };

  // accepted proposal
  const accepted = (key) => {
    console.log("acc", key);

    let formData = new FormData();
    formData.append("id", key);
    formData.append("status", 5);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/ProposalAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          getProposalData();
          alert.success("proposal accepted !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  // rejected proposal
  const rejected = (key) => {
    console.log("rej", key);

    let formData = new FormData();
    formData.append("id", key);
    formData.append("status", 6);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/ProposalAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setRejected(false);
          getProposalData();
          alert.success("proposal rejected !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  //change date format
  function ChangeFormateDate(oldDate) {
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }


  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CardTitle tag="h4">Proposal ({proposalCount})</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <CustomerFilter
            setData={setProposalDisplay}
            getData={getProposalData}
            id={userId}
            proposal="proposal"
          />
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={proposalDisplay}
            columns={columns}
            classes="table-responsive"
          />

          <AcceptModal
            acceptedModal={acceptedModal}
            acceptedHandler={acceptedHandler}
            id={id}
            getProposalData={getProposalData}
          />

          <PaymentModal
            paymentHandler={paymentHandler}
            addPaymentModal={addPaymentModal}
            pay={pay}
            getProposalData={getProposalData}
          />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default ProposalTab;

{
  /* <div>
            <table class="table table-bordered ">
              <thead class="table_head_Proposal">
                <tr>
                  <th>S.No</th>
                  <th>Date of Query</th>
                  <th>Query No</th>
                  <th>Proposal No</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Date of Proposal</th>
                  <th>Date of acceptance of Proposal</th>
                  <th>Status</th>
                  <th>Proposed Amout</th>
                  <th style={{ color: "#21a3ce" }}>Amount Accepted</th>
                  <th style={{ color: "#064606" }}>Amount Paid</th>
                  <th>Date of Payment</th>
                  <th style={{ color: "darkred" }}>Amount Outstanding</th>
                  <th>Date of Completion</th>
                  <th>Action</th>
                </tr>
              </thead>
              {proposalDisplay.length > 0 ? (
                proposalDisplay.map((p, i) => (
                  <tbody class="table_bdy_proposal">
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{ChangeFormateDate(p.created)}</td>
                      <th>
                        <Link to={`/customer/my-assingment/${p.id}`}>
                          {p.assign_no}
                        </Link>
                      </th>
                      <td>{p.proposal_number}</td>
                      <td>{p.parent_id}</td>
                      <td>{p.cat_name}</td>
                      <td>{ChangeFormateDate(p.DateofProposal)}</td>
                      <td>{ChangeFormateDate(p.cust_accept_date)}</td>
                      <td>{p.status}</td>
                      <td>{p.ProposedAmount}</td>
                      <td style={{ color: "#21a3ce" }}>{p.accepted_amount}</td>
                      <td style={{ color: "#064606" }}>{p.paid_amount}</td>
                      <td>{ChangeFormateDate(p.cust_paid_date)}</td>
                      <td style={{ color: "darkred" }}>
                        {checkOutstading(p.paid_amount, p.accepted_amount)}
                      </td>
                      <td></td>

                      <td>
                        {p.statuscode === "6" ? null : (
                          <div>
                            {p.negotiated_amount === "0" &&
                            p.accepted_amount === "0" ? (
                              <div>
                                <div style={{ cursor: "pointer" }}>
                                  <i
                                    class="fa fa-check"
                                    style={{
                                      color: "green",
                                      fontSize: "16px",
                                    }}
                                    onClick={() => accepted(p.q_id)}
                                  ></i>
                                </div>

                                <div style={{ cursor: "pointer" }}>
                                  <i
                                    class="fa fa-times"
                                    style={{ color: "red", fontSize: "16px" }}
                                    onClick={() => rejected(p.q_id)}
                                  ></i>
                                </div>
                              </div>
                            ) : (
                              (p.negotiated_amount === "0" ||
                                p.accepted_amount) &&
                              ""
                            )}

                            {p.statuscode == 5 ||
                            p.statuscode == 7 ||
                            p.statuscode == 8 ? (
                              <div>
                                <div style={{ cursor: "pointer" }}>
                                  <i
                                    class="fa fa-credit-card"
                                    style={{ color: "green", fontSize: "16px" }}
                                    onClick={() => paymentHandler(p)}
                                  ></i>
                                </div>
                                <div style={{ cursor: "pointer" }}>
                                  <i
                                    class="fa fa-file-text"
                                    style={{
                                      color: "orange",
                                      fontSize: "16px",
                                    }}
                                    onClick={() => acceptedHandler(p.up_id)}
                                  ></i>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tr>
                  <td colSpan="16">No Records</td>
                </tr>
              )}

              
            </table>

          </div> */
}

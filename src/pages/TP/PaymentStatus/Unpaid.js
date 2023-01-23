import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

import { Link, useParams } from "react-router-dom";
import CommonServices from "../../../common/common";
import BootstrapTable from "react-bootstrap-table-next";
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import PaymentIcon from "@material-ui/icons/Payment";
import RejectedModal from "./RejectedModal";
import DiscardReport from "../AssignmentTab/DiscardReport";
import moment from "moment";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  PaymentDecline,
  Payment,
  ViewDiscussionIcon,
  DiscussProposal,
  HelpIcon,
} from "../../../components/Common/MessageIcon";

function AllPayment() {
  const { id } = useParams();
  const userid = window.localStorage.getItem("tpkey");
  const cust_id = window.localStorage.getItem("userid");
  const [records, setRecords] = useState([]);

  const [pay, setPay] = useState([]);
  const [count, setCount] = useState("");
  const [payment, setPayment] = useState([]);
  const [modal, setModal] = useState(false);
  const [addPaymentModal, setPaymentModal] = useState(false);
  const [assignNo, setAssignNo] = useState("");
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  var rowStyle2 = {};
  const rejectHandler = (key) => {
    setPaymentModal(!addPaymentModal);
    setAssignNo(key.assign_no);
  };

  useEffect(() => {
    getPaymentStatus();
  }, []);

  const getPaymentStatus = () => {
    axios
      .get(
        `${baseUrl}/tl/getUploadedProposals?tp_id=${JSON.parse(
          userid
        )}&status=1`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setPayment(res.data.result);
          setCount(res.data.result.length);
          setRecords(res.data.result.length);
        }
      });
  };
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
  };

  const toggle = (key) => {
    setModal(!modal);

    if (typeof key == "object") {
    } else {
      fetch(`${baseUrl}//admin/getPaymentDetail?id=${key}&&status=1`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/vnd.github.cloak-preview",
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          setPay(response.payment_detail);
        })
        .catch((error) => console.log(error));
    }
  };

  // Row Style
  rowStyle2 = (row, index) => {
    const style = {};
    var warningDate = moment(row.Exp_Delivery_Date).subtract(2, "day").toDate();
    // var warnformat = warningDate.format("YYYY-MM-DD");
    var aa = moment().toDate();

    if (
      row.paid_status != "2" &&
      row.status != "Complete" &&
      warningDate < aa
    ) {
      style.backgroundColor = "#c1d8f2";
      style.color = "#000111";
    }

    return style;
  };

  const columns = [
    {
      dataField: "",
      text: "S.no",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "query_created_date",
      text: "Date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.query_created_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "assign_no",
      text: "Query no",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/taxprofessional_queries/${row.assign_id}`,
                index: 1,
                routes: "paymentstatus",
              }}
            >
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      dataField: "parent_id",
      text: "Category",
      sort: true,
    },
    {
      dataField: "cat_name",
      text: "Sub category",
      sort: true,
    },
    {
      text: "Date of acceptance of proposal",
      dataField: "cust_accept_date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.cust_accept_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Status",
      dataField: "",

      formatter: function (cell, row) {
        return (
          <>
            {row.paid_status == "2" ? (
              <p style={{ color: "red" }}>{row.status} </p>
            ) : (
              <p>{row.status}</p>
            )}
          </>
        );
      },
    },
    {
      dataField: "accepted_amount",
      text: "Accepted amount ",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("en-US");
        var x = row.accepted_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Amount paid",
      dataField: "paid_amount",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("en-US");
        var x = row.paid_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },

    {
      text: "Outstanding amount",
      dataField: "amount_outstanding",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("en-US");
        var x = row.amount_outstanding;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Date of payment",
      dataField: "cust_paid_date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.cust_paid_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Action",

      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex" }}>
              <Link
                to={{
                  pathname: `/taxprofessional_chatting/${row.id}`,
                  index: 1,
                  routes: "paymentstatus",

                  obj: {
                    message_type: "4",
                    query_No: row.assign_no,
                    query_id: row.id,
                    routes: `/taxprofessional/paymentstatus`,
                  },
                }}
              >
                <MessageIcon />
              </Link>
              <div
                onClick={() => ViewDiscussionToggel(row.assign_no)}
                className="ml-1"
              >
                <ViewDiscussionIcon />
              </div>
              <Link
                to={{
                  pathname: `/taxprofessional_paydetails/${row.assign_id}`,
                  index: 1,
                  routes: "paymentstatus",
                }}
              >
                <Payment />
              </Link>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <TaxProfessionalFilter
            setData={setPayment}
            getData={getPaymentStatus}
            Unpaid="Unpaid"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>

        <CardBody>
          <DataTablepopulated
            bgColor="#3e8678"
            keyField={"assign_no"}
            rowStyle2={rowStyle2}
            data={payment}
            columns={columns}
          ></DataTablepopulated>

          <RejectedModal
            rejectHandler={rejectHandler}
            addPaymentModal={addPaymentModal}
            assignNo={assignNo}
            getPaymentStatus={getPaymentStatus}
          />
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getPaymentStatus}
            headColor="#3e8678"
          />
          <Modal isOpen={modal} fade={false} toggle={toggle}>
            <ModalHeader toggle={toggle}>History</ModalHeader>
            <ModalBody>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="row">S.No</th>
                    <th scope="row">Date of Payment</th>
                    <th scope="row">Amount</th>
                    <th scope="row">Payment Receipt</th>
                  </tr>
                </thead>
                {pay.length > 0
                  ? pay.map((p, i) => (
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{CommonServices.removeTime(p.payment_date)}</td>
                          <td>{p.paid_amount}</td>
                          <td>
                            <a href={p.receipt_url} target="_blank">
                              Payment Receipt
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    ))
                  : null}
              </table>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    </>
  );
}

export default AllPayment;

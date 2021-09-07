import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Layout from "../../components/Layout/Layout";
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
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import CommonServices from "../../common/common";
import BootstrapTable from "react-bootstrap-table-next";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import Records from "../../components/Records/Records";
import DiscardReport from "../AssignmentTab/DiscardReport";
import PaymentIcon from '@material-ui/icons/Payment';
import PaymentComponent from './PaymentComponent';


function Paid() {
  const alert = useAlert();
  const { id } = useParams();
  const userId = window.localStorage.getItem("userid");
  const [records, setRecords] = useState([]);


  const [count, setCount] = useState("");
  const [payment, setPayment] = useState([]);
  const [modal, setModal] = useState(false);

  const [pay, setPay] = useState({
    pay: "",
    amount: "",
    accepted_amount: "",
    paid_amount: "",
    assign_id: '',

    amount_type: "",
    amount_fixed: "",
    amount_hourly: "",

    payment_terms: "",
    no_of_installment: "",
    installment_amount: "",
    due_date: "",
  });

  const [addPaymentModal, setPaymentModal] = useState(false);
  const paymentHandler = (key) => {
    setPaymentModal(!addPaymentModal);
    setPay({
      amount: key.accepted_amount,
      assign_id: key.assign_id,
      accepted_amount: key.accepted_amount,
      paid_amount: key.paid_amount,

      amount_type: key.amount_type,
      amount_fixed: key.amount_fixed,
      amount_hourly: key.amount_hourly,


      payment_terms: key.payment_terms,
      no_of_installment: key.no_of_installment,
      installment_amount: key.installment_amount,
      due_date: key.due_date,

    });
  };

  const [assignNo, setAssignNo] = useState('');
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }

  useEffect(() => {
    getPaymentStatus();
  }, []);


  const getPaymentStatus = () => {
    axios.get(`${baseUrl}/tl/getUploadedProposals?cid=${JSON.parse(userId)}&status=1`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPayment(res.data.result);
        setCount(res.data.result.length);
        setRecords(res.data.result.length);

      }
    });
  };

  const toggle = (key) => {
    console.log("key", key);
    setModal(!modal);

    fetch(`${baseUrl}/admin/getPaymentDetail?id=${key}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setPay(response.payment_detail);
      })
      .catch((error) => console.log(error));
  };


  const columns = [
    {
      dataField: "",
      text: "S.No",
      formatter: (row, rowIndex) => {
        return rowIndex + 1;
      },
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "query_created_date",
      text: "Date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.query_created_date);
        var oldDate = row.query_created_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "assign_no",
      text: "Query No",
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
            <Link
              to={{
                pathname: `/customer/my-assingment/${row.assign_id}`,
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
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
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
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.cust_accept_date);
        var oldDate = row.cust_accept_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Status",
      dataField: "status",
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "accepted_amount",
      text: "Accepted Amount ",
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
        return a - p;
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
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.cust_paid_date);
        var oldDate = row.cust_paid_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Action",
      dataField: "",
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px", width: "90px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>

              <div>
                {
                  row.paid_status == "0" ?
                    <div
                      style={{ cursor: "pointer" }}
                      title="Pay Amount"
                      onClick={() => paymentHandler(row)}>
                      <PaymentIcon color="primary" />
                    </div>
                    :
                    null
                }
              </div>

              {
                row.paid_amount > 0 ? <div style={{ cursor: "pointer" }} title="Payment History">
                  <i
                    class="fa fa-credit-card"
                    style={{ color: "green", fontSize: "16px" }}
                    onClick={() => toggle(row.assign_id)}
                  ></i>
                </div>
                  :
                  null
              }


              <div title="Send Message">
                <Link
                  to={{
                    pathname: `/customer/chatting/${row.assign_id}`,
                    obj: {
                      message_type: "2",
                      query_No: row.assign_no,
                      query_id: row.q_id,
                      routes: `/customer/proposal`
                    }
                  }}
                >
                  <i
                    class="fa fa-comments-o"
                    style={{
                      fontSize: 16,
                      cursor: "pointer",
                      color: "blue"
                    }}
                  ></i>
                </Link>
              </div>
              <div title="View Discussion Message">
                <i
                  class="fa fa-comments-o"
                  style={{
                    fontSize: 16,
                    cursor: "pointer",
                    color: "orange"
                  }}
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                ></i>
              </div>
            </div>
          </>
        );
      },
    },
  ];




  return (
    <>
      <>
        <Card>

          <CardHeader>
            <CustomerFilter
              setData={setPayment}
              getData={getPaymentStatus}
              paid="paid"
              setRecords={setRecords}
              records={records}
              id={userId}
            />
          </CardHeader>

          <CardBody>
            <Records records={records} />
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={payment}
              columns={columns}
              classes="table-responsive"
            />

            <Modal isOpen={modal} fade={false} toggle={toggle}>
              <ModalHeader toggle={toggle}>History</ModalHeader>
              <ModalBody>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="row">S.No</th>
                      <th scope="row">Date</th>
                      <th scope="row">Amount</th>
                    </tr>
                  </thead>
                  {pay.length > 0
                    ? pay.map((p, i) => (
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{CommonServices.removeTime(p.payment_date)}</td>
                          <td>{p.paid_amount}</td>
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


            <PaymentComponent
              paymentHandler={paymentHandler}
              addPaymentModal={addPaymentModal}
              pay={pay}
              getPaymentStatus={getPaymentStatus}
            />

            <DiscardReport
              ViewDiscussionToggel={ViewDiscussionToggel}
              ViewDiscussion={ViewDiscussion}
              report={assignNo}
              getData={getPaymentStatus}
            />

          </CardBody>
        </Card>
      </>
    </>
  );
}

export default Paid;

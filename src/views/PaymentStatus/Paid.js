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
import { Link } from "react-router-dom";
import CommonServices from "../../common/common";
import BootstrapTable from "react-bootstrap-table-next";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import Records from "../../components/Records/Records";
import DiscardReport from "../AssignmentTab/DiscardReport";
import PaymentIcon from '@material-ui/icons/Payment';
import PaymentComponent from './PaymentComponent';


function Unpaid() {

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
        axios.get(`${baseUrl}/tl/getUploadedProposals?cid=${JSON.parse(userId)}&status=2`).then((res) => {

            if (res.data.code === 1) {
                setPayment(res.data.result);
                setCount(res.data.result.length);
                setRecords(res.data.result.length);

            }
        });
    };

    const toggle = (key) => {
    
        setModal(!modal);

        fetch(`${baseUrl}/admin/getPaymentDetail?id=${key}`, {
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
    };


    const columns = [
        {
            dataField: "",
            text: "S.No",
            formatter: (cellContent, row, rowIndex) => {
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
          style: {
              fontSize: "11px",
          },
          headerStyle: () => {
              return { fontSize: "11px" };
          },
          formatter : function (cell, row) {
              return(
                  <>
                  {row.paid_status == "2"  ?
                  <p style={{color : "red"}}>{row.status} </p> : 
                  <p>{row.status}</p>}
                  </>
              )
          }
      },
        {
            dataField: "accepted_amount",
            text: "Accepted Amount ",
            sort: true,
            style: {
              fontSize: "11px",
              color: "#21a3ce",
            },
            sortFunc: (a, b, order, dataField) => {
              if (order === 'asc') {
                return b - a;
              }
              return a - b; // desc
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
            sortFunc: (a, b, order, dataField) => {
              if (order === 'asc') {
                return b - a;
              }
              return a - b; // desc
            },
            headerStyle: () => {
              return { fontSize: "11px", color: "#064606" };
            },
          },
      
          {
            text: "Amount Outstanding",
            dataField: "amount_outstanding",
            sort: true,
            style: {
              fontSize: "11px",
              color: "darkred",
            },
            sortFunc: (a, b, order, dataField) => {
              if (order === 'asc') {
                return b - a;
              }
              return a - b; // desc
            },
            headerStyle: () => {
              return { fontSize: "11px", color: "darkred" };
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
              fontSize: "11px"
            },
            headerStyle: () => {
              return { fontSize: "11px", width: "90px" };
            },
            formatter: function (cell, row) {
              return (
                <>
                 <div style={{display : "flex"}}>
                    <div>
                      {
                        row.paid_status == "0" ?
                          <div
                            style={{ cursor: "pointer", margin: "0 3px" }}
                            title="Pay Amount"
                           >
                              <Link
                        to={{
                          pathname: `/customer/paydetails/${row.assign_id}`,
                          obj: {
                            message_type: "5",
                            query_No: row.assign_no,
                            query_id: row.q_id,
                            routes: `/customer/payment`
                          }
                        }}
                      >
                                                <PaymentIcon color="primary" />
                            </Link>
                          </div>
                          :
                          null
                      }
                    </div>
      
                    <div>
                      {
                        row.paid_amount > 0 && row.paid_status > 0 ?
                          <div style={{ cursor: "pointer", margin: "0 5px" }} title="Payment History">
                         <Link
                        to={{
                          pathname: `/customer/paydetails/${row.assign_id}`,
                          obj: {
                            message_type: "5",
                            query_No: row.assign_no,
                            query_id: row.q_id,
                            routes: `/customer/payment`
                          }
                        }}
                      >
                                         <i
                              class="fa fa-credit-card"
                              style={{ color: "green", fontSize: "16px" }}
                             
                            ></i>
                            </Link>    
                          </div>
                          :
                          null
                      }
                    </div>
      
      
                    <div title="Send Message" style={{pointer : "cursor", margin: "0 5px"}}>
                      <Link
                        to={{
                          pathname: `/customer/chatting/${row.assign_id}`,
                          obj: {
                            message_type: "5",
                            query_No: row.assign_no,
                            query_id: row.q_id,
                            routes: `/customer/payment`
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
                    <div title="View Discussion Message" style={{pointer : "cursor", margin: "0 5px"}}>
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
                            unpaid="unpaid"
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


                    </CardBody>
                </Card>
            </>
        </>
    );
}

export default Unpaid;

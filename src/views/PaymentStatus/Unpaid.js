import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Layout from "../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Row
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import CommonServices from "../../common/common";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import Records from "../../components/Records/Records";
import DiscardReport from "../AssignmentTab/DiscardReport";
import PaymentComponent from "./PaymentComponent";
import PaginatorCust from "../../components/Paginator/PaginatorCust";
import "./index.css";
import ModalManual from "../ModalManual/AllComponentManual";
import MessageIcon, {
  ViewDiscussionIcon,
  HelpIcon,
  Payment,
} from "../../components/Common/MessageIcon";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
import { useHistory } from "react-router-dom";
function Paid() {
  const { id } = useParams();
  let history = useHistory();
  const userId = window.localStorage.getItem("userid");
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const [count, setCount] = useState(0);
  const [payment, setPayment] = useState([]);
  const [modal, setModal] = useState(false);

  const [pay, setPay] = useState({
    pay: "",
    amount: "",
    accepted_amount: "",
    paid_amount: "",
    assign_id: "",

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

  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [openManual, setManual] = useState(false);
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  // const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  // const classes = useStyles();
  const allEnd = 50;
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [prev, setPrev] = useState("");

  const needHelp = () => {
    setManual(!openManual);
  };
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key)
    }
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo]
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: 'center' });
  }, [ViewDiscussion]);

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem(`searchDatacustPay2`));
    if (!local) {
      getPaymentStatus(1);
    }
  }, []);

  const getPaymentStatus = (e) => {
    axios
      .get(
        `${baseUrl}/customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&status=1`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];
          let customId = 1;
          if (e > 1) {
            customId = allEnd * (e - 1) + 1;
          }
          let data = res.data.result;
          data.map((i) => {
            let data = {
              ...i,
              cid: customId,
            };
            customId++;
            all.push(data);
          });
          setPayment(all);
          setCount(res.data.total);
          setRecords(res.data.result.length);
        } else if (res.data.code === 0) {
          CommonServices.clientLogout(history);
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
        return <div id={row.assign_no}
          ref={el => (myRef.current[row.assign_no] = el)}>{row.cid}</div>;
      },
      headerStyle: () => {
        return {
          width: "50px",
        };
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
      text: "Query No",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/customer_my-assingment/${row.assign_id}`,
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
      text: "Sub Category",
      sort: true,
    },
    {
      text: "Date of acceptance of Proposal",
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
              <p className="declined">{row.status} </p>
            ) : (
              <p>{row.status}</p>
            )}
          </>
        );
      },
    },
    {
      dataField: "accepted_amount",
      text: "Accepted Amount ",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.accepted_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Amount Paid",
      dataField: "paid_amount",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.paid_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },

    {
      text: "Amount Outstanding",
      dataField: "amount_outstanding",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.amount_outstanding;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Date of Payment",
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
    //   {
    //     text: "Action",
    //     dataField: "",

    //     formatter: function (cell, row) {
    //       return (
    //         <>
    //         {row.paid_status === "2" ?
    //         <>
    //      <div style={{display : "flex"}}>

    //                    <Link
    //                           to={{
    //                               pathname: `/customer/paydetails/${row.assign_id}`,
    //                               index : 1,
    //                               routes: "paymentstatus",
    //                           }}
    //                       >
    //                                     <Payment />
    //                 </Link>

    //                 <span onClick={() => ViewDiscussionToggel(row.assign_no)}  className="ml-2">
    //                                 <ViewDiscussionIcon />
    //                               </span>

    //        </div>   </>
    //         :  <div style={{display : "flex"}}>

    //           {
    //             row.paid_status == "0" ?

    //                   <Link
    //                           to={{
    //                               pathname: `/customer/paydetails/${row.assign_id}`,
    //                               index : 1,
    //                               routes: "paymentstatus",
    //                           }}
    //                       >
    //                                     <Payment />
    //                 </Link>
    //               :
    //               null
    //           }

    //           {
    //             row.paid_amount > 0 && row.paid_status > 0 ?
    //                 <Link
    //                           to={{
    //                               pathname: `/customer/paydetails/${row.assign_id}`,
    //                               index : 1,
    //                               routes: "paymentstatus",
    //                           }}
    //                       >
    //                                     <Payment />
    //                 </Link>

    //               :
    //               null
    //           }

    //           <Link className="ml-2"
    //           to={{
    //             pathname: `/customer/chatting/${row.assign_id}`,
    //             index : 1,
    //             routes: "paymentstatus",

    //               obj: {
    //                 message_type: "5",
    //                 query_No: row.assign_no,
    //                 query_id: row.assign_id,
    //                 routes: `/customer/paymentstatus`
    //               }
    //             }}
    //           >
    //            <MessageIcon />
    //           </Link>

    //         <span onClick={() => ViewDiscussionToggel(row.assign_no)}  className="ml-2">
    //                                 <ViewDiscussionIcon />
    //                               </span>

    //         </div>
    //     }
    //         </>
    //       );
    //     },
    //   },
    // ];
    {
      text: "Action",
      dataField: "",

      formatter: function (cell, row) {
        return (
          <>
            {row.paid_status === "2" ? (
              <>
                <Link
                  to={{
                    pathname: `/customer_paydetails/${row.assign_id}`,
                    index: 1,
                    routes: "paymentstatus",
                  }}
                >
                  <Payment />
                </Link>

                <span
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-1"
                >
                  <ViewDiscussionIcon />
                </span>
              </>
            ) : (
              <>
                {row.paid_status == "0" ? (
                  <Link
                    to={{
                      pathname: `/customer_paydetails/${row.assign_id}`,
                      index: 1,
                      routes: "paymentstatus",
                    }}
                  >
                    <Payment />
                  </Link>
                ) : null}

                {row.paid_amount > 0 && row.paid_status > 0 ? (
                  <Link
                    to={{
                      pathname: `/customer_paydetails/${row.assign_id}`,
                      index: 1,
                      routes: "paymentstatus",
                    }}
                  >
                    <Payment />
                  </Link>
                ) : null}

                <Link
                  className="ml-2"
                  to={{
                    pathname: `/customer/chatting/${row.assign_id}`,
                    index: 1,
                    routes: "paymentstatus",

                    obj: {
                      message_type: "5",
                      query_No: row.assign_no,
                      query_id: row.assign_id,
                      routes: `/customer/paymentstatus`,
                    },
                  }}
                >
                  <MessageIcon />
                </Link>

                <span
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-1"
                >
                  <ViewDiscussionIcon />
                </span>
              </>
            )}
          </>
        );
      },
    },
  ];

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("custPay2");
    localStorage.removeItem(`freezecustPay2`);
    localStorage.removeItem("custArrowPay2");
    localStorage.removeItem("prevcustPay2");
    setPrev("");
  }

  return (
    <>
      <>
        <Card>
          <CardHeader>
            <span onClick={(e) => needHelp()}>
              {" "}
              <HelpIcon />
            </span>
            <CustomerFilter
              setData={setPayment}
              getData={getPaymentStatus}
              paid="paid"
              index="custPay2"
              setRecords={setRecords}
              records={records}
              id={userId}
              resetTriggerFunc={resetTriggerFunc}
              setCount={setCount}
            />
          </CardHeader>

          <CardBody>
            {/* <Records records={records} /> */}
            <Row className="mb-2">
              <Col md="12" align="right">
                <PaginatorCust
                  count={count}
                  id={userId}
                  setData={setPayment}
                  getData={getPaymentStatus}
                  paid="paid"
                  index="custPay2"
                  setOnPage={setOnPage}
                  resetTrigger={resetTrigger}
                  setresetTrigger={setresetTrigger}
                />
              </Col>
            </Row>

            <DataTablepopulated
              bgColor="#3e8678"
              keyField={"assign_no"}
              data={payment}
              columns={columns}
            ></DataTablepopulated>

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
              headColor="#3e8678"
            />
            <Modal isOpen={openManual} toggle={needHelp} size="lg">
              <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
              <ModalBody>
                <ModalManual tar={"paymentProcess"} />
              </ModalBody>
            </Modal>
          </CardBody>
        </Card>
      </>
    </>
  );
}

export default Paid;

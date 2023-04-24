import React, { useState, useEffect, useRef } from "react";
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
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  PaymentDecline,
  Payment,
  ViewDiscussionIcon,
  DiscussProposal,
  HelpIcon,
} from "../../../components/Common/MessageIcon";
import moment from "moment";
import Paginator from "../../../components/Paginator/Paginator";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

function AllPayment() {
  const { id } = useParams();
  const userid = window.localStorage.getItem("tpkey");
  const cust_id = window.localStorage.getItem("userid");
  const allEnd = Number(localStorage.getItem("tp_record_per_page"));
  const classes = useStyles();
  const [records, setRecords] = useState([]);

  const [pay, setPay] = useState([]);
  const [payment, setPayment] = useState([]);
  const [modal, setModal] = useState(false);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const [count, setCount] = useState("0");
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");

  const [assignNo, setAssignNo] = useState("");

  const [addPaymentModal, setPaymentModal] = useState(false);
  const rejectHandler = (key) => {
    setPaymentModal(!addPaymentModal);
    setAssignNo(key.assign_no);
  };

  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  // function headerLabelFormatter(column) {
  //   return (
  //     <div className="d-flex text-white w-100 flex-wrap">
  //       {column.text}
  //       {accend === column.dataField ? (
  //         <ArrowDropDownIcon />
  //       ) : (
  //         <ArrowDropUpIcon />
  //       )}
  //     </div>
  //   );
  // }


  function headerLabelFormatter(column) {
    // let reverse = "Exp_Delivery_Date"
    return(
      <div>
      {column.dataField === isActive ?
        (
          <div className="d-flex text-white w-100 flex-wrap">
            {column.text}
            {accend === column.dataField ? (
              <ArrowDropDownIcon 
              className={turnGreen === true ? classes.isActive : ""}
              />
            ) : (
              <ArrowDropUpIcon 
              className={turnGreen === true ? classes.isActive : ""}
              />
            )}
          </div>
        )
        :
        (
          <div className="d-flex text-white w-100 flex-wrap">
            {column.text}
            {accend === column.dataField ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )}
          </div>
        )
      }
      </div>
    )
  }

  useEffect(() => {

    let pageno = JSON.parse(localStorage.getItem("tpPayment3"));
    let arrow = localStorage.getItem("tpArrowPayment3")
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    if (pageno) {
      getPaymentStatus(pageno);
    } else {
      getPaymentStatus(1);
    }

    // getPaymentStatus();
  }, []);


  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key)
    }
  };

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo]
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: 'center' });
    }
  }, [ViewDiscussion]);

  const getPaymentStatus = (e) => {
    let data = JSON.parse(localStorage.getItem("searchDatatppayment3"));
    let pagetry = JSON.parse(localStorage.getItem("freezetpPayment3"))
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);

    if ((data) && (!pagetry)) {
      remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
        userid
      )}&cat_id=${data.store}&from=${data.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=2&pcat_id=${data.pcatId}&qno=${data.query_no}`
    } else if ((data) && (pagetry)) {
      remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
        userid
      )}&cat_id=${data.store}&from=${data.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=2&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`
    } else if ((!data) && (pagetry)) {
      remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
        userid
      )}&status=2&orderby=${val}&orderbyfield=${field}`
    } else {
      remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
        userid
      )}&status=2`
    }

    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let data = res.data.result;
          setRecords(res.data.result.length);
          let all = [];
          let customId = 1;
          if (e > 1) {
            customId = allEnd * (e - 1) + 1;
          }
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
        }
      });

  };

  const toggle = (key) => {
    setModal(!modal);

    fetch(`${baseUrl}//admin/getPaymentDetail?id=${key}`, {
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

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    }
    localStorage.setItem(`tpPayment3`, JSON.stringify(1))
    localStorage.setItem(`freezetpPayment3`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatatppayment3"));
    if (data) {
      remainApiPath = `tl/getUploadedProposals?page=1&tp_id=${JSON.parse(
        userid
      )}&cat_id=${data.store}&from=${data.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=2&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`
    }
    else {
      remainApiPath = `tl/getUploadedProposals?page=1&tp_id=${JSON.parse(
        userid
      )}&status=2&orderby=${val}&orderbyfield=${field}`
    }
    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];
          let sortId = 1;
          res.data.result.map((i) => {
            let data = {
              ...i,
              cid: sortId,
            };
            sortId++;
            all.push(data);
          });
          setPayment(all);
          setTurnGreen(true)
          setresetTrigger(!resetTrigger);
        }
      });
  }

  const columns = [
    {
      dataField: "",
      text: "S.no",
      formatter: (cellContent, row, rowIndex) => {
        return <div id={row.assign_no} ref={el => (myRef.current[row.assign_no] = el)}>{row.cid}</div>;
      },

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "query_created_date",
      text: "Date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowPayment3", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowPayment3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
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
      text: "Query no",


      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/taxprofessional_queries/${row.assign_id}`,
                index: 2,
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowPayment3", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowPayment3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 2);
      },
    },
    {
      dataField: "cat_name",
      text: "Sub category",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowPayment3", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowPayment3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 3);
      },
    },
    {
      text: "Date of acceptance of proposal",
      dataField: "cust_accept_date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowPayment3", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowPayment3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 4);
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
      dataField: "status",
    },
    {
      dataField: "accepted_amount",
      text: "Accepted amount ",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowPayment3", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowPayment3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
      },

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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowPayment3", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowPayment3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
      },

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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowPayment3", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowPayment3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 7);
      },

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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowPayment3", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowPayment3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 8);
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

      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex" }}>
              <Link
                to={{
                  pathname: `/taxprofessional_chatting/${row.id}`,
                  index: 2,
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
                  index: 2,
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
  const rowStyle2 = (row, index) => {
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

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("tpPayment3");
    localStorage.removeItem(`freezetpPayment3`);
    localStorage.removeItem("tpArrowPayment3");
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <TaxProfessionalFilter
              setData={setPayment}
              getData={getPaymentStatus}
              Paid="Paid"
              setRecords={setRecords}
              index="tppayment3"
              records={records}
              resetTriggerFunc={resetTriggerFunc}
              setCount={setCount}
            />
          </Row>
          <Row>
            <Col md="12" align="right">
              <Paginator
                setData={setPayment}
                getData={getPaymentStatus}
                Paid="Paid"
                setRecords={setRecords}
                index="tppayment3"
                records={records}
                count={count}
                setOnPage={setOnPage}
                // resetPaging={resetPaging}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
              />
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <DataTablepopulated
            bgColor="#3e8678"
            keyField={"assign_no"}
            data={payment}
            rowStyle2={rowStyle2}
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
  );
}

export default AllPayment;

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
import TeamFilter from "../../../components/Search-Filter/tlFilter";
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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 10px",
  },
}));
function AllPayment() {
  const classes = useStyles();
  const userid = window.localStorage.getItem("tlkey");
  const cust_id = window.localStorage.getItem("userid");
  const [records, setRecords] = useState([]);

  const [pay, setPay] = useState([]);
  const [count, setCount] = useState("");
  const [payment, setPayment] = useState([]);
  const [modal, setModal] = useState(false);

  const [assignNo, setAssignNo] = useState("");

  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [addPaymentModal, setPaymentModal] = useState(false);
  const [scrolledTo, setScrolledTo] = useState("");
  const [countNotification, setCountNotification] = useState("");
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [accend, setAccend] = useState(false);
  const [prev, setPrev] = useState("");
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const myRef = useRef([]);
  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("accendtlpay2") === column.dataField ||
      localStorage.getItem("prevtlpay2") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtlpay2", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendtlpay2") === column.dataField ? (
            <ArrowDropDownIcon
              className={isActive === true ? classes.isActive : ""}
            />
          ) : (
            <ArrowDropUpIcon
              className={isActive === true ? classes.isActive : ""}
            />
          )}
        </div>
      </div>
    );
  }
  useEffect(() => {
    let localPage = Number(localStorage.getItem("tlpay2"));
    if (!localPage) {
      localPage = 1;
    }
    setAccend(localStorage.getItem("accendtlpay2"));
    setPrev(localStorage.getItem("prevtlpay2"));

    let sortVal = JSON.parse(localStorage.getItem("sortedValuetlpay2"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValuetlpay2", JSON.stringify(sort));
    }

    setEnd(Number(localStorage.getItem("tl_record_per_page")));
    getPaymentStatus(localPage);
  }, []);
  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo];
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: "center" });
    }
  }, [ViewDiscussion]);
  const rejectHandler = (key) => {
    setPaymentModal(!addPaymentModal);
    setAssignNo(key.assign_no);
    if (addPaymentModal === false) {
      setScrolledTo(key.assign_no);
    }
  };

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo];
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: "center" });
    }
  }, [addPaymentModal]);

  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const getPaymentStatus = (e) => {
    let searchData = JSON.parse(localStorage.getItem("searchDatatlpayment2"));
    setPage(e);
    let allEnd = Number(localStorage.getItem("tl_record_per_page"));
    let orderBy = 0;
    let fieldBy = 0;
    let sortVal = JSON.parse(localStorage.getItem("sortedValuepay2"));
    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";

    if (searchData) {
      remainApiPath = `/tl/getUploadedProposals?id=${JSON.parse(
        userid
      )}&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&status=2&pcat_id=${searchData.pcatId}&qno=${
        searchData?.query_no
      }`;
    } else {
      remainApiPath = `tl/getUploadedProposals?id=${JSON.parse(
        userid
      )}&page=${e}&status=2&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }

    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        let droppage = [];
        let data = res.data.result;

        setCountNotification(res.data.total);
        setRecords(res.data.total);
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
        setRecords(res.data.result.length);
        let end = e * allEnd;

        if (end > res.data.total) {
          end = res.data.total;
        }
        let dynamicPage = Math.ceil(res.data.total / allEnd);

        let rem = (e - 1) * allEnd;

        if (e === 1) {
          setBig(rem + e);
          setEnd(end);
        } else {
          setBig(rem + 1);
          setEnd(end);
        }
        for (let i = 1; i <= dynamicPage; i++) {
          droppage.push(i);
        }
        setDefaultPage(droppage);
      }
    });
  };

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key);
    }
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

  const columns = [
    {
      dataField: "",
      text: "S.no",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div
            id={row.assign_no}
            ref={(el) => (myRef.current[row.assign_no] = el)}
          >
            {rowIndex + 1}
          </div>
        );
      },

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "query_created_date",
      text: "Query date",
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
                pathname: `/teamleader_queries/${row.assign_id}`,
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
      dataField: "status",
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
        var nfObject = new Intl.NumberFormat("hi-IN");
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
        var nfObject = new Intl.NumberFormat("hi-IN");
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
        var nfObject = new Intl.NumberFormat("hi-IN");
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
                  pathname: `/teamleader_chatting/${row.id}`,
                  index: 2,
                  routes: "paymentstatus",

                  obj: {
                    message_type: "4",
                    query_No: row.assign_no,
                    query_id: row.id,
                    routes: `/teamleader/paymentstatus`,
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
                  pathname: `/teamleader_paydetails/${row.assign_id}`,
                  index: 2,
                  routes: "paymentstatus",
                }}
              >
                <Payment />
              </Link>

              {row.paid_status == "0" ? (
                <div title="Payment decline" onClick={() => rejectHandler(row)}>
                  <PaymentDecline />
                </div>
              ) : null}
            </div>
          </>
        );
      },
    },
  ];
  const rowStyle2 = (row, index) => {
    const style = {};
    var warningDate = moment(row.due_date).subtract(5, "day").toDate();
    // var warnformat = warningDate.format("YYYY-MM-DD");
    var aa = moment().toDate();
    var cc = moment(row.due_date).toDate();
    if (row.is_paid === "2") {
      style.backgroundColor = "#fff";
      style.color = "#000";
    } else if (row.paid_status != "2" && row.is_paid != "1" && cc < aa) {
      style.backgroundColor = "#bfdfd2";
      style.color = "#000111";
    } else if (
      row.paid_status != "2" &&
      row.is_paid != "1" &&
      row.status != "Complete" &&
      warningDate < aa
    ) {
      style.backgroundColor = "#c1d8f2";
      style.color = "#000111";
    } else if (
      row.paid_status != "2" &&
      row.is_paid != "1" &&
      warningDate > aa
    ) {
      style.backgroundColor = "#fff";
      style.color = "#000";
    }

    return style;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <TeamFilter
            setData={setPayment}
            getData={getPaymentStatus}
            Paid="Paid"
            setRecords={setRecords}
            records={records}
            setCountNotification={setCountNotification}
            countNotification={countNotification}
            big={big}
            end={end}
            setBig={setBig}
            setEnd={setEnd}
            setPage={setPage}
            page={page}
            defaultPage={defaultPage}
            setDefaultPage={setDefaultPage}
            pageValue="tlpay2"
            index="tlpayment2"
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
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getPaymentStatus}
            headColor="#3e8678"
          />
          <RejectedModal
            rejectHandler={rejectHandler}
            addPaymentModal={addPaymentModal}
            assignNo={assignNo}
            getPaymentStatus={getPaymentStatus}
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

import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, CardBody,Row,Col} from "reactstrap";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import { Link, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import ViewAllReportModal from "./ViewAllReport";
import Records from "../../components/Records/Records";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DiscardReport from "../AssignmentTab/DiscardReport";
import "./index.css";
import ModalManual from "../ModalManual/AllComponentManual";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
import PaginatorCust from "../../components/Paginator/PaginatorCust";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CommonServices from "../../common/common";
import MessageIcon, {
  ViewDiscussionIcon,
  HelpIcon,
} from "../../components/Common/MessageIcon";
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
function CustomerDeclinedPayment() {
  const userId = window.localStorage.getItem("userid");
  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const [records, setRecords] = useState([]);
  const [report, setReport] = useState();
  const [dataItem, setDataItem] = useState({});
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [openManual, setManual] = useState(false);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  // const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  const classes = useStyles();
  const allEnd = 50;
  const [count, setCount] = useState(0);
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [prev, setPrev] = useState("");
  
  const token = window.localStorage.getItem("clientToken");
  let history = useHistory();
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const needHelp = () => {
    setManual(!openManual);
  };
  const ViewReport = (key) => {
    setReportModal(!reportModal);
    setReport(key.assign_no);
    setDataItem(key);
    if (reportModal === false) {
      setScrolledTo(key.assign_no)
    }

  };
  useEffect(() => {
    let runTo = myRef.current[scrolledTo]
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: 'center' });
}, [reportModal]);

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
    let local = JSON.parse(localStorage.getItem(`searchDatacustAs4`));
    let pageno = JSON.parse(localStorage.getItem("custAs4"));
    let arrow = localStorage.getItem("custArrowAs4")
    let pre = localStorage.getItem("prevcustAs4")
    if (pre) {
      setPrev(pre);
    }
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    if (pageno) {
      getAssignmentData(pageno);
    } else {
      getAssignmentData(1);
    }
  }, []);

  const getAssignmentData = (e) => {
    if ((e === undefined)) {
      console.log(e,'e');
      e=1;
    }
    let data = JSON.parse(localStorage.getItem("searchDatacustAs4"));
    let pagetry = JSON.parse(localStorage.getItem("freezecustAs4"));
    localStorage.setItem(`custAs4`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);

    if ((data) && (!pagetry)){
      remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
      }&status=3&pcat_id=${data.pcatId}`
    }else if ((data) && (pagetry)){
      remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
      }&status=3&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`
    }else if ((!data) && (pagetry)){
      remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&status=3&orderby=${val}&orderbyfield=${field}`
    }else{
      remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&status=3`
    }

    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
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
          setAssignmentDisplay(all);
          setCount(res.data.total);
          setRecords(res.data.result.length);
        } else if (res.data.code === 0) {
          CommonServices.clientLogout(history);
        }
      });
  };

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("custArrowAs4") === column.dataField ||
      localStorage.getItem("prevcustAs4") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevcustAs4", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("custArrowAs4") === column.dataField ? (
            <ArrowDropUpIcon
              className={isActive === true ? classes.isActive : ""}
            />
          ) : (
            <ArrowDropDownIcon
              className={isActive === true ? classes.isActive : ""}
            />
          )}
        </div>
      </div>
    );
  }

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    localStorage.setItem(`custAs4`, JSON.stringify(1))
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    }
    localStorage.setItem(`freezecustAs4`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatacustAs4"));

    if (data) {
      remainApiPath = `customers/completeAssignments?page=1&user=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
      }&status=3&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`
    } else {
      remainApiPath = `customers/completeAssignments?page=1&user=${JSON.parse(
        userId
      )}&status=3&orderby=${val}&orderbyfield=${field}`
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
          setAssignmentDisplay(all);
          setTurnGreen(true);
          setresetTrigger(!resetTrigger);
        }
      });
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
      dataField: "created",
      text: "Date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowAs4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },

      formatter: function dateFormat(cell, row) {
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
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
                pathname: `/customer_my-assingment/${row.id}`,
                index: 3,
                routes: "assignment",
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
          localStorage.setItem("custArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowAs4");
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
      dataField: "cat_name",
      text: "Sub Category",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowAs4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 4);
      },
    },
    {
      dataField: "status",
      text: "Status",

      formatter: function (cell, row) {
        return (
          <>
            <div>
              {row.paid_status == "2" && (
                <p>
                  <span className="declined">Payment Declined</span>
                </p>
              )}
              <p>
                <span style={{ fontWeight: "bold" }}>Client Discussion :</span>
                <span
                  className={
                    row.client_discussion === "completed"
                      ? "completed"
                      : "inprogress"
                  }
                >
                  {row.client_discussion}
                </span>
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Draft report :</span>
                <span
                  className={
                    row.draft_report === "completed"
                      ? "completed"
                      : "inprogress"
                  }
                >
                  {row.draft_report}
                </span>
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Final Discussion :</span>
                <span
                  className={
                    row.final_discussion === "completed"
                      ? "completed"
                      : "inprogress"
                  }
                >
                  {row.final_discussion}
                </span>
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>
                  Delivery of Final Report :
                </span>
                <span
                  className={
                    row.delivery_report === "completed"
                      ? "completed"
                      : "inprogress"
                  }
                >
                  {row.delivery_report}
                </span>
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Awaiting Completion:</span>
                <span
                  className={
                    row.other_stage === "completed" ? "completed" : "inprogress"
                  }
                >
                  {row.other_stage}
                </span>
              </p>
            </div>
          </>
        );
      },
    },
    {
      dataField: "Exp_Delivery_Date",
      text: "Expected date of delivery",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowAs4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
      },
      formatter: function dateFormat(cell, row) {
        var oldDate = row.created;
        if (oldDate === null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "final_date",
      text: "Actual date of delivery",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowAs4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 7);
      },
      formatter: function dateFormat(cell, row) {
        var oldDate = row.final_date;
        if (oldDate === null || oldDate === "0000-00-00") {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "",
      text: "Deliverable",

      formatter: function (cell, row) {
        return (
          <>
            {row.status === "Payment decliend" ||
            row.paid_status === "2" ? null : (
              <div>
                {row.assignment_draft_report || row.final_report ? (
                  <div
                    title="View All Report"
                    style={{ cursor: "pointer", textAlign: "center" }}
                    onClick={() => ViewReport(row)}
                  >
                    <DescriptionOutlinedIcon color="secondary" />
                  </div>
                ) : null}
              </div>
            )}
          </>
        );
      },
    },
    {
      dataField: "",
      text: "Team Leader",

      formatter: priceFormatter,
    },
    {
      text: "Action",
      headerStyle: () => {
        return { width: "70px" };
      },
      style: {
        fontSize: "11px",
      },
      formatter: function (cell, row) {
        return (
          <>
            {row.paid_status === "2" ? null : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link
                  to={{
                    pathname: `/customer_chatting/${row.assign_id}`,
                    index: 3,
                    routes: "assignment",
                    obj: {
                      message_type: "4",
                      query_No: row.assign_no,
                      query_id: row.id,
                      routes: `/customer/assignment`,
                    },
                  }}
                >
                  <MessageIcon />
                </Link>
                <div
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-2"
                >
                  <ViewDiscussionIcon />
                </div>
              </div>
            )}
          </>
        );
      },
    },
  ];

  //tl,phone,email
  function priceFormatter(cell, row) {
    if (row) {
      return (
        <>
          <p style={{ fontSize: "10px" }}>{row.tname} </p>
          <p style={{ fontSize: "10px" }}>{row.phone}</p>
          <p style={{ fontSize: "10px" }}>{row.email}</p>
        </>
      );
    }

    return null;
  }

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("custAs4");
    localStorage.removeItem(`freezecustAs4`);
    localStorage.removeItem("custArrowAs4");
    localStorage.removeItem("prevcustAs4");
    setPrev("");
  }

  return (
    <>
      <Card>
        <CardHeader>
          <span onClick={(e) => needHelp()}>
            {" "}
            <HelpIcon />
          </span>
          <CustomerFilter
            setData={setAssignmentDisplay}
            getData={getAssignmentData}
            id={userId}
            assignment="declinedAssignment"
            records={records}
            setRecords={setRecords}
            index="custAs4"
            setOnPage={setOnPage}
            resetTrigger={resetTrigger}
            setresetTrigger={setresetTrigger}
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
                setData={setAssignmentDisplay}
                getData={getAssignmentData}
                assignment="declinedAssignment"
                index="custAs4"
                setOnPage={setOnPage}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
              />
            </Col>
          </Row>
          <Modal
            isOpen={openManual}
            toggle={needHelp}
            style={{ display: "block", position: "absolute", left: "280px" }}
            size="lg"
          >
            <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
            <ModalBody>
              <ModalManual tar={"assignProcess"} />
            </ModalBody>
          </Modal>
          <DataTablepopulated
            bgColor="#7c887c"
            bootstrap4
            keyField="id"
            data={assignmentDisplay}
            columns={columns}
          ></DataTablepopulated>

          <ViewAllReportModal
            ViewReport={ViewReport}
            reportModal={reportModal}
            report={report}
            getPendingforAcceptance={getAssignmentData}
            dataItem={dataItem}
            deleiverAble="#7c887c"
          />
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getAssignmentData}
            headColor="#7c887c"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default CustomerDeclinedPayment;

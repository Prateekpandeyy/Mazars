import React, { useState, useEffect,useRef} from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, CardBody,Col,Row} from "reactstrap";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import ViewAllReportModal from "./ViewAllReport";
import Records from "../../components/Records/Records";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DiscardReport from "../AssignmentTab/DiscardReport";
import "./index.css";
import ModalManual from "../ModalManual/AllComponentManual";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PaginatorCust from "../../components/Paginator/PaginatorCust";
import CommonServices from "../../common/common";
import { useHistory } from "react-router-dom";
import MessageIcon, {
  ViewDiscussionIcon,
  HelpIcon,
} from "../../components/Common/MessageIcon";
function AllAssignment() {
  let history = useHistory();
  const userId = window.localStorage.getItem("userid");
  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const [records, setRecords] = useState([]);
  const [report, setReport] = useState();
  const [dataItem, setDataItem] = useState({});
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

    // const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  // const classes = useStyles();
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

  const [reportModal, setReportModal] = useState(false);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [openManual, setManual] = useState(false);
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const needHelp = () => {
    setManual(!openManual);
  };

  const ViewReport = (key) => {
    const body = document.getElementById("veRep");
    // window.addEventListener('scroll', () => {
    //   document.documentElement.style.setProperty('--scroll-y', `${body.scrollY}px`);
    // });
    setReportModal(!reportModal);
    if(reportModal === false){
      setScrolledTo(key.assign_no)
    }
    setReport(key.assign_no);
    setDataItem(key);
    if (!key) {
      document.getElementById("veRep").style.overflowY = "hidden";
    } else {
      document.getElementById("veRep").style.overflowY = "auto";
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
    if (!key) {
      document.getElementById("veRep").style.overflowY = "hidden";
    } else {
      document.getElementById("veRep").style.overflowY = "auto";
    }
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
    let local = JSON.parse(localStorage.getItem(`searchDatacustAs1`));
    let pageno = JSON.parse(localStorage.getItem("custAs1"));
    let arrow = localStorage.getItem("custArrowAs1")
    let pre =localStorage.getItem("prevcustAs1")
    if(pre){
      setPrev(pre);
    }
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    if (pageno) {
      getAssignmentData(pageno);
      }else{
        getAssignmentData(1);
      }
  }, []);

  const getAssignmentData = (e) => {
    let data = JSON.parse(localStorage.getItem("searchDatacustAs1"));
    let pagetry = JSON.parse(localStorage.getItem("freezecustAs1"));
    localStorage.setItem(`custAs1`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);

    if ((data) && (!pagetry)){
      remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
      }&status=${data.p_status}&pcat_id=${data.pcatId}`
    }else if ((data) && (pagetry)){
      remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
      }&status=${data.p_status}&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`
    }else if ((!data) && (pagetry)){
      remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(userId)}&orderby=${val}&orderbyfield=${field}`
    }else{
      remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(userId)}`
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
        } else if (res.data.code === 2) {
          CommonServices.clientLogout(history);
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
      sort: true,

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
                index: 0,
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
      sort: true,
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      headerStyle: () => {
        return {
          width: "180px",
        };
      },
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
    // {
    //   dataField: "Exp_Delivery_Date",
    //   text: "Expected date of delivery",
    //   sort: true,

    //   formatter: function dateFormat(cell, row) {

    //     var oldDate = row.created;
    //     if (oldDate == null) {
    //       return null;
    //     }
    //     return oldDate.toString().split("-").reverse().join("-");
    //   },
    // },
    {
      dataField: "final_date",
      text: "Expected / Actual date of delivery",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate1 = row.final_date;
        if (oldDate1 == null || oldDate1 === "0000-00-00") {
          return null;
        }
        let finalDate = oldDate1.toString().split("-").reverse().join("-");
        var oldDate2 = row.created;
        if (oldDate2 == null || oldDate2 === "0000-00-00") {
          return null;
        }
        let expectedDate = oldDate2.toString().split("-").reverse().join("-");
        return <>{finalDate ? <p>{finalDate}</p> : <p>{expectedDate}</p>}</>;
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
      formatter: function (cell, row) {
        return (
          <>
            {row.paid_status === "2" ? null : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link
                  to={{
                    pathname: `/customer_chatting/${row.assign_id}`,
                    index: 0,
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
    localStorage.removeItem("custAs1");
    localStorage.removeItem(`freezecustAs1`);
    localStorage.removeItem("custArrowAs1");
    localStorage.removeItem("prevcustAs1");
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
            assignment="assignment"
            records={records}
            setRecords={setRecords}
            index="custAs1"
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
              assignment="assignment"
              index="custAs1"
              setOnPage={setOnPage}
              resetTrigger={resetTrigger}
              setresetTrigger={setresetTrigger}
            />
          </Col>
        </Row>
          <Modal isOpen={openManual} toggle={needHelp} size="lg">
            <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
            <ModalBody>
              <ModalManual tar={"assignProcess"} />
            </ModalBody>
          </Modal>

          <DataTablepopulated
            bgColor="#5a625a"
            bootstrap4
            keyField="id"
            data={assignmentDisplay}
            columns={columns}
          ></DataTablepopulated>
          {reportModal === true ? (
            <ViewAllReportModal
              ViewReport={ViewReport}
              reportModal={reportModal}
              report={report}
              getPendingforAcceptance={getAssignmentData}
              dataItem={dataItem}
              deleiverAble="#5a625a"
            />
          ) : (
            ""
          )}

          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getAssignmentData}
            headColor="#5a625a"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default AllAssignment;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, CardBody } from "reactstrap";
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
    setReport(key.assign_no);
    setDataItem(key);
    if (!key) {
      document.getElementById("veRep").style.overflowY = "hidden";
    } else {
      document.getElementById("veRep").style.overflowY = "auto";
    }
  };

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (!key) {
      document.getElementById("veRep").style.overflowY = "hidden";
    } else {
      document.getElementById("veRep").style.overflowY = "auto";
    }
  };

  useEffect(() => {
    getAssignmentData();
  }, []);

  const getAssignmentData = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setAssignmentDisplay(res.data.result);
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
        return rowIndex + 1;
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
          />
        </CardHeader>

        <CardBody>
          <Records records={records} />
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

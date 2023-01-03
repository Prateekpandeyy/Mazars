import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  DeleteIcon,
  EditQuery,
  ViewDiscussionIcon,
  HelpIcon,
  UploadDocument,
  FeedBackICon,
} from "../../../components/Common/MessageIcon";

function InCompleteData({ CountIncomplete }) {
  const userid = window.localStorage.getItem("tlkey");

  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);

  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
  };

  useEffect(() => {
    getInCompleteAssingment();
  }, []);

  const getInCompleteAssingment = () => {
    axios
      .get(
        `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=1`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setInCompleteData(res.data.result);
          setRecords(res.data.result.length);
        }
      });
  };

  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Query date",
      dataField: "created",
      sort: true,

      formatter: function (cell, row) {
        let dueDate = row.created.split("-").reverse().join("-");

        return <>{dueDate}</>;
      },
    },
    {
      text: "Query no",
      dataField: "assign_no",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/teamleader/queries/${row.id}`,
                index: 1,
                routes: "queriestab",
              }}
            >
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      text: "Category",
      dataField: "parent_id",
      sort: true,
    },
    {
      text: "Sub category",
      dataField: "cat_name",
      sort: true,
    },
    {
      text: "Client name",
      dataField: "name",
      sort: true,
    },
    {
      text: "Delivery due date   / Acutal delivery date",
      dataField: "Exp_Delivery_Date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.Exp_Delivery_Date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Status",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status}
              {row.statusdescription && "/"}
              {row.status ===  "Inprogress Query" ? (
                <p className="inprogress">{row.statusdescription}</p>
              ) : row.status ===  "Declined Query" ? (
                <p className="declined">{row.statusdescription}</p>
              ) : row.status ===  "Completed Query" ? (
                <p className="completed">{row.statusdescription}</p>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      text: "Action",

      headerStyle: () => {
        return { fontSize: "12px", width: "100px" };
      },

      formatter: function (cell, row) {
        return (
          <>
            {row.status_code ===  "1" ? null : (
              <div
                style={{
                  display: "flex",
                }}
              >
                {row.status ===  "Declined Query" ? null : (
                  <Link
                    to={{
                      pathname: `/teamleader/chatting/${row.id}`,
                      index: 1,
                      routes: "queriestab",

                      obj: {
                        message_type: "4",
                        query_No: row.assign_no,
                        query_id: row.id,
                        routes: `/teamleader/queriestab`,
                      },
                    }}
                  >
                    <MessageIcon />
                  </Link>
                )}

                <span
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-2"
                >
                  <ViewDiscussionIcon />
                </span>
              </div>
            )}{" "}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <TeamFilter
            setData={setInCompleteData}
            getData={getInCompleteAssingment}
            InprogressQuery="InprogressQuery"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>
        <CardBody>
          <DataTablepopulated
            bgColor="#6e557b"
            keyField={"assign_no"}
            data={incompleteData}
            columns={columns}
          ></DataTablepopulated>
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getInCompleteAssingment}
            headColor="#6e557b"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default InCompleteData;

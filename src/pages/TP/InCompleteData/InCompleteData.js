import React, { useState, useEffect ,useRef } from "react";
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
import BootstrapTable from "react-bootstrap-table-next";
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ViewDiscussionIcon,
} from "../../../components/Common/MessageIcon";

function InCompleteData({ CountIncomplete, data ,setIncompleteData ,getIncomplete }) {
  const userid = window.localStorage.getItem("tpkey");

  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);
  const myRef = useRef([])
  const [scrolledTo, setScrolledTo] = useState("")
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      console.log("Rendered AllQ", key);
      setScrolledTo(key)
      console.log("Scrolled To AllQ", scrolledTo)
    }else{
      console.log("Scrolled To Else AllQ", scrolledTo)
      var element = document.getElementById(scrolledTo);
      if (element){
        console.log(myRef.current[scrolledTo],"ref element array")
      }
    }
  };

  useEffect(() => {
    // if (ViewDiscussion === false) {
      console.log("Scrolled To Else AllQ", scrolledTo)
      var element = document.getElementById(scrolledTo);
      if (element){
        console.log("red",element);
        console.log(myRef.current[scrolledTo],"ref element array")
        let runTo=myRef.current[scrolledTo]
        runTo.scrollIntoView(false);
        runTo.scrollIntoView({ block: 'center' });
    }
    // }
  }, [ViewDiscussion]);

  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    const tpQueryFilterData = JSON.parse(localStorage.getItem(`searchTPDataQ3`));
    if (tpQueryFilterData) {
      console.log("Not called in all Q axios");
    }
    else {
    getInCompleteAssingment();
    }
  }, []);

  const getInCompleteAssingment = () => {
    
    axios
      .get(
        `${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}&status=1`,
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
        return <div id={row.assign_no} ref={el => (myRef.current[row.assign_no] = el)}>{rowIndex + 1}</div>;
      },

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Query date",
      dataField: "created",
      sort: true,
    },
    {
      text: "Query no",
      dataField: "assign_no",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/taxprofessional_queries/${row.id}`,
                index: 2,
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
      text: "Delivery due date / Actual delivery date",
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

      formatter: function (cell, row) {
        return (
          <>
            {row.tp_status ===  "1" ? null : (
              <div
                style={{
                  display: "flex",
                }}
              >
                {row.status ===  "Declined Query" ? null : (
                  <Link
                    to={{
                      pathname: `/taxprofessional_chatting/${row.id}`,
                      index: 2,
                      routes: "queriestab",
                      obj: {
                        message_type: "4",
                        query_No: row.assign_no,
                        query_id: row.id,
                        routes: `/taxprofessional/queriestab`,
                      },
                    }}
                  >
                    <MessageIcon />
                  </Link>
                )}

                <div
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-1"
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

  return (
    <>
      <Card>
        <CardHeader>
          <TaxProfessionalFilter
            // setData={setInCompleteData}
            // getData={getInCompleteAssingment}
            setData={setIncompleteData}
            getData={getIncomplete}
            InprogressQuery="InprogressQuery"
            setRecords={setRecords}
            records={records}
            index={3}
          />
        </CardHeader>
        <CardBody>
          <DataTablepopulated
            bgColor="#55425f"
            keyField={"assign_no"}
            data={data}
            columns={columns}
          ></DataTablepopulated>
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getInCompleteAssingment}
            headColor="#55425f"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default InCompleteData;

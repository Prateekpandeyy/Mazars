import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl} from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import ViewAllReportModal from "./ViewAllReport";
import Records from "../../components/Records/Records";
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Alerts from "../../common/Alerts";
import DiscardReport from "../AssignmentTab/DiscardReport";


function CompleteAssignment() {

  const userId = window.localStorage.getItem("userid");
  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const [records, setRecords] = useState([]);
  const [report, setReport] = useState()
  const [reportModal, setReportModal] = useState(false);
  const [assignNo, setAssignNo] = useState('');
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewReport = (key) => {
   
    setReportModal(!reportModal);
    setReport(key);
  };



  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }

  useEffect(() => {
    getAssignmentData();
  }, []);


  const getAssignmentData = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}&status=2`
      )
      .then((res) => {
       
        if (res.data.code === 1) {
          setAssignmentDisplay(res.data.result);
         
          setRecords(res.data.result.length);
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
        return { fontSize: "12px"};
      },
    },
    {
      dataField: "created",
      text: "Date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
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
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function nameFormatter(cell, row) {
              
        return (
            <>
                <Link
                    to={{
                        pathname: `/customer/my-assingment/${row.id}`,
                        index: 2,
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
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "status",
      text: "Status",
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "12px"};
      },
      formatter: function (cell, row) {
        return (
          <>
            <div>
              {row.paid_status === "2" &&
                <p>
                  <span style={{ color: "red" }}>Payment Declined</span>
                </p>
              }
              <p>
                <span style={{ fontWeight: "bold" }}>Client Discussion :</span>
                {row.client_discussion}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Draft Report :</span>
                {row.draft_report}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Final Discussion :</span>
                {row.final_discussion}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Delivery of Final Report :</span>
                {row.delivery_report}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Awaiting Completion :</span>
                {row.other_stage}
              </p>
            </div>
          </>
        );
      },
    },
    {
      dataField: "Exp_Delivery_Date",
      text: "Expected date of delivery",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
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
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
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
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
    
        return (
          <>

            {
              row.status === "Payment decliend" ? null :
                <div>
                  {row.assignment_draft_report || row.final_report ?
                    <div title="View All Report"
                      style={{ cursor: "pointer", textAlign: "center" }}
                      onClick={() => ViewReport(row.assign_no)}
                    >
                      <DescriptionOutlinedIcon color="secondary" />
                    </div>
                    :
                    null
                  }

                  {row.assignment_draft_report && !row.final_report ? (
                    row.draft_report === "completed" ?
                      null :
                      <div style={{ display: "flex", justifyContent: "space-around" }}>

                        <div style={{ cursor: "pointer" }} title="Accepted">
                          <i
                            class="fa fa-check"
                            style={{
                              color: "green",
                              fontSize: "16px",
                            }}
                            onClick={() => acceptHandler(row)}
                          ></i>
                        </div>

                        <div title="Send Message">
                          <Link
                            to={{
                              pathname: `/customer/chatting/${row.id}`,
                              obj: {
                                message_type: "3",
                                query_No: row.assign_no,
                                query_id: row.id,
                                routes: `/customer/assignment`
                              }
                            }}
                          >
                            <i
                              class="fa fa-comments-o"
                              style={{
                                fontSize: 16,
                                cursor: "pointer",
                                marginLeft: "8px",
                                color: "green"
                              }}
                            ></i>
                          </Link>
                        </div>
                      </div>

                  ) : null}

                </div>
            }


          </>
        );
      },
    },
    {
      dataField: "",
      text: "Team Leader name and contact number, email",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: priceFormatter,
    },
    {
      text: "Action",
      headerStyle: () => {
        return { fontSize: "12px", textAlign: "center"};
      },
      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>

              <div title="Send Message">
                <Link
                  to={{
                    pathname: `/customer/chatting/${row.id}`,
                    obj: {
                      message_type: "4",
                      query_No: row.assign_no,
                      query_id: row.id,
                      routes: `/customer/assignment`
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

  //accept handler
  const acceptHandler = (key) => {
 

    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", key.id);
    formData.append("query_no", key.assign_no);
    formData.append("type", 1);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/draftAccept`,
      data: formData,
    })
      .then(function (response) {
       
        if (response.data.code === 1) {

          var variable = "Draft accepted successfully "
          Alerts.SuccessNormal(variable)
        }
      })
      .catch((error) => {
      
      });
  };


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
          <CustomerFilter
            setData={setAssignmentDisplay}
            getData={getAssignmentData}
            id={userId}
            assignment="completeAssignment"
            records={records}
            setRecords={setRecords}
          />
        </CardHeader>

        <CardBody>
          <Records records={records} />
          <div className="tableFixHead">
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={assignmentDisplay}
            columns={columns}
            classes="table-responsive"
          />
</div>
          <ViewAllReportModal
            ViewReport={ViewReport}
            reportModal={reportModal}
            report={report}
            getPendingforAcceptance={getAssignmentData}
          />
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getAssignmentData}
          />

        </CardBody>
      </Card>
    </>
  );
}

export default CompleteAssignment;
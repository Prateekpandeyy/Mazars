import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
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
import DiscardReport from "../AssignmentTab/DiscardReport";
import './index.css'
import ModalManual from "../ModalManual/AllComponentManual";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';


function AllAssignment() {
  const userId = window.localStorage.getItem("userid");
  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const [records, setRecords] = useState([]);
  const [report, setReport] = useState();
  const [dataItem, setDataItem] = useState({});
  const [reportModal, setReportModal] = useState(false);
  const [assignNo, setAssignNo] = useState('');
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [openManual, setManual] = useState(false)
  const needHelp = () => {
      
      setManual(!openManual)
  }
  const ViewReport = (key) => {

    setReportModal(!reportModal);
    setReport(key.assign_no);
    setDataItem(key)
  };
  var clcomp= {
    color: "green"
  }
  var clinpro = {
    color : "blue"
  }
  
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
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`
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
      style: {
        fontSize: "11px",
    },
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
      },
    },
   
    {
      dataField: "created",
      text: "Date",
      sort: true,
      style: {
          fontSize: "11px",
      },
      headerStyle: () => {
          return { fontSize: "11px", width:"120px", padding: "10px 20px", whiteSpace: "nowrap" };
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
      style: {
          fontSize: "11px",
      },
      headerStyle: () => {
          return { fontSize: "11px",    whiteSpace: "nowrap"  };
      },
      formatter: function nameFormatter(cell, row) {
       
          return (
              <>
                     <Link
                          to={{
                              pathname: `/customer/my-assingment/${row.id}`,
                              index : 0,
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
      style: {
        fontSize: "11px",
    },
      headerStyle: () => {
        return { fontSize: "12px" };
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
        return { fontSize: "11px", width: "200px" };
      },
      style : {
        fontSize : "11px"
      },
      formatter: function (cell, row) {
        return (
          <>
            <div>
            {row.paid_status == "2" &&
                <p>
                  <span style={{ color: "red" }}>Payment Declined</span>
                </p>
              }
              <p>
                <span style={{ fontWeight: "bold" }}>Client Discussion :</span>
               <span style={ row.client_discussion == "completed" ? clcomp : clinpro}>
{row.client_discussion}
                 </span>
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Draft report :</span>
                <span style={ row.draft_report == "completed" ? clcomp : clinpro}>
{row.draft_report}
                 </span>
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Final Discussion :</span>
                <span style={ row.final_discussion == "completed" ? clcomp : clinpro}>
{row.final_discussion}
                 </span>
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Delivery of Final Report :</span>
                <span style={ row.delivery_report == "completed" ? clcomp : clinpro}>
{row.delivery_report}
                 </span>
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Awaiting Completion:</span>
                <span style={ row.other_stage == "completed" ? clcomp : clinpro}>
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
      sort: true,
      style: {
        fontSize: "11px",
    },
      headerStyle: () => {
        return { fontSize: "12px", width : "120px" , padding: "10px 20px"};
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
      dataField: "final_date",
      text: "Actual date of delivery",
      sort: true,
      style: {
        fontSize: "11px",
    },
      headerStyle: () => {
        return { fontSize: "12px", width : "120px" , padding: "10px 20px"};
      },
      formatter: function dateFormat(cell, row) {
       
        var oldDate = row.final_date;
        if (oldDate == null || oldDate === "0000-00-00") {
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
              row.status === "Payment decliend" || row.paid_status === "2" ? null :
                <div>
                  {row.assignment_draft_report || row.final_report ?
                    <div title="View All Report"
                      style={{ cursor: "pointer", textAlign: "center" }}
                      onClick={() => ViewReport(row)}
                    >
                      <DescriptionOutlinedIcon color="secondary" />
                    </div>
                    :
                    null
                  }
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
      style: {
        fontSize: "11px",
    },
      formatter: priceFormatter,
    },
    {
      text: "Action",
      headerStyle: () => {
        return { fontSize: "12px", textAlign: "center", width: "70px" };
      },
      style: {
        fontSize: "11px",
    },
      formatter: function (cell, row) {
        return (
          <>
            {row.paid_status === "2" ? null :
            <div style={{ display: "flex", justifyContent: "space-between" }}>

            <div title="Send Message">
              <Link
                to={{
                  pathname: `/customer/chatting/${row.assign_id}`,
                  index : 0,
                  routes: "assignment",
                 
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

          </div>}
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
        <span title="help"> <i class="fa fa-question-circle" style={{cursor : "pointer", float: "right"}} onClick= {(e) => needHelp()}></i></span>
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
          <Modal isOpen={openManual} toggle={needHelp} size= "lg" syle={{zIndex : "99999"}}>
                        <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
                        <ModalBody>
                            <ModalManual />
                        </ModalBody>
                    </Modal>
          <div className="tableFixHead">
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={assignmentDisplay}
            columns={columns}
            classes="table-responsivepayment"
          />
          </div>

          <ViewAllReportModal
            ViewReport={ViewReport}
            reportModal={reportModal}
            report={report}
            getPendingforAcceptance={getAssignmentData}
            dataItem={dataItem}
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

export default AllAssignment;


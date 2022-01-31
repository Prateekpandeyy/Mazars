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
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../../components/Search-Filter/AdminFilter";
import Records from "../../components/Records/Records";
import DiscardReport from "../../pages/Admin/AssignmentTab/DiscardReport";
import RetviewModal from "../../pages/Admin/AllProposalComponent/RetviewModal"
import ShowProposal from "../../pages/Admin/AllProposalComponent/ShowProposal";
function PendingForAcceptence({ pendingProposal }) {
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [records, setRecords] = useState([]);
  const [retview, setRetview] = useState(false)
  const [assignNo, setAssignNo] = useState('');
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [viewProposalModal, setViewProposalModal] = useState(false)
  const [proposalId, setProposalId] = useState()
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }

  const showProposalModal2 = (e) => {
    console.log("eeee")
    setViewProposalModal(!viewProposalModal);
    setProposalId(e)
  }
  useEffect(() => {
    getPendingAcceptedProposal();
  }, []);

  const getPendingAcceptedProposal = () => {
    axios.get(`${baseUrl}/admin/getProposals?status1=1`).then((res) => {
     
      if (res.data.code === 1) {
        setProposalDisplay(res.data.result);
        setRecords(res.data.result.length);
        // pendingProposal(res.data.result.length);
      }
    });
  };

  const retviewProposal = (e) => {
    setRetview(!retview);
    setAssignNo(e)
  }
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
        return { fontSize: "11px" };
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
      return { fontSize: "11px" , width : "120px", whiteSpace : "nowrap", padding: "10px 20px"};
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
      return { fontSize: "11px" , width : "120px", whiteSpace : "nowrap", padding: "10px 20px"};
  },
      formatter: function nameFormatter(cell, row) {
      
        return (
          <>
            <Link
              to={{
                pathname: `/admin/queries/${row.q_id}`,
                index: 1,
                routes: "proposal",
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
        return { fontSize: "11px" };
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
        return { fontSize: "11px" };
      },
    },
    {
      text: "Date of Proposal",
      dataField: "DateofProposal",
      sort: true,
      style: {
        fontSize: "11px",
    },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {

        var oldDate = row.DateofProposal;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Date of acceptance of Proposal",
      dataField: "cust_accept_date",
      sort: true,
      style: {
        fontSize: "11px",
    },
      headerStyle: () => {
        return { fontSize: "11px" };
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
      style: {
        fontSize: "11px",
    },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status}/
              {
                row.status == "Inprogress" ?
                  <p className="inprogress">
                    {row.statusdescription}
                  </p>
                  :
                  null
              }
            </div>
          </>
        );
      },
    },
    {
      dataField: "",
      text: "Proposed Amount",
      sort: true,
      style: {
        fontSize: "11px",
    },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      sortFunc: (a, b, order, dataField) => {
        if (order === 'asc') {
          return b - a;
        }
        return a - b; // desc
      },
      formatter: function nameFormatter(cell, row){
        var nfObject = new Intl.NumberFormat('hi-IN')
         var x = row.ProposedAmount;
        
         return(
           <p className="rightAli">{nfObject.format(x)}</p>
         )
       }
    },
    {
      dataField: "accepted_amount",
      text: "Accepted Amount ",
      sort: true,
      style: {
        fontSize: "11px",
        color: "#21a3ce",
        wordBreak : "break-word"
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "#21a3ce" };
      },
      sortFunc: (a, b, order, dataField) => {
        if (order === 'asc') {
          return b - a;
        }
        return a - b; // desc
      },
      formatter: function nameFormatter(cell, row){
        var nfObject = new Intl.NumberFormat('hi-IN')
         var x = row.accepted_amount;
        
         return(
           <p className="rightAli">{nfObject.format(x)}</p>
         )
       }
    },
    {
      dataField: "tl_name",
      text: "TL name",
      sort: true,
      style: {
        fontSize: "11px",
    },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Action",
      headerStyle: () => {
        return { fontSize: "11px", width: "95px" };
      },
      style: {
        fontSize: "11px",
    },
      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex" }}>
            <div title="Send Message">
                <Link
                  to={{
                    pathname: `/admin/chatting/${row.q_id}`,
                    index: 1,
                    routes: "proposal",
                    obj: {
                      message_type: "2",
                      query_No: row.assign_no,
                      query_id: row.q_id,
                      routes: `/admin/proposal`
                    }
                  }}
                >
                  <i
                    className="fa fa-comments-o"
                    style={{
                      fontSize: 16,
                      cursor: "pointer",
                      marginLeft: "8px",
                      color: "blue"
                    }}
                  ></i>
                </Link>
              </div>

              <div title="View Discussion Message" className="ml-2">
                <i
                  className="fa fa-comments-o"
                  style={{
                    fontSize: 16,
                    cursor: "pointer",
                    color: "orange"
                  }}
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                ></i>
              </div>

              {row.statuscode > "3" ?
                 <div style={{ cursor: "pointer" }} title="View Proposal" className="ml-2">
                
                 <i
                   className="fa fa-eye"
                   style={{ color: "green", fontSize: "16px" }}
                   onClick={(e) => showProposalModal2(row.q_id)}
                 />
               
             </div>
                :
                null
              }

{
  row.statuscode == "6" ? 
  <>
<div title="Retview Proposal" className="ml-2"
 onClick={(e) => retviewProposal(row.q_id)}> 
<i
                    className="fa fa-share"
                    style={{
                      fontSize: 16,
                      cursor: "pointer",
                      marginLeft: "8px",
                      color: "red"
                    }}
                   
                  ></i>
</div>
  </> : null
}
              

            </div>
          </>
        );
      },
    },
  ];



  return (
    <div>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setProposalDisplay}
            getData={getPendingAcceptedProposal}
            pendingAcceptedProposal="pendingAcceptedProposal"
            setRecords={setRecords}
            records={records}
          />

        </CardHeader>
        <CardBody>
          <Records records={records} />
          <div className="tableFixHead">
          <BootstrapTable
            bootstrap4
            keyField= {"assign_no"}
            data={proposalDisplay}
            columns={columns}
            classes="table-responsivepayment"
          />
</div>
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getPendingAcceptedProposal}
          />
           <RetviewModal 
          retview = {retview}
          retviewProposal  = {retviewProposal }
          getProposalData  ={ getPendingAcceptedProposal}
          assignNo = {assignNo}
         />
         <ShowProposal 
          setViewProposalModal = {setViewProposalModal}
          viewProposalModal = {viewProposalModal}
          showProposalModal2 = {showProposalModal2}
          proposalId = {proposalId}/>
        </CardBody>
      </Card>
    </div>
  );
}

export default PendingForAcceptence;

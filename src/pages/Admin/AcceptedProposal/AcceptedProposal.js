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
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";
import Records from "../../../components/Records/Records";
import DiscardReport from "../AssignmentTab/DiscardReport";
import ShowProposal from "../AllProposalComponent/ShowProposal";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {EyeIcon, ViewDiscussionIcon, DiscussProposal, HelpIcon} from "../../../components/Common/MessageIcon";
function AcceptedProposal({ acceptedProposal }) {
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [records, setRecords] = useState([]);

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
    getAcceptedProposal();
  }, []);
  const getAcceptedProposal = () => {
    axios.get(`${baseUrl}/admin/getProposals?status1=2`).then((res) => {
   
      if (res.data.code === 1) {
        setProposalDisplay(res.data.result);
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
        return { width : "50px" };
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
                pathname: `/admin/queries/${row.q_id}`,
                index: 2,
                routes: "proposal",
              }}
            >{row.assign_no}</Link>
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
      text: "Date of Proposal",
      dataField: "DateofProposal",
      sort: true,
    
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
     
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>

              {
                row.status == "Accepted; Proposal" ?
                  <p className="completed">
                    {row.status}
                  </p> :
                  null
              }
            </div>
          </>
        );
      },
    },
    {
      dataField: "ProposedAmount",
      text: "Proposed Amount",
      sort: true,
     
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
      
    },
    {
      text: "Action",
     
      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex" }}>
            <Link
  to={{
    pathname: `/admin/chatting/${row.q_id}`,
    index: 2,
    routes: "proposal",
                    obj: {
                      message_type: "2",
                      query_No: row.assign_no,
                      query_id: row.q_id,
                      routes: `/admin/proposal`
                    }
                  }}
                >
                  <MessageIcon />
                </Link>
       
            <div  onClick={() => ViewDiscussionToggel(row.assign_no)} className="ml-1">
                                  
                                  <ViewDiscussionIcon />
                          </div>
              {row.statuscode > "3" || row.statuscode == "10" ?
                <div  onClick={(e) => showProposalModal2(row.q_id)} className="ml-1">
                <EyeIcon  />
               </div>
                :
                null
              }


             
                     

               


            </div>
          </>
        );
      },
    },
  ];



  return (
    <>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setProposalDisplay}
            getData={getAcceptedProposal}
            acceptedProposal="acceptedProposal"
            setRecords={setRecords}
            records={records}
          />

        </CardHeader>
        <CardBody>
          <Records records={records} />
          <DataTablepopulated 
                   bgColor="#42566a"
                   keyField= {"assign_no"}
                   data={proposalDisplay}
                   columns={columns}>
                    </DataTablepopulated>
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getAcceptedProposal}
            headColor="#42566a"
          />
           <ShowProposal 
          setViewProposalModal = {setViewProposalModal}
          viewProposalModal = {viewProposalModal}
          showProposalModal2 = {showProposalModal2}
          proposalId = {proposalId}/>
        </CardBody>
      </Card>
    </>
  );
}

export default AcceptedProposal;

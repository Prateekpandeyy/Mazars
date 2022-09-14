import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import RetviewModal from "./RetviewModal";
import { Link, NavLink } from "react-router-dom";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";
import Records from "../../../components/Records/Records";
import ViewComponent from "../ViewProposal/ViewComponent";
import DiscardReport from "../AssignmentTab/DiscardReport";
import ShowProposal from "./ShowProposal";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CommonShowProposal from '../../../components/commonShowProposal/CommonShowProposal';
import MessageIcon, {EyeIcon, ViewDiscussionIcon, DiscussProposal, HelpIcon} from "../../../components/Common/MessageIcon";
function AllProposalComponent({ allProposal }) {
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [records, setRecords] = useState([]);
  const [assignNo, setAssignNo] = useState('');
  const [viewData, setViewData] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [retview, setRetview] = useState(false)
  const [viewProposalModal, setViewProposalModal] = useState(false)
  const [proposalId, setProposalId] = useState()
  const token = window.localStorage.getItem("adminToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  const ViewHandler = (key) => {
   
    setViewModal(!viewModal);
    setViewData(key);
  };

const showProposalModal2 = (e) => {
 
  setViewProposalModal(!viewProposalModal);
  setProposalId(e)
}
  

  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }

  useEffect(() => {
    getProposalData();
  }, []);

  const getProposalData = () => {
    axios.get(`${baseUrl}/admin/getProposals`, myConfig).then((res) => {
    
      if (res.data.code === 1) {
        setProposalDisplay(res.data.result);
        setRecords(res.data.result.length);
      }
    });
  };

const retviewProposal = (e) => {
  setRetview(!retview);
  setAssignNo(e)
}
  const columns = [
    {
      text: "S.no",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
    
      headerStyle: () => {
        return { width : "50px"};
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
      text: "Query no",
    
      formatter: function nameFormatter(cell, row) {
     
        return (
          <>
            <Link
              to={{
                pathname: `/admin/queries/${row.q_id}`,
                index: 0,
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
      
    },
    {
      dataField: "cat_name",
      text: "Sub category",
      sort: true,
      
    },
    {
      text: "Date of proposal",
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
      text: "Date of acceptance / decline of proposal",
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
                row.status == "Inprogress" ?
                  <div>
                    {row.status}/
                    <p className="inprogress">
                      {row.statusdescription}
                    </p>
                  </div>
                  :
                  row.status == "Client Declined; Proposal" ?
                    <p className="declined">
                      {row.status}
                    </p> :
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
      text: "Proposed amount",
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
      text: "Accepted amount",
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
            <div style={{display: "flex"}}>
           
                <Link
               
                    to={{
                      pathname: `/admin/chatting/${row.q_id}`,
                      index: 0,
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
{
  row.statuscode == "6" ? 
  <>

<div  onClick={(e) => retviewProposal(row.q_id)}>
<DiscussProposal titleName ="Restore Proposal"/>
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
    <>
      <Card>
        <CardHeader>

          <AdminFilter
            setData={setProposalDisplay}
            getData={getProposalData}
            allProposal="allProposal"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>

        <CardBody>
          {/* <Records records={records} /> */}
          <DataTablepopulated 
                   bgColor="#42566a"
                   keyField= {"assign_no"}
                   data={proposalDisplay}
                   columns={columns}>
                    </DataTablepopulated>
          <ViewComponent
            ViewHandler={ViewHandler}
            viewModal={viewModal}
            viewData={viewData}
            getProposalData={getProposalData}
          />

          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getProposalData}
            headColor="#42566a"
          />
          <RetviewModal 
          retview = {retview}
          retviewProposal  = {retviewProposal }
          getProposalData  ={getProposalData}
          assignNo = {assignNo}
         />
       {
         viewProposalModal === true ?
         <CommonShowProposal 
         setViewProposalModal = {setViewProposalModal}
         viewProposalModal = {viewProposalModal}
         showProposalModal2 = {showProposalModal2}
         panel = "admin"
         proposalId = {proposalId} /> : ""
       }
        </CardBody>
      </Card>
    </>
  );
}

export default AllProposalComponent;

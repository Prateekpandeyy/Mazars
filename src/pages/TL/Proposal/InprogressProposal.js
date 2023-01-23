import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import ChatHistory from "./ChatHistory";
import DiscardReport from "../AssignmentTab/DiscardReport";
import CommonShowProposal from "../../../components/commonShowProposal/CommonShowProposal";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {EyeIcon, ViewDiscussionIcon, EditQuery, ActionIcon} from "../../../components/Common/MessageIcon";


function InprogressProposal() {
    const userid = window.localStorage.getItem("tlkey");
    const [records, setRecords] = useState([]);
    const [proposal, setProposal] = useState([]);
    const [count, setCount] = useState("");
    const [id, setId] = useState(null);

    const [addPaymentModal, setPaymentModal] = useState(false);
    const [viewProposalModal, setViewProposalModal] = useState(false)
    const [proposalId, setProposalId] = useState()
    const chatHandler = (key) => {
       setPaymentModal(!addPaymentModal);
        setId(key.assign_no);
    };

    const [assignNo, setAssignNo] = useState('');
    const [ViewDiscussion, setViewDiscussion] = useState(false);
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
        getProposalList();
    }, []);
    const token = window.localStorage.getItem("tlToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
    const getProposalList = () => {
        axios
            .get(`${baseUrl}/tl/getProposalTl?id=${JSON.parse(userid)}&status=1`, myConfig)
            .then((res) => {
          
                if (res.data.code === 1) {
                    setProposal(res.data.result);
                    setCount(res.data.result.length);
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
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { width: "50px" };
            },
        },
        {
            dataField: "query_date",
            text: "Query date",
            sort: true,
          
            formatter: function dateFormat(cell, row) {
            
                var oldDate = row.query_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
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
                                pathname: `/teamleader_queries/${row.id}`,
                                index : 1,
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
            text: "Payment  plan",
            dataField: "paymnet_plan_code",
            
            formatter : function paymentPlan (cell, row) {
               var subplan = "" ;
                if (row.paymnet_plan_code === "3" && row.sub_payment_plane === "2"){
                 subplan = "B"
                }
                else   if (row.paymnet_plan_code === "3" && row.sub_payment_plane === "1"){
                    subplan = "A"
                   }
                   return (
                    <>
                      {
                          row.paymnet_plan_code === null ? "" :
                          `${row.paymnet_plan_code} ${subplan}`
                      }
                    </>
                  )
            }
            
           
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
                            {row.status}/
                            {
                                row.status ===  "Inprogress" ?
                                    <p className="inprogress">

                                        {row.statusdescription}
                                    </p>
                                    :
                                    row.status ===  "Customer Declined; Proposal" ?
                                        <p className="declined">

                                            {row.statusdescription}
                                        </p> :
                                        row.status ===  "Accepted; Proposal" ?
                                            <p className="completed">
                                                {row.statusdescription}
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
            text: "Accepted amount ",
            sort: true,
           
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('hi-IN')
                 var x = row.accepted_amount;
                 
                 return(
                   <p className="rightAli">{nfObject.format(x)}</p>
                 )
               }
        },
        {
            text: "Action",
            dataField: "",
            
            formatter: function (cell, row) {
                return (
                    <>
                        <div style={{ display: "flex" }}>
                        <Link
 to={{
    pathname: `/teamleader/chatting/${row.id}`,
    index : 1,
    routes: "proposal",
                                                    obj: {
                                                        message_type: "2",
                                                        query_No: row.assign_no,
                                                        query_id: row.id,
                                                        routes: `/teamleader/proposal`
                                                    }
                                                }}
                                            >
                                              <MessageIcon />
                                            </Link>
                        <div  onClick={() => ViewDiscussionToggel(row.assign_no)} className="ml-1">
                                  
                                  <ViewDiscussionIcon />
                          </div>

                      
                                         
                                       
                                
                            <div className="ml-2">
                                {row.status_code ===  "4" ? (
 <Link 
 to={{
     pathname: `/teamleader/edit-proposal/${row.id}`,
     index : 1,
     routes: "proposal" }}>
     <EditQuery titleName="Edit Proposal"/>
 </Link>
                                ) : row.status_code ===  "2"&& row.work_by != "0" ? (
                                    <Link 
                                    to={{
                                        pathname: `/teamleader_sendproposal/${row.id}`,
                                        index : 1,
                                        routes: "proposal" }}>
                                      <ActionIcon titleName= "Decision on proposal" />
                                    </Link>
                                ) : null}
                            </div>

                            {row.status_code > "3" || row.status_code ===  "10" ?
                            <>
                                 <div   onClick={(e) => showProposalModal2(row.id)} title="View Proposal">
                
         <EyeIcon />
              
            </div>
                              
                                </>
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
                    <TeamFilter
                        setData={setProposal}
                        getData={getProposalList}
                        InprogressProposal="InprogressProposal"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader>
                <CardBody>
                <DataTablepopulated 
                   bgColor="#5f7b97"
                   keyField= {"assign_no"}
                   data={proposal}
                   columns={columns}>
                    </DataTablepopulated>

                    <ChatHistory
                        chatHandler={chatHandler}
                        addPaymentModal={addPaymentModal}
                        qno={id}
                    />

                    <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getProposalList}
                        headColor="#5f7b97"
                    />
                     {
                        viewProposalModal === true ?
                        <CommonShowProposal
                        setViewProposalModal = {setViewProposalModal}
                        viewProposalModal = {viewProposalModal}
                        showProposalModal2 = {showProposalModal2}
                        panel = "teamleader"
                        proposalId = {proposalId}/>
 : ""              
                    }
                </CardBody>
            </Card>
        </>
    );
}

export default InprogressProposal;


import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import DiscardReport from "../AssignmentTab/DiscardReport";
import CommonShowProposal from "../../../components/commonShowProposal/CommonShowProposal";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {EyeIcon, ViewDiscussionIcon, DiscussProposal, HelpIcon} from "../../../components/Common/MessageIcon";

function AcceptedProposal() {
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

    const getProposalList = () => {
        axios
            .get(`${baseUrl}/tl/getProposalTl?id=${JSON.parse(userid)}&status=2`)
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
            text: "S.No",
            dataField: "",
            formatter: (cellContent, row, rowIndex) => {
                return rowIndex + 1;
            },
           
            headerStyle: () => {
                return {  width: "50px" };
            },
        },
        {
            dataField: "query_date",
            text: "Query Date",
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
            text: "Query No",
            dataField: "assign_no",
           
            
            formatter: function nameFormatter(cell, row) {
              
                return (
                    <>

                        <Link
                            to={{
                                pathname: `/teamleader/queries/${row.id}`,
                                index : 2,
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
            text: "Sub Category",
            dataField: "cat_name",
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
            text: "Date of acceptance / decline of Proposal",
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
            text: "Action",
            dataField: "",
           
            formatter: function (cell, row) {
                return (
                    <>
                        <div style={{ display: "flex"}}>
                        
                       
                                            <Link
                                              to={{
                                                pathname: `/teamleader/chatting/${row.id}`,
                                                index : 2,
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
                           

                            {row.status_code > "3" || row.status_code == "10" ?
                            <>
                                 <div style={{ cursor: "pointer", marginLeft : "2px" }}   onClick={(e) => showProposalModal2(row.id)} title="View Proposal">
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
                        proposal="acceptedProposal"
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
                    <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getProposalList}
                    />
                     <CommonShowProposal
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


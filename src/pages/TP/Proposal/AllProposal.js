import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
import ChatHistory from "./ChatHistory";
 import DiscardReport from "../AssignmentTab/DiscardReport";
 import CommonShowProposal from "../../../components/commonShowProposal/CommonShowProposal";
 import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
 import MessageIcon, {EyeIcon, ViewDiscussionIcon, EditQuery, ActionIcon} from "../../../components/Common/MessageIcon";
 



function AllProposal() {
    const userid = window.localStorage.getItem("tpkey");
    const [records, setRecords] = useState([]);
    const [proposal, setProposal] = useState([]);
    const [count, setCount] = useState("");
    const [id, setId] = useState(null);
    const [assignNo, setAssignNo] = useState('');
    const [ViewDiscussion, setViewDiscussion] = useState(false);
    const [addPaymentModal, setPaymentModal] = useState(false);
    const [viewProposalModal, setViewProposalModal] = useState(false)
    const [proposalId, setProposalId] = useState()
    const token = window.localStorage.getItem("tptoken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
    const chatHandler = (key) => {
       
        setPaymentModal(!addPaymentModal);
        setId(key.assign_no);
    };
    const showProposalModal2 = (e) => {
      
        setViewProposalModal(!viewProposalModal);
        setProposalId(e)
      }
   


   
    const ViewDiscussionToggel = (key) => {
      
        setViewDiscussion(!ViewDiscussion);
        setAssignNo(key)
    }

    useEffect(() => {
        getProposalList();
    }, []);

    const getProposalList = () => {
        axios
            .get(`${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(userid)}`, myConfig)
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
                return { width: "60px" };
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
                                pathname: `/taxprofessional/queries/${row.id}`,
                                index : 0,
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
            dataField: "",
            text: "Proposed Amount",
            sort: true,
           
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
    pathname: `/taxprofessional/chatting/${row.id}`,
    index : 0,
    routes: "proposal",
                                                    obj: {
                                                        message_type: "2",
                                                        query_No: row.assign_no,
                                                        query_id: row.id,
                                                        routes: `/taxprofessional/proposal`
                                                    }
                                                }}
                                            >
                                              <MessageIcon />
                                            </Link>
                                     
                                            <div  onClick={() => ViewDiscussionToggel(row.assign_no)} className="ml-1">
                                  
                                  <ViewDiscussionIcon />
                          </div>
                       
                                           
                                
                            <div className="ml-2">
                                {row.status_code == "4" ? (
                                    <Link 
                                    to={{
                                        pathname: `/taxprofessional/edit-proposal/${row.id}`,
                                        index : 0,
                                        routes: "proposal" }}>
                                        <EditQuery titleName="Edit Proposal" />
                                    </Link>
                                ) : row.status_code == "2"&& row.work_by != "0" ? (
                                    <Link 
                                    to={{
                                        pathname: `/taxprofessional/sendproposal/${row.id}`,
                                        index : 0,
                                        routes: "proposal" }}>
                                                                             <ActionIcon titleName="Dicision on propsal"/>
                                    </Link>
                                ) : null}
                            </div>

                            {row.status_code > "3" || row.status_code == "10" ?
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
                    <TaxProfessionalFilter
                        setData={setProposal}
                        getData={getProposalList}
                        AllProposal="AllProposal"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader>
                <CardBody>
                <DataTablepopulated 
           bgColor="#42566a"
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
                        headColor="#42566a"
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

export default AllProposal;




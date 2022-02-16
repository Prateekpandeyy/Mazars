import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import {
    Card,
    CardHeader,
    CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./index.css";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import BootstrapTable from "react-bootstrap-table-next";
import Records from "../../components/Records/Records";
import Swal from "sweetalert2";
import ViewComponent from "./ViewComponent";
import DiscardReport from "../AssignmentTab/DiscardReport";
import CommonShowProposal from "../../components/commonShowProposal/CommonShowProposal";
import ModalManual from "../ModalManual/AllComponentManual";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import MessageIcon, {EyeIcon, ViewDiscussionIcon, DiscussProposal, HelpIcon} from "../../components/Common/MessageIcon";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
function ProposalTab() {
    const alert = useAlert();

    const userId = window.localStorage.getItem("userid");
    const [proposalDisplay, setProposalDisplay] = useState([]);
    const [proposalCount, setCountProposal] = useState("");
    const [records, setRecords] = useState([]);
   

    const [viewData, setViewData] = useState({});
    const [viewModal, setViewModal] = useState(false);
    const [assignNo, setAssignNo] = useState('');
    const [ViewDiscussion, setViewDiscussion] = useState(false);
     const [viewProposalModal, setViewProposalModal] = useState(false)
     const [openManual, setManual] = useState(false)
    const [proposalId, setProposalId] = useState()
    const ViewHandler = (key) => {

        setViewModal(!viewModal);
        setViewData(key);
    };


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
        getProposalData();
    }, []);

    const getProposalData = () => {
        axios
            .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}`)
            .then((res) => {
               
                if (res.data.code === 1) {
                    setProposalDisplay(res.data.result);
                    setCountProposal(res.data.result.length);
                    setRecords(res.data.result.length);
                }
            });
    };

    const needHelp = () => {
        
        setManual(!openManual)
    }
const rightAli = {
    display : "flex", 
    justifyContent : "flex-end", 
    Border : "0px"
}

    const columns = [
        {
            dataField: "",
            text: "S.No",
            formatter: (cellContent, row, rowIndex) => {
              return rowIndex + 1;
            },
            headerStyle : () => {
                return( {
                    width: "50px"
                })
            }
          },
        {
            text: "Date",
            dataField: "created",
            sort: true,
          
            formatter: function (cell, row) {
              
                var oldDate = row.created;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.toString().split("-").reverse().join("-");
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
                                pathname: `/customer/my-assingment/${row.q_id}`,
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
                                    row.status == "Declined; Proposal" ?
                                        <div>
                                            <p className="declined">
                                                {row.status}
                                            </p>
                                        </div> :
                                        row.status == "Accepted; Proposal" ?
                                            <div>
                                                <p className="completed">
                                                    {row.status}
                                                </p>
                                            </div> :
                                            null
                            }
                        </div>
                    </>
                );
            },
        },
        {
            text: "Proposed Amout",
            dataField: "ProposedAmount",
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
            text: "Accepted Amount",
            dataField: "accepted_amount",
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
                 console.log(nfObject.format(x))
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
                        {row.statuscode === "6" ? <div style={{display : "flex", justifyContent : "flex-start"}}>
                        <div title="Send Message">
                                    <Link
                                        to={{
                                            pathname: `/customer/chatting/${row.q_id}&type=2`,
                                            index: 0,
                                            routes: "proposal",
                                            obj: {
                                                message_type: "3",
                                                query_No: row.assign_no,
                                                query_id: row.q_id,
                                                routes: `/customer/proposal`
                                            }
                                        }}
                                    >
                                       <MessageIcon />
                                    </Link>
                                </div>

                                <div  onClick={() => ViewDiscussionToggel(row.assign_no)} className="ml-2">
                                  
                                  <ViewDiscussionIcon />
                          </div>

                        </div> : (
                            <div style={{ display: "flex", justifyContent: "flex-start"}}>
                               
                                    <Link
                                      to={{
                                        pathname: `/customer/chatting/${row.q_id}&type=2`,
                                        index: 0,
                                        routes: "proposal",     
                                            obj: {
                                                message_type: "3",
                                                query_No: row.assign_no,
                                                query_id: row.q_id,
                                                routes: `/customer/proposal`
                                            }
                                        }}
                                    >
                                        <MessageIcon />
                                    </Link>
                            

                                <div  onClick={() => ViewDiscussionToggel(row.assign_no)} className="ml-2">
                                  
                                        <ViewDiscussionIcon />
                                </div>

                                <div>
                                    {
                                        row.statuscode > 6 ?
                                             <>
                                 <div  onClick={(e) => showProposalModal2(row.q_id)} className="ml-2">
                                            <EyeIcon  />
                                           </div>
                              
                                </>
                                            :
                                            null
                                    }

                                    {
                                        row.statuscode == 4
                                            ?
                                            <div className="ml-2">
        
                                                <Link
                                      to={{
                                        pathname: `/customer/proposal_view/${row.q_id}`,
                                        index: 0,
                                        routes: "proposal",     
                                            
                                        }}
                                    >
                                           <DiscussProposal titleName ="Discussion on Proposal"/>
                                                </Link>
                                            </div>
                                            :
                                            null
                                    }
                                </div>

                            </div>
                        )
                        }
                    </>
                );
            },
        },
    ];



    return (
     
            <Card>
                <CardHeader>
                <span onClick= {(e) => needHelp()}> <HelpIcon /></span>
                    <CustomerFilter
                        setData={setProposalDisplay}
                        getData={getProposalData}
                        id={userId}
                        proposal="proposal"
                        records={records}
                        setRecords={setRecords}
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
   <CommonShowProposal
          setViewProposalModal = {setViewProposalModal}
          viewProposalModal = {viewProposalModal}
          showProposalModal2 = {showProposalModal2}
          proposalId = {proposalId}/>
             <Modal isOpen={openManual} toggle={needHelp} style={{display : "block", position: "absolute", left:"280px"}} size="lg">
                        <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
                        <ModalBody>
                            <ModalManual tar= {"proposalProcessing"} />
                        </ModalBody>
                    </Modal>
                </CardBody>
            </Card>
       
    );
}

export default ProposalTab;

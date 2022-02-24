import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "reactstrap";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import CommonServices from "../../../common/common";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import PaymentIcon from '@material-ui/icons/Payment';
import RejectedModal from "./RejectedModal";
import AssessmentIcon from '@material-ui/icons/Assessment';
import DiscardReport from "../AssignmentTab/DiscardReport";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {PaymentDecline, Payment, ViewDiscussionIcon, DiscussProposal, HelpIcon} from "../../../components/Common/MessageIcon";


function AllPayment() {
    const alert = useAlert();
    const { id } = useParams();
    const userid = window.localStorage.getItem("tlkey");
    const cust_id = window.localStorage.getItem("userid");
    const [records, setRecords] = useState([]);

    const [pay, setPay] = useState([]);
    const [count, setCount] = useState("");
    const [payment, setPayment] = useState([]);
    const [modal, setModal] = useState(false);

    const [assignNo, setAssignNo] = useState("");

    const [ViewDiscussion, setViewDiscussion] = useState(false);
    const [addPaymentModal, setPaymentModal] = useState(false);
    const rejectHandler = (key) => {
      
        setPaymentModal(!addPaymentModal);
        setAssignNo(key.assign_no)
    };


    useEffect(() => {
        getPaymentStatus();
    }, []);

    const getPaymentStatus = () => {
        axios.get(`${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userid)}&status=2`).then((res) => {
           
            if (res.data.code === 1) {
                setPayment(res.data.result);
                setCount(res.data.result.length);
                setRecords(res.data.result.length);

            }
        });
    };
  
    const ViewDiscussionToggel = (key) => {
        setViewDiscussion(!ViewDiscussion);
        setAssignNo(key)
    }

    const toggle = (key) => {
      
        setModal(!modal);

        fetch(`${baseUrl}//admin/getPaymentDetail?id=${key}`, {
            method: "GET",
            headers: new Headers({
                Accept: "application/vnd.github.cloak-preview",
            }),
        })
            .then((res) => res.json())
            .then((response) => {
            
                setPay(response.payment_detail);
            })
            .catch((error) => console.log(error));
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
            dataField: "query_created_date",
            text: "Query Date",
            sort: true,
        
            formatter: function dateFormat(cell, row) {
          
                var oldDate = row.query_created_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
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
                                pathname: `/teamleader/queries/${row.assign_id}`,
                                index : 2, 
                                routes: "paymentstatus",
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
            text: "Sub Category",
            sort: true,
          
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
            dataField: "status",
          
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
            text: "Amount Paid",
            dataField: "paid_amount",
            sort: true,
           
            sortFunc: (a, b, order, dataField) => {
              if (order === 'asc') {
                return b - a;
              }
              return a - b; // desc
            },
           
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('hi-IN')
                 var x = row.paid_amount;
                 
                 return(
                   <p className="rightAli">{nfObject.format(x)}</p>
                 )
               }
        },

        {
            text: "Outstanding Amount",
            dataField: "amount_outstanding",
            sort: true,
           
            sortFunc: (a, b, order, dataField) => {
              if (order === 'asc') {
                return b - a;
              }
              return a - b; // desc
            },
           
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('hi-IN')
                 var x = row.amount_outstanding;
                 
                 return(
                   <p className="rightAli">{nfObject.format(x)}</p>
                 )
               }
        },
        {
            text: "Date of Payment",
            dataField: "cust_paid_date",
            sort: true,
          
            formatter: function dateFormat(cell, row) {
             
                var oldDate = row.cust_paid_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
            },
        },
        {
            text: "Action",
        
            formatter: function (cell, row) {
                return (
                    <>
                    <div style={{display: "flex"}}>

<Link
                             to={{
                                pathname: `/teamleader/chatting/${row.id}`,
                                index: 2,
                                routes: "paymentstatus",
                        
                              obj: {
                                  message_type: "4",
                                  query_No: row.assign_no,
                                  query_id: row.id,
                                  routes: `/teamleader/paymentstatus`
                              }
                          }}
                      >
                          <MessageIcon />
                      </Link>
<div  onClick={() => ViewDiscussionToggel(row.assign_no)} className="ml-1">
                                  
                                  <ViewDiscussionIcon />
                          </div>
                          <Link
              to={{
                  pathname: `/teamleader/paydetails/${row.assign_id}`,
                  index : 2,
                  routes: "paymentstatus",
              }}
            >
                          <Payment />
                            </Link>

                          {
                               row.paid_status == "0" ?
                                   <div title="Payment decline" onClick={() => rejectHandler(row)}>
                                       <PaymentDecline />
                                   </div>
                                   : null
                           }
                       
                   </div>
                    </>
                );
            },
        },
    ]


    return (
        <>
            <Card>             
                <CardHeader>
                    <TeamFilter
                        setData={setPayment}
                        getData={getPaymentStatus}
                        Paid="Paid"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader>

                <CardBody>
                <DataTablepopulated 
                 bgColor="#3e8678"
                   keyField= {"assign_no"}
                   data={payment}
                   columns={columns}>
                    </DataTablepopulated>
<DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getPaymentStatus}
                        headColor="#3e8678"
                    />
                    <RejectedModal
                        rejectHandler={rejectHandler}
                        addPaymentModal={addPaymentModal}
                        assignNo={assignNo}
                        getPaymentStatus={getPaymentStatus}
                    />

                    <Modal isOpen={modal} fade={false} toggle={toggle}>
                        <ModalHeader toggle={toggle}>History</ModalHeader>
                        <ModalBody>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="row">S.No</th>
                                        <th scope="row">Date</th>
                                        <th scope="row">Amount</th>
                                    </tr>
                                </thead>
                                {pay.length > 0
                                    ? pay.map((p, i) => (
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{CommonServices.removeTime(p.payment_date)}</td>
                                                <td>{p.paid_amount}</td>
                                            </tr>
                                        </tbody>
                                    ))
                                    : null}
                            </table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>


                </CardBody>
            </Card>

        </>
    );
}

export default AllPayment;

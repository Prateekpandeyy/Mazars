import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
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
import { Link } from "react-router-dom";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";
import CommonServices from "../../../common/common";
import Records from "../../../components/Records/Records";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {ViewDiscussionIcon, Payment} from "../../../components/Common/MessageIcon";



function Unpaid() {

    const [payment, setPayment] = useState([]);

    const [paymentcount, setPaymentCount] = useState("");
    const [pay, setPay] = useState([]);
    const [records, setRecords] = useState([]);
    const [modal, setModal] = useState(false);
    const [assignNo, setAssignNo] = useState('');
    const [ViewDiscussion, setViewDiscussion] = useState(false);
    useEffect(() => {
        getPaymentStatus();
    }, []);

    const getPaymentStatus = () => {
        axios.get(`${baseUrl}/tl/getUploadedProposals?status=2`).then((res) => {
           
            if (res.data.code === 1) {
                setPayment(res.data.result);
                setPaymentCount(res.data.result.length);
                setRecords(res.data.result.length);

            }
        });
    };

    
    const toggle = (key) => {
       
        setModal(!modal);

      if(typeof(key) == "object"){

      }
      else{
        fetch(`${baseUrl}//admin/getPaymentDetail?id=${key}&&status=1`, {
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
      }
    };
    const ViewDiscussionToggel = (key) => {
        setViewDiscussion(!ViewDiscussion);
        setAssignNo(key)
    }
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
            text: "Date",
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
                                pathname: `/admin/queries/${row.assign_id}`,
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
            formatter : function (cell, row) {
                return(
                    <>
                    {row.paid_status == "2"  ?
                    <p className="declined">{row.status} </p> : 
                    <p>{row.status}</p>}
                    </>
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
            text : "Outstanding Amount",
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
            dataField: "tl_name",
            text: "TL name",
            sort: true,
           
        },
        {
            text: "Action",
           
            formatter: function (cell, row) {
                return (
                    <>
                       
                        <div style={{ display: "flex"}}>

                        <Link
              to={{
                pathname: `/admin/chatting/${row.assign_id}`,
                index : 2,
                routes: "paymentstatus",
                obj: {
                  message_type: "5",
                  query_No: row.assign_no,
                  query_id: row.assign_id,
                  routes: `/admin/paymentstatus`
                }
              }}
            >
<MessageIcon />
            </Link>
            <div  onClick={() => ViewDiscussionToggel(row.assign_no)} className="mx-1">
                                  
                                  <ViewDiscussionIcon />
                          </div>
                        <Link
              to={{
                pathname: `/admin/paydetails/${row.assign_id}`,
                index : 2,
                routes: "paymentstatus",
               
              }}
            >
                          <Payment />
                            </Link>
                        


                         


                      
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
                        setData={setPayment}
                        getData={getPaymentStatus}
                        paid="paid"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader>
                <CardBody>
                    <Records records={records} />
                    <DataTablepopulated 
                   bgColor="#3e8678"
                   keyField= {"assign_no"}
                   data={payment}
                   columns={columns}>
                    </DataTablepopulated>
                    <Modal isOpen={modal} fade={false} toggle={toggle}>
                        <ModalHeader toggle={toggle}>History</ModalHeader>
                        <ModalBody>
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                        <th scope="row">S.No</th>
                                        <th scope="row">Date of Payment</th>
                                        <th scope="row">Amount</th>
                                        <th scope="row">Payment Receipt</th>
                                    </tr>
                                </thead>
                                {pay.length > 0
                                    ? pay.map((p, i) => (
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{CommonServices.removeTime(p.payment_date)}</td>
                                                <td>{p.paid_amount}</td>
                                                <td><a href={p.receipt_url} target="_blank">Payment Receipt</a></td>
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
                    <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getPaymentStatus}
                        headColor="#3e8678"
                    />

                </CardBody>
            </Card>
        </div>
    );
}

export default Unpaid;

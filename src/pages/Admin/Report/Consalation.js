import React, {useState, useEffect} from 'react';
import Layout from "../../../components/Layout/Layout";
import { baseUrl } from '../../../config/config';
import axios from 'axios';
import ConsaltSearch from './ConsaltSearch';
import {
    Card,
    CardHeader,
    CardBody,
  } from "reactstrap";
  import { Link , useHistory} from 'react-router-dom';
  import BootstrapTable from 'react-bootstrap-table-next';
  import { Typography, Button } from '@material-ui/core';
const Consalation = () => {
    const userid = window.localStorage.getItem("adminkey")
    const [data, setData] = useState();
let history  = useHistory()
  const proc = {
      color : "green"
  }
  const unproc = {
    color : "red"
}
    const getData = () => {
        axios.get(`${baseUrl}/report/paymentReport`)
        .then((res) => {
          
            if(res.data.code === 1) {
                setData(res.data.result);
            }
        })
    }
    useEffect(() =>{
        getData()
    }, [])
    const columns = [
        
            {
            dataFeild : "",
            text : "S.No",
            formatter : (cellContent, row, rowIndex) =>{
              return rowIndex + 1
            },
            headerStyle: () => {
                return { fontSize: "12px", width: "50px" };
              },
        },
        {
          text: "Query No",
          dataField: "assign_no",
          headerStyle: () => {
            return { fontSize: "12px" };
          },
          formatter: function nameFormatter(cell, row) {
            return (
              <>
                <Link
                  to={{
                    pathname: `/admin/queries/${row.id}`,
                  
                    routes: "consalation",
                  }}
                >
                  {row.assign_no}
                </Link>
              </>
            );
          },
        },
        {
            dataField: "first_name",
            text: "Client Name",
            sort: true,
            style: {
              fontSize: "11px",
            },
            headerStyle: () => {
              return { fontSize: "11px" };
            },
          },
          {
            dataField: "customer_id",
            text: "Client Id",
            sort: true,
            style: {
              fontSize: "11px",
            },
            headerStyle: () => {
              return { fontSize: "11px" };
            },
          },
          {
            dataField : "mobile",
            text : "Mobile Number",
            sort : true,
            style : {
                fontSize : "11px"
            },
            headerStyle : () => {
                return { fontSize : "11px"}
            }
        },
          {
           dataField : "Invoice_Number",
           text : "Invoice No",
           sort : true,
           style : {
                fontSize : "11px"
           },
           headerStyle : () => {
               return {fontSize : "11px"}
           }
          },
         
          {
              dataField : "txn_date",
              text : "Payment Date",
              sort : true,
              style : {
                  fontSize : "11px"
              },
              headerStyle : () => {
                  return { fontSize : "11px"}
              },
              formatter : function formatterD (cell ,row) {
                  let a = row.txn_date.split("-").reverse().join("-")
                return(
                  <p>{a}</p>
                )
              }
          },
          {
            dataField : "payment_type",
            text : "Payment Type",
            sort : true,
            style : {
                fontSize : "11px"
            },
            headerStyle : () => {
                return { fontSize : "11px"}
            }
        },
        
        // {
        //    dataField : "bill_due_date",
        //     text : "Due Date",
        //     sort : true,
        //     style : {
        //         fontSize : "11px"
        //     },
        //     headerStyle : () => {
        //         return { fontSize : "11px"}
        //     }
        // },
     
        {
            dataField : "TL_Post_Id",
            text : "Tl Post",
            sort : true,
            style : {
                fontSize : "11px"
            },
            headerStyle : () => {
                return { fontSize : "11px"}
            }
        },
        {
            dataField : "Invoice_Amount",
            text : "Invoice Amount",
            sort : true,
            style : {
                fontSize : "11px"
            },
            headerStyle : () => {
                return { fontSize : "11px"}
            }
        },
        {
            dataField : "Tds_Deducted",
            text : "TDS Deducted",
            sort : true,
            style : {
                fontSize : "11px"
            },
            headerStyle : () => {
                return { fontSize : "11px"}
            }
        },
        {
            dataField: "Amt_Collected",
            text: "Amount Paid",
            sort: true,
            style: {
              fontSize: "11px",
            },
            headerStyle: () => {
              return { fontSize: "11px" };
            },
          },
        {
            dataField : "delay",
            text : "Delay Days",
            sort : true,
            style : {
                fontSize : "11px"
            },
            headerStyle : () => {
                return { fontSize : "11px"}
            }
        },
        {
            dataField : "",
            text : "Status",
            sort : true,
            style : {
                fontSize : "11px"
            },
            headerStyle : () => {
                return { fontSize : "11px"}
            },
            formatter : function formatterD (cell ,row) {
              let a ;
              if(row.status === "1"){
                  a = "Process"
              }
              else if(row.status === "2"){
                a = "Unprocess"
            }
              return(
                <p style= {row.status === "1" ? proc : unproc}>{a}</p>
              )
            }
        },
        {
            dataField : "receipt_url",
            text : "Receipt",
            sort : true,
            style : {
                fontSize : "11px"
            },
            headerStyle : () => {
                return { fontSize : "11px"}
            },
            formatter : function formatterName (cell , row) {
               return(
                <a target="_blank"
                href= {row.receipt_url}
              >
               Payment Receipt
              </a>
               )
            }
        },
    ]
    return(
  
        <>
        <Layout adminDashboard="adminDashboard" adminUserId={userid}>
 <Card>
     <CardHeader>
       <>
       <div className="row">
           <div className="col-md-6">
           <Typography variant="h4">Report Constellation</Typography>
         
             </div>
             <div className="col-md-6" style={{display : "flex", justifyContent : "flex-end"}}>
             <button  className="btn btn-lg btn btn-success" onClick = {() => history.goBack()}>Go Back </button>
               </div>
           </div>
<ConsaltSearch  setData = {setData} />
</>
     </CardHeader>
     <CardBody>
 
     <div className="tableFixHead">
     {data === undefined ? "" : 
     <BootstrapTable
     bootstrap4
     keyField="id"
     data={data}
     columns={columns}
     rowIndex
     classes="table-responsivepayment"
   />}
     </div>
     </CardBody>
 </Card>
        </Layout>
      
        </>
    )
}
export default Consalation;
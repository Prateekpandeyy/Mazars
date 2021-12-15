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
  import { Link } from 'react-router-dom';
  import BootstrapTable from 'react-bootstrap-table-next';
const Consalation = () => {
    const userid = window.localStorage.getItem("adminkey")
    const [data, setData] = useState();

  
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
            dataField: "first_name",
            text: "Name",
            sort: true,
            style: {
              fontSize: "11px",
            },
            headerStyle: () => {
              return { fontSize: "11px" };
            },
          },
          {
           dataField : "Invoice_Number",
           text : "Bill No",
           sort : true,
           style : {
                fontSize : "11px"
           },
           headerStyle : () => {
               return {fontSize : "11px"}
           }
          },
          {
            dataField: "Invoice_Amount",
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
              dataField : "txn_date",
              text : "Date",
              sort : true,
              style : {
                  fontSize : "11px"
              },
              headerStyle : () => {
                  return { fontSize : "11px"}
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
            text : "Tds Deducted",
            sort : true,
            style : {
                fontSize : "11px"
            },
            headerStyle : () => {
                return { fontSize : "11px"}
            }
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
<ConsaltSearch  setData = {setData}/>
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
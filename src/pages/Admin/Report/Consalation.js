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
  import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";

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
                return { width: "50px" };
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
           
          },
          {
            dataField: "customer_id",
            text: "Client Id",
            sort: true,
           
          },
          {
            dataField : "mobile",
            text : "Mobile Number",
            sort : true,
           
        },
          {
           dataField : "Invoice_Number",
           text : "Invoice No",
           sort : true,
          
          },
         
          {
              dataField : "txn_date",
              text : "Payment Date",
              sort : true,
             
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
            
        },
        {
            dataField : "Invoice_Amount",
            text : "Invoice Amount",
            sort : true,
           
        },
        {
            dataField : "Tds_Deducted",
            text : "TDS Deducted",
            sort : true,
            
        },
        {
            dataField: "Amt_Collected",
            text: "Amount Paid",
            sort: true,
           
          },
        {
            dataField : "delay",
            text : "Delay Days",
            sort : true,
           
        },
        {
            dataField : "",
            text : "Status",
            sort : true,
            
            formatter : function formatterD (cell ,row) {
              let a ;
              if(row.status === "1"){
                  a = "Matched"
              }
              else if(row.status === "2"){
                a = "Unmatched"
            }
              return(
                <p className= {row.status === "1" ? "completed" : "declined"}>{a}</p>
              )
            }
        },
        {
            dataField : "receipt_url",
            text : "Receipt",
            sort : true,
          
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
           <Typography variant="h4">Report Consolidate</Typography>
         
             </div>
             <div className="col-md-6" style={{display : "flex", justifyContent : "flex-end"}}>
             <button  className="autoWidthBtn" onClick = {() => history.goBack()}>Go Back </button>
               </div>
           </div>
<ConsaltSearch  setData = {setData} />
</>
     </CardHeader>
     <CardBody>
 
    
     {data === undefined ? "" : 
       <DataTablepopulated 
       bgColor="#42566a"
       keyField= {"assign_no"}
       data={data}
       columns={columns}>
        </DataTablepopulated>}
    
     </CardBody>
 </Card>
        </Layout>
      
        </>
    )
}
export default Consalation;
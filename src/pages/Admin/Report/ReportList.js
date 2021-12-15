import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl, baseUrl3 } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import { Typography , Button} from "@material-ui/core";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
const ReportList = () => {
    const userid = window.localStorage.getItem("adminkey")
    const [data, setData] = useState()
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
       axios.get(`${baseUrl}/report/getListOfReport?uid=${JSON.parse(userid)}`)
       .then((res) => {
           console.log("myResponse", res.data.result)
           setData(res.data.result)
       })
    }
   const del = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "It will permanently deleted !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          delReprot(id);
        }
      });
   }
    const delReprot = (e) => {
        axios.get(`${baseUrl}/report/deleteRecord?id=${e}&uid=${JSON.parse(userid)}`)
        .then((res) => {
            if(res.data.code === 1){
                Swal.fire({
                    title : "success", 
                    html : "Report deleted successfully",
                    icon : "success"
                })
            }
            getData()
        })
    }
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
        dataField: "created_date",
        text: "Created Date",
        sort: true,
        headerStyle: () => {
          return { fontSize: "12px", width : "200px" };
        },
        formatter : function formatter(cell, row) {
          //  console.log("row", row.split("").reverse().join("-"))
          let a = row.created_date.split(" ")[0].split("-").reverse().join("-")
          let b = row.created_date.split(" ")[1]

          return(
              <>
            <div style={{display : "flex", justifyContent : "space-around"}}>
            <span >{a}</span>
              <span>{b}</span>
            </div>
              </>
          )
        }
      },
      {
          dataField : "",
          text : "Action",
          headerStyle : () => {
              return { fontSize : "12px", width : "200px" }
          },
          formatter : function nameFormatter(cell, row) {
             
              return(
               <>
                  <div style={{display : "flex", justifyContent : "space-around"}}>
                
               <div title="Download">
               <a href ={`${baseUrl3}/${row.report_path}`} target="_blank">
                <CloudDownloadIcon />
                  </a>
               </div>
                  <i class="fa-thin fa-file-excel"></i>

<div title="Delete">
<DeleteIcon color = "danger" onClick = {() =>del(row.id)} />
</div>
                  </div>
               </>
              )
          }
      }
    
]
    return (

        <>
        <Layout adminDashboard="adminDashboard" adminUserId={userid}>
       <div className = "row">
           <div className="col-md-4">
           <Typography variant = "h4">
            Report List
        </Typography>
       </div>
       <div className="col-md-4">
     
          <Link to="/admin/reports" class="btn btn-primary">
                                   Generate Report
                                </Link>
           </div>
           <div className="col-md-4">
     
     <Link to="/admin/consalation" class="btn btn-primary">
                              Consalation Payment
                           </Link>
      </div>
       </div>
{data === undefined ? "" : 
       <div className="tableFixHead">
       <BootstrapTable
         bootstrap4
         keyField="id"
         data={data}
         columns={columns}
         rowIndex
         classes="table-responsivepayment"
       />
       </div>}
        </Layout>
      
        </>
    )
}
export default ReportList;
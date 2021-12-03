import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import { Typography , Button} from "@material-ui/core";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
import DeleteIcon from '@mui/icons-material/Delete';
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
      },
      {
          dataField : "",
          text : "Action",
          headerStyle : () => {
              return { fontSize : "12px", width : "400px" }
          },
          formatter : function nameFormatter(cell, row) {
             
              return(
               <>
                  <div style={{display : "flex", justifyContent : "space-around"}}>
                  <Button variant="contained" href={`${baseUrl3}/${row.report_path}`}>
                      Download
                  </Button>
                  {/* <Button variant="contained" color="success" onClick = {() =>delReprot(row.id)}>
                 Delete
                </Button> */}
                <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}  onClick = {() =>delReprot(row.id)}>
  Delete
</Button>
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
           <div className="col-md-6">
           <Typography variant = "h4">
            Report List
        </Typography>
       </div>
       <div className="col-md-6">
       <Button variant="contained" href="/#/admin/reports">
            Generate Report
        </Button>
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
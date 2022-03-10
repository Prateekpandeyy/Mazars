import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, styled } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import MessageModal from './MessageModal';
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import {
    Card,
    CardBody,
} from "reactstrap";
import { EditQuery , DeleteIcon} from '../../../components/Common/MessageIcon';
import Swal from 'sweetalert2';
import Layout from "../../../components/Layout/Layout";
const MyContainer = styled(Container)({

})

const FlashMessage = () => {
    const [messageBox, setMessageBox] = useState(false);
    const [allList, setList] = useState([])
    const [edit, isEdit] = useState(false)
    const [myVal222, setMyVal22] = useState(false)
    const [editData, setEditData] = useState()
    const userId = localStorage.getItem("adminkey")
    useEffect(() => {
        getList()
    }, [])
    const getList = () => {
        axios.get(`${baseUrl}/admin/getallnews?uid=${JSON.parse(userId)}`)
        .then((res) => {
           setList(res.data.result)
        })
       
    }
  const showMessage = (e) => {
      setMessageBox(!messageBox)
  }
  const editQuery = (e) => {
   
      setEditData(e)
      setMessageBox(!messageBox)
      isEdit(true)
  }
  const delQuery = (e) => {
    //   axios.get(`${baseUrl}/admin/removenews?uid=${userId}&id=${e.id}`)
    //   .then((res) => {
    //       console.log("response", res)
    //   })
    Swal.fire({
        title: "Are you sure?",
        text: "do you wnat to delete",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value === true) {
            axios.get(`${baseUrl}/admin/removenews?uid=${JSON.parse(userId)}&id=${e.id}`)
      .then((res) => {
          if(res.data.code === 1){
              Swal.fire({
                  title : "success",
                  html : "message deleted successfully", 
                  icon : "success"
              })
              getList()
          }
          else{
            Swal.fire({
                title : "error",
                html : "something went wrong, please try again", 
                icon : "error"
            })
          }
      })
  }
})
  }
  const myShowValue = (e, row) => {
      console.log("etarget", e.target.checked)
        if(e.target.checked === true){
            e.target.checked = true
            axios.get(`${baseUrl}/admin/setnewsstatus?uid=${JSON.parse(userId)}&id=${row.id}&status=0`)
       .then((res) => {
           console.log("res", res)
       })
        }
        else{
            e.target.checked = false
            axios.get(`${baseUrl}/admin/setnewsstatus?uid=${JSON.parse(userId)}&id=${row.id}&status=1`)
            .then((res) => {
                console.log("res", res)
            })
        }
          
     
  }
  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Date",
      dataField: "created_date",
     
    },
    {
        text: "Message",
        dataField: "news",
       
      },
     
      {
        text: "Action",
        dataField: "",
        headerStyle : () => {
            return {width: "150px"}
        },
        formatter : function(cell, row) {
            return(
                <>
             <div style={{display : "flex", justifyContent : "space-evenly"}}>
             <div onClick = {(e) => editQuery(row)}> 
 <EditQuery />
                </div>
                <div onClick = {(e) => delQuery(row)}> 
 <DeleteIcon />
                </div>
                <div>
                <label class="switch" onChange= {(e) => myShowValue(e, row)}>
  <input type="checkbox"  />
  <span class="slider round"></span>
</label>

                </div>
             </div>
                </>
            
            )
        }
        
      },
   
]
    return (
      <Layout adminDashboard="adminDashboard" adminUserId={userId}>
        <MyContainer>
     
       <button className="autoWidthBtn rightAlign my-2"  onClick = {showMessage}>Add News</button>
      <Card>
          <CardBody>
          <DataTablepopulated 
                  bgColor = "#5a625a"
                   keyField= {"assign_no"}
                   data={allList}
                   columns={columns}>
                    </DataTablepopulated>
          </CardBody>
          </Card>
       <MessageModal 
       messageBox = {messageBox}
       messageFun = {showMessage}
       editData = {editData}
       edit = {edit} 
       getList = {getList} />
      </MyContainer>
      </Layout>
    )
   
}
export default FlashMessage;
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
import CommonServices from "../../../common/common";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const MyContainer = styled(Container)({

})

const FlashMessage = () => {
    const [messageBox, setMessageBox] = useState(false);
    const [allList, setList] = useState([])
    const [edit, isEdit] = useState(false)
    const [myVal222, setMyVal22] = useState(false)
    const [editData, setEditData] = useState()
   const [check, setCheck] = useState(true)
    const userId = localStorage.getItem("adminkey")
    let history = useHistory()
    useEffect(() => {
        getList()
    }, [])
    const getList = () => {
        axios.get(`${baseUrl}/cms/getallnews?uid=${JSON.parse(userId)}`)
        .then((res) => {
           setList(res.data.result)
        })
       
    }
  const showMessage = (e) => {
   history.push("/admin/flashcontent")
  }
  const editQuery = (e) => {
   console.log("eee", e)
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
        text: "do you wnat to delete flash updates",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value === true) {
            axios.get(`${baseUrl}/cms/removenews?uid=${JSON.parse(userId)}&id=${e.id}`)
      .then((res) => {
          if(res.data.code === 1){
              Swal.fire({
                  title : "success",
                  html : "Flash Update deleted successfully", 
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

            
            axios.get(`${baseUrl}/cms/setnewsstatus?uid=${JSON.parse(userId)}&id=${row.id}&status=0`)
       .then((res) => {
           console.log("res", res)
           if(res.data.result === 1){
             setCheck(true)
           }
       })
        }
        else{
           
            axios.get(`${baseUrl}/cms/setnewsstatus?uid=${JSON.parse(userId)}&id=${row.id}&status=1`)
            .then((res) => {
                console.log("res", res)
                setCheck(false)
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
      headerStyle : () => {
        return {width: "150px"}
      },
      formatter : function dateFormatter(cell, row) {
        console.log("row", row.created_date.split(" "))
        let a = row.created_date.split(" ")
        return(
         
            <>
            {CommonServices.changeFormateDate(a[0])}
            </>
        )
    }
     
    },
    {
        text: "Heading",
        dataField: "heading",
       
      },
     
      {
        text: "Action",
        dataField: "",
        headerStyle : () => {
            return {width: "150px"}
        },
        formatter : function(cell, row) {
       if(row.status == "1"){
         setCheck(true)
         console.log("doneeee", row.id)
       }
       else{
         setCheck(false)
       }
            return(
                <>
             <div style={{display : "flex", justifyContent : "space-evenly"}}>
             <Link to={`/admin/flashcontent/${row.id}`}>

         <EditQuery titleName="Edit Flash Update"/>
        
         </Link>
                <div onClick = {(e) => delQuery(row)}> 
 <DeleteIcon titleName="Delete Flash Update" />
                </div>
              
                {
                  row.status == "1" ?
                  <div>
                  <label class="switch" onChange= {(e) => myShowValue(e, row)}>
    <input type="checkbox"  defaultChecked/>
    <span class="slider round"></span>
  </label>
  
                  </div> :
                  ""
                }
                {
                  row.status == "0" ?
                  <div>
                  <label class="switch" onChange= {(e) => myShowValue(e, row)}>
    <input type="checkbox"  />
    <span class="slider round"></span>
  </label>
  
                  </div> : ""
                }
             </div>
                </>
            
            )
        }
        
      },
   
]
    return (
      <Layout adminDashboard="adminDashboard" adminUserId={userId}>
        <MyContainer>
     
      <div className="headingContent">
        <h4>Flash Updates </h4>
      <button className="autoWidthBtn rightAlign my-2"  onClick = {showMessage}>
       New Flash Update </button>
        </div>
       
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
       getList = {getList}
       isEdit={isEdit}
       setMessageBox={setMessageBox} />
      </MyContainer>
      </Layout>
    )
   
}
export default FlashMessage;
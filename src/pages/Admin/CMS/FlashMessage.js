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
import CustomHeading from '../../../components/Common/CustomHeading';
const MyContainer = styled(Container)({

})

const FlashMessage = () => {
    const [messageBox, setMessageBox] = useState(false);
    const [allList, setList] = useState([])
    const [edit, isEdit] = useState(false)
    const [myVal222, setMyVal22] = useState(false)
    const [editData, setEditData] = useState()
    const [check, setCheck] = useState(false)
    const userId = localStorage.getItem("cmsId")
    let history = useHistory()
    useEffect(() => {
        getList()
    }, [])
    const token = localStorage.getItem("token")
 const myConfig = {
   headers : {
    "uit" : token
   }
 }
    const getList = () => {
        axios.get(`${baseUrl}/cms/getallnews?uid=${JSON.parse(userId)}`, myConfig)
        .then((res) => {
           setList(res.data.result)
        })
       
    }
  const showMessage = (e) => {
   history.push("/cms/flashcontent")
  }
  const editQuery = (e) => {
   
      setEditData(e)
      setMessageBox(!messageBox)
      isEdit(true)
  }
  const delQuery = (e) => {
   
    Swal.fire({
        title: "Are you sure?",
        text: "do you wnat to delete flash updates",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value === true) {
            axios.get(`${baseUrl}/cms/removenews?uid=${JSON.parse(userId)}&id=${e.id}`, myConfig)
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

        if(e.target.checked === true){

            
            axios.get(`${baseUrl}/cms/setnewsstatus?uid=${JSON.parse(userId)}&id=${row.id}&status=0`, myConfig)
       .then((res) => {
           
           if(res.data.result === 1){
             setCheck(true)
           }
           else if (res.data.code === 102){
            history.push("/cms/login")
          }
       })
        }
        else{
           
            axios.get(`${baseUrl}/cms/setnewsstatus?uid=${JSON.parse(userId)}&id=${row.id}&status=1`, myConfig)
            .then((res) => {
                if(res.data.code === 0){
                  setCheck(false)
                }
               
                else if (res.data.code === 102){
                  history.push("/cms/login")
                }
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
         return(
                <>
             <div style={{display : "flex", justifyContent : "space-evenly"}}>
             <Link to={`/cms_flashcontent/${row.id}`}>

         <EditQuery titleName="Edit flash update"/>
        
         </Link>
                <div onClick = {(e) => delQuery(row)}> 
 <DeleteIcon titleName="Delete Flash Update" />
                </div>
              
                {
                  row.status ===  "1" ?
                  <div>
                  <label className="switch" onChange= {(e) => myShowValue(e, row)}>
    <input type="checkbox"  defaultChecked/>
    <span className="slider round"></span>
  </label>
  
                  </div> :
                  ""
                }
                {
                  row.status ===  "0" ?
                  <div>
                  <label className="switch" onChange= {(e) => myShowValue(e, row)}>
    <input type="checkbox"  />
    <span className="slider round"></span>
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
      <Layout cmsDashboard="cmsDashboard">
        <Container maxWidth = "xl">
     
      <div className="headingContent">
        <CustomHeading>
          Flash updates
        </CustomHeading>
       
      <button className="autoWidthBtn rightAlign my-2"  onClick = {showMessage}>
       New flash update </button>
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
      </Container>
      </Layout>
    )
   
}
export default FlashMessage;
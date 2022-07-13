import React , {useState, useEffect} from 'react';
import Layout from "../../../components/Layout/Layout";
import {Container} from '@material-ui/core';
import {
  Card,
  CardBody,
} from "reactstrap";
import { styled } from "@material-ui/styles";
import { useHistory } from 'react-router';
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import DataTablepopulated from '../../../components/DataTablepopulated/DataTabel';
import  {DeleteIcon, EditQuery,} from "../../../components/Common/MessageIcon";
import { Link } from 'react-router-dom';
import myImg from './companyImg.jpeg';
import Swal from 'sweetalert2';
const UploadLink = () => {
    const [list, setList] = useState([])
    const [check, setCheck] = useState(false)
      const userId = window.localStorage.getItem("adminkey");
      const token = localStorage.getItem("token")
      const myConfig = {
        headers : {
         "uit" : token
        }
      }
      let history = useHistory()
      useEffect(() => {
        getList()
      }, [])
    
      const getList = () => {
        axios.get(`${baseUrl}/cms/removedoc?id==${JSON.parse(userId)}`, myConfig)
      
        .then((res) => {
        
         if(res.data.code === 1){
          setList(res.data.result)
         }
        })
      }
      const del = (id) => {
 

        Swal.fire({
            title: "Are you sure?",
            text: "Want to delete article? Yes, delete it!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
              axios.get(`${baseUrl}/cms/removedoc?id=?uid=${JSON.parse(userId)}&id=${id}`, myConfig)
              .then((res) => {
  console.log("response", res)
  if(res.data.code === 1){
    Swal.fire({
      title : "success",
      html  : "Article deleted successfully",
      icon : "success"
    })
    getList()
  }
  else{
    Swal.fire({
      title :"error",
      html : "Something went wrong , please try again",
      icon : "error"
    })
  }
              })
            }
        });
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
      ]
    return (
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>

<Container maxWidth="xl">
   
  
        <div className="headingContent">
        <h4>Upload Link </h4>
        <button 
    
    className="autoWidthBtn rightAlign my-2" onClick={(e) => {
      history.push("/cms/uploadlinkcontent")
    }}>New Link</button> 
        </div>
    <Card>
        <CardBody>
        <DataTablepopulated 
                   bgColor="#42566a"
                   keyField={'id'}
                   data={list}
                   columns={columns}>
                    </DataTablepopulated>
        </CardBody>
        </Card>
   {/* <a href={`${myImg}`}>Click to imag</a> */}
    </Container>
</Layout>
    )
}
export default UploadLink;
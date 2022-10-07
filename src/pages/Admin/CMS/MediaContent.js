import React, {useState, useEffect} from 'react';
import Layout from "../../../components/Layout/Layout";
import { Container, Box, Paper } from '@material-ui/core';
import {  styled } from '@mui/material';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { baseUrl, baseUrl3 } from '../../../config/config';
import {DeleteIcon} from "../../../components/Common/MessageIcon";
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import {EditQuery} from '../../../components/Common/MessageIcon';
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import {
  Card,
  CardBody,
} from "reactstrap";
import CustomHeading from '../../../components/Common/CustomHeading';
const MyBox = styled(Box)({
    display: "flex",
    width: "100%", 
    height: "500px",
    justifyContent: "center",
    alignItems: "center"
  })
  const InnerBox = styled(Paper)({
    display :"flex",
    flexDirection: "column",
    padding: "20px",
    minHeight: "300px",
    width: "400px",
    lineHeight : "30px",
    borderRadius: "10px"
  })
const MediaContent = () => {
  const [galleryData, setGalleryData] = useState([])
  const [large, setLarge] = useState(false)
    const userId = window.localStorage.getItem("adminkey");
    const token = window.localStorage.getItem("token")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
    useEffect(() => {
      getGalleryData()
    }, [])
    const getGalleryData = () => {
    
      axios.get(`${baseUrl}/cms/getgallarylist?uid=${JSON.parse(userId)}&type=image`, myConfig)
      .then((res) => {
     
        setGalleryData(res.data.result)
      
      })
    }
    let history = useHistory()
   
  const del = (e) => {
 

    Swal.fire({
        title: "Are you sure?",
        text: "Want to delete Photo Galllery ? Yes, delete it!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.value) {
          axios.get(`${baseUrl}/cms/removegallery?uid=${JSON.parse(userId)}&id=${e.id}`, myConfig)
          .then((res) => {

if(res.data.code === 1){
Swal.fire({
  title : "success",
  html  : "Photo Gallery deleted successfully",
  icon : "success"
})
getGalleryData()
}
else if (res.data.code === 102){
  history.push("/cms/login")
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
    {
      dataField: "",
      text: "Album name",
    
     
      formatter: function dateFormat(cell, row) {
return(
  <>
 <Link style={{display : "flex", height : "80%", overflow : "hidden"}} to = {{
                      pathname : "/cms/imagegallery", 
                      index : row
                    }}>
                   {row.title}
                 
                  </Link>
  </>
) }
    },
   
    {
      dataField: "created_date",
      text: "Date",
   
     
      formatter: function dateFormat(cell, row) {

        var oldDate = row.created_date;
        if (oldDate == null) {
          return null;
        }
   
        return oldDate.split(" ")[0].split("-").reverse().join("-");
      },
    },
   
   
    {
      dataField : "",
      text : "Action",
      formatter : function nameFormatter (cell, row) {
        return(
          <>
              
           <div style={{display : "flex", width: "70px", alignItems: "center", justifyContent: "space-evenly"}}>
           <Link 
                   to={`/cms/editimage/${row.id}`}
                   >
                     <EditQuery titleName="Edit Photo Gallery" />
                     </Link>
                   
                  <span onClick={() => del(row)}>
                            <DeleteIcon titleName="Delete Photo Gallery" />
                            </span>
           </div>
            
          </>
        )
      }
    }
  ]
    return(
    
      <Layout cmsDashboard="cmsDashboard">
      <Container maxWidth = "xl">
           
          
      <div className="headingContent">
        <CustomHeading>
          Photo gallery
          </CustomHeading>
            
               <button 
            
           className="autoWidthBtn rightAlign my-2" onClick={(e) => {
             history.push("/cms/mediagallery")
           }}>New photo gallery</button> 
               </div>
          <Card>
              <CardBody>
              <DataTablepopulated 
               bgColor="#42566a"
               keyField= {"assign_no"}
               data={galleryData}
               columns={columns}>
                </DataTablepopulated>
              </CardBody>
              </Card>
         
          </Container>
      </Layout>
    )
}
export default MediaContent;
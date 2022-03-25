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
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
const MyContainer = styled(Container)({

})
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
    useEffect(() => {
      getGalleryData()
    }, [])
    const getGalleryData = () => {
    
      axios.get(`${baseUrl}/cms/getgallarylist?uid=${JSON.parse(userId)}&type=image`)
      .then((res) => {
        console.log("res", res.data.result)
        setGalleryData(res.data.result)
        console.log("resMedia", res.data.result)
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
          axios.get(`${baseUrl}/cms/removegallery?uid=${JSON.parse(userId)}&id=${e.id}`)
          .then((res) => {
console.log("response", res)
if(res.data.code === 1){
Swal.fire({
  title : "success",
  html  : "Photo Gallery deleted successfully",
  icon : "success"
})
getGalleryData()
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
      text: "Image",
    
     
      formatter: function dateFormat(cell, row) {
return(
  <>
 <Link style={{display : "flex", height : "80%", overflow : "hidden"}} to = {{
                      pathname : "/cms/imagegallery", 
                      index : row
                    }}>
                    <img  id={row.id} key={row.id} src={`${baseUrl3}/assets/gallery/${row.name}`} 
                    style={{width: "50px", height: "50px"}} />
                 
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
      dataField: "title",
      text: "Title",
     
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
                     <Link style={{display : "flex", height : "80%", overflow : "hidden"}} to = {{
                      pathname : "/cms/imagegallery", 
                      index : row
                    }}>

                          <span title="Photo Gallery">
                          <InsertPhotoIcon className="inprogress" />
                          </span>
                              
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
       
        <MyContainer>
                <div className="headingContent">
                <h4>Photo Gallery </h4>
                <button 
            
            className="autoWidthBtn rightAlign my-2" onClick={(e) => {
              history.push("/cms/mediagallery")
            }}>New Photo Gallery</button> 
                </div>
                <div className="galleryContainer">
                <DataTablepopulated 
                   bgColor="#42566a"
                   keyField= {"assign_no"}
                   data={galleryData}
                   columns={columns}>
                    </DataTablepopulated>
                 

                </div>
                </MyContainer>
             
    )
}
export default MediaContent;
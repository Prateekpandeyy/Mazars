import React, {useState, useEffect} from 'react';
import Layout from "../../../components/Layout/Layout";
import { Container, Box, Paper } from '@material-ui/core';
import {  styled } from '@mui/material';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { baseUrl, baseUrl3 } from '../../../config/config';
import {DeleteIcon} from "../../../components/Common/MessageIcon";
import Swal from 'sweetalert2';
import CloseIcon from '@material-ui/icons/Close';
import ReactPlayer from "react-player";
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
const VideoMedia = () => {
  const [galleryData, setGalleryData] = useState([])
  const [large, setLarge] = useState(false)
  const [videoId, setVideoId] = useState()
  const [play, isPlay] = useState(false)
    const userId = window.localStorage.getItem("adminkey");
    useEffect(() => {
      getGalleryData()
    }, [])
    const getGalleryData = () => {
    
      axios.get(`${baseUrl}/cms/getgallarylist?uid=${JSON.parse(userId)}&type=video`)
      .then((res) => {
        console.log("res", res.data.result)
        setGalleryData(res.data.result)
      })
    }
    let history = useHistory()
    const del = (id) => {
 

      Swal.fire({
          title: "Are you sure?",
          text: "Want to delete articles? Yes, delete it!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.value) {
            axios.get(`${baseUrl}/cms/deleteimage?uid=${JSON.parse(userId)}&id=${id}`)
            .then((res) => {
console.log("response", res)
if(res.data.code === 1){
  Swal.fire({
    title : "success",
    html  : "Articles deleted successfully",
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
 
  const playVideo2 = (e) => {
    isPlay(true)
    setVideoId(`${baseUrl3}/assets/gallery/${e}`)
  }
    return(
       
        <MyContainer>
        <div className="headingContent">
        <h4>Media </h4>
        <button 
    
    className="autoWidthBtn rightAlign my-2" onClick={(e) => {
      history.push("/admin/videocontent")
    }}>New Media Gallery</button> 
        </div>
        <div className="galleryContainer">
         
         {
           galleryData.map((i) => (
            <div className="galleryBox" onClick = {(e) => playVideo2(i.name)}> 
            
            <video id={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`} />
            <h4 className="delIcon">{i.title}</h4> 
          
          <div className="delIcon">
          <span title="Delete Media" onClick={() => del(i.id)}>
           <DeleteIcon />
           </span>
           <h6>
             {i.created_date}
           </h6>
            </div>
         
           </div>
          
          ))
         }
      
        </div>
        {
          play === true ?
                
          <div className="modalBox">
          <div className="boxContainer">
          <div className="canBtn"  title="cancel">
              <h4>Recording Player</h4>
              <CloseIcon  onClick= {() => isPlay(false)} id="myBtn"/> </div>
         

         <div className="my2">
         <ReactPlayer
           url={videoId}
           controls={true}
           playing={true}
           width='100%'
           height='100%'
          />
             </div>
          </div>
     
    </div> : ""
        }
        </MyContainer>
             
    )
}
export default VideoMedia;
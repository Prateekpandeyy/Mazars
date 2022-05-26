import React , {useState, useEffect} from "react";
import { styled , makeStyles} from "@material-ui/styles";
import { baseUrl, baseUrl3 } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import {Container } from '@material-ui/core';
import { useHistory } from "react-router";
import {DeleteIcon} from "../../../components/Common/MessageIcon";
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import {
 
  Row,
  Col,
  
} from "reactstrap";
import { AiOutlinePlaySquare } from 'react-icons/ai';
import ReactPlayer from "react-player";
import CloseIcon from '@material-ui/icons/Close';
const MyContainer = styled(Container)({

})
const Groupvideo = () => {
  const [galleryData, setGalleryData] = useState([])
  const [videoId, setVideoId] = useState()
  const [play, isPlay] = useState(false)
  const userId = window.localStorage.getItem("adminkey");
  let history = useHistory();
  const token = localStorage.getItem("token")
  const myConfig = {
    headers : {
     "uit" : token
    }
  }
 
    useEffect(() => {
      getImages()
    }, [])
 
    const getImages = () => {
   if(history.location.index){
     
   
    axios.get(`${baseUrl}/cms/getgallarylist?uid=${JSON.parse(userId)}&type=video&id=${history.location.index.id}`, myConfig)
    .then((res) => {
     
      setGalleryData(res.data.result)
      
    })
    }
    
  }
  const del = (e) => {
 

    Swal.fire({
        title: "Are you sure?",
        text: "Want to delete media? Yes, delete it!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.value) {
          axios.get(`${baseUrl}/cms/deleteimage?uid=${JSON.parse(userId)}&id=${e.imageid}&imageid=${e.id}`, myConfig)
          .then((res) => {
console.log("response", res)
if(res.data.code === 1){
Swal.fire({
  title : "success",
  html  : "Media deleted successfully",
  icon : "success"
})
getImages()
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
        <>
     <Layout adminDashboard="adminDashboard" adminUserId={userId}>   
 <MyContainer>
 <div className="py-2">
      <Row>
          <Col md="4">
          <button
                className="autoWidthBtn" 
                onClick={() => history.goBack()}
              >
               
                Go Back
              </button>
              
            </Col>
            <Col md="4" align="center">
              <h4>Video Gallery</h4>
            </Col>
            </Row>
        </div>
 <div className="galleryContainer">
                 
 {
                   galleryData.map((i) => (
                    <div className="galleryBox" key={i.id}> 
                    {
                      i.name.split(".")[1] === "mp4" === true ?
                     <>
                      <div style={{position: "relative"}}>
                      <video 
                                 onClick = {(e) => playVideo2(i.name)}
                                 style={{display : "flex", zIndex: 1, width: "100%"}} id={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`}
           />
                      <span  onClick = {(e) => playVideo2(i.name)}>
                       <AiOutlinePlaySquare style={{display: "flex", 
                       color: "red", width: "40px", height:"40px", position: "absolute",
                       top: "20%", left: "50%" }} />
                       </span>
                       <div className="delIcon">
                  <span title="Delete Media" onClick={() => del(i)}>
                   <DeleteIcon />
                   </span>
                  
                    </div>
                        </div>
                              
                     </>
       :
       <>
      <img 
      
       style={{display : "flex", zIndex: 1, width: "100%"}} id={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`}
/>
<div className="delIcon">
                  <span title="Delete Media" onClick={() => del(i)}>
                   <DeleteIcon />
                   </span>
                  
                    </div>
</>

                     }
                
{/*                     
                  <video id={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`}
                   onClick={() => playVideo2(i.id)}></video>
                  <h4 style={{margin: "5px 10px"}}>{i.title}</h4>
                  
                   
                  
                  <div className="delIcon">
                  <span title="Delete Media" onClick={() => del(i)}>
                   <DeleteIcon />
                   </span>
                  
                    </div> */}
                 
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
       </Layout>  
       </>
    )
}
export default Groupvideo;
import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { useHistory, useParams  } from 'react-router';
import axios from 'axios';
import { baseUrl , baseUrl3} from '../../config/config';
import ReactPlayer from "react-player";
import CloseIcon from '@material-ui/icons/Close';
import {Breadcrumbs,  Box, Typography } from "@material-ui/core";
import { AiOutlinePlaySquare } from 'react-icons/ai';
import classes from './design.module.css';
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
const Videogallery = () => {
    const [galleryData, setGalleryData] = useState([])
    const userId = window.localStorage.getItem("adminkey");
    const [videoId, setVideoId] = useState()
    const [video, isVideo] = useState(false)
    const [play, isPlay] = useState(false)
    const [title, setTitle] = useState("")
    let history = useHistory()
    useEffect(() => {
        getGalleryVideo()
    }, [])
   const getGalleryVideo = () => {
    if(history.location.index){
     
   
        axios.get(`${baseUrl}/customers/getvideogallery?id=${history.location.index.id}`)
        .then((res) => {
        
          setGalleryData(res.data.result)
          res.data.result.map((i) => {
            setTitle(i.title)
           if(i.name.split(".")[1] === "mp4"){
             isVideo(true)
             
           }
          })
          
        })
        }
   }
   const playVideo2 = (e) => {
    isPlay(true)
    setVideoId(`${baseUrl3}/assets/gallery/${e}`)
  }

    return(
        <>
        {/* <Header noSign="noSign" />
        <MyContainer>
        <div className={classes.articleContent}>
        
        <div className={classes.articlesDetails}>
        <div>
        <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" to="/customer/media">
  Media Gallery
  </Link>
  <Link underline="hover" color="inherit" to="/customer/videolist">
  Video Gallery
  </Link>
  <Typography color="text.primary">  {title}</Typography>
  
  </Breadcrumbs></div> 
     
                 {
                     
                   galleryData.map((i) => (
                    
                   <div className="galleryBox">
                     {
                      video === true ?
                     <>
                       <span id="playVideo"  onClick = {(e) => playVideo2(i.name)}>
                       <AiOutlinePlaySquare style={{display: "flex", 
                       color: "red", width: "40px", height:"40px"}} />
                       </span>
                               <video 
                                 onClick = {(e) => playVideo2(i.name)}
                                 style={{display : "flex", zIndex: 1, width: "100%"}} id={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`}
           />
                     </>
       :
       <Link style={{display: "flex", height: "100%"}}
       to = {{
         pathname : "/customer/imagegallery",
                             index : i.name
                           }}><img 
       onClick = {(e) => playVideo2(i.name)}
       style={{display : "flex", zIndex: 1, width: "100%"}} id={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`}
/>
</Link>
                     }
           
                          
                 </div>
                 
                  
                  ))
                 }
              
              </div>
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
                </MyContainer> */}
                  <Header noSign="noSign" />
               <MyContainer>
   
  
   <div className={classes.articleContent}>
    {
      
       <div className={classes.articlesDetails}>
          <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" to="/customer/media">
  Media Gallery
  </Link>
  <Link underline="hover" color="inherit" to="/customer/videolist">
  Video Gallery
  </Link>
  <Typography color="text.primary">  {title}</Typography>
  
  </Breadcrumbs>

      <div style={{display: "flex", flexWrap: "wrap"}}>
      {
                     
                     galleryData.map((i) => (
                      
    
                   
    <div className="galleryBoxvideo">
    <div style={{display : "flex", justifyContent: "center", height: "70%", width: "100%", alignItems: "center"}}>
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
                        </div>
                              
                     </>
       :
       <Link style={{display: "flex", height: "100%"}}
       to = {{
         pathname : "/customer/imagegallery",
                             index : i.name
                           }}><img 
       
       style={{display : "flex", zIndex: 1, width: "100%"}} id={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`}
/>
</Link>
                     }
      </div>
              
                     </div>  
                    ))
                   }
      </div>


       </div>
   
     
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
                <Footer />
               </>
    )
}
export default Videogallery;
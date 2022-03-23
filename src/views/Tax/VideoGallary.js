import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import Data from './directData.js';
import Footer from '../../components/Footer/Footer';
import { useHistory, useParams  } from 'react-router';
import axios from 'axios';
import { baseUrl , baseUrl3} from '../../config/config';
import { Markup } from 'interweave';
import ReactPlayer from "react-player";
import CloseIcon from '@material-ui/icons/Close';
import {Breadcrumbs, Button, Box, Typography, Table, TableContainer, 
TableHead, TablePagination, TableBody, TableRow, TableCell } from "@material-ui/core";
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
    const [large, setLarge] = useState(false)
    const [selected, setSelected] = useState([])
    const [count, setCount] = useState(0)
    const [videoId, setVideoId] = useState()
    const [play, isPlay] = useState(false)
    let history = useHistory()
    useEffect(() => {
        getGalleryVideo()
    }, [])
   const getGalleryVideo = () => {
    if(history.location.index){
     
   
        axios.get(`${baseUrl}/customers/getvideogallery?id=${history.location.index.id}`)
        .then((res) => {
         
          setGalleryData(res.data.result)
          
        })
        }
   }
   const playVideo2 = (e) => {
    isPlay(true)
    setVideoId(`${baseUrl3}/assets/gallery/${e}`)
  }

    return(
        <>
        <Header noSign="noSign" />
        <MyContainer>
        <div className="StartPageDetails">
        
        <div className="mainContent2222">
        <div style={{display : "flex", width: "1000px"}}>
        <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" to="/customer/media">
  Media Gallery
  </Link>
  <Link underline="hover" color="inherit" to="/customer/media">
  Video Gallery
  </Link>
  <Typography color="text.primary">  Video List</Typography>
  
  </Breadcrumbs></div> 
     
                 {
                     
                   galleryData.map((i) => (
                    
                   <div className="galleryBox">
 
                               <video 
                                 onClick = {(e) => playVideo2(i.name)}
                                 style={{display : "flex", width: "100%"}} id={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`}
           />
       
            <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
            <h4 style={{margin: "5px 10px"}}>{i.title}</h4>
            <h4>{i.created_date.split(" ")[0].split("-").reverse().join("-")}</h4>
                </div>
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
                </MyContainer>
               </>
    )
}
export default Videogallery;
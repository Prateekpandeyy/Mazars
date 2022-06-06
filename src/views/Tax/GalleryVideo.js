import React , {useState, useEffect} from "react";
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import {Breadcrumbs,  Box, Typography} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import { baseUrl, baseUrl3 } from "../../config/config";
import axios from "axios";
import './style.css';
import classes from './design.module.css';
    const MyContainer = styled(Box)({
        display : "flex", 
        justifyContent : "center", 
        alignItems : "center", 
        width: "100%",
        flexDirection : "column"
      })
const GalleryVideo = () => {
  const [images, setImages] = useState([])
  const [title, setTitle] = useState("")
  let history = useHistory();
  
    useEffect(() => {
      getImages()
    }, [])
    const getImages = () => {
   console.log("history", history)
      let obj = []
      if(history.location.hash === "#images"){
        axios.get(`${baseUrl}/customers/getgallery?id=${history.location.index.id}`)
        .then((res) => {
         
        res.data.result.map((i) => {
          setTitle(i.title)
          let  a = {
            original : `${baseUrl3}/assets/gallery/${i.name}`,
            thumbnail : `${baseUrl3}/assets/gallery/${i.name}`
          }
          obj.push(a)
        
       setImages(obj)
        })
        })
       
      }
     else if(typeof(history.location.index) === 'string'){
    
      axios.get(`${baseUrl}/customers/getvideogallery?id=${history.location.index}`)
      .then((res) => {
       
      res.data.result.map((i) => {
        setTitle(i.title)
        let  a = {
          original : `${baseUrl3}/assets/gallery/${i.name}`,
          thumbnail : `${baseUrl3}/assets/gallery/${i.name}`
        }
        obj.push(a)
      
     setImages(obj)
      })
      })
     
     }
     else{
     
       setTitle(history.location.hash.substring(1))
       
      let  a = {
        original : `${baseUrl3}assets/gallery/${history.location.index}`,
        thumbnail : `${baseUrl3}assets/gallery/${history.location.index}`
      }
      obj.push(a)
    
   setImages(obj)
     }
        }
   
    return(
        <>
         <Header noSign="noSign" />
        <MyContainer>
   
  
        <div className={classes.articleContent}>
      
     
            <span style={{display: "flex", margin : "10px 0px", width: "100%", justifyContent: "space-between"}}>
            <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
  
  <Link underline="hover" color="inherit" to = {`/customer/media`}>
 Media Gallery
  </Link>
  {
    typeof(history.location.index) === 'object' ?
    <Link underline="hover" color="inherit" to = {`/customer/media`}>
 Photo Gallery
  </Link> :
  <Link underline="hover" color="inherit" to = {`/customer/videogallery`}>
  Video Gallery
   </Link>
  }
  
  <Typography>{title}</Typography>
 
</Breadcrumbs>
<button
                className="autoWidthBtn" 
                onClick={() => history.goBack()}
              >
            
                Go Back
              </button>
              </span>
       
            
        
            {images.length > 0 ? 
     <ImageGallery items={images} 
     
     additionalClass = {classes.myVideo} /> : "" }
        </div>
      
       </MyContainer>
      
       </>
    )
}
export default GalleryVideo;
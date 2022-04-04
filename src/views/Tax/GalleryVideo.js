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
      let obj = []
     if(history.location.index){
     
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
        }
    
   
    return(
        <>
         <Header noSign="noSign" />
        <MyContainer>
   
  
        <div className="StartPageDetails">
      
            <div style={{display : "flex", width:"1000px", justifyContent: "center",
          alignItems: "flex-start", flexDirection: "column", padding: "5px 0px"}}>
            <span style={{textAlign: "left"}}>
            <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
  
  <Link underline="hover" color="inherit" to = {`/customer/media`}>
 Media Gallery
  </Link>
  <Link underline="hover" color="inherit" to = {`/customer/media`}>
 Photo Gallery
  </Link>
  
  <Typography color="text.primary"> {title}</Typography>
</Breadcrumbs>
        
              </span>
        <div style={{display: "flex", margin: "20px 0 10px 0", 
        width:"100%", justifyContent: "center", alignItems: "center"}}>
    {images.length > 0 ? 
     <ImageGallery items={images} 
     
     additionalClass = {classes.myVideo} /> : "" }
            </div>
            </div>
        
         
        </div>
      
       </MyContainer>
   
       </>
    )
}
export default GalleryVideo;
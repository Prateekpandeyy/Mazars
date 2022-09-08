import React , {useState, useEffect} from "react";
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import {Breadcrumbs,  Box, Typography} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import { baseUrl, baseUrl3 } from "../../config/config";
import axios from "axios";
import './style.css';
import MyContainer from "../../components/Common/MyContainer";
const GroupVideo = () => {
  const [images, setImages] = useState([])
  
  let history = useHistory();
   
    useEffect(() => {
      getImages()
    }, [])
    const getImages = () => {
      let obj = []
     if(history.location.index){
     
      axios.get(`${baseUrl}/customers/getvideogallery?id=${history.location.index.id}`)
      .then((res) => {
  
      res.data.result.map((i) => {

        let  a = {
          original : `${baseUrl3}/assets/gallery/${i.name}`,
          thumbnail : `${baseUrl3}/assets/gallery/${i.name}`
        }
        obj.push(a)
        console.log("aa", a, obj)
     setImages(obj)
      })
      })
     
     }
     console.log("obj", obj)
    }
    
   
    return(
        <>
         <Header noSign="noSign" />
        <MyContainer>
   
  
        <div className="StartPageDetails">
      
            <div style={{display : "flex", width:"1000px", justifyContent: "center",
          alignItems: "flex-start", flexDirection: "column", padding: "5px 0px"}}>
            <span style={{textAlign: "left"}}>
            <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb" style={{fontSize : "18px"}}>
  
  <Link underline="hover" color="inherit" to = {`/customer/media`}>
 Media gallery
  </Link>
  <Link underline="hover" color="inherit" to = {`/customer/media`}>
 Photo gallery
  </Link>
  
  
</Breadcrumbs>
        
              </span>
        <div style={{display: "flex", width:"100%", justifyContent: "center", alignItems: "center"}}>
    {images.length > 0 ? 
     <ImageGallery items={images} 
     height={300}
     additionalClass = "myVideo" /> : "" }
            </div>
            </div>
        
         
        </div>
      
       </MyContainer>
   
       </>
    )
}
export default GroupVideo;
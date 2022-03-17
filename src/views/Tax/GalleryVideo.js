import React from "react";
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import {Breadcrumbs,  Box, Typography} from "@material-ui/core";
import { Link } from "react-router-dom";
import ImageGallery from 'react-image-gallery'
import './style.css';
    const MyContainer = styled(Box)({
        display : "flex", 
        justifyContent : "center", 
        alignItems : "center", 
        width: "100%",
        flexDirection : "column"
      })
const GalleryVideo = () => {
    const images = [
        {
          original: 'https://picsum.photos/id/1018/1000/600/',
          thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1015/1000/600/',
          thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
      ];
      
    return(
        <>
         <Header noSign="noSign" />
        <MyContainer>
   
  
        <div className="StartPageDetails">
      
            <div className="mainContent222">
             <Breadcrumbs separator="<" maxItems={3} aria-label="breadcrumb">
  
  <Link underline="hover" color="inherit" to = {`/customer/media`}>
 Media Gallery
  </Link>
  <Link underline="hover" color="inherit" to = {`/customer/media`}>
 Photo Gallery
  </Link>
  
  <Typography color="text.primary"> Nature Image(Make your life easy)</Typography>
</Breadcrumbs>
        
        <div>
        <ImageGallery items={images} 
        height={300}
        additionalClass = "myVideo" />
            </div>
            </div>
        
         
        </div>
      
       </MyContainer>
   
       </>
    )
}
export default GalleryVideo;
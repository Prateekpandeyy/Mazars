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
import MyContainer from "../../components/Common/MyContainer";
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
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
          console.log("Iname", i.name.split(".")[0] + "_thumb")
          let thumb =  i.name.split(".")[0] + "_thumb." + i.name.split(".")[1];
          let poster = i.name.split(".")[0] + "_poster." + i.name.split(".")[1]
          let fullScreen = i.name
          console.log("poster", poster)
          let  a = {

            original : `${baseUrl3}/assets/gallery/${poster}`,
            thumbnail : `${baseUrl3}/assets/gallery/${thumb}`,
            fullscreen : `${baseUrl3}/assets/gallery/${fullScreen}`
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
        <OuterloginContainer>
        <Header noSign="noSign" />
        <MyContainer>
   
  
        <div className={classes.articleContent}>
        <div className={classes.articlesDetails}>
     
         <>
         <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb" style={{fontSize : "18px"}}>
  
  <Link underline="hover" color="inherit" to = {`/customer/media`}>
 Media gallery
  </Link>
  {
    typeof(history.location.index) === 'object' ?
    <Link underline="hover" color="inherit" to = {`/customer/media`}>
 Photo gallery
  </Link> :
  <Link underline="hover" color="inherit" to = {`/customer/videogallery`}>
  Video gallery
   </Link>
  }
  
  <Typography>{title}</Typography>
 
</Breadcrumbs>

         </>
      
            {images.length > 0 ? 
     <ImageGallery items={images} 
     
     additionalClass = {classes.myVideo} /> : "" }
        </div>
      </div>
      
       </MyContainer>
        </OuterloginContainer>
      
       </>
    )
}
export default GalleryVideo;
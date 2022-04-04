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
import pngAlbum from './album.png';
import {Breadcrumbs, Button, Box, Typography, } from "@material-ui/core";
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
const Media = () => {
    const [galleryData, setGalleryData] = useState([])
    const userId = window.localStorage.getItem("adminkey");
    const [large, setLarge] = useState(false)
    const [selected, setSelected] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
      getGalleryData()
    }, [])
    const getGalleryData = () => {
    
      axios.get(`${baseUrl}/customers/getgallery`)
      .then((res) => {
        console.log("res", res.data.result)
        setGalleryData(res.data.result)
      })
    }
    let history = useHistory()
    let kk = []
   const enLarge = (e) => {
   
  history.push("/customer/imagegallery")
   }
  
    return(
        <>
        <Header noSign="noSign" />
        <MyContainer>
        <div className="StartPageDetails">
        
        <div className="mainContentvideo">
        <div style={{display : "flex", width: "1000px"}}>
        <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" to="/customer/media">
  Media Gallery
  </Link>
  <Typography color="text.primary">  Photo Gallery</Typography>
  
  </Breadcrumbs></div> 
     
                 {
                     
                   galleryData.map((i) => (
                    
  
                 
  <div className="galleryBoxvideo">
  <div style={{display : "flex", justifyContent: "center", height: "70%", width: "100%", alignItems: "center"}}>
  <Link style={{display: "flex", height: "100%"}}
  to = {{
    pathname : "/customer/imagegallery",
                        index : i
                      }}>
                        <img src={pngAlbum} 
                        style={{display : "flex", width: "100%", height: "100%", }}
                         id={i.id} 
                        />
  
                               
             </Link>
    </div>
             <div style={{ padding: "5px 10px", width: "100%", justifyContent: "space-between"}}>
              <h5>{i.title}</h5>
              <h5>{i.created_date.split(" ")[0].split("-").reverse().join("-")}</h5>
                  </div>
                   </div>  
                  ))
                 }
              
              </div>
                </div>
                </MyContainer>
                <Footer />
               </>
    )
}
export default Media;
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
import {Breadcrumbs, Button, Box, Typography, Table, TableContainer, 
TableHead, TablePagination, TableBody, TableRow, TableCell } from "@material-ui/core";
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
        
        <div className="mainContent2222">
        <div style={{display : "flex", width: "1000px"}}>
        <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" to="/customer/media">
  Media Gallery
  </Link>
  <Typography color="text.primary">  Photo Gallery</Typography>
  
  </Breadcrumbs></div> 
     
                 {
                     
                   galleryData.map((i) => (
                    
                   
  <Link className="galleryBox" to = {{
                      pathname : "/customer/imagegallery", 
                      index : i
                    }}>
                    <img  id={i.id} key={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`} />
                    <div style={{display: "flex", padding: "5px 10px", width: "100%", justifyContent: "space-between"}}>
            <h4>{i.title}</h4>
            <h4>{i.created_date.split(" ")[0].split("-").reverse().join("-")}</h4>
                </div>
                  </Link>
                 
                  
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
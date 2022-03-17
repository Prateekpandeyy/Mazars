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
   
  history.push("/customer/videogallery")
   }
  
    return(
        <>
        <Header noSign="noSign" />
        <MyContainer>
        <div className="StartPageDetails">
        
        <div className="mainContent2222">
        <div style={{display : "flex", width: "1000px"}}>
        <Breadcrumbs separator="<" maxItems={3} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" to="/customer/media">
  Media
  </Link>
  
  
  </Breadcrumbs></div> 
     
                 {
                     
                   galleryData.map((i) => (
                    
                    <div className="galleryBox" onClick={() => enLarge(i.id)}> 
                    
                    <img  id={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`} />
                    <h4 className="delIcon">{i.title}</h4>
                  </div>
                  
                  ))
                 }
              
              </div>
                </div>
                </MyContainer>
               </>
    )
}
export default Media;
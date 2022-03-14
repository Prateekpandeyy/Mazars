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
import { Button, Box, Typography, Table, TableContainer, 
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
   const enLarge = (e) => {
    let img = document.getElementById(e);
   if(large === false){
    img.style.transform = "scale(2)";
    img.style.transition = "transform 0.25s ease";
    setLarge(true)
   }
   else if (large === true){
    img.style.transform = "scale(1)";
    img.style.transition = "transform 0.25s ease"
    setLarge(false)
   }
   
   }
  
    return(
        <>
        <Header noSign="noSign" />
        <MyContainer>
        <div className="StartPageDetails">
        
        <div className="mainContent2222">
        <h4 style={{display : "flex", width: "1000px"}}>Media </h4> 
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
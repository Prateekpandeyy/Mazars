import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { useHistory, useParams  } from 'react-router';
import axios from 'axios';
import { baseUrl, baseUrl3 } from '../../config/config';
import { Markup } from 'interweave';
import {Breadcrumbs, Box, Typography } from "@material-ui/core";
import CommonServices from '../../common/common.js';
import DownloadIcon from '@mui/icons-material/Download';
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
const Details = () => {
  let history = useHistory();
  let getId = useParams();
  const [data, setData] = useState([])
  const [linkdata, setLinkData] = useState("direct")
  console.log("history", history.location)
  useEffect(() => {
    getData()
  }, [])
  const getData = (e) => {
    console.log("getId", getId.id)
   if(history.location.index !== undefined){
    axios.get(`${baseUrl}/customers/getarticles?id=${history.location.index}`)
    .then((res) => {
      console.log("resData", res)
      setData(res.data.result)
      if(history.location.hash == "#direct"){
        setLinkData("direct")
      }
      else if(history.location.hash == "#indirect"){
        setLinkData("indirect")
      }
    })
  }
}

    return(
       <>
        <Header noSign="noSign" />
        <MyContainer>
   
  
        <div className="StartPageDetails">
         {
           data.map((i) => (
            <div className="mainContent222">
             <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
             <Link underline="hover" color="inherit" to="/customer/direct">
  Articles
  </Link>
  <Link underline="hover" color="inherit" to = {`/customer/${linkdata}`}>
  {CommonServices.capitalizeFirstLetter(linkdata) + " tax"}
  </Link>
  
  <Typography color="text.primary"> {i.heading}</Typography>
</Breadcrumbs>
           <div style={{margin: "10px 0"}}>
           <div style={{display: "flex", width: '100%',
            justifyContent : "space-between", 
            alignItems: "center"}}>
           <h5> {i.heading} </h5>
          <a href={`${baseUrl}/${i.file}`} target="_blank">
          <DownloadIcon style={{color : "red"}} title="download"/>
          </a>
         
         
           </div>
            <h6>Writer -  {i.writer} </h6>
           
           <h6>Date of publishing -   {i.publish_date.split("-").reverse().join("-")} </h6>
         
            
             </div>
     
    <Markup content={i.content} />
            </div>
        
           ))
         }
        </div>
      
       </MyContainer>
       <Footer />
       </>
  
    )
}
export default Details;
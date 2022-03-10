import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import Data from './directData.js';
import Footer from '../../components/Footer/Footer';
import { useHistory, useParams  } from 'react-router';
import axios from 'axios';
import { baseUrl } from '../../config/config';
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
const Details = () => {
  let history = useHistory();
  let getId = useParams();
  const [data, setData] = useState([])
  console.log("history", history.location.index)
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
            <h3>Articles </h3>
           <div style={{margin: "10px 0"}}>
           <h5> {i.heading} </h5>
            <h6>Writer -  {i.writer} </h6>
            <h6>Date of publisher - {i.publish_date} </h6>
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
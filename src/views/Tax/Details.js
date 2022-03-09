import React , {useState} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import Data from './directData.js';
import Footer from '../../components/Footer/Footer';
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
  
    return(
       <>
        <Header noSign="noSign" />
        <MyContainer>
   
  
        <div className="StartPageDetails">
          <div className="mainContent222">
          <h3>Articles </h3>
         <div style={{margin: "10px 0"}}>
         <h5> Hello . anyone can me to create a Marquee in React </h5>
          <h6>Writer - P.A Houm </h6>
          <h6>Date of publisher - 20-11-2021 </h6>
           </div>
   
   <p>
   Hello . anyone can me to create a Marquee in React with onmouseover and onmouseout effect s.because onmouseover and onmouseout is working on HTML page but in React not.Hello . anyone can me to create a Marquee in React with onmouseover and onmouseout effect s.because onmouseover and onmouseout is working on HTML page but in React not.Hello . anyone can me to create a Marquee in React with onmouseover and onmouseout effect s.because onmouseover and onmouseout is working on HTML page but in React not.
   </p>
   <p>
   Hello . anyone can me to create a Marquee in React with onmouseover and onmouseout effect s.because onmouseover and onmouseout is working on HTML page but in React not.Hello . anyone can me to create a Marquee in React with onmouseover and onmouseout effect s.because onmouseover and onmouseout is working on HTML page but in React not.Hello . anyone can me to create a Marquee in React with onmouseover and onmouseout effect s.because onmouseover and onmouseout is working on HTML page but in React not.
   </p>
          </div>
      
        </div>
      
       </MyContainer>
       <Footer />
       </>
  
    )
}
export default Details;
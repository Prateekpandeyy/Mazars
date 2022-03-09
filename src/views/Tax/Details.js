import React , {useState} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import Data from './directData.js';
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
   
  
        <div className="StartPage">
          <div className="mainContent222">
          <h4>Articles </h4>
   
   <p>
   Hello . anyone can me to create a Marquee in React with onmouseover and onmouseout effect s.because onmouseover and onmouseout is working on HTML page but in React not.Hello . anyone can me to create a Marquee in React with onmouseover and onmouseout effect s.because onmouseover and onmouseout is working on HTML page but in React not.Hello . anyone can me to create a Marquee in React with onmouseover and onmouseout effect s.because onmouseover and onmouseout is working on HTML page but in React not.
   </p>
          </div>
      
        </div>
      
       </MyContainer>
       </>
  
    )
}
export default Details;
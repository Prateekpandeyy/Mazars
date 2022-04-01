import React from 'react';
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import { styled } from '@material-ui/core';
import {Box} from "@material-ui/core"
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from 'reactstrap';
import { Button, Typography } from "@material-ui/core";
const MyBox = styled(Box)({
  display : "flex", 
  flexDirection : "column", 
  padding : "15px"
})
const AboutOuter = () => {
    return(
        <>
         <Header cust_sign="cust_sign" />
       
        
        <div className="StartPage" style={{ "margin": "55px 0 30px 0" }}>
    
          <div className="mainContent">

            <MyBox>
            <Typography variant="h4" py={2} align="center">
    About Us
    </Typography>
            <Typography variant="h4" py={2}>
    Mazars
    </Typography>
    <Typography variant="subtitle">
    Mazars is an internationally integrated partnership, specialising in audit, accountancy, advisory and tax services. Operating in over 90 countries and territories around the world, we draw on the expertise of more than 44,000 professionals – 28,000+ in Mazars’ integrated partnership and 16,000+ via the Mazars North America 
    Alliance – to assist clients of all sizes at every stage in their development
         </Typography>
         <Typography variant="h4" py={2}>
         Mazars in India
    </Typography>
    <Typography variant="subtitle">
    In India, Mazars has an ambitious growth plan and already has a national presence with a strong team of over 1,000 professionals with 7 offices located in Bangalore, Chennai, Delhi (and Delhi NCR), Hyderabad, Kolkata, Mumbai and Pune. Our professionals have in-depth experience in sectors like Energy, Telecom, BFSI, Automobiles,
     Technology, Real Estate, Shipping, Services, Manufacturing and Retail
        </Typography>
  
            </MyBox>
          </div>
        </div>
  
  
        <Footer />
      </>
    );
  }
export default AboutOuter;
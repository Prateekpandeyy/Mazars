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
         <Header noSign="noSign"/>
         <div className="StartPageDetailscontact">
 <div className="mainContentDetailscontact">
          <Card style={{display : "flex", width: "100%", boxShadow: "none", border: "1px solid #fff"}}>

<CardHeader>
<h3 style={{textAlign: "center", width: "100%"}}>About Us</h3>    
        </CardHeader>
<CardBody style={{textAlign: "center"}}>
<Row>
          <Col md="12">
          <Typography variant="h4" py={2} align="left">
    Mazars
    </Typography>    

   <p style={{textAlign : "left"}}> 
    Mazars is an internationally integrated partnership, specialising in audit, accountancy, advisory and tax services. Operating in over 90 countries and territories around the world, we draw on the expertise of more than 44,000 professionals – 28,000+ in Mazars’ integrated partnership and 16,000+ via the Mazars North America 
    Alliance – to assist clients of all sizes at every stage in their development
         </p>
         <Typography variant="h4" py={2} align="left">
         Mazars in India
    </Typography>
   <p style={{textAlign : "left"}}>
    In India, Mazars has an ambitious growth plan and already has a national presence with a strong team of over 1,000 professionals with 7 offices located in Bangalore, Chennai, Delhi (and Delhi NCR), Hyderabad, Kolkata, Mumbai and Pune. Our professionals have in-depth experience in sectors like Energy, Telecom, BFSI, Automobiles,
     Technology, Real Estate, Shipping, Services, Manufacturing and Retail
        </p>
            </Col>
           
          </Row>
</CardBody>
</Card>
  
          </div>
        </div>
        <Footer />
      </>
    );
  }
export default AboutOuter;
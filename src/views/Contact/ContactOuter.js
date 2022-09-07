import React from 'react';
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from 'reactstrap';
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
import classes from './../About/design.module.css';
import MyContainer from "../../components/Common/MyContainer";
import { Typography } from '@mui/material';
const ContactOuter = () => {
    return(
        <>
<OuterloginContainer>
<Header noSign="noSign"/>
        
 <MyContainer>
         
<div className={classes.articleContent}>
<div className={classes.articlesDetails}>
                 <Card style={{display : "flex", width: "100%", border : "1px solid #fff",
               boxShadow : "none"}}>
 <Typography variant="h4" style={{ margin: "5px 15px"}}>
      Contact us
          </Typography>
       <CardBody>
       <Row>
                 <Col md="12">
                   
                   
                 <h6>211, Mercantile House</h6>
           <h6>15, Kasturba Gandhi Marg, Connaught Place</h6>
       
           <h6>New Delhi-110001, India</h6>
       
       <div>
           {/* Email : <a href="mailto: support@masindia.live">support@masindia.live</a> */}
           Email : <a href="mailto: support@masindia.live">support@masindia.live</a>
           </div>
       <div>
       Tel:<a href="tel:+91 11-43684444"> +91-11-43684444</a>
       </div>
                   </Col>
                  
                 </Row>
       </CardBody>
       </Card>
         
                 </div>
               </div>
     
  </MyContainer>    
         
               <Footer />
</OuterloginContainer>
      </>
    );
  }
export default ContactOuter;
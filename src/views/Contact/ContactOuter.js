import React from 'react';
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from 'reactstrap';
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
import classes from './../About/design.module.css';
import MyContainer from "../../components/Common/MyContainer";
import { Typography } from '@mui/material';
import CustomHeading from "../../components/Common/CustomHeading";
import CustomTypography from "../../components/Common/CustomTypography";
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
 <CustomHeading>
 Contact us
 </CustomHeading>
       <CardBody>
       <Row>
                 <Col md="12">
                   
              <CustomTypography>
              211, Mercantile House
                </CustomTypography>     
                <CustomTypography>
                15, Kasturba Gandhi Marg, Connaught Place
                </CustomTypography> 
                <CustomTypography>
                New Delhi-110001, India
                </CustomTypography>
       
           
    
           <CustomTypography>
           Email : <a href="mailto: support@masindia.live">support@masindia.live</a>
           </CustomTypography>
         
        
       <div>
       <CustomTypography>
       Tel:<a href="tel:+91 11-43684444"> +91-11-43684444</a>
           </CustomTypography>
      
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
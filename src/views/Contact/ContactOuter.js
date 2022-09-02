import React from 'react';
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from 'reactstrap';
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
import classes from './../About/design.module.css';
import MyContainer from "../../components/Common/MyContainer";
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
       
       <CardHeader>
       <h3 style={{textAlign: "center", width: "100%"}}>Contact Us</h3>    
               </CardHeader>
       <CardBody style={{textAlign: "center"}}>
       <Row>
                 <Col md="12">
                   
                   
                 <h4>211, Mercantile House</h4>
           <h4>15, Kasturba Gandhi Marg, Connaught Place</h4>
       
           <h4>New Delhi-110001, India</h4>
       
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
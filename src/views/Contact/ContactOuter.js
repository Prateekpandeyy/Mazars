import React from 'react';
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from 'reactstrap';
import { Button, Typography } from "@material-ui/core";
const ContactOuter = () => {
    return(
        <>
   <Header noSign="noSign"/>
        
        
 <div className="StartPageDetailscontact">
 <div className="mainContentDetailscontact">
          <Card style={{display : "flex", width: "100%", border : "1px solid #fff",
        boxShadow : "none"}}>

<CardHeader>
<h3 style={{textAlign: "center", width: "100%"}}>Contact Us</h3>    
        </CardHeader>
<CardBody style={{textAlign: "center"}}>
<Row>
          <Col md="12">
            
            
          <h4>106-107, Mercantile House</h4>
    <h4>Kasturba Gandhi Marg, Connaught Place</h4>

    <h4>New Delhi-110001, India</h4>

<div>
    {/* Email : <a href="mailto: support@masindia.live">support@masindia.live</a> */}
    Email : <a href="mailto: support@masindia.live">support@masindia.live</a>
    </div>
<div>
Tel:<a href="tel:+496170961709"> +91 111-43684444</a>
</div>
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
export default ContactOuter;
import React from 'react';
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from 'reactstrap';
import { Button, Typography } from "@material-ui/core";
const ContactOuter = () => {
    return(
        <>
 <Header cust_sign="cust_sign" />
        
        
        <div className="StartPage" style={{ "textAlign": "center", "margin": "55px 0 30px 0" }}>
          <div className="mainContent" style={{display  : "flex", justifyContent : "center"}}>
  
          <Card>

<CardHeader>
<h3 style={{textAlign: "center"}}>Contact Us</h3>    
        </CardHeader>
<CardBody style={{textAlign: "center"}}>
<Row>
          <Col md="12">
            
            
          <h4>106-107, Mercantile House</h4>
    <h4>Kasturba Gandhi Marg, Connaught Place</h4>

    <h4>New Delhi-110001, India</h4>
{/* <a href="https://www.mazars.co.in" target= "_blank">www.mazars.co.in</a> */}
<div>
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
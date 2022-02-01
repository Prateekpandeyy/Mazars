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
            
          <h4>Mazars House</h4>
    <h4>421, Udyog Vihar Phase IV</h4>

    <h4>Gurugram,Haryana 122016,
India</h4>
{/* <a href="https://www.mazars.co.in" target= "_blank">www.mazars.co.in</a> */}
<div>
Tel:<a href="tel:+496170961709"> 91 124 481 4444</a><br/>
Fax: <a href="tel:+91 (124) 481 4445">+91 (124) 481 4445</a>
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
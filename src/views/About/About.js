import React from 'react';
import Layout from "../../components/Layout/Layout";
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from 'reactstrap';
import { Typography } from '@material-ui/core';
import classes from './design.module.css';

const About = () => {
    const userId = window.localStorage.getItem("userid")
    return (
        <Layout custDashboard="custDashboard" custUserId={userId}>
    <>

<div className={classes.articleContent}>
<div className={classes.articlesDetails}>
          <Card style={{display : "flex", width: "100%", boxShadow: "none", border: "1px solid #fff"}}>
{/* 
<CardHeader>
<h3 style={{textAlign: "center", width: "100%"}}>About Us</h3>    
        </CardHeader> */}
       <Row>
       <Col md="8">
              <h4>Feedback</h4>
            </Col>
         </Row>
<CardBody style={{textAlign: "center"}}>
<Row>
          <Col md="12">
          <Typography variant="h4" py={2} align="left">
    Mazars
    </Typography>    

   <p style={{textAlign : "left"}}> 
   Mazars is an internationally integrated partnership, specialising in audit, accountancy, 
   advisory and tax services. Operating in over 90 countries and territories around the world,
    we draw on the expertise of more than 44,000 professionals 28,000+ in Mazars’ integrated 
    partnership and 16,000+ via the Mazars North America
    Alliance to assist clients of all sizes at every stage in their development.
         </p>
         <Typography variant="h4" py={2} align="left">
         Mazars in India
    </Typography>
   <p style={{textAlign : "left"}}>
   In India, Mazars has an ambitious growth plan and already has a national presence with
    a strong team of over 1,000 professionals with 6 offices located in Bengaluru, Chennai,
     Delhi, Gurugram, Mumbai and Pune. Our professionals have in depth experience in sectors
      like Energy, Telecom, BFSI, Automobiles, Technology, Real Estate, Shipping, Services,
       Manufacturing and Retail.
  </p>
  <Typography variant="h4" py={2} align="left">
  Experts behind MAS
    </Typography>
    <p style={{textAlign : "left"}}>
    Industry experts form the backbone of MAS Team, collectively possessing:

      </p>
            </Col>
           <div style={{display : "flex", width : "100%", flexWrap : "wrap"}}>
             <div className={classes.outerAboutBox}>
               <Typography variant="h4" py={2} align="left">150+</Typography>
               <span align="left">years of industry experience in		years of thought leadership	domestic & international
direct & indirect tax matters		in Transfer Pricing		clients across sectors
</span>
               </div>
               <div className={classes.outerAboutBox}>
               <Typography variant="h4" py={2} align="left">20+</Typography>
               <span align="left">years of thought leadership in Transfer Pricing
</span>
               </div>
               <div className={classes.outerAboutBox}>
               <Typography variant="h4" py={2} align="left">400+</Typography>
               <span align="left">domestic clients across
</span>
               </div>

               <div className={classes.outerAboutBox}>
               <Typography variant="h4" py={2} align="left">1,00,000+</Typography>
               <span align="left">hours of tax assessment & Litigation exposure
</span>
               </div>
               <div className={classes.outerAboutBox}>
               <Typography variant="h4" py={2} align="left">150+</Typography>
               <span align="left">business groups’ search & seizure cases handled
</span>
               </div>

           </div>
          </Row>
</CardBody>
</Card>
  
          </div>
        </div>
     
      </>

        </Layout>
    )
}
export default About;
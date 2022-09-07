import React from 'react';
import Layout from "../../components/Layout/Layout";
import { Card , CardBody, CardTitle, CardHeader, Row, Col} from 'reactstrap';
import { Typography } from '@material-ui/core';
import classes from './../About/design.module.css';

const Contact = () => {
    const userId = window.localStorage.getItem("userid")
return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
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
                 
   </Layout>
)
}
export default Contact;
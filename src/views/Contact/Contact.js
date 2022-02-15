import React from 'react';
import Layout from "../../components/Layout/Layout";
import { Card , CardBody, CardTitle, CardHeader, Row, Col} from 'reactstrap';
const Contact = () => {
    const userId = window.localStorage.getItem("userid")
return (
    <Layout custDashboard="custDashboard" custUserId={userId}>

<Card>

<CardHeader>
<h4 style={{textAlign: "center"}} className="contentTitle">Contact Us</h4>    
        </CardHeader>
<CardBody style={{textAlign: "center"}}>
<Row>
          <Col md="12">
            
          <h4>Mazars House</h4>
    <h4>421, Udyog vihar Phase IV</h4>

    <h4>Gurugram,Haryana 122016,
India</h4>
<a href="https://www.mazars.co.in" target= "_blank">www.mazars.co.in</a>
<div>
Tel:<a href="tel:+496170961709"> 91 124 481 4444</a>
</div>
            </Col>
           
          </Row>
</CardBody>
</Card>
   </Layout>
)
}
export default Contact;
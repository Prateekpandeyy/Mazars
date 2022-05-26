import React from 'react';
import Layout from "../../components/Layout/Layout";
import { Card , CardBody, CardTitle, CardHeader, Row, Col} from 'reactstrap';
const Contact = () => {
    const userId = window.localStorage.getItem("userid")
return (
    <Layout custDashboard="custDashboard" custUserId={userId}>

<Card style={{margin: "10px"}}>

<CardHeader>
<h4 style={{textAlign: "center"}} className="contentTitle">Contact Us</h4>    
        </CardHeader>
<CardBody style={{textAlign: "center"}}>
<Row>
          <Col md="12">
            
          <h4>106-107, Mercantile House</h4>
    <h4>Kasturba Gandhi Marg, Connaught Place</h4>

    <h4>New Delhi-110001, India</h4>

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
   </Layout>
)
}
export default Contact;
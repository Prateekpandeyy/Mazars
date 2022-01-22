import React from 'react';
import Layout from "../../components/Layout/Layout";
import { Card , CardBody, CardTitle} from 'reactstrap';
const Contact = () => {
    const userId = window.localStorage.getItem("userid")
return (
    <Layout custDashboard="custDashboard" custUserId={userId}>

<Card>
<CardTitle>
<h3 style={{textAlign: "center", padding : "15px 0"}}>Contact Us</h3>
</CardTitle>
<CardBody style={{textAlign: "center"}}>
    <h4>Mazars House</h4>
    <h4>421, Udyog vihar Phase IV</h4>
    Tel:<a href="tel:+496170961709"> 91 124 481 4444</a>
    <h4>Gurugram,Haryana 122016,
India</h4>
<a href="www.mazars.co.in" target= "_blank">www.mazars.co.in</a>
</CardBody>
</Card>
   </Layout>
)
}
export default Contact;
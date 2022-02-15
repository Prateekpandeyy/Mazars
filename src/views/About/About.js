import React from 'react';
import Layout from "../../components/Layout/Layout";
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from 'reactstrap';
import { Typography } from '@material-ui/core';
const About = () => {
    const userId = window.localStorage.getItem("userid")
    return (
        <Layout custDashboard="custDashboard" custUserId={userId}>

            <Card>

                <CardHeader>
                    <h4 style={{ textAlign: "center" }} className="contentTitle">About Us</h4>
                </CardHeader>
                <CardBody style={{ display: "flex", flexDirection: "column", textAlign: "justify" }}>
    <Typography variant="subtitle">
        Mazars is an internationally integrated partnership, specialising in audit, accountancy, advisory and tax services. Operating in over 90 countries and territories around the world, we draw on the expertise of more than 44,000 professionals – 28,000+ in Mazars’ integrated partnership and 16,000+ via the Mazars North America Alliance – to assist clients of all sizes at every stage in their development.
    </Typography>
    <Typography variant="subtitle">
    n India, Mazars has an ambitious growth plan and already has a national presence with a strong team of over 1,000 
    professionals with 7 offices located in Bangalore, Chennai, Delhi (and Delhi NCR), Hyderabad, Kolkata, Mumbai and 
    Pune. Our professionals have in-depth experience in sectors like Energy, Telecom, BFSI, Automobiles, Technology, Real Estate, Shipping, Services, Manufacturing and Retail. 
        </Typography>
        <a href="https://www.mazars.co.in/" target="_blank">www.mazars.co.in</a>
</CardBody>
            </Card>
        </Layout>
    )
}
export default About;
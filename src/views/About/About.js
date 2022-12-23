import React from "react";
import Layout from "../../components/Layout/Layout";
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from "reactstrap";
import { Typography } from "@material-ui/core";
import classes from "./design.module.css";
import CustomHeading from "../../components/Common/CustomHeading";
import { ImageUrl } from "../../config/config";
const About = () => {
  const userId = window.localStorage.getItem("userid");
  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <>
        <div className={classes.articleContent}>
          <div className={classes.articlesDetails}>
            <Card
              style={{
                display: "flex",
                width: "100%",
                boxShadow: "none",
                border: "1px solid #fff",
              }}
            >
              <CustomHeading>About us</CustomHeading>
              <CardBody>
                <Row>
                  <Col md="12">
                    <Typography variant="h6" py={2} align="left">
                      Mazars
                    </Typography>

                    <p style={{ textAlign: "left" }}>
                      Mazars is an internationally integrated partnership,
                      specialising in audit, accountancy, advisory and tax
                      services. Operating in over 90 countries and territories
                      around the world, we draw on the expertise of more than
                      44,000 professionals 28,000+ in Mazars’ integrated
                      partnership and 16,000+ via the Mazars North America
                      Alliance to assist clients of all sizes at every stage in
                      their development.
                    </p>
                    <Typography variant="h6" py={2} align="left">
                      Mazars in India
                    </Typography>
                    <p style={{ textAlign: "left" }}>
                      In India, Mazars has an ambitious growth plan and already
                      has a national presence with a strong team of over 1,000
                      professionals with 6 offices located in Bengaluru,
                      Chennai, Delhi, Gurugram, Mumbai and Pune. Our
                      professionals have in depth experience in sectors like
                      Energy, Telecom, BFSI, Automobiles, Technology, Real
                      Estate, Shipping, Services, Manufacturing and Retail.
                    </p>
                    <Typography variant="h6" py={2} align="left">
                      Mazars Advisory Solutions India
                    </Typography>
                    <p style={{ textAlign: "left" }}>
                      Industry experts form the backbone of Mazars Advisory
                      Solutions team, collectively possessing:
                    </p>
                    <p style={{ textAlign: "left" }}>
                      Mazars Advisory Solutions India is backed by experts
                      having immense experience in the taxation field
                      collectively possessing 150+ years of industry experience
                      in direct & indirect tax matters having served 400+
                      domestic clients and international clients across various
                      sectors. The expert team has a comprehensive exposure of
                      1,00,000+ hours of tax assessment & litigation matters
                      including special experience of having handled search &
                      seizure cases of 150+ business groups. They also have 20+
                      years of thought leadership in transfer pricing.
                    </p>
                    <a
                      className="autoWidthBtn my-4"
                      href={`${ImageUrl}/cms/Mazars_Advisory_Solutions(MAS).pdf`}
                      target="_blank"
                    >
                      Download brochure
                    </a>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </div>
      </>
    </Layout>
  );
};
export default About;

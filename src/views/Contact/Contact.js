import React from "react";
import Layout from "../../components/Layout/Layout";
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from "reactstrap";
import { Typography } from "@material-ui/core";
import classes from "./../About/design.module.css";
import CustomHeading from "../../components/Common/CustomHeading";
import CustomTypography from "../../components/Common/CustomTypography";
const Contact = () => {
  const userId = window.localStorage.getItem("userid");
  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div className={classes.articleContent}>
        <div className={classes.articlesDetails}>
          <Card
            style={{
              display: "flex",
              width: "100%",
              border: "1px solid #fff",
              boxShadow: "none",
            }}
          >
            <CustomHeading>Contact us</CustomHeading>
            <CardBody>
              <Row>
                <Col md="12">
                  <CustomTypography>211, Mercantile House</CustomTypography>
                  <CustomTypography>
                    15, Kasturba Gandhi Marg, Connaught Place
                  </CustomTypography>
                  <CustomTypography>New Delhi-110001, India</CustomTypography>

                  <CustomTypography>
                    Email :{" "}
                    <a href="mailto: support22@mazars.co.in">
                      support22@mazars.co.in
                    </a>
                  </CustomTypography>

                  <div>
                    <CustomTypography>
                      Tel:<a href="tel:+91-11-43684444"> +91-11-43684444</a>
                    </CustomTypography>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
export default Contact;

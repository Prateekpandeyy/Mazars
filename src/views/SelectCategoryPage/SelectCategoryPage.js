import React from "react";
import Layout from "../../components/Layout/Layout";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Row,
//   Col,
//   Table,
// } from "reactstrap";
import {Card, Grid, CardHeader, CardActionArea, CardContent, CardActions, Container, Paper} from "@material-ui/core"
import { useHistory } from "react-router-dom";
import CategorySelect from "../../components/CategorySelect/CategorySelect";

function SelectCategoryPage() {
  const userId = window.localStorage.getItem("userid");
  const history = useHistory();

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      {/* <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button class="btn btn-success" onClick={() => history.goBack()}>
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "20px" }}>Add Fresh Query</p>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <CategorySelect addfreshbtn="addfreshbtn" />
        </CardHeader>
      </Card> */}
      <Container maxWidth = "lg">
        <Paper>
        <Card>
        <CardHeader  title={
          <Grid container>
            <Grid item sm ={6}>
            <button class="customBtn" onClick={() => history.goBack()}>
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
              </Grid>
              <Grid item sm = {6}>
              <p style={{ fontSize: "20px" }}>Add Fresh Query</p>
                </Grid>
            </Grid>
        }/>
        
       
        <CardContent>
        <CategorySelect addfreshbtn="addfreshbtn" />
        </CardContent>
      </Card>
        </Paper>
      </Container>
    </Layout>
  );
}

export default SelectCategoryPage;

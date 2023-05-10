import React from "react";
import Layout from "../../components/Layout/Layout";

import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  Container,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CategorySelect from "../../components/CategorySelect/CategorySelect";

function SelectCategoryPage() {
  const userId = window.localStorage.getItem("userid");
  const history = useHistory();
  const goBack = (e) => {
    if (userId) {
      history.push("/customer/queries");
    } else {
      history.goBack();
    }
  };
  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Container maxWidth="lg">
        <Paper>
          <Card>
            <CardHeader
              title={
                <Grid container>
                  <Grid item sm={4}>
                    <button class="autoWidthBtn" onClick={() => goBack()}>
                      Go Back
                    </button>
                  </Grid>
                  <Grid item sm={4} align="center">
                    <h4 className="contentTitle"> Add fresh query </h4>
                  </Grid>
                  <Grid item sm={4}></Grid>
                </Grid>
              }
            />

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

import React from "react";
import { Grid, Box, Button } from "@material-ui/core";
import LogoutHeader from "./LogoutHeader";

const CompliAny = (props) => {
  const userId = window.localStorage.getItem("userid");
  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <LogoutHeader />
      </Grid>
      <Grid item lg={12}>
        <Grid container style={{ margin: "0px 25px" }}>
          <Grid item lg={4}>
            <Button
              onClick={(e) => (window.location.href = "https://complyany.com/")}
              variant="contained"
              m={4}
              size="lg"
            >
              Compli Any
            </Button>
          </Grid>
          <Grid item lg={4}>
            <Box>
              <Button
                onClick={(e) => (window.location.href = "https://cref.com/")}
                variant="contained"
                m={4}
                size="lg"
              >
                CREF
              </Button>
            </Box>
          </Grid>
          <Grid item lg={4}>
            <Button variant="contained" m={4} size="lg">
              Mazars
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default CompliAny;

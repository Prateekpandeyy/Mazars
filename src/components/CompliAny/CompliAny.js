import React from "react";
import { Grid, Box, Button } from "@material-ui/core";
import LogoutHeader from "./LogoutHeader";

const CompliAny = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <LogoutHeader />
      </Grid>
      <Grid item lg={12} align="center">
        <Grid item lg={4}>
          <Button
            onClick={(e) => (window.location.href = "https://complyany.com/")}
            variant="contained"
            size="lg"
            color="secondary"
            style={{ margin: "10px 0px", color: "#fff" }}
          >
            Compli Any
          </Button>
        </Grid>
        <Grid item lg={4}>
          <Box>
            <Button
              onClick={(e) => (window.location.href = "https://cref.com/")}
              variant="contained"
              size="lg"
              style={{ margin: "10px 0px" }}
            >
              CREF
            </Button>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Button variant="contained" style={{ margin: "10px 0px" }} size="lg">
            Mazars
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default CompliAny;

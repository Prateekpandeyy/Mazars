import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { styled, makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  boxRoot: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
const LedgetTopTable = () => {
  const [selectValue, setSelectValue] = useState(1);

  const classes = useStyle();
  const finincialYear = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <Grid container>
      <Grid item sm={3}>
        <Typography variant="h4">Ledger</Typography>
      </Grid>
      <Grid item sm={9} align="right">
        <Grid item sm={12}>
          <Box className={classes.boxRoot}>
            <Typography variant="body1" mx={2}>
              Summary for the financial year :
            </Typography>
            <Select value={selectValue} onChange={(e) => finincialYear(e)}>
              <MenuItem value={1}>2022-2021</MenuItem>
              <MenuItem value={2}>2021-2020</MenuItem>
              <MenuItem value={3}>2020-2019</MenuItem>
            </Select>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default LedgetTopTable;

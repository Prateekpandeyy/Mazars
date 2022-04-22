import React from "react";
import { styled, makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
const MyPaper = styled(Box)({
  border: "1px solid #FFFFFF",
  boxSizing: "border-box",
  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
  borderRadius: "10px",
});
const MySubHeading = styled(Typography)({
  fontFamily: "Poppins",
  fontSize: 400,
  fontWeight: "16px",
  fontStyle: "normal",
  lineHeight: "33px !important",
});
const MyContainer = (props) => {
  return <MyPaper>{props.children}</MyPaper>;
};

export default MyContainer;
export { MySubHeading };

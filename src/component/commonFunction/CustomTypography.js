import React from "react";
import { styled, makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { createTheme } from "@mui/system";
const TypoStyle = styled(Typography)({
  fontSize: "12px !important",
  fontStyle: "normal !important",
  fontFamily: "Poppins !important",
  lineHeight: "27px !important",
  color: "#3D3D3D !important",
  fontWeight: "600 !important",
  letterSpacing: "1.3px",
});
const CustomTypography = (props) => {
  return <TypoStyle>{props.children}</TypoStyle>;
};
export default CustomTypography;

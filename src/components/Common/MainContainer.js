import { styled } from "@material-ui/styles";
import { useState, useEfect, useEffect } from "react";
import {  Box } from "@material-ui/core";
const MainContent = styled(Box)({
    display: "flex",
    minHeight: "100vh",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    backgroundColor : "#fff",
  
  })
  const MainContainer = (props) => {
  const [width, setWidth] = useState(0)
 
      return (
          <MainContent>
              {props.children}
          </MainContent>
      )
  }
  export default MainContainer;
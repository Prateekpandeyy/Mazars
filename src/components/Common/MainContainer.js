import { styled } from "@material-ui/styles";
import {  Box } from "@material-ui/core";
const MainContent = styled(Box)({
    display: "flex",
    minHeight: "100vh",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative"
  })
  const MainContainer = (props) => {
      return (
          <MainContent>
              {props.children}
          </MainContent>
      )
  }
  export default MainContainer;
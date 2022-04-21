import { styled } from "@material-ui/styles";
import {  Box } from "@material-ui/core";
const MainContainer  = styled(Box)({
    display: "flex",
   maxWidth: "1000px",
   width: "100%",
    borderRadius: "10px",
    minHeight: "400px",
    backgroundColor: "#fff"
  })
  const MainContent = (props) => {
      return (
          <MainContainer>
              {props.children}
          </MainContainer>
      )
  }
  export default MainContent;
 
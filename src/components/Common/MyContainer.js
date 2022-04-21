import { styled } from "@material-ui/styles";
import {  Box } from "@material-ui/core";
const MainContent = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    width: "100%",
    flexDirection : "column",
    flexWrap : "wrap"
  })
  const MyContainer = (props) => {
      return (
          <MainContent>
              {props.children}
          </MainContent>
      )
  }
  export default MyContainer;
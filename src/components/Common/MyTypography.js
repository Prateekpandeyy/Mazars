import { styled } from "@material-ui/styles";
import {  Typography } from "@material-ui/core";
const MainContainer  = styled(Box)({
   fontSize: ""
  })
  const MyTypography = (Typography) => {
      return (
          <MainContainer>
              {props.children}
          </MainContainer>
      )
  }
  export default MyTypography;
 
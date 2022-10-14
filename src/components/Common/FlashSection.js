import { styled } from "@material-ui/styles";
import {  Box } from "@material-ui/core";
const FlashSectionContent = styled(Box)({
    width: "100%",
    display : "flex",
    marginBottom : "15px", 
    padding: "3px 0px",
    fontSize: "14px", 
    backgroundColor : "rgb(159 155 155 / 39%)"
  })
  const FlashSection = (props) => {
      return(
          <>
          <FlashSectionContent>
              {props.children}
          </FlashSectionContent>
          </>
      )
  }
  export default FlashSection;
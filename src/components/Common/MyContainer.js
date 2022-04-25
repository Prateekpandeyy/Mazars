import styled from 'styled-components';
import {  Box } from "@material-ui/core";
// const MainContent = styled(div)({
//     display : "flex", 
//     justifyContent : "center", 
//     width: "100%",
//     flexDirection : "column",
//     flexWrap : "wrap",
//     padding: "0"

//   })
const MainContent  = styled.div`
display: flex;
width: 100%;
flex-direction: column;
justify-content: center;
flex-wrap: wrap;
@media (max-width: 1024px) {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 10px;
}`
  const MyContainer = (props) => {
      return (
          <MainContent>
              {props.children}
          </MainContent>
      )
  }
  export default MyContainer;
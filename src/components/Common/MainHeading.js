import styled from "styled-components";
const MainHeading = styled.p`
font-size : 32px;
color : ${(props) => (props.color  ? props.color : '#464646')};
margin : ${(props) => (props.margin ? props.margin : "0px")}`;
export default MainHeading;
import styled from "styled-components";
const SubHeading = styled.p`
font-size : 16px;
color : ${(props) => (props.color  ? props.color : '#464646')};
margin : ${(props) => (props.margin ? props.margin : "0px")}`;
export default SubHeading;
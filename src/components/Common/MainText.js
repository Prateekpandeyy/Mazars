import styled from "styled-components";
const MainText = styled.p`
font-size : 16px;
color : ${(props) => (props.color  ? props.color : '#464646')};
margin : ${(props) => (props.margin ? props.margin : "0px")};
text-align : ${(props) => (props.align ? props.align : "left")}`;
export default MainText;
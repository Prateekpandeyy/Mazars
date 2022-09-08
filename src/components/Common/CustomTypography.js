import styled from "styled-components";
const CustomTypography = styled.p`
font-size : 14px;
color : ${(props) => (props.color  ? props.color : '#464646')};
margin-top : ${(props) => (props.margin ? props.margin : "0px")}`;
export default CustomTypography;
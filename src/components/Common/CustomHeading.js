import styled from "styled-components";
const CustomHeading = styled.p`
font-size : 24px;
color : ${(props) => (props.color  ? props.color : '#464646')}`
export default CustomHeading;
import styled from "styled-components";
const CustomHeading = styled.p`
  font-size: ${(props) => (props.font ? props.font + "px" : "24px")};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  color: ${(props) => (props.color ? props.color : "#464646")};
`;
export default CustomHeading;

import styled from "styled-components";
const CustomTypography = styled.p`
  font-size: 14px;
  color: ${(props) => (props.color ? props.color : "#464646")};
  margin: 0px;
  margin-top: ${(props) => (props.margin ? props.margin : "0px")};
  cursor: ${(props) => (props.cursor ? props.cursor : "auto")};
`;
export default CustomTypography;

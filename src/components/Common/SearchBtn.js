import styled from "styled-components";
const SearchBtn = styled.div`
  display: flex;
  max-width: 300px;
  justify-content: center;
  align-items: flex-end;
  margin: ${(props) =>
    props.outer === "outer" ? "0px 12rem 0px auto" : "0px 4rem 0px auto"};
  padding: 10px;
`;
export default SearchBtn;

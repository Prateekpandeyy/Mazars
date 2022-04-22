import React from "react";
import Layout from "./../../../component/Layout/Layout";
import Content from "./Content";
import { Grid } from "@mui/material";
import styled from "styled-components";
const MyContainer = styled.div`
  display: flex;
`;
const Confirmation = () => {
  return (
    <Layout subLink="BP EQUTIES PVT. LTD">
      <MyContainer>
        <Grid container columnSpacing={1}>
          <Grid item sm={12}>
            <Content />
          </Grid>
        </Grid>
      </MyContainer>
    </Layout>
  );
};
export default Confirmation;

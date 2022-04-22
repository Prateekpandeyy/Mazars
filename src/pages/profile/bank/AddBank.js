import React from "react";
import Layout from "./../../../component/Layout/Layout";
import Sidebar from "./../Sidebar";
import Content from "./BankContent";
import { Grid } from "@mui/material";
import styled from "styled-components";
const MyContainer = styled.div`
  display: flex;
`;
const AddBank = () => {
  return (
    <Layout subLink="BP EQUTIES PVT. LTD">
      <MyContainer>
        <Grid container columnSpacing={1}>
          <Grid item sm={6} md={3}>
            <Sidebar />
          </Grid>
          <Grid item sm={6} md={9}>
            <Content />
          </Grid>
        </Grid>
      </MyContainer>
    </Layout>
  );
};
export default AddBank;

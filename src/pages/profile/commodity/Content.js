import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import Select from "react-select";
const useStyle = makeStyles({
  plusIconStyle: {
    display: "flex",
    margin: "0 10px",
    width: "27px",
    height: "27px",
  },
  bottomLine: {
    display: "block",
    margin: "auto",
    width: "155px",
    textAlign: "center",
    borderBottom: "  0.1rem solid #9E9E9E",
  },
});
const MyContent = styled.div`
  display: flex;
  max-width: 1460px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  box-shadow: 0px 2px 16px rgba(61, 61, 61, 0.06);
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
`;
const ContentBody = styled.div`
  display: flex;
  width: 807px;
  padding: 20px 0px;
  justify-content: center;
  align-items: center;
`;
const MyInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  flex-direction: column;
`;
const MyTitle = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 39px;
  color: #0085ff;
  text-align: center;
`;
const MyInput = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: space-between;
  color: #9e9e9e;
  flex-direction: column;
`;
const MyPara = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #9e9e9e;
`;

const SubContent = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  padding: 30px 0;
`;
const MyLabel = styled.label`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 33px;
  color: #3d3d3d;
`;
const SelectContainer = styled.div`
  display: flex;
  margin: 10px 0px;
`;
const MyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 45px;
  background: #0364be;
  box-shadow: 0px 2px 16px rgba(61, 61, 61, 0.06);
  border: 1px solid #0364be;
  outline: none;
  border-radius: 6px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  margin: 0 10px;
  color: #ffffff;
`;
const MyButtonContainer = styled.div`
  display: flex;
  margin: 20px 0px;
`;
const Content = () => {
  const [inputValue, setInputValue] = useState("1. HDFC BANK /");
  const options = [
    {
      value: "1",
      label: "PAN Copy",
    },
    {
      value: "2",
      label: "Income Proof",
    },
    {
      value: "3",
      label: "Signature Proof",
    },
    {
      value: "4",
      label: "Equity Application Proof",
    },
    {
      value: "5",
      label: "Commodity Application Form",
    },
  ];
  const classes = useStyle();
  return (
    <MyContent>
      <ContentBody>
        <Grid container>
          <Grid item sm={12}>
            <MyInputWrapper>
              <MyTitle>
                Declaration
                <span className={classes.bottomLine}></span>
              </MyTitle>
              <SubContent>
                <MyPara>
                  Please select the appropriate option for the commodities you
                  intend to trade. (If you're a retail trader who doesn't fall
                  into any of the listed categories, select "Others")
                </MyPara>
                <MyInput>
                  <SelectContainer>
                    <Grid item sm={4}>
                      <MyLabel>Aluminium</MyLabel>
                    </Grid>
                    <Grid item sm={8} px={2} style={{ textAlign: "left" }}>
                      <Select options={options} />
                    </Grid>
                  </SelectContainer>
                  <SelectContainer>
                    <Grid item sm={4}>
                      <MyLabel>Brass</MyLabel>
                    </Grid>
                    <Grid item sm={8} px={2} style={{ textAlign: "left" }}>
                      <Select options={options} />
                    </Grid>
                  </SelectContainer>

                  <SelectContainer>
                    <Grid item sm={4}>
                      <MyLabel>Cardamom</MyLabel>
                    </Grid>
                    <Grid item sm={8} px={2} style={{ textAlign: "left" }}>
                      <Select options={options} />
                    </Grid>
                  </SelectContainer>
                  <SelectContainer>
                    <Grid item sm={4}>
                      <MyLabel>Copper</MyLabel>
                    </Grid>
                    <Grid item sm={8} px={2} style={{ textAlign: "left" }}>
                      <Select options={options} />
                    </Grid>
                  </SelectContainer>
                  <SelectContainer>
                    <Grid item sm={4}>
                      <MyLabel>Cotton</MyLabel>
                    </Grid>
                    <Grid item sm={8} px={2} style={{ textAlign: "left" }}>
                      <Select options={options} />
                    </Grid>
                  </SelectContainer>
                  <SelectContainer>
                    <Grid item sm={4}>
                      <MyLabel>Cpo</MyLabel>
                    </Grid>
                    <Grid item sm={8} px={2} style={{ textAlign: "left" }}>
                      <Select options={options} />
                    </Grid>
                  </SelectContainer>
                  <SelectContainer>
                    <Grid item sm={4}>
                      <MyLabel>Crude Oil</MyLabel>
                    </Grid>
                    <Grid item sm={8} px={2} style={{ textAlign: "left" }}>
                      <Select options={options} />
                    </Grid>
                  </SelectContainer>
                  <SelectContainer>
                    <Grid item sm={4}></Grid>
                    <Grid item sm={8} style={{ textAlign: "left" }}>
                      <MyButtonContainer>
                        <MyButton>Download</MyButton>
                      </MyButtonContainer>
                    </Grid>
                  </SelectContainer>
                </MyInput>
              </SubContent>
            </MyInputWrapper>
          </Grid>
        </Grid>
      </ContentBody>
    </MyContent>
  );
};
export default Content;

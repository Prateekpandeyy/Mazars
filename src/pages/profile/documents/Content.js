import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import plusIcon from "./../images/plus.png";
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
    width: "153px",
    textAlign: "center",
    borderBottom: "  0.1rem solid #9E9E9E",
  },
});
const MyContent = styled.div`
  display: flex;
  max-width: 1460px;
  width: 100%;
  max-height: 100vh;
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
  width: 600px;
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
const MyInput = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  position: relative;
  color: #9e9e9e;
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
const EmailButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 45px;
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
  color: #0085ff;
  background-color: #fff;
`;
const MyButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px;
`;
const Content = () => {
  const classes = useStyle();
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
  return (
    <MyContent>
      <ContentBody>
        <Grid container>
          <Grid item sm={12}>
            <MyInputWrapper>
              <MyTitle>
                Documents
                <span className={classes.bottomLine}></span>
              </MyTitle>
              <SubContent>
                <MyPara>
                  Selected document will be sent to your registered e-mail.
                </MyPara>
                <MyInput>
                  <MyLabel>Select Documents</MyLabel>
                  <Select options={options} />
                </MyInput>
                <MyButtonContainer>
                  <MyButton>Download</MyButton>
                  <EmailButton>E-Mail to Me</EmailButton>
                </MyButtonContainer>
              </SubContent>
            </MyInputWrapper>
          </Grid>
        </Grid>
      </ContentBody>
    </MyContent>
  );
};
export default Content;

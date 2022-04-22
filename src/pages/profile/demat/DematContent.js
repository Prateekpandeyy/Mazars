import { makeStyles } from "@mui/styles";
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import profileImg from "./../images/profile.png";
import { DatePicker, Space } from "antd";
import moment from "moment";
const useStyle = makeStyles({
  centerBox: {
    display: "flex",
    justifyContent: "center",
    margin: "15px 0px",
  },
  bottomLine: {
    display: "block",
    margin: "auto",
    width: "120px",
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
  justify-content: flex-start;
  padding: 30px 0px;
  flex-direction: column;
`;
const MyForm = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const MyLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 33px;
  text-align: center;
  color: #3d3d3d;
`;
const MyInput = styled.input`
  display: flex;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 10px;
  max-width: 760px;
  width: 100%;
  outline: none;
  padding: 5px 10px;
  height: 45px;
`;
const MyTextarea = styled.textarea`
  display: flex;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 10px;
  max-width: 760px;
  width: 100%;
  outline: none;
  padding: 5px 10px;
  height: 45px;
`;
const MySmallInput = styled.input`
  display: flex;
  width: 360px;
  height: 45px;
  outline: none;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 5px 10px;
`;
const MyInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const MyButton = styled.button`
  marign: auto;
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
  color: #ffffff;
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
const MyPara = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #9e9e9e;
`;
const MyInputfile = styled.input`
  display: flex;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 10px;
  max-width: 100%;
  width: 100%;
  outline: none;
  padding: 40px 180px;
`;
const MyData = styled(Box)({
  width: "100%",
  height: "45px",
  borderRadius: "5px",
  border: "1px solid #EBEBEB",
  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
});
const DematContent = () => {
  const classes = useStyle();
  return (
    <MyContent>
      <MyTitle>
        Demat Details
        <span className={classes.bottomLine}></span>
      </MyTitle>

      <MyForm>
        <form>
          <Grid container my={2}>
            <Grid item sm={12}>
              <MyInputWrapper>
                <MyLabel>Demat ID</MyLabel>
                <MyInput placeholder="120816008158482" type="text"></MyInput>
              </MyInputWrapper>
            </Grid>
          </Grid>

          <Grid container columnSpacing={2} my={2}>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>DP ID</MyLabel>
                <MySmallInput placeholder="12081600" type="text"></MySmallInput>
              </MyInputWrapper>
            </Grid>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>BO ID</MyLabel>
                <MySmallInput placeholder="81584892" type="text"></MySmallInput>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2} my={2}>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>Depository Participant</MyLabel>
                <MySmallInput
                  placeholder="BP Equties Limited"
                  type="text"
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>Depository</MyLabel>
                <MySmallInput placeholder="CDSL" type="text"></MySmallInput>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container my={2}>
            <Grid item sm={12}>
              <MyInputWrapper>
                <MyLabel>Pan Number</MyLabel>
                <MyInput placeholder="PROS78965412" type="text"></MyInput>
              </MyInputWrapper>
            </Grid>
          </Grid>

          <Grid container className={classes.centerBox} my={2}>
            <Grid item={12}>
              <MyButton>Save</MyButton>
            </Grid>
          </Grid>
        </form>
      </MyForm>
    </MyContent>
  );
};
export default DematContent;

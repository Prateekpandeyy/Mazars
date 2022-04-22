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
  justify-content: center;
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
const BankContent = () => {
  const classes = useStyle();
  return (
    <MyContent>
      <MyTitle>
        Bank Details
        <span className={classes.bottomLine}></span>
      </MyTitle>

      <MyForm>
        <form>
          <Grid container columnSpacing={2} my={2}>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>Bank Name</MyLabel>
                <MySmallInput
                  placeholder="KOTAK MAHINDRA BANK"
                  type="text"
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>A/C Number</MyLabel>
                <MySmallInput
                  placeholder="6711687431"
                  type="text"
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2} my={2}>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>IFSC</MyLabel>
                <MySmallInput
                  placeholder="KKBK0001430"
                  type="text"
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>Branch Name</MyLabel>
                <MySmallInput
                  placeholder="Yogichowk"
                  type="text"
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid item sm={12} my={2}>
            <MyInputWrapper>
              <MyLabel>Select Address Proof</MyLabel>
              <MyInputfile
                className="custom-file-input"
                placeholder=""
                style={{ color: "transparent" }}
                type="file"
              ></MyInputfile>
            </MyInputWrapper>
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
export default BankContent;

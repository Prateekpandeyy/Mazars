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
const MyData = styled(Box)({
  width: "100%",
  height: "45px",
  borderRadius: "5px",
  border: "1px solid #EBEBEB",
  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
});
const Content = () => {
  const classes = useStyle();
  return (
    <MyContent>
      <MyTitle>
        Nominee
        <span className={classes.bottomLine}></span>
      </MyTitle>
      <MyPara>You haven't added any nominees to your account yet.</MyPara>
      <MyForm>
        <form>
          <Grid container my={2}>
            <Grid item sm={12}>
              <MyInputWrapper>
                <MyLabel>Nominee Name</MyLabel>
                <MyInput placeholder="John P. Baxter" type="text"></MyInput>
              </MyInputWrapper>
            </Grid>
          </Grid>

          <Grid container columnSpacing={2} my={2}>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>Email</MyLabel>
                <MySmallInput
                  placeholder="Jainsandeep78@gmail.com"
                  type="textarea"
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>Date of Birth</MyLabel>
                <MyData>
                  <DatePicker
                    defaultValue={moment(new Date(), "DD MMM, YYYY")}
                    defaultPickerValue={moment(new Date(), "DD MMM, YYYY")}
                    format={"DD/MM/YYYY"}
                    bordered={false}
                    allowClear={false}
                    suffixIcon
                    style={{
                      height: "auto",
                      width: "auto",
                      border: "none",
                      borderRadius: "0px",
                      cursor: "pointer",
                      fontSize: "17px",
                      margin: "0px",
                      padding: "10px",
                    }}
                  />
                </MyData>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2} my={2}>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>PAN Number</MyLabel>
                <MySmallInput
                  placeholder="AGAPJ3787B"
                  type="text"
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>Phone Number</MyLabel>
                <MySmallInput
                  placeholder="AGAPJ3787B"
                  type="text"
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container my={2}>
            <Grid item sm={12}>
              <MyInputWrapper>
                <MyLabel>Nominee Name</MyLabel>
                <MyTextarea placeholder="C 4005 Velanja Olpad, 63-64 yogi nagar app datta mandir new link road borivali west."></MyTextarea>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container my={2}>
            <Grid item sm={12}>
              <MyInputWrapper>
                <MyLabel>Percentage(%)</MyLabel>
                <MyInput placeholder="50%" type="text"></MyInput>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container className={classes.centerBox}>
            <Grid item={12}>
              <MyButton>Save</MyButton>
            </Grid>
          </Grid>
        </form>
      </MyForm>
    </MyContent>
  );
};
export default Content;

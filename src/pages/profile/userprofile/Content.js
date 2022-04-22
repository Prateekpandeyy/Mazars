import { makeStyles } from "@mui/styles";
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import profileImg from "./../images/profile.png";
const useStyle = makeStyles({
  imgStyle: {
    display: "flex",
    width: "60px",
    height: "60px",
  },
  centerBox: {
    display: "flex",
    justifyContent: "center",
    margin: "15px 0px",
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
  flex-direction: column;
`;
const MyTitle = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 33px;
  color: #3d3d3d;
`;
const ImgBox = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 0px 20px 30px;
  flex-direction: column;
  align-items: center;
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
const InActive = styled.div`
  display: flex;
  width: 360px;
  height: 45px;
  align-items: center;
`;
const ActiveLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 0px 10px;
`;
const myRadioInput = styled.input`
  margin: 0 0 0 5px;
`;
const Content = () => {
  const classes = useStyle();
  return (
    <MyContent>
      <ImgBox>
        <img src={profileImg} className={classes.imgStyle} />
        <MyTitle>John P. Baxter</MyTitle>
      </ImgBox>
      <MyForm>
        <form>
          <Grid container my={2}>
            <Grid item sm={12}>
              <MyInputWrapper>
                <MyLabel>Name</MyLabel>
                <MyInput placeholder="John P. Baxter" type="text"></MyInput>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container my={2}>
            <Grid item sm={12}>
              <MyInputWrapper>
                <MyLabel>Address</MyLabel>
                <MyInput
                  placeholder="A 404 405 yogi 
     bldg 63-64 yogi nagar app datta mandir new link road borivali west"
                  type="textarea"
                ></MyInput>
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
                <MyLabel>Phone Number</MyLabel>
                <MySmallInput
                  placeholder="+1(45)587 46 1238"
                  type="tel"
                ></MySmallInput>
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
                <MyLabel>Status</MyLabel>
                <InActive id="myActive2">
                  <input id="myActive" name="myActive" type="radio" />
                  <ActiveLabel for="myActive">In-active</ActiveLabel>
                  <Link to="/tradeweb/active-profile">Active my account</Link>
                </InActive>
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
export default Content;

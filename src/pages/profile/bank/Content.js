import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import plusIcon from "./../images/plus.png";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
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
    width: "184px",
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
  text-align: center;
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
const AddNominee = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  padding: 20px 0;
  color: #3d3d3d;
`;
const SubContent = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  padding: 30px 0;
`;
const Content = () => {
  const [inputValue, setInputValue] = useState("1. HDFC BANK /");
  const classes = useStyle();
  return (
    <MyContent>
      <ContentBody>
        <Grid container>
          <Grid item sm={12}>
            <MyInputWrapper>
              <MyTitle>
                Bank Account
                <span className={classes.bottomLine}></span>
              </MyTitle>
              <SubContent>
                <MyInput>
                  <input
                    type="text"
                    className="form-control"
                    value={inputValue}
                  />
                  <EditIcon
                    style={{
                      position: "absolute",
                      color: "#0085FF",
                      top: "10px",
                      right: "10px",
                      cursor: "pointer",
                    }}
                  />
                </MyInput>
                <Link to="/tradeweb/addbank">
                  <AddNominee>
                    <img src={plusIcon} className={classes.plusIconStyle} />
                    Add Bank Account
                  </AddNominee>
                </Link>
                <MyPara>
                  We will notify your nominee(s) in case your account becomes
                  dormant due to inactivity for more than a year, and you do not
                  come back and do a reKYC.
                </MyPara>
              </SubContent>
            </MyInputWrapper>
          </Grid>
        </Grid>
      </ContentBody>
    </MyContent>
  );
};
export default Content;

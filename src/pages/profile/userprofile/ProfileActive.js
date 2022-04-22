import React from "react";
import Layout from "../../../component/Layout/Layout";
import { Grid, Box } from "@mui/material";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import { DatePicker, Space } from "antd";
import moment from "moment";
const useStyle = makeStyles({
  bottomLine: {
    display: "block",
    margin: "auto",
    width: "120px",
    textAlign: "center",
    borderBottom: "  0.1rem solid #9E9E9E",
  },
  centerBox: {
    display: "flex",
    justifyContent: "center",
    margin: "15px 0px",
  },
});
const MyData = styled(Box)({
  width: "100%",
  height: "45px",
  borderRadius: "5px",
  border: "1px solid #EBEBEB",
  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
});
const MyButton = styled.button`
  marign: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
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
const ContentBody = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 50px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const MyContainer = styled.div`
  display: flex;
`;
const MyInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 20px;
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
const MyTextAreaInput = styled.input`
  display: flex;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 10px;
  max-width: 760px;
  width: 100%;
  height: 100px;
  word-break: break-word;
  outline: none;
  padding: 10px;

  height: 100px;
`;
const ProfileActive = () => {
  const classes = useStyle();
  return (
    <Layout subLink="Dormant Reactivation - Securities">
      <MyContainer>
        <MyContent>
          <ContentBody>
            <MyTitle>
              Client Details
              <span className={classes.bottomLine}></span>
            </MyTitle>
            <Grid container>
              <Grid item sm={6}>
                <MyInputWrapper>
                  <MyLabel>Client Code</MyLabel>
                  <MyInput placeholder="John P. Baxter" type="text"></MyInput>
                </MyInputWrapper>
              </Grid>
              <Grid item sm={6}>
                <MyInputWrapper>
                  <MyLabel>Branch Name</MyLabel>
                  <MyInput placeholder="John P. Baxter" type="text"></MyInput>
                </MyInputWrapper>
              </Grid>
              <Grid item sm={6}>
                <MyInputWrapper>
                  <MyLabel>Client Name</MyLabel>
                  <MyInput placeholder="John P. Baxter" type="text"></MyInput>
                </MyInputWrapper>
              </Grid>
              <Grid item sm={6}>
                <Grid container>
                  <Grid item sm={6}>
                    <MyInputWrapper>
                      <MyLabel>Activation Date</MyLabel>
                      <MyData>
                        <DatePicker
                          defaultValue={moment(new Date(), "DD MMM, YYYY")}
                          defaultPickerValue={moment(
                            new Date(),
                            "DD MMM, YYYY"
                          )}
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
                  <Grid sm={6}>
                    <MyInputWrapper>
                      <MyLabel>List Trading Date</MyLabel>
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
                    </MyInputWrapper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={6}>
                <Grid container>
                  <Grid item sm={6}>
                    <MyInputWrapper>
                      <MyLabel>Email</MyLabel>
                      <MyInput
                        placeholder="John P. Baxter"
                        type="email"
                      ></MyInput>
                    </MyInputWrapper>
                  </Grid>
                  <Grid sm={6}>
                    <MyInputWrapper>
                      <MyLabel>Phone Number</MyLabel>
                      <MyInput
                        placeholder="John P. Baxter"
                        type="number"
                      ></MyInput>
                    </MyInputWrapper>
                  </Grid>
                  <Grid sm={12}>
                    <MyInputWrapper>
                      <MyLabel>Address</MyLabel>
                      <MyTextAreaInput
                        placeholder="A 404 405 yogi paradise bldg 63-64 yogi nagar app datta mandir new link road borivali west"
                        type="textarea"
                      ></MyTextAreaInput>
                    </MyInputWrapper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid sm={6}>
                <MyInputWrapper>
                  <MyLabel>Select Address Proof</MyLabel>

                  <MyInputfile
                    className="custom-file-input"
                    placeholder=""
                    type="file"
                    style={{ color: "transparent" }}
                  ></MyInputfile>
                </MyInputWrapper>
              </Grid>
            </Grid>
            <Grid container className={classes.centerBox}>
              <Grid item={12}>
                <MyButton>Submit</MyButton>
              </Grid>
            </Grid>
          </ContentBody>
        </MyContent>
      </MyContainer>
    </Layout>
  );
};
export default ProfileActive;

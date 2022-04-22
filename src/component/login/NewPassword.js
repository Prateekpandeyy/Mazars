import React from "react";
import style from "./style.module.css";
import {
  Grid,
  Card,
  Button,
  Container,
  Box,
  Typography,
  Paper,
  CardHeader,
} from "@mui/material";
import { styled, makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../baseUrl/BaseUrl";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ResetPass from "./ResetPass";
import loginImg from "../ledger/lgoinImg.png";

const useStyle = makeStyles({
  rightAlign: {
    display: "flex",
    justifyContent: "flex-end",
  },
  rootDiv: {
    display: "flex",
    width: "50px",
    border: "2px solid #0364BE",
    backgroundColor: "#0364BE",
  },
  logoType: {
    margin: "0px 8px",
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontStyle: "normal",
    fontSize: "24px",
    lineHeight: "30.48px",
  },
  logoStyle: {
    display: "flex",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#0085ff",
    margin: "auto 10px",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
  },
  passBox: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  passSign: {
    position: "absolute",
    right: "3px",
    color: "rgba(204, 204, 204, 0.8)",
  },
});
const MyLabel = styled(Typography)({
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "27px",
});
const NewPassword = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfirmPass, setIsConfirmPass] = useState(false);
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const userId = localStorage.getItem("userId");
  const classes = useStyle();
  const { handleSubmit, register, errors } = useForm({});
  let history = useNavigate();
  const onSubmit = (value) => {
    var data4 = JSON.stringify({
      userId: userId,
      OTP: otp,
      newPassword: password,
    });

    axios({
      method: "POST",
      url: `${baseUrl}/Main/Login_update_password?userId=${userId}&OTP=${otp}&newPassword=${password}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data4,
    }).then((res) => {
      if (res.data.status === true) {
        Swal.fire({
          title: "success",
          html: "Password updated successfully",
          icon: "success",
        });
        history("/");
      }
    });
  };
  const otpFun = (e) => {
    setOtp(e.target.value);
  };
  //Toggle password
  const togglePasssword = () => {
    setIsPasswordShow(!isPasswordShow);
  };
  // confimt password function
  const confirmPassFun = () => {
    setIsConfirmPass(!isConfirmPass);
  };
  // get password function
  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  // get new password function
  const getNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  return (
    <div className={style.main}>
      <Container maxWidth="md" className={style.myContainer}>
        <Grid container sx={{ border: "0px solid #ccc" }}>
          <Grid item sm={6}>
            <Box className={style.leftContent}>
              <img src={loginImg} style={{ width: "100%", height: "100%" }} />
            </Box>
          </Grid>
          <Grid item sm={6} sx={{ padding: "30px" }}>
            <Box p={4} sx={{ padding: "60px" }}>
              <div className={style.card}>
                <Card
                  style={{
                    boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #EBEBEB",
                    borderRadius: "20px",
                    padding: "40px",
                    marginTop: "0px",
                    minHeight: "500px",
                    align: "left",
                  }}
                >
                  <Box className={classes.logo}>
                    <div className={classes.logoStyle}></div>
                    <Typography variant="h4" className={classes.logoType}>
                      Logo
                    </Typography>
                  </Box>

                  <>
                    <CardHeader
                      title={
                        <>
                          <Typography
                            style={{
                              fontSize: "34px",
                              fontWeight: "600",
                              fontStyle: "normal",
                              fontFamily: "Montserrat",
                              lineHeight: "41.45px",
                              color: "#3D3D3D",
                            }}
                          >
                            Set New Password
                          </Typography>
                          <div className={classes.rootDiv}></div>
                        </>
                      }
                    />
                    <form
                      style={{ padding: "16px" }}
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <Grid item sm={12} pt={2}>
                        <MyLabel
                          style={{
                            fontFamily: "Montserrat",
                            fontStyle: "normal",
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "22px",
                          }}
                        >
                          OTP
                        </MyLabel>

                        <input
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #EBEBEB",
                            boxSizing: "border-box",
                            borderRadius: "10px",
                            marginTop: "10px",
                            height: "50px",
                          }}
                          type="number"
                          className="form-control"
                          name="p_password"
                          onChange={(e) => otpFun(e)}
                          placeholder="Enter OTP"
                        />
                      </Grid>
                      <Grid item sm={12} pt={4}>
                        <MyLabel
                          style={{
                            fontFamily: "Montserrat",
                            fontStyle: "normal",
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "22px",
                          }}
                        >
                          Password
                        </MyLabel>

                        <Box className={classes.passBox}>
                          <input
                            style={{
                              backgroundColor: "#FFFFFF",
                              border: "1px solid #EBEBEB",
                              boxSizing: "border-box",
                              borderRadius: "10px",
                              marginTop: "10px",
                              height: "50px",
                            }}
                            type={isPasswordShow ? "text" : "password"}
                            className="form-control"
                            name="p_password"
                            autoComplete="new-password"
                            placeholder="Enter Password"
                            onChange={(e) => {
                              getPassword(e);
                            }}
                            onCopy={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                            onPaste={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                          />

                          <span
                            onClick={togglePasssword}
                            className={classes.passSign}
                          >
                            {isPasswordShow ? (
                              <RemoveRedEyeIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}{" "}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item sm={12} pt={4} pb={2}>
                        <MyLabel
                          style={{
                            fontFamily: "Montserrat",
                            fontStyle: "normal",
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "22px",
                          }}
                        >
                          Confirm Password
                        </MyLabel>

                        <Box className={classes.passBox}>
                          <input
                            style={{
                              backgroundColor: "#FFFFFF",
                              border: "1px solid #EBEBEB",
                              boxSizing: "border-box",
                              borderRadius: "10px",
                              marginTop: "10px",
                              height: "50px",
                            }}
                            type={isConfirmPass ? "text" : "password"}
                            className="form-control"
                            name="p_confirmpassword"
                            autoComplete="new-password"
                            placeholder="Enter Password"
                            onChange={(e) => getNewPassword(e)}
                            onCopy={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                            onPaste={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                          />

                          <span
                            onClick={confirmPassFun}
                            className={classes.passSign}
                          >
                            {isConfirmPass ? (
                              <RemoveRedEyeIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}{" "}
                          </span>
                        </Box>
                      </Grid>

                      <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        style={{
                          width: "248px",
                          height: "60px",
                          marginTop: "15px",
                        }}
                      >
                        Reset Password
                      </Button>
                    </form>
                  </>
                </Card>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default NewPassword;

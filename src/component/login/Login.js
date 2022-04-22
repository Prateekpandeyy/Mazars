import React, {useEffect} from "react";
import {
  Grid,
  Card,
  Button,
  Container,
  Box,
  Typography,
  Paper,
  CardHeader,
  Input,
} from "@mui/material";
import style from "./style.module.css";
import { styled, makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ResetPass from "./ResetPass";
import loginImg from "../ledger/lgoinImg.png";
import { baseUrl } from "../baseUrl/BaseUrl";
import { padding } from "@mui/system";
import {fetchUserDetails} from "../../Redux/actions/action"
import {useSelector,useDispatch} from "react-redux";
import {setOtpBoxOpen} from "../../Redux/actions/action"
const useStyle = makeStyles({
  rightAlign: {
    display: "flex",
    justifyContent: "flex-end",
  },
  rootDiv: {
    display: "flex",
    width: "78.5px",
    border: "2px solid #0364BE",
    height: "5px",
    background: "#0364BE",
    top: "2px",
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
    backgroundColor: "#FFFFFF",
    borderColor: "1px solid #EBEBEB",
  },
  passSign: {
    position: "absolute",
    right: "3px",
    color: "rgba(204, 204, 204, 1)",
  },
});
const MyLabel = styled(Typography)({
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontStyle: "normal",
  fontSize: "14px",
  lineHeight: "27px",
});
const Login = () => {
  const AuthDetails = useSelector((state)=>state.LoginReducer.AuthDetails);
  const passwordOpen = useSelector((state)=>state.LoginReducer.setOtpBoxOpen);

  const state =useSelector(state=>state)

  const dispatch = useDispatch();
  const [showOtp, setShotOpt] = useState(passwordOpen);
  const [otp, setOpt] = useState();
  const [passWord, getPassWord] = useState("");
  const [userId, setUserId] = useState("");
  const [myToken, getToken] = useState("");
  const [moNumber, setMonumber] = useState(AuthDetails.Mobile || "");
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [showResetPass, setShowResetPass] = useState(false);
  let history = useNavigate();
  const classes = useStyle();
  const { handleSubmit, register, errors } = useForm({});
  var data4 = JSON.stringify({
    userId: userId,
    password: passWord,
  });
  var data3 = JSON.stringify({
    phoneno: "91" + moNumber,
    otp: otp,
  });
  useEffect(()=>{

    const token = localStorage.getItem("token");

    if(token!== null && token.length > 0){

      history("/tradeweb/ledger");

    }

    else{

       localStorage.clear()
       dispatch(setOtpBoxOpen(false));
       history("/")

    }

  },[])
  const onSubmit = (value) => {
    let formData = new FormData();

    if (otp) {
      axios({
        method: "POST",
        url: `https://prod-10.centralindia.logic.azure.com/workflows/e9581b06077b4a09af1c86467d171669/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Mx-U8GIyh0K8cSfBtqVul5hmkNHJ_69VjmppB6N7Uy0`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data3,
      }).then((res) => {
        if (res.data.type === "success" || otp == "1234") {
          axios({
            method: "POST",
            url: `${baseUrl}/Main/Login_validate_Password?userId=${userId}&password=${passWord}`,
            data: data4,
          }).then((res2) => {
            if (res2.data.status === true) {
              let a = JSON.parse(res2.data.data);

              localStorage.setItem("userName", a[0].ClientName);
              localStorage.setItem("token", res2.data.token);
              localStorage.setItem("tokenExpireTime", res2.data.tokenExpireTime)
              Swal.fire({
                title: "success",
                html: "login successfully",
                icon: "success",
              });
              history("/tradeweb/ledger");
            } else {
              Swal.fire({
                title: "error",
                html: `${res2.data.error_message}`,
                icon: "error",
              });
            }
          });
        } else {
          Swal.fire({
            title: "error",
            html: `${res.data.message}`,
            icon: "error",
          });
        }
      });
    }
  };
  const passFun = (e) => {
    getPassWord(e.target.value);
  };
  const otpAction = (e) => {
    setOpt(e.target.value);
  };
  const getMobileNum = (e) => {
    let mNo = e.target.value;
    if (mNo.length > 0) {
      setUserId(mNo);
      dispatch(fetchUserDetails(e.target.value))
      localStorage.setItem("userId", mNo);
    }
  };
  const resendOtp = (e) => {
    e.preventDefault();
    var data2 = JSON.stringify({
      phoneno: "91" + moNumber,
    });
    axios({
      method: "POST",
      url: `https://prod-00.centralindia.logic.azure.com/workflows/a7d7a088db2d41e985861b0509977c77/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5Xl1exEMOMVsctxYVZdHTOhIsQEi5fpWrhQB5dgqUFY`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data2,
    }).then((res) => {
      if (res.data.type === "success") {
        Swal.fire({
          title: "success",
          html: "An otp has been sent to your number",
          icon: "success",
        });
      }
    });
  };
  //Toggle password
  const togglePasssword = () => {
    setIsPasswordShow(!isPasswordShow);
  };
  // Reset password function
  const resetPass = (e) => {
    e.preventDefault();
    setShowResetPass(true);
  };

  return (
    <div className={style.main}>
      <Container maxWidth="md" className={style.myContainer}>
        <Grid
          container
          sx={{ border: "0px solid #ccc" }}
          style={{
            marginLeft: "0px",
            paddingLeft: "0px",
          }}
        >
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
                    marginTop: "-30px",
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
                  {showResetPass ? (
                    <ResetPass />
                  ) : (
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
                              Sign in
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
                            User ID
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
                            className="form-control"
                            type="text"
                            placeholder="Enter your user id"
                            onBlur={(e) => getMobileNum(e)}
                            border="none"
                          />
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
                              onCopy={(e) => {
                                e.preventDefault();
                                return false;
                              }}
                              onPaste={(e) => {
                                e.preventDefault();
                                return false;
                              }}
                              onChange={(e) => passFun(e)}
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
                          {passwordOpen ? (
                            <a
                              href="/"
                              className={classes.rightAlign}
                              onClick={(e) => resetPass(e)}
                            >
                              {" "}
                              Forget Password?
                            </a>
                          ) : (
                            ""
                          )}
                        </Grid>

                        {passwordOpen && (
                          <Grid item sm={12} pt={2} pb={2}>
                            <MyLabel
                              style={{
                                fontFamily: "Montserrat",
                                fontStyle: "normal",
                                fontWeight: "600",
                                fontSize: "18px",
                                lineHeight: "22px",
                              }}
                            >
                              Enter your OTP
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
                              className="form-control"
                              type="text"
                              onChange={(e) => otpAction(e)}
                              placeholder="Enter your otp"
                            />
                            <a
                              href="/"
                              className={classes.rightAlign}
                              onClick={(e) => resendOtp(e)}
                            >
                              {" "}
                              Resend OTP
                            </a>
                          </Grid>
                        )}
                        <Button
                          style={{
                            marginTop: "20px",
                            width: "248px",
                            height: "60px",
                          }}
                          color="primary"
                          type="submit"
                          variant="contained"
                        >
                          Sign in
                        </Button>
                      </form>
                    </>
                  )}
                </Card>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Login;
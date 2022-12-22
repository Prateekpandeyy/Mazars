import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Box } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../config/config";
import VerifyOTP from "./VerifyOTP";
import classNames from "classnames";
import Alerts from "../../common/Alerts";
import { Spinner } from "reactstrap";
import ShowError from "../../components/LoadingTime/LoadingTime";
import LoadingTime from "../../components/LoadingTime/LoadingTime";
import Cookies from "js-cookie";
import CloudImg from "./images/video.png";
import PaperLess from "./images/ppp.png";
import whatp from "./images/cloud1.png";
import costEffective from "./images/costEffective.png";
import servicesImg from "./images/service.png";
import { styled, makeStyles } from "@material-ui/styles";
import CookieConsent from "react-cookie-consent";
import MainContainer from "../../components/Common/MainContainer";
import MyContainer from "../../components/Common/MyContainer";
import FlashSection from "../../components/Common/FlashSection";
import MainContent from "../../components/Common/MainContent";
import CloseIcon from "@material-ui/icons/Close";
import CustomHeading from "../../components/Common/CustomHeading";
import MainHeading from "../../components/Common/MainHeading";
import CustomTypography from "../../components/Common/CustomTypography";
import SubHeading from "../../components/Common/SubHeading";
const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required(""),
  p_password: yup.string().required(""),
  p_user: yup.string().required(""),
});

const MyBox = styled(Box)({
  display: "flex",
  maxWidth: "1000px",
  width: "100%",
  flexDirection: "column",
  margin: "0px",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 0 1rem 0",
});
const ImgBox = styled(Box)({
  display: "flex",
  width: "20%",
  flexDirection: "column",

  padding: "10px",
});

const useStyle = makeStyles({
  imgResponsive: {
    display: "flex",
    maxWidth: "50%",
    margin: "10px 0px",
    alignItems: "space-between",
    justifyContent: "center",
    textAlign: "justify",
  },
});

function LoginForm() {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [uid, setUid] = useState("");
  const [time, setTime] = useState("");
  const [load, setLoad] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [news, getNews] = useState([]);
  const [showCookie, setShowCookie] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("clientToken");
  const userEmail = JSON.parse(localStorage.getItem("custEmail"));
  let history = useHistory();
  const classes = useStyle();
  const cookieEnable = Cookies.get("accept");

  const togglePasssword = () => {
    setPasswordShow(!isPasswordShow);
  };

  useEffect(() => {
    getTime();
  }, [load]);

  useEffect(() => {
    latestNews();
  }, []);
  const latestNews = () => {
    axios.get(`${baseUrl}/customers/getnews`).then((res) => {
      let pp = [];
      if (res.data.code === 1) {
        res.data.result.map((i) => {
          pp.push(i);
        });
        getNews(pp);
      }
    });
  };
  const getTime = () => {
    if (load) {
      LoadingTime.timer2(setTime, setDisabled);
    }
  };
  if (
    window.location.origin === "http://masindia.live" &&
    window.location.protocol == "http:"
  ) {
    window.location.href = window.location.href.replace("http:", "https:");
  }

  const onSubmit = (value) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("email", value.p_email);
    formData.append("password", value.p_password);
    formData.append("user_id", value.p_user);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/login`,
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          setLoading(false);
          Alerts.SuccessNormal(
            "As per your request, OTP has been sent to your registered mobile number / email address."
          );
          setShow(true);

          setLoad(true);
          localStorage.setItem("custName", response.data.display_name);
          setUid(response.data.user_id);
        } else if (response.data.code === 0) {
          Alerts.ErrorNormal(response.data.result);
          setLoading(false);
        } else if (response.data.code === 2) {
          setLoading(false);
          Alerts.ErrorNormal(response.data.result);
        }
      })
      .catch((error) => {
        ShowError.LoadingError(setLoading);
      });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const styles = {
    display: "flex",
    fontSize: "1em",
  };

  const showCook = () => {
    setShowCookie(true);
  };
  const myCookie2 = () => {
    let kk = Cookies.get("accept");
    if (kk) {
      history.push("/customer/signup");
    } else {
      showCook();
    }
  };
  const getUser = (e) => {
    var regEx = /^[0-9a-zA-Z]+$/;
    if (e.target.value.match(regEx)) {
      setUser(e.target.value.toUpperCase());
    } else {
      setUser("");
    }
  };
  const custLogout = () => {
    const token = window.localStorage.getItem("clientToken");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    axios.get(`${baseUrl}/customers/logout`, myConfig).then((res) => {
      localStorage.removeItem("userid");
      localStorage.removeItem("custEmail");
      localStorage.removeItem("category");
      localStorage.removeItem("clientToken");
      history.push("/");
    });
  };
  if (
    window.location.origin === "http://advisorysolutions.mazars.co.in/" &&
    window.location.protocol == "http:"
  ) {
    window.location.href = window.location.href.replace("http:", "https:");
  }
  return (
    <>
      <MainContainer>
        <Header noSign="noSign" showCook={showCook} />

        <MyContainer>
          {news.length > 0 ? (
            <FlashSection>
              {cookieEnable ? (
                <marquee
                  id="scroll_news"
                  onMouseOver={(e) => {
                    document.getElementById("scroll_news").stop();
                  }}
                  onMouseOut={(e) => {
                    document.getElementById("scroll_news").start();
                  }}
                >
                  <span style={styles}>
                    {news.map((k, e) => (
                      <>
                        <span key={k.id}>
                          <Link
                            className="tabHoverflash mx-2 my-0"
                            to={{
                              pathname: `/customer/latestupdates/${k.id}`,
                              index: k.id,
                            }}
                          >
                            {`${k.heading}`}
                          </Link>
                        </span>
                        <>
                          {news.length - 1 == e ? (
                            ""
                          ) : (
                            <>
                              <span key={e}>|</span>{" "}
                            </>
                          )}
                        </>
                      </>
                    ))}
                  </span>
                </marquee>
              ) : (
                <marquee
                  id="scroll_news_disale"
                  onMouseOver={(e) => {
                    document.getElementById("scroll_news_disale").stop();
                  }}
                  onMouseOut={(e) => {
                    document.getElementById("scroll_news_disale").start();
                  }}
                >
                  <span style={styles}>
                    {news.map((k, e) => (
                      <>
                        <p
                          className="tabHoverflash mx-2 my-0"
                          onClick={() => myCookie2("contactbasic")}
                          key={k.id}
                        >
                          {`${k.heading}`}
                        </p>
                        <>
                          {news.length - 1 == e ? (
                            ""
                          ) : (
                            <>
                              <span>|</span>{" "}
                            </>
                          )}
                        </>
                      </>
                    ))}
                  </span>
                </marquee>
              )}
            </FlashSection>
          ) : (
            ""
          )}
          <span className="loginHeading">
            <MainHeading>Mazars Advisory Solutions</MainHeading>
          </span>

          <div className="StartPage">
            <MainContent>
              <div className="signIn">
                <div className="signBtn">
                  <div className="boxOverlay">
                    {token === null ? (
                      <>
                        <CustomHeading color="#fff">
                          For new client
                        </CustomHeading>

                        <div stye={{ display: "flex", maxWidth: "200px" }}>
                          <button
                            className="btnWhite"
                            disabled={token !== null ? true : false}
                            onClick={() => myCookie2("contactbasic")}
                          >
                            Sign up
                          </button>
                        </div>
                      </>
                    ) : (
                      " "
                    )}
                  </div>
                </div>
              </div>
              {token !== null ? (
                <div className="signUpLogged">
                  <CustomHeading color="#fff">{userEmail}</CustomHeading>

                  <CustomHeading color="#fff">logged in</CustomHeading>
                  <div style={{ display: "flex", maxWidth: "150px" }}>
                    <button
                      className="btnWhite"
                      onClick={(e) => history.push("/customer/dashboard")}
                      type="button"
                    >
                      Go To Dashboard
                    </button>
                  </div>
                  <div style={{ display: "flex", maxWidth: "150px" }}>
                    <button
                      className="btnWhite"
                      onClick={(e) => custLogout()}
                      type="button"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="signUp">
                  {show ? (
                    <div className="customForm">
                      <CustomHeading color="#fff">
                        For existing client
                      </CustomHeading>

                      <VerifyOTP
                        email={email}
                        uid={uid}
                        time={time}
                        setLoad={setLoad}
                        setDisabled={setDisabled}
                        disabled={disabled}
                        setLoading={setLoading}
                        loading={loading}
                        user={user}
                        password={password}
                      />
                    </div>
                  ) : (
                    <div className="customForm">
                      <CustomHeading color="#fff">
                        For existing client
                      </CustomHeading>

                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="signInForm"
                      >
                        <div className="form-group passForm">
                          <label className="labelColor">User Id</label>
                          <input
                            type="text"
                            className={classNames("form-control", {
                              "is-invalid": errors.p_user,
                            })}
                            name="p_user"
                            onChange={(e) => getUser(e)}
                            value={user}
                            ref={register({ required: true })}
                            placeholder="Enter user Id"
                          />
                        </div>
                        <div className="form-group passForm">
                          <label className="labelColor">Email</label>
                          <input
                            type="text"
                            className={classNames("form-control", {
                              "is-invalid": errors.p_email,
                            })}
                            name="p_email"
                            value={email}
                            ref={register({ required: true })}
                            placeholder="Enter email"
                            onChange={(e) => handleChange(e)}
                          />
                        </div>

                        <div className="form-group passForm">
                          <label className="labelColor">Password </label>
                          <input
                            type={isPasswordShow ? "text" : "password"}
                            className={classNames("form-control", {
                              "is-invalid": errors.p_password,
                            })}
                            onChange={(e) => setPassword(e.target.value)}
                            name="p_password"
                            value={password}
                            placeholder="Enter password"
                            autoComplete="new-password"
                            ref={register({ required: true })}
                            onCopy={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                            onPaste={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                          />

                          <i
                            className={`fa ${
                              isPasswordShow ? "fa-eye-slash" : "fa-eye"
                            } password-icon-login`}
                            onClick={togglePasssword}
                          />
                        </div>

                        <div className="passForm">
                          <Link
                            className="labelColor"
                            to={{
                              pathname: "/customer/forget-password",
                              email: `${email}`,
                              userId: `${user}`,
                            }}
                          >
                            Forgot password
                          </Link>
                        </div>

                        {loading ? (
                          <Spinner color="primary" />
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              maxWidth: "150px",
                              width: "100%",
                            }}
                          >
                            <button
                              className="btnWhite"
                              disabled={token !== null ? true : false}
                              type="submit"
                            >
                              Send OTP
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  )}
                </div>
              )}
            </MainContent>
            <MyBox>
              <CustomTypography>
                Mazars Advisory Solutions backed by group of professionals with
                extensive industry knowledge and experience in taxation matters,
                provides solutions to all direct & indirect tax queries.
              </CustomTypography>
              <div style={{ display: "flex" }}>
                <ImgBox>
                  <img src={servicesImg} className={classes.imgResponsive} />

                  <SubHeading>Services</SubHeading>
                  <CustomTypography margin="10px">
                    Offers solutions to all compliance requirements, transfer
                    pricing matters, assessment proceedings, appeal & litigation
                    matters, opinions and other advisory needs.
                  </CustomTypography>
                </ImgBox>
                <ImgBox>
                  <img src={costEffective} className={classes.imgResponsive} />
                  <SubHeading>Cost effective</SubHeading>
                  <CustomTypography margin="10px">
                    Provides cost effective solution, designed exclusively for
                    client.
                  </CustomTypography>
                </ImgBox>
                <ImgBox>
                  <img src={whatp} className={classes.imgResponsive} />
                  <SubHeading>Video conference</SubHeading>
                  <CustomTypography margin="10px">
                    Offers video conferencing facility to hold meetings with
                    clients.
                  </CustomTypography>
                </ImgBox>
                <ImgBox>
                  <img src={CloudImg} className={classes.imgResponsive} />
                  <SubHeading>Secure platform</SubHeading>
                  <CustomTypography margin="10px">
                    Ensures total privacy of client’s data.
                  </CustomTypography>
                </ImgBox>{" "}
                <ImgBox>
                  <img src={PaperLess} className={classes.imgResponsive} />
                  <SubHeading>Paperless</SubHeading>
                  <CustomTypography margin="10px">
                    Operates completely in paperless environment.
                  </CustomTypography>
                </ImgBox>
              </div>
            </MyBox>
          </div>
        </MyContainer>

        {showCookie === true ? (
          <div className="popup">
            <CookieConsent
              debug={true}
              declineButtonText={<CloseIcon />}
              onDecline={() => {
                setShowCookie(false);
              }}
              enableDeclineButton
              disableStyles
              location="none"
              buttonText="Agree"
              expires={1}
              overlay
              declineButtonClasses="myCookiesdecBtn"
              buttonStyle={{
                borderBottomLeftRadius: "1.75rem",

                backgroundColor: "#0071CE",
                border: "1px solid #0071CE",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 500,
                minWidth: "100px",
                minHeight: "3rem",
                textAlign: "center",
                display: "block",
                marginLeft: "auto",
              }}
              onAccept={(e) => {
                Cookies.set("accept", "agree");
              }}
              overlayClasses="overlayclass"
            >
              <CustomHeading>Disclaimer</CustomHeading>
              <SubHeading>
                By clicking on the "Agree" button below, the user hereby
                acknowledges having read and understood the disclaimer below:
              </SubHeading>
              <ul>
                <li>
                  <CustomTypography>
                    The user on his own accord wishes to know more about Mazars
                    Advisory Solutions (MAS) and any of its members for his own
                    information and use.
                  </CustomTypography>
                </li>
                <li>
                  <CustomTypography>
                    The user acknowledges that there has been no solicitation,
                    invitation, or inducement of any sort whatsoever from MAS or
                    any of its members to create an Attorney/Consultant-Client
                    relationship.
                  </CustomTypography>
                </li>
                <li>
                  <CustomTypography>
                    The user acknowledges that MAS makes every effort to
                    maintain updated and accurate information on this website
                    and cannot accept responsibility for any prejudice, loss or
                    damage which may occur from use of such information. MAS
                    assumes no liability for the interpretation or use of
                    content or information contained on this website, nor does
                    it offer any warranty of any kind, either express or implied
                    in relation to such content or information.
                  </CustomTypography>
                </li>

                <li>
                  <CustomTypography>
                    The user acknowledges that MAS does not intend that links /
                    URLs contained on this website re-directing users to third
                    party websites be considered as referrals to, endorsements
                    of, or affiliations with any such third-party website
                    operators. MAS is not responsible for, and makes no
                    representation or warranty, express or implied, about the
                    content or information contained on such third-party
                    websites.
                  </CustomTypography>
                </li>
              </ul>
            </CookieConsent>
          </div>
        ) : (
          ""
        )}

        <Footer showCook={showCook} />
      </MainContainer>
    </>
  );
}

export default LoginForm;

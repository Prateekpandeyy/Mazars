import { useRef, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import { Button, Box, Typography } from "@material-ui/core";
import './style.css';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../config/config";
import VerifyOTP from "./VerifyOTP";
import classNames from "classnames";
import Alerts from "../../common/Alerts";
import Mandatory from "../../components/Common/Mandatory";
import { Spinner } from 'reactstrap';
import ShowError from "../../components/LoadingTime/LoadingTime";
import LoadingTime from "../../components/LoadingTime/LoadingTime";
import Cookies from "js-cookie";
import CloudImg from './images/Cloud.jpg';
import PaperLess from './images/paperLess.jpeg';
import whatp from './images/video.jpeg';
import costEffective from './images/costEffective.jpeg';
import servicesImg from './images/services.jpeg';
import { styled , makeStyles} from "@material-ui/styles";
import { Markup } from "interweave";
import $ from 'jquery';
import CookieConsent from "react-cookie-consent"
const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required(""),
  p_password: yup.string().required(""),
});
const MyBox = styled(Box)({
  display: "flex", 
 width: "1000px",
 flexDirection: "column",
 margin: "10px 0px",
  justifyContent : "space-between",
  alignItems : "center",
  padding : "10px"
})
const ImgBox = styled(Box)({
display: "flex",
width: "20%",
flexDirection: "column",
height: "200px",
alignItems : "center",
padding : "10px"
})
const MyContainer = styled(Box)({
  display : "flex", 
  justifyContent : "center", 
  alignItems : "center", 
  width: "100%",
  flexDirection : "column"
})
const useStyle = makeStyles({
  imgResponsive : {
    display : "flex",
    maxWidth: "25%",
    height : "50px", 
    cursor : "pointer",
   alignItems : "space-between",
    justifyContent: "center",
    textAlign : "justify"
  }
})

function LoginForm() {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [uid, setUid] = useState('')
  const [time, setTime] = useState('');
  const [load, setLoad] = useState(false);
  const [disabled, setDisabled] = useState(false)
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [linkData, setLinkData] = useState("myData")
  const [showData, setShowData] = useState(false)
  const [news, getNews] = useState([])
  const [pos,setPos] = useState(0);   
  const [run, setRun] = useState(true);
  let  width = 800
  const myData = localStorage.getItem("myArticles")
   const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };
 
useEffect(() => {
  showLinkData()
}, [showData])
const showLinkData = () => {
  console.log(showData)
  setLinkData(myData)
}
  useEffect(() => {
    getTime()
  }, [load]);

useEffect(() => {
  latestNews()
}, [])
const latestNews = () => {
  axios.get(`${baseUrl}/customers/getnews`)
  .then((res) =>{
  let pp = []
    if(res.data.code === 1){
      res.data.result.map((i) => {
       pp.push(i.news)
        console.log("news", i.news)
      })
      getNews(pp)
    }
  })
}
  const getTime = () => {

    if (load) {
      LoadingTime.timer2(setTime, setDisabled)
    }

  }
  if(window.location.origin === "http://mazars.multitvsolution.com" && window.location.protocol == 'http:'){
    window.location.href = window.location.href.replace('http:', 'https:')
  }
  
  

  const onSubmit = (value) => {

    setLoading(true)
    let formData = new FormData();
    formData.append("user_id", value.p_email);
    formData.append("password", value.p_password);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/login`,
      data: formData,
    })
      .then(function (response) {
        
        if (response.data.code === 1) {
          setLoading(false)
          Alerts.SuccessNormal("As per your request, OTP has been sent to your registered email address.")
          setShow(true)
          console.log(response.data.display_name)
          setLoad(true)
          Cookies.set("custName", response.data.display_name)
          setUid(response.data.user_id)
        } else if (response.data.code === 0) {
          Alerts.ErrorNormal(response.data.result)
          setLoading(false)
        }
      })
      .catch((error) => {
       ShowError.LoadingError(setLoading)
      });
  };


  const handleChange = (e) => {
   
    setEmail(e.target.value);
  };
const classes = useStyle()
const scrollEff = () => {
  if(run) setPos(p=>p<width? p+1: -width);        
}

useEffect(() => {
  const tm = setTimeout(scrollEff, 10);
  return () => clearTimeout(tm);
},[pos]);

const onMouseEnter = (e) => {
  // console.log("mouse enter");
  setRun(false);
}

const onMouseLeave = (e) => {
  // console.log("mouse leave");
  setRun(true);
  setPos(pos+1); // to trigger useEffect 
}
const styles = {
  position: "relative", 
  fontSize: "1em",
  right: pos + "px"
};
  return (
    <>
      <Header noSign="noSign" />
     <MyContainer>
 
  <div style={{width: "100%", marginBottom : "15px", 
  padding: "3px 0px", fontSize: "14px", backgroundColor : "rgb(159 155 155 / 39%)"}}> 
  <h1 style={styles} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave} 
        >
  {
     news.map((i) => (

<span style={{padding: "0px 20px", fontSize: "16px", color: "464b4b"}}> 
<Link className="tabHover" to = "/customer/latestupdates">
{i}
</Link> </span> 

     ))
   }
  </h1>
    </div>
   
      {/* <h2>
        Would you like to post a query
      </h2> */}
      <div className="StartPage">
        <div className="mainContent">

          <div className="signIn">
            <div className="signBtn">
              <div className="boxOverlay">
                <Typography variant="h4" sx={{color:"#fff"}} style={{ "margin": "5px auto"}}>
                  For new client
                </Typography>
                <button className="customBtn">
                  <Link className="SignUpLink"
                    to={{
                      pathname: "/customer/signup",
                    }}
                  >
                    Sign Up
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="signUp">
            <Typography variant="h4" style={{ margin: "5px auto", color: "#464B4B" }}>
              For existing client
            </Typography>
            {
              show ? <div className="customForm">

                <VerifyOTP email={email} uid={uid} time={time} setLoad={setLoad}
                  setDisabled={setDisabled} disabled={disabled} setLoading={setLoading}
                  loading={loading} />
              </div>
                :
                <div className="customForm">
                  <form onSubmit={handleSubmit(onSubmit)} className="signInForm"  autoComplete="off">
                    <div className="form-group">
                      <label className="form-label">User Id <span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email,
                        })}
                        name="p_email"
                       autoComplete="new-password"
                        ref={register}
                        placeholder="Enter Email"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="form-group passForm ">
                      <label className="form-label">Password <span className="declined">*</span></label>
                      <input
                        type={isPasswordShow ? "text" : "password"}
                        className={classNames("form-control", {
                          "is-invalid": errors.p_password,
                        })}
                        name="p_password"
                       autoComplete="new-password"
                        placeholder="Enter Password"
                        ref={register}
                        onCopy={(e) => {
                          e.preventDefault();
                          return false
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false
                        }}
                      />
                      
                      <i
                        className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"} password-icon-login`}
                        onClick={togglePasssword}
                      />
                    </div>

                    <div style={{ display: "flex", margin: "0 0 30px 0", justifyContent: "flex-end" }} className="tabHover">
                      <Link
                        to={{
                          pathname: "/customer/forget-password",
                          email: `${email}`,
                        }}
                      >
                        Forgot Password
                      </Link>
                    </div>

                    {
                      loading ?
                        <Spinner color="primary" />
                        :
                        <button className="customBtn" type="submit">
                          Send OTP
                        </button>
                    }

                  </form>
                </div>
            }
            <Mandatory />
          </div>
     
        </div>
        <MyBox>
          <h2> Mazars Advisory Solutions </h2>
          <h4>A pioneering online innovative solution backed by group of professionals with extensive industry knowledge and experience in
             taxation matters, provides solutions to all direct & indirect tax queries.  </h4>
    <div style={{display: 'flex'}}>
    <ImgBox>
      <img src = {servicesImg}
      className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0"}}>Services</h5>
      <p style={{textAlign : "center"}}>
      Offers solutions to all compliance requirements, assessment proceedings, litigation matters, opinions and other advisory needs.
      </p>
      </ImgBox>
      <ImgBox>
      <img src = {whatp} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0"}}>Video Confrence</h5>
      <p style={{textAlign : "center"}}>
      Offers video conferencing facility to hold meetings with clients.
      </p>
      </ImgBox> 
      <ImgBox>
      <img src = {costEffective} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0"}}>Cost Effective</h5>
      <p style={{textAlign : "center"}}>
      Provides cost effective solutions, designed exclusively for clients
      </p>
      </ImgBox>  
      <ImgBox>
      <img src = {CloudImg} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0"}}>Secure Platform</h5>
      <p style={{textAlign : "center"}}>A secure platform that ensures total privacy of client’s data.</p>
      </ImgBox> <ImgBox>
      <img src = {PaperLess} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0"}}>Paperless</h5>
      <p style={{textAlign : "center"}}>Operates completely in paperless environment.</p>
      </ImgBox>
    </div>
      </MyBox>
      </div>
    
     </MyContainer>
      
<CookieConsent debug = {true}
location="bottom"
expires={1}
style={{backgroundColor : "#FFF", color: "#4B4646"}}
buttonStyle = {{borderBottomLeftRadius: "1.75rem",
backgroundColor : "#0071CE", border: "1px solid #0071CE", color: "#fff"
, cursor : "pointer", fontSize : "1rem", fontWeight: 500,
minWidth: "100px", minHeight: "3rem"}}
>
  This is contains cookies ,please read our cookies policy before login
</CookieConsent>

      <Footer />
    </>
  );
}

export default LoginForm;

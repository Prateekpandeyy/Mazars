import {  useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import {  Box, Typography } from "@material-ui/core";
import './style.css';
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../config/config";
import VerifyOTP from "./VerifyOTP";
import classNames from "classnames";
import Alerts from "../../common/Alerts";
import { Spinner } from 'reactstrap';
import ShowError from "../../components/LoadingTime/LoadingTime";
import LoadingTime from "../../components/LoadingTime/LoadingTime";
import Cookies from "js-cookie";
import CloudImg from './images/cloud1.jpeg';
import PaperLess from './images/ppp.jpeg';
import whatp from './images/video.jpeg';
import costEffective from './images/costEffective.jpeg';
import servicesImg from './images/services.jpeg';
import { styled , makeStyles} from "@material-ui/styles";
import CookieConsent from "react-cookie-consent";
import MainContainer from "../../components/Common/MainContainer";
import MyContainer from "../../components/Common/MyContainer";
import FlashSection from "../../components/Common/FlashSection";
import MainContent from "../../components/Common/MainContent";
import CloseIcon from '@material-ui/icons/Close';
import CustomHeading from "../../components/Common/CustomHeading";
import MainHeading from "../../components/Common/MainHeading";
import CustomTypography from "../../components/Common/CustomTypography";
import SubHeading from "../../components/Common/SubHeading";
const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required(""),
  p_password: yup.string().required(""),
});


const MyBox = styled(Box)({
  display: "flex", 
 maxWidth: "1000px",
 width: "100%",
 flexDirection: "column",
 margin: "0px",
  justifyContent : "space-between",
  alignItems : "center",
  padding : "1rem 0 1rem 0"
})
const ImgBox = styled(Box)({
display: "flex",
width: "20%",
flexDirection: "column",

padding : "10px"
})

const useStyle = makeStyles({
  imgResponsive : {
    display : "flex",
    maxWidth: "25%",
    height : "50px", 
   margin : "10px 0px",
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
  const [pos,setPos] = useState(1920);   
  const [run, setRun] = useState(true);
  const [showCookie, setShowCookie] = useState(false)
  const [user, setUser] = useState("")
  const [password , setPassword] = useState("")
  const token = localStorage.getItem("clientToken")
  const userEmail = JSON.parse(localStorage.getItem("custEmail"))
  let history = useHistory()
  var width = 1920
  const myData = localStorage.getItem("myArticles")
  const cookieEnable = Cookies.get("accept")
  const clientLogin = JSON.parse(localStorage.getItem("clientLoginId"))
   const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };
 
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
       pp.push(i)
      
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
  if(window.location.origin === "http://masindia.live" && window.location.protocol == 'http:'){
    window.location.href = window.location.href.replace('http:', 'https:')
  }
  
  

  const onSubmit = (value) => {

    setLoading(true)
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
          setLoading(false)
          Alerts.SuccessNormal("As per your request, OTP has been sent to your registered mobile number / email address.")
          setShow(true)
          console.log(response.data.display_name)
          setLoad(true)
          localStorage.setItem("custName", response.data.display_name)
          setUid(response.data.user_id)
        } else if (response.data.code === 0) {
          Alerts.ErrorNormal(response.data.result)
          setLoading(false)
        }
        else if (response.data.code === 2){
          setLoading(false)
          Alerts.ErrorNormal(response.data.result)
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
 display: "flex",
  fontSize: "1em",
  justifyContent : "center",
  right: pos + "px",
 
};

const showCook = () => {
 
  setShowCookie(true)
}
const myCookie2 = () => {
 
  if(cookieEnable){
history.push("/customer/signup")
  }
  else{
   showCook()
  }
}
const getUser = (e) => {
  var regEx = /^[0-9a-zA-Z]+$/;
  if(e.target.value.match(regEx)){
    setUser(e.target.value.toUpperCase())
  }
  else{
    setUser("")
  }
 
}
const custLogout = () => {
  const token = window.localStorage.getItem("clientToken")
          const myConfig = {
              headers : {
               "uit" : token
              }
            }
          axios.get(`${baseUrl}/customers/logout`, myConfig)
          .then((res) => {
             
                localStorage.removeItem("userid");
                localStorage.removeItem("custEmail");
                localStorage.removeItem("category");
                localStorage.removeItem("clientToken")
                history.push("/");
              
          })
 
};
  return (
    <>
 
    <MainContainer>
      
  
    <Header noSign="noSign"  showCook = {showCook}/>
    
     <MyContainer>
    
 {news.length > 0 ?
  <FlashSection>
  <h1 style={styles} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave} 
        >
  {
     news.map((i, e) => (
<>
{
  cookieEnable ? <>
  <span style={{display : "flex"}}>
  <span style={{padding: "0px 20px", fontSize: "16px", color: "#464646"}}> 

<Link className="tabHoverflash" to = {{
 pathname : "/customer/latestupdates",
 index : i.id
                       }}>
{i.heading} 
</Link> </span>

{e < news.length - 1 === true ? <span> | </span> : ""}
 </span>
  </> : 
  <>
 <span style={{display : "flex"}}>
<span style={{padding: "0px 20px", fontSize: "16px", color: "#464646"}}> 

<span onClick = {() => myCookie2("contactbasic")} className="tabHoverflash">
{i.heading} 
</span> </span>

{e < news.length - 1 === true ? <span> | </span> : ""}
 </span>
 </>
}
</>
     ))
   }
  </h1>
    </FlashSection> : ""}
    <span className="loginHeading">
    <MainHeading>
    Mazars Advisory Solutions
    </MainHeading>
   </span>
   
      <div className="StartPage">
        <MainContent>
        
          <div className="signIn">
            <div className="signBtn">
              <div className="boxOverlay">
              {
                token === null ?
                <>
                 <CustomHeading 
                 color = "#fff">
                 For new client
                 </CustomHeading>
                 
              
                <div stye={{display : "flex", maxWidth : "200px"}}>
                <button className="btnWhite"  disabled = {token !== null ? true : false} onClick = {() => myCookie2("contactbasic")}>
              
              Sign up
           
          </button>
                </div>
                </> : " "
              }
              </div>
            </div>
          </div>
        {
          token !== null ?
          <div className="signUpLogged">
         
           
          
          <CustomHeading 
          color = "#fff">
          {userEmail}
          </CustomHeading>
        
          <CustomHeading 
                 color = "#fff">
         logged in 
          </CustomHeading>
        <div style={{display : "flex", maxWidth : "150px"}}>
        <button className="btnWhite" onClick = {(e) => history.push("/customer/dashboard")}  type="button">
                  Go To Dashboard
                      </button>
        </div>
        <div style={{display : "flex", maxWidth : "150px"}}>
                      <button className="btnWhite" onClick = {(e) => custLogout()}  type="button">
                  Logout
                      </button>
                      </div>
          </div> :
          <div className="signUp">
        
          {
            show ? 
            <div className="customForm">
               <CustomHeading 
                 color = "#fff">
                For existing client
                 </CustomHeading>

              <VerifyOTP email={email} uid={uid} time={time} setLoad={setLoad}
                setDisabled={setDisabled} disabled={disabled} setLoading={setLoading}
                loading={loading} user = {user} 
                password = {password} />
            </div>
              :
            
              <div className="customForm">
                  <CustomHeading 
                 color = "#fff">
                For existing client
                 </CustomHeading>

                <form onSubmit={handleSubmit(onSubmit)} className="signInForm"  autoComplete="off">
                <div className="form-group passForm">


<label className="labelColor">User Id</label>
<input
  type="text"
  onChange={(e) => getUser(e)}
 value={user}
 disabled = {token !== null ? true : false}
  name="p_user"
  ref={register({ required: true })}
  placeholder="Enter user Id"
  className={classNames("form-control", {
    "is-invalid": errors.p_user 
  })}
/>

</div>
                  <div className="form-group passForm">
                    <label className="labelColor">Email</label>
                    <input
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_email,
                      })}
                      disabled = {token !== null ? true : false}
                      name="p_email"
                     autoComplete="new-password"
                      ref={register}
                      placeholder="Enter email"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
               
                  <div className="form-group passForm ">
                    <label className="labelColor">Password </label>
                    <input
                      type={isPasswordShow ? "text" : "password"}
                      className={classNames("form-control", {
                        "is-invalid": errors.p_password,
                      })}
                      onChange = {(e) => setPassword(e.target.value)}
                      disabled = {token !== null ? true : false}
                      name="p_password"
                     autoComplete="new-password"
                      placeholder="Enter password"
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

                  <div style={{ display: "flex", margin: "0 0 30px 0"}} className="tabHover">
                    <Link
                   className = "labelColor"
                      to={{
                        pathname: "/customer/forget-password",
                        email: `${email}`,
                        userId : `${user}`
                      }}
                    >
                      Forgot password
                    </Link>
                  </div>

                  {
                    loading ?
                      <Spinner color="primary" />
                      :
                      <div style={{display : "flex", maxWidth : "150px", width : "100%"}}>
                        <button className="btnWhite"  disabled = {token !== null ? true : false} type="submit">
                        Send OTP
                      </button>
                      </div>
                  }

                </form>
              </div>
          }
         
        </div>
        }
     
      </MainContent>
        <MyBox>
         
          <CustomTypography>
          Mazars Advisory Solutions backed by group of professionals with extensive industry knowledge and experience in
             taxation matters, provides solutions to all direct & indirect tax queries.
          </CustomTypography>
    <div style={{display: 'flex'}}>
    <ImgBox>
      <img src = {servicesImg}
      className = {classes.imgResponsive} />
      
      <SubHeading>
      Services
      </SubHeading>
     <CustomTypography margin= "10px">
     Offers solutions to all compliance requirements, 
     transfer pricing matters, assessment proceedings, appeal & litigation matters, opinions and other advisory needs. 
     </CustomTypography>
      </ImgBox>
      
      <ImgBox>
      <img src = {costEffective} className = {classes.imgResponsive} />
     <SubHeading>
     Cost effective
     </SubHeading>
     <CustomTypography margin= "10px">
     Provides cost effective solution, designed exclusively for client.
     </CustomTypography>
      </ImgBox> 
      <ImgBox>
      <img src = {whatp} className = {classes.imgResponsive} />
      <SubHeading>
      Video conference
        </SubHeading>
      <CustomTypography margin= "10px">
      Offers video conferencing facility to hold meetings with clients.
      </CustomTypography>
      </ImgBox> 
      <ImgBox>
      <img src = {CloudImg} className = {classes.imgResponsive} />
    <SubHeading>
    Secure platform
    </SubHeading>
      <CustomTypography margin= "10px">
      Ensures total privacy of client’s data.
      </CustomTypography>
      </ImgBox> <ImgBox>
      <img src = {PaperLess} className = {classes.imgResponsive} />
     <SubHeading>
     Paperless
     </SubHeading>
<CustomTypography margin= "10px">
Operates completely in paperless environment.
</CustomTypography>
      </ImgBox>
    </div>
      </MyBox>
      </div>
     
     </MyContainer>
    
{
 showCookie === true ?
 <div className="popup">

 <CookieConsent
 debug = {true}
 declineButtonText = {<CloseIcon />}
 onDecline={() => {
   setShowCookie(false)
 }}
 enableDeclineButton 
   disableStyles
   location="none"
   buttonText="Agree"
   expires={1}
   overlay
   declineButtonClasses = "myCookiesdecBtn"
   buttonStyle = {{borderBottomLeftRadius: "1.75rem", 
   margin : "0px auto",
backgroundColor : "#0071CE", border: "1px solid #0071CE", color: "#fff"
, cursor : "pointer", fontSize : "1rem", fontWeight: 500,
minWidth: "100px", minHeight: "3rem", textAlign: "center", display: "block", marginLeft: "auto"}}
onAccept={(e) => {

 Cookies.set("accept", "agree")
}}
   overlayClasses="overlayclass"
  
 >
 <h4 style={{textAlign: "center"}}>Disclaimer</h4>
 <h5>By clicking on the "Agree" button below, the user hereby acknowledges having read and understood the disclaimer below:</h5>
<ul>
  <li>The user on his own accord wishes to know more about Mazars Advisory Solutions (MAS) and any of its members for his own information and use.</li>
<li>The user acknowledges that there has been no solicitation, invitation, or inducement of any sort whatsoever from MAS or any of its members to create an Attorney/Consultant-Client relationship.</li>
<li>The user acknowledges that MAS makes every effort to maintain updated and accurate information on this website and cannot accept responsibility for any prejudice, loss or damage which may occur from use of such information. MAS assumes no liability for the interpretation or use of content or information contained on this website, nor does it offer any warranty of any kind,
   either express or implied in relation to such content or information.</li>
<li>    The user acknowledges that MAS does not intend that links / URLs contained on this website re-directing users to third party websites be considered as referrals to, endorsements of, or affiliations with any such third-party website operators. MAS is not responsible for, and makes no representation or warranty, express or implied, about the content or information contained on such third-party websites.
</li>
</ul>
 </CookieConsent>
</div>
: ""

}

<Footer 
showCook = {showCook} />
  
      
    </MainContainer>
    </>
  );
}

export default LoginForm;
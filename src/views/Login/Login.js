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
import PaperLess from './images/paperLess.jpeg';
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
alignItems : "center",
padding : "10px"
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
  const [pos,setPos] = useState(1920);   
  const [run, setRun] = useState(true);
  const [showCookie, setShowCookie] = useState(false)
  const [user, setUser] = useState("")
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
 
// useEffect(() => {
//   showLinkData()
// }, [showData])
// const showLinkData = () => {
//   let comming = sessionStorage.getItem("commingSoon")
//   var now = new Date()
//   let dd = now.getDay()
//   let hour = now.getHours()
//   console.log("hours", dd === 3 && 16 > hour)
//   console.log("hours", comming)
//   if(!comming && dd === 3 && 19 > hour){
//     console.log("hours")
//     history.push("/customer/coming-soon")
//   }
  
//   else {
//     setLinkData(myData)
//   }
// }
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
          Alerts.SuccessNormal("As per your request, OTP has been sent to your registered email address.")
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
  <span style={{padding: "0px 20px", fontSize: "16px", color: "464b4b"}}> 

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
<span style={{padding: "0px 20px", fontSize: "16px", color: "464b4b"}}> 

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
   <h2 className = "my-3"> Mazars Advisory Solutions (MAS) </h2>
   </span>
    
      <div className="StartPage">
        <MainContent>
        
          <div className="signIn">
            <div className="signBtn">
              <div className="boxOverlay">
              {
                token === null ?
                <>
                  <Typography variant="h4" sx={{color:"#fff"}} style={{ "margin": "5px auto"}}>
                  For new client
                </Typography>
                <button className="customBtn"  disabled = {token !== null ? true : false} onClick = {() => myCookie2("contactbasic")}>
              
                    Sign Up
                 
                </button>
                </> : " "
              }
              </div>
            </div>
          </div>
        {
          token !== null ?
          <div className="signUpLogged">
         
           <h4 style={{fontSize: "1.5rem"}}>
            {/* {clientLogin} : {userEmail}   */}
            {userEmail}
          </h4>
          <h4 style={{fontSize: "1.5rem"}}>
         logged in 
          </h4>
          <button className="customBtnlg" onClick = {(e) => history.push("/customer/dashboard")}  type="button">
                  Go To Dashboard
                      </button>
                      <button className="logoutBtn" onClick = {(e) => custLogout()}  type="button">
                  Logout
                      </button>
          </div> :
          <div className="signUp">
          <Typography variant="h4" style={{ margin: "5px auto", color: "#464B4B" }}>
            For existing client
          </Typography>
          {
            show ? 
            <div className="customForm">

              <VerifyOTP email={email} uid={uid} time={time} setLoad={setLoad}
                setDisabled={setDisabled} disabled={disabled} setLoading={setLoading}
                loading={loading} user = {user} />
            </div>
              :
            
              <div className="customForm">
                <form onSubmit={handleSubmit(onSubmit)} className="signInForm"  autoComplete="off">
                <div className="form-group passForm ">


<label className="form-label">User Id<span className="declined">*</span></label>
<input
  type="text"
  onChange={(e) => getUser(e)}
 value={user}
 disabled = {token !== null ? true : false}
  name="p_user"
  ref={register({ required: true })}
  placeholder="Enter User Id"
  className={classNames("form-control", {
    "is-invalid": errors.p_user 
  })}
/>

</div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_email,
                      })}
                      disabled = {token !== null ? true : false}
                      name="p_email"
                     autoComplete="new-password"
                      ref={register}
                      placeholder="Enter Email"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
               
                  <div className="form-group passForm ">
                    <label className="form-label">Password </label>
                    <input
                      type={isPasswordShow ? "text" : "password"}
                      className={classNames("form-control", {
                        "is-invalid": errors.p_password,
                      })}
                      disabled = {token !== null ? true : false}
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
                        userId : `${user}`
                      }}
                    >
                      Forgot Password
                    </Link>
                  </div>

                  {
                    loading ?
                      <Spinner color="primary" />
                      :
                      <button className="customBtn"  disabled = {token !== null ? true : false} type="submit">
                        Send OTP
                      </button>
                  }

                </form>
              </div>
          }
         
        </div>
        }
     
      </MainContent>
        <MyBox>
         
          <h4 style={{fontSize: "1.5rem"}}>MAS backed by group of professionals with extensive industry knowledge and experience in
             taxation matters, provides solutions to all direct & indirect tax queries.  </h4>
    <div style={{display: 'flex'}}>
    <ImgBox>
      <img src = {servicesImg}
      className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0", fontSize: "1.1rem"}}>Services</h5>
      <p style={{textAlign : "center", fontSize: "1rem"}}>
      Offers solutions to all compliance requirements, transfer pricing matters, assessment proceedings, appeal & litigation matters, opinions and other advisory needs. </p>
      </ImgBox>
      
      <ImgBox>
      <img src = {costEffective} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0", fontSize: "1.1rem"}}>Cost Effective</h5>
      <p style={{textAlign : "center", fontSize: "1rem"}}>
      Provides cost effective solution, designed exclusively for client.
      </p>
      </ImgBox> 
      <ImgBox>
      <img src = {whatp} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0", fontSize: "1.1rem"}}>Video Conference</h5>
      <p style={{textAlign : "center", fontSize: "1rem"}}>
      Offers video conferencing facility to hold meetings with clients.
      </p>
      </ImgBox> 
      <ImgBox>
      <img src = {CloudImg} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0", fontSize: "1.1rem"}}>Secure Platform</h5>
      <p style={{textAlign : "center", fontSize: "1rem"}}>Ensures total privacy of client’s data.</p>
      </ImgBox> <ImgBox>
      <img src = {PaperLess} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0", fontSize: "1.1rem"}}>Paperless</h5>
      <p style={{textAlign : "center", fontSize: "1rem"}}>Operates completely in paperless environment.</p>
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
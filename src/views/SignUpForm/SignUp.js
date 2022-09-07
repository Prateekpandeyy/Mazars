import React, { useState, useEffect } from "react";
import { useForm ,  useFieldArray } from "react-hook-form";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import classNames from "classnames";
import { Spinner } from "reactstrap";
import { professionName, country, states } from './data';
import { cities } from './city';
import Alerts from "../../common/Alerts";
import ResendOtp from "./ResendOtp";
import Select from "react-select";
import Mandatory from "../../components/Common/Mandatory";
import EmailValidation from "../../components/Common/EmailValidation";
import MyPDF from '../dFile/LoginManual.pdf';
import  { HelpIcon } from "../../components/Common/MessageIcon";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import Swal from "sweetalert2";
import {GrStatusInfo} from 'react-icons/gr';
import MyContainer from "../../components/Common/MyContainer";
function SignUp(props) {
  
  
  const { handleSubmit, register, errors, reset, getValues, control } = useForm({
    defaultValues: {
      p_email: [{ p_email: "" }],
    },
  });
  const { append, remove, fields} = useFieldArray({
    control,
    name: "p_email",
  });
  const [display, setDisplay] = useState(false);

  const [load, setLoad] = useState(false);

  const [password, setPassword] = useState(false);
  
  const [repassword, setRepassword] = useState(false);
  const [show, setShow] = useState(false);
  const [State, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [countryCode, setCountryCode] = useState('91')
  const [phone, setPhone] = useState('');
  const [valiEmail, setValiemail] = useState(null)
  const [valiEmailMulti, setValiemailMulti] = useState(null)
  const [invalid, setInvalid] = useState(null)
  const [invalidMulti, setInvalidMulti] = useState(null)
  const [numExist, setNumExist] = useState(null)
  const [numAvail, setNumAvail] = useState(null)
  const [countryName, setCountryName] = useState("India")
  const [stateName, setStateName] = useState(null)
  const [countryId, setCountryId] = useState(101)
  const [indNumError, setIndNumError] = useState(null)
  const [zipCode, setZipCode] = useState('')
  const [zipError, setZipError] = useState(null)
  const [wEmail, setWemail] = useState('');
  const [wEmailmulti, setWemailmulti] = useState()
  const [time, setTime] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [valiOtp, setvaliOtp] = useState()
  const [emailError, setEmailError] = useState(null)
  const [emailErrorMulti, setEmailErrormulti] = useState(null)
  const [phoneError, setPhoneError] = useState(null)
  const [zipError1, setZipError1] = useState(null);
  const [subm, setSub] = useState(false)
  const [dstate, setDstate] = useState()
const [email2, setEmail2] = useState();
const [email2multi2, setEmailmulti2] = useState();
  const [loading, setLoading] = useState(false);
const [estate, setEstate] = useState("");
const [cityState2, setCityValue2] = useState("")
const [dstate2, setDstate2] = useState("")
const [myCount, setMyCount] = useState(101)
const [user, setUser] = useState("")
const [userError, setUserError] = useState("")
const [address, setAddress] = useState("")
const [name, setName] = useState("")
const [userAvailable, setUserAvailable] = useState({
  flag : "",
  message : ""
})
const [phoneLength, setPhoneLength] = useState(10)
 const [pass2, setpass2] = useState(false)
 const [nameError, setNameError] = useState(false)
  // cusSub
  const cusSub = {
    display: "flex",
    width: "100%",
    alignItems : "center",
    justifyContent: "center"
  }
  // Toggle Password
  const togglePasssword = () => {
    setPassword(!password)
  };

  const togglePasssword2 = () => {
    setRepassword(!repassword)
  };

  useEffect(() => {
    getTime()
  }, [load]);
useEffect(() => {
 getState()
}, [])
const getState = () => {
  var arrayState = []
  let sta = {}
  states.filter((data) => {
    if (data.country_id == 101) {
   
      sta = {
        "value" : data.id,
        "label" : data.name
      }
      arrayState.push(sta)
    }
  });
  setState(arrayState)
}

  const getTime = () => {
    
    if (load) {
      var timerOn = true;
      function timer(remaining) {
        var s = remaining % 60;
        s = s < 10 ? '0' + s : s;
        setTime(remaining)
        remaining -= 1;
        if (remaining >= 0 && timerOn) {
          setTimeout(function () {
            timer(remaining);
          }, 1000);
          return;
        }
        setDisabled(true)
        // setDisplay(false)
      }
      timer(180);
    }
  }

  //get country
  const getcountry = (key) => {
    setPhone("")
    
    setMyCount(key)
   setAddress("")
    setZipCode("")
    setZipError("")
    setDstate("");
    setEstate("")
    setCityValue2("")
    setDstate2("")
    setCountryName(key)
   
    setPhone("")
    setIndNumError("")
    setNumAvail("")
   
   
  
    // setInvalid("")
    if (key == 101) {
      setCountryId(key)
      setPhoneLength(10)
    }
    else {
      setPhoneLength(20)
      setCountryId("")
    }

    var arrayState = []
    let sta = {}
    states.filter((data) => {
      if (data.country_id == key) {
        sta = {
          "value" : data.id,
          "label" : data.name
        }
        arrayState.push(sta)
      }
    });
    setState(arrayState)

    country.filter((data) => {
      if (key == data.id) {
        setCountryCode(data.phoneCode)
        setCountryName(data.name)
      }
    })
  };


  //get city
  const getCity = (key) => {
  
    
    setAddress("")
    setPhone("")
    setZipCode("")
    if(estate.length > 0){
      setEstate("")
    }
  setDstate(key)
  
  
    let sta = {}
    states.filter((p) => {
      if (p.id == key) {
        setStateName(p.name)
       
      }
    });

    var arrayCity = []
    cities.filter((data) => {
      if (data.state_id === key.value) {
       
        sta = {
          "value" : data.id,
          "label" : data.name
        }
       
        arrayCity.push(sta)
      }
    });
    setDstate2('')
    setCityValue2('')
    setCity(arrayCity)
  }




  //phone onchange
  const phoneHandler = (e) => {

    if (isNaN(e.target.value)) {
      setIndNumError("")
      setNumAvail("");
      setNumExist('Please enter number only')
      e.target.value = ""
      setPhone("")
      setPhoneError(true)
    }
    else {
      setPhoneError(false)
      setNumAvail("");
      setNumExist("");
      setPhone(e.target.value)
    }
  };

  //phone validaation with api
  const phoneValidation = () => {
    setPhoneError(false)
    console.log("Phone", phone.length, countryId)
    if (countryId && phone.length > 10) {
   
      setNumAvail("")
      setNumExist("")
      setIndNumError("Please enter valid mobile number")
      setPhoneError(true)
    }
    else if (countryId && phone.length < 10) {
     
      setNumAvail("")
      setNumExist("")
      setIndNumError("Please enter valid mobile number")
      setPhoneError(true)
    }
    else if (!countryId && phone.length > 20) {
      setNumAvail("")
      setNumExist("")
      setPhoneError(true)
      setIndNumError("Please enter valid mobile number")
    }

    else {
      setPhoneError(false)
      setIndNumError("")

      let formData = new FormData();
      formData.append("phone", phone);
      formData.append("type", 2);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/validateregistration`,
        data: formData,
      })
        .then(function (response) {
         
          if (response.data.code === 1) {
            // setValiphone(response.data.result)
            
            setPhoneError(false)
            setNumExist('')
            setNumAvail(response.data.result);

          }
          else if (response.data.code === 0) {
            setPhoneError(true)
            
            setNumAvail('')
            setNumExist(response.data.result)

         
          }

        })
        .catch((error) => {
        
        });
    }
  }


const checkSpecial = (e) => {
 
  var regEx = /^[0-9a-zA-Z .]+$/;
  if(e.target.value.match(regEx)){
    setNameError(false)
    setName(e.target.value)
  }
  else if(e.target.value.length === 0){
    setName("")
  }
  
 
}
  //zip oncahnge
  const zipValue = (e) => {
    console.log("elend", e.target.value.length)
    var regEx = /^[0-9a-zA-Z]+$/;
  if(e.target.value.match(regEx)){
    setZipCode(e.target.value)
    setZipError("")
       setZipError1(false)
  }
  else if (e.target.value == 0) {
    setZipCode("")
  }
 
    // if (isNaN(e.target.value) && countryId.length > 0) {

    //   setZipError("Please enter number only")
    //   setZipCode("")
    //   setZipError1(true)
    //   e.target.value = ""
    // }
    // else if (e.target.value.length == 0) {
    //   setZipError1(true)
    // }
    // else {
    //   setZipCode(e.target.value)
    //   setZipError("")
    //   setZipError1(false)
    // }
  }


  // onblur
  const zipVali2 = (e) => {
console.log(e.target.value.length)
if(e.target.value.length === 0){
  setZipError(true)
}
  else if (countryId && zipCode && zipCode.length < 6) {
      setZipError1(true)
      setZipError("Please enter valid zip code")

    }

    else if (countryId && zipCode && zipCode.length > 6) {
      setZipError1(true)
      setZipError("Please enter valid zip code")
    
    }
    else {
      setZipError1(false)
    }
  }



  const otpVali = (e) => {
    if (isNaN(e.target.value)) {
      setvaliOtp("Please enter number only")
      e.target.value = ""
    }
    else {
      setvaliOtp("")
    }
  }

  const getStateValue = (input, reason) => {
   
    if (
      reason.action === "set-value" ||
      reason.action === "input-blur" ||
      reason.action === "menu-close"
    ) {
      return;
    }
    setCity([])
    setDstate2("")
    setCityValue2("")
    if(input.length < 101){
    setEstate(input)
   }
  }

  const getCityValu2 = (input, reason) => {
    if (
      reason.action === "set-value" ||
      reason.action === "input-blur" ||
      reason.action === "menu-close"
    ) {
      return;
    }
  
    if(input.length < 101){
      setCityValue2(input)
     }
  }


  const onSubmit = (value) => {
    if(!dstate && estate.length < 1){
      Swal.fire({
        title : "error",
        html : "Please fill State",
        icon : "error"
      })

    }
    else   if(!dstate2 && cityState2.length < 1){
     Swal.fire({
       title : "error",
       html : "Please fill City",
       icon : "error"
     })

   }
   else {

    let formData = new FormData();
    formData.append("user_id", user);
    formData.append("name", name);
    formData.append("email", email2);
    formData.append("emailmultiple", JSON.stringify(value.p_email));
    formData.append("phone", value.p_phone);
    formData.append("occupation", value.p_profession);
 {cityState2 && cityState2.length > 0 ?    formData.append("city", cityState2) :
 formData.append("city", dstate2.label)}
    formData.append("pincode", value.p_zipCode);
    formData.append("password", value.p_password);
    formData.append("rpassword", value.p_confirm_password);
    formData.append("otp", value.p_otp);
    formData.append("country", countryName);
    {estate && estate.length > 0 ?  formData.append("state", estate) :
    formData.append("state", dstate.label)}
    formData.append("stdcode", countryCode);
    formData.append("gstin_no", value.p_gstIn);
    formData.append("address", address)
    if (display === true && subm === false) {
      setLoading(true)
      let formData = new FormData();
      formData.append("user_id", user)
      formData.append("email", email2);
      formData.append("stdcode", countryCode);
      formData.append("phone", phone);
      formData.append("p", "registration");

      axios({
        method: "POST",
        url: `${baseUrl}/customers/forgototp`,
        data: formData,
      })
        .then(function (response) {
         
          if (response.data.code === 1) {
            setLoading(false)
            setLoad(true)
            setShow(true)
            Alerts.SuccessNormal("As per your request , OTP has been sent to your email address and mobile number.")
          } else if (response.data.code === 0) {
            setLoading(false)
            Alerts.ErrorNormal(response.data.message)
          }
        })
        .catch((error) => {
        
        });

    }
    else if (emailError === false && phoneError === false && zipError1 === false && subm === true) {
      axios({
        method: "POST",
        url: `${baseUrl}/customers/signup`,
        data: formData,
      })
        .then(function (response) {
         
          if (response.data.code === 1) {
            setLoading(false)
            var variable = "Signup successfully."
            Alerts.SuccessNormal(variable)
            console.log("response", response.data)
            localStorage.setItem("isMail", JSON.stringify(response.data.is_mail))
            localStorage.setItem("userid", JSON.stringify(response.data.user_id));
                    sessionStorage.setItem("userIdsession", JSON.stringify(response.data.user_id));
                    localStorage.setItem("custEmail", JSON.stringify(response.data.name));
               localStorage.setItem("clientName", JSON.stringify(response.data.displayname))
               localStorage.setItem("custName", response.data.displayname)
                    localStorage.setItem("clientToken", response.data.token)
                    localStorage.setItem("clientLoginId", JSON.stringify(response.data.loginuid))
            props.history.push("/customer/select-category");
          } else if (response.data.code === 0) {
            setLoading(false)
          
            setLoad(false);
            Alerts.ErrorNormal("Incorrect OTP , please try again.")
          }
        })
        .catch((error) => {
        
        });
    }
  }
  };


  //setotp
  const setOtp = () => {

    setSub(true)
  }

  //get OTP
  const getOtp = () => {
    if (emailError === true || phoneError === true || zipError1 === true) {
      setDisplay(false)
    }
    else {
      setDisplay(true)
    }
  }
  const getCity22 = (key) => {
    setPhone("")
    setAddress("")
    setZipCode("")
    if(cityState2.length > 0){
    setCityValue2("")
    }
    setDstate2(key)
  }
const validateUser = (e) => {
  let formData = new FormData()
  if(user.length < 6){
    setUserError("Please enter valid user id")
  }
  else if(user.length > 16){
    setUserError("Id could not be greater than 16 number")
  }
  else{
setUserError("")
formData.append("user_id", user);
axios({
  method: "POST",
  url: `${baseUrl}/customers/validateuserid`,
  data: formData,
})
.then((res) => {
  console.log("user", res)
  setUserAvailable({
    flag : res.data.code,
    message : res.data.result
  })
})
  }
}
// getEmailValue 
const emailHandler = (e) => {
console.log("eee", e.target.value)
setEmailmulti2(e.target.value)
    if (e.target.value.length < 1) {
    setWemailmulti("")
    }
  };

  const emailValidation = (key) => {

    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email2multi2.length > 0 && email2multi2.match(validRegex)) {
    setWemailmulti("");
    
    setEmailErrormulti(false)

    
      
    }
    else {
      setEmailErrormulti(true)
      setWemailmulti("Please enter valid email")
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

const resetFun = () => {
  setDisplay(false)
    setLoad(false)
    setPassword(false)
    setRepassword(false)
    setShow(false)
    setState([])
    setCity([])
    setCountryCode('91')
    setPhone('')
    setValiemail(null)
    setValiemailMulti(null)
    setInvalid(null)
    setInvalidMulti(null)
    setNumExist(null)
    setNumAvail(null)
    setCountryName("India")
    setCountryId(101)
    setIndNumError(null)
    setZipCode('')
    setZipError('')
    setWemail('')
    setWemailmulti('')
    setTime('')
    setDisabled(false)
    setvaliOtp('')
    setEmailError(null)
    setEmailErrormulti(null)
    setPhoneError(null)
    setZipError1(null)
    setSub(false)
    setDstate('')
    setEmail2('')
    setEmailmulti2('')
    setLoading(false)
    setEstate("")
    setCityValue2("")
    setDstate2("")
    setMyCount(101)
    setUser("")
    setUserError("")
    setAddress("")
    setName("")
    reset()
    setUser("")
    setNameError(false)
    setUserAvailable({
  flag : "",
  message : ""
})
setPhoneLength(10)
setpass2(false)
  reset()
  getState()
}
const checkPassError = (e) => {
  console.log(e.target.value)
  if(e.target.value.length < 8){
    setpass2(true)
  }
  else{
    setpass2(false)
  }
}
const checkNameError = (e) => {
  if(e.target.value.length === 0){
    setNameError(true)
  }
}
  return (
    <>
      <OuterloginContainer>
      <Header noSign="noSign" />
    <MyContainer>
    
<div className="form">
  <div className="heading" style={{display : "flex", justifyContent : "space-between"}}> 
    <h2>Client registration</h2>
    <a href={MyPDF} className="tabHover" target="_blank"> <HelpIcon /> </a>
  </div>

  <>
    <div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="row">
        <div className="col-md-6">

<div className="mb-3" style = {{position : "relative"}}>
<label className="form-label">User Id<span className="declined">*</span></label>
<input
type="text"
autoComplete="off"
onChange={(e) => getUser(e)}
onBlur={() => validateUser()}
maxLength="16"
name="p_user"
value={user}
ref={register({ required: true })}
placeholder="Enter Name"

className={classNames("form-control", {
"is-invalid": errors.p_user || userError.length > 0 || userAvailable.flag === 0,
})}

/>
<span style={{display : "flex", position : "absolute",
right : "9px", top : "39px",
color : "#dd4445", borderRadius : "50%"}} 
title = "Enter minimum 6 alpha numeric character (no special character) to form an user id.">
<GrStatusInfo  style = {{visibility : "hidden", zIndex : 99999}}/>
</span>
{
userError.length > 0 ?
<p className="declined">{userError}</p>  : ""
}
{
userAvailable.flag === 0 ?
<p className="declined">{userAvailable.message}</p> : 
<p className="completed">{userAvailable.message}</p>
}
</div>

</div>
          <div className="col-md-6">

            <div className="mb-3" style = {{position : "relative"}}>
              <label className="form-label">Name<span className="declined">*</span></label>
              <input
                type="text"
                name="p_name"
                value = {name}
                maxLength = "100"
                onBlur = {(e) => checkNameError(e)}
                onChange = {(e) => checkSpecial(e)}
                ref={register({ required: true })}
                placeholder="Enter Name"
                className={classNames("form-control", {
                  "is-invalid": errors.p_name || nameError === true ,
                })}
              />
              <span style={{display : "flex", position : "absolute", 
              right : "9px", top : "39px",
color : "#dd4445", borderRadius : "50%"}} 
title = {`• Enter full name or any chosen name (no special characters allowed.) 
• For registration of business/entity, enter the legal name of the business/entity.`}>
<GrStatusInfo  style = {{visibility : "hidden", zIndex : 99999}}/>
</span>
            </div>
          </div>

          <div className="col-md-6">
          
          <div className="mb-3" style = {{position : "relative"}}>

<label className="form-label">Email<span className="declined">*</span></label>
<EmailValidation
setWemail = {setWemail}
wEmail = {wEmail} 
invalid = {invalid}
setEmailError = {setEmailError}
setValiemail = {setValiemail} 
emailError = {emailError} 
setInvalid = {setInvalid} 
clientId = {user} 
panel = "Clinet"
setEmail2 = {setEmail2} />
{
wEmail ? <p className="declined">{wEmail}</p> : <>
{valiEmail ?
<p className="completed">
  {valiEmail}
</p>
:
<p className="declined">{invalid}</p>}
</>
}
<span style={{display : "flex", position : "absolute", 
              right : "9px", top : "39px",
color : "#dd4445", borderRadius : "50%"}} 
title = {`Enter personal email address or the email address of any
representative or authorized signatory of the business/entity.`}>
<GrStatusInfo  style = {{visibility : "hidden", zIndex : 99999}}/>
</span>
</div>                  
            </div>

          <div className="col-md-6">
            <div className="mb-3" style = {{position : "relative"}}>
              <label className="form-label">Occupation/ Profession<span className="declined">*</span></label>
              <br />
              <select
                className={classNames("form-control", {
                  "is-invalid": errors.p_profession,
                })}
                name="p_profession"
                aria-label="Default select example"
                ref={register({ required: true })}
               
              >
                <option value="">--select--</option>
                {professionName.map((p, index) => (
                  <option key={index} value={p.city}>
                    {p.city}
                  </option>
                ))}
              </select>
              <span style={{display : "flex", position : "absolute",
               right : "9px", top : "39px",
color : "#dd4445", borderRadius : "50%"}} 
title = {`• From drop down list, select your occupation/profession
• In case of business/entity, select the occupation/ profession of the
representative or authorized signatory, who is registering for query.`}>
<GrStatusInfo  style = {{visibility : "hidden", zIndex : 99999}}/>
</span>
            </div>
          </div>


          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Country<span className="declined">*</span></label>
              <select
                id="state"
                name="p_country"
                className={classNames("form-control", {
                  "is-invalid": errors.p_country,
                })}
                ref={register({ required: true })}
                onChange={(e) => getcountry(e.target.value)}
                value={myCount}
              >
                <option value="">--select--</option>
                {country.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>


          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">State<span className="declined">*</span></label>
             
            <Select
closeMenuOnSelect={true}
onSelectResetsInput={false}
blurInputOnSelect={false}
options={State}
inputValue={estate}
onChange={(e) => getCity(e)}
onInputChange={getStateValue}


value={dstate}
/>

            </div>
          </div>


          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">City<span className="declined">*</span></label>
             
              <Select
closeMenuOnSelect={true}
onSelectResetsInput={false}
blurInputOnSelect={false}
options={city}
inputValue={cityState2}
onInputChange={getCityValu2}

onChange={(e) => getCity22(e)}
value={dstate2}
/>
            </div>
          </div>
          <div className="col-md-6">
          <div className="mb-3">
              <label className="form-label">Address</label>
             
               
                <textarea
                  type="text"
                  className="form-control"
                  name="p_address"
                  autoComplete = "off"
                  autoFill = "off"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)} 
                  maxLength="100"
                  ref={register()}
                  placeholder="Enter Address"
                
                />

            

            </div>
          </div>
          <div className="col-md-6">
          <div className="mb-3" style = {{position : "relative"}}>
              <label className="form-label">Mobile number<span className="declined">*</span></label>
              <div className="mobNumber" style={{ "display": "flex" }}>
                <select
                  name="p_code"
                  disabled={true}
                  ref={register({ required: true })}
                >
                  <option>
                    { "+" + countryCode}
                  </option>
                </select>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.p_phone || phoneError === true || indNumError,
                  })}
                  name="p_phone"
                  value={phone}
                  autoComplete = "off"
                  maxLength = {phoneLength}
                  ref={register({ required: true })}
                  placeholder="Mobile number"
                  onChange={(e) => phoneHandler(e)}
                  onBlur={phoneValidation}
                />
<span style={{display : "flex", position : "absolute", 
right : "9px", top : "39px",
color : "#dd4445", borderRadius : "50%"}}
title = "Enter the valid numeric mobile number.">
<GrStatusInfo  style = {{visibility : "hidden", zIndex : 99999}}/>
</span>
              </div>
              {indNumError ? <p className="declined">{indNumError}</p> : <>
                {
                  numAvail ?
                    <p className="completed"> {numAvail}
                    </p>
                    :
                    <p className="declined">{numExist}</p>
                }
              </>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3" style = {{position : "relative"}}>
              <label className="form-label">Zipcode<span className="declined">*</span></label>
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.p_zipCode || zipError1 === true || zipError,
                })}
                name="p_zipCode"
                maxLength = "12"
                ref={register({ required: true })}
                placeholder="Enter Zipcode"
                onChange={(e) => zipValue(e)}
                onBlur={(e) => zipVali2(e)}
                value={zipCode}
              />
              <span style={{display : "flex",
               position : "absolute", right : "9px", top : "39px",
color : "#dd4445", borderRadius : "50%"}} title = "Enter the valid Zip Code or Pin Code.">
<GrStatusInfo  style = {{visibility : "hidden", zIndex : 99999}}/>
</span>
            </div>
            <p className="declined">{zipError}</p>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">GST number</label>
              <input
                type="text"
               className="form-control"
                name="p_gstIn"
                ref={register}
                placeholder="Enter GST Code"
               maxLength = "24"
              />
            </div>
          
          </div>

          <div class="col-md-6">
            <div className="mb-3" style = {{position : "relative"}}>
              <label className="form-label">Password<span className="declined">*</span></label>
              <input
                type={password ? "text" : "password"}
             
                onCopy={(e) => {
                  e.preventDefault();
                  return false
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  return false
                }}
                onBlur = {(e) => checkPassError(e)}
                className={classNames("form-control", {
                  "is-invalid": errors.p_password || pass2 === true,
                })}
                name="p_password"
                placeholder="Enter Your Password"
                ref={register({
                  required: true,
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                    message:
                      "Password should be of minimum 8 characters, including at least 1 upper case, lower case, special character and number.",
                  },
                })}

                autoComplete="new-password"
              />
              <i
                className={`fa ${password ? "fa-eye-slash" : "fa-eye"} password-icon`}
                onClick={togglePasssword}
              />
              <span style={{display : "flex", position : "absolute", 
              right : "9px", top : "39px",
color : "#dd4445", borderRadius : "50%"}}
title = {`Choose a password that should be minimum of eight characters,
including at least one upper case, lower case, special character
and number.`}>
<GrStatusInfo  style = {{visibility : "hidden", zIndex : 99999}}/>
</span>
             
            </div>
          </div>

          <div class="col-md-6">
            <div className="mb-3" style = {{position : "relative"}}>
              <label className="form-label">Confirm password<span className="declined">*</span></label>
              <input
                type={repassword ? "text" : "password"}
                className={classNames("form-control", {
                  "is-invalid": errors.p_confirm_password,
                })}
                onCopy={(e) => {
                  e.preventDefault();
                  return false
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  return false
                }}
                placeholder="Confirm Password"
                name="p_confirm_password"
                ref={register({
                  required: true,
                  validate: (value) =>
                    value === getValues("p_password") ||
                    "Password doesn 't match.",
                })}
                autocomplete="off"
              />
              <i
                className={`fa ${repassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                onClick={togglePasssword2}
              />
              <span style={{display : "flex", position : "absolute", 
              right : "9px", top : "39px",
color : "#dd4445", borderRadius : "50%"}} 
title = {`Enter email address of other person(s) of the organization entitled
to work on the queries under the User Id code.`}>
<GrStatusInfo  style = {{visibility : "hidden", zIndex : 99999}}/>
</span>
              {errors.p_confirm_password && (
                <div className="invalid-feedback">
                  {errors.p_confirm_password.message}
                </div>
              )}
            </div>
          </div>

        
          <div className="col-md-12">
            <label>
             Choose a password that should be minimum of eight characters,
including at least one upper case, lower case, special character
and number
            </label>
            <div className="row">
              <div className="col-md-6">
              <div className="question_query mb-2">
                <label className="form-label">
                  Secondary email 
                </label>
               {
                 fields.length < 9 ?
                 <div
                 className="btn queryPlusIcon"
                 onClick={() => append({ query: "" })}
               >
                   +
                </div>
                : "" 
               }
                
              </div>

              {fields.length > 0 &&
                fields.map((item, index) => (
                  <div
                    className="question_query_field mb-2"
                    key={item.id}
                  >
                    <input
                    name={`p_email[${index}].query`}
                    maxlength = "100"
                   className={classNames("form-control", {
                     "is-invalid": errors.p_email || props.emailErrorMulti === true || props.wEmailmulti || props.invalid,
                   })}
                   onChange={(e) => emailHandler(e)}
                   onBlur = {(e) => emailValidation(e)}
                   placeholder="Enter Your Email"
                   ref={register()}
                    
                    />
                    
                    <div
                      className="btn queryPlusIcon ml-2"
                      onClick={() => remove(index)}
                    >
                      -
                    </div>
                  </div>
                ))}
              {
                wEmailmulti ? <p className="declined">{wEmailmulti}</p> : <>
                  {valiEmailMulti ?
                    <p className="completed">
                      {valiEmailMulti}
                    </p>
                    :
                    <p className="declined">{invalidMulti}</p>}
                </>
              }
                </div>
              </div>

            </div>
            {
            show ?
              <div class="col-md-6">
                <div className="mb-3">
                  <label className="form-label">OTP<span className="declined">*</span></label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_otp,
                    })}
                    name="p_otp"
                    ref={register({ required: true })}
                    onChange={otpVali}
                    placeholder="Enter your OTP"
                    autocomplete="off"
                  />
                  <p className="declined"> {valiOtp ? valiOtp : ""}</p>
                  {
                    disabled ? null
                      :
                      <small class="text-center">
                        Note: OTP is valid for {time} seconds.
                      </small>
                  }
                </div>
              </div>
              : null
          }
        <div className="col-md-12">
        {
            loading ?
              <div className="col-md-12">
                <Spinner color="primary" />
              </div>
              :
              <div className="col-md-12 d-flex justify-content-center">
               
                {
                  show ?
                    <>
                      {
                        disabled ? null
                          :
                          
                            <button type="submit" className="customBtn mx-4" onClick={() => setOtp()}>Submit</button>
                  
                              }
                    </>
                    :
                   
                    <button type="submit" class="autoWidthBtn mx-4" onClick={() => getOtp("otp")}>SEND OTP</button>
             
               }
                  {
        disabled ?
          <ResendOtp setDisabled={setDisabled} disabled={disabled} getTime={getTime}
            email={email2} phone={phone} setLoad={setLoad} invalid={invalid} indNumError={indNumError}
            wEmail={wEmail} zipError={zipError} 
            setLoading={setLoading} loading={loading}
            display={display}
            clientId = {user}
            countryCode = {countryCode}
            emailError={emailError}
            phoneError={phoneError} zipError1={zipError1} />
          :
          null
      }
               <button type="button" class="customBtn" onClick={() => resetFun()}>Reset</button>
        
              </div>
          }
        
          </div>
      
       
     

     
        </div>
       <div>
       </div>
       </form>
      <Mandatory />
    </div>
  </>

</div>

    </MyContainer>
      <Footer />
      </OuterloginContainer>
    </>
  );
}

export default SignUp;

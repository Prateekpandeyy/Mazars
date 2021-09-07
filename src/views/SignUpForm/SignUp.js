import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import classNames from "classnames";
import { Spinner } from "reactstrap";
import { professionName, country, states } from './data';
import { cities } from './city';
import Alerts from "../../common/Alerts";
import ResendOtp from "./ResendOtp";
import GetOTP from "./GetOTP";
import Mandatory from "../../components/Common/Mandatory";




function SignUp(props) {
  const phone2 = useRef(null)
  const alert = useAlert();
  const { handleSubmit, register, errors, getValues } = useForm();


  const [display, setDisplay] = useState(false);

  const [load, setLoad] = useState(false);
  const [store, setStore] = useState(0);
  const [password, setPassword] = useState(false);
  const [passError, setpassError] = useState()
  const [repassword, setRepassword] = useState(false);
  const [show, setShow] = useState(false);
  const [changeNum, setChangeNum] = useState(false)
  const [State, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [countryCode, setCountryCode] = useState('')
  const [showPlus, setShowPlus] = useState(false)
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [valiEmail, setValiemail] = useState(null)
  const [invalid, setInvalid] = useState(null)
  const [numExist, setNumExist] = useState(null)
  const [numAvail, setNumAvail] = useState(null)
  const [countryName, setCountryName] = useState(null)
  const [stateName, setStateName] = useState(null)

  const [countryId, setCountryId] = useState(null)
  const [indNumError, setIndNumError] = useState(null)
  const [zipCode, setZipCode] = useState('')
  const [zipError, setZipError] = useState(null)

  const [wEmail, setWemail] = useState();
  const [time, setTime] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [valiOtp, setvaliOtp] = useState()
  const [emailError, setEmailError] = useState(null)
  const [phoneError, setPhoneError] = useState(null)
  const [zipError1, setZipError1] = useState(null);
  const [subm, setSub] = useState(false)

  const [loading, setLoading] = useState(false);

  //Css
  const CountryNumStyle = {
    "display": "flex",
    "width": "76px",
    "textAlign": "center"
  }
  // cusSub
  const cusSub = {
    "display": "flex",
    "alignItems": "center"
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


  const getTime = () => {
    console.log("get time")
    if (load) {
      var timerOn = true;
      function timer(remaining) {
        var s = remaining % 60;
        s = s < 10 ? '0' + s : s;
        setTime(s)
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
      timer(60);
    }
  }

  //get country
  const getcountry = (key) => {
    setCountryName(key)
    setShowPlus(true)
    setPhone("")
    setIndNumError("")
    setNumAvail("")
    // setInvalid("")
    if (key == 101) {
      setCountryId(key)
    }
    else {
      setCountryId("")
    }

    var arrayState = []
    states.filter((data) => {
      if (data.country_id == key) {
        arrayState.push(data)
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
    states.filter((p) => {
      if (p.id == key) {
        setStateName(p.name)
      }
    });

    var arrayCity = []
    cities.filter((data) => {
      if (data.state_id === key) {
        arrayCity.push(data)
      }
    });
    setCity(arrayCity)
  }


  //eamil onchange
  const emailHandler = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value.length)
    if (e.target.value.length < 1) {
      setWemail("")
    }
  };


  //email validaation with api
  const emailValidation = (key) => {

    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(validRegex)) {
      setWemail("");
      setEmailError(false)
      let formData = new FormData();
      formData.append("email", email);
      formData.append("type", 1);

      axios({
        method: "POST",
        url: `${baseUrl}/customers/validateregistration`,
        data: formData,
      })
        .then(function (response) {
          console.log("resEmail-", response);
          if (response.data.code === 1) {
            setValiemail(response.data.result)
            setInvalid('')
            setEmailError(false)
          } else if (response.data.code === 0) {
            setInvalid(response.data.result)
            setValiemail('')
            setEmailError(true)
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
    else {
      setEmailError(true)
      setWemail("invalid email")
    }

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
    console.log(phone.length)
    if (countryId && phone.length > 10) {
      console.log(phone.length)
      setNumAvail("")
      setNumExist("")
      setIndNumError("Maximum 10 value should be enter")
      setPhoneError(true)
    }
    else if (countryId && phone.length < 10) {
      console.log(phone.length)
      setNumAvail("")
      setNumExist("")
      setIndNumError("Minimum 10 value should be enter")
      setPhoneError(true)
    }
    else if (!countryId && phone.length > 15) {
      setNumAvail("")
      setNumExist("")
      setPhoneError(true)
      setIndNumError("Maximum 15 value should be enter")
    }

    else {
      setPhoneError(false)
      setIndNumError("")
      console.log(countryId)
      let formData = new FormData();
      formData.append("phone", phone);
      formData.append("type", 2);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/validateregistration`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            // setValiphone(response.data.result)
            console.log(response.data.result)
            setPhoneError(false)
            setNumExist('')
            setNumAvail(response.data.result);

          }
          else if (response.data.code === 0) {
            setPhoneError(true)
            console.log(response.data.result)
            setNumAvail('')
            setNumExist(response.data.result)

            console.log("mobile" + setNumExist)
          }

        })
        .catch((error) => {
          // console.log("erroror - ", error);
        });
    }
  }



  //zip oncahnge
  const zipValue = (e) => {
    console.log("zipValue", e.target.value.length)
    if (isNaN(e.target.value)) {

      setZipError("Please enter number only")
      setZipError1(true)
      e.target.value = ""
    }
    else if (e.target.value.length == 0) {
      setZipError1(true)
    }
    else {
      setZipCode(e.target.value)
      setZipError("")
      setZipError1(false)
    }
  }


  // onblur
  const zipVali2 = (e) => {

    if (countryId && zipCode && zipCode.length < 6) {
      setZipError1(true)
      setZipError("Minumum 6 digit should be there")
      console.log(zipCode.length)
    }

    else if (countryId && zipCode && zipCode.length > 6) {
      setZipError1(true)
      setZipError("Maximum 6 digit allowed")
      console.log(zipCode.length)
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



  const onSubmit = (value) => {



    let formData = new FormData();
    formData.append("name", value.p_name);
    formData.append("email", value.p_email);
    formData.append("phone", value.p_phone);
    formData.append("occupation", value.p_profession);
    formData.append("city", value.p_city)
    formData.append("pincode", value.p_zipCode);
    formData.append("password", value.p_password);
    formData.append("rpassword", value.p_confirm_password);
    formData.append("otp", value.p_otp);
    formData.append("country", countryName);
    formData.append("state", stateName);
    formData.append("stdcode", countryCode);

    if (display === true && subm === false) {
      setLoading(true)
      let formData = new FormData();
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("p", "registration");

      axios({
        method: "POST",
        url: `${baseUrl}/customers/forgototp`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            setLoading(false)
            setLoad(true)
            setShow(true)
            Alerts.SuccessNormal("As per your request , OTP has been sent to your email address.")
          } else if (response.data.code === 0) {
            setLoading(false)
            Alerts.ErrorNormal("Error")
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });

    }
    else if (emailError === false && phoneError === false && zipError1 === false && subm === true) {
      axios({
        method: "POST",
        url: `${baseUrl}/customers/signup`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            setLoading(false)
            var variable = "Signup successfully."
            Alerts.SuccessNormal(variable)
            localStorage.setItem("userid", JSON.stringify(response.data.id));
            localStorage.setItem("custEmail", JSON.stringify(response.data.user_id));
            props.history.push("/customer/select-category");
          } else if (response.data.code === 0) {
            setLoading(false)
            console.log("res -", response.data.result);
            setLoad(false);
            Alerts.ErrorNormal("Incorrect OTP , please try again.")
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
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


  return (
    <>
      <Header cust_sign="cust_sign" />
      <div className="container">

        <div className="form">
          <div className="heading">
            <h2>Customer Register</h2>
          </div>
          <>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
                <div className="row">
                  <div className="col-md-6">

                    <div className="mb-3">
                      <label className="form-label">Name<span className="declined">*</span></label>
                      <input
                        type="text"
                        name="p_name"
                        ref={register({ required: true })}
                        placeholder="Enter Name"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_name,
                        })}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Email<span className="declined">*</span></label>
                      <input
                        type="text"
                        name="p_email"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email || emailError === true || wEmail || invalid,
                        })}
                        onChange={(e) => emailHandler(e)}
                        onBlur={emailValidation}
                        placeholder="Enter Your Password"
                        ref={register({ required: true })}
                      />
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
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
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
                      <select
                        id="state"
                        name="p_state"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_state,
                        })}
                        ref={register({ required: true })}
                        onChange={(e) => getCity(e.target.value)}
                      >
                        <option value="">--select--</option>
                        {State.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">City<span className="declined">*</span></label>
                      <select
                        className={classNames("form-control", {
                          "is-invalid": errors.p_city,
                        })}
                        name="p_city"
                        ref={register({ required: true })}
                      >
                        <option value="">--select--</option>
                        {city.map((p, index) => (
                          <option key={index} value={p.city}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Mobile number<span className="declined">*</span></label>
                      <div className="mobNumber" style={{ "display": "flex" }}>
                        <select
                          name="p_code"
                          disabled={true}
                          ref={register({ required: true })}
                        >
                          <option>
                            {showPlus ? "+" + countryCode : null}
                          </option>
                        </select>
                        <input
                          type="text"
                          className={classNames("form-control", {
                            "is-invalid": errors.p_phone || phoneError === true || indNumError,
                          })}
                          name="p_phone"
                          value={phone}

                          ref={register({ required: true })}
                          placeholder="Mobile number"
                          onChange={(e) => phoneHandler(e)}
                          onBlur={phoneValidation}
                        />

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
                    <div className="mb-3">
                      <label className="form-label">Zipcode<span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_zipCode || zipError1 === true || zipError,
                        })}
                        name="p_zipCode"
                        ref={register({ required: true })}
                        placeholder="Enter Zipcode"
                        onChange={(e) => zipValue(e)}
                        onBlur={zipVali2}
                      />
                    </div>
                    <p className="declined">{zipError}</p>
                  </div>

                  <div class="col-md-6">
                    <div className="mb-3">
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
                        className={classNames("form-control", {
                          "is-invalid": errors.p_password || passError,
                        })}
                        name="p_password"
                        placeholder="Enter Your Password"
                        ref={register({
                          required: true,
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                            message:
                              "Password should be of minimum 8 Characters, including at least 1 upper case, lower case, special character and number.",
                          },
                        })}

                        autocomplete="off"
                      />
                      <i
                        className={`fa ${password ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={togglePasssword}
                      />
                      {errors.p_password && (
                        <div className="invalid-feedback">
                          {errors.p_password.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Confirm Password<span className="declined">*</span></label>
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
                            "password doesn 't match",
                        })}
                        autocomplete="off"
                      />
                      <i
                        className={`fa ${repassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={togglePasssword2}
                      />
                      {errors.p_confirm_password && (
                        <div className="invalid-feedback">
                          {errors.p_confirm_password.message}
                        </div>
                      )}
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
                  {
                    loading ?
                      <div class="col-md-12" style={cusSub}>
                        <Spinner color="primary" />
                      </div>
                      :
                      <div class="col-md-6" style={cusSub}>
                        {
                          show ?
                            <div>
                              {
                                disabled ? null
                                  :
                                  <button type="submit" className="btn btn-primary" onClick={() => setOtp()}>Submit</button>
                              }
                            </div>
                            :
                            <button type="submit" class="btn btn-success" onClick={() => getOtp("otp")}>SEND OTP</button>
                        }
                      </div>
                  }
                </div>
              </form>

              {
                disabled ?
                  <ResendOtp setDisabled={setDisabled} getTime={getTime}
                    email={email} phone={phone} setLoad={setLoad} invalid={invalid} indNumError={indNumError}
                    wEmail={wEmail} zipError={zipError} passError={passError}
                    setLoading={setLoading} loading={loading}
                    display={display}
                    emailError={emailError}
                    phoneError={phoneError} zipError1={zipError1} />
                  :
                  null
              }
              <Mandatory />
            </div>
          </>

        </div>

      </div>
      <Footer />
    </>
  );
}

export default SignUp;

// import React, { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import axios from "axios";
// import { baseUrl } from "../../config/config";
// import { useAlert } from "react-alert";
// import classNames from "classnames";
// import { Spinner } from "reactstrap";
// import { professionName, country, states } from './data';
// import { cities } from './city';
// import Alerts from "../../common/Alerts";
// import ResendOtp from "./ResendOtp";
// import Mandatory from "../../components/Common/Mandatory";
// import { ContactsOutlined } from "@material-ui/icons";




// function SignUp(props) {
//   const phone2 = useRef(null)
//   const alert = useAlert();
//   const { handleSubmit, register, errors, getValues } = useForm();
//   const [inputValue, setInputValue] = useState("");

//   const [display, setDisplay] = useState(false);
//   const [otpMsg, setOtpMsg] = useState();
//   const [load, setLoad] = useState(false);
//   const [store, setStore] = useState(0);
//   const [password, setPassword] = useState(false);
//   const [passError, setpassError] = useState()
//   const [repassword, setRepassword] = useState(false);
//   const [show, setShow] = useState(false);
//   const [changeNum, setChangeNum] = useState(false)
//   const [State, setState] = useState([]);
//   const [city, setCity] = useState([]);
//   const [countryCode, setCountryCode] = useState('')
//   const [showPlus, setShowPlus] = useState(false)
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [valiEmail, setValiemail] = useState(null)

//   const [numExist, setNumExist] = useState(null)
//   const [numAvail, setNumAvail] = useState(null)
//   const [countryName, setCountryName] = useState(null)
//   const [stateName, setStateName] = useState(null)

//   const [countryId, setCountryId] = useState(null)
//   const [indNumError, setIndNumError] = useState(null)
//   const [zipCode, setZipCode] = useState('')
//   const [zipError, setZipError] = useState(null)
//   const [passData1, setPassData1] = useState([])
//   const [wEmail, setWemail] = useState();
//   const [time, setTime] = useState('')
//   const [disabled, setDisabled] = useState(false)
//   const [valiOtp, setvaliOtp] = useState()
//   const [loading, setLoading] = useState(false);

//   const [invalid, setInvalid] = useState(null)
//   const [emailRegistred, setEmailRegisterd] = useState(null)


//   //Css
//   const CountryNumStyle = {
//     "display": "flex",
//     "width": "76px",
//     "textAlign": "center"
//   }
//   // cusSub
//   const cusSub = {
//     "display": "flex",
//     "alignItems": "center"
//   }
//   // Toggle Password
//   const togglePasssword = () => {
//     setPassword(!password)
//   };

//   const togglePasssword2 = () => {
//     setRepassword(!repassword)
//   };

//   useEffect(() => {
//     getTime()
//   }, [load]);


//   const getTime = () => {
//     console.log("get time")
//     if (load) {
//       var timerOn = true;
//       function timer(remaining) {
//         var s = remaining % 60;
//         s = s < 10 ? '0' + s : s;
//         setTime(s)
//         remaining -= 1;
//         if (remaining >= 0 && timerOn) {
//           setTimeout(function () {
//             timer(remaining);
//           }, 1000);
//           return;
//         }
//         setDisabled(true)
//       }
//       timer(60);
//     }
//   }


//   //get country
//   const getcountry = (key) => {
//     setCountryName(key)
//     setShowPlus(true)
//     setPhone("")
//     setIndNumError("")
//     setNumAvail("")
//     setInvalid("")
//     if (key == 101) {
//       setCountryId(key)
//     }
//     else {
//       setCountryId("")
//     }

//     var arrayState = []
//     states.filter((data) => {
//       if (data.country_id == key) {
//         arrayState.push(data)
//       }
//     });
//     setState(arrayState)

//     country.filter((data) => {
//       if (key == data.id) {
//         setCountryCode(data.phoneCode)
//         setCountryName(data.name)
//       }
//     })
//   };


//   //get city
//   const getCity = (key) => {
//     states.filter((p) => {
//       if (p.id == key) {
//         setStateName(p.name)
//       }
//     });

//     var arrayCity = []
//     cities.filter((data) => {
//       if (data.state_id === key) {
//         arrayCity.push(data)
//       }
//     });
//     setCity(arrayCity)
//   }


//   //eamil onchange
//   const emailHandler = (e) => {
//     setEmail(e.target.value);
//     console.log(e.target.value.length)
//     if (e.target.value.length < 1) {
//       setWemail("")
//     }
//   };


//   //email validaation with api
//   const emailValidation = (key) => {

//     var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (email.match(validRegex)) {
//       setWemail("");
//       let formData = new FormData();
//       formData.append("email", email);
//       formData.append("type", 1);

//       axios({
//         method: "POST",
//         url: `${baseUrl}/customers/validateregistration`,
//         data: formData,
//       })
//         .then(function (response) {
//           console.log("resEmail-", response);
//           if (response.data.code === 1) {
//             setValiemail(response.data.result)
//             setInvalid('')
//           } else if (response.data.code === 0) {
//             console.log("response.data.result")
//             setInvalid(response.data.result)
//             setValiemail('')
//           }
//         })
//         .catch((error) => {
//           console.log("erroror - ", error);
//         });
//     }
//     else {
//       setWemail("Invalid email")
//     }
//   }


//   //phone onchange
//   const phoneHandler = (e) => {

//     if (isNaN(e.target.value)) {
//       setIndNumError("")
//       setNumAvail("");
//       setNumExist('Please enter number only.')
//       e.target.value = ""
//       setPhone("")
//     }
//     else {
//       setNumAvail("");
//       setNumExist("");
//       setPhone(e.target.value)
//     }
//   };


//   //phone validaation with api
//   const phoneValidation = () => {
//     console.log(phone.length)
//     if (countryId && phone.length > 10) {
//       console.log(phone.length)
//       setNumAvail("")
//       setNumExist("")
//       setIndNumError("Enter 10 digit mobile number.")
//     }
//     else if (countryId && phone.length < 10) {
//       console.log(phone.length)
//       setNumAvail("")
//       setNumExist("")
//       setIndNumError("Enter 10 digit mobile number.")
//     }
//     else if (!countryId && phone.length > 15) {
//       setNumAvail("")
//       setNumExist("")
//       setIndNumError("Maximum 15 value should be enter")
//     }
//     else {
//       setIndNumError("")
//       console.log(countryId)
//       let formData = new FormData();
//       formData.append("phone", phone);
//       formData.append("type", 2);
//       axios({
//         method: "POST",
//         url: `${baseUrl}/customers/validateregistration`,
//         data: formData,
//       })
//         .then(function (response) {
//           console.log("res-", response);
//           if (response.data.code === 1) {
//             // setValiphone(response.data.result)
//             console.log(response.data.result)
//             setNumExist('')
//             setNumAvail(response.data.result);
//           }
//           else if (response.data.code === 0) {
//             console.log(response.data.result)
//             setNumAvail('')
//             setNumExist(response.data.result)
//             console.log("mobile" + setNumExist)
//           }

//         })
//         .catch((error) => {
//           // console.log("erroror - ", error);
//         });
//     }
//   }



//   //zip oncahnge
//   const zipValue = (e) => {
//     if (isNaN(e.target.value)) {
//       setZipError("Please enter number only.")
//       e.target.value = ""
//     }
//     else {
//       setZipCode(e.target.value)
//       setZipError("")
//     }
//   }


//   // onblur
//   const zipVali2 = (e) => {

//     if (countryId && zipCode && zipCode.length < 6) {
//       setZipError("Enter 6 digit zip code")
//       console.log(zipCode.length)
//     }

//     else if (countryId && zipCode && zipCode.length > 6) {
//       setZipError("Enter 6 digit zip code")
//       console.log(zipCode.length)
//     }
//   }



//   const otpVali = (e) => {
//     if (isNaN(e.target.value)) {
//       setvaliOtp("Please enter number only.")
//       e.target.value = ""
//     }
//     else {
//       setvaliOtp("")
//     }
//   }



//   //submit form
//   const onSubmit = (value) => {
//     console.log("value :", value);

//     // setLoading(true)

//     let formData = new FormData();
//     formData.append("name", value.p_name);
//     formData.append("email", value.p_email);
//     formData.append("phone", value.p_phone);
//     formData.append("occupation", value.p_profession);
//     formData.append("city", value.p_city)
//     formData.append("pincode", value.p_zipCode);
//     formData.append("password", value.p_password);
//     formData.append("rpassword", value.p_confirm_password);
//     formData.append("otp", value.p_otp);
//     formData.append("country", countryName);
//     formData.append("state", stateName);
//     formData.append("stdcode", countryCode);

//     if (display) {
//       console.log("display")
//       if (invalid || wEmail || indNumError || zipError || passError) {
//         console.log("call invalid")
//       }
//       else {
//         console.log("call else")
//         let formData = new FormData();
//         formData.append("email", email);
//         formData.append("phone", phone);
//         formData.append("p", "registration");
//         axios({
//           method: "POST",
//           url: `${baseUrl}/customers/forgototp`,
//           data: formData,
//         })
//           .then(function (response) {
//             console.log("res-", response);
//             if (response.data.code === 1) {
//               setLoading(false)
//               setLoad(true)
//               setShow(true)
//               Alerts.SuccessNormal("As per your request , OTP has been sent to your email address.")
//             } else if (response.data.code === 0) {
//               setLoading(false)
//               var err = response.data.message[0]
//               Alerts.ErrorNormal(err)
//             }
//           })
//           .catch((error) => {
//             console.log("erroror - ", error);
//           });
//         return false
//       }
//     }
//     if (invalid || wEmail || indNumError || zipError || passError) {
//       console.log("call invalid")
//     }
//     axios({
//       method: "POST",
//       url: `${baseUrl}/customers/signup`,
//       data: formData,
//     })
//       .then(function (response) {
//         console.log("res-", response);
//         if (response.data.code === 1) {
//           setLoading(false)
//           var variable = "Signed up successfully."
//           Alerts.SuccessNormal(variable)
//           localStorage.setItem("userid", JSON.stringify(response.data.id));
//           localStorage.setItem("custEmail", JSON.stringify(response.data.user_id));
//           props.history.push("/customer/select-category");
//         } else if (response.data.code === 0) {
//           setLoading(false)
//           console.log("res -", response.data.result);
//           Alerts.ErrorNormal("Incorrect OTP, please try again.")
//         }
//       })
//       .catch((error) => {
//         console.log("erroror - ", error);
//       });
//   };


//   //setotp
//   const setOtp = () => {
//     setDisplay(false)
//   }


//   //get OTP
//   const getOtp = () => {
//     setDisplay(true)
//   }


//   return (
//     <>
//       <Header cust_sign="cust_sign" />
//       <div className="container">

//         <div className="form">
//           <div className="heading">
//             <h2>Customer Register</h2>
//           </div>
//           <>
//             <div>
//               <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
//                 <div className="row">
//                   <div className="col-md-6">

//                     <div className="mb-3">
//                       <label className="form-label">Name<span className="declined">*</span></label>
//                       <input
//                         type="text"
//                         name="p_name"
//                         ref={register({ required: true })}
//                         placeholder="Enter Name"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_name,
//                         })}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">Email<span className="declined">*</span></label>
//                       <input
//                         type="text"
//                         name="p_email"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_email || wEmail || invalid,
//                         })}
//                         onChange={(e) => emailHandler(e)}
//                         onBlur={emailValidation}
//                         placeholder="Enter Your Password"
//                         ref={register({ required: true })}
//                       />
//                       {
//                         wEmail ? <p className="declined">{wEmail}</p> : <>
//                           {valiEmail ?
//                             <p className="completed">
//                               {valiEmail}
//                             </p>
//                             :
//                             <p className="declined">{invalid}</p>}
//                         </>
//                       }
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">Occupation/ Profession<span className="declined">*</span></label>
//                       <br />
//                       <select
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_profession,
//                         })}
//                         name="p_profession"
//                         aria-label="Default select example"
//                         ref={register({ required: true })}
//                       >
//                         <option value="">--select--</option>
//                         {professionName.map((p, index) => (
//                           <option key={index} value={p.city}>
//                             {p.city}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>


//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">Country<span className="declined">*</span></label>
//                       <select
//                         id="state"
//                         name="p_country"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_country,
//                         })}
//                         ref={register({ required: true })}
//                         onChange={(e) => getcountry(e.target.value)}
//                       >
//                         <option value="">--select--</option>
//                         {country.map((p) => (
//                           <option key={p.id} value={p.id}>
//                             {p.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>


//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">State<span className="declined">*</span></label>
//                       <select
//                         id="state"
//                         name="p_state"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_state,
//                         })}
//                         ref={register({ required: true })}
//                         onChange={(e) => getCity(e.target.value)}
//                       >
//                         <option value="">--select--</option>
//                         {State.map((p) => (
//                           <option key={p.id} value={p.id}>
//                             {p.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>


//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">City<span className="declined">*</span></label>
//                       <select
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_city,
//                         })}
//                         name="p_city"
//                         ref={register({ required: true })}
//                       >
//                         <option value="">--select--</option>
//                         {city.map((p, index) => (
//                           <option key={index} value={p.city}>
//                             {p.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">Mobile number<span className="declined">*</span></label>
//                       <div className="mobNumber" style={{ "display": "flex" }}>
//                         <select
//                           name="p_code"
//                           disabled={true}
//                           ref={register({ required: true })}
//                         >
//                           <option>
//                             {showPlus ? "+" + countryCode : null}
//                           </option>
//                         </select>
//                         <input
//                           type="text"
//                           className={classNames("form-control", {
//                             "is-invalid": errors.p_phone || indNumError,
//                           })}
//                           name="p_phone"
//                           value={phone}

//                           ref={register({ required: true })}
//                           placeholder="Mobile number"
//                           onChange={(e) => phoneHandler(e)}
//                           onBlur={phoneValidation}
//                         />

//                       </div>
//                       {indNumError ? <p className="declined">{indNumError}</p> : <>
//                         {
//                           numAvail ?
//                             <p className="completed"> {numAvail}
//                             </p>
//                             :
//                             <p className="declined">{numExist}</p>
//                         }
//                       </>}
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">Zipcode<span className="declined">*</span></label>
//                       <input
//                         type="text"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_zipCode || zipError,
//                         })}
//                         name="p_zipCode"
//                         ref={register({ required: true })}
//                         placeholder="Enter Zipcode"
//                         onChange={(e) => zipValue(e)}
//                         onBlur={zipVali2}
//                       />
//                     </div>
//                     <p className="declined">{zipError}</p>
//                   </div>

//                   <div class="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">Password<span className="declined">*</span></label>
//                       <input
//                         type={password ? "text" : "password"}
//                         onCopy={(e) => {
//                           e.preventDefault();
//                           return false
//                         }}
//                         onPaste={(e) => {
//                           e.preventDefault();
//                           return false
//                         }}
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_password || passError,
//                         })}
//                         name="p_password"
//                         placeholder="Enter Your Password"
//                         ref={register({
//                           required: true,
//                           pattern: {
//                             value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
//                             message:
//                               "Password should be of minimum 8 Characters, including at least 1 upper case, lower case, special character and number.",
//                           },
//                         })}
//                       />
//                       <i
//                         className={`fa ${password ? "fa-eye-slash" : "fa-eye"} password-icon`}
//                         onClick={togglePasssword}
//                       />
//                       {errors.p_password && (
//                         <div className="invalid-feedback">
//                           {errors.p_password.message}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div class="col-md-6">
//                     <div className="mb-3">
//                       <label className="form-label">Confirm Password<span className="declined">*</span></label>
//                       <input
//                         type={repassword ? "text" : "password"}
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_confirm_password,
//                         })}
//                         onCopy={(e) => {
//                           e.preventDefault();
//                           return false
//                         }}
//                         onPaste={(e) => {
//                           e.preventDefault();
//                           return false
//                         }}
//                         placeholder="Confirm Password"
//                         name="p_confirm_password"
//                         ref={register({
//                           required: true,
//                           validate: (value) =>
//                             value === getValues("p_password") ||
//                             "Password doesn't match.",
//                         })}
//                       />
//                       <i
//                         className={`fa ${repassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
//                         onClick={togglePasssword2}
//                       />
//                       {errors.p_confirm_password && (
//                         <div className="invalid-feedback">
//                           {errors.p_confirm_password.message}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {
//                     show ?
//                       <div class="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">OTP<span className="declined">*</span></label>
//                           <input
//                             type="text"
//                             className={classNames("form-control", {
//                               "is-invalid": errors.p_otp,
//                             })}
//                             name="p_otp"
//                             ref={register({ required: true })}
//                             onChange={otpVali}
//                             placeholder="Enter your OTP"
//                             autocomplete="off"
//                           />
//                           <p className="declined"> {valiOtp ? valiOtp : ""}</p>
//                           {
//                             disabled ? null
//                               :
//                               <small class="text-center">
//                                 Note: OTP is valid for {time} seconds.
//                               </small>
//                           }
//                         </div>
//                       </div>
//                       : null
//                   }

                  // {
                  //   loading ?
                  //     <div class="col-md-12" style={cusSub}>
                  //       <Spinner color="primary" />
                  //     </div>
                  //     :
//                       <div class="col-md-12">
//                         {
//                           show ?
//                             <div>
//                               {
//                                 disabled ? null
//                                   :
//                                   <div>
//                                     <button type="submit" className="btn btn-primary" onClick={() => setOtp()}>Submit</button>
//                                   </div>
//                               }
//                             </div>
//                             :
//                             <button type="submit" class="btn btn-success" onClick={() => getOtp("otp")}>SEND OTP</button>
//                         }
//                       </div>
//                   }
//                 </div>
//               </form>

//               {
//                 disabled ?
//                   <ResendOtp setDisabled={setDisabled} getTime={getTime}
//                     email={email} phone={phone} setLoad={setLoad} invalid={invalid} indNumError={indNumError}
//                     wEmail={wEmail} zipError={zipError} passError={passError}
//                     setLoading={setLoading} loading={loading} />
//                   :
//                   null
//               }
//               <Mandatory />
//             </div>
//           </>

//         </div>

//       </div>
//       <Footer />
//     </>
//   );
// }

// export default SignUp;

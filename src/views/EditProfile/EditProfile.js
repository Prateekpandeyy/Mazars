import React , {useState, useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {CgProfile} from 'react-icons/cg'
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from 'reactstrap';
import styled from "styled-components";
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { useForm  } from "react-hook-form";
import classNames from "classnames";
import { professionName, states , country} from '../SignUpForm/data';
import {cities} from "../SignUpForm/city"
import Select from 'react-select';
const MyFormValue = styled.div`
  display: flex;
  padding : 0px 15px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const EditProfile = () => {
    const { handleSubmit, register, errors, reset, getValues, control } = useForm();
    const userId = window.localStorage.getItem("userid");
    const clientId = window.localStorage.getItem("clientLoginId")
    const [data, setData] = useState("");
    const [disable, setDisable] = useState(true)
    const [email, setEmail] = useState("")
    // const [country, setCountry] = useState("")
    // const [state, setState] = useState("")
    const [State, setState] = useState([]);
    const [city, setCity] = useState([])
    const [address, setAddress] = useState("")
    const [mobileno, setMobileNo] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [gst, setGst] = useState("")
    const [myCount, setMyCount] = useState(101)
    const [dstate2, setDstate2] = useState()
    const [estate, setEstate] = useState("");
    const [zipError, setZipError] = useState(null)
    const [dstate, setDstate] = useState()
    const [cityState2, setCityValue2] = useState("")
    const [countryName, setCountryName] = useState("India")
    const [phone, setPhone] = useState('');
    const [indNumError, setIndNumError] = useState(null)
    const [numAvail, setNumAvail] = useState(null)
    const [countryId, setCountryId] = useState(null)
    const [countryCode, setCountryCode] = useState('91')
    const [stateName, setStateName] = useState(null)
    const [name, setName] = useState("")
    const [occuptation, setOccuption] = useState("")
    const [numExist, setNumExist] = useState(null)
    const [phoneError, setPhoneError] = useState(null)
    const [stateError, setStateError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [zipError1, setZipError1] = useState(null);
    const [phoneLength, setPhoneLength] = useState(10)
    const token = window.localStorage.getItem("clientToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
      let history = useHistory()
      useEffect(() => {
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
      }, [])
    const getData = () => {
      let sta ;
      let arrayCity = []
      axios
        .get(
          `${baseUrl}/customers/getclientdata`, myConfig
        )
        .then((res) => {
            setData(res.data.result)
       setMobileNo(res.data.result.phone)
       setEmail(res.data.result.email)
       setCountryName(res.data.result.country)
       setCountryCode(res.data.result.stdcode)
      //  setCountry(res.data.result.country)
      //  setState(res.data.result.state);
      setCityValue2(res.data.result.city)
      setDstate2(res.data.result.city)
      //  setCity(res.data.result.city);
       setAddress(res.data.result.address)
       setZipCode(res.data.result.pincode)
       setGst(res.data.result.gstin_no)
       setName(res.data.result.name)
       setOccuption(res.data.result.occupation)
       if(res.data.result.state !== "undefined"){
        setDstate(res.data.result.state)
        setEstate(res.data.result.state)
       }
       var arrayState = []
       let sta = {}
       country.map((i) => {
        
        if(i.name === res.data.result.country){
          
          setMyCount(i.id)
          setCountryCode(i.phoneCode)
          states.filter((data) => {
            if (data.country_id == i.id) {
              sta = {
                "value" : data.id,
                "label" : data.name
              }
              arrayState.push(sta)
            }
          });
        }
       
       
        setState(arrayState)
      })

      states.map((i) => {
       
        if(i.name === res.data.result.state){
          // console.log("iiiiState", i)
          cities.filter((data) => {
            if (data.state_id === i.id) {
             
              sta = {
                "value" : data.id,
                "label" : data.name
              }
              arrayCity.push(sta)
            }
          });
          setCity(arrayCity)
        }
      })
        });
       
       
    };
    useEffect(() => {
        getData()
    }, [])
    const onSubmit = () =>{
        let formData = new FormData();
       
       if(dstate.label === undefined && estate.length < 1){
         Swal.fire({
           title : "error",
           html : "Please fill State",
           icon : "error"
         })

       }
       else   if(dstate2.label === undefined && cityState2.length < 1){
        Swal.fire({
          title : "error",
          html : "Please fill City",
          icon : "error"
        })

      }
       else{
        formData.append("name", name)
        formData.append("occupation", occuptation)
        formData.append("phone", mobileno)
        formData.append("email", email);
       
        formData.append("country", countryName);
      //  formData.append("state", state);
      {estate && estate.length > 0 ?  formData.append("state", estate) :
      formData.append("state", dstate.label)}
      {cityState2 && cityState2.length > 0 ?    formData.append("city", cityState2) :
        formData.append("city", dstate2.label)}
        formData.append("address", address);
        formData.append("stdcode", countryCode)
        formData.append("pincode", zipCode);
        formData.append("gstin_no", gst)
      
        axios({
          method: "POST",
          url: `${baseUrl}/customers/updateclient`,
          headers : {
            uit : token
          },
          data: formData,
        })
        .then((res) => {
           
            if(res.data.code === 1){
              Swal.fire({
                title : "success",
                html : "Profile updated successfully",
                icon : "success"
              })
              history.push("/customer/profile")
            }
            else if (res.data.code === 0){
              Swal.fire({
                title : "error",
                html : "Some thing went wrong",
                icon : "error"
              })
            }
        })
     
       }
      }

      // Get Country
      //get country
  const getcountry = (key) => {
    setMobileNo("")
    
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
  // get state value 
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

  //get city
  const getCity = (key) => {
    // console.log("key", key)
    setCityValue2("")
   setAddress("")
   
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
  const getCity22 = (key) => {
    
    setZipCode("")
    setAddress("")
    if(cityState2.length > 0){
    setCityValue2("")
    }
    setDstate2(key)
  }
  const phoneHandler = (e) => {
    if (isNaN(e)) {
      setIndNumError("")
      setNumAvail("");
      setNumExist('Please enter number only')
    
      setPhone("")
      setPhoneError(true)
    }
    else {
      setPhoneError(false)
      setNumAvail("");
      setNumExist("");
      setMobileNo(e)
    }
  }
 
const checkSpecial = (e) => {
 
  var regEx = /^[0-9a-zA-Z .]+$/;
  if(e.target.value.match(regEx)){
    setName(e.target.value)
  }
  else if(e.target.value.length === 0){
    setName("")
  }
  
 
}
const zipVali2 = (e) => {

  if (countryId && zipCode && zipCode.length < 6) {
    setZipError1(true)
    setZipError("Minumum 6 digit should be there")

  }

  else if (countryId && zipCode && zipCode.length > 6) {
    setZipError1(true)
    setZipError("Maximum 6 digit allowed")
  
  }
  else {
    setZipError1(false)
  }
}

    return (
        <Layout custDashboard="custDashboard" custUserId={userId}>
        <Card style={{margin: "10px"}}>



<CardHeader>
  
<div style={{display : "flex", width : "100%", justifyContent : "space-between", alignItems : "center"}}>
<h4>Edit Profile </h4>

</div>
</CardHeader>
<CardBody>
<div style={{display : "flex"}}>

      <MyFormValue>
        <form onSubmit = {handleSubmit(onSubmit)}> 
    <span className="formContentWrapper">

<div className="row">
<div className="col-md-6">

<div className="mb-3">
  <label className="form-label">User Id</label>
  <input
    type="text"
   

    value={JSON.parse(clientId)}
    disabled
   
    placeholder="Enter Name"
    className="form-control"
  />
</div>
</div>
<div className="col-md-6">

<div className="mb-3">
  <label className="form-label">Name</label>
  <input
    type="text"
    name="p_name"
    value={name}
    maxLength="100"
    onChange={(e) => checkSpecial(e)}
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
                      <label className="form-label">Occupation/ Profession</label>
                      <br />
                      <select
                        className={classNames("form-control", {
                          "is-invalid": errors.p_profession,
                        })}
                        onChange={(e) => setOccuption(e.target.value)}
                        name="p_profession"
                        aria-label="Default select example"
                        ref={register({ required: true })}
                       value={occuptation}
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


  <label className="form-label">Email</label>
  <input
    type="email"
    autoComplete="off"
    disabled
    onChange={(e) => setEmail(e.target.value)}
    name="p_email"
    value={email}
    ref={register()}
    placeholder="Enter Email"
    className={classNames("form-control", {
      "is-invalid": errors.p_email 
    })}
  />
  </div>
  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Country</label>
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
                      <label className="form-label">State</label>
                     
                    <Select
        closeMenuOnSelect={true}
        onSelectResetsInput={false}
        blurInputOnSelect={false}
        options={State}
        inputValue={estate}
        onInputChange={getStateValue}
        onChange={(e) => getCity(e)}
        value={dstate} />
     
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">City</label>
                     
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
<label className="form-label">Address</label>
{/* <input
type="textarea"
 autoComplete="off"
 onChange={(e) => setAddress(e.target.value)}  
 name="p_address"
 value={address}
 maxLength="100"
 ref={register()}
 placeholder="Enter Address"
 className={classNames("form-control", {
  "is-invalid": errors.p_address,
})}
/> */}
<textarea
  maxLength="100"
 name="p_address"
 value={address}
 onChange={(e) => setAddress(e.target.value)} 
    ref={register()}
    placeholder="Enter Address"
  className={classNames("form-control", {
    "is-invalid": errors.p_address 
  })}
  >
    </textarea>

</div>

<div className="col-md-6">
<label className="form-label">Zip Code</label>
<input
  type="text"
  autoComplete="off"
  maxLength="12"
  onChange={(e) => setZipCode(e.target.value)}  
  onBlur={zipVali2}
  name="p_zipCode"
  value={zipCode}
  ref={register({required : true})}
  placeholder="Enter ZipCode"
  className={classNames("form-control", {
    "is-invalid": errors.p_zipCode 
  })}
/>
<p className="declined">{zipError}</p>
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
                            { "+" + countryCode}
                          </option>
                        </select>
                        <input
                        type="text"
                        autoComplete="off"
                        maxLength={phoneLength}
                        onChange={(e) => phoneHandler(e.target.value)}  
                        name="p_mobile"
                        value={mobileno}
                        ref={register({required : true})}
                        placeholder="Enter Mobile Number"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_mobile 
                        })}
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
{/* <div className="col-md-6">
<label className="form-label">Mobile Number</label>
<input
  type="text"
  autoComplete="off"
  onChange={(e) => setMobileNo(e.target.value)}  
  name="p_mobile"
  value={mobileno}
  ref={register({required : true})}
  placeholder="Enter Name"
  className={classNames("form-control", {
    "is-invalid": errors.p_mobile 
  })}
/>
</div> */}
<div className="col-md-6">
<label className="form-label">GST  Number</label>
<input
  type="text"
  maxLength="24"
  autoComplete="off"
  onChange={(e) => setGst(e.target.value)}  
  name="p_gstIn"
  value={gst}
  ref={register()}
  placeholder="Enter Gst Number"
  className={classNames("form-control", {
    "is-invalid": errors.p_gstIn 
  })}
/>
</div>
  </div>
</span>
<button className="profileBtn mt-5">
             Save</button>
             </form>
    </MyFormValue>
      </div>
   
</CardBody>
</Card>
        </Layout>
    )
}
export default EditProfile;
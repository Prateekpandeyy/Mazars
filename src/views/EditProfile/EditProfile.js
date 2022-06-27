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
const MyFormValue = styled.div`
  display: flex;
 
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const EditProfile = () => {
    const { handleSubmit, register, errors, reset, getValues, control } = useForm();
    const userId = window.localStorage.getItem("userid");
    const [data, setData] = useState("");
    const [disable, setDisable] = useState(true)
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [mobileno, setMobileNo] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [gst, setGst] = useState("")
    const token = window.localStorage.getItem("clientToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
      let history = useHistory()
    const getData = () => {
      axios
        .get(
          `${baseUrl}/customers/getclientdata`, myConfig
        )
        .then((res) => {
            setData(res.data.result)
       setMobileNo(res.data.result.phone)
       setEmail(res.data.result.email)
       setCountry(res.data.result.country)
       setState(res.data.result.state);
       setCity(res.data.result.city);
       setAddress(res.data.result.address)
       setZipCode(res.data.result.pincode)
       setGst(res.data.result.gstin_no)
        });
    };
    useEffect(() => {
        getData()
    }, [])
    const sendData = () =>{
        let formData = new FormData();
        formData.append("name", data.name)
        formData.append("phone", mobileno)
        formData.append("email", email);
        formData.append("occupation", data.occupation)
        formData.append("country", country);
       formData.append("state", state);
       formData.append("city", city)
       formData.append("address", address);
      formData.append("stdcode", data.stdcode)
       formData.append("pincode", zipCode);
       formData.append("gstIn_no", gst)
    
        axios({
          method: "POST",
          url: `${baseUrl}/customers/updateclient`,
          headers : {
            uit : token
          },
          data: formData,
        })
        .then((res) => {
            console.log("done")
            if(res.data.code === 1){
              Swal.fire({
                title : "success",
                html : "Profile updated successfully",
                icon : "success"
              })
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
    return (
        <Layout custDashboard="custDashboard" custUserId={userId}>
        <Card style={{margin: "10px"}}>

<CardHeader>
<div style={{display : "flex", width : "100%", justifyContent : "space-between", alignItems : "center"}}>
<div>
     <CgProfile style={{fontSize : "50px"}} />
      <h4>{data.name}</h4>
         </div>
         <h6>TEST123</h6>
         <button className="profileBtn" onClick={() => sendData()}>
             Save</button>

</div>
</CardHeader>
<CardBody>
    <MyFormValue>
    <span className="formContentWrapper">
{/* <h4>Email</h4>
<h4>{email}</h4> */}
<div className="row">
 <div className="col-md-6">


  <label className="form-label">Email</label>
  <input
    type="email"
    autoComplete="off"
    onChange={(e) => setEmail(e.target.value)}
    name="p_email"
    value={email}
    ref={register()}
    placeholder="Enter Name"
    className={classNames("form-control", {
      "is-invalid": errors.p_email 
    })}
  />
  </div>
  <div className="col-md-6">


  <label className="form-label">Country</label>
  <input
    type="email"
    autoComplete="off"
    onChange={(e) => setCountry(e.target.value)}  
    name="p_country"
    value={country}
    ref={register()}
    placeholder="Enter Name"
    className={classNames("form-control", {
      "is-invalid": errors.p_country 
    })}
  />
  </div>
  <div className="col-md-6">


<label className="form-label">State</label>
<input
  type="text"
  autoComplete="off"
  onChange={(e) => setState(e.target.value)}  
  name="p_state"
  value={state}
  ref={register()}
  placeholder="Enter Name"
  className={classNames("form-control", {
    "is-invalid": errors.p_state 
  })}
/>
</div>
<div className="col-md-6">
<label className="form-label">City</label>
<input
  type="text"
  autoComplete="off"
  onChange={(e) => setCity(e.target.value)}  
  name="p_city"
  value={city}
  ref={register()}
  placeholder="Enter Name"
  className={classNames("form-control", {
    "is-invalid": errors.p_city 
  })}
/>
</div>
<div className="col-md-6">
<label className="form-label">Address</label>
<input
  type="text"
  autoComplete="off"
  onChange={(e) => setAddress(e.target.value)}  
  name="p_address"
  value={address}
  ref={register()}
  placeholder="Enter Name"
  className={classNames("form-control", {
    "is-invalid": errors.p_address 
  })}
/>
</div>
<div className="col-md-6">
<label className="form-label">Mobile Number</label>
<input
  type="text"
  autoComplete="off"
  onChange={(e) => setMobileNo(e.target.value)}  
  name="p_mobile"
  value={mobileno}
  ref={register()}
  placeholder="Enter Name"
  className={classNames("form-control", {
    "is-invalid": errors.p_mobile 
  })}
/>
</div>
<div className="col-md-6">
<label className="form-label">Zip Code</label>
<input
  type="text"
  autoComplete="off"
  onChange={(e) => setZipCode(e.target.value)}  
  name="p_zipCode"
  value={zipCode}
  ref={register()}
  placeholder="Enter Name"
  className={classNames("form-control", {
    "is-invalid": errors.p_zipCode 
  })}
/>
</div>
<div className="col-md-6">
<label className="form-label">GST In Number</label>
<input
  type="text"
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

    </MyFormValue>
</CardBody>
</Card>
        </Layout>
    )
}
export default EditProfile;
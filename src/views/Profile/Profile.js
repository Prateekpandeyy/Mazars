import React , {useState, useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {CgProfile} from 'react-icons/cg'
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardBody, CardTitle, CardHeader, Row, Col } from 'reactstrap';
import styled from "styled-components";
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import AddModal from './AddModal';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
 import CloseIcon from '@material-ui/icons/Close';
const MyFormValue = styled.div`
  display: flex;
  max-width: 600px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding : 0px 15px
`;
const Profile = () => {
    const userId = window.localStorage.getItem("userid");
    const clientId = window.localStorage.getItem("clientLoginId")
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
    const [allEmails, setAllEmails] = useState([])
    const [addEmail, setAddEmail] = useState(false)
    const [addedEmail, setAddedEmail] = useState(null)
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
       setAllEmails(res.data.result.optional_email)
       setAddedEmail(res.data.result.optional_email.length)
        });
    };
    useEffect(() => {
        getData()
    }, [])
  const delEmail = (e) => {
    console.log("delEmails", e)
    axios.get(`${baseUrl}/customers/deleteoptionalemail?id=${e}`, myConfig)
    .then((res) => {
      if(res.data.code === 1){
        Swal.fire({
          title : "success",
          html : "Optional Email deleted successfully",
         icon : "success"
        })
       
      }
      else if (res.data.code === 0){
        Swal.fire({
          title : "error",
          html : "Something went wrong, please try again",
         icon : "error"
        })
      }
      getData() 
    })
  }
  const addEmailFun = (e) => {
    if(e !== undefined){
      setAddEmail(!addEmail)
    }
    else{
      setAddEmail(!addEmail)
    }
  }
    return (
        <Layout custDashboard="custDashboard" custUserId={userId}>
        <Card style={{margin: "10px"}}>

<CardHeader>
  
<div style={{display : "flex", width : "100%", justifyContent : "space-between", alignItems : "center"}}>
<h4>Profile </h4>

         {/* <h6>{JSON.parse(clientId)}</h6> */}
         <button className="profileBtn" onClick={() => history.push("/customer/editprofile")}>Edit</button>

</div>
</CardHeader>
<CardBody>
<div style={{display : "flex"}}>
<div>
  
  {/* <CgProfile style={{fontSize : "50px"}} /> */}
  <img src = "https://www.w3schools.com/howto/img_avatar.png" width="100" height = "100" />
   <h4 align="center">{data.name}</h4>
      </div>
    <MyFormValue>
    <span className="formContentWrapper">
<span className="profileInfo">
<h4>User Id</h4>
  </span>
<span className="profileInfo">
<h4>{JSON.parse(clientId)}</h4>
  </span>
</span>
    <span className="formContentWrapper">
    <span className="profileInfo">
<h4>Email</h4>
</span>
<span className="profileInfo">
{
  email !== null ?
  <h4>{email}</h4> :
  <h4>N/A </h4>
}
</span>
</span>
<span className="formContentWrapper">
<span className="profileInfo">
<h4>Country</h4>
</span>
<span className="profileInfo">
{
  country !== null && country !== "null" ?
  <h4>{country}</h4> :
  <h4>N/A </h4>
}
</span>
</span>
<span className="formContentWrapper">
<span className="profileInfo">
<h4>State</h4>
</span>
<span className="profileInfo">
{
  state !== null && state !== "null" ?
  <h4>{state}</h4> :
  <h4>N/A </h4>
}
</span>
</span>
<span className="formContentWrapper">
<span className="profileInfo">
<h4>City</h4>
</span>
<span className="profileInfo">

{
  city !== null && city !== "null" ?
  <h4>{city}</h4> : 
  <h4>N/A </h4>
}
</span>
</span>
<span className="formContentWrapper">
<span className="profileInfo">
<h4>Address</h4>
</span>
<span className="profileInfo">
{
  address !== null && address !== "null" ?
  <h4>{address}</h4> :
  <h4>N/A </h4>
}
</span>
</span>
<span className="formContentWrapper">
<span className="profileInfo">
<h4>Mobile Number</h4>
</span>
<span className="profileInfo">
{
  mobileno !== null && mobileno !== "null" ?
  <h4>{mobileno}</h4> : 
  <h4>N/A </h4>
}
</span>
</span>
<span className="formContentWrapper">
<span className="profileInfo">
<h4>Zip Code</h4>
</span>
<span className="profileInfo">
{
  zipCode !== null && zipCode !== "null"?
  <h4>{zipCode}</h4> : 
  <h4>N/A </h4>
}
</span>
</span>
<span className="formContentWrapper">
<span className="profileInfo">
<h4>GST In Number</h4>
</span>
<span className="profileInfo">
{
  gst !== null && gst !== "null" ?
  <h4>{gst}</h4> : 
  <h4>N/A </h4>
}
</span>
</span>


<span className="formContentWrapper" style={{display : "flex", padding : "10px", flexDirection : "column", width : "100%", border : "1px solid #000"}}>
<fieldset>
   
<span style={{display : "flex", justifyContent : "space-between"}}>
<h4>Optional Email</h4>
{
  allEmails && allEmails.length < 9 ?
  <button
      onClick={(e) => addEmailFun()}
      className="customBtn">Add</button> : ""
}
  </span>
  <span className="profileInfo"> 
 
    </span>
    <span className="profileInfo2">
     
      {
  allEmails.length > 0 ?
   
<div>
{
   allEmails?.map((i, e) => (
    <div className="row" key = {e}
    id={e.email}>
    <div className="col-md-8 mb-2">
    <p>
    {i.email}
    </p>
      </div>
      <div className="col-md-4">
     
     <span onClick={(e) => delEmail(i.id)}>
     <CloseIcon style={{color : "red", fontSize : "24px"}} />
     </span>
     
        </div>
    </div>
   ))
 }
  </div> : ""
}
      </span>
      </fieldset>
</span>

    </MyFormValue>
</div>
</CardBody>
</Card>
{
  addEmail === true ?
  <AddModal
  addEmailFun = {addEmailFun}
  addEmail = {addEmail}
  token = {token}
  addedEmail = {addedEmail}
  getData = {getData} /> 
  : ""
}
        </Layout>
    )
}
export default Profile;
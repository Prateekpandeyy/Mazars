import { makeStyles } from "@material-ui/styles";
import {useState, useEffect} from 'react';
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import {CgProfile} from 'react-icons/cg'
import axios from "axios";
import { baseUrl } from "../../config/config";
import Swal from 'sweetalert2';
const useStyle = makeStyles({
  imgStyle: {
    display: "flex",
    width: "60px",
    height: "60px",
  },
  centerBox: {
    display: "flex",
    justifyContent: "center",
    margin: "15px 0px",
  },
});
const MyContent = styled.div`
  display: flex;
  max-width: 1460px;
  width: 100%;
  max-height: 100vh;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  box-shadow: 0px 2px 16px rgba(61, 61, 61, 0.06);
  border-radius: 10px;
  justify-content: center;
  flex-direction: column;
`;
const MyTitle = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 33px;
  color: #3d3d3d;
`;
const ImgBox = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 0px 20px 30px;
  flex-direction: row;
  justify-content : space-between !important'
 
`;
const MyForm = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const MyLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 33px;
  text-align: center;
  color: #3d3d3d;
`;
const MyInput = styled.input`
  display: flex;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 10px;
  max-width: 760px;
  width: 100%;
  outline: none;
  padding: 5px 10px;
  height: 45px;
`;
const MySmallInput = styled.input`
  display: flex;
  width: 360px;
  height: 45px;
  outline: none;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 5px 10px;
`;
const MyInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const MyButton = styled.button`
  marign: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 45px;
  background: #0364be;
  box-shadow: 0px 2px 16px rgba(61, 61, 61, 0.06);
  border: 1px solid #0364be;
  outline: none;
  border-radius: 6px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #ffffff;
`;
const InActive = styled.div`
  display: flex;
  width: 360px;
  height: 45px;
  align-items: center;
`;
const ActiveLabel = styled.label`
  display: flex;
  margin: 0px 10px;
`;
const Profile = () => {
  const classes = useStyle();
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
    <MyContent>
      <ImgBox style={{justifyContent : "space-between", padding : "10px"}}>
     <div>
     <CgProfile style={{fontSize : "50px"}} />
      <MyTitle>{data.name}</MyTitle>
         </div>
       <div style={{display : "flex", width : "200px", height : "50px" , justifyContent : "space-between", alignItems : "center"}}>
           
           <h6>TEST123</h6>
           </div>
           <button className="profileBtn" onClick={() => setDisable(false)}>Edit</button>
      </ImgBox>
      <MyForm>
        <form>
        <Grid container columnSpacing={2}>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>Email</MyLabel>
                <MySmallInput
                disabled={disable}
                  onChange={(e) => setEmail(e.target.value)}
                  type="textarea"
                 value={email}
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>Country</MyLabel>
                <MySmallInput
                 disabled={disable}  
                   onChange={(e) => setCountry(e.target.value)}  
                  type="tel"
                 value={country}
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>State</MyLabel>
                <MySmallInput
                 disabled={disable}
                 onChange={(e) => setState(e.target.value)}
                  type="textarea"
                  value={state}
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>City</MyLabel>
                <MySmallInput
                    onChange={(e) => setCity(e.target.value)}
                 disabled={disable}
               
                  type="tel"
                value={city}
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item sm={6}>
            <MyInputWrapper>
                <MyLabel>Address</MyLabel>
                <MySmallInput
                 disabled={disable}

                 onChange={(e) => setAddress(e.target.value)}
                  type="tel"
                 value={address}
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
            <Grid item sm={6}>
            <MyInputWrapper>
                <MyLabel>Mobile Number</MyLabel>
                <MySmallInput
                    onChange={(e) => setMobileNo(e.target.value)}
                  type="textarea"
                  disabled={disable}
                  value={mobileno}
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>Zip Code</MyLabel>
                <MySmallInput
                 disabled={disable}
                 onChange={(e) => setZipCode(e.target.value)}
                  type="textarea"
                 value={zipCode}
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
            <Grid item sm={6}>
              <MyInputWrapper>
                <MyLabel>Gst In</MyLabel>
                <MySmallInput
                 disabled={disable}
                 onChange={(e) => setGst(e.target.value)}
                  type="tel"
                 value={gst}
                ></MySmallInput>
              </MyInputWrapper>
            </Grid>
          </Grid>
          <Grid container className={classes.centerBox}>
        {
          disable === false ?
          
          <Grid item={12}>
            <MyButton type="button" onClick={sendData}>Save</MyButton>
          </Grid>
         : ""
        }
        </Grid>
        </form>
      </MyForm>
    </MyContent>
    </Layout>
  );
};
export default Profile;
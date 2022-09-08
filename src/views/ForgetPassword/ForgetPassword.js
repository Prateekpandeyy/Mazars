import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Alerts from "../../common/Alerts";
import Mandatory from "../../components/Common/Mandatory";
import ShowError from "../../components/LoadingTime/LoadingTime";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import { styled , makeStyles} from "@material-ui/styles";
import {Breadcrumbs, Box, Typography } from "@material-ui/core";
import CustomHeading from "../../components/Common/CustomHeading";
import CustomTypography from "../../components/Common/CustomTypography";
import SubHeading from "../../components/Common/SubHeading";
const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required(""),
});

const MyContainer = styled(Box)({
  display : "flex", 
  justifyContent : "center", 
  alignItems : "center", 
  width: "100%",
  flexDirection : "column"
})
function ForgetPassword(props) {


  const alert = useAlert();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("")
useEffect(() => {
  valueHandlerUser()
} , [])
  const onSubmit = (value) => {
   
    setLoading(true)

    let formData = new FormData();
    formData.append("email", value.p_email);
    formData.append("p", "forgot");
    formData.append("user_id", value.p_user);
    axios({
      method: "POST",
      url: `${baseUrl}/customers/forgototp`,
      data: formData,
    })
      .then(function (response) {
       
        if (response.data.code === 1) {
          setLoading(false)
          Alerts.SuccessNormal("As per your request, OTP has been sent to your regsitered email address.")
          // props.history.push(`/customer/new-password/${value.p_email}`)
          props.history.push({
            pathname: `/customer/new-password/${value.p_email}`,
            index : user
          
          })
        } else if (response.data.code === 0) {
          setLoading(false)
       
          Alerts.ErrorNormal("Invalid email.")
        }
      })
      .catch((error) => {
       ShowError.LoadingError(setLoading)
      });
  };

  const valueHandler = () => {
    var item = props.location.email
    if (item == "undefined") {
      
    } else {
      return item
    }
  }
  const valueHandlerUser = () => {
    console.log("props", props)
    var item = props.location.userId
    if (item == "undefined") {
      
    } else {
   
     setUser(item)
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
  return (
    <>

  <OuterloginContainer>
  <Header noSign="cust_sign" />
     <MyContainer>
     <div className="container">
        <div className="form">
          <div className="heading">
           <CustomHeading>
           Forgot Password
            </CustomHeading>
          </div>

         
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="mb-3">


<label className="form-label">User Id<span className="declined">*</span></label>
<input
  type="text"
  onChange={(e) => getUser(e)}
 value={user}
  name="p_user"
  ref={register({ required: true })}
  placeholder="Enter user Id"
  className={classNames("form-control", {
    "is-invalid": errors.p_user 
  })}
 
/>

</div>
                <div className="mb-3">
                  <label className="form-label">Email<span className="declined">*</span></label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_email,
                    })}
                    name="p_email"
                    ref={register}
                    placeholder="Enter email"
                    defaultValue={valueHandler()}
                  />
                  {errors.p_email && (
                    <div className="invalid-feedback">{errors.p_email.message}</div>
                  )}
                </div>
                {
                      loading ?
                        <Spinner color="primary" />
                        :
                        <>
                        <button type="submit" className="customBtn">
                        Get OTP
                      </button>
                       <Link to="/" style={{ "margin": "10px" }}>
                       <button type="button" className="customBtn">
                         Cancel
                       </button>
                     </Link>
                     </>
                    }
                
               
              </form>
          
          <Mandatory />
        </div>

      </div>

    
     </MyContainer>
     <Footer />
  </OuterloginContainer>
    </>
  );
}

export default ForgetPassword;





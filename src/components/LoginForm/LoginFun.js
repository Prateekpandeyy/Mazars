import React from 'react';
import { useState, createContext } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { useHistory } from 'react-router';
import { useAlert } from "react-alert";
import Login from '../../pages/Admin/Login/Login';
import Alerts from '../../common/Alerts';
import LoginForm from './LoginForm';
const LoginData = createContext();
const LoginFun = () => {
  const alert = useAlert();
  let history = useHistory();
    const [email, setEmail] = useState(null);
    const [show, setShow] = useState(false);
    const [uid, setUid] = useState('')
    const [isPasswordShow, setPasswordShow] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const togglePasssword = () => {
      setPasswordShow(!isPasswordShow)
    };
  
    const onSubmit = (value) => {
    
      setLoading(true)
  
      let formData = new FormData();
      formData.append("userid", value.p_email);
      formData.append("password", value.password);
  
      axios({
        method: "POST",
        url: `${baseUrl}/admin/login`,
        data: formData,
      })
        .then(function (response) {
  
          if (response.data.code === 1) {
            setLoading(false)
            setShow(true)
            Alerts.SuccessNormal("As per your request, OTP has been sent to your registered email address.")
            setUid(response.data["user id"])
            logout();
          } else if (response.data.code === 0) {
            setLoading(false)
            Alerts.ErrorNormal("Invalid email or password.")
          }
        })
        .catch((error) => {
        
        });
    };
  const logout = () => {
    setTimeout(() => {
      localStorage.removeItem("adminkey");
      localStorage.removeItem("adminEmail");
      history.push("/admin/login");
    }, 600000)
  }
    const handleChange = (e) => {
  
      setEmail(e.target.value);
    };
   
  const valData = { handleChange, onSubmit, togglePasssword, isPasswordShow, email, show, uid, loading, setLoading}
  return(
      <>
      <LoginData.Provider value={valData}>
          <Login />
          
      </LoginData.Provider>
      </>
  )
}
export default LoginFun;
export {LoginData}
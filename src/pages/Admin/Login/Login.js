import React, { useContext } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import VerifyOtpLogin from "./VerifyOtpLogin";
import LoginFun, { LoginData } from "../../../components/LoginForm/LoginFun";
import LoginForm from "../../../components/LoginForm/LoginForm";



function Login(props) {
  const data3 = useContext(LoginData)
  
 
  return (
    <>
      <Header admin="admin" />

      <div class="container">

        {
          data3.show ? <div>
            <VerifyOtpLogin email={data3.email} uid={data3.uid}
              loading={data3.loading}
              setLoading={data3.setLoading} />
          </div>
            :
           <LoginForm />        }

      </div>
      <Footer />
    </>
  );
}

export default Login;

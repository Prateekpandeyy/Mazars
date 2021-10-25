import React from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "reactstrap";
import Mandatory from "../Common/Mandatory";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import { useContext } from "react";
import { LoginData } from "./LoginFun";
import { Link } from "react-router-dom";
const LoginForm = (props) => {
    const data3 = useContext(LoginData)
    const Schema = yup.object().shape({
        p_email: yup.string().email("invalid email").required(""),
        password: yup
          .string()
          .required("")
         
      });
      
   
    const { handleSubmit, register, reset, errors } = useForm({
        resolver: yupResolver(Schema),
      });
 
return(
    <div class="form">
    <div class="heading">
      <h2>ADMIN LOGIN</h2>
    </div>
    <form onSubmit={handleSubmit(data3.onSubmit)} autoComplete="off">
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Email<span className="declined">*</span></label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": errors.p_email,
              })}
              name="p_email"
              ref={register}
              placeholder="Enter Email"
              autocomplete="off"
              onChange={(e) => data3.handleChange(e)}
            />
            {errors.p_email && (
              <div className="invalid-feedback">
                {errors.p_email.message}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label">Password<span className="declined">*</span></label>
            <input
              type={data3.isPasswordShow ? "text" : "password"}
              className={classNames("form-control", {
                "is-invalid": errors.password,
              })}
              name="password"
              placeholder="Enter Password"
              ref={register}
            />
            <i
              className={`fa ${data3.isPasswordShow ? "fa-eye-slash" : "fa-eye"} password-icon`}
              onClick={data3.togglePasssword}
            />
            {errors.password && (
              <div className="invalid-feedback">
                {errors.password.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {
        data3.loading ?
          <div class="col-md-12">
            <Spinner color="primary" />
          </div>
          :
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
      }

      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Link
          to={{
            pathname: "/admin/forget-password",
            email: `${data3.email}`,
          }}
        >
          Forgot Password
        </Link>
      </div>

      <Mandatory />
    </form>
  </div>

)
}
export default LoginForm;
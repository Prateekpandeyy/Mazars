import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import Alerts from "../../common/Alerts";
import { Spinner } from "reactstrap";
import ShowError from "../../components/LoadingTime/LoadingTime";
const Schema = yup.object().shape({
  p_otp: yup.string().required("mandatory"),
});

function VerifyOTP({
  email,

  time,
  setLoad,
  setDisabled,
  disabled,
  loading,
  setLoading,
  user,
  password,
}) {
  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });

  const history = useHistory();
  const [setText, noSetText] = useState();
  function getCategory() {
    axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
      if (res.data.code === 1) {
        let data = res.data.result;
        data.map((i) => {
          getSubCategory(i);
        });
        localStorage.setItem("categoryData", JSON.stringify(data));
      }
    });
  }

  const getSubCategory = (e) => {
    axios.get(`${baseUrl}/customers/getCategory?pid=${e.id}`).then((res) => {
      if (res.data.code === 1) {
        localStorage.setItem(`${e.details}`, JSON.stringify(res.data.result));
      }
    });
  };
  const validOtp = (e) => {
    if (isNaN(e.target.value)) {
      e.target.value = "";
      noSetText("Please enter number only.");
    } else {
      noSetText("");
    }
  };

  const onSubmit = (value) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("email", email);
    formData.append("otp", value.p_otp);
    formData.append("user_id", user);
    axios({
      method: "POST",
      url: `${baseUrl}/customers/verifyloginotp`,
      data: formData,
    })
      .then(function (response) {
        if (response.data.code == 1) {
          async function loginSuccess() {
            let categoryData = await getCategory();

            var timeStampInMs = Date.now();
            localStorage.setItem("loginTime", timeStampInMs);
            setLoading(false);
            localStorage.removeItem("myData");
            Alerts.SuccessLogin("Login successfully.");
            localStorage.setItem(
              "isMail",
              JSON.stringify(response.data.is_mail)
            );
            localStorage.setItem(
              "clientLoginId",
              JSON.stringify(response.data.loginuid)
            );
            localStorage.setItem(
              "userid",
              JSON.stringify(response.data.user_id)
            );
            sessionStorage.setItem(
              "userIdsession",
              JSON.stringify(response.data.user_id)
            );
            localStorage.setItem(
              "custEmail",
              JSON.stringify(response.data.name)
            );
            localStorage.setItem("custName", response.data.dispalyname);
            history.push("customer/dashboard");
            localStorage.setItem("clientToken", response.data.token);
          }

          loginSuccess();
        } else {
          Alerts.ErrorNormal("Incorrect OTP");
          setLoading(false);
          reset();
        }
      })
      .catch((error) => {
        ShowError.LoadingError(setLoading);
      });
  };

  const resendOtp = () => {
    setLoading(true);
    noSetText(" ");
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("user_id", user);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/regenrateotp`,
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          setLoading(false);
          Alerts.SuccessNormal(
            "An OTP has been sent to your registered mobile number / email address."
          );
          setLoad(true);
          setDisabled(false);
        } else if (response.data.code === 0) {
          setLoading(false);
          Alerts.ErrorNormal("Some thing went wrong, please try again");
        }
      })
      .catch((error) => {
        ShowError.LoadingError(setLoading);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="signInForm"
        autoComplete="off"
      >
        {disabled ? null : (
          <>
            <div className="form-group passForm">
              <label className="labelColor">
                Enter Your OTP <span className="declined">*</span>
              </label>
              <input
                type="number"
                className={classNames("form-control", {
                  "is-invalid": errors.p_otp,
                })}
                name="p_otp"
                ref={register({ required: true })}
                placeholder="Enter your OTP"
                onChange={(e) => validOtp(e)}
              />
              <p className="declinedmsg">{setText ? setText : ""}</p>
            </div>
            <small className="labelColor">
              Note: OTP is valid for {time} seconds.
            </small>
          </>
        )}

        {loading ? (
          <Spinner color="primary" />
        ) : (
          <div className="form-group">
            {disabled ? (
              <button type="submit" class="btnWhite" onClick={resendOtp}>
                SEND OTP
              </button>
            ) : (
              <button type="submit" className="btnWhite my-4">
                Login
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default VerifyOTP;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import Alerts from "../../../common/Alerts";
import Mandatory from "../../../components/Common/Mandatory";
import { Spinner } from "reactstrap";
import LoadingTime from "../../../components/LoadingTime/LoadingTime";

const Schema = yup.object().shape({
  p_otp: yup.string().required(""),
});

function VerifyOtp({ email, uid, loading, setLoading, password }) {
  const role = localStorage.getItem("role");

  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });
  const history = useHistory();
  const [time, setTime] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [num, changeNum] = useState(false);

  useEffect(() => {
    LoadingTime.timer2(setTime, setDisabled);
  }, [num]);

  useEffect(() => {
    getCategory();
    LoadingTime.timer2(setTime, setDisabled);
  }, []);
  function getCategory() {
    axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
      if (res.data.code === 1) {
        let data = res.data.result;
        data.map((i) => {
          getSubCategory(i);
        });
        localStorage.setItem("admincategoryData", JSON.stringify(data));
      }
    });
  }

  const getSubCategory = (e) => {
    axios.get(`${baseUrl}/customers/getCategory?pid=${e.id}`).then((res) => {
      if (res.data.code === 1) {
        localStorage.setItem(
          `admin${e.details}`,
          JSON.stringify(res.data.result)
        );
      }
    });
  };
  const validOtp = (e) => {
    if (isNaN(e.target.value)) {
      Alerts.ErrorNormal("Please enter number only");
    }
  };

  const onSubmit = (value) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("email", email);
    formData.append("otp", value.p_otp);

    axios({
      method: "POST",
      url: `${baseUrl}/admin/verifyloginotp`,
      data: formData,
    })
      .then(function (response) {
        if (response.data.code == 1) {
          var timeStampInMs = Date.now();
          localStorage.setItem("adminloginTime", timeStampInMs);
          setLoading(false);
          Alerts.SuccessLogin("Logged in successfully.");
          localStorage.setItem(
            "adminkey",
            JSON.stringify(response.data["user id"])
          );
          sessionStorage.setItem(
            "adminIdsession",
            JSON.stringify(response.data["user id"])
          );
          localStorage.setItem(
            "adminEmail",
            JSON.stringify(response.data.name)
          );
          localStorage.setItem(
            "admin_record_per_page",
            response.data.record_per_page
          );

          localStorage.setItem("adminToken", response.data.token);

          history.push("/admin/dashboard");
        } else {
          Alerts.ErrorNormal("Incorrect OTP, please try again.");
          setLoading(false);
          reset();
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          html: "Please try again Later",
          icon: "error",
        });
      });
  };

  const resendOtp = () => {
    setLoading(true);
    changeNum(!num);
    let formData = new FormData();
    formData.append("userid", email);
    formData.append("password", password);

    axios({
      method: "POST",
      url: `${baseUrl}/admin/login`,
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          setLoading(false);
          Alerts.SuccessNormal(
            "As per your request, OTP has been sent to your registered mobile number / email address."
          );
          setDisabled(false);
        } else if (response.data.code === 0) {
          setLoading(false);
          Alerts.ErrorNormal("Some thing went wrong, please try again");
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="container">
        <div className="otp">
          <div className="heading text-center">
            <h2>Verify your OTP</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            {disabled ? null : (
              <div className="form-group">
                <label className="form-label">
                  Enter OTP <span className="declined">*</span>
                </label>
                <input
                  type="number"
                  className={classNames("form-control", {
                    "is-invalid": errors.p_otp,
                  })}
                  id="otp"
                  placeholder="Enter Your OTP Here"
                  ref={register}
                  name="p_otp"
                  autocomplete="off"
                  onChange={(e) => validOtp(e)}
                />
                {errors.p_otp && (
                  <div className="invalid-feedback">{errors.p_otp.message}</div>
                )}
                <small className="text-center">
                  Note: OTP is valid for {time} seconds.
                </small>
                <Mandatory />
              </div>
            )}

            {loading ? (
              <Spinner color="primary" />
            ) : (
              <div className="text-center">
                {disabled ? (
                  <button
                    type="submit"
                    className="autoWidthBtn"
                    onClick={resendOtp}
                  >
                    SEND OTP
                  </button>
                ) : (
                  <button type="submit" className="autoWidthBtn">
                    VERIFY OTP
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default VerifyOtp;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import Alerts from "../../../common/Alerts";
import Mandatory from "../../../components/Common/Mandatory";
import { Spinner } from "reactstrap";
import LoadingTime from "../../../components/LoadingTime/LoadingTime";
import Cookies from "js-cookie";
import CustomHeading from "../../../components/Common/CustomHeading";
import CustomFlex from "../../../components/Common/CustomFlex";
const Schema = yup.object().shape({
  p_otp: yup.string().required(""),
});

function VerifyOtp({ email, uid, loading, setLoading, password }) {
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
        localStorage.setItem("tpcategoryData", JSON.stringify(data));
      }
    });
  }

  const getSubCategory = (e) => {
    axios.get(`${baseUrl}/customers/getCategory?pid=${e.id}`).then((res) => {
      if (res.data.code === 1) {
        localStorage.setItem(`tp${e.details}`, JSON.stringify(res.data.result));
      }
    });
  };
  const validOtp = (e) => {
    if (isNaN(e.target.value)) {
      Alerts.ErrorNormal("Please enter number only");
    }
  };

  // function getCategory() {
  //   axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
  //     if (res.data.code === 1) {
  //       let data = res.data.result;
  //       console.log(res.data.result,"in getCategory");
  //       data.map((i) => {
  //         getSubCategory(i);
  //       });
  //       localStorage.setItem("categoryData", JSON.stringify(data));
  //     }
  //   });
  // }

  // const getSubCategory = (e) => {
  //   axios.get(`${baseUrl}/customers/getCategory?pid=${e.id}`).then((res) => {
  //     if (res.data.code === 1) {
  //       console.log(`${e.details}`,"in getSubCategory");
  //       console.log(res.data.result,"get subCategory second");
  //       let obj=res.data.result
  //       localStorage.setItem(`${e.details}`, JSON.stringify(obj));
  //     }
  //   });
  // };

  const onSubmit = (value) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("email", email);
    formData.append("otp", value.p_otp);

    axios({
      method: "POST",
      url: `${baseUrl}/tp/verifyloginotp`,
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          let categoryData = getCategory();
          getCategory();
          setLoading(false);
          Cookies.set("tpName", response.data.displayname);
          Alerts.SuccessLogin("Logged in successfully.");
          localStorage.setItem("tpkey", JSON.stringify(response.data.user_id));
          localStorage.setItem(
            "tpEmail",
            JSON.stringify(response.data.displayname)
          );
          localStorage.setItem(
            "tp_record_per_page",
            response.data.record_per_page
          );
          localStorage.setItem("tptoken", response.data.token);
          var timeStampInMs = Date.now();
          localStorage.setItem("tploginTime", timeStampInMs);
          sessionStorage.setItem(
            "sessionTpid",
            JSON.stringify(response.data["user id"])
          );
          localStorage.setItem("fixedCat", response.data.tp_category);
          localStorage.setItem("pcat_id", response.data.pcat_id);
          history.push("/taxprofessional/dashboard");
        } else {
          Alerts.ErrorNormal("Incorrect OTP, please try again.");
          setLoading(false);
          reset();
        }
      })
      .catch((error) => {});
  };

  const resendOtp = () => {
    setLoading(true);
    changeNum(true);
    let formData = new FormData();
    formData.append("id", email);
    formData.append("password", password);
    axios({
      method: "POST",
      url: `${baseUrl}/tp/login`,
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
          <CustomHeading>Verify your OTP</CustomHeading>
          <form onSubmit={handleSubmit(onSubmit)}>
            {disabled ? null : (
              <div class="form-group">
                <label className="form-label">
                  Enter OTP <span className="declined">*</span>
                </label>
                <input
                  type="number"
                  className={classNames("form-control", {
                    "is-invalid": errors.p_otp,
                  })}
                  placeholder="Enter Your OTP Here"
                  ref={register}
                  name="p_otp"
                  autoComplete="off"
                  onChange={(e) => validOtp(e)}
                />
                {errors.p_otp && (
                  <div className="invalid-feedback">{errors.p_otp.message}</div>
                )}
                <small className="text-center">
                  Note: OTP is valid for {time} seconds.
                </small>
                <CustomFlex>
                  <Mandatory />
                </CustomFlex>
              </div>
            )}

            {loading ? (
              <Spinner color="primary" />
            ) : (
              <div class="text-center">
                {disabled ? (
                  <button
                    type="submit"
                    class="autoWidthBtn"
                    onClick={resendOtp}
                  >
                    SEND OTP
                  </button>
                ) : (
                  <button type="submit" class="autoWidthBtn">
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

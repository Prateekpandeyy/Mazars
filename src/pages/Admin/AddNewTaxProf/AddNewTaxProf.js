import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import Mandatory from "../../../components/Common/Mandatory";
import { Spinner } from "reactstrap";
import EmailValidation from "../../../components/Common/EmailValidation";
import CustomHeading from "../../../components/Common/CustomHeading";
import { validEmail } from "../../../components/Common/commonFunction/EmailValidation";
const Schema = yup.object().shape({
  p_name: yup.string().required("required name"),
  // p_email: yup.string().email("invalid email").required("required email"),
  p_phone: yup
    .string()
    .required("required phone no")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(20, "max 20 digits"),
});

function AddNew() {
  const history = useHistory();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const userid = window.localStorage.getItem("adminkey");
  const [error, setError] = useState();
  const [error2, setError2] = useState();
  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [nn, setNn] = useState([]);
  const [mcatname, setmcatname] = useState([]);
  const [mcategory, setmcategory] = useState([]);
  const [store, setStore] = useState([]);
  const [subData, subCategeryData] = useState([]);
  const [custCate, setCustcate] = useState([]);
  const [custCate2, setCustcate2] = useState([]);
  const [numExist, setNumExist] = useState(null);
  const [phone, setPhone] = useState("");
  const [numAvail, setNumAvail] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [indNumError, setIndNumError] = useState(null);
  const [postValue, setPostName] = useState([]);
  const [email, setEmail] = useState("");
  const [valiEmail, setValiemail] = useState(null);
  const [invalid, setInvalid] = useState(null);
  const [wEmail, setWemail] = useState();
  const [display, setDisplay] = useState(false);
  const [teamleader, setTeamLeader] = useState([]);
  const [tl, setTl] = useState([]);
  const [post1, setPost1] = useState([]);
  const [post_na, setPost_na] = useState();
  const [tpEmail, setTpEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [email2, setEmail2] = useState([]);
  const [personalEmailError, setPersonalEmailError] = useState("");
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const [posError, setposError] = useState({
    available: "",
    exits: "",
  });
  var kk = [];
  var vv = [];
  var post_name;
  const options = tax.map((d) => ({
    value: d.id,
    label: d.details,
  }));

  const options2 = tax2.map((v) => ({
    value: v.id,
    label: v.details,
  }));

  const teamleader1 = teamleader.map((v) => ({
    value: v.id,
    label: v.name,
  }));
  useEffect(() => {
    const getTeamLeader = () => {
      axios.get(`${baseUrl}/admin/getTeamLeader`, myConfig).then((res) => {
        if (res.data.code === 1) {
          setTeamLeader(res.data.result);
        }
      });
    };
    getTeamLeader();
  }, []);

  useEffect(() => {
    const getCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        if (res.data.code === 1) {
          setTax(res.data.result);
        }
      });
    };

    getCategory();
  }, []);

  useEffect(() => {
    const getSubCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {
        if (res.data.code === 1) {
          setTax2(res.data.result);
        }
      });
    };
    getSubCategory();
  }, [store]);

  // OnSubmit Function
  const onSubmit = (value) => {
    var categeryList = [];
    var categeryName = [];
    var categeryName = [];
    var kk = [];

    var parentCategoryName = [];
    subData.map((i) => {
      categeryList.push(i.value);
      categeryName.push(i.label);
    });

    if (custCate.length < 1) {
      setError("Please select at least one value");
    } else if (subData.length < 1) {
      setError2("Please select at least one value");
    } else if (invalid || wEmail || indNumError) {
      setDisplay(false);
    } else if (personalEmailError.length > 0) {
      return false;
    } else {
      setLoading(true);

      let formData = new FormData();
      formData.append("personal_email", value.personal_email);
      formData.append("name", value.p_name);
      formData.append("phone", value.p_phone);
      formData.append("tp_id", tl);
      formData.append("email", email2);
      formData.append("post_name", value.post_name);
      formData.append("pcat_id", mcategory);
      formData.append("cat_id", categeryList);
      formData.append("allpcat_id", categoryData.label);
      formData.append("allcat_id", categeryName);
      formData.append("type", "tp");
      formData.append("tlpost", post_na);

      axios({
        method: "POST",
        url: `${baseUrl}/admin/AddTaxProfessional`,
        headers: {
          uit: token,
        },
        data: formData,
      })
        .then(function (response) {
          if (response.data.code === 1) {
            setLoading(false);

            Swal.fire({
              title: "success",
              html: "Tax Professional created successfully",
              icon: "success",
            });

            history.goBack();
          } else if (response.data.code === 0) {
            setLoading(false);
            response.data.message.map((i) => {
              Swal.fire({
                title: "Error",
                html: "Something went wrong, please try again.",
                icon: "error",
              });
            });
            history.goBack();
          }
        })
        .catch((error) => {});
    }
  };

  // Sub Category Function
  const subCategory = (e) => {
    subCategeryData(e);
    setCustcate2(e);
    setError2("");
  };

  // Category Function
  const category = (v) => {
    setCategoryData(v);
    setNn((oldData) => {
      return [...oldData, mcategory];
    });
    setError("");
    setCustcate(v);
    setStore(v.value);
    vv.push(v.value);
    setmcategory(v.value);
    setmcatname((oldData) => {
      return [...oldData, v.label];
    });

    if (vv.length > 0) {
      if (vv.includes("1") && vv.includes("2")) {
      } else if (vv.includes("1")) {
        for (let i = 0; i < subData.length; i++) {
          if (subData[i].value < 9) {
            kk.push(subData[i]);
          }
        }
        subCategeryData(kk);
      } else if (vv.includes("2")) {
        for (let i = 0; i < subData.length; i++) {
          if (subData[i].value > 8) {
            kk.push(subData[i]);
          }
        }
        subCategeryData(kk);
      }
    } else if (vv.length === 0) {
      subCategeryData("");
    }
  };
  // Phone onChange
  const phoneHandler = (e) => {
    if (isNaN(e.target.value)) {
      setIndNumError("");
      setNumAvail("");
      setNumExist("Please enter number only");
      e.target.value = "";
      setPhone("");
    } else {
      setNumAvail("");
      setNumExist("");
      setPhone(e.target.value);
    }
  };

  // Phone Validation function
  const phoneValidation = () => {
    if (phone.length > 10) {
      setNumAvail("");
      setNumExist("");
      setIndNumError("Maximum 10 digits can be entered");
    } else if (phone.length < 10) {
      setNumAvail("");
      setNumExist("");
      setIndNumError("Minimum 10 digit should be enter");
    } else if (phone.length > 15) {
      setNumAvail("");
      setNumExist("");
      setIndNumError("Maximum 15 digit should be enter");
    } else {
      setIndNumError("");
    }
  };

  // Tl Function
  const tlFun = (e) => {
    var a;

    teamleader.filter((p) => {
      if (p.id == e) {
        setTpEmail(p.email);
        setTl(p.id);
        setPost_na(p.post_name);
        a = p.post_name;
      }
    });
  };

  const checktlPost = (e) => {
    setPostName(e.target.value);
    let a = e.target.value;
    let formData = new FormData();
    formData.append("tlpost", a);

    axios({
      method: "POST",
      url: `${baseUrl}/admin/validateTLPost`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then(function (res) {
      if (res.data.code === 1) {
        setposError({
          available: "Post available",
        });
      } else {
        setposError({
          exits: "Post already exits",
        });
      }
    });
  };
  const checkPersonalEmail = (e) => {
    let check = validEmail(e);

    if (check === true) {
      setPersonalEmailError("");
    } else {
      setPersonalEmailError("Please enter valid email");
    }
  };
  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button className="autoWidthBtn" onClick={() => history.goBack()}>
                Go Back
              </button>
            </Col>
            <Col md="8">
              <CustomHeading>Add new tax professional</CustomHeading>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <div className="row mt-3">
            <div className="col-lg-2 col-xl-2 col-md-12"></div>
            <div className="col-lg-8 col-xl-8 col-md-12">
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Team leader post name{" "}
                        <span className="declined">*</span>
                      </label>

                      <select
                        name="p_teamleader"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_teamleader,
                        })}
                        onChange={(e) => tlFun(e.target.value)}
                        ref={register}
                      >
                        <option value="">--select--</option>
                        {teamleader.map((p) => (
                          <option key={p.Id} value={p.id}>
                            {p.post_name}
                          </option>
                        ))}
                      </select>
                      {errors.p_teamleader && (
                        <div className="invalid-feedback">
                          {errors.p_teamleader.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Team leader post email{" "}
                        <span className="declined">*</span>
                      </label>
                      <input
                        type="email"
                        name="post_email"
                        className={classNames("form-control", {
                          "is-invalid": errors.post_email,
                        })}
                        disabled
                        defaultValue={tpEmail}
                        ref={register}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        TP post name <span className="declined">*</span>
                      </label>
                      <input
                        type="text"
                        name="post_name"
                        onBlur={(e) => checktlPost(e)}
                        className={classNames("form-control", {
                          "is-invalid": errors.post_name,
                        })}
                        ref={register}
                      />
                      {posError.available ? (
                        <p className="completed"> {posError.available}</p>
                      ) : (
                        <p className="declined">{posError.exits}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        TP post email <span className="declined">*</span>
                      </label>

                      <EmailValidation
                        setWemail={setWemail}
                        wEmail={wEmail}
                        invalid={invalid}
                        setEmailError={setEmailError}
                        setValiemail={setValiemail}
                        emailError={emailError}
                        setInvalid={setInvalid}
                        setEmail2={setEmail2}
                        name="taxprofessional"
                      />
                      {wEmail ? (
                        <p className="declined">{wEmail}</p>
                      ) : (
                        <>
                          {valiEmail ? (
                            <p className="completed">{valiEmail}</p>
                          ) : (
                            <p className="declined">{invalid}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Category <span className="declined">*</span>
                      </label>
                      <Select
                        options={options}
                        className={error ? "customError" : ""}
                        styles={{
                          option: (styles, { data }) => {
                            return {
                              ...styles,
                              color: data.value == 2 ? "green" : "blue",
                            };
                          },
                          multiValueLabel: (styles, { data }) => ({
                            ...styles,
                            color: data.value == 2 ? "green" : "blue",
                          }),
                        }}
                        onChange={category}
                      ></Select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Sub category <span className="declined">*</span>
                      </label>
                      <Select
                        isMulti
                        options={options2}
                        className={error2 ? "customError" : ""}
                        onChange={subCategory}
                        styles={{
                          option: (styles, { data }) => {
                            return {
                              ...styles,
                              color: data.value > 8 ? "green" : "blue",
                            };
                          },
                          multiValueLabel: (styles, { data }) => ({
                            ...styles,
                            color: data.value > 8 ? "green" : "blue",
                          }),
                        }}
                        value={subData}
                      ></Select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Phone number <span className="declined">*</span>
                      </label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_phone,
                        })}
                        name="p_phone"
                        ref={register}
                        onChange={(e) => phoneHandler(e)}
                        onBlur={phoneValidation}
                      />
                      {indNumError ? (
                        <p className="declined">{indNumError}</p>
                      ) : (
                        <>
                          {numAvail ? (
                            <p className="completed"> {numAvail}</p>
                          ) : (
                            <p className="declined">{numExist}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        Name <span className="declined">*</span>
                      </label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_name,
                        })}
                        name="p_name"
                        ref={register}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        Email <span className="declined">*</span>
                      </label>
                      <input
                        type="text"
                        name="personal_email"
                        ref={register}
                        onChange={(e) => setPersonalEmailError("")}
                        onBlur={(e) => checkPersonalEmail(e.target.value)}
                        className={classNames("form-control", {
                          "is-invalid":
                            errors.personal_email ||
                            personalEmailError.length > 0,
                        })}
                      />
                      {personalEmailError.length > 0 ? (
                        <p className="declined">{personalEmailError} </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                {loading ? (
                  <Spinner color="primary" />
                ) : (
                  <button type="submit" className="customBtn">
                    Submit
                  </button>
                )}
              </form>
            </div>
            <div className="col-lg-2 col-xl-2 col-md-12"></div>

            <Mandatory />
          </div>
        </CardHeader>
      </Card>
    </Layout>
  );
}
export default AddNew;

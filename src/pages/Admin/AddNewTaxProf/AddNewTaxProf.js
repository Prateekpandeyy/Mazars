import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import Swal from 'sweetalert2';
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { Card, CardHeader } from "reactstrap";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import Mandatory from "../../../components/Common/Mandatory";
import { Spinner } from "reactstrap";

const Schema = yup.object().shape({
  p_name: yup.string().required("required name"),
  p_email: yup.string().email("invalid email").required("required email"),
  p_phone: yup
    .string()
    .required("required phone no")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(20, "max 20 digits"),

});


function AddNew() {
  const alert = useAlert();
  const history = useHistory();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const userid = window.localStorage.getItem("adminkey");
  const [error, setError] = useState()
  const [error2, setError2] = useState();
  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [nn, setNn] = useState([])
  const [mcatname, setmcatname] = useState([]);
  const [mcategory, setmcategory] = useState([]);
  const [store, setStore] = useState([]);
  const [subData, subCategeryData] = useState([])
  const [custCate, setCustcate] = useState([])
  const [custCate2, setCustcate2] = useState([])
  const [numExist, setNumExist] = useState(null)
  const [phone, setPhone] = useState('');
  const [numAvail, setNumAvail] = useState(null)
  const [categoryData, setCategoryData] = useState([])
  const [indNumError, setIndNumError] = useState(null)
  const [postValue, setPostName] = useState([]);
  const [email, setEmail] = useState('');
  const [valiEmail, setValiemail] = useState(null)
  const [invalid, setInvalid] = useState(null)
  const [wEmail, setWemail] = useState();
  const [display, setDisplay] = useState(false);
  const [teamleader, setTeamLeader] = useState([]);
  const [tl, setTl] = useState([])
  const [post1, setPost1] = useState([])
  const [post_na, setPost_na] = useState()
  const [tpEmail, setTpEmail] = useState('')
  const [loading, setLoading] = useState(false);
  var kk = []
  var vv = []
  var post_name;
  const options = tax.map(d => (
    {
      "value": d.id,
      "label": d.details
    }))

  const options2 = tax2.map(v => ({
    "value": v.id,
    "label": v.details
  }))

  const teamleader1 = teamleader.map(v => (
    console.log(v), {
      "value": v.id,
      "label": v.name
    }))
  useEffect(() => {
    const getTeamLeader = () => {
      axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
        console.log(res);
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
        console.log(res);
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
        console.log(res);
        if (res.data.code === 1) {
          setTax2(res.data.result);
        }
      });
    };
    getSubCategory();
  }, [store]);

  // OnSubmit Function
  const onSubmit = (value) => {
    console.log("tealId", tl)
    var categeryList = []
    var categeryName = []
    var categeryName = []
    var kk = []

    var parentCategoryName = []
    subData.map((i) => {
      categeryList.push(i.value)
      categeryName.push(i.label)
    })
    //  categoryData.map((i) => {
    //    kk.push(i.value)
    //    parentCategoryName.push(i.label)
    //  })

    console.log("subData", categoryData.label)
    if (custCate.length < 1) {
      setError("Please select at least one value")
    }
    else if (subData.length < 1) {

      setError2("Please select at least one value")
    }
    else if (invalid || wEmail || indNumError) {
      setDisplay(false)
    }

    else {
      console.log("value :", value);
      setLoading(true)
    
      let formData = new FormData();
      formData.append("personal_email", value.personal_email)
      formData.append("name", value.p_name);
      formData.append("phone", value.p_phone);
      formData.append("tp_id", tl);
      formData.append("email", value.p_email);
      formData.append("post_name", value.post_name)
      formData.append("cat_id", categeryList);
      formData.append("pcat_id", categoryData.value);
      formData.append("allpcat_id", categoryData.label)
      formData.append("allcat_id", categeryName)
      formData.append("type", "tp");
      formData.append("tlpost", post_na)

      axios({
        method: "POST",
        url: `${baseUrl}/tp/AddTaxProfessional`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            setLoading(false)
    
            var variable = "Tax Professional Created Successfully"

            Swal.fire({
              "title": "success",
              "html": "Tax Professional Created Successfully",
              "icon": "success"
            })
 
            history.goBack();
            
          }
          else if (response.data.code === 0) {
            setLoading(false)
            response.data.message.map((i) => {
              Swal.fire({
                "title": "Error",
                "html": "Something went wrong, please try again.",
                "icon": "error"
              })
            })
            history.goBack();
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    };
  }


  // Sub Category Function
  const subCategory = (e) => {
    subCategeryData(e)
    setCustcate2(e)
    setError2("")
  }


  // Category Function
  const category = (v) => {

    setCategoryData(v)
    setNn((oldData) => {
      return [...oldData, mcategory]
    })
    setError("")
    setCustcate(v)
    setStore(v.value)
    vv.push(v.value);
    setmcategory(v.value)
    setmcatname((oldData) => {
      return [...oldData, v.label]
    })
    // v.map((val) => {
    //   vv.push(val.value)
    //   setmcategory(val.value);
    //   setmcatname((oldData) => {
    //     return [...oldData, val.label]
    //   })
    //   setStore(val.value)
    // })


    if (vv.length > 0) {
      if (vv.includes("1") && vv.includes("2")) {
        console.log("hdd")
      }
      else if (vv.includes("1")) {

        for (let i = 0; i < subData.length; i++) {
          if (subData[i].value < 9) {
            kk.push(subData[i])
          }
        }
        subCategeryData(kk)
      }
      else if (vv.includes("2")) {

        for (let i = 0; i < subData.length; i++) {
          if (subData[i].value > 8) {
            kk.push(subData[i])
          }
        }
        subCategeryData(kk)
      }
    }

    else if (vv.length === 0) {
      subCategeryData("")
    }

  }
  // Phone onChange 
  const phoneHandler = (e) => {

    if (isNaN(e.target.value)) {
      setIndNumError("")
      setNumAvail("");
      setNumExist('Please enter number only')
      e.target.value = ""
      setPhone("")
    }
    else {
      setNumAvail("");
      setNumExist("");
      setPhone(e.target.value)
    }
  };

  // Phone Validation function 
  const phoneValidation = () => {
    console.log(phone.length)
    if (phone.length > 10) {
      console.log(phone.length)
      setNumAvail("")
      setNumExist("")
      setIndNumError("Maximum 10 digit should be enter")
    }
    else if (phone.length < 10) {
      console.log(phone.length)
      setNumAvail("")
      setNumExist("")
      setIndNumError("Minimum 10 digit should be enter")
    }
    else if (phone.length > 15) {
      setNumAvail("")
      setNumExist("")
      setIndNumError("Maximum 15 digit should be enter")
    }

    else {
      setIndNumError("")

      let formData = new FormData();
      formData.append("phone", phone);
      formData.append("type", 2);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/validateregistration`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            // setValiphone(response.data.result)
            console.log(response.data.result)
            setNumExist('')
            setNumAvail(response.data.result);

          }
          else if (response.data.code === 0) {
            console.log(response.data.result)
            setNumAvail('')
            setNumExist(response.data.result)

            console.log("mobile" + setNumExist)
          }

        })
        .catch((error) => {
          // console.log("erroror - ", error);
        });
    }
  }

  //eamil onchange
  const emailHandler = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value.length)
    if (e.target.value.length < 1) {
      setWemail("")
    }
  };


  //email validaation with api
  const emailValidation = (key) => {

    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(validRegex)) {
      setWemail("");
      let formData = new FormData();
      formData.append("email", email);
      formData.append("type", 1);

      axios({
        method: "POST",
        url: `${baseUrl}/customers/validateregistration`,
        data: formData,
      })
        .then(function (response) {
          console.log("resEmail-", response);
          if (response.data.code === 1) {
            setValiemail(response.data.result)
            setInvalid('')
          } else if (response.data.code === 0) {
            setInvalid(response.data.result)
            setValiemail('')
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
    else {
      setWemail("invalid email")
    }

  }

  // Tl Function 
  const tlFun = (e) => {
    var a;
    console.log("id", e)
    teamleader.filter((p) => {

      if (p.id == e) {
        console.log("pdi", p.id)
        setTpEmail(p.email)
        setTl(p.id)
        setPost_na(p.post_name)
        a = p.post_name
        console.log("aa", a)
      }
    })

    console.log(post_na)
  }


  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <div class="col-md-12 d-flex">
            <div>
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </div>
            <div class="text-center ml-5">
              <h4>Add New Tax Professionals</h4>
            </div>
          </div>
        </CardHeader>

        <CardHeader>
          <div class="row mt-3">
            <div class="col-lg-2 col-xl-2 col-md-12"></div>
            <div class="col-lg-8 col-xl-8 col-md-12">
              <form onSubmit={handleSubmit(onSubmit)}>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Teamleader post name <span className="declined">*</span></label>

                      <select
                        name="p_teamleader"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_teamleader,
                        })}
                        onChange={(e) => tlFun(e.target.value)}
                        ref={register}
                      >
                        <option value="">--select--</option>
                        {teamleader.map((p) =>
                        (
                          console.log("pp", p.id),
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

                  <div class="col-md-6">
                    <div class="form-group">
                      <label> Teamleader post email <span className="declined">*</span></label>
                      <input
                        type="email"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email || wEmail || invalid,
                        })}
                        disabled
                        defaultValue={tpEmail}
                        name="post_email"
                        ref={register}

                      />


                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>TP post name <span className="declined">*</span></label>
                      <input
                        type="text"
                        name="post_name"


                        className={classNames("form-control", {
                          "is-invalid": errors.post_name,
                        })}
                        ref={register}


                      />

                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">


                      <label> TP post email <span className="declined">*</span></label>
                      <input
                        type="text"
                        name="p_email"
                        ref={register}


                        className={classNames("form-control", {
                          "is-invalid": errors.post_email,
                        })}
                        onChange={(e) => emailHandler(e)}
                        onBlur={emailValidation}
                      />
                      {
                        wEmail ? <p className="declined">{wEmail}</p> : <>
                          {valiEmail ?
                            <p className="completed">
                              {valiEmail}
                            </p>
                            :
                            <p className="declined">{invalid}</p>}
                        </>
                      }
                    </div>
                  </div>
                </div>

                <div class="row">


                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Name <span className="declined">*</span></label>
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

                  <div class="col-md-6">
                    <div class="form-group">


                      <label> Email <span className="declined">*</span></label>
                      <input
                        type="text"
                        name="personal_email"
                        ref={register}


                        className={classNames("form-control", {
                          "is-invalid": errors.post_email,
                        })}
                      />

                    </div>
                  </div>

                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Phone Number <span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_phone || indNumError,
                        })}
                        name="p_phone"
                        ref={register}
                        onChange={(e) => phoneHandler(e)}
                        onBlur={phoneValidation}
                      />
                      {indNumError ? <p className="declined">{indNumError}</p> : <>
                        {
                          numAvail ?
                            <p className="completed"> {numAvail}
                            </p>
                            :
                            <p className="declined">{numExist}</p>
                        }
                      </>}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Category <span className="declined">*</span></label>
                      <Select options={options}
                        className={error ? "customError" : ""}
                        styles={{
                          option: (styles, { data }) => {
                            return {
                              ...styles,
                              color: data.value == 2
                                ? "green"
                                : "blue"
                            };
                          },
                          multiValueLabel: (styles, { data }) => ({
                            ...styles,
                            color: data.value == 2
                              ? "green"
                              : "blue"
                          }),
                        }}
                        onChange={category}>
                      </Select>
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Sub Category <span className="declined">*</span></label>
                      <Select isMulti options={options2}
                        className={error2 ? "customError" : ""}
                        onChange={subCategory}
                        styles={{
                          option: (styles, { data }) => {
                            return {
                              ...styles,
                              color: data.value > 8
                                ? "green"
                                : "blue"
                            };
                          },
                          multiValueLabel: (styles, { data }) => ({
                            ...styles,
                            color: data.value > 8
                              ? "green"
                              : "blue"
                          }),
                        }}

                        value={subData}>

                      </Select>

                    </div>
                  </div>
                </div>
                {
                loading ?
                  <Spinner color="primary" />
                  :
                <button type="submit" className="btn btn-primary">
                  Submit
                </button> }
              </form>
            </div>
            <div class="col-lg-2 col-xl-2 col-md-12">
            </div>

            <Mandatory />
          </div>
        </CardHeader>
      </Card>
    </Layout>
  );
}
export default AddNew;
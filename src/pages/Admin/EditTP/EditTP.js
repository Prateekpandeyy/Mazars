import React, { useState, useEffect , useRef} from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { useParams, useHistory } from "react-router-dom";
import classNames from "classnames";
import TaxProffesionalService from "../../../config/services/TaxProffesional";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Tooltip,
} from "reactstrap";

import { Form, Input, Button } from "antd";
import Select from "react-select";
import Alerts from "../../../common/Alerts";
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


function EditTP() {
  const { Option } = Select;
  const { id } = useParams();
  const history = useHistory();
  const alert = useAlert();

  const userid = window.localStorage.getItem("adminkey");

  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);

  const [store, setStore] = useState("");
  const [store2, setStore2] = useState(null);
  const [value, setValue] = useState({});
  const [mcategory, setmcategory] = useState([]);
  const [mdata, setmdata] = useState([]);
  const [mdataName, setMdataname] = useState([]);
  const [numExist, setNumExist] = useState(null)
  const [phone, setPhone] = useState('');
  const [numAvail, setNumAvail] = useState(null)
  const [indNumError, setIndNumError] = useState(null)
  const [postValue, setPostName] = useState([]);
  const [email, setEmail] = useState('');
  const [valiEmail, setValiemail] = useState(null)
  const [invalid, setInvalid] = useState(null)
  const [wEmail, setWemail] = useState();
  const [display, setDisplay] = useState(false);
  const [subData, subCategeryData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [custCate, setCustcate] = useState([])
  const [mcatname, setmcatname] = useState([]);
  const [error, setError] = useState()
  const [error2, setError2] = useState();
  const [custCate2, setCustcate2] = useState([])
  const [teamleader, setTeamLeader] = useState([]);
  const [tl, setTl] = useState([])
  const [post1, setPost1] = useState([])
  const [show, setShow] = useState([])
  const [post_na, setPost_na] = useState()
  const selectInputRef = useRef();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  var kk = []
  var vv = []
  var a;
  var subdefval;
  var dirvalue = []
  var indirvalue = []
  var allsubcatvalue = []
  var vv = []
  const options = tax.map(d => ({
    "value": d.id,
    "label": d.details
  }))
  const options2 = tax2.map(v => ({
    "value": v.id,
    "label": v.details
  }))


  useEffect(() => {
    getTeamLeader();
  }, [id]);

  useEffect(() => {
    console.log("baseUrl", baseUrl)
    axios.get(`${baseUrl}/tp/getTaxProfessional`).then((res) => {
      if (res.data.code === 1) {
        console.log("myData", res.data.result)
      }
      else {
        console.log(res.data.result)
      }
    })
  }, [])
  const getTeamLeader = () => {
   
    axios.get(`${baseUrl}/tl/getTeamLeader?id=${id}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setValue(res.data.result[0]);
        setStore(res.data.result[0].pcat_id);
      }
    });
  };
  console.log("value -", value.name);
  const data1 = value.name;
  const data2 = value.personal_email;
  const data3 = value.phone;
  const data4 = value.allpcat_id;
  const data5 = value.allcat_id;
  const data6 = value.post_name;
  const data7 = value.email;
  const data8 = value.cat_id;
  const data9 = value.pcat_id
  const data10 = value.tl_id
  const data11 = value.tl_name
  const postEmmail = value.tl_post_email;
  console.log(data2)
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
    getTutorial(id);
  }, [id]);

  const getTutorial = (id) => {
    TaxProffesionalService.get(id)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 1) {
          setValue(res.data.result[0]);
          setStore(res.data.result[0].pcat_id);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
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

  const onFinish = (value) => {


    var categeryList = []
    var categeryName = []
    var kk = []
    var parentCategoryName = []
    subData.map((i) => {
      categeryList.push(i.value)
      categeryName.push(i.label)
    })
    // categoryData.map((i) => {
    //   kk.push(i.value)
    //   parentCategoryName.push(i.label)
    // })
    console.log("subData", subData)
    if (custCate.length < 1 && data4.length < 1) {
      setError("Please select at least one value")
    }
    else if (subData.length < 1 && data5.length < 1) {

      setError2("Please select at least one value")
    }
    else if (invalid || wEmail || indNumError) {
      setDisplay(false)
    }

    else {
      setDisplay(true)
      console.log("kkData", kk.length)
      console.log("parentCategoryName", parentCategoryName)
      let formData = new FormData();
      formData.append("personal_email", value.email);
      formData.append("name", value.name);
      formData.append("phone", value.phone);
    
      formData.append("tp_id", data10);
      formData.append("email", data7)
      formData.append("post_name", data6)
      {
        categeryList.length > 1 ? formData.append("cat_id", categeryList) :
        formData.append("cat_id", data8)
      }


      {
        categoryData.length === 0 ? formData.append("pcat_id", data9) :
        formData.append("pcat_id", categoryData.value)
      }


      {
        categoryData.length === 0 ?
        formData.append("allpcat_id", data4) :
        formData.append("allpcat_id", categoryData.label)
      }

      {
        categeryName.length > 0 ? formData.append("allcat_id",categeryName) :
        formData.append("allcat_id", data5)
      }
      formData.append("id", id);

      axios({
        method: "POST",
        url: `${baseUrl}/tp/updateTP`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {

            var variable = "Team Leader details updated successfully."
            Alerts.SuccessNormal(variable)
            history.goBack();
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
  };



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
      // let formData = new FormData();
      // formData.append("phone", phone);
      // formData.append("type", 2);
      // axios({
      //   method: "POST",
      //   url: `${baseUrl}/customers/validateregistration`,
      //   data: formData,
      // })
      //   .then(function (response) {
      //     console.log("res-", response);
      //     if (response.data.code === 1) {
      //       // setValiphone(response.data.result)
      //       console.log(response.data.result)
      //       setNumExist('')
      //       setNumAvail(response.data.result);

      //     }
      //     else if (response.data.code === 0) {
      //       console.log(response.data.result)
      //       setNumAvail('')
      //       setNumExist(response.data.result)

      //       console.log("mobile" + setNumExist)
      //     }

      //   })
      //   .catch((error) => {
      //     // console.log("erroror - ", error);
      //   });
    }
  }

  // Sub Category Function
  const subCategory = (e) => {
    subCategeryData(e)
    setCustcate2(e)
    setError2("")
  }


  // Category Function
  const category = (v) => {
    selectInputRef.current.select.clearValue();
    setCategoryData(v)
    console.log("MyData", v)
    setError("")
    setCustcate(v)

    // v.map((val) => {
    //   vv.push(val.value)
    //   setmcategory((oldData) => {
    //     return [...oldData, val.value]
    //   })
    //   setmcatname((oldData) => {
    //     return [...oldData, val.label]
    //   })
    //   setStore(val.value)
    // })
   
    setStore(v.value)
    vv.push(v.value);
    setmcategory(v.value)
    setmcatname((oldData) => {
      return [...oldData, v.label]
    })
    subdefval = {}
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

      // axios({
      //   method: "POST",
      //   url: `${baseUrl}/customers/validateregistration`,
      //   data: formData,
      // })
      //   .then(function (response) {
      //     console.log("resEmail-", response);
      //     if (response.data.code === 1) {
      //       setValiemail(response.data.result)
      //       setInvalid('')
      //     } else if (response.data.code === 0) {
      //       setInvalid(response.data.result)
      //       setValiemail('')
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("erroror - ", error);
      //   });
    }
    else {
      setWemail("Invalid email")
    }
  }

  // tlFun Function
//   const tlFun = (e) => {
//     var a ;
//   console.log("id", e)
 
//   teamleader.filter((p) => {
   
//     if(p.id == e){
//    console.log(p.post_name)
//    console.log("teamLeader", p.id)
//      setTl(p.id)
//      setPost_na(p.post_name)
//     }
//   })
//  console.log("tlId", tl)
//     let formData = new FormData()
//     formData.append("post", post_na)
//     axios({
//       method  :"POST",
//       url  : `${baseUrl}/admin/addTpPost?post=${post_na}`,
//       data : formData
//     })
//     .then(function (response) {
//       if(response.data.code === 1){
//         setPost1(response.data.result)
//       }
//       else if(response.data.code === 0){
//         console.log(response.data.result)
//       }
//     } )
//     .catch((error) => {
//       console.log("erroror - ", error);
//     });
//   }
 const defSubValue = () => {
 var k;
 
   console.log("done2")
   var subcatgerydefvalue = value.allcat_id.split(",");
   value.allpcat_id.includes("Indirect") === true  ? k = 8 : k = 2
 
  subdefval = subcatgerydefvalue.map((i => ({
   "value" : ++k,
   "label" : i
 }) ))
 console.log("subDefVal33", value.allpcat_id)
  }
 
 if(data5 != undefined){
   defSubValue();
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
              <h4>Edit Tax Professional</h4>
            </div>
          </div>
        </CardHeader>

        {!data1 ? (
          <CardHeader>loading ...</CardHeader>
        ) : (
          <CardHeader>
            <div class="row mt-3">
              <div class="col-lg-2 col-xl-2 col-md-12"></div>
              <div class="col-lg-8 col-xl-8 col-md-12">
                <Form
                  name="basic"
                  initialValues={{
                    name: `${data1}`,
                    email: `${data2}`,
                    phone: `${data3}`,
                    category: `${data4}`,
                    sub_category: `${data5}`,
                  }}
                  onFinish={onFinish}
                >
                   <div class="row">
                  <div class="col-md-6">
                  <div class="form-group">
                  <label>Teamleader post name <span className="declined">*</span></label>
                  <input type="text" className = "form-control" defaultValue = {data11} disabled />   
                    </div>
                  </div>
                    <div class="col-md-6">
                      <div class="form-group">
                      <label> Teamleader post email <span className="declined">*</span></label>
                        <input
                          type="text"
                          name="post_email"
                          defaultValue = {postEmmail}
                          disabled
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
                      
                      <label>TP post name <span className="declined">*</span></label>
                        <input
                          type="text"
                          name="post_name"
                          disabled
                          defaultValue={data6}
                          className={classNames("form-control", {
                            "is-invalid": errors.post_name,
                          })}
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
                      disabled
                      defaultValue={data7}
                        className={classNames("form-control", {
                          "is-invalid": errors.post_email,
                        })}
                        onChange={(e) => emailHandler(e)}
                        onBlur={emailValidation}
                      />
                     
                    </div>
                  </div>
                   
                    
                  </div>


                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Name <span className="declined">*</span></label>
                        <Form.Item name="name">
                          <input
                            required
                           
                            className={classNames("form-control", {
                              "is-invalid": errors.p_name,
                            })} />
                        </Form.Item>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Phone  <span className="declined">*</span></label>
                        <Form.Item name="phone">
                          <Input
                            className={classNames("form-control", {
                              "is-invalid": errors.p_phone || indNumError || numExist,
                            })}
                            onChange={(e) => phoneHandler(e)}
                            onBlur={phoneValidation} />
                        </Form.Item>
                      </div>
                      {indNumError ? <p className="declined">{indNumError}</p> :""}

                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Email <span className="declined">*</span></label>
                        <Form.Item name="email">
                          <Input
                            className={classNames("form-control", {
                              "is-invalid": errors.p_email || wEmail || invalid,
                            })}
                            onBlur={emailValidation}
                            onChange={(e) => emailHandler(e)} />
                        </Form.Item>
                        {
                          wEmail ? <p className="declined">{wEmail}</p> : ""
                           
                        }
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Category <span className="declined">*</span></label>
                        <div class="form-group">

                          <Select  options={options}
                            defaultInputValue={data4} onChange={category}
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
                                color: data.value  == 2
                                    ? "green"
                                    : "blue"
                              }),
                            }}
                          >
                          </Select>                  
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Sub Category <span className="declined">*</span></label>

                        <Select isMulti options={options2}
                          onChange={subCategory}
                          defaultValue = { subdefval}
                          ref={selectInputRef}

                          // value = {subData}
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
                         >
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Update
                          </Button>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </CardHeader>
        )}
      </Card>
    </Layout>
  );
}

export default EditTP;
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

import { Spinner } from "reactstrap";
import Swal from "sweetalert2";
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
  const [loading, setLoading] = useState(false);
  const [showDel, setShowDel] = useState(null)
  const [posError, setposError] = useState({
    available : '',
    exits : ''
  });
  const selectInputRef = useRef();
  const selectInputRef2 = useRef();
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
  var data1 = value.name;
  var data2 = value.personal_email;
  var data3 = value.phone;
  var data4 = {
    "value" : value.allpcat_id,
    "label" : value.allpcat_id
  }
  var data5 = value.allcat_id;
  var data6 = value.post_name;
  var data7 = value.email;
  var data8 = value.cat_id;
  var data9 = value.pcat_id
  var data10 = value.tl_id
  var data11 = value.tl_name
  var postEmmail = value.tl_post_email;
  const token = window.localStorage.getItem("adminToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  useEffect(() => {
    const getCategory = () => {
      axios.get(`${baseUrl}/admin/getCategory?pid=0`, myConfig).then((res) => {
       
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
   axios.get(`${baseUrl}/admin/getTaxProfessional?id=${id}`, myConfig)
      .then((res) => {
       
        if (res.data.code === 1) {
          setValue(res.data.result[0]);
          setStore(res.data.result[0].pcat_id);
          setShowDel(res.data.result[0].is_delete)
          categoryData(res.data.result[0].allcat_id)
        }
      })
      .catch((e) => {
     
      });
  };
  useEffect(() => {
    const getSubCategory = () => {
      axios.get(`${baseUrl}/admin/getCategory?pid=${store}`, myConfig).then((res) => {
        
        if (res.data.code === 1) {
          setTax2(res.data.result);
          console.log("tax2", res.data.result)
        }
      });
    };
    getSubCategory();
  }, [store]);


  const onFinish = (value) => {


    var categeryList = []
    var categeryName = []
    var kk = []
    var parentCategoryName = []
    subData.map((i) => {
      categeryList.push(i.value)
      categeryName.push(i.label)
    })
   
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
     setLoading(true)
      let formData = new FormData();
      formData.append("personal_email", value.email);
      formData.append("name", value.name);
      formData.append("phone", value.phone);
    
      formData.append("tp_id", data10);
      {email.length > 1 ? 
        formData.append("email", email) :
        formData.append("email", data7)}
        {postValue.length > 1 ?  
          formData.append("post_name", postValue) :
          formData.append("post_name", data6)}
      // {
      //   categeryList.length > 1 ? formData.append("pcat_id", store) :
      //   formData.append("pcat_id", data8)
      // }
      {
        categeryList.length === 0 ? formData.append("pcat_id", data9)
        : formData.append("pcat_id", store)
      }
     


      {
        categeryList.length === 0 ? formData.append("cat_id", data8) :
        formData.append("cat_id", categeryList)
      }


      {
        categoryData.length === 0 ?
        formData.append("allpcat_id", data4.label) :
        formData.append("allpcat_id", categoryData.label)
      }

      {
        categeryName.length > 0 ? formData.append("allcat_id", categeryName) :
        formData.append("allcat_id", data5)
      }
      formData.append("id", id);

      axios({
        method: "POST",
        url: `${baseUrl}/admin/updateTP`,
        headers : {
          uit : token
        },
        data: formData,
      })
        .then(function (response) {
        
          if (response.data.code === 1) {
           setLoading(false)
          
            Swal.fire({
              "title": "Success",
              "html": "Tax Professional details updated successfully",
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
   
    if (phone.length > 10) {
     
      setNumAvail("")
      setNumExist("")
      setIndNumError("Maximum 10 digit should be enter")
    }
    else if (phone.length < 10) {
     
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
    console.log("vvv", v)
    selectInputRef.current.select.clearValue();
   
    setCategoryData(v)
    setError("")
    setCustcate(v)
    setStore(v.value)
    vv.push(v.value);
    setmcategory(v.value)
    setmcatname((oldData) => {
      return [...oldData, v.label]
    })
    subdefval = {}
    if (vv.length > 0) {
      if (vv.includes("1") && vv.includes("2")) {
        
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
    data7 = e.target.value
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
      formData.append("id", id)

      axios({
        method: "POST",
        url: `${baseUrl}/admin/validateEditRegistration`,
        headers : {
          uit : token
        },
        data: formData,
      })
      .then(function (response) {

        if (response.data.code === 1) {
          setValiemail(response.data.result)
          setInvalid('')
        } else if (response.data.code === 0) {
          setInvalid(response.data.result)
          setValiemail('')
        }
      })
      .catch((error) => {

      });
    }
    else {
      setWemail("Invalid email")
    }
  }

  
 const defSubValue = () => {
 var k;
 
   var subcatgerydefvalue = value.allcat_id.split(",");
   value.allpcat_id.includes("Indirect") === true  ? k = 8 : k = 2
 
  subdefval = subcatgerydefvalue.map((i => ({
   "value" : String(++k),
   "label" : i
 }) ))
 
  }
 
 if(data5 != undefined){
   defSubValue();
 }

 const checktlPost = (e) => {
  setPostName(e.target.value)
  data6 = e.target.value;
  let a = e.target.value;
  let formData = new FormData();
  formData.append("tlpost", a)
  formData.append("id", id )
  axios({
    method: "POST",
    url : `${baseUrl}/tl/validateTLEditPost`,
    data: formData,
  })
  .then(function (res) {
    if(res.data.code === 1){
      setposError({
        available : "Post Available"
      })
    }
    else{
      setposError({
        exits : "Post already exits"
      })
    }
  })
  }
  const del = (e) => {
    Swal.fire({
     title: "Are you sure?",
     text: "It will permanently deleted !",
     type: "warning",
     showCancelButton : true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, delete it!",
    }).then((result) => {
     if (result.value) {
       deleteCliente(id);
     }
   });
  }
  const deleteCliente = (id) => {
   axios
     .get(`${baseUrl}/admin/deleteTP?id=${id}`, myConfig)
     .then(function (response) {
       
       if (response.data.code === 1) {
         Swal.fire("Tax Professional has been deleted successfully");
         history.goBack();
       } else {
         Swal.fire("Oops...", "Errorr ", "error");
         history.goBack();
       }
 
     })
     .catch((error) => {
       
     });
 };

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <div className="col-md-12 d-flex justify-content-between">
            <div>
              <button
                className="autoWidthBtn ml-3"
                onClick={() => history.goBack()}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </div>
            <div className="text-center ml-5">
              <h4>Edit Tax Professional</h4>
            </div>
            <div>
             {showDel == "0" ?  <button className="btn btn-danger" onClick={(e) => del(e)}>Delete</button> : ""}
              </div>
          </div>
        </CardHeader>

        {!data1 ? (
          <CardHeader>loading ...</CardHeader>
        ) : (
          <CardHeader>
            <div className="row mt-3">
              <div className="col-lg-2 col-xl-2 col-md-12"></div>
              <div className="col-lg-8 col-xl-8 col-md-12">
                <Form
                  name="basic"
                  autoComplete="off"
                  initialValues={{
                    name: `${data1}`,
                    email: `${data2}`,
                    phone: `${data3}`,
                    category: `${data4}`,
                    sub_category: `${data5}`,
                  }}
                  onFinish={onFinish}
                >
                   <div className="row">
                  <div className="col-md-6">
                  <div className="form-group">
                  <label>Team Leader post name <span className="declined">*</span></label>
                  <input type="text" className = "form-control" 
                  defaultValue = {data11} 
              disabled />   
                    </div>
                  </div>
                    <div className="col-md-6">
                      <div className="form-group">
                      <label> Team Leader post email <span className="declined">*</span></label>
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


                  <div className="row">
                  <div className="col-md-6">
                      <div className="form-group">
                      
                      <label>TP post name <span className="declined">*</span></label>
                        <input
                          type="text"
                          name="post_name"
                          onBlur={(e) => checktlPost(e)}
                          disabled = {showDel == "1" ? true : ""}
                          defaultValue={data6}
                          onChange={(e) => data6= e.target.value}
                          className={classNames("form-control", {
                            "is-invalid": errors.post_name,
                          })}
                        />
                         {posError.available ? 
                    <p className="completed"> {posError.available}</p> : 
                    <p className="declined">{posError.exits}</p>}
                      </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                    
                  
                    <label> TP post email <span className="declined">*</span></label>
                      <input
                        type="email"
                        name="p_email"
                        ref={register}
                        disabled = {showDel == "1" ? true : ""}
                      defaultValue={data7}
                     
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


                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
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

                    <div className="col-md-6">
                      <div className="form-group">
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

               

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Category <span className="declined">*</span></label>
                        <div className="form-group">

                          <Select  options={options}
                            defaultValue={data4} onChange={category}
                            styles={{
                              option: (styles, { data }) => {
                                return {
                                  ...styles,
                                  color: data.value == 2
                                    ? "green"
                                    : "blue"
                                };
                              },
                              singleValue: (styles, { data }) => ({
                                ...styles,
                                color: data.label  == "Indirect tax"
                                    ? "green"
                                    : "blue"
                              }),
                            }}
                            ref={selectInputRef2}
                            // onFocus = {(e) => {
                            //   selectInputRef2.current.select.clearValue();
                            // }}
                          >
                          </Select>                  
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
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
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Email <span className="declined">*</span></label>
                        <Form.Item name="email">
                          <Input
                          type="email"
                            className={classNames("form-control", {
                              "is-invalid": errors.email || wEmail ,
                            })}/>
                        </Form.Item>
                        {
                          wEmail ? <p className="declined">{wEmail}</p> : ""
                           
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                      {
                loading ?
                  <Spinner color="primary" />
                  :
                        <Form.Item>
                          <button type="submit" className="customBtn">
                            Update
                          </button>
                        </Form.Item>  }
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
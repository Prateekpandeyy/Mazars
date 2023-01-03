import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import Swal from 'sweetalert2'
import { useParams, useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  Card,
  CardHeader, Row, Col
} from "reactstrap";
import Reset from "./Reset";
import { Form, Input, Button } from "antd";
import Select from "react-select";
import { Spinner } from "reactstrap";
import CustomHeading from "../../../components/Common/CustomHeading";
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


function EditTL() {
  const { Option } = Select;
  const { id } = useParams();
  
  
  let history = useHistory();
  const userid = window.localStorage.getItem("adminkey");

  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);

  const [store, setStore] = useState(null);
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
  const [loading, setLoading] = useState(false);
 const [showDel, setShowDel] = useState(null)
  const [posError, setposError] = useState({
    available : '',
    exits : ''
  });
  const [dd, setDd] = useState({
    direct: [],
    indirect: [],
  });
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });
  
  const token = window.localStorage.getItem("adminToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  var kk = []
  var vv = []
  var a;
  var subdefval;
  var dirvalue = []
  var indirvalue = []
  var allsubcatvalue = []
  
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

 
  const getTeamLeader = () => {
    axios.get(`${baseUrl}/admin/getTeamLeader?id=${id}`, myConfig).then((res) => {
 
      if (res.data.code === 1) {
       if(JSON.parse(res.data.result[0].allcat_id)){
        setValue(res.data.result[0]);
        setStore(res.data.result[0].pcat_id);
        setShowDel(res.data.result[0].is_delete)
       }
       
      }
    });
  };
 
  const data1 = value.name;
  const data2 = value.personal_email;
  const data3 = value.phone;
  const data4 = value.allpcat_id;
  const data5 = value.allcat_id;
  var data6 = value.post_name;
  var data7 = value.email;
  const data8 = value.cat_id;
  const data9 = value.pcat_id;
   const data10= value.cat_value;
   const data11 = value.pcat_value;

  useEffect(() => {
    const getCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
       
        if (res.data.code === 1) {
          setTax(res.data.result);
        }
      });
    };
   defValue()
   
    getCategory();
    if(data5) {
      defSubValue();
    }
  }, [showDel]);

  useEffect(() => {

    getSubCategory();
   
  }, [store]);

  const getSubCategory = () => {
  if(store !== null){
   
    axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {
     
      if (res.data.code === 1) {
       setTax2(res.data.result);
      }
    });
  }
  };
  
  const onFinish = (value) => {
   
    var categeryList = []
    var categeryName = []
    var kk = []
    var parentCategoryName = []
    subData.map((i) => {
      categeryList.push(i.value)
      categeryName.push(i.label)
    })
    categoryData.map((i) => {
      kk.push(i.value)
      parentCategoryName.push(i.label)
    })
   

    if (custCate.length < 1 && data4.length < 1) {
      setError("Please select at least one value")
     
     
    }
    else if (subData.length < 1 && data5.length < 1) {
      setError2("Please select at least one value")
    
    }
    else if (invalid || wEmail || indNumError || posError.exits) {
      setDisplay(false)
      
    }
    else if(parentCategoryName.includes("Direct tax") && dd.direct.length === 0){
     
    }
    else if(parentCategoryName.includes("Indirect tax") && dd.indirect.length === 0){
     
    }
    
    else {
   
      setLoading(true)
      setDisplay(true)
      let formData = new FormData();
      formData.append("personal_email", value.email);
      formData.append("name", value.name);
      formData.append("phone", value.phone);
     {email.length > 1 ? 
      formData.append("email", email) :
      formData.append("email", data7)}
      {postValue.length > 1 ?  
        formData.append("post_name", postValue) :
        formData.append("post_name", data6)}
     {categeryList.length > 1 ?  formData.append("cat_id", categeryList) : 
     formData.append("cat_id", categeryList) }
     {kk.length === 0 ?  formData.append("pcat_id", data9) : 
     formData.append("pcat_id", kk) }
      { parentCategoryName.length > 0 ?
      formData.append("allpcat_id", parentCategoryName) : 
      formData.append("allpcat_id", data4) } 
      
    
      formData.append("allcat_id", JSON.stringify(dd)) 
      formData.append("id", id);

      axios({
        method: "POST",
        url: `${baseUrl}/admin/updateTeamLeader`,
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
              "html": "Team Leader Updated Successfully",
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

  var dir = []
  var indir = []

  // Sub Category Function
  const subCategory = (e) => {
    subCategeryData(e)
    setCustcate2(e)
    setError2("")

    e.map((i) => {
      i.value < 9 ? dir.push(i.label) : indir.push(i.label)
    })
    setDd({
      direct: dir,
      indirect: indir
    })
    let pk = []
    if(indir.length === 0 && dir.length === 0){
      setCategoryData("")
    }
   else if(dir.length === 0){
      let bb = {
        value : "2",
        label : "Indirect tax"
      }
      pk.push(bb)
      setCategoryData(pk)
    }
    else if(indir.length === 0){
      let bb = {
        value : "1",
        label : "Direct tax"
      }
      pk.push(bb)
      setCategoryData(pk)
    }
  }


  // Category Function
  const category = (v) => {

     setCategoryData(v)

    setError("")
    setCustcate(v)

    v.map((val) => {
      vv.push(val.value)

      setmcategory((oldData) => {
        return [...oldData, val.value]
      })
      setmcatname((oldData) => {
        return [...oldData, val.label]
      })
      setStore(val.value)
    })


    if (vv.length > 0) {
     
      if (vv.includes("1") && vv.includes("2")) {
      
        let dkkk = []
        let pkk = []
                for (let i = 0; i < subData.length; i++) {
                                     kk.push(subData[i])
                    dkkk.push(subData[i].label)
                  
                }
          
                setDd({
                  "direct" : dkkk,
                  "indirect" : pkk
                })
                subCategeryData(kk)
      }
      else if (vv.includes("1")) {
      
let dkkk = []
let pkk = []
        for (let i = 0; i < subData.length; i++) {
          if (subData[i].value < 9) {
            kk.push(subData[i])
            dkkk.push(subData[i].label)
          }
        }
      
        setDd({
          "direct" : dkkk,
          "indirect" : pkk
        })
        subCategeryData(kk)
      }
      else if (vv.includes("2")) {
       
        let pkk = []
        let dkkk = []
        for (let i = 0; i < subData.length; i++) {
          if (subData[i].value > 8) {
            kk.push(subData[i])
            dkkk.push(subData[i].label)
          }
        }
        setDd({
          "direct" : pkk,
          "indirect" : dkkk
        })
        subCategeryData(kk)
      }
    }
    else if (vv.length === 0) {
      subCategeryData("")
    }
  }

 //eamil onchange
 const emailHandler = (e) => {
   data7 = e.target.value;
  setEmail(e.target.value);
 
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
    setWemail("invalid email")
  }
}



const defValue = () => {
  let e = 0;
 if(data4){
  const data55 = data4.split(",")

let b;
if(value.pcat_value){
  b = value.pcat_value.split(",");

 
    a = data55.map((i => ({
      "value" : String(b[e++]),
      "label" : i
    }) ))
  
}}

  setCategoryData(a)
}
const defSubValue = () => {
 
   var dir1;
   var dir2;
   var kk = []
   var d = 0;
   var ind = 9;
   let ppp;
   let c =0;
 if(value.cat_value !== null){
  ppp = value.cat_value.split((","))
 
 let ooo = ppp.filter((i) => {
   return i > 8
 })
 let nnn = ppp.filter((i) => {
   return i < 9
 })
 
   var subcatgerydefvalue = JSON.parse(value.allcat_id);
   indirvalue = subcatgerydefvalue.indirect;
   dirvalue = subcatgerydefvalue.direct;
   if(Array.isArray(dirvalue)){
    dirvalue.map((i) => {
     
      allsubcatvalue.push(i)
      kk.push(i)
    })
    dir1 = subcatgerydefvalue.direct.map((i => ({
      "value" : String(nnn[d++]),
      "label" : i
    }) ))
   }
   else{
     return false
   }
  if(Array.isArray(indirvalue)){
    indirvalue.map((o) => {
      allsubcatvalue.push(o)
      kk.push(o)
    })
    dir2 = subcatgerydefvalue.indirect.map((i => ({
      "value" : String(ooo[c++]),
      "label" : i
    }) ))
  }
  else{
    return false
  }
 
   subdefval = [...dir1, ...dir2]
  // let dircat = [dir1.label]
  // let indircat = [dir2.label]
  let oo = []
  let pp = []
  dir1.map((i) => {
    oo.push(i.label)
  })
  dir2.map((i) => {
    pp.push(i.label)
  })
  
  subCategeryData(subdefval)
  setDd({
    "direct" : oo,
    "indirect" : pp
  })
  
  }
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
    url : `${baseUrl}/admin/validateTLEditPost`,
    headers : {
      uit : token
    },
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
 const tlName22 = (e) => {
   
   data6 = e.target.value
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
    .get(`${baseUrl}/admin/deleteTeamLeader?id=${id}`, myConfig)
    .then(function (response) {
      
      if (response.data.code === 1) {
        Swal.fire("Team Leader has been deleted successfully");
        history.goBack();
        getTeamLeader();
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
        {/* <CardHeader>
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
              <h4>Edit Team Leader</h4>
            </div>
            <div>
             {showDel == "0" ?  <button className="btn btn-danger" onClick={(e) => del(e)}>Delete</button> : ""}
              </div>
          </div>
        </CardHeader> */}
<CardHeader>
          <Row>
          <Col md="4">
          <button
                className="autoWidthBtn" 
                onClick={() => history.goBack()}
              >
               
                Go Back
              </button>
              
            </Col>
            <Col md="5">
            <CustomHeading>
           Edit team leader
            </CustomHeading>
            </Col>
            <Col md = "3">
            {showDel ===  "0" ?  <button className="btn btn-danger" onClick={(e) => del(e)}>Delete</button> : ""}
            </Col>
          </Row>
        </CardHeader>
        {!data1 ? (
          <CardHeader>loading ...</CardHeader>
        ) : (
          <CardHeader>
            <div className="row mt-3">
              <div className="col-lg-2 col-xl-2 col-md-12"></div>
              <div className="col-lg-8 col-xl-8 col-md-12">
                <Form
                autoComplete="off"
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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                      <label>Team leader post name <span className="declined">*</span></label>
                        <input
                          type="text"
                          name="post_name"
                          onBlur={(e) => checktlPost(e)}
                          defaultValue={data6}
                         disabled = {showDel ===  "1" ? true : ""}
                          onChange = {(e) => tlName22(e)}
                          className={classNames("form-control", {
                            "is-invalid": errors.post_name || posError.exits,
                          })}
                        />
                          {posError.available ? 
                    <p className="completed"> {posError.available}</p> : 
                    <p className="declined">{posError.exits}</p>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                      <label>Team leader post email <span className="declined">*</span></label>
                        <input
                          type="text"
                          name="post_email"
                          onBlur={(e) => emailValidation(e)}
                          disabled = {showDel ===  "1" ? true : ""}
                          defaultValue={data7}
                          onChange={(e) => emailHandler(e)}
                          className={classNames("form-control", {
                            "is-invalid": errors.post_email,
                          })}
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
                          <Input
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
                            onBlur={phoneValidation}
                             />
                        </Form.Item>
                      </div>
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

                

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Category <span className="declined">*</span></label>
                        <div className="form-group">

                        <Select isMulti options={options}
                        value = {categoryData}
                        className={error ? "customError" : ""}
                        styles={{
                          option: (styles, { data }) => {
                            return {
                              ...styles,
                              color: data.value ===  2
                                ? "green"
                                : "blue"
                            };
                          },
                          multiValueLabel: (styles, { data }) => ({
                            ...styles,
                            color: data.value ===  2
                              ? "green"
                              : "blue"
                          }),
                        }}
                        
                        onChange={category}>
                      </Select>

                         

                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Sub category <span className="declined">*</span></label>
                        <Select isMulti options={options2}
                      onChange={subCategory}
                            value = {subData}
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
                                color: data.value < 9
                                    ? "blue"
                                    : "green"
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
                          className={classNames("form-control", {
                            "is-invalid": errors.email,
                          })}
                      
                          />
                        </Form.Item>
                       
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

export default EditTL;
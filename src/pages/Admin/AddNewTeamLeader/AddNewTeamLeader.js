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
import EmailValidation from "../../../components/Common/EmailValidation";
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
  const [email, setEmail] = useState([]);
  const [emailPost, setEmailPost] = useState('');
  const [valiEmail, setValiemail] = useState(null)
  const [valiEmailPost, setValiemailPost] = useState(null)
  const [invalid, setInvalid] = useState(null)
  const [invalidPost, setInvalidPost] = useState(null)
  const [wEmail, setWemail] = useState();
  const [wEmailPost, setWemailPost] = useState();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [display, setDisplay] = useState(false);
  const [posError, setposError] = useState({
    available : '',
    exits : ''
  });
  const [dd, setDd] = useState({
    direct: [],
    indirect: [],
  });

  var kk = []
  var vv = []



  const options = tax.map(d => (
    {
      "value": d.id,
      "label": d.details
    }))

  const options2 = tax2.map(v => ({
    "value": v.id,
    "label": v.details
  }))




  useEffect(() => {
    const getCategory = async () => {
      await axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        if (res.data.code === 1) {
          
          setTax(res.data.result);
        }
      });
    };

    getCategory();
  }, []);



  useEffect(() => {
    const getSubCategory = async () => {

      await axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {

        if (res.data.code === 1) {
          setTax2(res.data.result)
        }
      });
    };
    getSubCategory();
  }, [store]);

  // OnSubmit Function

  const onSubmit = (value) => {
   
   
    var categeryList = []
    var categeryName = []
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
   
    if (custCate.length < 1) {
      setError("Please select at least one value")
    }
    else if (subData.length < 1) {

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
      setDisplay(true)
      setLoading(true)
    
      let formData = new FormData();

      formData.append("personal_email", value.p_email);
      formData.append("name", value.p_name);
      formData.append("phone", value.p_phone);
      formData.append("type", "tl");
      formData.append("cat_id", categeryList)
      formData.append("post_name", value.post_name)
      formData.append("email", email)
      formData.append("pcat_id", kk)
      formData.append("allpcat_id", parentCategoryName)
      formData.append("allcat_id", JSON.stringify(dd))



      axios({
        method: "POST",
        url: `${baseUrl}/tl/AddTeamLead`,
        data: formData,
      })

        .then(function (response) {

          if (response.data.code === 1) {
            setLoading(false)
            Swal.fire({
              "title": "Success",
              "html": "Team Leader created successfully.",
              "icon": "success"
            })

            history.goBack();
          }
          if (response.data.code === 0) {
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
  var allData1 = {}
  var dir = []
  var indir = []
  // Sub Category Function
  const subCategory = (e) => {
  
    subCategeryData(e)
    setCustcate2(e)
    setError2("")
  
    e.map((i) => {

      i.value < 8 ? dir.push(i.label) : indir.push(i.label)
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
    setNn((oldData) => {
      return [...oldData, mcategory]
    })
    setError("")
    setCustcate(v)
    v.map((val) => {
      vv.push(val.value)
      setmcategory(val.value);
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
                console.log(subData)
                setDd({
                  "direct" : dkkk,
                  "indirect" : pkk
                })
                subCategeryData(kk)
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

  //eamil onchange
  const emailHandler = (e) => {
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

      axios({
        method: "POST",
        url: `${baseUrl}/tl/validateregistration`,
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
 
  const checktlPost = (e) => {
  setPostName(e.target.value)
  let a = e.target.value;
  let formData = new FormData();
  formData.append("tlpost", a)

  axios({
    method: "POST",
    url : `${baseUrl}/tl/validateTLPost`,
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
  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <div className="col-md-12 d-flex">
            <div>
              <button
                className="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </div>
            <div className="text-center ml-5">
              <h4>Add New Team Leader</h4>
            </div>
          </div>
        </CardHeader>

        <CardHeader>
          <div className="row mt-3">
            <div className="col-lg-2 col-xl-2 col-md-12"></div>
            <div className="col-lg-8 col-xl-8 col-md-12">
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="row">
                                    <div className="col-md-6">
                    <div className="form-group">
                    <label>Team Leader Post Name <span className="declined">*</span></label>
                      
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_name || posError.exits,
                        })}
                        onBlur={(e) => checktlPost(e)}
                        name="post_name"
                        ref={register}
                      />
                    {posError.available ? 
                    <p className="completed"> {posError.available}</p> : 
                    <p className="declined">{posError.exits}</p>}

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                    <label>Team Leader Post Email <span className="declined">*</span></label>
                    
                   
                    <EmailValidation
                     setWemail = {setWemail}
                      wEmail = {wEmail} 
                      invalid = {invalid}
                       setEmailError = {setEmailError}
                        setValiemail = {setValiemail} 
                        emailError = {emailError} 
                        setInvalid = {setInvalid}  
                        setEmail2 = {setEmail} 
                        name="teamleader"/>
                        
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

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone Number <span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_phone ,
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
                </div>
              
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Category <span className="declined">*</span></label>
                      <Select isMulti options={options}
                        value = {categoryData}
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Sub Category <span className="declined">*</span></label>
                      <Select isMulti options={options2}
                        className={error2 ? "customError" : ""}
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
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Email <span className="declined">*</span></label>
                      <input
                        type="email"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email,
                        })}
                        name="p_email"
                        ref={register}
                       
                      />
                     
                    </div>
                  </div>
                </div>
                {
                loading ?
                  <Spinner color="primary" />
                  :
                <button type="submit" className="customBtn">
                  Submit
                </button> }
              </form>
            </div>
            <div className="col-lg-2 col-xl-2 col-md-12">

            </div>

            <Mandatory />
          </div>
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default AddNew;





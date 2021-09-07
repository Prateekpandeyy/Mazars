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
  const [emailPost, setEmailPost] = useState('');
  const [valiEmail, setValiemail] = useState(null)
  const [valiEmailPost, setValiemailPost] = useState(null)
  const [invalid, setInvalid] = useState(null)
  const [invalidPost, setInvalidPost] = useState(null)
  const [wEmail, setWemail] = useState();
  const [wEmailPost, setWemailPost] = useState();

  const [display, setDisplay] = useState(false);
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
    const postName = async () => {
      await axios.get(`${baseUrl}/admin/addTlPost`).then((res) => {
        if (res.data.code === 1) {
          console.log("myData", res.data.result.post)
          setPostName(res.data.result);
        }
      });
    };

    postName();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      await axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        if (res.data.code === 1) {
          console.log(res.data.result)
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
    console.log((JSON.stringify(dd)))
    var categeryList = []
    var categeryName = []
    var categeryName = []
    var kk = []
    var parentCategoryName = []
    console.log(subData)
    subData.map((i) => {
      console.log(i)
      categeryList.push(i.value)
      categeryName.push(i.label)
    })
    categoryData.map((i) => {
      kk.push(i.value)
      parentCategoryName.push(i.label)
    })
    console.log("subData", subData)
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
      setDisplay(true)
      console.log("ddd", dd)
      let formData = new FormData();

      formData.append("personal_email", value.p_email);
      formData.append("name", value.p_name);
      formData.append("phone", value.p_phone);
      formData.append("type", "tl");
      formData.append("cat_id", categeryList)
      formData.append("post_name", value.post_name)
      formData.append("email", value.post_email)
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
            Swal.fire({
              "title": "Success",
              "html": "Team Leader created successfully.",
              "icon": "success"
            })

            history.goBack();
          }
          if (response.data.code === 0) {
            response.data.message.map((i) => {

            })
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
    console.log("categoryData", dd)
    subCategeryData(e)
    setCustcate2(e)
    setError2("")
    console.log(e)
    console.log("allData", allData1)
    e.map((i) => {

      i.value < 8 ? dir.push(i.label) : indir.push(i.label)
    })
    // allData1 = e.map(v => ({
    //   "direct Tax" : dir,
    //   "indirect Tax" : indir
    // }))
    setDd({
      direct: dir,
      indirect: indir
    })
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
  // EmailHandlerPost1
  const emailHandlerPost = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value.length)
    if (e.target.value.length < 1) {
      setWemailPost("")
    }
  };
  // Email Validation Post 
  //email validaation Post with api
  const emailValidationPost = (key) => {

    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailPost.match(validRegex)) {
      setWemailPost("");
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
            setValiemailPost(response.data.result)
            setInvalidPost('')
          } else if (response.data.code === 0) {
            setInvalidPost(response.data.result)
            setValiemailPost('')
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
    else {
      setWemailPost("invalid email")
    }

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
              <h4>Add New Team Leader</h4>
            </div>
          </div>
        </CardHeader>

        <CardHeader>
          <div class="row mt-3">
            <div class="col-lg-2 col-xl-2 col-md-12"></div>
            <div class="col-lg-8 col-xl-8 col-md-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="row">
                  {/* <div class="col-md-6">
                    <div class="form-group">
                      <label>Post Name</label>
                      <input
                        type="text"
                        name="post_name"
                      
                        className={classNames("form-control", {
                          "is-invalid": errors.post_name,
                        })}
                        ref={register}
                        defaultValue={postValue.post}

                      />

                    </div>
                  </div> */}
                  <div class="col-md-6">
                    <div class="form-group">
                    <label>Teamleader Post Name <span className="declined">*</span></label>
                      
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_name,
                        })}
                        defaultValue={postValue.post}
                        name="post_name"
                        ref={register}
                      />

                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                    <label>Teamleader Post Email <span className="declined">*</span></label>
                    
                   
                      <input
                        type="email"
                        className={classNames("form-control", {
                          "is-invalid": errors.post_email || wEmail || invalid,
                        })}
                        name="post_email"
                        ref={register}
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
                      
                      {/* {
                        wEmailPost ? <p className="declined">{wEmailPost}</p> : <>
                          {valiEmailPost ?
                            <p className="completed">
                              {valiEmailPost}
                            </p>
                            :
                            <p className="declined">{invalidPost}</p>}
                        </>
                      } */}
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
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Email <span className="declined">*</span></label>
                      <input
                        type="email"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email,
                        })}
                        name="p_email"
                        ref={register}
                        // onChange={(e) => emailHandler(e)}
                        // onBlur={emailValidation}
                      />
                      {/* {
                        wEmail ? <p className="declined">{wEmail}</p> : <>
                          {valiEmail ?
                            <p className="completed">
                              {valiEmail}
                            </p>
                            :
                            <p className="declined">{invalid}</p>}
                        </>
                      } */}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Category <span className="declined">*</span></label>
                      <Select isMulti options={options}
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

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
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


// import React, { useState, useEffect } from "react";
// import Layout from "../../../components/Layout/Layout";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import Select from "react-select";
// import Swal from 'sweetalert2';
// import axios from "axios";

// import { baseUrl } from "../../../config/config";
// import { useAlert } from "react-alert";
// import { Card, CardHeader } from "reactstrap";
// import { useHistory } from "react-router-dom";
// import classNames from "classnames";
// import Mandatory from "../../../components/Common/Mandatory";

// const Schema = yup.object().shape({
//   p_name: yup.string().required("required name"),
//   p_email: yup.string().email("invalid email").required("required email"),
//   p_phone: yup
//     .string()
//     .required("required phone no")
//     .matches(/^[0-9]+$/, "Must be only digits")
//     .min(10, "Must be exactly 10 digits")
//     .max(20, "max 20 digits"),

// });


// function AddNew() {
//   const alert = useAlert();
//   const history = useHistory();
//   const { handleSubmit, register, reset, errors } = useForm({
//     resolver: yupResolver(Schema),
//   });

//   const userid = window.localStorage.getItem("adminkey");
//   const [error, setError] = useState()
//   const [error2, setError2] = useState();
//   const [tax, setTax] = useState([]);
//   const [tax2, setTax2] = useState([]);
//   const [nn, setNn] = useState([])
//   const [mcatname, setmcatname] = useState([]);
//   const [mcategory, setmcategory] = useState([]);
//   const [store, setStore] = useState([]);
//   const [subData, subCategeryData] = useState([])
//   const [custCate, setCustcate] = useState([])
//   const [custCate2, setCustcate2] = useState([])
//   const [numExist, setNumExist] = useState(null)
//   const [phone, setPhone] = useState('');
//   const [numAvail, setNumAvail] = useState(null)
//   const [categoryData, setCategoryData] = useState([])
//   const [indNumError, setIndNumError] = useState(null)
//   const [postValue, setPostName] = useState([]);
//   const [email, setEmail] = useState('');
//   const [valiEmail, setValiemail] = useState(null)
//   const [invalid, setInvalid] = useState(null)
//   const [wEmail, setWemail] = useState();
//   const [display, setDisplay] = useState(false);
//   const [dd, setDd] = useState({
//     direct: [],
//     indirect: [],
//   });

//   var kk = []
//   var vv = []



//   const options = tax.map(d => (
//     {
//       "value": d.id,
//       "label": d.details
//     }))

//   const options2 = tax2.map(v => ({
//     "value": v.id,
//     "label": v.details
//   }))


//   useEffect(() => {
//     const postName = async () => {
//       await axios.get(`${baseUrl}/admin/addTlPost`).then((res) => {
//         if (res.data.code === 1) {
//           console.log("myData", res.data.result.post)
//           setPostName(res.data.result);
//         }
//       });
//     };

//     postName();
//   }, []);

//   useEffect(() => {
//     const getCategory = async () => {
//       await axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
//         if (res.data.code === 1) {
//           console.log(res.data.result)
//           setTax(res.data.result);
//         }
//       });
//     };

//     getCategory();
//   }, []);



//   useEffect(() => {
//     const getSubCategory = async () => {

//       await axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {

//         if (res.data.code === 1) {
//           setTax2(res.data.result)
//         }
//       });
//     };
//     getSubCategory();
//   }, [store]);

//   // OnSubmit Function

//   const onSubmit = (value) => {

//     var categeryList = []
//     var categeryName = []
//     var categeryName = []
//     var kk = []
//     var parentCategoryName = []
//     console.log(subData)
//     subData.map((i) => {
//       console.log(i)
//       categeryList.push(i.value)
//       categeryName.push(i.label)
//     })
//     categoryData.map((i) => {
//       kk.push(i.value)
//       parentCategoryName.push(i.label)
//     })
//     console.log("subData", subData)
//     if (custCate.length < 1) {
//       setError("Please select at least one value")
//     }
//     else if (subData.length < 1) {

//       setError2("Please select at least one value")
//     }
//     else if (invalid || wEmail || indNumError) {
//       setDisplay(false)
//     }

//     else {
//       setDisplay(true)
//       console.log("ddd", dd)
//       let formData = new FormData();

//       formData.append("personal_email", value.p_email);
//       formData.append("name", value.p_name);
//       formData.append("phone", value.p_phone);
//       formData.append("type", "tl");
//       formData.append("cat_id", categeryList)
//       formData.append("post_name", postValue.post)
//       formData.append("email", postValue.email)
//       formData.append("pcat_id", kk)
//       formData.append("allpcat_id", parentCategoryName)
//       formData.append("allcat_id", JSON.stringify(dd))



//       axios({
//         method: "POST",
//         url: `${baseUrl}/tl/AddTeamLead`,
//         data: formData,
//       })

//         .then(function (response) {

//           if (response.data.code === 1) {
//             Swal.fire({
//               "title": "Success",
//               "html": "Team Leader created successfully.",
//               "icon": "success"
//             })

//             history.goBack();
//           }
//           if (response.data.code === 0) {
//             response.data.message.map((i) => {

//             })
//           }

//         })
//         .catch((error) => {

//         });
//     }

//   };
// var allData1 = {}
// var dir = []
// var indir = []
//   // Sub Category Function
//   const subCategory = (e) => {
//     console.log("categoryData", dd)
//     subCategeryData(e)
//     setCustcate2(e)
//     setError2("")
//     console.log(e)
//     console.log("allData", allData1)
//     e.map((i) => {

//       i.value > 8 ? dir.push(i.label) : indir.push(i.label)
//     })
//     // allData1 = e.map(v => ({
//     //   "direct Tax" : dir,
//     //   "indirect Tax" : indir
//     // }))
//     setDd({
//       direct: dir,
//       indirect: indir
//     })
//   }


//   // Category Function
//   const category = (v) => {

//     setCategoryData(v)
//     setNn((oldData) => {
//       return [...oldData, mcategory]
//     })
//     setError("")
//     setCustcate(v)
//     v.map((val) => {
//       vv.push(val.value)
//       setmcategory(val.value);
//       setmcatname((oldData) => {
//         return [...oldData, val.label]
//       })
//       setStore(val.value)
//     })


//     if (vv.length > 0) {
//       if (vv.includes("1") && vv.includes("2")) {
//         console.log("hdd")
//       }
//       else if (vv.includes("1")) {

//         for (let i = 0; i < subData.length; i++) {
//           if (subData[i].value < 9) {
//             kk.push(subData[i])
//           }
//         }
//         subCategeryData(kk)
//       }
//       else if (vv.includes("2")) {

//         for (let i = 0; i < subData.length; i++) {
//           if (subData[i].value > 8) {
//             kk.push(subData[i])
//           }
//         }
//         subCategeryData(kk)
//       }
//     }

//     else if (vv.length === 0) {
//       subCategeryData("")
//     }

//   }
//   // Phone onChange 
//   const phoneHandler = (e) => {

//     if (isNaN(e.target.value)) {
//       setIndNumError("")
//       setNumAvail("");
//       setNumExist('Please enter number only')
//       e.target.value = ""
//       setPhone("")
//     }
//     else {
//       setNumAvail("");
//       setNumExist("");
//       setPhone(e.target.value)
//     }
//   };

//   // Phone Validation function 
//   const phoneValidation = () => {
//     console.log(phone.length)
//     if (phone.length > 10) {
//       console.log(phone.length)
//       setNumAvail("")
//       setNumExist("")
//       setIndNumError("Maximum 10 digit should be enter")
//     }
//     else if (phone.length < 10) {
//       console.log(phone.length)
//       setNumAvail("")
//       setNumExist("")
//       setIndNumError("Minimum 10 digit should be enter")
//     }
//     else if (phone.length > 15) {
//       setNumAvail("")
//       setNumExist("")
//       setIndNumError("Maximum 15 digit should be enter")
//     }

//     else {
//       setIndNumError("")

//       let formData = new FormData();
//       formData.append("phone", phone);
//       formData.append("type", 2);
//       axios({
//         method: "POST",
//         url: `${baseUrl}/customers/validateregistration`,
//         data: formData,
//       })
//         .then(function (response) {
//           console.log("res-", response);
//           if (response.data.code === 1) {

//             console.log(response.data.result)
//             setNumExist('')
//             setNumAvail(response.data.result);

//           }
//           else if (response.data.code === 0) {
//             console.log(response.data.result)
//             setNumAvail('')
//             setNumExist(response.data.result)

//             console.log("mobile" + setNumExist)
//           }

//         })
//         .catch((error) => {
//           // console.log("erroror - ", error);
//         });
//     }
//   }

//   //eamil onchange
//   const emailHandler = (e) => {
//     setEmail(e.target.value);
//     console.log(e.target.value.length)
//     if (e.target.value.length < 1) {
//       setWemail("")
//     }
//   };


//   //email validaation with api
//   const emailValidation = (key) => {

//     var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (email.match(validRegex)) {
//       setWemail("");
//       let formData = new FormData();
//       formData.append("email", email);
//       formData.append("type", 1);

//       axios({
//         method: "POST",
//         url: `${baseUrl}/customers/validateregistration`,
//         data: formData,
//       })
//         .then(function (response) {
//           console.log("resEmail-", response);
//           if (response.data.code === 1) {
//             setValiemail(response.data.result)
//             setInvalid('')
//           } else if (response.data.code === 0) {
//             setInvalid(response.data.result)
//             setValiemail('')
//           }
//         })
//         .catch((error) => {
//           console.log("erroror - ", error);
//         });
//     }
//     else {
//       setWemail("invalid email")
//     }

//   }
//  console.log(subData)

//   return (
//     <Layout adminDashboard="adminDashboard" adminUserId={userid}>
//       <Card>
//         <CardHeader>
//           <div class="col-md-12 d-flex">
//             <div>
//               <button
//                 class="btn btn-success ml-3"
//                 onClick={() => history.goBack()}
//               >
//                 <i class="fas fa-arrow-left mr-2"></i>
//                 Go Back
//               </button>
//             </div>
//             <div class="text-center ml-5">
//               <h4>Add New Team Leader</h4>
//             </div>
//           </div>
//         </CardHeader>

//         <CardHeader>
//           <div class="row mt-3">
//             <div class="col-lg-2 col-xl-2 col-md-12"></div>
//             <div class="col-lg-8 col-xl-8 col-md-12">
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <div class="row">
//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Post Name</label>
//                       <input
//                         type="text"
//                         name="post_name"
//                         disabled
//                         className={classNames("form-control", {
//                           "is-invalid": errors.post_name,
//                         })}
//                         ref={register}
//                         value={postValue.post}

//                       />

//                     </div>
//                   </div>

//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Post Email</label>
//                       <input
//                         type="text"
//                         name="post_email"
//                         ref={register}
//                         value={postValue.email}
//                         disabled
//                         className={classNames("form-control", {
//                           "is-invalid": errors.post_email,
//                         })}
//                       />

//                     </div>
//                   </div>
//                 </div>

//                 <div class="row">
//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Name <span className="declined">*</span></label>
//                       <input
//                         type="text"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_name,
//                         })}
//                         name="p_name"
//                         ref={register}
//                       />

//                     </div>
//                   </div>

//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Phone Number <span className="declined">*</span></label>
//                       <input
//                         type="text"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_phone || indNumError,
//                         })}
//                         name="p_phone"
//                         ref={register}
//                         onChange={(e) => phoneHandler(e)}
//                         onBlur={phoneValidation}
//                       />
//                       {indNumError ? <p className="declined">{indNumError}</p> : <>
//                         {
//                           numAvail ?
//                             <p className="completed"> {numAvail}
//                             </p>
//                             :
//                             <p className="declined">{numExist}</p>
//                         }
//                       </>}
//                     </div>
//                   </div>
//                 </div>
//                 <div class="row">
//                   <div class="col-md-12">
//                     <div class="form-group">
//                       <label>Email <span className="declined">*</span></label>
//                       <input
//                         type="email"
//                         className={classNames("form-control", {
//                           "is-invalid": errors.p_email || wEmail || invalid,
//                         })}
//                         name="p_email"
//                         ref={register}
//                         onChange={(e) => emailHandler(e)}
//                         onBlur={emailValidation}
//                       />
//                       {
//                         wEmail ? <p className="declined">{wEmail}</p> : <>
//                           {valiEmail ?
//                             <p className="completed">
//                               {valiEmail}
//                             </p>
//                             :
//                             <p className="declined">{invalid}</p>}
//                         </>
//                       }
//                     </div>
//                   </div>
//                 </div>
//                 <div class="row">
//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Category <span className="declined">*</span></label>
//                       <Select isMulti options={options}
//                         className={error ? "customError" : ""}
//                         onChange={category}>
//                       </Select>


//                     </div>
//                   </div>
//                   <div class="col-md-6">
//                     <div class="form-group">
//                       <label>Sub Category <span className="declined">*</span></label>
//                       <Select isMulti options={options2}
//                         className={error2 ? "customError" : ""}
//                         onChange={subCategory}
//                         styles={{
//                           option: (styles, { data }) => {
//                             return {
//                               ...styles,
//                               color: data.value > 8
//                                 ? "green"
//                                 : "blue"
//                             };
//                           },
//                           multiValueLabel: (styles, { data }) => ({
//                             ...styles,
//                             color: data.value > 8
//                                 ? "green"
//                                 : "blue"
//                           }),
//                         }}

//                         value={subData}>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   Submit
//                 </button>
//               </form>
//             </div>
//             <div class="col-lg-2 col-xl-2 col-md-12">

//             </div>

//             <Mandatory />
//           </div>
//         </CardHeader>
//       </Card>
//     </Layout>
//   );
// }

// export default AddNew;



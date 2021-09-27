import { useForm, useFieldArray } from "react-hook-form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import Select from "react-select";
import './style.css'
import { Spinner } from "reactstrap";
import Swal from "sweetalert2";
import { purpose } from "./data";
import Layout from "../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  Row,
  Col,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import Mandatory from "../../components/Common/Mandatory";
import classNames from "classnames";
import Loader from "../../components/Loader/Loader";



function AddFreshAssingment(props) {
  const alert = useAlert();
  const history = useHistory();
  const { handleSubmit, register, errors, reset, control } = useForm({
    defaultValues: {
      users: [{ query: "" }],
    },
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: "users",
  });
  const userId = window.localStorage.getItem("userid");
  const category = window.localStorage.getItem("category");
  const userNameId = window.localStorage.getItem("name");
  const [custcheckError, setCheckerror] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [purposeOption, setPurposeOption] = useState([]);
  const [custError, setcustError] = useState([])
  const [assessmentYear, setAssessmentYear] = useState([]);


  const [load, setLoad] = useState(false);
  const [selectError, setSelectError] = useState()


  const remError = () => {
    setCheckerror("")
  }
  const valiFun = (e) => {
    setcustError("")
  }
  const purPoseQuery = (e) => {
    setSelectError("")
    setPurposeOption(e)
  }

  useEffect(() => {
    getAssementYear();
  }, []);


  const getAssementYear = () => {
    axios
      .get(`${baseUrl}/customers/getAssesmentYear`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setAssessmentYear(res.data.result);
        }
      });
  };


  const onSubmit = (value) => {
    console.log(value)

    const a = value.p_fact;
    const b = value.users;
    if (a == '') {
      setcustError("");
      console.log(b)
    }
    else if (purposeOption < 1) {
      setSelectError("At least one value should be enter")
    }
    else if (value.p_format_word === false && value.p_format_digital === false && value.p_format_physically === false) {
      console.log("catch")
      setCheckerror("Please select at least one.")
    }

    else {
      setLoad(true);
      let formData = new FormData();

      var uploadImg = value.upload;
      if (uploadImg) {
        for (var i = 0; i < uploadImg.length; i++) {
          console.log("pics", value.upload[i].pics[0]);
          let a = value.upload[i].pics[0];
          formData.append("upload_1[]", a);
        }
      }

      formData.append("fact", value.p_fact);
      formData.append("specific", JSON.stringify(value.users));
      formData.append("timelines", value.p_timelines);
      formData.append("user", JSON.parse(userId));
      formData.append("cid", JSON.parse(category));
      formData.append("softcopy_word", Number(value.p_format_word));
      formData.append(
        "softcopy_digitally_assigned",
        Number(value.p_format_digital)
      );
      formData.append(
        "printout_physically_assigned",
        Number(value.p_format_physically)
      );
      formData.append("case_name", value.p_case_name);
      formData.append("assessment_year", JSON.stringify(selectedOption));
      formData.append("purpose", JSON.stringify(purposeOption));
      axios
        .post(`${baseUrl}/customers/PostQuestion`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            reset();
            var message = response.data.message
            var query_no = response.data.query_no
            if (message == "") {
              Swal.fire({
                title: 'Success !',
                html: `<p>Query no.- ${query_no} submitted successfully.
                 Mazars team will contact you shortly.
                </p>`,
                icon: 'success',
              })
            } else if (message.invalid) {
              Swal.fire({
                title: 'Error !',
                html: `<p class="text-danger">${message.invalid}</p>`,
              })
            }
            else if (message.faill) {
              Swal.fire({
                title: 'Success !',
                html: `<p>Query no.- ${query_no} submitted successfully.
                 Mazars team will contact you shortly.
                </p> 
                <br/><p class="text-danger">${message.faill}</p>`,
                icon: 'success',
              })
            }
            props.history.push("/customer/queries");
          } else {
            setLoad(false);
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
  };


  return (
    <>
      <Layout custDashboard="custDashboard" custUserId={userId}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="4">
                <button class="btn btn-success" onClick={() => history.goBack()}>
                  <i class="fas fa-arrow-left mr-2"></i>
                  Go Back
                </button>
              </Col>
              <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ fontSize: "20px" }}>Add Fresh Query</p>
              </Col>
            </Row>

          </CardHeader>
          {load ? (
            <Loader />
          ) : (
            <div className="container">
              <div class="col-xl-8 col-lg-8 col-md-12 py-4">

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Facts of the case <span className="declined">*</span></label>
                        <textarea
                          className={classNames("form-control", {
                            "is-invalid": errors.p_fact,
                          })}
                          id="textarea"
                          rows="6"
                          name="p_fact"
                          onChange={valiFun}
                          ref={register({ required: true })}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="question_query mb-2">
                        <label className="form-label">
                          Specific Questions for advisory <span className="declined">*</span>
                        </label>
                        <div
                          className="btn btn-primary"
                          onClick={() => append({ query: "" })}
                        >
                          +
                        </div>
                      </div>

                      {fields.length > 0 &&
                        fields.map((item, index) => (
                          <div
                            className="question_query_field mb-2"
                            key={index}
                          >
                            <input
                              type="text"
                              className={classNames("form-control", {
                                "is-invalid": errors.users,
                              })}
                              ref={register({ required: true })}
                              name={`users[${index}].query`}
                              placeholder="Specify your query"
                              defaultValue={`${item.query}`}
                            />
                            <div
                              className="btn btn-primary ml-2"
                              onClick={() => remove(index)}
                            >
                              -
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Case name</label>
                        <input
                          type="text"
                          name="p_case_name"
                          ref={register}

                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Assessment year</label>
                        <Select
                          closeMenuOnSelect={false}
                          onChange={setSelectedOption}
                          isMulti
                          options={assessmentYear}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <ImageUploads register={register} control={control} />
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Format in which Opinion is required <span className="declined">*</span>
                        </label>
                        <br />
                        <div className="form-check">
                          <input
                            id="a1"
                            className={classNames("form-check-input", {
                              "is-invalid": errors.p_format_word,
                            })}
                            ref={register}
                            type="checkbox"
                            name="p_format_word"
                            onChange={remError}
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="a1">
                            Softcopy - Word/ Pdf
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            id="a2"
                            className="form-check-input"
                            type="checkbox"
                            name="p_format_digital"
                            ref={register}
                            onChange={remError}
                          />
                          <label className="form-check-label" htmlFor="a2">
                            SoftCopy- Digitally Signed
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            id="a3"
                            className="form-check-input"
                            type="checkbox"
                            name="p_format_physically"
                            ref={register}
                            onChange={remError}
                          />
                          <label className="form-check-label" htmlFor="a3">
                            Printout- Physically Signed
                          </label>
                        </div>
                        <p className="declined">{custcheckError}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Timelines within which Opinion is Required
                        </label>
                        <br />
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="p_timelines"
                            ref={register}
                            value="Urgent, (4-5 Working Days)"

                          />
                          <label>Urgent, (4-5 Working Days)</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="p_timelines"
                            ref={register}
                            value="Regular (10-12 Working Days)"
                            defaultChecked
                          />
                          <label>Regular (10-12 Working Days)</label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Purpose for which Opinion is sought <span className="declined">*</span>
                        </label>
                        <Select
                          closeMenuOnSelect={false}
                          className={selectError ? "customError" : ""}
                          onChange={purPoseQuery}
                          isMulti
                          options={purpose}
                        />

                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>

              </div>
              <Mandatory />
            </div>
          )}
        </Card>
      </Layout>
    </>
  );
}

export default AddFreshAssingment;



const ImageUploads = ({ register, control }) => {
  const { append, fields, remove } = useFieldArray({
    control,
    name: "upload",
  });
  return (
    <>
      <div className="question_query mb-2">
        <label className="form-label">Upload Your Document</label>
        <div className="btn btn-primary" onClick={() => append({ pics: "" })}>
          +
        </div>
      </div>

      {fields.map((item, index) => (
        <div className="question_query_field mb-2" key={index}>
          <input
            type="file"
            name={`upload[${index}].pics`}
            ref={register()}
            className="form-control-file manage_file"
            defaultValue={item.pics}
          />
          <div className="btn btn-primary ml-2" onClick={() => remove(index)}>
            -
          </div>
        </div>
      ))}
    </>
  );
};


// import { useForm, useFieldArray } from "react-hook-form";
// import React, { useState, useEffect } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import { baseUrl } from "../../config/config";
// import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { useAlert } from "react-alert";
// import Select from "react-select";
// import { Spinner } from "reactstrap";
// import Alerts from "../../common/Alerts";
// import Swal from "sweetalert2";
// import { purpose, assessment_year } from "./data";
// import Layout from "../../components/Layout/Layout";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Row,
//   Col,
//   Table,
// } from "reactstrap";
// import { useHistory } from "react-router-dom";
// import Mandatory from "../../components/Common/Mandatory";
// import classNames from "classnames";



// function AddFreshAssingment(props) {
//   const alert = useAlert();
//   const history = useHistory();
//   const { handleSubmit, register, errors, reset, control } = useForm({
//     defaultValues: {
//       users: [{ query: "" }],
//     },
//   });

//   const { append, remove, fields } = useFieldArray({
//     control,
//     name: "users",
//   });
//   const userId = window.localStorage.getItem("userid");
//   const category = window.localStorage.getItem("category");
//   const userNameId = window.localStorage.getItem("name");

//   const [selectedOption, setSelectedOption] = useState([]);
//   const [purposeOption, setPurposeOption] = useState([]);
//   const [custError, setcustError] = useState([])

//   const [load, setLoad] = useState(false);
//   const [selectError, setSelectError] = useState()


//   const valiFun = (e) => {
//     setcustError("")
//   }

//   const purPoseQuery = (e) => {
//     setSelectError("")
//     setPurposeOption(e)
//   }


//   const onSubmit = (value) => {
//     console.log("value :", value);

//     // if (setPurposeOption == '') {
//     //   setSelectError("man")
//     // }
//     // if (selectedOption == '') {
//     //   setSelectError("man")
//     // }
//     // else {
//     //   setSelectError("man")
//     // }


//     setLoad(true);
//     let formData = new FormData();

//     var uploadImg = value.upload;
//     if (uploadImg) {
//       for (var i = 0; i < uploadImg.length; i++) {
//         console.log("pics", value.upload[i].pics[0]);
//         let a = value.upload[i].pics[0];
//         formData.append("upload_1[]", a);
//       }
//     }

//     formData.append("fact", value.p_fact);
//     formData.append("specific", JSON.stringify(value.users));
//     formData.append("timelines", value.p_timelines);
//     formData.append("user", JSON.parse(userId));
//     formData.append("cid", JSON.parse(category));
//     formData.append("softcopy_word", Number(value.p_format_word));
//     formData.append(
//       "softcopy_digitally_assigned",
//       Number(value.p_format_digital)
//     );
//     formData.append(
//       "printout_physically_assigned",
//       Number(value.p_format_physically)
//     );
//     formData.append("case_name", value.p_case_name);
//     formData.append("assessment_year", JSON.stringify(selectedOption));
//     formData.append("purpose", JSON.stringify(purposeOption));


//     axios
//       .post(`${baseUrl}/customers/PostQuestion`, formData, {
//         headers: {
//           "content-type": "multipart/form-data",
//         },
//       })
//       .then(function (response) {
//         console.log("res-", response);
//         if (response.data.code === 1) {
//           reset();
//           var message = response.data.message
//           var query_no = response.data.query_no
//           if (message == "") {
//             Swal.fire(
//               "Success",
//               `Query successfully added.`,
//               "success"
//             )
//           } else if (message.invalid) {
//             Swal.fire({
//               title: 'Error !',
//               html: `<p class="text-danger">${message.invalid}</p>`,
//             })
//           } else if (message.faill && message.success) {
//             Swal.fire({
//               title: 'Success',
//               html: `<p class="text-danger">${message.faill}</p> <br/> <p>${message.success}</p> `,
//               icon: 'success',
//             })
//           } else if (message.success) {
//             Swal.fire({
//               title: 'Success',
//               html: `<p>Query no.- ${query_no} has been submitted successfully. Mazars team will contact you shortly.
//               </p> <br/>
//                <p>${message.success}</p>`,
//               icon: 'success',
//             })
//           }
//           else if (message.faill) {
//             Swal.fire({
//               title: 'Error !',
//               html: `<p class="text-danger">${message.faill}</p>`,
//               icon: 'error',
//             })
//           }

//           props.history.push("/customer/dashboard");
//         } else {
//           setLoad(false);
//         }
//       })
//       .catch((error) => {
//         console.log("erroror - ", error);
//       });

//   };


//   return (
//     <>
//       <Layout custDashboard="custDashboard" custUserId={userId}>
//         <Card>
//           <CardHeader>
//             <Row>
//               <Col md="4">
//                 <button class="btn btn-success" onClick={() => history.goBack()}>
//                   <i class="fas fa-arrow-left mr-2"></i>
//                   Go Back
//                 </button>
//               </Col>
//               <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
//                 <p style={{ fontSize: "20px" }}>Add Fresh Query</p>
//               </Col>
//             </Row>
//           </CardHeader>
//           <div className="container">

//             <div class="col-xl-8 col-lg-8 col-md-12 py-4">
//               {load ? (
//                 <Spinner size="sm" color="primary" />
//               ) : (
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label className="form-label">Facts of the case <span className="declined">*</span></label>
//                         <textarea
//                           className={classNames("form-control", {
//                             "is-invalid": errors.p_fact,
//                           })}
//                           id="textarea"
//                           rows="6"
//                           name="p_fact"
//                           onChange={valiFun}
//                           ref={register({ required: true })}
//                         ></textarea>

//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="question_query mb-2">
//                         <label className="form-label">
//                           Specific Questions for advisory <span className="declined">*</span>
//                         </label>
//                         <div
//                           className="btn btn-primary"
//                           onClick={() => append({ query: "" })}
//                         >
//                           +
//                         </div>
//                       </div>

//                       {fields.length > 0 &&
//                         fields.map((item, index) => (
//                           <div>
//                             {fields.length < 5 ? (
//                               <div
//                                 className="question_query_field mb-2"
//                                 key={index}
//                               >
//                                 <input
//                                   type="text"
//                                   className={classNames("form-control", {
//                                     "is-invalid": errors.users,
//                                   })}
//                                   ref={register({ required: true })}
//                                   name={`users[${index}].query`}
//                                   placeholder="Specify your query"
//                                   defaultValue={`${item.query}`}
//                                 />
//                                 <div
//                                   className="btn btn-primary ml-2"
//                                   onClick={() => remove(index)}
//                                 >
//                                   -
//                                 </div>
//                               </div>
//                             ) : null}
//                           </div>
//                         ))}
//                     </div>

//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label className="form-label">Case name</label>
//                         <input
//                           type="text"
//                           name="p_case_name"
//                           ref={register}

//                           className="form-control"
//                         />

//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label className="form-label">Assessment year</label>
//                         <Select
//                           closeMenuOnSelect={false}
//                           onChange={setSelectedOption}
//                           isMulti
//                           options={assessment_year}
//                         />

//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <ImageUploads register={register} control={control} />
//                     </div>

//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label className="form-label">
//                           Format in which Opinion is required <span className="declined">*</span>
//                         </label>
//                         <br />
//                         <div className="form-check">
//                           <input
//                             className={classNames("form-check-input", {
//                               "is-invalid": errors.p_format_word,
//                             })}
//                             type="checkbox"
//                             name="p_format_word"
//                             ref={register({ required: true })}
//                             defaultChecked
//                           />
//                           <label className="form-check-label">
//                             Softcopy - Word/ Pdf
//                           </label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             name="p_format_digital"
//                             ref={register}

//                           />
//                           <label className="form-check-label">
//                             SoftCopy- Digitally Signed
//                           </label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             name="p_format_physically"
//                             ref={register}

//                           />
//                           <label className="form-check-label">
//                             Printout- Physically Signed
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label className="form-label">
//                           Timelines within which Opinion is Required
//                         </label>
//                         <br />
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name="p_timelines"
//                             ref={register}
//                             value="Urgent, (4-5 Working Days)"

//                           />
//                           <label>Urgent, (4-5 Working Days)</label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name="p_timelines"
//                             ref={register}
//                             value="Regular (10-12 Working Days)"
//                             defaultChecked
//                           />
//                           <label>Regular (10-12 Working Days)</label>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label className="form-label">
//                           Purpose for which Opinion is sought <span className="declined">*</span>
//                         </label>
//                         <Select
//                           closeMenuOnSelect={false}
//                           onChange={purPoseQuery}
//                           isMulti
//                           options={purpose}
//                           className={classNames("form-check-input", {
//                             "is-invalid": selectError,
//                           })}
//                         />
//                         <p style={{ "color": "red" }}>{selectError}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <button type="submit" className="btn btn-primary">
//                     Submit
//                   </button>
//                 </form>
//               )}
//             </div>
//             <Mandatory />

//           </div>

//         </Card>
//       </Layout>
//     </>
//   );
// }

// export default AddFreshAssingment;



// const ImageUploads = ({ register, control }) => {
//   const { append, fields, remove } = useFieldArray({
//     control,
//     name: "upload",
//   });
//   return (
//     <>
//       <div className="question_query mb-2">
//         <label className="form-label">Upload Your Document</label>
//         <div className="btn btn-primary" onClick={() => append({ pics: "" })}>
//           +
//         </div>
//       </div>

//       {fields.map((item, index) => (
//         <div className="question_query_field mb-2" key={index}>
//           <input
//             type="file"
//             name={`upload[${index}].pics`}
//             ref={register()}
//             className="form-control-file manage_file"
//             defaultValue={item.pics}
//           />
//           <div className="btn btn-primary ml-2" onClick={() => remove(index)}>
//             -
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };






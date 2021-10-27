import { useForm, useFieldArray } from "react-hook-form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import Select from "react-select";
import './style.css'
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
import { Spinner } from 'reactstrap';
import ShowError from "../../components/LoadingTime/LoadingTime";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PublishIcon from '@material-ui/icons/Publish';

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
  // const userNameId = window.localStorage.getItem("name");
  const [custcheckError, setCheckerror] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [purposeOption, setPurposeOption] = useState([]);
  const [custError, setcustError] = useState([])
  const [assessmentYear, setAssessmentYear] = useState([]);
  const [det, addDet] = useState();

  const [loading, setLoading] = useState(false);
  const [selectError, setSelectError] = useState()


  const remError = () => {
    setCheckerror("")
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

        if (res.data.code === 1) {
          setAssessmentYear(res.data.result);
        }
      });
  };


  const onSubmit = (value) => {
   
    const a = value.p_fact;
    const b = value.users;
    if (a == '') {
      setcustError("");
     
    }
    else if (purposeOption < 1) {
      setSelectError("At least one value should be enter")
    }
    else if (value.p_format_word === false && value.p_format_digital === false && value.p_format_physically === false) {
    
      setCheckerror("Please select at least one.")
    }

    else {
      setLoading(true);
      let formData = new FormData();
      var uploadImg = value.uploadImg;
      if (uploadImg) {
        for (var i = 0; i < uploadImg.length; i++) {
          let file = uploadImg[i];
          formData.append("upload_1[]", file);
        }
      }
   
      formData.append("fact", det);
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
            // 'Authorization': 'JWT fefege...'
          },
        })
        .then(function (response) {
       
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
            ShowError.LoadingError(setLoading)
            setLoading(false);
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         
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
         
            <div className="container">
              <div class="col-xl-12 col-lg-12 col-md-12 py-4">

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Brief fact of the case <span className="declined">*</span></label>

{/*                       
                        <CKEditor
                     editor={ ClassicEditor }
                    className={classNames("form-control", {
                      "is-invalid": errors.p_fact,
                    })}
                    id="textarea"
                    rows=""
                    name="p_fact"
                    onChange={ ( event, editor ) => {
                      addDet(editor.getData());
                      setcustError("")
                    
                  } }
                    ref={register({ required: true })}
                /> */}
                  <CKEditor
                     editor={ ClassicEditor }
                    className={classNames("form-control", {
                      "is-invalid": errors.p_fact,
                    })}
                    id="textarea22"
                    rows="6"
                    name="p_fact"
                
                    onChange={ ( event, editor ) => {
                      addDet(editor.getData());
                      setcustError("")
                    
                  } }

                ></CKEditor>
                      </div>
                    </div>
</div>
<div className="row">
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
                        Purpose of the query <span className="declined">*</span>
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

                 
                  {
                      loading ?
                        <Spinner color="primary" />
                        :
                        <button className="btn btn-success" type="submit">
                         Submit
                        </button>
                    }
                </form>

              </div>
              <Mandatory />
            </div>
        
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
        <div className="btn" onClick={() => append({ pics: "" })}>
        <PublishIcon color="secondary" />
        </div>
      </div>

      {fields.map((item, index) => (
    <>
    {index === 0 ? 
      <div className="question_query_field mb-2" key={index}>
      
      
     
       <input
            type="file"
            // name={`upload[${index}].pics`}
            name= "uploadImg"
            ref={register}
            className="form-control-file manage_file"
            multiple
            defaultValue={item.pics}
          />
      <div className="btn btn-primary ml-2" onClick={() => remove(index)}>
        -
      </div>
    
    </div> : ""}
  
    </>
      ))}
    </>
  );
};

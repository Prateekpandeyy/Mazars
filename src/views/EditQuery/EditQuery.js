import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useHistory, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { baseUrl, ImageUrl } from "../../config/config";
import { Card, CardHeader, Row, Col } from "reactstrap";
import Select from "react-select";
import DeleteQuery from "./DeleteQuery";
import Swal from "sweetalert2";
import Mandatory from "../../components/Common/Mandatory";
import classNames from "classnames";
import ShowError from "../../components/LoadingTime/LoadingTime";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PublishIcon from '@material-ui/icons/Publish';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
function EditQuery(props) {

  const history = useHistory();
  const { id } = useParams();
  
  const { handleSubmit, register, errors, reset, control, setValue } = useForm({
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
  const [loading, setLoading] = useState(false);
  const [custcheckError, setCheckerror] = useState(null);
  const [queryDocs, setQueryDocs] = useState([]);
 const [qno, setQno] = useState()
  const [selectedOption, setSelectedOption] = useState("");
  const [purposeOption, setPurposeOption] = useState([]);
  const [selectError, setSelectError] = useState()
  const [assessmentYear, setAssessmentYear] = useState([]);
    const [value2 , setValue2] = useState();
    const [val3, setVal3] = useState()
    const [uploadOrDownloadCount, setUploadOrDownloadCount] = useState(10);
    const token = window.localStorage.getItem("clientToken")
    const myConfig = {
      headers : {
       "uit" : token
      }
    }
  const purPoseQuery = (e) => {
    setSelectError("")
    setPurposeOption(e)

  }
  const remError = () => {
    setCheckerror("")
  }
 
  useEffect(() => {
    getAssementYear();
    getQuery();
   
  }, []);

 
  const getAssementYear = () => {
    axios
      .get(`${baseUrl}/customers/getAssesmentYear`, myConfig)
      .then((res) => {
     
        if (res.data.code === 1) {
          setAssessmentYear(res.data.result);
        }
      });
  };
  const getQuery = () => {
    axios.get(`${baseUrl}/customers/getQueryDetails?id=${id}`, myConfig).then((res) => {

      if (res) {
        var specific = res.data.result[0].specific_query;
        if (specific == "undefined") {
        } else var sepData = JSON.parse(specific);
        reset({
          users: sepData,
        });
         setQno(res.data.result[0].assign_no)
        var value = res.data.result[0].assessment_year;
        var purposeItem = res.data.result[0].purpose_opinion;


        try {
         
          var myPurpose = JSON.parse(purposeItem);

         
          setPurposeOption(myPurpose);
        } catch (e) {
          
        }
        try {
          var myObj = JSON.parse(value);
         

          setSelectedOption(myObj);
        
        } catch (e) {
          
        }
       
        setValue2(res.data.result[0].fact_case);
     
      //  setValue("fact_case", res.data.result[0].fact_case);
        setValue("case_name", res.data.result[0].case_name);
        setValue("p_Softcopy_word", Boolean(+res.data.result[0].softcopy_word));
        setValue(
          "p_Softcopy_digital",
          Boolean(+res.data.result[0].softcopy_digitally_assigned)
        );
        setValue(
          "p_Softcopy_physical",
          Boolean(+res.data.result[0].printout_physically_assigned)
        );
        setValue("p_timelines", res.data.result[0].Timelines);
        setQueryDocs(res.data.queries_document);
      }
    });
  };

  const onSubmit = (value) => {
  
    
    if (purposeOption < 1) {
      setSelectError("At least one value should be enter")
    }
    else if (value.p_Softcopy_word === false && value.p_Softcopy_digital === false && value.p_Softcopy_physical === false) {
    
      setCheckerror("Please select at least one.")
    }
    else {
      const timer = setInterval(() => {
        setUploadOrDownloadCount(
          (beforeValue) => (beforeValue >= 90 ? 90 
                            : beforeValue + 10));
      }, 800);
      setLoading(true)
     

      var uploadImg = value.uploadImg;
      if(uploadImg === undefined){
        uploadImg = 0;
      }
      let formData = new FormData();
     
      if (uploadImg) {
        for (var i = 0; i < uploadImg.length; i++) {
          let file = uploadImg[i];
          formData.append("upload_1[]", file);
        }
      }
   
      formData.append("fact", value2);
      formData.append("specific", JSON.stringify(value.users));
      formData.append("timelines", value.p_timelines);
      formData.append("user", JSON.parse(userId));
      formData.append("id", id);
      formData.append("cid", JSON.parse(category));
      formData.append("softcopy_word", Number(value.p_Softcopy_word));
      formData.append(
        "softcopy_digitally_assigned",
        Number(value.p_Softcopy_digital)
      );
      formData.append(
        "printout_physically_assigned",
        Number(value.p_Softcopy_physical)
      );
      formData.append("case_name", value.case_name);
      {selectedOption ? 
        formData.append("assessment_year", JSON.stringify(selectedOption)) :
        formData.append("assessment_year", selectedOption)}
      formData.append("purpose", JSON.stringify(purposeOption));

      axios
        .post(`${baseUrl}/customers/PostEditQuestion`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            uit : token
          },
        })
        .then(function (response) {

          if (response.data.code === 1) {
            setUploadOrDownloadCount(100)
            var message = response.data.message
            if (message == "") {
              Swal.fire(
                "Success",
                `Query updated successfully.`,
                "success"
              )
            } else if (message.invalid) {
              Swal.fire({
                title: 'Error !',
                html: `<p class="text-danger">${message.invalid}</p>`,
              })
            }
            else if (message.faill) {
              Swal.fire({
                title: 'Success !',
                html: `<p>Query Updated Successfully.</p>
                <br/><p class="text-danger"> ${message.faill}</p>`,
                icon: 'success',
              })
            }
            props.history.push("/customer/queries");
          } else {
            setLoading(true)
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
        });
    }
  };

 
  
  const downloadpdf = (qno, qid, name) => {
   
    const myConfig2 = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
    axios.get(`${baseUrl}/customers/viewdocument?assign_no=${qno}&id=${qid}` , myConfig2)
    .then((res) => {
     
      if(res.status === 200){
        window.URL = window.URL || window.webkitURL;
           var url = window.URL.createObjectURL(res.data);
           var a = document.createElement("a");
           document.body.appendChild(a);
           a.style = "display: none";
           a.href = url;
           console.log(res.headers)
           a.download = name;
           a.target = '_blank';
           a.click();
      }
    })
   }


  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button class="autoWidthBtn" onClick={() => history.goBack()}>
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "20px" }}>Update Query - {qno}</p>
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "flex-end" }}>
              <DeleteQuery id={id} setLoading={setLoading}/>
            </Col>
          </Row>
         
        </CardHeader>

        <CardHeader>
         
            <div className="container-fluid">
              <div class="col-xl-12 col-lg-12 col-md-12 py-4">

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Brief facts of the case<span className="declined">*</span></label>
                     
                        <CKEditor
                     editor={ ClassicEditor }
                 
                    className={classNames("form-control", {
                      "is-invalid": errors.p_fact,
                    })}
                    id="textarea22"
                    rows="6"
                    name="p_fact"
                   data={value2}
                    onChange={ ( event, editor ) => {
                      setValue2(editor.getData());
                      // setcustError("")
                    
                  } }
                    //ref={register({ required: true })}
                >
                  
                  </CKEditor>
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
                          className="btn queryPlusIcon"
                          onClick={() => append({ query: "" })}
                        >
                          +
                        </div>
                      </div>

                      {fields.map((item, index) => (
                        <div className="question_query_field mb-2" key={item.id}>
                          <input
                            type="text"
                            className={classNames("form-control", {
                              "is-invalid": errors.users,
                            })}
                            ref={register}
                            name={`users[${index}].query`}
                            defaultValue={`${item.query}`}
                            placeholder="Specify your query"
                            ref={register({ required: true })}
                          />
                          <div
                            className="btn queryPlusIcon ml-2"
                            onClick={() => remove(index)}
                          >
                            -
                          </div>
                        </div>
                      ))}
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
                          value={purposeOption}
                          isMulti
                          options={purpose}
                        />
                      </div>
                     
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Assessment year</label>

                        <Select
                          closeMenuOnSelect={false}
                          onChange={setSelectedOption}
                          value={selectedOption}
                          isMulti
                          options={assessmentYear}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <ImageUploads register={register} control={control} />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Format in which Opinion is required
                        </label>
                        <br />
                        <div className="form-check">
                          <input
                            id="a1"
                            className="form-check-input"
                            type="checkbox"
                            onChange={remError}
                            name="p_Softcopy_word"
                            ref={register}
                          />
                          <label className="form-check-label" htmlFor="a1">
                            Softcopy - Word/ Pdf
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            id="a2"
                            className="form-check-input"
                            onChange={remError}
                            type="checkbox"
                            name="p_Softcopy_digital"
                            ref={register}
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
                            onChange={remError}
                            name="p_Softcopy_physical"
                            ref={register}
                          />
                          <label className="form-check-label" htmlFor="a3">
                            Printout- Physically Signed
                          </label>
                        </div>
                        <p className="declined">{custcheckError}</p>  </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Timelines within which Opinion is required
                        </label>
                        <br />
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="p_timelines"
                            ref={register}
                            value="Urgent"
                          // disabled
                          />
                          <label>Urgent</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="p_timelines"
                            ref={register}
                            value="Regular"
                          // disabled
                          />
                          <label>Regular </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Display Documents</label>
                        <br />

                        <>
                          <div>
                            {queryDocs.map((p, i) => (
                              <ul style={{listStyle : "none"}}>
                                <li>
                                <span onClick={() => downloadpdf(p.assign_no, p.id, p.name)} style={{display : "flex", cursor : "pointer"}}>
                     <i className="fa fa-photo"></i>
                     <span style={{ marginLeft: "10px" }}>{p.name}</span>
                       </span>
                                  {/* <a
                                    href={`${ImageUrl}/${p.assign_no}/${p.name}`}
                                    target="_blank"
                                  >
                                  <em>
                                    {++i}
                                    </em>  <i
                                      class="fa fa-photo"
                                      style={{ width: "50", height: "20" }}
                                    ></i>
                                    <span style={{ marginLeft: "10px" }}>{p.name}</span>
                                  </a> */}
                                </li>
                              </ul>
                            ))}

                          </div>
                        </>
                      </div>
                    </div>

                    <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Case name</label>
                        <input
                          type="text"
                          name="case_name"
                          ref={register}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  {
                      loading ?
                      <Box position="relative" display="inline-flex">
                      <CircularProgress variant="determinate" 
                                        value={uploadOrDownloadCount} />
                      <Box
                        bottom={0}
                        right={0}
                        top={0}
                        justifyContent="center"
                        left={0}
                        display="flex"
                        alignItems="center"
                        position="absolute"
                      >
                        {`${Math.round(uploadOrDownloadCount)}%`}
                      </Box>
                    </Box>
                            
                        :
                        <button className="customBtn" type="submit">
                          Update
                        </button>
                    }
                </form>

              </div>

              <Mandatory />
            </div>
       
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default EditQuery;

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
          name= "uploadImg"
          multiple={true}
          ref={register()}
          className="form-control-file manage_file"
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


const purpose = [
  { value: "Assessment", label: "Assessment" },
  { value: "Appeal", label: "Appeal" },
  { value: "Filing before any Court", label: "Filing before any Court" },
  {
    value: "Filing before any Authority",
    label: "Filing before any Authority",
  },
  { value: "Others", label: "Others" },
];


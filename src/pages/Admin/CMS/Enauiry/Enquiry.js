import React, { useState, useEffect } from "react";
import Layout from "../../../../components/Layout/Layout";
import { Container } from "@material-ui/core";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import CustomHeading from "../../../../components/Common/CustomHeading";
import AddEditor from "../AddEditor";
import { DatePicker, Space } from "antd";
import axios from "axios";
import { baseUrl } from "../../../../config/config";
import Select from "react-select";
import moment from "moment";
import Swal from "sweetalert2";
import DropDown from "../../../../components/Common/DropDown";
import EnqTemp from "./mazaremailtemp/EnqTemp";
import CustomQuillEditor from "../CustomQuillEditor";
import directGif from "./mazaremailtemp/images/directax.gif";
import indirectGif from "./mazaremailtemp/images/indirextax.gif";
import otherGif from "./mazaremailtemp/images/othertax.gif";
const { RangePicker } = DatePicker;
const Schema = yup.object().shape({
  message_type: yup.string().required(""),
  p_message: yup.string().required(""),
  p_to: yup.string().required(""),
});

const Enquiry = (props) => {
  let history = useHistory();
  var minimum = moment.now();
  let previousDay = moment().subtract(1, "days");
  const [options, setOptions] = useState([]);
  const [type, setType] = useState("");
  const [email, setEmail] = useState([]);
  const [emailValue, setEmailValue] = useState([]);
  const [subject, setSubject] = useState("");
  const [schDate, setSchData] = useState("");
  const [selectType, setSelectType] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [templeteType, setTempleteType] = useState("1");
  const [showTemplete, setShowTemplete] = useState(false);
  const [min, setMin] = useState(moment.now());
  const [templeteData, setTempleteData] = useState({
    direct: "",
    inDirect: "",
    other: "",
  });
  const [content, setContent] = useState("");

  const { handleSubmit, register, errors, reset } = useForm({});
  const token = localStorage.getItem("token");
  const userId = window.localStorage.getItem("cmsId");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const getEmail = (e) => {
    setEmail([]);
    setEmailValue([]);
    setType(e);
    let formData = new FormData();
    formData.append("type", e);
    axios({
      method: "POST",
      url: `${baseUrl}/cms/emaillist`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      console.log("response", res);
      let val = [];
      if (res.data.code === 1) {
        res.data.result.map((i) => {
          let kk = {
            label: i.email,
            value: i.email,
          };
          val.push(kk);
        });
        setOptions(val);
      }
    });
  };
  const onSubmit = (value) => {
    let formData = new FormData();
    var myEditor = document.querySelector("#snow-container");
    var html = myEditor.children[0].innerHTML;

    if (myEditor.children[0].innerHTML.trim() === "<p><br></p>") {
      Swal.fire({
        html: "Message box could not be empty, please enter proper message",
      });
    } else {
      if (disabled === true) {
        formData.append("user_type", type);
        formData.append("type", "4");
      } else {
        formData.append("type", selectType);
      }
      formData.append("subject", subject);

      formData.append("email_list", email);
      formData.append("message", html);
      formData.append("schedule_date", schDate);
      axios({
        method: "POST",
        url: `${baseUrl}/cms/addemailer`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          Swal.fire({
            title: "success",
            html: "Message schedule successfully",
            icon: "success",
          });
          history.push("/cms/emaillist");
        }
      });
    }
  };
  const getSelectEmail = (e) => {
    let email = [];
    setEmailValue(e);
    if (e.length === options.length) {
      let a = "all";
      email.push(a);
      setEmail(email);
    } else {
      e.map((i) => {
        email.push(i.label);
      });
      setEmail(email);
    }
  };
  const getSelectData = (e) => {
    if (e.target.value === "4") {
      setDisabled(e.target.checked);
      setSelectType([]);
    } else if (e.target.checked === true) {
      setDisabled(false);
      setSelectType((oldData) => {
        return [...oldData, e.target.value];
      });
    }
  };
  useEffect(() => {
    if (!window.location.pathname !== "/cms/enquiry") {
      axios
        .get(
          `${baseUrl}/cms/emailerlist?id=${window.location.pathname
            .split("/")
            .at(-1)}&uid=${JSON.parse(userId)}`,
          myConfig
        )

        .then((res) => {
          if (res.data.code === 1) {
            setContent(res.data.result[0].message);
            setSubject(res.data.result[0].subject);
            setType(res.data.result[0].user_type);
            setSchData(res.data.result[0].schedule_date);

            setShowTemplete(true);
          } else if (res.data.code === 102) {
            localStorage.removeItem("token");
            history.push("/cms/login");
            return false;
          }
        });
    }
  }, []);
  const generateTemplate = (e) => {
    let formData = new FormData();
    formData.append("start_date", fromDate);
    formData.append("end_date", toDate);
    formData.append("templete_type", "update");
    axios({
      method: "POST",
      url: `${baseUrl}/cms/getemailbody`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      let direct = [];
      let indirect = [];
      let other = [];
      if (res.data.code === 1) {
        res.data.result.map((i) => {
          if (i.type === "direct") {
            direct.push(i);
          } else if (i.type === "indirect") {
            indirect.push(i);
          } else {
            other.push(i);
          }
        });

        let directoutput = direct.map((i) => {
          return `<ul>
                    <li>${i.heading} </li>
                    
                  </ul>`;
        });
        let indirectoutput = indirect.map((i) => {
          return `<ul>
                    <li>${i.heading} </li>
                    
                  </ul>`;
        });
        let otheroutput = other.map((i) => {
          return `<ul>
                    <li>${i.heading} </li>
                    
                  </ul>`;
        });
        setTempleteData({
          direct: directoutput,
          indirect: indirectoutput,
          other: otheroutput,
        });
        setShowTemplete(true);
      } else if (res.data.code === 0) {
        setTempleteData({
          direct: [],
          indirect: [],
          other: [],
        });
        setShowTemplete(false);
        Swal.fire({
          html: "No data found",
        });
      }
    });
  };
  const styles = {
    header: {
      fontSize: 22,
      bold: true,
    },
    anotherStyle: {
      italics: true,
      alignment: "right",
    },
  };
  console.log(content);
  return (
    <Layout cmsDashboard="cmsDashboard">
      <Container maxWidth="xl">
        <Card>
          <CardHeader>
            <Row>
              <Col md="4">
                <button
                  className="autoWidthBtn ml-2"
                  onClick={() => history.goBack()}
                >
                  Go Back
                </button>
              </Col>
              <Col md="4" align="center">
                <CustomHeading>Schedule email</CustomHeading>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-10 my-4">
                  <div className="row" onClick={(e) => getSelectData(e)}>
                    <div className="col-md-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="allClient"
                          value="1"
                          disabled={disabled}
                        />
                        <label class="form-check-label" htmlFor="allClient">
                          All client
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="allTL"
                          value="2"
                          disabled={disabled}
                        />
                        <label class="form-check-label" htmlFor="allTL">
                          All TL
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="allTP"
                          value="3"
                          disabled={disabled}
                        />
                        <label class="form-check-label" htmlFor="allTP">
                          All TP
                        </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="specified"
                          value="4"
                        />
                        <label class="form-check-label" htmlFor="specified">
                          Specific email
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {disabled === true ? (
                  <>
                    <div className="col-md-5">
                      <div className="form-group">
                        <label>
                          User type<span className="declined">*</span>
                        </label>
                        <select
                          className={classNames("form-control", {
                            "is-invalid": errors.p_type,
                          })}
                          name="type"
                          value={type}
                          onChange={(e) => getEmail(e.target.value)}
                          ref={register}
                          style={{ height: "33px" }}
                        >
                          <option value="">--select--</option>
                          <option value="0">All user</option>
                          <option value="1">All clients</option>

                          <option value="2">All TL</option>
                          <option value="3">All TP</option>
                        </select>
                        {errors.p_to && (
                          <div className="invalid-feedback">
                            {errors.p_to.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-5">
                      <label>Email</label>
                      <div>
                        <DropDown
                          value={emailValue}
                          options={options}
                          handleChange={(e) => getSelectEmail(e)}
                          multi={true}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="col-md-10">
                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      onChange={(e) => setSubject(e.target.value)}
                      ref={register({ required: true })}
                      value={subject}
                    />
                  </div>
                </div>

                <div className="col-md-10">
                  <fieldset className="my-fieldsettemplate">
                    <legend className="login-legend">Generate template</legend>
                    <div className="row">
                      <div className="col-md-4">
                        <span className="generateTemplate">
                          <label>Template type</label>
                          <select
                            value={templeteType}
                            onChange={(e) => setTempleteType(e.target.value)}
                            className="form-control"
                          >
                            <option value="1">Updates</option>
                          </select>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <span className="generateTemplate">
                          <label className="d-block">
                            Start date<span className="declined">*</span>
                          </label>
                          <Space direction="vertical" size={24}>
                            <DatePicker
                              disabledDate={(d) => !d || d.isAfter(minimum)}
                              format="DD-MM-YYYY HH:mm:ss"
                              showTime={{
                                defaultValue: moment("00:00:00", "HH:mm:ss"),
                              }}
                              onChange={(e) => {
                                setFromDate(
                                  moment(e).format("DD-MM-YYYY HH:mm:ss")
                                );
                                setMin(moment(e));
                              }}
                            />
                          </Space>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <span className="generateTemplate">
                          <label className="d-block">
                            End date<span className="declined">*</span>
                          </label>
                          <Space direction="vertical" size={24}>
                            <DatePicker
                              disabledDate={(d) =>
                                !d || !d.isBetween(min, minimum)
                              }
                              id="endDate"
                              format="DD-MM-YYYY HH:mm:ss"
                              showTime={{
                                defaultValue: moment("00:00:00", "HH:mm:ss"),
                              }}
                              onChange={(e) =>
                                setToDate(
                                  moment(e).format("DD-MM-YYYY HH:mm:ss")
                                )
                              }
                            />
                          </Space>
                        </span>
                      </div>
                      <div className="col-md-4 my-4">
                        <button
                          type="button"
                          onClick={(e) => generateTemplate(e)}
                          className="autoWidthBtn"
                        >
                          Generate template
                        </button>
                      </div>
                    </div>
                  </fieldset>
                </div>
                {!window.location.pathname !== "/cms/enquiry" ? (
                  <div className="col-md-10">
                    <div className="form-group">
                      <label>
                        Message<span className="declined">*</span>
                      </label>
                      {showTemplete === true ? (
                        <CustomQuillEditor
                          content={content}
                          showEditor={showTemplete}
                        />
                      ) : (
                        <AddEditor />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="col-md-10">
                    <div className="form-group">
                      <label>
                        Message<span className="declined">*</span>
                      </label>
                      {showTemplete === true ? (
                        <CustomQuillEditor
                          content={`<div class = container tempcont>
                       <div class="d-flex align-items-start my-3">
                         <div class="p-0" style: [ 'header', 'anotherStyle' ]>
                           <img
                             src="https://advisorysolutions.mazars.co.in/static/media/mazars-logo.dca93671c32811cdacb3.png"
                             width = "150"
                             alt="logo"
                           
                           />
                         </div>
                       </div>
                       <div class="row mt-3 mx-0 justify-content-center">
                         <div class="col-lg-12 headingDiv">
                           <h4 style="margin-top: 20px;">Mazars Advisory Solutions</h4>
                           <p id = conTag>
                             Compilation of direct tax, indirect tax and other updates.
                           </p>
                           <p>Edition: Date</p>
                         </div>
                       </div>
                       <div class="row mt-3 justify-content-center">
                         <div class="col-lg-12 imageDiv">
                           <img src= "https://stagingapi.masindia.live/static/media/directax.9f3b0b746efff10a040f.gif"  alt="directax" />
                         </div>
                         <div class="col-lg-12 mt-1 mb-3 contDiv">
                          ${templeteData.direct}
                         </div>
                       </div>
                       <div class="row mt-3 justify-content-center">
                         <div class="col-lg-12 imageDiv">
                           <img src="https://stagingapi.masindia.live/static/media/indirextax.9f7d2ff61a1464eb1db6.gif" alt="indirectax" />
                         </div>
                         <div class="col-lg-12 mt-1 mb-3 contDiv">
                          ${templeteData.indirect}
                         </div>
                       </div>
                       <div class="row mt-3 justify-content-center">
                         <div class="col-lg-12 imageDiv">
                           <img src="https://stagingapi.masindia.live/static/media/othertax.c5e8aa750f5b37aab594.gif" alt="othertax" />
                         </div>
                         <div class="col-lg-12 mt-1 mb-3 contDiv">
                        
                         ${templeteData.other}
                         
              
                       
                         </div>
                       </div>
                       <div class="row mt-4 justify-content-between">
                         <div class="col-lg-4 btncol">
                           <p class="clickp">Click here to read the full update</p>
                           <button class="button">Read more</button>
                         </div>
                         <div class="col-lg-4 btncol">
                           <p class="clickp">
                             Click here for any further information or queries{" "}
                           </p>
                           <button class="button">Click here</button>
                         </div>
                       </div>
                       <hr />
                       <div class="footerdiv">
                         <div class="d-flex mt-3 justify-content-center">
                           <div class="p-2">
                             <span class="awsmspan" id="linkspan">
                               <a href="http://">
                                 <i class="fa-solid fa-link"></i>
                               </a>
                             </span>
                           </div>
                           <div class="p-2">
                             <span class="awsmspan" id="linkedinspan">
                               <a href="http://">
                                 <i class="fa-brands fa-linkedin"></i>
                               </a>
                             </span>
                           </div>
                           <div class="p-2">
                             <span class="awsmspan" id="instaspan">
                               <a href="http://">
                                 <i class="fa-brands fa-instagram"></i>
                               </a>
                             </span>
                           </div>
                           <div class="p-2">
                             <span class="awsmspan" id="facebookspan">
                               <a href="http://">
                                 <i class="fa-brands fa-facebook-f"></i>
                               </a>
                             </span>
                           </div>
                           <div class="p-2">
                             <span class="awsmspan" id="twitterspan">
                               <a href="http://">
                                 <i class="fa-brands fa-twitter"></i>
                               </a>
                             </span>
                           </div>
                         </div>
                         <div class="row">
                           <div class="col-lg-12 footcont">
                          
                             <p>
                               Mazars Advisory Solutions India is backed by industry experts having
                               immense experience in the taxation field collectively possessing
                               150+ years of industry experience in direct & indirect tax
                               matters having served 400+ domestic clients and international
                               clients across various sectors. The expert team has a
                               comprehensive exposure of 1,00,000+ hours of tax assessment &
                               litigation matters including special experience of having
                               handled search & seizure cases of 150+ business groups. They
                               also have 20+ years of thought leadership in transfer pricing.
                             </p>
                           </div>
                         </div>
                         <div class="row">
                           <div class="col-lg-12 footcont">
                             <p style="margin-bottom: 2px;">Find out more on: </p>
                             <a href="https://advisorysolutions.mazars.co.in/">
                               <p>https://advisorysolutions.mazars.co.in/</p>
                             </a>
                           </div>
                           <div class="col-lg-12 footcont">
                             <p class="copyright">Copyright @2022 All right reserved</p>
                           </div>
                         </div>
                       </div>
                     </div>`}
                          showEditor={showTemplete}
                        />
                      ) : (
                        <AddEditor />
                      )}
                    </div>
                  </div>
                )}

                <div className="col-md-10">
                  <label className="d-block">
                    Schedule date<span className="declined">*</span>
                  </label>
                  <Space direction="vertical" size={24}>
                    <DatePicker
                      disabledDate={(d) => !d || d.isBefore(minimum)}
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                      }}
                      defaultValue={moment(schDate)}
                      onChange={(e) =>
                        setSchData(moment(e).format("DD-MM-YYYY HH"))
                      }
                    />
                  </Space>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 my-4">
                  <button type="submit" className="customBtn">
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <EnqTemp />
          </CardBody>
        </Card>
      </Container>
    </Layout>
  );
};
export default Enquiry;

import React, { useState, useEffect } from "react";
import Layout from "../../../../components/Layout/Layout";
import { Container } from "@material-ui/core";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import CustomHeading from "../../../../components/Common/CustomHeading";
import { DatePicker, Space } from "antd";
import axios from "axios";
import { baseUrl } from "../../../../config/config";
import Select from "react-select";
import moment from "moment";
import Swal from "sweetalert2";
import DropDown from "../../../../components/Common/DropDown";
import ShowHtml from "./ShowHtml";
import AddEditor from "../AddEditor";
import CustomQuillEditor from "../CustomQuillEditor";
const { RangePicker } = DatePicker;
const Schema = yup.object().shape({
  message_type: yup.string().required(""),
  p_message: yup.string().required(""),
  p_to: yup.string().required(""),
});

const Enquiry = (props) => {
  let history = useHistory();
  var minimum = moment.now();
  let endData = moment(minimum, "DD-MM-YYYY HH:mm:ss").add(1, "days");
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
  const [selectDirect, setSelectDirect] = useState([]);
  const [selectIndirect, setSelectInDirect] = useState([]);
  const [selectOther, setSelectOther] = useState([]);
  const [viewHtml, setViewHtml] = useState(false);
  const [finalData, setFinalData] = useState("");
  const [loading, setLoading] = useState(false);
  const [mailerBody, setMailerBody] = useState("");
  const [edition, setEeition] = useState("");
  const [id, setId] = useState("");
  const [today, setToday] = useState("");

  const [showEditor, setShowEditor] = useState(true);
  const [hour, setHour] = useState("17");
  const { handleSubmit, register, errors, reset } = useForm({});

  const token = localStorage.getItem("token");
  const userId = window.localStorage.getItem("cmsId");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const dateFormat = "DD-MM-YYYY HH";
  const openHandler = (e) => {
    setViewHtml(!viewHtml);
  };
  const getEmail = (e, b) => {
    if (b === "added") {
      setType(e);
      setEmailValue([]);
      setEmail([]);
    }
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
    if (templeteType === "2") {
      var myEditor = document.querySelector("#snow-container");
      var html = myEditor.children[0].innerHTML;

      if (myEditor.children[0].innerHTML.trim() === "<p><br></p>") {
        return false;
      }
      formData.append("message", html);
    } else {
      formData.append("message", finalData);
    }
    if (disabled === true) {
      formData.append("user_type", type);
      formData.append("type", "4");
    } else {
      formData.append("type", selectType);
    }
    if (window.location.pathname !== "/cms/enquiry") {
      formData.append("id", id);
    }
    formData.append("subject", subject);
    formData.append("template_type", templeteType);
    formData.append("email_list", email);

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
      } else if (res.data.code === 0) {
        Swal.fire({
          title: "error",
          html: "Something went wrong, please try again",
          icon: "error",
        });
      }
    });
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
    if (window.location.pathname !== "/cms/enquiry") {
      axios
        .get(
          `${baseUrl}/cms/emailerlist?id=${window.location.pathname
            .split("/")
            .at(-1)}&uid=${JSON.parse(userId)}`,
          myConfig
        )

        .then((res) => {
          if (res.data.code === 1) {
            let type = [];
            let allEmailValue = [];
            setSubject(res.data.result[0]?.subject);
            setId(res.data.result[0]?.id);
            let datamail = res.data.result[0].message;
            setTempleteType(res.data.result[0].template_type);
            setEmail(res.data.result[0]?.email_list);
            let mail = datamail.replace("<html>", "");
            setFinalData(datamail);
            mail = mail.replace("<body>", "");
            mail = mail.replace("</body>", "");
            mail = mail.replace("</html>", "");

            setMailerBody(mail);
            setSchData(
              moment(res.data.result[0]?.schedule_date).format("DD-MM-YYYY HH")
            );
            setType(res.data.result[0].user_type);
            let emailList = res.data.result[0].email_list.split(",");

            if (emailList[0]) {
              emailList.map((i) => {
                let kp = {
                  label: i,
                  value: i,
                };

                allEmailValue.push(kp);
              });

              setEmailValue(allEmailValue);
            }

            type.push(res.data.result[0].type);
            if (type.includes("4")) {
              setDisabled(true);
              getEmail("4", "edited");
            } else {
              setDisabled(false);
            }
            setSelectType(res.data.result[0].type.split(","));
            setLoading(true);
          } else if (res.data.code === 102) {
            localStorage.removeItem("token");
            history.push("/cms/login");
            return false;
          }
        });
    } else {
      setLoading(true);
      setToday(moment().format("DD-MM-YYYY"));
      let hour = "17";
      let date = moment().format("DD-MM-YYYY");
      let fullDate = date + " " + hour;
      setSchData(fullDate);
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
        res.data.result.direct.map((i) => {
          let data = {
            label: i,
            value: i,
          };
          direct.push(data);
        });

        res.data.result.indirect.map((i) => {
          let data = {
            label: i,
            value: i,
          };
          indirect.push(data);
        });

        res.data.result.miscellaneous.map((i) => {
          let data = {
            label: i,
            value: i,
          };
          other.push(data);
        });
        setTempleteData({
          direct: direct,
          inDirect: indirect,
          other: other,
        });
        setShowTemplete(true);
      } else if (res.data.code === 0) {
        setTempleteData({
          direct: [],
          inDirect: [],
          other: [],
        });
        setShowTemplete(false);
        Swal.fire({
          html: "No data found",
        });
      }
    });
  };

  const directOnchange = (e) => {
    setSelectDirect(e);
  };
  const indirectOnchange = (e) => {
    setSelectInDirect(e);
  };

  const getDirectTable = () => {
    var table;
    if (selectDirect.length > 0) {
      table = `  <img src="https://advisorysolutions.mazars.co.in/static/media/directax.9f3b0b746efff10a040f.gif"
      alt="directax"
    />       `;
    } else {
      table = "";
    }
    return table;
  };
  const getIndirectTable = () => {
    var table;
    if (selectIndirect.length > 0) {
      table = `<img align="center"
      src="https://advisorysolutions.mazars.co.in/static/media/indirextax.9f7d2ff61a1464eb1db6.gif"
      alt="indirectax"
    />`;
    } else {
      table = "";
    }
    return table;
  };
  const getOtherTable = () => {
    var table;
    if (selectOther.length > 0) {
      table = ` <img
      src = "https://advisorysolutions.mazars.co.in/static/media/othertax.c5e8aa750f5b37aab594.gif"
      alt="othertax"
    />`;
    } else {
      table = "";
    }
    return table;
  };
  const otherOnchange = (e) => {
    setSelectOther(e);
  };
  const generateTemp = (e) => {
    if (
      selectDirect.length > 0 ||
      selectIndirect.length > 0 ||
      selectOther.length > 0
    ) {
      let directoutput = selectDirect.map((i) => {
        return `<li>${i.value} </li>`;
      });
      let indirectoutput = selectIndirect.map((i) => {
        return `
                  <li>${i.value} </li>
                  
                `;
      });
      let otheroutput = selectOther.map((i) => {
        return `
                  <li>${i.value} </li>
                  
                `;
      });

      let data = `<html>


    <body>
   
    <table width = "70%" align="center">


        <tr>

            <td>  <img
                src="https://advisorysolutions.mazars.co.in/static/media/mazars-logo.dca93671c32811cdacb3.png"
                alt="logo" width="150">

            </td>
          
    </tr>    
    <tr><td>&nbsp;</td></tr>
    <tr>
        <td bgColor="#0071CE">
            <table bgColor="#0071CE" width = "100%" style="margin: 10px 0px; padding: 10px;">
                        
                <tr>
                <td  style="margin : 0px 10px; color : #fff">
                    <h2 style="margin-top: 20px;">Mazars Advisory Solutions</h2>
                    <p style="margin-bottom: 0px;">Compilation of direct tax,  indirect tax and other updates.</p>
                    <p>Edition: ${edition}</p>
           
        
                </td>
                 </tr>
        </table>
        </td>
    </tr>   
     <tr><td>&nbsp;</td></tr>
    <tr><td style="margin: auto;text-align:center">  
        ${getDirectTable()}
      </td>
  </tr>
    <tr>
        <td>
        <ul>
        ${directoutput}
        </ul>
        </td>
        </tr>
   
    <tr><td>&nbsp;</td></tr>
    <tr><td style="margin: auto;text-align:center">     
          ${getIndirectTable()}
        </td>
  </tr>
  <tr>
       <td>
       <ul>
       ${indirectoutput}             
       </ul>
       </td>
     </tr>
   <tr><td>&nbsp;</td></tr>
    <tr><td style="margin: auto;text-align:center">  
         ${getOtherTable()}
      </td>
  </tr>
<tr>
    <td>
    <ul>
    ${otheroutput}
    </ul>
    </td>
 </tr>
 <tr>
 <td>
 <table width = "100%" cellspacing="0" border="0">

<tr><td width="50%"> <p>Click here to read the full update</p></td>
<td width="50%"><p style="float :right;text-align : right">  Click here for any further information or queries</p></td></tr>
<tr>
 <td align="left" valign="top" >
<a href="https://advisorysolutions.mazars.co.in"  target="_blank">
<span style="color:blue;text-decoration:none">
<img border="0" width="264" height="60" style="width:2.75in;height:.625in" src="https://advisorysolutions.mazars.co.in//static/media/clickHere.9f83b2126f60cd72da70.jpeg"></span></a>
</td>
<td align="right" valign="top" >
<a href="mailto:support22@mazars.co.in?subject=General%20query-%20Newsletter" target="_blank">
<span style="color:blue;text-decoration:none">
<img border="0" width="264" height="60" style="width:2.75in;height:.625in" src="https://advisorysolutions.mazars.co.in//static/media/readMore.c5ecf674568c1a905740.jpeg"></span></a>
</td></tr>
   
 </table>

 </td>
 </tr>
 <tr><td>&nbsp;</td></tr>
 <tr><td><hr></td></tr>
 
 <tr><td align="center">
 
 <table style="max-width : 350px; width : 100%; margin : auto;" border="0" align="center" cellspacing="0px"><tr>
 <td>
 <a href = "https://advisorysolutions.mazars.co.in" target = "_blank">
 <img src = "https://cdn-images.mailchimp.com/icons/social-block-v2/color-link-48.png" style="display : block; width : 30%"/>
 </a>
 </td>
 
 <td >
 <a href = "https://www.linkedin.com/company/mazars-in-india/" target = "_blank">
 <img src = "https://cdn-images.mailchimp.com/icons/social-block-v2/color-linkedin-48.png" style="display : block; width : 30%"  />
 </a>
 </td>
 
 <td >
 <a href = "https://www.instagram.com/mazarsinindia/" target = "_blank">
 <img src = "https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-48.png" style="display : block; width : 30%;" />
 </a>
 </td>
 <td >
 <a href = "https://www.facebook.com/mazarsinindia/" target = "_blank">
 <img src = "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-48.png" style="display : block; width : 30%" />
 </a>
 </td>
 <td >
 <a href = "https://twitter.com/mazarsinindia" target = "_blank">
 <img src = "https://cdn-images.mailchimp.com/icons/social-block-v2/color-twitter-48.png" style="display : block; width : 30%" />
 </a>
 </td>
 </tr>
</table>
 </td></tr>
 <tr>
 <td style="display : block; text-align : center">
 <p>
Mazars Advisory Solutions is backed by experts having immense experience in the taxation field
collectively possessing 150+ years of industry experience in direct & indirect tax matters having served
400+ domestic clients and international clients across various sectors. The expert team has a
comprehensive exposure of 1 00 000+ hours of tax assessment & litigation matters including special
experience of having handled search & seizure cases of 150+ business groups. They also have 20+ years
of thought leadership in transfer pricing.

</p>
<p>
In India  Mazars has an ambitious growth plan and already has a national presence with a strong team of
over 1 000 professionals with 6 offices located in Bengaluru  Chennai  Delhi  Gurugram  Mumbai and
Pune. Our professionals have in-depth experience in sectors like Energy  Telecom  BFSI  Automobiles 
Technology  Real Estate  Shipping  Services  Manufacturing and Retail.
</p>
</br>
<p>Find out more on <a href = "https://advisorysolutions.mazars.co.in/" target = "_blank">https://advisorysolutions.mazars.co.in</a></p>

<p>Copyright © 2023 Mazars  All rights reserved.</p>
 </td>
 </tr>
</table>
</body>

    </html>
`;

      let mail = data.replace("<html>", "");

      mail = mail.replace("<body>", "");
      mail = mail.replace("</body>", "");
      mail = mail.replace("</html>", "");
      setMailerBody(mail.replace(/\,/g, " "));

      setFinalData(data.replace(/\,/g, " "));
      setViewHtml(!viewHtml);
    } else {
      Swal.fire({
        html: "Please select atleast one updates",
      });
    }
  };

  return (
    <Layout cmsDashboard="cmsDashboard">
      {loading === true ? (
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
                      <div className="col-md-2">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultChecked={selectType.includes("0")}
                            id="allAdmin"
                            value="0"
                            disabled={disabled}
                          />
                          <label class="form-check-label" htmlFor="allAdmin">
                            Admin
                          </label>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            defaultChecked={selectType.includes("1")}
                            id="allClient"
                            value="1"
                            disabled={disabled}
                          />
                          <label class="form-check-label" htmlFor="allClient">
                            All client
                          </label>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="allTL"
                            value="2"
                            defaultChecked={selectType.includes("2")}
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
                            id="allTP"
                            value="3"
                            disabled={disabled}
                            defaultChecked={selectType.includes("3")}
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
                            id="specified"
                            value="4"
                            defaultChecked={selectType.includes("4")}
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
                            onChange={(e) => getEmail(e.target.value, "added")}
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
                    <label>Template type</label>
                    <select
                      value={templeteType}
                      onChange={(e) => {
                        if (e.target.value === "2") {
                          setMailerBody("");
                        }
                        setTempleteType(e.target.value);
                      }}
                      className="form-control"
                    >
                      <option value="1">Updates</option>
                      <option value="2">Editor</option>
                    </select>
                  </div>
                  <div className="col-md-10">
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        className={classNames("form-control", {
                          "is-invalid": errors.subject,
                        })}
                        onChange={(e) => setSubject(e.target.value)}
                        ref={register({ required: true })}
                        value={subject}
                      />
                    </div>
                  </div>
                  {templeteType === "1" ? (
                    <div className="col-md-10">
                      <fieldset className="my-fieldsettemplate">
                        <legend className="login-legend">
                          Generate template
                        </legend>
                        <div className="row">
                          <div className="col-md-3">
                            <span className="generateTemplate">
                              <label className="d-block">
                                Start date<span className="declined">*</span>
                              </label>
                              <Space direction="vertical" size={24}>
                                <DatePicker
                                  disabledDate={(d) => !d || d.isAfter(minimum)}
                                  format="DD-MM-YYYY HH:mm:ss"
                                  showTime={{
                                    defaultValue: moment(
                                      "00:00:00",
                                      "HH:mm:ss"
                                    ),
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
                          <div className="col-md-3">
                            <span className="generateTemplate">
                              <label className="d-block">
                                End date<span className="declined">*</span>
                              </label>
                              <Space direction="vertical" size={24}>
                                <DatePicker
                                  disabledDate={(d) =>
                                    !d ||
                                    !d.isBetween(
                                      min,
                                      moment(minimum).add(1, "day").toDate()
                                    )
                                  }
                                  id="endDate"
                                  format="DD-MM-YYYY HH:mm:ss"
                                  showTime={{
                                    defaultValue: moment(
                                      "00:00:00",
                                      "HH:mm:ss"
                                    ),
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
                          <div className="col-md-3">
                            <div className="emailerBtn">
                              <button
                                type="button"
                                onClick={(e) => generateTemplate(e)}
                                className="autoWidthBtn"
                                style={{ height: "40px" }}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                          {id ? (
                            <div className="col-md-3">
                              <div className="emailerBtn">
                                <button
                                  onClick={(e) => setViewHtml(!viewHtml)}
                                  type="button"
                                  className="autoWidthBtn"
                                >
                                  Show Draft
                                </button>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        {showTemplete === true ? (
                          <div className="row">
                            <div className="col-md-3">
                              <div>
                                <div className="form-group">
                                  <label>Edition date</label>
                                  <Space direction="vertical" size={24}>
                                    <DatePicker
                                      format="DD-MM-YYYY"
                                      onChange={(e) =>
                                        setEeition(
                                          moment(e).format("DD-MM-YYYY")
                                        )
                                      }
                                    />
                                  </Space>
                                  {/* <input
                type="date"
                name="subject"
                placeholder="dd-mm-yyyy"
                className="form-control"
                onChange={(e) => setEeition(e.target.value)}
                ref={register({ required: true })}
                min={today}
              /> */}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <label>Direct tax</label>
                              <Select
                                isMulti={true}
                                onChange={(e) => directOnchange(e)}
                                options={templeteData.direct}
                              />
                            </div>
                            <div className="col-md-12">
                              <label>Indirect tax</label>
                              <Select
                                isMulti={true}
                                onChange={(e) => indirectOnchange(e)}
                                options={templeteData.inDirect}
                              />
                            </div>
                            <div className="col-md-12">
                              <label>Others</label>
                              <Select
                                onChange={(e) => otherOnchange(e)}
                                isMulti={true}
                                options={templeteData.other}
                              />
                            </div>
                            <div className="col-md-6">
                              <div className="emailerBtn">
                                <button
                                  type="button"
                                  onClick={(e) => generateTemp(e)}
                                  className="customBtn"
                                  style={{ height: "40px" }}
                                >
                                  Generate
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </fieldset>
                    </div>
                  ) : (
                    <div className="col-md-12">
                      {window.location.pathname !== "/cms/enquiry" ? (
                        <CustomQuillEditor
                          content={mailerBody}
                          showEditor={showEditor}
                        />
                      ) : (
                        <AddEditor />
                      )}
                      <div className="row">
                        <div className="col-md-10"></div>
                      </div>
                    </div>
                  )}

                  {schDate.length > 0 ? (
                    <div className="col-md-4 my-4">
                      <label className="d-block">
                        Schedule date<span className="declined">*</span>
                      </label>
                      {window.location.pathname !== "/cms/enquiry" ? (
                        <Space direction="vertical" size={24}>
                          <DatePicker
                            disabledDate={(d) =>
                              !d || d.isSameOrBefore(minimum)
                            }
                            format={dateFormat}
                            showTime={true}
                            showHour
                            onChange={(e) =>
                              setSchData(moment(e).format("DD-MM-YYYY HH"))
                            }
                            defaultValue={moment(schDate, dateFormat)}
                          />
                        </Space>
                      ) : (
                        <Space direction="vertical" size={24}>
                          <DatePicker
                            disabledDate={(d) =>
                              !d || d.isSameOrBefore(minimum)
                            }
                            format={dateFormat}
                            showTime={true}
                            showHour
                            onChange={(e) =>
                              setSchData(moment(e).format("DD-MM-YYYY HH"))
                            }
                            defaultValue={moment(
                              `${today} ${hour}`,
                              dateFormat
                            )}
                          />
                        </Space>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6 my-4">
                    <button type="submit" className="customBtn">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              {viewHtml === true ? (
                <ShowHtml
                  openHandler={openHandler}
                  mailerBody={mailerBody}
                  viewHtml={viewHtml}
                />
              ) : (
                " "
              )}
            </CardBody>
          </Card>
        </Container>
      ) : (
        ""
      )}
    </Layout>
  );
};
export default Enquiry;

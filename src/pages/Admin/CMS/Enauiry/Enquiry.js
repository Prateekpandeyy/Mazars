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
import { Markup } from "interweave";
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
  const [selectDirect, setSelectDirect] = useState([]);
  const [selectIndirect, setSelectInDirect] = useState([]);
  const [selectOther, setSelectOther] = useState([]);
  const [htmldata, setHtml] = useState({
    direct: "",
    inDirect: "",
    other: "",
  });
  const [finalData, setFinalData] = useState("");
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

    if (disabled === true) {
      formData.append("user_type", type);
      formData.append("type", "4");
    } else {
      formData.append("type", selectType);
    }
    formData.append("subject", subject);

    formData.append("email_list", email);
    formData.append("message", finalData);
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
  console.log(selectDirect, selectIndirect, selectOther);
  const directOnchange = (e) => {
    setSelectDirect(e);
  };
  const indirectOnchange = (e) => {
    setSelectInDirect(e);
  };
  const otherOnchange = (e) => {
    setSelectOther(e);
  };
  const generateTemp = (e) => {
    let directoutput = selectDirect.map((i) => {
      return `<ul>
                <li>${i.value} </li>
                
              </ul>`;
    });
    let indirectoutput = selectIndirect.map((i) => {
      return `<ul>
                <li>${i.value} </li>
                
              </ul>`;
    });
    let otheroutput = selectOther.map((i) => {
      return `<ul>
                <li>${i.value} </li>
                
              </ul>`;
    });
    let data = `<html lang="en">

    <body>
    <table width = "100%">


        <tr>

            <td>  <img
                src="https://advisorysolutions.mazars.co.in/static/media/mazars-logo.dca93671c32811cdacb3.png"
                alt="logo" width="150">

            </td>
          
    </tr>    
    <tr>
        <td>
            <table bgColor="#0071CE" style="display: flex; margin: 10px 0px;">
                        
                <tr style="display: flex;
                flex-direction: column;
                justify-content: center;
                margin: auto;
                color: #fff;
                align-items: center;
                padding: 0px 15px;
                width: 100%;">
                <td>
                    <h2 style="margin-top: 20px;">Mazars Advisory Solutions</h2>
                    <p style="margin-bottom: 0px; text-align: center;">Compilation of direct tax, indirect tax and other updates.</p>
                    <p>Edition: Date</p>
           
        
                </td>
                 </tr>
        </table>
        </td>
    </tr>
    
    <tr>
        <td>
            <table style="margin: auto;">
                <tr>
               <td>
               
             <img src= "https://staging.masindia.live/static/media/directax.9f3b0b746efff10a040f.gif"  alt="directax" />  
            
               </td>
            </tr>
            
            </table>
           
        </td>
    </tr>
    <tr>
        <td>
      ${directoutput}
        </td>
        </tr>
   <tr>
    <td>
        
       <table style="margin: auto;">
        <tr>
       <td>
       
        <img src="https://staging.masindia.live/static/media/indirextax.9f7d2ff61a1464eb1db6.gif" alt="indirectax" />  
    
       </td>
    </tr>
  
    </table>

    </td>
   </tr>
  <tr>
       <td>
        ${indirectoutput}
       </td>
     </tr>
 <tr>
    <td>
        <table style="margin: auto;">
            <tr style="display: flex;
        flex-direction: column;
        margin: 10px 0px;">
           <td>
            <img src="https://staging.masindia.live/static/media/othertax.c5e8aa750f5b37aab594.gif" alt="othertax" />
        
           </td>
        </tr>

        </table>
    </td>
 </tr>
         
<tr>
    <td>
   ${otheroutput}
    </td>
 </tr>
 <tr>
    <td>
        <table style="width: 100%;">
            <tr>
                <td>
            
                <p>Click here to read the full update</p>
                <button style="border-bottom-left-radius: 1.75rem;
                background-color: #0071ce;
                border: 1px solid #0071ce;
                color: #fff;
                display: inline-flex;
                align-items: center;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 500;
                justify-content: center;
                line-height: 1;
                max-width: 100%;
                min-width: 100px;
                min-height: 3rem;
                overflow: hidden;
                padding: 0.75rem 1.5rem;
                position: relative;
                text-decoration: none;
                transform: all 0.3s;
                vertical-align: middle;">Read more</button>
            
                </td>
             
                <td>
                    <p>Click here for any further information or queries </p>
                    <button style="border-bottom-left-radius: 1.75rem;
                    background-color: #0071ce;
                    border: 1px solid #0071ce;
                    color: #fff;
                    display: inline-flex;
                    align-items: center;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: 500;
                    justify-content: center;
                    line-height: 1;
                    max-width: 100%;
                    min-width: 100px;
                    min-height: 3rem;
                    overflow: hidden;
                    padding: 0.75rem 1.5rem;
                    position: relative;
                    text-decoration: none;
                    transform: all 0.3s;
                    vertical-align: middle;">Click here</button>
                </td>
            
              
            </tr>
            <tr>
                <td>
                    Mazars Advisory Solutions India is backed by industry experts having immense experience in the taxation
                    field collectively possessing 150+ years of industry experience in direct & indirect tax matters
                    having served 400+ domestic clients and international clients across various sectors. The expert
                    team has a comprehensive exposure of 1,00,000+ hours of tax assessment & litigation matters
                    including special experience of having handled search & seizure cases of 150+ business groups.
                    They also have 20+ years of thought leadership in transfer pricing.
                </td>
               </tr>
        </table>
    </td>
 </tr>
</table>





</table>
</body>
    </html>`;
    setFinalData(data);
  };
  console.log("finalData", finalData);
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
                    />
                  </div>
                </div>

                <div className="col-md-10">
                  <fieldset className="my-fieldsettemplate">
                    <legend className="login-legend">Generate template</legend>
                    <div className="row">
                      <div className="col-md-3">
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
                      <div className="col-md-3">
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
                      <div className="col-md-3">
                        <button
                          type="button"
                          onClick={(e) => generateTemplate(e)}
                          className="autoWidthBtn"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                    {showTemplete === true ? (
                      <div>
                        <div>
                          <label>Direct</label>
                          <Select
                            isMulti={true}
                            onChange={(e) => directOnchange(e)}
                            options={templeteData.direct}
                          />
                        </div>
                        <div>
                          <label>Indirect</label>
                          <Select
                            isMulti={true}
                            onChange={(e) => indirectOnchange(e)}
                            options={templeteData.inDirect}
                          />
                        </div>
                        <div>
                          <label>other</label>
                          <Select
                            onChange={(e) => otherOnchange(e)}
                            isMulti={true}
                            options={templeteData.other}
                          />
                        </div>
                        <div className="col-md-4 my-4">
                          <button
                            type="button"
                            onClick={(e) => generateTemp(e)}
                            className="autoWidthBtn"
                          >
                            Generate message
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </fieldset>
                </div>

                <div className="col-md-10">
                  <div className="form-group">
                    <label>
                      Message<span className="declined">*</span>
                    </label>
                  </div>
                </div>
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
          </CardBody>
        </Card>
      </Container>
    </Layout>
  );
};
export default Enquiry;

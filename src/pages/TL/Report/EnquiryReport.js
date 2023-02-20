import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { baseUrl, baseUrl3 } from "../../../config/config";
import "./Admin.css";
import Select from "react-select";
import Layout from "../../../components/Layout/Layout";
import { Typography, Button } from "@material-ui/core";
import Mandatory from "../../../components/Common/Mandatory";
import { useHistory } from "react-router";
import MyContainer from "../../../components/Common/MyContainer";
import style from "./Admin.css"
import { BiRefresh } from "react-icons/bi";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
} from "reactstrap";
import { Grid, Box, Container, Item } from "@material-ui/core";
import Swal from "sweetalert2";
import $ from "jquery";
const Report = () => {
    const userid = window.localStorage.getItem("tlkey");
    const [captchValue, setCaptchValue] = useState("");
    const [captchaError, setCaptchaError] = useState(false);
    const [cpatcha, setCaptcha] = useState("");
    const [check, setCheck] = useState(true);
    const token = window.localStorage.getItem("tlToken");
    const myConfig = {
        headers: {
            uit: token,
        },
    };
    const history = useHistory();
    const { handleSubmit, register, errors, getValues, reset } = useForm();
    let date = new Date();
    var current_date =
        new Date().getFullYear() +
        "-" +
        ("0" + (new Date().getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + new Date().getDate()).slice(-2);

        
    // var begin_date = (date.setDate(date.getDate()))

    // var begin_date = (date.setDate(date.getDate() - 7)).getFullYear() +
    //     "-" +
    //     ("0" + (new Date().getMonth() + 1)).slice(-2) +
    //     "-" +
    //     ("0" + new Date().getDate()).slice(-2);;

    var m_names = ["01", "02", "03","04", "05", "06", "07", "08", "09", "10", "11", "12"];
    date.setDate(date.getDate() - 7);
    var curr_date = date.getDate();
    var curr_month = date.getMonth();
    var curr_year = date.getFullYear();
    var begin_date=curr_year + "-" + m_names[curr_month] + "-" + curr_date;

    

    const [item] = useState(current_date);
    const [datefrom] = useState(begin_date)

    const [item2, setItem2] = useState(current_date);
    const [item3, setItem3] = useState(begin_date);

    const resendCaptcha = () => {
        axios.get(`${baseUrl}/customers/crateauo`).then((res) => {
            setCaptcha(res.data.result);
        });
    };
    useEffect(() => {
        resendCaptcha();
    }, []);
    const onSubmit = (value) => {
        console.log(value);
        if (captchValue.length === 0) {
            setCaptchaError(true);
            // Swal.fire({
            //     title: "error",
            //     html: "Please fill captcha",
            //     icon: "error"
            // })
        } else {
            let formData = new FormData();
            formData.append("acceptTerms", value.acceptTerms)
            formData.append("p_from", value.p_from)
            formData.append("p_info", value.p_info)
            formData.append("p_message", value.p_message)
            formData.append("p_to", value.p_to)
            formData.append("captcha", captchValue);
            axios({
                method: "POST",
                url: `${baseUrl}/report/generateReport?t=${JSON.stringify(
                    Math.floor(Math.random() * 110000)
                  )}`,
                headers: {
                    uit: token,
                  },
                  data: formData
            }).then((res) => {
                console.log("response", res);
                if (res.data.code === 1) {
                    Swal.fire({
                        title: "success",
                        html: "Your enquiry submitted successfully, our team will contact you soon",
                        icon: "success",
                    });
                } else if (res.data.code === 0) {
                    setCaptchValue("");
                    resendCaptcha();
                    Swal.fire({
                        title: "error",
                        html: `${res.data.message}`,
                        icon: "error",
                    });
                }
            });
            console.log(value,"value")
        }
    }
    

    return (
        <>
            <Layout TLDashboard="TLDashboard" TLuserId={userid}>
                <div className="adminForm">
                    <Row>
                        <Col md="4">
                            <button class="autoWidthBtn" onClick={() => history.goBack()}>
                                Go Back
                            </button>
                        </Col>
                        <Col md="4">
                            <h4>Enquiry Report</h4>
                        </Col>
                        <Col md="4">
                        </Col>
                    </Row>
                    <MyContainer>
                        <Container maxWidth="md">
                            <Grid container justify="center">
                                <Grid item lg={12} md={12} sm={12}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Grid item lg={12}>
                                            <Box className="myFormBox">
                                                <label className="formFieldLegend">
                                                    Mazars Advisory Solutions enquiry form
                                                </label>

                                                <select
                                                    ref={register}
                                                    name="p_info"
                                                    className={classNames(
                                                        `form-control ${style.mySelectBox}`,
                                                        {
                                                            "is-invalid": errors.p_info,
                                                        }
                                                    )}
                                                >
                                                    <option value="General enquiries - MAZ">
                                                        General enquiries - Mazars Advisory Solutions{" "}
                                                    </option>
                                                    <option value="Business Advisory Services - MAZ">
                                                        Business Advisory Services - Mazars Advisory Solutions{" "}
                                                    </option>
                                                </select>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={6} xs={12} md={6} sx={{ mt: 3 }}>
                                            <Box className={style.myFormBox} sx={{ mt: 1 }}>
                                                <label className="form-label">From</label>
                                                <input
                                                    type="date"
                                                    name="p_from"
                                                    ref={register}
                                                    defaultValue={datefrom}
                                                    max={item}
                                                    className={classNames("form-control", {
                                                        "is-invalid": errors.p_mobile,
                                                    })}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={6} xs={12} md={6} sx={{ mt: 3 }}>
                                            <Box className={style.myFormBox} sx={{ mt: 1 }}>
                                                <label className="form-label">To</label>
                                                <input
                                                    type="date"
                                                    name="p_to"
                                                    className={classNames("form-control", {
                                                        "is-invalid": errors.p_type,
                                                    })}
                                                    defaultValue={item}
                                                    max={item}
                                                    ref={register({ required: true })}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12}>
                                            <Box className="myFormBox" sx={{ mt: 1 }}>
                                                <label className={style.formFieldLegend}>
                                                    Your message*
                                                </label>
                                                <textarea
                                                    ref={register}
                                                    name="p_message"
                                                    placeholder="Type your message here"
                                                    className={classNames(
                                                        `form-control ${style.formTextArea}`,
                                                        {
                                                            "is-invalid": errors.p_message,
                                                        }
                                                    )}
                                                ></textarea>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Box className="myFormBox" sx={{ mt: 2 }}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        maxWidth: "500px",
                                                        width: "100%",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <img src={`${baseUrl3}/${cpatcha}`} />
                                                    <input
                                                        type="text"
                                                        name="p_captcha"
                                                        value={captchValue}
                                                        style={{ width: "300px" }}
                                                        ref={register()}
                                                        placeholder="Please enter captcha"
                                                        className={classNames(`form-control`, {
                                                            mainCheckBox:
                                                                errors.p_captcha || captchaError === true,
                                                        })}
                                                        onChange={(e) => setCaptchValue(e.target.value)}
                                                    />
                                                    <span title="Refresh" onClick={() => resendCaptcha()}>
                                                        <BiRefresh
                                                            style={{
                                                                fontSize: "30px",
                                                                cursor: "pointer",
                                                                color: "#0071ce",
                                                            }}
                                                        />
                                                    </span>
                                                </div>

                                                <Grid item lg={12}>
                                                    <Box className="myFormBoxaggree">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                id="flexCheckDefault"
                                                                ref={register}
                                                                name="acceptTerms"
                                                                onChange={(e) => setCheck(!check)}
                                                                className={classNames(`form-check-input`, {
                                                                    mainCheckBox: errors.acceptTerms,
                                                                })}
                                                            />
                                                        </div>
                                                        <label
                                                            className="formChoice"
                                                            for="flexCheckDefault"
                                                        >
                                                            I accept that Mazars Advisory Solutions will process
                                                            my personal data for the purpose of handling my
                                                            request.
                                                        </label>
                                                    </Box>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={12}>
                                            <Box className={style.myFormBox}>
                                                <button type="submit" className="formButton">
                                                    Send
                                                </button>
                                            </Box>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </Container>
                    </MyContainer>
                </div>
            </Layout>
        </>
    );
};
export default Report;

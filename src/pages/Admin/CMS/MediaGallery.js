import React from "react";
import Layout from "../../../components/Layout/Layout";
import { Container, Box, Paper } from "@material-ui/core";
import classNames from "classnames";
import { styled } from "@mui/material";
import { useHistory, useParams } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Swal from "sweetalert2";
import { Row, Col } from "reactstrap";
import CustomHeading from "../../../components/Common/CustomHeading";
const MyContainer = styled(Container)({});
const MyBox = styled(Box)({
  display: "flex",
  width: "100%",
  height: "500px",
  justifyContent: "center",
  alignItems: "center",
});
const InnerBox = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  minHeight: "300px",
  width: "400px",
  lineHeight: "30px",
  borderRadius: "10px",
});
const MediaGallery = () => {
  const userId = window.localStorage.getItem("adminkey");
  let history = useHistory();
  const [heading, setHeading] = useState("");
  const { handleSubmit, register, errors, getValues } = useForm();
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const [item] = useState(current_date);
  const token = localStorage.getItem("token");

  const onSubmit = (value) => {
    let formData = new FormData();
    let file;
    formData.append("title", heading);
    formData.append("type", "image");
    formData.append("date_event", value.date_event);
    var uploadImg = value.uploadImg;
    if (uploadImg) {
      for (var i = 0; i < uploadImg.length; i++) {
        file = uploadImg[i];
        formData.append("upload[]", file);
      }
    }

    // if (uploadImg) {
    //   for (var i = 0; i < uploadImg.length; i++) {
    //     let file = uploadImg[i];
    //     formData.append("upload", file);
    //     formData.append("type", "image")

    //   }
    // }
    axios({
      method: "POST",
      url: `${baseUrl}/cms/uploadphoto`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      let a = res.data;

      if (res.data.code === 1) {
        Swal.fire({
          title: "success",
          html: "Image uploaded successfully",
          icon: "success",
        });
        history.push("/cms/imagelist");
      } else if (res.data.code === 102) {
        history.push("/cms/login");
      }
    });
  };
  return (
    <Layout cmsDashboard="cmsDashboard">
      <MyContainer>
        <Row className="my-2">
          <Col md="4">
            <button className="autoWidthBtn" onClick={() => history.goBack()}>
              Go Back
            </button>
          </Col>
          <Col md="4" align="center">
            <CustomHeading>Photo gallery</CustomHeading>
          </Col>
        </Row>
        <MyBox>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <InnerBox>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_heading,
                    })}
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    ref={register({ required: true })}
                    name="p_heading"
                    placeholder="Please enter heading"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date_event"
                    ref={register}
                    className="form-control"
                    max={item}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <label className="form-label">
                    Photo <sup className="declined"> *</sup>
                  </label>
                  <input
                    type="file"
                    name="uploadImg"
                    ref={register}
                    className="form-control-file manage_file"
                    multiple
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  mmargin: "5px 0",
                  justifyContent: "flex-end",
                }}
              >
                <p>
                  {" "}
                  <sup className="declined"> *</sup>jpeg,gif,png only
                </p>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button className="customBtn mt-5">Submit</button>{" "}
                </div>
              </div>
            </InnerBox>
          </form>
        </MyBox>
      </MyContainer>
    </Layout>
  );
};
export default MediaGallery;

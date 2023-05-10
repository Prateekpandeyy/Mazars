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
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
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
const UploadLinkContent = () => {
  const userId = window.localStorage.getItem("adminkey");
  let history = useHistory();
  const [heading, setHeading] = useState("");
  const [isFile, setIsFile] = useState(true);
  const [file, setFile] = useState("");
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const [item] = useState(current_date);
  const token = localStorage.getItem("token");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const { handleSubmit, register, errors, getValues } = useForm();
  const onSubmit = (value) => {
    if (file?.name?.length > 0) {
      setIsFile(true);
      let formData = new FormData();

      let file;
      formData.append("title", heading);

      var uploadImg = value.p_upload;
      if (uploadImg) {
        for (var i = 0; i < uploadImg.length; i++) {
          file = uploadImg[i];
          formData.append("content", file);
        }
      }

      axios({
        method: "POST",
        url: `${baseUrl}/cms/uploaddocument`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          Swal.fire({
            title: "success",
            html: "Document uploaded successfully",
            icon: "success",
          });
          history.push("/cms/uploadlink");
        } else if (res.data.code === 0) {
          Swal.fire({
            title: "error",
            html: "Please upload valid file",
            icon: "error",
          });
        } else if (res.data.code === 102) {
          history.push("/cms/login");
        }
      });
    } else {
      setIsFile(false);
    }
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
            <CustomHeading>Upload document</CustomHeading>
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
                    placeholder="Please enter title"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <label className="form-label">Document</label>
                  <input
                    type="file"
                    name="p_upload"
                    ref={register}
                    className="form-control"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setIsFile(true);
                    }}
                  />
                  {isFile === false ? (
                    <ErrorMessage>Please upload file</ErrorMessage>
                  ) : (
                    ""
                  )}
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
                    <sup className="declined"> *</sup>pdf, word, document only
                  </p>
                </div>
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
export default UploadLinkContent;

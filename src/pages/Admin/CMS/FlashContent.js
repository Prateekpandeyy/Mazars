import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../../config/config";
import Swal from "sweetalert2";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import Layout from "../../../components/Layout/Layout";
import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Row, Col } from "reactstrap";
import AddEditor from "./AddEditor";
import CustomQuillEditor from "./CustomQuillEditor";
import CustomHeading from "../../../components/Common/CustomHeading";
const FlashContent = () => {
  const { handleSubmit, register, errors } = useForm();
  const [showEditor, setShowEditor] = useState(false);
  const [heading, setHeading] = useState("");
  const [det, addDet] = useState();
  const [stats, setStats] = useState(false);
  const [file, setFile] = useState("");
  const [contentType, setContentType] = useState("Editor");
  const userId = localStorage.getItem("cmsId");
  let history = useHistory();
  let getId = window.location.pathname.split("/").at(-1);

  const token = window.localStorage.getItem("token");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get(
        `${baseUrl}/cms/getallnews?uid=${JSON.parse(userId)}&id=${getId}`,
        myConfig
      )
      .then((res) => {
        res.data.result.map((i) => {
          setHeading(i.heading);
          addDet(i.news);
          setFile(i.file);
          if (i.status == "1") {
            setStats(true);
          } else {
            setStats(false);
          }
          if (i.content_type === "0") {
            setContentType("Doc_upload");
          } else if (i.content_type === "2") {
            addDet(i.content);

            setContentType("Editor");
          } else if (i.content_type === "1") {
            setContentType("Pdf_upload");
          } else if (i.content_type === "3") {
            setContentType("Ppt_upload");
          }
        });
      });
  };
  const onSubmit = (value) => {
    let message = "";
    let formData = new FormData();
    if (contentType !== "Editor") {
      var uploadImg = value.p_draft;

      if (uploadImg) {
        if (contentType === "Doc_upload") {
          formData.append("content_type", 0);
        } else if (contentType === "Pdf_upload") {
          formData.append("content_type", 1);
        } else if (contentType === "Ppt_upload") {
          formData.append("content_type", 3);
        }
        for (var i = 0; i < uploadImg.length; i++) {
          let file = uploadImg[i];
          formData.append("news", file);
        }
      }
      formData.append("heading", value.p_heading);
      {
        stats === true
          ? formData.append("status", 1)
          : formData.append("status", 0);
      }
    } else {
      var myEditor = document.querySelector("#snow-container");
      var html = myEditor.children[0].innerHTML;

      formData.append("news", html);
      formData.append("heading", value.p_heading);
      formData.append("content_type", 2);
      {
        stats === true
          ? formData.append("status", 1)
          : formData.append("status", 0);
      }
    }
    if (getId) {
      formData.append("id", getId);
      message = "Flash updated successfully";
    }
    axios({
      method: "POST",
      url: `${baseUrl}/cms/setnews`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        Swal.fire({
          message: "success",
          html: `${message}`,
          icon: "success",
        });
        history.push("/cms/flash");
      } else if (res.data.code === 102) {
        history.push("/cms/login");
      } else {
        Swal.fire({
          message: "error",
          html: "Something went wrong, please try again",
          icon: "error",
        });
      }
    });
  };
  const myLabel = (e) => {
    setStats(!stats);
  };
  const editorShow = (e) => {
    setContentType(e.target.value);
    if (e.target.value === "Editor") {
      setShowEditor(true);
    }
  };
  return (
    <Layout cmsDashboard="cmsDashboard">
      <Container maxWidth="xl">
        <div className="py-2">
          <Row>
            <Col md="4">
              <button className="autoWidthBtn" onClick={() => history.goBack()}>
                Go Back
              </button>
            </Col>
            <Col md="4" align="center">
              <CustomHeading>Flash updates</CustomHeading>
            </Col>
          </Row>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="row">
            <div className="col-md-4">
              <label>Heading </label>
              <input
                type="text"
                name="p_heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className={classNames("form-control", {
                  "is-invalid": errors.p_heading,
                })}
                ref={register({ required: true })}
              />
            </div>
            <div className="col-md-4 col-sm-12">
              <label className="form-label">Type</label>
              <select
                multiple={false}
                onChange={(e) => editorShow(e)}
                className={classNames("form-control", {
                  "is-invalid": errors.p_content,
                })}
                value={contentType}
                ref={register({ required: true })}
                name="p_content"
              >
                <option value="Editor">Editor</option>
                <option value="Doc_upload">Word Document</option>
                <option value="Pdf_upload">PDF</option>
                <option value="Ppt_upload">PPT</option>
              </select>
            </div>
            <div className="col-md-12">
              {getId ? (
                <>
                  {contentType !== "Editor" ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label className="form-label">
                          Upload Your Document
                        </label>
                        <input
                          type="file"
                          name="p_draft"
                          ref={register}
                          className="form-control-file manage_file"
                        />
                      </div>
                      <span style={{ display: "flex", cursor: "pointer" }}>
                        <a href={`${baseUrl3}/${file}`} target="_blank">
                          <i className="fa fa-photo"></i>
                          <span style={{ marginLeft: "10px" }}>
                            View document
                          </span>
                        </a>
                      </span>
                    </form>
                  ) : (
                    ""
                  )}
                  {contentType === "Editor" ? (
                    <div className="row">
                      <div className="col-md-12">
                        <label className="form-label">Content</label>{" "}
                      </div>

                      <div className="col-md-12">
                        <CustomQuillEditor
                          showEditor={showEditor}
                          content={det}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  {contentType !== "Editor" ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label className="form-label">
                          Upload Your Document
                        </label>
                        <input
                          type="file"
                          name="p_draft"
                          ref={register}
                          className="form-control-file manage_file"
                        />
                      </div>
                    </form>
                  ) : (
                    ""
                  )}
                  {contentType === "Editor" ? (
                    <div className="row">
                      <div className="col-md-12">
                        <label className="form-label">Content</label>{" "}
                      </div>

                      <div
                        className="col-md-12"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <AddEditor />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
            <div className="col-md-3">
              <span style={{ margin: "10px 0" }}>
                <input
                  type="checkbox"
                  style={{ margin: "10px 0px" }}
                  name="hide"
                  checked={stats}
                  id="hide"
                  onChange={(e) => myLabel(e)}
                ></input>
                <label htmlFor="hide" style={{ margin: "10px" }}>
                  {" "}
                  Publish
                </label>
              </span>
            </div>
            <div className="col-md-12">
              <button type="submit" className="customBtn my-2">
                Submit
              </button>
            </div>
          </div>
        </form>
      </Container>
    </Layout>
  );
};
export default FlashContent;

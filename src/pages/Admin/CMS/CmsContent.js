import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { styled } from "@mui/material";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../../config/config";
import "./map.css";
import Swal from "sweetalert2";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory, useParams } from "react-router";
import { Row, Col } from "reactstrap";
import "react-quill/dist/quill.snow.css";
import { Spinner } from "reactstrap";
import CustomQuillEditor from "./CustomQuillEditor";
import { Markup } from "interweave";
import CustomHeading from "../../../components/Common/CustomHeading";
const MyContainer = styled(Container)({});
const CmsContent = () => {
  const userId = localStorage.getItem("cmsId");
  const { handleSubmit, register, errors, getValues } = useForm();

  const [stats, setStats] = useState(false);
  const [det, addDet] = useState("");
  const [heading, setHeading] = useState("");
  const [writer, setWriter] = useState("");
  const [date, setDate] = useState("");
  const [pageto, setTopage] = useState("direct");
  const [editData, setEditData] = useState();
  const [editorError, setEditorError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showDoc, setShowDoc] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [file, setFile] = useState("");
  const [contentType, setContentType] = useState("Editor");
  let history = useHistory();
  let getId = useParams();
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const [item] = useState(current_date);
  const Quill = require("quill");
  const token = localStorage.getItem("token");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = (e) => {
    if (getId.id !== undefined) {
      axios
        .get(
          `${baseUrl}/cms/getallarticles?uid=${JSON.parse(userId)}&id=${
            getId.id
          }`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            res.data.result.map((i) => {
              if (i.id === getId.id) {
                setTopage(i.type);
                setHeading(i.heading);
                setWriter(i.writer);
                setDate(i.publish_date);
                let a = myFun(i.content);

                setEmail(i.email);
                setFile(i.file);
                if (i.status ===  1) {
                  setStats(true);
                } else {
                  setStats(false);
                  addDet(i.content);
                }
                if (i.content_type === "0") {
                  setShowDoc(true);
                  setContentType("Doc_upload");
                } else if (i.content_type === "2") {
                  addDet(i.content);
                  setShowDoc(false);
                  setContentType("Editor");
                } else if (i.content_type === "1") {
                  setContentType("Pdf_upload");
                } else if (i.content_type === "3") {
                  setContentType("Ppt_upload");
                }
              }
            });
          } else if (res.data.code === 102) {
            history.push("/cms/login");
          }
        });
    }
  };

  const myFun = (a) => {
    return <Markup content={a} />;
  };
  const getToPage = (e) => {
    setTopage(e);
  };
  const onSubmit = (e) => {
    let message = "Content created successfully";

    let formData = new FormData();

    if (contentType !== "Editor") {
      if (contentType === "Doc_upload") {
        formData.append("content_type", 0);
      } else if (contentType === "Pdf_upload") {
        formData.append("content_type", 1);
      } else if (contentType === "Ppt_upload") {
        formData.append("content_type", 3);
      }
      var uploadImg = e.p_draft;
      if (uploadImg.length > 0) {
        for (var i = 0; i < uploadImg.length; i++) {
          let file = uploadImg[i];
          formData.append("content", file);
        }
      } else {
        Swal.fire({
          title: "error",
          html: "Please upload file",
          icon: "error",
        });
      }
    } else {
      var myEditor = document.querySelector("#snow-container");
      var html = myEditor.children[0].innerHTML;
      console.log("htmll", myEditor.children[0].innerHTML);
      if (myEditor.children[0].innerHTML.trim() === "<p><br></p>") {
        return false;
      }

      if (html.length > 0) {
        formData.append("content", html);
        formData.append("content_type", 2);
      } else {
        Swal.fire({
          title: "error",
          html: "Please write content",
          icon: "error",
        });
        return false;
      }
    }

    formData.append("type", pageto);

    {
      stats === true
        ? formData.append("status", 1)
        : formData.append("status", 0);
    }
    setLoading(true);
    formData.append("heading", heading);
    formData.append("writer", writer);
    formData.append("publish_date", date);
    formData.append("email", email);
    if (getId.id !== undefined) {
      formData.append("id", getId.id);
      message = "Content updated successfully";
    }
    axios({
      method: "POST",
      url: `${baseUrl}/cms/setarticles`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        setLoading(false);
        Swal.fire({
          title: "success",
          html: `${message}`,
          icon: "success",
        });
        history.push("/cms/cms");
      } else if (res.data.code === 0) {
        setLoading(false);
        Swal.fire({
          title: "error",
          html: `${res.data.message}`,
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
      <MyContainer>
        <div className="py-2">
          <Row>
            <Col md="4">
              <button className="autoWidthBtn" onClick={() => history.goBack()}>
                Go Back
              </button>
            </Col>
            <Col md="4">
              <CustomHeading>Edit articles</CustomHeading>
            </Col>
          </Row>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <label className="form-label">Category</label>
              <select
                onChange={(e) => getToPage(e.target.value)}
                value={pageto}
                multiple={false}
                className={classNames("form-control", {
                  "is-invalid": errors.p_category,
                })}
                ref={register({ required: true })}
                name="p_category"
              >
                <option value="DT">DT</option>
                <option value="IDT">IDT</option>
                <option value="DT&IDT">DT & IDT</option>
              </select>
            </div>
            <div className="col-md-4 col-sm-12">
              <label className="form-label">Heading</label>
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
                <option value="Doc_upload">Word document</option>
                <option value="Pdf_upload">PDF</option>
                <option value="Ppt_upload">PPT</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-4">
              <label className="form-label">Writer</label>
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.p_wirter,
                })}
                onChange={(e) => setWriter(e.target.value)}
                value={writer}
                ref={register({ required: true })}
                name="p_wirter"
                placeholder="Please enter writer name"
              />
            </div>
            <div className="col-md-4 col-sm-4">
              <label className="form-label">Date of publishing</label>
              <input
                type="date"
                className={classNames("form-control", {
                  "is-invalid": errors.p_publisher,
                })}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                ref={register({ required: true })}
                name="p_publisher"
                placeholder="Please enter heading"
                max={item}
              />
            </div>
            <div className="col-md-4 col-sm-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={classNames("form-control", {
                  "is-invalid": errors.p_email,
                })}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={register({ required: true })}
                name="p_email"
                placeholder="Please enter email"
              />
            </div>
          </div>

          {contentType !== "Editor" ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Upload your document</label>
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
                    <span style={{ marginLeft: "10px" }}>View document</span>
                  </a>
                </span>
              </form>
            </>
          ) : (
            <>
              <div className="row">
                <div className="col-md-12">
                  <label className="form-label">Content</label>{" "}
                </div>

                <div
                  className="col-md-12"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <CustomQuillEditor content={det} showEditor={showEditor} />
                </div>
              </div>
            </>
          )}

          <div className="row">
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
          </div>
          <div className="row">
            <div className="col-md-12">
              {loading ? (
                <Spinner color="primary" />
              ) : (
                <button className="customBtn my-2">Submit</button>
              )}{" "}
            </div>
          </div>
        </form>
      </MyContainer>
    </Layout>
  );
};
export default CmsContent;

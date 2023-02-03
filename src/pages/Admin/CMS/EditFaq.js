import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { styled } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./map.css";
import Swal from "sweetalert2";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory, useParams } from "react-router";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomQuillEditor from "./CustomQuillEditor";
import CustomHeading from "../../../components/Common/CustomHeading";
const MyContainer = styled(Container)({});
const EditFaq = () => {
  const [det, addDet] = useState();
  const [question, setQuestion] = useState(" ");
  const [stats, setStats] = useState(false);
  let history = useHistory();
  let getId = useParams();
  const userId = localStorage.getItem("adminkey");
  const { handleSubmit, register, errors, getValues } = useForm();
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
          `${baseUrl}/cms/getallfaq?uid=${JSON.parse(userId)}&id=${getId.id}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            res.data.result.map((i) => {
              if (i.id === getId.id) {
                setQuestion(i.question);
                addDet(i.answer);
                if (i.status ===  1) {
                  setStats(true);
                } else {
                  setStats(false);
                }
              }
            });
          }
        });
    }
  };
  const onSubmit = (e) => {
    var myEditor = document.querySelector("#snow-container");
    var html = myEditor.children[0].innerHTML;
    addDet(html);
    let formData = new FormData();

    formData.append("question", question);
    formData.append("answer", html);
    formData.append("status", Number(stats));
    formData.append("id", getId.id);
    axios({
      method: "POST",
      url: `${baseUrl}/cms/setfaq`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        Swal.fire({
          title: "success",
          html: "FAQ updated successfully",
          icon: "success",
        });
        history.push("/cms/faqlist");
      } else if (res.data.code === 102) {
        history.push("/cms/login");
      }
    });
  };
  const myLabel = (e) => {
    setStats(!stats);
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
              <CustomHeading>FAQs</CustomHeading>
            </Col>
          </Row>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Answer</label>{" "}
            </div>

            <div className="col-md-12">
              <CustomQuillEditor content={det} />
            </div>
            
          </div>
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
              <button className="customBtn my-2">Submit</button>{" "}
            </div>
          </div>
        </form>
      </Container>
    </Layout>
  );
};
export default EditFaq;

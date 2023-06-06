import React, { useState, useEffect } from "react";
import { styled } from "@material-ui/styles";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../config/config";
import { Markup } from "interweave";
import { Breadcrumbs, Box } from "@material-ui/core";
import CommonServices from "../../common/common.js";
import classes from "./design.module.css";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import { Link, useParams, useHistory } from "react-router-dom";
import { VscFilePdf } from "react-icons/vsc";
import { Viewer } from "@react-pdf-viewer/core"; // install this library
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core"; // install this library
import MyContainer from "../../components/Common/MyContainer";
import MainText from "../../components/Common/MainText";
import Layout from "../../components/Layout/Layout";
const ArticleWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",

  padding: "5px",
});

const UpdateDetails = () => {
  const [data, setData] = useState([]);
  let id = useParams();
  const userId = window.localStorage.getItem("userid");
  let history = useHistory();
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getData = (e) => {
    axios
      .get(`${baseUrl}//customers/getupdatesdetail?id=${id.id}`, myConfig)
      .then((res) => {
        setData(res.data.result);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const downloadPdf = (e, name) => {
    const myConfig2 = {
      headers: {
        uit: token,
      },
      responseType: "blob",
    };
    axios
      .get(
        `${baseUrl}/customers/viewclientdocument?id=${e}&doctype=1`,
        myConfig2
      )
      .then((res) => {
        if (res.status === 200) {
          window.URL = window.URL || window.webkitURL;
          var url = window.URL.createObjectURL(res.data);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;

          a.download = name;
          a.target = "_blank";
          a.click();
        }
      });
  };
  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <>
        <OuterloginContainer
          onCopy={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          <MyContainer>
            <div className={classes.articleContent}>
              {data.map((i) => (
                <div className={classes.articlesDetails}>
                  {history.location.index && (
                    <Breadcrumbs
                      separator=">"
                      maxItems={3}
                      aria-label="breadcrumb"
                      style={{ fontSize: "18px" }}
                    >
                      <Link
                        underline="hover"
                        color="inherit"
                        to="/customer/updatedirect"
                      >
                        Update
                      </Link>

                      {history.location.index === "miscellaneous" ? (
                        <Link
                          underline="hover"
                          color="inherit"
                          to={`/customer/${history.location.index}`}
                        >
                          Miscellaneous
                        </Link>
                      ) : (
                        <Link
                          underline="hover"
                          color="inherit"
                          to={`/customer/update${history.location.index}`}
                        >
                          {CommonServices.capitalizeFirstLetter(
                            history.location.index
                          ) + " tax"}
                        </Link>
                      )}
                    </Breadcrumbs>
                  )}
                  <ArticleWrapper>
                    <MainText>
                      {CommonServices.capitalizeFirstLetter(i.heading)}
                    </MainText>

                    <MainText style={{ margin: "8px 0px 12px 0px" }}>
                      Date of publishing :{" "}
                      {i.publish_date.split("-").reverse().join("-")}
                    </MainText>

                    {i.content_type === "2" ? (
                      <div id="artContent" className="updatesContent">
                        <Markup content={i.content} />
                      </div>
                    ) : (
                      " "
                    )}
                    {i.content_type === "0" || i.content_type === "1" ? (
                      <div id="artContent">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                          <Viewer fileUrl={`${baseUrl3}/${i.file}`}></Viewer>
                        </Worker>
                      </div>
                    ) : (
                      ""
                    )}

                    {i.content_type === "3" ? (
                      <div id="artContent">
                        <iframe
                          src={`https://view.officeapps.live.com/op/embed.aspx?src=${baseUrl3}/${i.file}`}
                          width="100%"
                          height="600px"
                          frameBorder="0"
                          title="slides"
                        ></iframe>
                      </div>
                    ) : (
                      ""
                    )}
                  </ArticleWrapper>
                  <a
                    onClick={(e) => downloadPdf(i.id, i.heading)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.myLink}
                  >
                    <button className="downloadBtnPdf">
                      {" "}
                      Download{" "}
                      <VscFilePdf
                        style={{
                          display: "flex",
                          margin: "0 10px",
                          color: "#e4f0fa",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </MyContainer>
        </OuterloginContainer>
      </>
    </Layout>
  );
};
export default UpdateDetails;

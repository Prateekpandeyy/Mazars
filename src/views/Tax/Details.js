import React, { useState, useEffect } from "react";
import { styled } from "@material-ui/styles";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../config/config";
import { Markup } from "interweave";
import { Breadcrumbs, Box } from "@material-ui/core";
import CommonServices from "../../common/common.js";
import classes from "./design.module.css";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import { Link, useHistory } from "react-router-dom";
import { VscFilePdf } from "react-icons/vsc";
import Layout from "../../components/Layout/Layout";
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import MyContainer from "../../components/Common/MyContainer";
import MainText from "../../components/Common/MainText";
import $ from "jquery";
const ArticleWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",

  padding: "5px",
});

const Details = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const userId = window.localStorage.getItem("userid");
  const getData = (e) => {
    $("#artContent a[href^='http://']").attr("target", "_blank");
    if (history.location.index !== undefined) {
      axios
        .get(`${baseUrl}/customers/getarticles?id=${history.location.index}`)
        .then((res) => {
          setData(res.data.result);
        });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <>
        <OuterloginContainer>
          <MyContainer>
            <div className={classes.articleContent}>
              {data.map((i) => (
                <div className={classes.articlesDetails}>
                  <Breadcrumbs
                    separator=">"
                    maxItems={3}
                    aria-label="breadcrumb"
                    style={{ fontSize: "18px" }}
                  >
                    <Link
                      underline="hover"
                      color="inherit"
                      to="/customer/direct"
                    >
                      Articles
                    </Link>
                  </Breadcrumbs>
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
                    href={`${baseUrl3}/${i.file}`}
                    target="_blank"
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
          <Footer />
        </OuterloginContainer>
      </>
    </Layout>
  );
};
export default Details;

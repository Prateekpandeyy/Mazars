import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useHistory } from "react-router";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../config/config";
import ReactPlayer from "react-player";
import CloseIcon from "@material-ui/icons/Close";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { AiOutlinePlaySquare } from "react-icons/ai";
import classes from "./design.module.css";
import MyContainer from "../../components/Common/MyContainer";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import Layout from "../../components/Layout/Layout";
import CoolLightbox from "./CoolLightbox";
const Videogallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [videoId, setVideoId] = useState();
  const [play, isPlay] = useState(false);
  const [title, setTitle] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const userId = window.localStorage.getItem("userid");
  var aa = localStorage.getItem("videoId");
  let history = useHistory();
  useEffect(() => {
    getGalleryVideo();
  }, []);
  const getGalleryVideo = () => {
    if (history.location.index) {
      localStorage.setItem("videoId", history.location.index.id);
      let kd = [];
      axios
        .get(
          `${baseUrl}/customers/getvideogallerydetail?id=${history.location.index.id}`
        )
        .then((res) => {
          setGalleryData(res.data.result);
          res.data.result.map((i) => {
            setTitle(i.title);

            if (i.name.split(".")[1] === "mp4") {
            } else {
              let a = {
                src: `${baseUrl3}/assets/gallery/${i.name}`,
                loading: "lazy",
                alt: i.name,
              };
              kd.push(a);
            }
          });

          setImageData(kd);
          return true;
        });
    } else {
      let kd = [];
      axios
        .get(`${baseUrl}/customers/getvideogallerydetail?id=${aa}`)
        .then((res) => {
          setGalleryData(res.data.result);
          res.data.result.map((i) => {
            setTitle(i.title);
            if (i.name.split(".")[1] === "mp4") {
            } else {
              let a = {
                src: `${baseUrl3}/assets/gallery/${i.name}`,
                loading: "lazy",
                alt: i.name,
              };
              kd.push(a);
            }
          });
          setImageData(kd);
          return true;
        });
    }
  };
  const playVideo2 = (e) => {
    isPlay(true);
    setVideoId(`${baseUrl3}/assets/gallery/${e}`);
  };

  return (
    <>
      {userId ? (
        <Layout custDashboard="custDashboard" custUserId={userId}>
          {fullScreen === true ? (
            <CoolLightbox setFullScreen={setFullScreen} fullData={imageData} />
          ) : (
            ""
          )}
          <OuterloginContainer>
            <MyContainer>
              <div className={classes.articleContent}>
                {
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
                        to="/customer/media"
                      >
                        Media Gallery
                      </Link>
                      <Link
                        underline="hover"
                        color="inherit"
                        to="/customer/videolist"
                      >
                        Video Gallery
                      </Link>
                      <Typography
                        color="text.primary"
                        style={{ wordBreak: "break-all" }}
                      >
                        {" "}
                        {title}
                      </Typography>
                    </Breadcrumbs>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {galleryData.map((i) => (
                        <div className="galleryBoxvideo">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              height: "100%",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            {(i.name.split(".")[1] === "mp4") === true ? (
                              <>
                                <div
                                  style={{
                                    position: "relative",
                                    margin: "10px 0px",
                                    maxHeight: "100px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <video
                                    onClick={(e) => playVideo2(i.name)}
                                    style={{
                                      display: "flex",
                                      zIndex: 1,
                                      width: "100%",
                                      height: "130px",
                                    }}
                                    id={i.id}
                                    src={`${baseUrl3}/assets/gallery/${i.name}`}
                                  />
                                  <span onClick={(e) => playVideo2(i.name)}>
                                    <AiOutlinePlaySquare
                                      style={{
                                        display: "flex",
                                        color: "red",
                                        width: "40px",
                                        height: "45",
                                        position: "absolute",
                                        top: "33%",
                                        left: "40%",
                                      }}
                                    />
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                {history.location.index ? (
                                  <img
                                    style={{
                                      display: "flex",
                                      zIndex: 1,
                                      maxWidth: "150px",
                                      maxHeight: "100px",
                                      height: "100%",
                                      width: "100%",
                                    }}
                                    onClick={(e) => setFullScreen(true)}
                                    alt="Gallery"
                                    id={i.id}
                                    src={`${baseUrl3}/assets/gallery/${i.name}`}
                                  />
                                ) : (
                                  <img
                                    style={{
                                      display: "flex",
                                      zIndex: 1,
                                      maxWidth: "150px",
                                      maxHeight: "100px",
                                      height: "100%",
                                      width: "100%",
                                    }}
                                    onClick={(e) => setFullScreen(true)}
                                    alt="Refresh Gallery"
                                    id={i.id}
                                    src={`${baseUrl3}/assets/gallery/${i.name}`}
                                  />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              </div>
              {play === true ? (
                <div className="modalBox">
                  <div className="boxContainer2">
                    <div className="canBtn" title="cancel">
                      <h4> Player</h4>
                      <CloseIcon
                        onClick={() => isPlay(false)}
                        id="myBtn"
                      />{" "}
                    </div>

                    <ReactPlayer
                      url={videoId}
                      controls={true}
                      playing={true}
                      width="100%"
                      style={{ backgroundColor: "#fff" }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </MyContainer>
            <Footer />
          </OuterloginContainer>
        </Layout>
      ) : (
        <OuterloginContainer>
          <Header noSign="noSign" />
          <MyContainer>
            <div className={classes.articleContent}>
              {
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
                      to="/customer/media"
                    >
                      Media Gallery
                    </Link>
                    <Link
                      underline="hover"
                      color="inherit"
                      to="/customer/videolist"
                    >
                      Video Gallery
                    </Link>
                    {title && (
                      <Typography color="text.primary"> {title}</Typography>
                    )}
                  </Breadcrumbs>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      height: "130px",
                      overflow: "hidden",
                    }}
                  >
                    {galleryData.map((i) => (
                      <div className="galleryBoxvideo">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            height: "100%",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          {(i.name.split(".")[1] === "mp4") === true ? (
                            <>
                              <div style={{ position: "relative" }}>
                                <video
                                  onClick={(e) => playVideo2(i.name)}
                                  style={{
                                    display: "flex",
                                    zIndex: 1,
                                    width: "100%",
                                  }}
                                  id={i.id}
                                  src={`${baseUrl3}/assets/gallery/${i.name}`}
                                />
                                <span onClick={(e) => playVideo2(i.name)}>
                                  <AiOutlinePlaySquare
                                    style={{
                                      display: "flex",
                                      color: "red",
                                      width: "40px",
                                      height: "40px",
                                      position: "absolute",
                                      top: "33%",
                                      left: "50%",
                                    }}
                                  />
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              {history.location.index ? (
                                <Link
                                  style={{ display: "flex", width: "100%" }}
                                  to={{
                                    pathname: "/customer/imagegallery",
                                    index: i.name,
                                  }}
                                >
                                  <img
                                    style={{
                                      display: "flex",
                                      zIndex: 1,
                                      maxWidth: "150px",
                                      maxHeight: "100px",
                                      height: "100%",
                                      width: "100%",
                                    }}
                                    alt="Gallery"
                                    id={i.id}
                                    src={`${baseUrl3}/assets/gallery/${i.name}`}
                                  />
                                </Link>
                              ) : (
                                <Link
                                  style={{ display: "flex", width: "100%" }}
                                  to={{
                                    pathname: "/customer/imagegallery",
                                    index: i.name,
                                  }}
                                >
                                  <img
                                    style={{
                                      display: "flex",
                                      zIndex: 1,
                                      maxWidth: "150px",
                                      maxHeight: "100px",
                                      height: "100%",
                                      width: "100%",
                                    }}
                                    alt="Refresh Gallery"
                                    id={i.id}
                                    src={`${baseUrl3}/assets/gallery/${i.name}`}
                                  />
                                </Link>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            </div>
            {play === true ? (
              <div className="modalBox">
                <div className="boxContainer2">
                  <div className="canBtn" title="cancel">
                    <h4> Player</h4>
                    <CloseIcon onClick={() => isPlay(false)} id="myBtn" />{" "}
                  </div>

                  <ReactPlayer
                    url={videoId}
                    controls={true}
                    playing={true}
                    width="100%"
                    style={{ backgroundColor: "#fff" }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </MyContainer>
          <Footer />
        </OuterloginContainer>
      )}
    </>
  );
};
export default Videogallery;

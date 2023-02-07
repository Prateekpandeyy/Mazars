import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import ReactPlayer from "react-player";
import CloseIcon from "@material-ui/icons/Close";
import { Breadcrumbs, Typography } from "@material-ui/core";
import pngAlbum from "./album.png";
import classes from "./design.module.css";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import MyContainer from "../../components/Common/MyContainer";
import Swal from "sweetalert2";
import CustomTypography from "../../components/Common/CustomTypography";
import Layout from "../../components/Layout/Layout";
import SearchBtn from "../../components/Common/SearchBtn";
import { goToLogin } from "../../components/Common/commonFunction/GoToLogin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const VideoList = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [videoId] = useState();
  const [play, isPlay] = useState(false);
  const [searchText, setSearchText] = useState("");
  const userId = window.localStorage.getItem("userid");
  let history = useHistory();
  useEffect(() => {
    getGalleryData();
  }, []);
  const getGalleryData = () => {
    axios.get(`${baseUrl}/customers/getvideogallery`).then((res) => {
      if (res.data.code === 1) {
        setGalleryData(res.data.result);
      }
    });
  };
  const searchArticle = () => {
    let formData = new FormData();
    formData.append("content", searchText);
    axios({
      method: "POST",
      url: `${baseUrl}/customers/getvideogallery`,
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        setGalleryData(res.data.result);
      }
    });
  };

  return (
    <>
      {userId ? (
        <Layout custDashboard="custDashboard" custUserId={userId}>
          <OuterloginContainer>
            <MyContainer>
              <div className={classes.articleContent}>
                {
                  <div className={classes.articlesDetails}>
                    <div className="bredcrubmWrapper">
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
                          Media gallery
                        </Link>
                        <Typography color="text.primary">
                          {" "}
                          Video gallery
                        </Typography>
                      </Breadcrumbs>
                      <SearchBtn outer="outer">
                        <input
                          placeholder="Please enter text"
                          className="form-control"
                          type="Please enter text"
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                          onClick={(e) => searchArticle()}
                          className="customBtn mx-2"
                        >
                          Search
                        </button>
                      </SearchBtn>
                    </div>

                    <div className={classes.articlesDetailsgallery}>
                      {galleryData.map((i) => (
                        <div className="galleryBoxvideo">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              height: "70%",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <Link
                              style={{ display: "flex" }}
                              to={{
                                pathname: "/customer/videogallery",
                                index: i,
                              }}
                            >
                              <img
                                src={pngAlbum}
                                style={{
                                  display: "flex",
                                  width: "50%",
                                  height: "50%",
                                }}
                                id={i.id}
                                alt="album"
                              />
                            </Link>
                          </div>
                          <div
                            style={{
                              padding: "5px 10px",
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            <Link
                              style={{ display: "flex", overflow: "hidden" }}
                              title={i.title}
                              to={{
                                pathname: "/customer/videogallery",
                                index: i,
                              }}
                            >
                              <CustomTypography
                                style={{
                                  overflow: "hidden",
                                  wordBreak: "break-all",
                                  height: "40px",
                                }}
                                hover="hover"
                                cursor="pointer"
                              >
                                {i.title}
                              </CustomTypography>
                            </Link>

                            <CustomTypography>
                              {i.created_date
                                .split(" ")[0]
                                .split("-")
                                .reverse()
                                .join("-")}
                            </CustomTypography>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              </div>
              {play === true ? (
                <div className="modalBox">
                  <div className="boxContainer">
                    <div className="canBtn" title="cancel">
                      <h4>Recording Player</h4>
                      <CloseIcon
                        onClick={() => isPlay(false)}
                        id="myBtn"
                      />{" "}
                    </div>

                    <div className="my2">
                      <ReactPlayer
                        url={videoId}
                        controls={true}
                        playing={true}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </MyContainer>
          </OuterloginContainer>
        </Layout>
      ) : (
        <OuterloginContainer>
          <Header noSign="noSign" />

          <MyContainer>
            <div className={classes.articleContent}>
              {
                <div className={classes.articlesDetails}>
                  <div className="bredcrubmWrapper">
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
                        Media gallery
                      </Link>
                      <Typography color="text.primary">
                        {" "}
                        Video gallery
                      </Typography>
                    </Breadcrumbs>
                    <SearchBtn outer="outer">
                      <input
                        placeholder="Please enter text"
                        className="form-control"
                        type="Please enter text"
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                      <button
                        onClick={(e) => searchArticle()}
                        className="customBtn mx-2"
                      >
                        Search
                      </button>
                    </SearchBtn>
                  </div>

                  <div className={classes.articlesDetailsgallery}>
                    {galleryData.map((i) => (
                      <div className="galleryBoxvideo">
                        <div
                          style={{
                            display: "flex",

                            height: "70%",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={pngAlbum}
                            style={{
                              display: "flex",
                              width: "50%",
                              height: "50%",
                            }}
                            id={i.id}
                            alt="album"
                            onClick={(e) =>
                              goToLogin(history, "Please login to view content")
                            }
                          />
                        </div>
                        <div
                          style={{
                            padding: "5px 10px",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <CustomTypography
                            title={i.title}
                            style={{
                              overflow: "hidden",
                              wordBreak: "break-all",
                              height: "40px",
                            }}
                            cursor="pointer"
                            onClick={(e) =>
                              goToLogin(history, "Please login to view content")
                            }
                          >
                            {i.title}
                          </CustomTypography>
                          <CustomTypography>
                            {i.created_date
                              .split(" ")[0]
                              .split("-")
                              .reverse()
                              .join("-")}
                          </CustomTypography>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            </div>
            {play === true ? (
              <div className="modalBox">
                <div className="boxContainer">
                  <div className="canBtn" title="cancel">
                    <h4>Recording Player</h4>
                    <CloseIcon onClick={() => isPlay(false)} id="myBtn" />{" "}
                  </div>

                  <div className="my2">
                    <ReactPlayer url={videoId} controls={true} playing={true} />
                  </div>
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
export default VideoList;

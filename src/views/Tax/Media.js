import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import pngAlbum from "./album.png";
import classes from "./design.module.css";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import MyContainer from "../../components/Common/MyContainer";
import CustomTypography from "../../components/Common/CustomTypography";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import SearchBtn from "../../components/Common/SearchBtn";
const Media = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const userId = window.localStorage.getItem("userid");

  useEffect(() => {
    getGalleryData();
  }, []);
  const getGalleryData = () => {
    axios.get(`${baseUrl}/customers/getgallery`).then((res) => {
      setGalleryData(res.data.result);
    });
  };
  const searchArticle = () => {
    let formData = new FormData();
    formData.append("content", searchText);
    axios({
      method: "POST",
      url: `${baseUrl}/customers/getgallery`,
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        setGalleryData(res.data.result);
      }
    });
  };
  const goToLogin = (e) => {
    Swal.fire({
      html: "Please login to view content",
    });
  };
  return (
    <>
      {userId ? (
        <Layout custDashboard="custDashboard" custUserId={userId}>
          <OuterloginContainer>
            <SearchBtn>
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
                        Media gallery
                      </Link>
                      <Typography color="text.primary">
                        {" "}
                        Photo gallery
                      </Typography>
                    </Breadcrumbs>

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
                                pathname: "/customer/imagegallery",
                                index: i,
                                hash: "images",
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
                                alt="Png Album"
                              />
                            </Link>
                          </div>
                          <div
                            style={{
                              padding: "5px 10px",
                              height: "70px",
                              overflow: "hidden",
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            <CustomTypography>{i.title}</CustomTypography>
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
            </MyContainer>
          </OuterloginContainer>
        </Layout>
      ) : (
        <OuterloginContainer>
          <Header noSign="noSign" />
          <SearchBtn>
            <input
              placeholder="Please enter text"
              className="form-control"
              type="Please enter text"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={(e) => searchArticle()} className="customBtn mx-2">
              Search
            </button>
          </SearchBtn>
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
                      Media gallery
                    </Link>
                    <Typography color="text.primary"> Photo gallery</Typography>
                  </Breadcrumbs>

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
                            onClick={(e) => goToLogin(e)}
                            id={i.id}
                            alt="Png Album"
                          />
                        </div>
                        <div
                          style={{
                            padding: "5px 10px",
                            height: "70px",
                            overflow: "hidden",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <CustomTypography>{i.title}</CustomTypography>
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
          </MyContainer>
          <Footer />
        </OuterloginContainer>
      )}
    </>
  );
};
export default Media;

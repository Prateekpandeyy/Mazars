import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { baseUrl, baseUrl3 } from "../../config/config";
import axios from "axios";
import classes from "./design.module.css";
import MyContainer from "../../components/Common/MyContainer";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import Layout from "../../components/Layout/Layout";
import CoolLightbox from "./CoolLightbox";
const GalleryVideo = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [fullData, setFullData] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const userId = window.localStorage.getItem("userid");
  let history = useHistory();
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    let obj = [];
    let kd = [];
    if (history.location.hash === "#images") {
      axios
        .get(
          `${baseUrl}/customers/getgallerydetail?id=${history.location.index.id}`,
          myConfig
        )
        .then((res) => {
          setImages(res.data.result);
          res.data.result.map((i) => {
            setTitle(i.title);
            let a = {
              src: `${baseUrl3}/assets/gallery/${i.name}`,
              loading: "lazy",
              alt: i.name,
            };
            kd.push(a);
          });
          setFullData(kd);
        });
    } else if (typeof history.location?.index?.id === "string") {
      axios
        .get(
          `${baseUrl}/customers/getvideogallery?id=${history.location?.index?.id}`
        )
        .then((res) => {
          res.data.result.map((i) => {
            setTitle(i.title);
            let a = {
              original: `${baseUrl3}/assets/gallery/${i.name}`,
              thumbnail: `${baseUrl3}/assets/gallery/${i.name}`,
            };
            obj.push(a);

            setImages(obj);
          });
        });
    } else {
      setTitle(history.location?.index?.split(".")[0]);

      let a = {
        original: `${baseUrl3}/assets/gallery/${history.location.index}`,
        thumbnail: `${baseUrl3}/assets/gallery/${history.location.index}`,
      };
      obj.push(a);

      setImages(obj);
    }
  };
  return (
    <>
      <>
        {userId ? (
          <Layout custDashboard="custDashboard" custUserId={userId}>
            {fullScreen === true ? (
              <CoolLightbox setFullScreen={setFullScreen} fullData={fullData} />
            ) : (
              ""
            )}
            <OuterloginContainer>
              <MyContainer>
                <div className={classes.articleContent}>
                  <div className={classes.articlesDetails}>
                    <>
                      <Breadcrumbs
                        separator=">"
                        maxItems={3}
                        aria-label="breadcrumb"
                        style={{ fontSize: "18px" }}
                      >
                        <Link
                          underline="hover"
                          color="inherit"
                          to={`/customer/media`}
                        >
                          Media gallery
                        </Link>
                        {typeof history.location.index === "object" ? (
                          <Link
                            underline="hover"
                            color="inherit"
                            to={`/customer/media`}
                          >
                            Photo gallery
                          </Link>
                        ) : (
                          <Link
                            underline="hover"
                            color="inherit"
                            to={`/customer/videogallery`}
                          >
                            Video gallery
                          </Link>
                        )}

                        <Typography style={{ wordBreak: "break-all" }}>
                          {title}
                        </Typography>
                      </Breadcrumbs>
                    </>

                    <div className="image-container">
                      {images.map((i) => (
                        <div className="imgBox">
                          <img
                            src={`${baseUrl3}/assets/gallery/${
                              i?.name.split(".")[0] +
                              "_thumb." +
                              i?.name.split(".")[1]
                            }`}
                            alt="Images album"
                            className="img-responsive"
                            onClick={(e) => setFullScreen(true)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </MyContainer>
            </OuterloginContainer>
          </Layout>
        ) : (
          <OuterloginContainer>
            <Header noSign="noSign" />
            <MyContainer>
              <div className={classes.articleContent}>
                <div className={classes.articlesDetails}>
                  <>
                    <Breadcrumbs
                      separator=">"
                      maxItems={3}
                      aria-label="breadcrumb"
                      style={{ fontSize: "18px" }}
                    >
                      <Link
                        underline="hover"
                        color="inherit"
                        to={`/customer/media`}
                      >
                        Media gallery
                      </Link>
                      {typeof history.location.index === "object" ? (
                        <Link
                          underline="hover"
                          color="inherit"
                          to={`/customer/media`}
                        >
                          Photo gallery
                        </Link>
                      ) : (
                        <Link
                          underline="hover"
                          color="inherit"
                          to={`/customer/videogallery`}
                        >
                          Video gallery
                        </Link>
                      )}

                      <Typography>{title}</Typography>
                    </Breadcrumbs>
                  </>

                  {images.length > 0 ? (
                    <ImageGallery
                      items={images}
                      additionalClass={classes.myVideo}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </MyContainer>
          </OuterloginContainer>
        )}
      </>
    </>
  );
};
export default GalleryVideo;

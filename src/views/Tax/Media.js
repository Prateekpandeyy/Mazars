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
const Media = () => {
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    getGalleryData();
  }, []);
  const getGalleryData = () => {
    axios.get(`${baseUrl}/customers/getgallery`).then((res) => {
      setGalleryData(res.data.result);
    });
  };

  return (
    <>
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
                  <Link underline="hover" color="inherit" to="/customer/media">
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
        <Footer />
      </OuterloginContainer>
    </>
  );
};
export default Media;

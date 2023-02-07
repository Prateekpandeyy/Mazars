import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { Container, Box, Paper } from "@material-ui/core";
import { styled } from "@mui/material";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../../config/config";
import { DeleteIcon } from "../../../components/Common/MessageIcon";
import Swal from "sweetalert2";
import CloseIcon from "@material-ui/icons/Close";
import ReactPlayer from "react-player";
import { EditQuery } from "../../../components/Common/MessageIcon";
import { Link } from "react-router-dom";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import { Card, CardBody } from "reactstrap";
import CustomHeading from "../../../components/Common/CustomHeading";
const MyContainer = styled(Container)({});
const MyBox = styled(Box)({
  display: "flex",
  width: "100%",
  height: "500px",
  justifyContent: "center",
  alignItems: "center",
});
const InnerBox = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  minHeight: "300px",
  width: "400px",
  lineHeight: "30px",
  borderRadius: "10px",
});
const VideoMedia = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [videoId, setVideoId] = useState();
  const [play, isPlay] = useState(false);
  const token = window.localStorage.getItem("token");
  let history = useHistory();
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const userId = window.localStorage.getItem("cmsId");
  useEffect(() => {
    getGalleryData();
  }, []);
  const getGalleryData = () => {
    axios
      .get(
        `${baseUrl}/cms/getgallarylist?uid=${JSON.parse(userId)}&type=video`,
        myConfig
      )
      .then((res) => {
        console.log("res", res.data.result);
        setGalleryData(res.data.result);
      });
  };
  const myShowValue = (e, row) => {
    axios
      .get(
        `${baseUrl}/cms/setgallerystatus?uid=${JSON.parse(userId)}&id=${
          row.id
        }&status=0`,
        myConfig
      )
      .then((res) => {
        if (res.data.result === 1) {
        }
      });
  };

  const columns = [
    {
      dataField: "",
      text: "S.No",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "",
      text: "Album name",

      formatter: function dateFormat(cell, row) {
        return (
          <>
            <Link
              style={{ display: "flex", height: "80%", overflow: "hidden" }}
              to={{
                pathname: "/cms/videogallery",
                index: row,
              }}
            >
              {row.title}
            </Link>
          </>
        );
      },
    },

    {
      dataField: "created_date",
      text: "Date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.created_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.split(" ")[0].split("-").reverse().join("-");
      },
    },

    {
      dataField: "",
      text: "Action",
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div
              style={{
                display: "flex",
                width: "120px",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Link to={`/cms_editvideo/${row.id}`}>
                <EditQuery titleName="Edit Video Gallery" />
              </Link>

              <span onClick={() => del(row)}>
                <DeleteIcon titleName="Delete Video Gallery" />
              </span>
              {row.status === undefined ? (
                <div>
                  <label
                    className="switch"
                    onChange={(e) => myShowValue(e, row)}
                  >
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
              ) : (
                ""
              )}
              {row.status == "1" ? (
                <div>
                  <label
                    className="switch"
                    onChange={(e) => myShowValue(e, row)}
                  >
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
              ) : (
                ""
              )}
              {row.status == "0" ? (
                <div>
                  <label
                    className="switch"
                    onChange={(e) => myShowValue(e, row)}
                  >
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        );
      },
    },
  ];

  const del = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to delete video gallery? Yes, delete it!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        axios
          .get(
            `${baseUrl}/cms/removegallery?uid=${JSON.parse(userId)}&id=${
              id.id
            }`,
            myConfig
          )
          .then((res) => {
            console.log("response", res);
            if (res.data.code === 1) {
              Swal.fire({
                title: "success",
                html: "Video gallery deleted successfully",
                icon: "success",
              });
              getGalleryData();
            } else if (res.data.code === 102) {
              history.push("/cms/login");
            } else {
              Swal.fire({
                title: "error",
                html: "Something went wrong , please try again",
                icon: "error",
              });
            }
          });
      }
    });
  };

  const playVideo2 = (e) => {
    isPlay(true);
    setVideoId(`${baseUrl3}/assets/gallery/${e}`);
  };
  return (
    <Layout cmsDashboard="cmsDashboard">
      <Container maxWidth="xl">
        <div className="headingContent">
          <CustomHeading>Video gallery</CustomHeading>
          <button
            className="autoWidthBtn rightAlign my-2"
            onClick={(e) => {
              history.push("/cms/videocontent");
            }}
          >
            New video vallery
          </button>
        </div>
        <Card>
          <CardBody>
            <DataTablepopulated
              bgColor="#42566a"
              keyField={"assign_no"}
              data={galleryData}
              columns={columns}
            ></DataTablepopulated>
          </CardBody>
        </Card>
      </Container>
      {play === true ? (
        <div className="modalBox">
          <div className="boxContainer">
            <div className="canBtn" title="cancel">
              <h4>Recording Player</h4>
              <CloseIcon onClick={() => isPlay(false)} id="myBtn" />{" "}
            </div>

            <div className="my2">
              <ReactPlayer
                url={videoId}
                controls={true}
                playing={true}
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
};
export default VideoMedia;

// import React from "react";
// import Layout from "../../../components/Layout/Layout";
// import { Container, Box, Paper } from "@material-ui/core";
// import classNames from "classnames";
// import { styled } from "@mui/material";
// import { useHistory, useParams } from "react-router";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { baseUrl } from "../../../config/config";
// import Swal from "sweetalert2";
// import { Row, Col } from "reactstrap";
// import CustomHeading from "../../../components/Common/CustomHeading";
// import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
// const MyContainer = styled(Container)({});
// const MyBox = styled(Box)({
//   display: "flex",
//   width: "100%",
//   height: "500px",
//   justifyContent: "center",
//   alignItems: "center",
// });
// const InnerBox = styled(Paper)({
//   display: "flex",
//   flexDirection: "column",
//   padding: "20px",
//   minHeight: "300px",
//   width: "400px",
//   lineHeight: "30px",
//   borderRadius: "10px",
// });
// const VideoContent = () => {
//   const userId = window.localStorage.getItem("adminkey");
//   let history = useHistory();
//   const [heading, setHeading] = useState("");
//   const [isFile, setIsFile] = useState(true);
//   const [file, setFile] = useState("");
//   var current_date =
//     new Date().getFullYear() +
//     "-" +
//     ("0" + (new Date().getMonth() + 1)).slice(-2) +
//     "-" +
//     ("0" + new Date().getDate()).slice(-2);
//   const [item] = useState(current_date);
//   const token = localStorage.getItem("token");
//   const myConfig = {
//     headers: {
//       uit: token,
//     },
//   };
//   const { handleSubmit, register, errors } = useForm();
//   const onSubmit = (value) => {
//     if (file?.name?.length > 0) {
//       setIsFile(true);
//       let formData = new FormData();

//       let file;
//       formData.append("title", heading);
//       formData.append("type", "video");
//       formData.append("date_event", value.date_event);
//       var uploadImg = value.p_upload;
//       if (uploadImg) {
//         for (var i = 0; i < uploadImg.length; i++) {
//           file = uploadImg[i];
//           formData.append("upload[]", file);
//         }
//       }

//       axios({
//         method: "POST",
//         url: `${baseUrl}/cms/uploadphoto`,
//         headers: {
//           uit: token,
//         },
//         data: formData,
//       }).then((res) => {
//         if (res.data.code === 1) {
//           Swal.fire({
//             title: "success",
//             html: "Video Gallery added successfully",
//             icon: "success",
//           });
//           history.push("/cms/videolist");
//         } else if (res.data.code === 102) {
//           history.push("/cms/login");
//         }
//       });
//     } else {
//       setIsFile(false);
//     }
//   };
//   return (
//     <Layout cmsDashboard="cmsDashboard">
//       <MyContainer>
//         <Row className="my-2">
//           <Col md="4">
//             <button className="autoWidthBtn" onClick={() => history.goBack()}>
//               Go Back
//             </button>
//           </Col>
//           <Col md="4" align="center">
//             <CustomHeading>Video gallery</CustomHeading>
//           </Col>
//         </Row>

//         <MyBox>
//           <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
//             <InnerBox>
//               <div className="row">
//                 <div className="col-md-12 col-sm-12">
//                   <label className="form-label">Title</label>
//                   <input
//                     type="text"
//                     className={classNames("form-control", {
//                       "is-invalid": errors.p_heading,
//                     })}
//                     value={heading}
//                     onChange={(e) => setHeading(e.target.value)}
//                     ref={register({ required: true })}
//                     name="p_heading"
//                     placeholder="Please enter heading"
//                   />
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-12 col-sm-12">
//                   <label className="form-label">Date</label>
//                   <input
//                     type="date"
//                     name="date_event"
//                     ref={register({ required: true })}
//                     className="form-control"
//                     max={item}
//                   />
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-12 col-sm-12">
//                   <label className="form-label">
//                     Video<sup className="declined"> *</sup>
//                   </label>
//                   <input
//                     type="file"
//                     accept="file_extension|audio/*|video/*|image/*|media_type"
//                     name="p_upload"
//                     ref={register}
//                     multiple
//                     className="form-control-file"
//                     onChange={(e) => {
//                       setFile(e.target.files[0]);
//                       setIsFile(true);
//                     }}
//                   />
//                   {isFile === false ? (
//                     <ErrorMessage>Please upload file</ErrorMessage>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   width: "100%",
//                   mmargin: "5px 0",
//                   justifyContent: "flex-end",
//                 }}
//               >
//                 <p>
//                   {" "}
//                   <sup className="declined"> *</sup>jpeg,gif,png ,
//                   mp4,wav,avi,mov,3gp,flv,amv,m4v{" "}
//                 </p>
//               </div>
//               <div className="row">
//                 <div className="col-md-12">
//                   <button className="customBtn mt-5">Submit</button>{" "}
//                 </div>
//               </div>
//             </InnerBox>
//           </form>
//         </MyBox>
//       </MyContainer>
//     </Layout>
//   );
// };
// export default VideoContent;
import React from "react";
import Layout from "../../../components/Layout/Layout";
import { Container, Box, Paper } from "@material-ui/core";
import classNames from "classnames";
import { styled } from "@mui/material";
import { useHistory, useParams } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Swal from "sweetalert2";
import { Row, Col, Spinner } from "reactstrap";
import CustomHeading from "../../../components/Common/CustomHeading";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
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
const VideoContent = () => {
  const userId = window.localStorage.getItem("adminkey");
  let history = useHistory();
  const [heading, setHeading] = useState("");
  const [isFile, setIsFile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [stats, setStats] = useState(false);
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const [item] = useState(current_date);
  const token = localStorage.getItem("token");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (value) => {
    setLoading(true);
    if (file?.name?.length > 0) {
      setIsFile(true);
      let formData = new FormData();

      let file;
      formData.append("title", heading);
      formData.append("type", "video");
      formData.append("date_event", value.date_event);
      formData.append("status", Number(stats));
      var uploadImg = value.p_upload;
      if (uploadImg) {
        for (var i = 0; i < uploadImg.length; i++) {
          file = uploadImg[i];
          formData.append("upload[]", file);
        }
      }

      axios({
        method: "POST",
        url: `${baseUrl}/cms/uploadphoto`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          setLoading(false);
          Swal.fire({
            title: "success",
            html: "Video Gallery added successfully",
            icon: "success",
          });
          history.push("/cms/videolist");
        } else if (res.data.code === 0) {
          setLoading(false);
          Swal.fire({
            title: "error",
            html: "Something went wrong",
            icon: "error",
          });
        } else if (res.data.code === 102) {
          history.push("/cms/login");
        }
      });
    } else {
      setIsFile(false);
      setLoading(false);
    }
  };
  const myLabel = (e) => {
    setStats(!stats);
  };

  return (
    <Layout cmsDashboard="cmsDashboard">
      <MyContainer>
        <Row className="my-2">
          <Col md="4">
            <button className="autoWidthBtn" onClick={() => history.goBack()}>
              Go Back
            </button>
          </Col>
          <Col md="4" align="center">
            <CustomHeading>Video gallery</CustomHeading>
          </Col>
        </Row>

        <MyBox>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <InnerBox>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <label className="form-label">Title</label>
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
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date_event"
                    ref={register({ required: true })}
                    className="form-control"
                    max={item}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <label className="form-label">
                    Video<sup className="declined"> *</sup>
                  </label>
                  <input
                    type="file"
                    accept="file_extension|audio/*|video/*|image/*|media_type"
                    name="p_upload"
                    ref={register}
                    multiple
                    className="form-control-file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setIsFile(true);
                    }}
                  />
                  {isFile === false ? (
                    <ErrorMessage>Please upload file</ErrorMessage>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
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
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  mmargin: "5px 0",
                  justifyContent: "flex-end",
                }}
              >
                <p>
                  {" "}
                  <sup className="declined"> *</sup>jpeg,gif,png ,
                  mp4,wav,avi,mov,3gp,flv,amv,m4v{" "}
                </p>
              </div>
              <div className="row">
                {loading ? (
                  <Spinner color="primary" className="ml-4" />
                ) : (
                  <div className="col-md-12">
                    <button className="customBtn mt-5">Submit</button>{" "}
                  </div>
                )}
              </div>
            </InnerBox>
          </form>
        </MyBox>
      </MyContainer>
    </Layout>
  );
};
export default VideoContent;

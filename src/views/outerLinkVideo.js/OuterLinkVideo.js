import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import MainContainer from "../../components/Common/MainContainer";
import MyContainer from "../../components/Common/MyContainer";
import { useHistory, useParams } from "react-router";
import * as Cookies from "js-cookie";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const OuterLinkVideo = () => {
  const [open, isOpen] = useState(true);
  const [user, setUser] = useState("");
  const [isName, setIsName] = useState(false);
  const [baseMode] = useState("avc");
  const [transcode] = useState("interop");
  const [attendeeMode] = useState("video");
  const [videoProfile] = useState("240p_4");
  let history = useHistory();
  let id = useParams();
  console.log("id", id);

  let key2 = history.location.search.split("=")[1];
  const handleClose = () => {
    isOpen(!open);
  };
  const getUser = (e) => {
    setIsName(false);
    setUser(e.target.value);
  };
  const enterVideo = () => {
    if (user.length > 0) {
      setIsName(false);
      axios
        .get(`${baseUrl}/customers/getcalloauth?t=${key2}&name=${user}`)
        .then((res) => {
          if (res.data.code === 1) {
            isOpen(!open);
            if (res.data.code === 1) {
              Cookies.set("channel", res.data.result.scheduleid);
              Cookies.set("baseMode", baseMode);
              Cookies.set("transcode", transcode);
              Cookies.set("attendeeMode", attendeeMode);
              Cookies.set("videoProfile", videoProfile);
              localStorage.setItem(
                "meetdetails",
                JSON.stringify(res.data.result)
              );
            }
            history.push(
              `/customer/meetingouter/${res.data.result.scheduleid}`
            );
          } else {
            Swal.fire({
              title: "error",
              html: "invalid link",
              icon: "error",
            });
          }
        });
    } else {
      setIsName(true);
    }
  };
  return (
    <>
      <MainContainer>
        <Header noSign="noSign" />

        <MyContainer>
          <Dialog
            style={{ zIndex: 900 }}
            hideBackdrop={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Join call"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div className="form-group passForm ">
                  <label className="form-label">
                    Name<span className="declined">*</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => getUser(e)}
                    name="p_user"
                    placeholder="Enter Name"
                    className={`${
                      isName === true
                        ? "form-control customError"
                        : "form-control"
                    }`}
                  />
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button
                type="button"
                onClick={() => enterVideo()}
                className="customBtn my-2"
              >
                Submit
              </button>
            </DialogActions>
          </Dialog>
        </MyContainer>
        <Footer />
      </MainContainer>
    </>
  );
};
export default OuterLinkVideo;

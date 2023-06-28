import React, { useState } from "react";
import { useHistory, useParams } from "react-router";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { baseUrl } from "../../config/config";

const GetEmail = () => {
  let history = useHistory();
  const [open, isOpen] = useState(true);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const handleClose = (e) => {
    var validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(validRegex)) {
      let formData = new FormData();
      formData.append("scde", "6b382b7d1c8c26");
      formData.append("email", email);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/refreremail`,
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          isOpen(!open);
          history.push("/");
        }
      });
    } else {
      setIsError(true);
    }
  };
  const closeButton = () => {
    // console.log(window);

    window.close();
  };
  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            opacity: 0.9,
            maxHeight: 335,
          },
        }}
        open={open}
        className="twitterLink"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="form-group passForm ">
              <label className="form-label">
                Please provide your email address
                <span className="declined">*</span>
              </label>
              <input
                type="email"
                name="p_user"
                placeholder="Enter email address"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsError(false);
                }}
                className={`${
                  isError === true ? "form-control customError" : "form-control"
                }`}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            onClick={(e) => handleClose("close")}
            className="customBtn my-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={(e) => closeButton()}
            className="customBtn my-2"
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default GetEmail;

import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import classNames from "classnames";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Swal from "sweetalert2";
import Select from "react-select";
import CommonServices from "../../../common/common";
const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required(""),
  p_password: yup.string().required(""),
});

const InviteModal = ({ invite, showInvite, inviteData }) => {
  const [particiapnts, setParticipants] = useState([]);
  const [allParticipants, setAllParticipants] = useState([]);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [user, setUser] = useState("");
  const [client, setClient] = useState([]);
  const [part, setPart] = useState([]);
  const [estate, setEstate] = useState("");
  const [invitedParticipant, setInvitedParticipants] = useState([]);
  const [prevPrati, setPrevParti] = useState([]);
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const { handleSubmit, register, errors, reset, getValues, control } = useForm(
    {
      defaultValues: {
        p_email: [{ p_email: "" }],
      },
    }
  );
  const { append, remove, fields } = useFieldArray({
    control,
    name: "p_email",
  });
  useEffect(() => {
    getClient();
    getprevPraticipants();
  }, [inviteData]);

  const getprevPraticipants = () => {
    let inv = [];
    let formData = new FormData();
    formData.append("scheduleid", inviteData.id);
    formData.append("question_id", inviteData.question_id);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/invitecalllist`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        setPrevParti(res.data.result);
        inv.push(res.data.users);
        let pp = res.data.users.split(",");
        setInvitedParticipants(pp);
      } else {
        setPrevParti([]);
      }
    });
  };
  const getClient = () => {
    let collectData = [];
    axios
      .get(
        `${baseUrl}/tl/querycustomers?query_id=${inviteData.question_id}`,
        myConfig
      )
      .then((res) => {
        let email = {};

        res.data.result.map((i) => {
          email = {
            label: i.email,
            value: i.email,
          };
          collectData.push(email);
        });

        setClient(collectData);
      });
  };
  const getClient2 = (k) => {
    let collectData = [];
    axios
      .get(
        `${baseUrl}/tl/querycustomers?query_id=${inviteData.question_id}`,
        myConfig
      )
      .then((res) => {
        let email = {};

        res.data.result.map((i) => {
          if (k.includes(i.email)) {
          } else {
            email = {
              label: i.email,
              value: i.email,
            };
            collectData.push(email);
          }
        });

        setClient(collectData);
      });
  };
  const getUser = (e) => {
    var regEx = /^[0-9a-zA-Z]+$/;
    if (e.target.value.match(regEx)) {
      setUser(e.target.value.toUpperCase());
    } else {
      setUser("");
    }
  };
  const getParticiapnts = (e) => {
    if (e) {
      if (estate.length > 0) {
        setEstate("");
      }
      setPart(e);

      setEmailError(false);
      setError(false);
      setParticipants(e.value);
    } else {
      setEmailError(false);
      setError(false);
    }
  };
  const addParticipants = () => {
    let kk = [];
    if (
      particiapnts.length > 0 &&
      estate.length === 0 &&
      emailError === false
    ) {
      setParticipants([]);
      setPart([]);
      setAllParticipants((oldData) => {
        return [...oldData, particiapnts];
      });
      kk = [...allParticipants, particiapnts];
      getClient2(kk);
    } else if (
      particiapnts.length === 0 &&
      estate.length > 0 &&
      emailError === false
    ) {
      var validRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (estate.match(validRegex)) {
        setAllParticipants((oldData) => {
          return [...oldData, estate];
        });
        kk = [...allParticipants, estate];
        setParticipants([]);
        setEstate([""]);
        getParticiapnts();
        getClient2(kk);
      } else {
        setEmailError(true);
      }
    } else if (particiapnts.length === 0 && emailError === false) {
      setError(true);
    }
  };
  const delUser = (id) => {
    let kp = allParticipants.filter((data, key) => {
      return key !== id;
    });
    setAllParticipants(kp);
    getClient2(kp);
  };
  const validateEmail = (e) => {
    var validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (particiapnts.length > 0 && particiapnts.match(validRegex)) {
    } else {
      setEmailError(true);
    }
  };

  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("scheduleid", inviteData.id);
    formData.append("question_id", inviteData.question_id);
    formData.append("invite_email", allParticipants);
    axios({
      method: "POST",
      url: `${baseUrl}/tl/invitecall`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        showInvite();
        Swal.fire({
          title: "success",
          message: "Participants added successfully",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "error",
          message: "Something went wrong , please try again",
          icon: "error",
        });
      }
    });
  };
  const getStateValue = (input, reason) => {
    setEmailError(false);
    if (
      reason.action === "set-value" ||
      reason.action === "input-blur" ||
      reason.action === "menu-close"
    ) {
      return;
    }

    setEstate(input);
  };
  const delprevUser = (data) => {
    let formData = new FormData();
    formData.append("token", data.token);
    formData.append("invite_id", data.id);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/deleteinvitecall`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        Swal.fire({
          title: "success",
          message: "Participants deleted successfully",
          icon: "success",
        });
        getprevPraticipants();
      }
    });
  };

  return (
    <>
      <Modal
        isOpen={invite}
        toggle={showInvite}
        size="md"
        id="myClientModal"
        scrollable={true}
      >
        <ModalHeader toggle={showInvite}>Invite Participants</ModalHeader>
        <ModalBody>
          <h4>{CommonServices.capitalizeFirstLetter(inviteData.title)} </h4>
          <h6>
            <b>From </b>{" "}
            {inviteData.startDate.split(" ")[0].split("-").reverse().join("-")}{" "}
            {inviteData.startDate.split(" ")[1]} <b>To </b>{" "}
            {inviteData.endDate.split(" ")[0].split("-").reverse().join("-")}{" "}
            {inviteData.endDate.split(" ")[1]}
          </h6>

          {invitedParticipant && <h4>Participants</h4>}
          {
            <>
              <div className="row">
                <div className="col-md-12"></div>
                <div
                  className="col-md-12"
                  style={{ display: "flex", padding: "0px" }}
                >
                  <div
                    className="col-md-12 mb-2"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    {invitedParticipant?.map((i, e) => (
                      <h6 key={i.id} className="myParticipantName">
                        {i}
                      </h6>
                    ))}
                  </div>
                </div>
              </div>
            </>
          }
          {prevPrati && <h4>Invited Participants</h4>}
          {prevPrati?.map((i, e) => (
            <>
              <div className="row">
                <div className="col-md-12"></div>
                <div
                  className="col-md-12"
                  style={{ display: "flex", padding: "0px" }}
                  key={i.id}
                  id={i.id}
                >
                  <div className="col-md-8 mb-2">
                    <p>{i.email}</p>
                  </div>
                  {inviteData.owner === true ? (
                    <div className="col-md-4">
                      <Button
                        variant="contained"
                        onClick={(d) => delprevUser(i)}
                      >
                        <span>Delete</span>
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          ))}

          {inviteData.owner === true ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-12">
                  <label className="form-label">Emails</label>
                </div>

                <div className="col-md-8">
                  <Select
                    closeMenuOnSelect={true}
                    onSelectResetsInput={false}
                    blurInputOnSelect={false}
                    options={client}
                    inputValue={estate}
                    onInputChange={getStateValue}
                    onChange={(e) => getParticiapnts(e)}
                    value={part}
                  />
                  {emailError === true ? (
                    <p className="declined">Please enter valid email</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-4 mb-4">
                  <Button variant="contained" onClick={() => addParticipants()}>
                    <AddIcon />
                  </Button>
                </div>
              </div>
              {allParticipants.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    padding: "10px",
                    flexDirection: "column",
                    width: "100%",
                    border: "1px solid #000",
                  }}
                >
                  {allParticipants?.map((i, e) => (
                    <div className="row" key={e} id={e}>
                      <div
                        className="col-md-8 mb-2"
                        style={{ bordr: "1px solid #000" }}
                      >
                        <p>{i}</p>
                      </div>
                      <div className="col-md-4">
                        <Button variant="contained" onClick={(d) => delUser(e)}>
                          <span>
                            <RemoveIcon />
                          </span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
              <button className="customBtn my-2">Submit</button>
            </form>
          ) : (
            ""
          )}
        </ModalBody>
      </Modal>
    </>
  );
};
export default InviteModal;

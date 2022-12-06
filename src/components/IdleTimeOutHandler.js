import React, { useEffect, useState } from "react";
import moment from "moment";
import { IdleTimeOutModal } from "./IdleTimeOutModal";
import { useHistory } from "react-router";
import axios from "axios";
import { baseUrl } from "../config/config";
const IdleTimeOutHandler = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isLogout, setLogout] = useState(false);
  let history = useHistory();

  let timer = undefined;
  const events = ["click", "load", "keydown"];

  useEffect(() => {
    addEvents();

    return () => {
      removeEvents();
      clearTimeout(timer);
    };
  }, []);

  const eventHandler = (eventType) => {
    if (!isLogout) {
      localStorage.setItem("lastInteractionTime", moment());
      if (timer) {
        props.onActive();
        startTimer();
      }
    }
  };

  const startTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(
      () => {
        let lastInteractionTime = localStorage.getItem("lastInteractionTime");
        const diff = moment.duration(
          moment().diff(moment(lastInteractionTime))
        );
        let timeOutInterval = props.timeOutInterval
          ? props.timeOutInterval
          : 3600;

        if (isLogout) {
          clearTimeout(timer);
        } else {
          if (diff.milliseconds < timeOutInterval) {
            startTimer();
            props.onActive();
          } else {
            props.onIdle();
            setShowModal(true);
          }
        }
      },
      props.timeOutInterval ? props.timeOutInterval : 6000
    );
  };
  const addEvents = () => {
    events.forEach((eventName) => {
      window.addEventListener(eventName, eventHandler);
    });

    startTimer();
  };

  const removeEvents = () => {
    events.forEach((eventName) => {
      window.removeEventListener(eventName, eventHandler);
    });
  };

  const handleContinueSession = () => {
    setShowModal(false);
    setLogout(false);

    if (props.custDashboard) {
      const client = localStorage.getItem("userid");
      const token = window.localStorage.getItem("clientToken");
      const myConfig = {
        headers: {
          uit: token,
        },
      };
      axios
        .get(
          `${baseUrl}/customers/getNotification?id=${JSON.parse(
            client
          )}&type_list=uread`,
          myConfig
        )
        .then((res) => {});
    }
  };

  const handleLogout = () => {
    if (showModal === true) {
      removeEvents();
      clearTimeout(timer);
      setLogout(true);
      props.onLogout();
      setShowModal(false);
      if (props.custDashboard) {
        const token = window.localStorage.getItem("clientToken");
        const myConfig = {
          headers: {
            uit: token,
          },
        };
        axios.get(`${baseUrl}/customers/logout`, myConfig).then((res) => {
          setShowModal(false);
          localStorage.removeItem("userid");
          localStorage.removeItem("custEmail");
          localStorage.removeItem("category");
          localStorage.removeItem("clientToken");
          setShowModal(false);
          history.push("/");
        });
      }
    }
  };

  return (
    <div>
      {showModal === true ? (
        <IdleTimeOutModal
          showModal={showModal}
          handleContinue={handleContinueSession}
          handleLogout={handleLogout}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default IdleTimeOutHandler;

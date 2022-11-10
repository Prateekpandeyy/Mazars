import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { baseUrl } from "../../config/config";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { IdleTimeOutModal } from "../IdleTimeOutModal";
const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  const [cont, setCont] = useState(false);
  const [lTime, setlTime] = useState(30);
  let history = useHistory();
  let timer;
  var timerOn = true;
  // this function sets the timer that logs out the user after 10 secs
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer();
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      // logs out user
      logoutAction();
    }, 600000); // 10000ms = 10secs. You can change the time.
  };

  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  // when component mounts, it adds an event listeners to the window
  // each time any of the event is triggered, i.e on mouse move, click, scroll, keypress etc, the timer to logout user after 10 secs of inactivity resets.
  // However, if none of the event is triggered within 10 secs, that is app is inactive, the app automatically logs out.
  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);
  // logout functionality
  const handleLogout = () => {
    setCont(false);
    const token = window.localStorage.getItem("clientToken");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    axios.get(`${baseUrl}/customers/logout`, myConfig).then((res) => {
      localStorage.removeItem("userid");
      localStorage.removeItem("custEmail");
      localStorage.removeItem("category");
      localStorage.removeItem("clientToken");
      window.location.pathname = "/";
    });
  };
  useEffect(() => {
    function timer(remaining) {
      let kd;
      var s = remaining % 60;
      s = s < 10 ? "0" + s : s;
      setlTime(remaining);
      remaining -= 1;
      if (remaining > 0 && timerOn) {
        console.log("done");
        kd = setTimeout(timer, 1000, remaining);
      } else if (timerOn === true && remaining === 0) {
        handleLogout();
      } else if (timerOn === false) {
        console.log("done", "continue");

        return false;
      }
    }
    if (cont === true) {
      timer(10);
    }
    return () => {
      timerOn = false;
    };
  }, [cont]);
  const handleContinue = () => {
    setCont(false);
    timerOn = false;
  };
  // logs out user by clearing out auth token in localStorage and redirecting url to /signin page.
  const logoutAction = () => {
    const token = window.localStorage.getItem("clientToken");
    console.log(window.location.hash.split("/")[1] === "customer", token);
    if (window.location.pathname.split("/")[1] === "customer" && token) {
      setCont(true);
    }
  };

  return (
    <>
      {children}
      {cont === true ? (
        <IdleTimeOutModal
          lTime={lTime}
          handleContinue={handleContinue}
          handleLogout={handleLogout}
          showModal={cont}
        />
      ) : (
        " "
      )}
    </>
  );
};

export default AppLogout;

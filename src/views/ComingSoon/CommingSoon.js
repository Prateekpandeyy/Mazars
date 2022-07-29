import React from "react";
import ReactDOM from "react-dom";
import Preloader from "./components/Preloader/Preloader";
import Timer from "./components/Countdown/Timer";
import Optin from "./components/Optin/Optin";

import "./styles.css";

function CommingSoon() {
  return (
    <div className="AppCommingSoon">
      <div className="containercomming">
        <h1>
          Website
          <br />
          Coming Soon
        </h1>
        <Timer />
        <Optin />
        <Preloader />
      </div>
    </div>
  );
}
export default CommingSoon;
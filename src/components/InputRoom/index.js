import React from "react";
import * as Cookies from "js-cookie";

import "../../assets/fonts/css/icons.css";
// import Validator from "../../utils/Validator";
// import { RESOLUTION_ARR } from "../../utils/Settings";
import "./index.css";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "",
      baseMode: "avc",
      transcode: "interop",
      attendeeMode: "video",
      videoProfile: "480p_4",
    };
  }

 
  render() {
    return (
      <div className="wrapper index">
        <div className="ag-header"></div>
        <div className="ag-main">
          <section className="login-wrapper">
            <div className="login-header"></div>

            

            <div className="login-footer">
              <a
              
                className="ag-rounded button is-info"
              >
                Join
              </a>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Index;

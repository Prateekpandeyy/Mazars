import React from "react";
import * as Cookies from "js-cookie";

import "./meeting.css";
import AgoraVideoCall from "../AgoraVideoCall/index";
import { AGORA_APP_ID } from "../../agora.config";


class Meeting extends React.Component {
  constructor(props) {
    super(props);

    this.videoProfile = Cookies.get("videoProfile");
    this.channel = Cookies.get("channel") || "test";
    this.transcode = Cookies.get("transcode") || "interop";
    this.attendeeMode = Cookies.get("attendeeMode") || "video";
    this.baseMode = Cookies.get("baseMode") || "avc";
    this.appId = AGORA_APP_ID;
    if (!this.appId) {
      return alert("Get App ID first!");
    }
    this.uid = undefined;
  }

  render() {
    return (
      <div className="wrapper meeting">
        <div
          className="ag-header"
          style={{ color: "green", fontWeight: "bold" }}
        >
          <div className="ag-header-lead">
            <span>Video Call</span>
          </div>
          <div className="ag-header-msg">
            &nbsp;<span id="room-name">{this.channel}</span>
          </div>
        </div>
        <div className="ag-main">
          <div className="ag-container">
            <AgoraVideoCall
              videoProfile={this.videoProfile}
              channel={this.channel}
              transcode={this.transcode}
              attendeeMode={this.attendeeMode}
              baseMode={this.baseMode}
              appId={this.appId}
              uid={this.uid}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Meeting;

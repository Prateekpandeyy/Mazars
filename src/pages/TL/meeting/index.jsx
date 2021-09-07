import React from "react";
import * as Cookies from "js-cookie";

import "./meeting.css";
import AgoraVideoCall from "../AgoraVideoCall/index";
import { AGORA_APP_ID } from "../../../agora.config";


class Meeting extends React.Component {
  constructor(props) {
    super(props);

    this.videoProfile = Cookies.get("videoProfile_2");
    this.channel = Cookies.get("channel_2") || "test";
    this.transcode = Cookies.get("transcode_2") || "interop";
    this.attendeeMode = Cookies.get("attendeeMode_2") || "video";
    this.baseMode = Cookies.get("baseMode_2") || "avc";

    this.appId = AGORA_APP_ID;
    if (!this.appId) {
      return alert("Get App ID first!");
    }
    this.uid = undefined;
  }


  render() {
    console.log("channelid-",this.channel)
    console.log("render")

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
              id={this.props.id}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Meeting;
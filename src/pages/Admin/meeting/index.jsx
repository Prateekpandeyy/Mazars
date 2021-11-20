
import React from "react";
import * as Cookies from "js-cookie";

import "./meeting.css";
import AgoraVideoCall from "../AgoraVideoCall/index";
import { AGORA_APP_ID } from "../../../agora.config";
import ReactPlayer from "react-player";


class Meeting extends React.Component {
  constructor(props) {
    super(props);
    this.userEmail = Cookies.get("adminid");
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
    this.state = {
      showmeetingScreen : false
    }
  
  }
 
  render() {
   console.log("meeting", this.userEmail)
    return (
      
      <div className="wrapper meeting" style={{ display : "flex", flexDirection: "column" , height: "100vh" }}>
                 
         {this.state.showmeetingScreen === true ?
             <div style={{ display : "flex", flexDirection: "column" , height: "100%" }}>
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
              name={"admin"}
              adminEmail = {this.userEmail}
            />
          </div>
        </div>
         </div> : 
         <ReactPlayer
         url="https://www.youtube.com/watch?v=F7mKD2Un65I"
         controls={true}
         playing={true}
         onEnded={() => this.setState({showmeetingScreen : true})}
         width='100%'
         height='650px'
        />}
      </div>
    );
  }
}

export default Meeting;
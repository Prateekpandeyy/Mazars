import React from "react";
import * as Cookies from "js-cookie";
import "./meeting.css";
import AgoraVideoCallouter from "../AgoraVideoCallouter/index";
import { AGORA_APP_ID } from "../../agora.config";
import ReactPlayer from "react-player";

class OuterMeeting extends React.Component {
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
    this.state = {
      showmeetingScreen : false
    }
  }
  meetdetails = JSON.parse(localStorage.getItem("meetdetails"))
  
  render() {
 
    return (
      
      <div className="wrapper meeting" style={{ display : "flex", flexDirection: "column" , height: "100vh" }}>
                 
         {this.state.showmeetingScreen === true ?
             <div style={{ display : "flex", flexDirection: "column" , height: "100%" }}>
          {/* <div
          className="ag-header"
          style={{ color: "green", fontWeight: "bold" }}
        >
          <div className="ag-header-lead">
            <span>Video Call</span>
          </div>
          <div className="ag-header-msg">
            &nbsp;<span id="room-name">{this.meetdetails.question_id}</span>
          </div>
        </div> */}
        <div className="ag-main">
          <div className="ag-container">
            <AgoraVideoCallouter
              videoProfile={this.videoProfile}
              channel={this.meetdetails.question_id}
              name={this.meetdetails.name}
              transcode={this.transcode}
              attendeeMode={this.attendeeMode}
              baseMode={this.baseMode}
              appId={this.appId}
              uid={this.uid}
              id={window.location.pathname.split("/")[3]}
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

export default OuterMeeting;
import React from "react";
import { merge } from "lodash";
import AgoraRTC from "agora-rtc-sdk";
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import axios from "axios";
import "./canvas.css";
import "../../assets/fonts/css/icons.css";
import Cookies from "js-cookie";
import {baseUrl} from "../../config/config";
import Swal from "sweetalert2";
import CommonServices from "../../common/common";
var customer_id = "d339577a294c458c86d8a78b474141fc";
var customer_secret = "1a61a4bef2144e78be6f671d5cf3fc32";


const tile_canvas = {
  "1": ["span 12/span 24"],
  "2": ["span 12/span 12/13/25", "span 12/span 12/13/13"],
  "3": ["span 6/span 12", "span 6/span 12", "span 6/span 12/7/19"],
  "4": [
    "span 3/span 4/13/11",
    "span 3/span 4/13/15",
    "span 3/span 4/13/19",
    "span 9/span 16/10/21",
  ],
  "5": [
    "span 3/span 4/13/9",
    "span 3/span 4/13/13",
    "span 3/span 4/13/17",
    "span 3/span 4/13/21",
    "span 9/span 16/10/21",
  ],
  "6": [
    "span 3/span 4/13/7",
    "span 3/span 4/13/11",
    "span 3/span 4/13/15",
    "span 3/span 4/13/19",
    "span 3/span 4/13/23",
    "span 9/span 16/10/21",
  ],
  "7": [
    "span 3/span 4/13/5",
    "span 3/span 4/13/9",
    "span 3/span 4/13/13",
    "span 3/span 4/13/17",
    "span 3/span 4/13/21",
    "span 3/span 4/13/25",
    "span 9/span 16/10/21",
  ],
  "8": [
    "span 3/span 4/13/3",
    "span 3/span 4/13/7",
    "span 3/span 4/13/11",
    "span 3/span 4/13/15",
    "span 3/span 4/13/19",
    "span 3/span 4/13/23",
    "span 3/span 4/13/27",
    "span 9/span 16/10/21",
  ],
  "9": [
    "span 3/span 4/13/1",
    "span 3/span 4/13/5",
    "span 3/span 4/13/9",
    "span 3/span 4/13/13",
    "span 3/span 4/13/17",
    "span 3/span 4/13/21",
    "span 3/span 4/13/25",
    "span 3/span 4/13/29",
    "span 9/span 16/10/21",
  ],
  
  
};
const token = window.localStorage.getItem("clientToken")
const myConfig = {
    headers : {
     "uit" : token
    }
  }
/**
 * @prop appId uid
 * @prop transcode attendeeMode videoProfile channel baseMode
 */


class AgoraCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.customerName = Cookies.get("custName")
    this.client = {};
    this.screenTrack = {}
    this.localStream = {};
    this.shareClient = {};
    this.shareStream = {};
    this.state = {
      displayMode: "pip",
      streamList: [],
      readyState: false,
      stateSharing: false,
      addRemote : null,
      atCustId: '',
      disabledVedio : false,
      vedTrack : null,
      shareValue : false,
    };
  }
channelName = this.props.channel
userId = window.localStorage.getItem("userid");
custEmail2 = window.localStorage.getItem("custEmail");
remoteShare2 = false
componentWillMount() {
  let $ = this.props;
  // init AgoraRTC local client
  this.client = AgoraRTC.createClient({ mode: $.transcode });
  let show;
AgoraRTC.getDevices(function(dev){
  var cameras = dev.filter((e) => {
    return e.kind === "videoinput"
  })
 
  if(cameras.length > 0){
    show = true
  }
  else{
    show = false
  }
})
  this.client.init($.appId, () => {
   
 
    this.client.join($.appId, $.channel, $.uid, (uid) => {
     
      var data_post_api = "https://virtualapi.multitvsolution.com/VstreamApi/index.php/api/vstream/userdata?channel_name="+this.channelName+"&rtm_id="+""+"&rtc_id="+uid+"&user_name="+this.customerName;
 axios.get(`${data_post_api}`).
 then((res) => {
  
 })

 this.setState({getAdId : uid})
 this.subscribeStreamEvents();
 
 if(show === true){
   this.localStream = this.streamInit(uid, $.attendeeMode, $.videoProfile)
   this.localStream.init(
       
     () => {
       if ($.attendeeMode !== "audience") {
         this.addStream(this.localStream, true);
         
 
         this.client.publish(this.localStream, (err) => {
          
         });
       }
       this.setState({ readyState: true });
     },
     (err) => {
     
       this.setState({ readyState: true });
     }
   );
 }
 else if(show === false){
 this.localStream = this.streamInit22(uid, $.attendeeMode, $.videoProfile);
 this.localStream.init(
       
   () => {
     if ($.attendeeMode !== "audience") {
       this.addStream(this.localStream, true);
       
 
       this.client.publish(this.localStream, (err) => {
        
       });
     }
     this.setState({ readyState: true });
   },
   (err) => {
   
     this.setState({ readyState: true });
   }
 );
 }
       
     });
   });
 }
  componentDidMount() {
    // add listener to control btn group
    let canvas = document.querySelector("#ag-canvas");
    let btnGroup = document.querySelector(".ag-btn-group");
    canvas.addEventListener("mousemove", () => {
      if (global._toolbarToggle) {
        clearTimeout(global._toolbarToggle);
      }
      btnGroup.classList.add("active");
      global._toolbarToggle = setTimeout(function () {
        btnGroup.classList.remove("active");
      }, 2000);
    });
    this.subscribeStreamEvents();
  }

  componentDidUpdate() {
    // rerendering
   
    let canvas = document.querySelector("#ag-canvas");
    // pip mode (can only use when less than 4 people in channel)
    if (this.state.displayMode === "pip") {
      let no = this.state.streamList.length;
     
      if (no > 4) {
        this.setState({ displayMode: "tile" });
        return;
      }
      this.state.streamList.map((item, index) => {
        let txtColor = "myPartName";
        let id = item.getId();
        let dom = document.querySelector("#ag-item-" + id);
        
        let dd;
        if (!dom) {
          dom = document.createElement("section");
          dom.setAttribute("id", "ag-item-" + id);
          dom.setAttribute("class", "ag-item");
          canvas.appendChild(dom);
          var box22 = document.getElementById("ag-item-" + id)
          dd = document.createElement("input")
          dd.setAttribute("id", "name" + id)
          dd.setAttribute("class", txtColor)
        box22.appendChild(dd)
        item.play("ag-item-" + id);
        }
       
         
         
        if (index === no - 1) {
          
        
            dom.setAttribute("style", `grid-area: span 12/span 24/13/25`);
           
          } else {
            let f = false;
            dom.setAttribute(
              "style",
              `grid-area: span 3/span 4/${4 + 3 * index}/25;
                      z-index:1;width:calc(100% - 20px);height:calc(100% - 20px)`
            );
            dom.addEventListener('click', function (e){
              if(f === false){
                f = true
                dom.setAttribute("style", `grid-area: span 14/span 24/13/25`);
                let list;
             
                list = Array.from(
                  document.querySelectorAll(`.ag-item:not(#ag-item-${id})`)
                );
                list.map((item) => {
                  
                    item.style.display = "none"
                  }) 
              }
              else{
                f = false
                dom.setAttribute(
                  "style",
                  `grid-area: span 3/span 4/${4 + 3 * index}/25;
                          z-index:1;width:calc(100% - 20px);height:calc(100% - 20px)`
                );
                let list;
             
                list = Array.from(
                  document.querySelectorAll(`.ag-item:not(#ag-item-${id})`)
                );
                list.map((item) => {
                  
                    item.style.display = "block"
                  }) 
              }
            })
          }
if(item.player === undefined){

}
       else{
        item.player.resize && item.player.resize();
       }
      });
    }
    // tile mode
    else if (this.state.displayMode === "tile") {
      let f = false;
      let no = this.state.streamList.length;
      let txtColor = "myPartName";
      this.state.streamList.map((item, index) => {
        let id = item.getId();
        let dom = document.querySelector("#ag-item-" + id);
       
        let dd;
        if (!dom) {
          dom = document.createElement("section");
          dom.setAttribute("id", "ag-item-" + id);
          dom.setAttribute("class", "ag-item");
          canvas.appendChild(dom);
          var box22 = document.getElementById("ag-item-" + id)
          dd = document.createElement("input")
          dd.setAttribute("id", "name" + id)
          dd.setAttribute("class", txtColor)
        box22.appendChild(dd)
        item.play("ag-item-" + id);
        }
        dom.setAttribute("style", `grid-area: ${tile_canvas[no][index]}`);
        dom.addEventListener('click', function (e){
          if(f === false){
            f = true
            dom.setAttribute("style", `grid-area: span 14/span 24/13/25`);
            let list;
             
            list = Array.from(
              document.querySelectorAll(`.ag-item:not(#ag-item-${id})`)
            );
            list.map((item) => {
              
                item.style.display = "none"
              }) 
          }
          else{
            f = false
            dom.setAttribute("style", `grid-area: ${tile_canvas[no][index]}`);
            let list;
             
            list = Array.from(
              document.querySelectorAll(`.ag-item:not(#ag-item-${id})`)
            );
            list.map((item) => {
              
                item.style.display = "block"
              }) 
          }
        })
        if(item.player === undefined){

        }
               else{
                item.player.resize && item.player.resize();
               }
      });
    }
    // screen share mode (tbd)
    else if (this.state.displayMode === "share") {
    
    }
  }
  componentWillUnmount() {
    this.client && this.client.unpublish(this.localStream);
     this.localStream && this.localStream.close();
    if (this.state.stateSharing) {
      this.shareClient && this.shareClient.unpublish(this.shareStream);
      this.shareStream && this.shareStream.close();
    }
    this.client &&
      this.client.leave(
        () => {

        },
        () => {

        }
      );
  }

  streamInit = (uid, attendeeMode, videoProfile, config) => {
  
    let defaultConfig = {
      streamID: uid,
      audio: true,
      video: true,
      screen: false,
    };

    switch (attendeeMode) {
      case "audio-only":
        defaultConfig.video = false;
        break;
      case "audience":
        defaultConfig.video = false;
        defaultConfig.audio = false;
        break;
      default:
      case "video":
        break;
    }

    let stream = AgoraRTC.createStream(merge(defaultConfig, config));
    stream.setVideoProfile(videoProfile);
    return stream;
  };

  streamInit22 = (uid, attendeeMode, videoProfile, config) => {
  
    let defaultConfig = {
      streamID: uid,
      audio: true,
      video: false,
      screen: false,
    };

    switch (attendeeMode) {
      case "audio-only":
        defaultConfig.video = false;
        break;
      case "audience":
        defaultConfig.video = false;
        defaultConfig.audio = false;
        break;
      default:
      case "video":
        break;
    }

    let stream = AgoraRTC.createStream(merge(defaultConfig, config));
    stream.setVideoProfile(videoProfile);
    return stream;
  };

  subscribeStreamEvents = () => {
    let rt = this;
    rt.client.on("stream-added", function (evt) {
      let stream = evt.stream;
      
      rt.client.subscribe(stream, function (err) {
       
      });
    });

    rt.client.on("peer-leave", function (evt) {
     
      rt.removeStream(evt.uid);
     
    });

    rt.client.on("stream-subscribed", function (evt) {
      let stream = evt.stream;
    
    
  rt.addStream(stream);
    }.bind(this));

    rt.client.on("stream-removed", function (evt) {
      let stream = evt.stream;
     
      rt.removeStream(stream.getId());
    });
  };

  removeStream = (uid) => {
    this.state.streamList.map((item, index) => {
      if (item.getId() === uid) {
        item.close();
        let element = document.querySelector("#ag-item-" + uid);
        if (element) {
          element.parentNode.removeChild(element);
        }
        let tempList = [...this.state.streamList];
        tempList.splice(index, 1);
        this.setState({
          streamList: tempList,
        });
      }
    });
    axios.get(`${baseUrl}/tl/setgetschedular?id=${this.props.id}&uid=${JSON.parse(this.userId)}&chname=${this.channelName}`, myConfig)
    .then((res) => {
     if(res.data.result.rtc_id == uid){
      Swal.fire({
        title: "success",
        html : "Thank you for attending this meeting, this meeting is going to be ended by host",
        icon : "success"
      })
      setTimeout((e) =>{
      this.handleExit("exit");
        window.location.assign("/")
      }, 3000)
   
     }
    })
    if(this.remoteShare2 === true){
      this.remoteShare2 = false
    } 
  };

  addStream = (stream, push = false) => {
   
    this.hostId = stream.getId()
 
  
    let repeatition = this.state.streamList.some((item) => {
      return item.getId() === stream.getId();
    });
    if (repeatition) {
      return;
    }
    if (push) {
      this.setState({
        streamList: this.state.streamList.concat([stream]),
      });
    } else {
      this.setState({
        streamList: [stream].concat(this.state.streamList),
      });
    }
    var apiData = "https://virtualapi.multitvsolution.com/VstreamApi/index.php/api/vstream/getInfoByRTCId?channel_name="+this.channelName+"&rtc_id="+stream.getId()
    axios.get(`${apiData}`)
    .then((res) =>{
      if(res.data.length > 0 && this.state.getAdId !== stream.getId()){
        var praticipantVar = document.getElementById("name" + stream.getId())
        praticipantVar.setAttribute("value", res.data[0].user_name);
        praticipantVar.setAttribute("disabled", true)
      }
      else if(res.data.length > 0 && this.state.getAdId === stream.getId()){
         var praticipantVar = document.getElementById("name" + stream.getId())
         praticipantVar.setAttribute("value", "You");
         praticipantVar.setAttribute("disabled", true)
       }
       
      else if(res.data.length == 0){
        this.remoteShare2 = true
        var praticipantVar = document.getElementById("name" + stream.getId())
        praticipantVar.setAttribute("value", "Sharing");
        praticipantVar.setAttribute("disabled", true)
        }
     })};   







  
     handleCamera = (e) => {
      this.setState({disabledVedio : !this.state.disabledVedio})
      e.currentTarget.classList.toggle("off");
      this.localStream.isVideoOn()
        ? this.localStream.disableVideo()
        : this.localStream.enableVideo();
    };
  
    handleMic = (e) => {
      e.currentTarget.classList.toggle("off");
      this.localStream.isAudioOn()
        ? this.localStream.disableAudio()
        : this.localStream.enableAudio();
    };
  
    switchDisplay = (e) => {
      if (
        e.currentTarget.classList.contains("disabled") ||
        this.state.streamList.length <= 1
      ) {
        return;
      }
      if (this.state.displayMode === "pip") {
        this.setState({ displayMode: "tile" });
      } else if (this.state.displayMode === "tile") {
        this.setState({ displayMode: "pip" });
      } else if (this.state.displayMode === "share") {
        // do nothing or alert, tbd
      } else {
        console.error("Display Mode can only be tile/pip/share");
      }
    };
  
    hideRemote = (e) => {
      if (
        e.currentTarget.classList.contains("disabled") ||
        this.state.streamList.length <= 1
      ) {
        return;
      }
      let list;
      let id = this.state.streamList[this.state.streamList.length - 1].getId();
      list = Array.from(
        document.querySelectorAll(`.ag-item:not(#ag-item-${id})`)
      );
      list.map((item) => {
        if (item.style.display !== "none") {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    };
  
    handleExit = (e) => {
      if(this.state.readyState === false){
  
      }
      else{
      try {
        this.client && this.client.unpublish(this.localStream);
        this.localStream && this.localStream.close();
        if (this.state.stateSharing) {
          this.shareClient && this.shareClient.unpublish(this.shareStream);
          this.shareStream && this.shareStream.close();
        }
        this.client &&
          this.client.leave(
            () => {
  
            },
            () => {
            
            }
          );
      } finally {
        this.setState({ readyState: false });
        this.client = null;
        this.localStream = null;
        window.location.assign("/#/customer/schedule")
      }
    }
    };
  
    
    sharingScreen = (e) => {
      if(this.remoteShare2 === true && this.state.stateSharing === false){
        Swal.fire({
          title : "error",
          html : "Only one screen can be share at a time",
          icon : "error"
        })
      }
      else if(this.state.stateSharing) {
         this.shareClient && this.shareClient.unpublish(this.shareStream);
         this.shareStream && this.shareStream.close();
         this.setState({stateSharing : false})
       }
        else {
        this.setState({stateSharing : true})
        let $ = this.props;
        // init AgoraRTC local client
        this.shareClient = AgoraRTC.createClient({ mode: $.transcode });
        this.shareClient.init($.appId, () => {
        // this.subscribeStreamEvents();
          this.shareClient.join($.appId, $.channel, $.uid, (uid) => {
            this.state.uid = uid;
            // create local stream
            // It is not recommended to setState in function addStream
            this.shareStream = this.streamInitSharing(
              uid,
              $.attendeeMode,
              $.videoProfile
            );
            this.shareStream.init(
              () => {
                if ($.attendeeMode !== "audience") {
                  this.addStream(this.shareStream, true);
                  this.shareClient.publish(this.shareStream, (err) => {
                  });
                }
                this.setState({ readyState: true });
              },
              (err) => {
                this.setState({ readyState: true });
              }
            );
          });
        });
      }
    };
  
    streamInitSharing = (uid, attendeeMode, videoProfile, config) => {
      let defaultConfig = {
        streamID: uid,
        audio: false,
        video: false,
        screen: true,
       
      };
  
      switch (attendeeMode) {
        case "audio-only":
          defaultConfig.video = false;
          break;
        case "audience":
          defaultConfig.video = false;
          defaultConfig.audio = false;
          break;
        default:
        case "video":
          break;
      }
  
      let stream = AgoraRTC.createStream(merge(defaultConfig, config));
      stream.setVideoProfile(videoProfile);
      return stream;
    };
  
 
  render() {

    
    const style = {
      display: "grid",
      gridGap: "50px 26px",
      alignItems: "center",
      justifyItems: "center",
      gridTemplateRows: "repeat(12, auto)",
      gridTemplateColumns: "repeat(24, auto)",
    };
    
    const videoControlBtn =
      this.props.attendeeMode === "video" ? (
        <span
          onClick={this.handleCamera}
          className={this.state.readyState ? "ag-btn videoControlBtn" : "ag-btn videoControlBtn disabled"}
         
          title="Enable/Disable Video"
        >
          <i className="ag-icon ag-icon-camera"></i>
          <i className="ag-icon ag-icon-camera-off"></i>
        </span>
      ) : (
        ""
      );


    const audioControlBtn =
      this.props.attendeeMode !== "audience" ? (
        <span
          onClick={this.handleMic}
          className="ag-btn audioControlBtn"
          title="Enable/Disable Audio"
        >
          <i className="ag-icon ag-icon-mic"></i>
          <i className="ag-icon ag-icon-mic-off"></i>
        </span>
      ) : (
        ""
      );

    const switchDisplayBtn = (
      <span
        onClick={this.switchDisplay}
        className={
          this.state.streamList.length > 4
            ? "ag-btn displayModeBtn disabled"
            : "ag-btn displayModeBtn"
        }
        title="Switch Display Mode"
      >
        <i className="ag-icon ag-icon-switch-display"></i>
      </span>
    );

    const hideRemoteBtn = (
      <span
        className={
          this.state.streamList.length > 4 || this.state.displayMode !== "pip"
            ? "ag-btn disableRemoteBtn disabled"
            : "ag-btn disableRemoteBtn"
        }
        onClick={this.hideRemote}
        title="Hide Remote Stream"
      >
        <i className="ag-icon ag-icon-remove-pip"></i>
      </span>
    );

    const exitBtn = (
      <span
        onClick={this.handleExit}
        className={
          this.state.readyState ? "ag-btn exitBtn" : "ag-btn exitBtn disabled"
        }
        title="Exit"
      >
        <i className="ag-icon ag-icon-leave"></i>
      </span>
    );




    return (
      <>
      <div id="ag-canvas" style={style}>   
      <div className="ag-btn-group">
          {exitBtn}
          {videoControlBtn}
          {audioControlBtn}
          {
            <span
              onClick={this.sharingScreen}
              className="ag-btn shareScreenBtn"
              title="Share/unShare Screen"
            >
              <i className="ag-icon ag-icon-screen-share"></i>
            </span>
          }
          {switchDisplayBtn}
          {hideRemoteBtn}
          {/* {recordingBtn} */}
        </div>
      </div>
        </>
    );
  }
}

export default AgoraCanvas;
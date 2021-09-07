// import React from "react";
// import { merge } from "lodash";
// import AgoraRTC from "agora-rtc-sdk";
// import MicNoneIcon from '@material-ui/icons/MicNone';
// import MicOffIcon from '@material-ui/icons/MicOff';
// import axios from "axios";
// import { baseUrl } from "../../../config/config";
// import "./canvas.css";
// import "../../../assets/fonts/css/icons.css";
// import {
//   Modal,
//   ModalTitle,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
// } from "reactstrap";
// import RecordingModal from "./RecordingModal";
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
// import { green ,red} from '@material-ui/core/colors';


// const tile_canvas = {
//   "1": ["span 12/span 24"],
//   "2": ["span 12/span 12/13/25", "span 12/span 12/13/13"],
//   "3": ["span 6/span 12", "span 6/span 12", "span 6/span 12/7/19"],
//   "4": [
//     "span 6/span 12",
//     "span 6/span 12",
//     "span 6/span 12",
//     "span 6/span 12/7/13",
//   ],
//   "5": [
//     "span 3/span 4/13/9",
//     "span 3/span 4/13/13",
//     "span 3/span 4/13/17",
//     "span 3/span 4/13/21",
//     "span 9/span 16/10/21",
//   ],
//   "6": [
//     "span 3/span 4/13/7",
//     "span 3/span 4/13/11",
//     "span 3/span 4/13/15",
//     "span 3/span 4/13/19",
//     "span 3/span 4/13/23",
//     "span 9/span 16/10/21",
//   ],
//   "7": [
//     "span 3/span 4/13/5",
//     "span 3/span 4/13/9",
//     "span 3/span 4/13/13",
//     "span 3/span 4/13/17",
//     "span 3/span 4/13/21",
//     "span 3/span 4/13/25",
//     "span 9/span 16/10/21",
//   ],
// };

// /**
//  * @prop appId uid
//  * @prop transcode attendeeMode videoProfile channel baseMode
//  */


// class AgoraCanvas extends React.Component {
//   constructor(props) {
//     super(props);
//     this.client = {};
//     this.localStream = {};
//     this.shareClient = {};
//     this.shareStream = {};
//     this.state = {
//       displayMode: "pip",
//       streamList: [],
//       readyState: false,
//       stateSharing: false,
//       resID: '',
//       showModal: false,
//       recordDisplay: false,
//       data: {},
//       item:{},
//       showButton : ''
//     };

//     this.toggleModal = this.toggleModal.bind(this);
//     this.startRecording = this.startRecording.bind(this);
//   }

//   // userId = window.localStorage.getItem("tlkey");
//   teamKey = window.localStorage.getItem("tpkey");
//   uid = Math.floor((Math.random() * 10000) + 1);
//   channelName = this.props.channel

//  vendor = 1
//  region = 14;
//  bucket = "vride-multitvm";
//  accessKey = "AKIASTLI4S4OJH3WGMFM";
//  secretKey = "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";


//   componentWillMount() {
//     let $ = this.props;
//     // init AgoraRTC local client
//     this.client = AgoraRTC.createClient({ mode: $.transcode });
//     this.client.init($.appId, () => {
//       console.log("AgoraRTC client initialized");
//       this.subscribeStreamEvents();

//       this.client.join($.appId, $.channel, $.uid, (uid) => {
//         this.state.uid = uid;
//         console.log("User " + uid + " join channel successfully");
//         console.log("At " + new Date().toLocaleTimeString());
//         // create local stream
//         // It is not recommended to setState in function addStream
//         this.localStream = this.streamInit(uid, $.attendeeMode, $.videoProfile);
//         this.localStream.init(
//           () => {
//             if ($.attendeeMode !== "audience") {
//               this.addStream(this.localStream, true);
//               this.client.publish(this.localStream, (err) => {
//                 console.log("Publish local stream error: " + err);
//               });
//             }
//             this.setState({ readyState: true });
//           },
//           (err) => {
//             console.log("getUserMedia failed", err);
//             this.setState({ readyState: true });
//           }
//         );
//       });
//     });
//   }
 
//   componentDidMount() {
//     // add listener to control btn group
//     let canvas = document.querySelector("#ag-canvas");
//     let btnGroup = document.querySelector(".ag-btn-group");
//     canvas.addEventListener("mousemove", () => {
//       if (global._toolbarToggle) {
//         clearTimeout(global._toolbarToggle);
//       }
//       btnGroup.classList.add("active");
//       global._toolbarToggle = setTimeout(function () {
//         btnGroup.classList.remove("active");
//       }, 2000);
//     });
//     this.getSchedulerData()
//     this.accuire();
//     // this.accuire()
//   }
// schdrularName;

//   getSchedulerData =() =>{
//     console.log("getSchedulerData--",this.props.id)

//     axios
//             .get(`${baseUrl}/tl/videoScheduler?id=${this.props.id}`)
//             .then((res) => {
//                 console.log(res);
           
               
//                 if (res.data.code === 1) {
//                   this.setState({
//                     item:res.data.result.items[0],
//                    showButton : res.data.result.items[0].owner_id
//                   })  
                        
//                 }
//             });
//   }


//   componentDidUpdate() {
//     // rerendering
//     let canvas = document.querySelector("#ag-canvas");
//     // pip mode (can only use when less than 4 people in channel)
//     if (this.state.displayMode === "pip") {
//       let no = this.state.streamList.length;
//       if (no > 4) {
//         this.setState({ displayMode: "tile" });
//         return;
//       }
//       this.state.streamList.map((item, index) => {
//         let id = item.getId();
//         let dom = document.querySelector("#ag-item-" + id);
//         if (!dom) {
//           dom = document.createElement("section");
//           dom.setAttribute("id", "ag-item-" + id);
//           dom.setAttribute("class", "ag-item");
//           canvas.appendChild(dom);
//           item.play("ag-item-" + id);
//         }
//         if (index === no - 1) {
//           dom.setAttribute("style", `grid-area: span 12/span 24/13/25`);
//         } else {
//           dom.setAttribute(
//             "style",
//             `grid-area: span 3/span 4/${4 + 3 * index}/25;
//                     z-index:1;width:calc(100% - 20px);height:calc(100% - 20px)`
//           );
//         }

//         item.player.resize && item.player.resize();
//       });
//     }
//     // tile mode
//     else if (this.state.displayMode === "tile") {
//       let no = this.state.streamList.length;
//       this.state.streamList.map((item, index) => {
//         let id = item.getId();
//         let dom = document.querySelector("#ag-item-" + id);
//         if (!dom) {
//           dom = document.createElement("section");
//           dom.setAttribute("id", "ag-item-" + id);
//           dom.setAttribute("class", "ag-item");
//           canvas.appendChild(dom);
//           item.play("ag-item-" + id);
//         }
//         dom.setAttribute("style", `grid-area: ${tile_canvas[no][index]}`);
//         item.player.resize && item.player.resize();
//       });
//     }
//     // screen share mode (tbd)
//     else if (this.state.displayMode === "share") {
//     }
//   }

//   componentWillUnmount() {
//     this.client && this.client.unpublish(this.localStream);
//     this.localStream && this.localStream.close();
//     if (this.state.stateSharing) {
//       this.shareClient && this.shareClient.unpublish(this.shareStream);
//       this.shareStream && this.shareStream.close();
//     }
//     this.client &&
//       this.client.leave(
//         () => {
//           console.log("Client succeed to leave.");
//         },
//         () => {
//           console.log("Client failed to leave.");
//         }
//       );
//   }

//   streamInit = (uid, attendeeMode, videoProfile, config) => {
//     let defaultConfig = {
//       streamID: uid,
//       audio: true,
//       video: true,
//       screen: false,
//     };

//     switch (attendeeMode) {
//       case "audio-only":
//         defaultConfig.video = false;
//         break;
//       case "audience":
//         defaultConfig.video = false;
//         defaultConfig.audio = false;
//         break;
//       default:
//       case "video":
//         break;
//     }

//     let stream = AgoraRTC.createStream(merge(defaultConfig, config));
//     stream.setVideoProfile(videoProfile);
//     return stream;
//   };

//   subscribeStreamEvents = () => {
//     let rt = this;
//     rt.client.on("stream-added", function (evt) {
//       let stream = evt.stream;
//       console.log("New stream added: " + stream.getId());
//       console.log("At " + new Date().toLocaleTimeString());
//       console.log("Subscribe ", stream);
//       rt.client.subscribe(stream, function (err) {
//         console.log("Subscribe stream failed", err);
//       });
//     });

//     rt.client.on("peer-leave", function (evt) {
//       console.log("Peer has left: " + evt.uid);
//       console.log(new Date().toLocaleTimeString());
//       console.log(evt);
//       rt.removeStream(evt.uid);
//     });

//     rt.client.on("stream-subscribed", function (evt) {
//       let stream = evt.stream;
//       console.log("Got stream-subscribed event");
//       console.log(new Date().toLocaleTimeString());
//       console.log("Subscribe remote stream successfully: " + stream.getId());
//       console.log(evt);
//       rt.addStream(stream);
//     });

//     rt.client.on("stream-removed", function (evt) {
//       let stream = evt.stream;
//       console.log("Stream removed: " + stream.getId());
//       console.log(new Date().toLocaleTimeString());
//       console.log(evt);
//       rt.removeStream(stream.getId());
//     });
//   };

//   removeStream = (uid) => {
//     this.state.streamList.map((item, index) => {
//       if (item.getId() === uid) {
//         item.close();
//         let element = document.querySelector("#ag-item-" + uid);
//         if (element) {
//           element.parentNode.removeChild(element);
//         }
//         let tempList = [...this.state.streamList];
//         tempList.splice(index, 1);
//         this.setState({
//           streamList: tempList,
//         });
//       }
//     });
//   };

//   addStream = (stream, push = false) => {
//     let repeatition = this.state.streamList.some((item) => {
//       return item.getId() === stream.getId();
//     });
//     if (repeatition) {
//       return;
//     }
//     if (push) {
//       this.setState({
//         streamList: this.state.streamList.concat([stream]),
//       });
//     } else {
//       this.setState({
//         streamList: [stream].concat(this.state.streamList),
//       });
//     }
//   };

//   handleCamera = (e) => {
//     e.currentTarget.classList.toggle("off");
//     this.localStream.isVideoOn()
//       ? this.localStream.disableVideo()
//       : this.localStream.enableVideo();
//   };

//   handleMic = (e) => {
//     e.currentTarget.classList.toggle("off");
//     this.localStream.isAudioOn()
//       ? this.localStream.disableAudio()
//       : this.localStream.enableAudio();
//   };

//   switchDisplay = (e) => {
//     if (
//       e.currentTarget.classList.contains("disabled") ||
//       this.state.streamList.length <= 1
//     ) {
//       return;
//     }
//     if (this.state.displayMode === "pip") {
//       this.setState({ displayMode: "tile" });
//     } else if (this.state.displayMode === "tile") {
//       this.setState({ displayMode: "pip" });
//     } else if (this.state.displayMode === "share") {
//       // do nothing or alert, tbd
//     } else {
//       console.error("Display Mode can only be tile/pip/share");
//     }
//   };

//   hideRemote = (e) => {
//     if (
//       e.currentTarget.classList.contains("disabled") ||
//       this.state.streamList.length <= 1
//     ) {
//       return;
//     }
//     let list;
//     let id = this.state.streamList[this.state.streamList.length - 1].getId();
//     list = Array.from(
//       document.querySelectorAll(`.ag-item:not(#ag-item-${id})`)
//     );
//     list.map((item) => {
//       if (item.style.display !== "none") {
//         item.style.display = "none";
//       } else {
//         item.style.display = "block";
//       }
//     });
//   };

//   handleExit = (e) => {
//     if (e.currentTarget.classList.contains("disabled")) {
//       return;
//     }
//     try {
//       this.client && this.client.unpublish(this.localStream);
//       this.localStream && this.localStream.close();
//       if (this.state.stateSharing) {
//         this.shareClient && this.shareClient.unpublish(this.shareStream);
//         this.shareStream && this.shareStream.close();
//       }
//       this.client &&
//         this.client.leave(
//           () => {
//             console.log("Client succeed to leave.");
//           },
//           () => {
//             console.log("Client failed to leave.");
//           }
//         );
//     } finally {
//       this.setState({ readyState: false });
//       this.client = null;
//       this.localStream = null;
//       // redirect to index
//       window.location.hash = "/taxprofessional/schedule";
//     }
//   };

//   sharingScreen = (e) => {
//     if (this.state.stateSharing) {
//       this.shareClient && this.shareClient.unpublish(this.shareStream);
//       this.shareStream && this.shareStream.close();
//       this.state.stateSharing = false;
//     } else {
//       this.state.stateSharing = true;
//       let $ = this.props;
//       // init AgoraRTC local client
//       this.shareClient = AgoraRTC.createClient({ mode: $.transcode });

//       this.shareClient.init($.appId, () => {
//         console.log("AgoraRTC client initialized");

//         this.subscribeStreamEvents();
//         this.shareClient.join($.appId, $.channel, $.uid, (uid) => {
//           this.state.uid = uid;
//           console.log("User " + uid + " join channel successfully");
//           console.log("At " + new Date().toLocaleTimeString());
//           // create local stream
//           // It is not recommended to setState in function addStream
          
//           this.shareStream = this.streamInitSharing(
//             uid,
//             $.attendeeMode,
//             $.videoProfile
//           );
//           this.shareStream.init(
//             () => {
//               if ($.attendeeMode !== "audience") {
//                 this.addStream(this.shareStream, true);
//                 this.shareClient.publish(this.shareStream, (err) => {
//                   console.log("Publish local stream error: " + err);
//                 });
//               }
//               this.setState({ readyState: true });
//             },
//             (err) => {
//               console.log("getUserMedia failed", err);
//               this.setState({ readyState: true });
//             }
//           );
//         });
//       });
//     }
//   };

//   streamInitSharing = (uid, attendeeMode, videoProfile, config) => {
//     let defaultConfig = {
//       streamID: uid,
//       audio: true,
//       video: false,
//       screen: true,
//     };
 
//     switch (attendeeMode) {
//       case "audio-only":
//         defaultConfig.video = false;
//         break;
//       case "audience":
//         defaultConfig.video = false;
//         defaultConfig.audio = false;
//         break;
//       default:
//       case "video":
//         break;
//     }
   
//     let stream = AgoraRTC.createStream(merge(defaultConfig, config));
//     stream.setVideoProfile(videoProfile);
//     return stream;
//   };


//   CreateS3Folder = (uid) =>{
//     console.log("CreateS3Folder",uid)
//     axios
//             .get(`https://virtualapi.multitvsolution.com/s3/createMPObject.php?folder_id=${JSON.parse(uid)}`)
//             .then((res) => {
//                 console.log(res);    
//             });
//   }


// encodedString = "ZDMzOTU3N2EyOTRjNDU4Yzg2ZDhhNzhiNDc0MTQxZmM6MWE2MWE0YmVmMjE0NGU3OGJlNmY2NzFkNWNmM2ZjMzI=";




// sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// //get recording status
//  async GetRecordingStatus(json){
//     console.log("GetRecordingStatus",json)

//     await this.sleep(1000); 
//     var resourceId = json.data.resourceId;
//     var sid = json.data.sid;

//     localStorage.setItem("resourceId", resourceId);
//     localStorage.setItem("sid", sid);

//     fetch(`https://api.agora.io/v1/apps/${this.props.appId}/cloud_recording/resourceid/${resourceId}/sid/${sid}/mode/mix/query`, {
//       method: "GET",
//       headers: {
//         "content-type": "application/json;charset=utf-8",
//         "authorization": "Basic "+this.encodedString,
//         "cache-control": "no-cache",
//       },
//   })
//       .then((res) => res.json())
//       .then((response) => {
//           console.log(response);
//           this.setState({
//             data:response,
//             recordDisplay:!this.state.recordDisplay
//           })
//       })
//       .catch((error) => console.log(error));
//   }



// //start recording
// async startRecording(key){
//     console.log("startRecording - ",key);
//     var resourceId = key.data.resourceId 
    
//     this.CreateS3Folder(JSON.stringify(this.uid));

//     var data =  "{\n\t\"cname\":\""+this.channelName+"\",\n\t\"uid\":\""+this.uid+"\",\n\t\"clientRequest\":{\n\t\t\"recordingConfig\":{\n\t\t\t\"maxIdleTime\":60,\n\t\t\t\"channelType\":1,\n\t\t\t\"transcodingConfig\":{\n\t\t\t\t\"width\":1280,\n\t\t\t\t\"height\":720,\n\t\t\t\t\"fps\":30,\n\t\t\t\t\"bitrate\":3420,\n\t\t\t\t\"mixedVideoLayout\":1,\n\t\t\t\t\"maxResolutionUid\":\""+this.uid+"\"\n\t\t\t\t}\n\t\t\t},\n\t\t\"storageConfig\":{\n\t\t\t\"vendor\":"+this.vendor+",\n\t\t\t\"region\":"+this.region+",\n\t\t\t\"bucket\":\""+this.bucket+"\",\n\t\t\t\"accessKey\":\""+this.accessKey+"\",\n\"fileNamePrefix\": [\"recordings\",\"mp\",\""+this.uid+"\"],\n\t\t\t\"secretKey\":\""+this.secretKey+"\"\n\t\t}\t\n\t}\n} \n"
 

//   await axios({
//       method: "POST",
//       headers: {
//         "content-type": "application/json;charset=utf-8",
//         "authorization": "Basic "+this.encodedString,
//         "cache-control": "no-cache",
//       },
//       url: `https://api.agora.io/v1/apps/${this.props.appId}/cloud_recording/resourceid/${resourceId}/mode/mix/start`,
//       data: data,    
//     })
//     .then(json => this.GetRecordingStatus(json)) 
//       .catch((error) => {
//         console.log("error - ", error);
//       });
//   };


//   //recording  acquire
//    accuire = () =>{
//     console.log("accuire - ");
//     var data = "{\n  \"cname\": \"" + this.channelName + "\",\n  \"uid\": \"" + this.uid + "\",\n  \"clientRequest\":{\n  }\n}"

//     axios({
//       method: "POST",
//       headers: {
//         "content-type": "application/json;charset=utf-8",
//         "authorization": "Basic "+this.encodedString,
//         "cache-control": "no-cache",
//       },
//       url: `https://api.agora.io/v1/apps/${this.props.appId}/cloud_recording/acquire`,
//       data: data,
//     })
//       .then(json => 
//         this.startRecording(json)) 
//         // console.log("accuire - ",json))
//       .catch((error) => {
//         console.log("error - ", error);
//       });
//   };



//   //toggelStop
//   toggleModal = (key) =>{
//   console.log("key",key)
//   this.setState({
//     showModal: !this.state.showModal,
//     recordDisplay:false
//   })
// }


//  //stop recording 
//  stopRecording = () => {
//   console.log("stopRecording - ");

//   var resourceId = localStorage.getItem("resourceId");
//   var sid = localStorage.getItem("sid");

//   var data = JSON.stringify({
//     "cname":this.channelName,
//     "uid":JSON.stringify(this.uid),
//     "clientRequest":{ }});
//   axios({
//     method: "POST",
//     headers: {
//       "content-type": "application/json;charset=utf-8",
//       "authorization": "Basic "+this.encodedString,
//       "cache-control": "no-cache",
//     },
//     url: `https://api.agora.io/v1/apps/${this.props.appId}/cloud_recording/resourceid/${resourceId}/sid/${sid}/mode/mix/stop`,
//     data: data,
//   })
//   .then(json => 
//     this.toggleModal(json)) 
//     .catch((error) => {
//       console.log("error - ", error);
//     });
// };


//   render() {

//     // console.log("data",this.state.data)

//     const style = {
//       display: "grid",
//       gridGap: "50px 26px",
//       alignItems: "center",
//       justifyItems: "center",
//       gridTemplateRows: "repeat(12, auto)",
//       gridTemplateColumns: "repeat(24, auto)",
//     };
    
//     const videoControlBtn =
//       this.props.attendeeMode === "video" ? (
//         <span
//           onClick={this.handleCamera}
//           className="ag-btn videoControlBtn"
//           title="Enable/Disable Video"
//         >
//           <i className="ag-icon ag-icon-camera"></i>
//           <i className="ag-icon ag-icon-camera-off"></i>
//         </span>
//       ) : (
//         ""
//       );


//     const audioControlBtn =
//       this.props.attendeeMode !== "audience" ? (
//         <span
//           onClick={this.handleMic}
//           className="ag-btn audioControlBtn"
//           title="Enable/Disable Audio"
//         >
//           <i className="ag-icon ag-icon-mic"></i>
//           <i className="ag-icon ag-icon-mic-off"></i>
//         </span>
//       ) : (
//         ""
//       );

//     const switchDisplayBtn = (
//       <span
//         onClick={this.switchDisplay}
//         className={
//           this.state.streamList.length > 4
//             ? "ag-btn displayModeBtn disabled"
//             : "ag-btn displayModeBtn"
//         }
//         title="Switch Display Mode"
//       >
//         <i className="ag-icon ag-icon-switch-display"></i>
//       </span>
//     );

//     const hideRemoteBtn = (
//       <span
//         className={
//           this.state.streamList.length > 4 || this.state.displayMode !== "pip"
//             ? "ag-btn disableRemoteBtn disabled"
//             : "ag-btn disableRemoteBtn"
//         }
//         onClick={this.hideRemote}
//         title="Hide Remote Stream"
//       >
//         <i className="ag-icon ag-icon-remove-pip"></i>
//       </span>
//     );

//     const exitBtn = (
//       <span
//         onClick={this.handleExit}
//         className={
//           this.state.readyState ? "ag-btn exitBtn" : "ag-btn exitBtn disabled"
//         }
//         title="Exit"
//       >
//         <i className="ag-icon ag-icon-leave"></i>
//       </span>
//     );
//     // if(this.state.showButton == JSON.parse(this.teamKey)){
     
//     // }

// // //recording btn on
// //     const recordingBtn = (
// //       <span
// //         onClick={this.accuire}
// //         className={
// //           this.state.readyState ? "ag-btn exitBtn" : "ag-btn exitBtn disabled"
// //         }
// //         title="Record On"
// //       >
// //         <FiberManualRecordIcon style={{ color: green[500] }}/>
// //       </span>
// //     );


// //recording btn off
// const recordingBtnOff = (
//   <span
//     onClick={this.stopRecording}
//     className={
//       this.state.readyState ? "ag-btn exitBtn" : "ag-btn exitBtn disabled"
//     }
//     title="Record Off"
//   >
//             <FiberManualRecordIcon style={{ color: red[500] }}/>
//   </span>
// );

//     return (
//       <>
//       <div id="ag-canvas" style={style}>   
//         <div className="ag-btn-group">

//         <RecordingModal 
//         isOpen={this.state.showModal}
//          toggle={this.toggleModal}
//          data={this.state.data}
//          item={this.state.item}
//          />
                
//           {exitBtn}
//           {videoControlBtn}
//           {audioControlBtn}
//           {
//             <span
//               onClick={this.sharingScreen}
//               className="ag-btn shareScreenBtn"
//               title="Share/unShare Screen"
//             >
//               <i className="ag-icon ag-icon-screen-share"></i>
//             </span>
//           }
//           {switchDisplayBtn}
//           {hideRemoteBtn}
// {/* 
//           {
//             this.state.recordDisplay || this.state.showButton == JSON.parse(this.teamKey) ? recordingBtn : null
//           }
// */}
//           {
//             this.state.recordDisplay ? recordingBtnOff : null
//           } 
//         </div>
//       </div>
//         </>
//     );
//   }
// }

// export default AgoraCanvas;
import React from "react";
import { merge } from "lodash";
import AgoraRTC from "agora-rtc-sdk";
import MicNoneIcon from '@material-ui/icons/MicNone';
import MicOffIcon from '@material-ui/icons/MicOff';
import axios from "axios";
import { baseUrl } from "../../../config/config";
import "./canvas.css";
import "../../../assets/fonts/css/icons.css";
import {
  Modal,
  ModalTitle,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import RecordingModal from "./RecordingModal";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { green ,red} from '@material-ui/core/colors';


const tile_canvas = {
  "1": ["span 12/span 24"],
  "2": ["span 12/span 12/13/25", "span 12/span 12/13/13"],
  "3": ["span 6/span 12", "span 6/span 12", "span 6/span 12/7/19"],
  "4": [
    "span 6/span 12",
    "span 6/span 12",
    "span 6/span 12",
    "span 6/span 12/7/13",
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
};

/**
 * @prop appId uid
 * @prop transcode attendeeMode videoProfile channel baseMode
 */


class AgoraCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.client = {};
    this.localStream = {};
    this.shareClient = {};
    this.shareStream = {};
    this.state = {
      displayMode: "pip",
      streamList: [],
      readyState: false,
      stateSharing: false,
      resID: '',
      showModal: false,
      recordDisplay: false,
      data: {},
      item:{},
      showButton : ''
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.startRecording = this.startRecording.bind(this);
  }

  // userId = window.localStorage.getItem("tlkey");
  teamKey = window.localStorage.getItem("tpkey");
  uid = Math.floor((Math.random() * 10000) + 1);
  channelName = this.props.channel

 vendor = 1
 region = 14;
 bucket = "vride-multitvm";
 accessKey = "AKIASTLI4S4OJH3WGMFM";
 secretKey = "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";


  componentWillMount() {
    let $ = this.props;
    // init AgoraRTC local client
    this.client = AgoraRTC.createClient({ mode: $.transcode });
    this.client.init($.appId, () => {
      console.log("AgoraRTC client initialized");
      this.subscribeStreamEvents();

      this.client.join($.appId, $.channel, $.uid, (uid) => {
        this.state.uid = uid;
        console.log("User " + uid + " join channel successfully");
        console.log("At " + new Date().toLocaleTimeString());
        // create local stream
        // It is not recommended to setState in function addStream
        this.localStream = this.streamInit(uid, $.attendeeMode, $.videoProfile);
        this.localStream.init(
          () => {
            if ($.attendeeMode !== "audience") {
              this.addStream(this.localStream, true);
              this.client.publish(this.localStream, (err) => {
                console.log("Publish local stream error: " + err);
              });
            }
            this.setState({ readyState: true });
          },
          (err) => {
            console.log("getUserMedia failed", err);
            this.setState({ readyState: true });
          }
        );
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
    this.getSchedulerData()
    this.accuire();
    // this.accuire()
  }
schdrularName;

  getSchedulerData =() =>{
    console.log("getSchedulerData--",this.props.id)

    axios
    .get(`${baseUrl}/tl/videoScheduler?id=${this.props.id}`)
            .then((res) => {
                console.log(res);
           
               
                if (res.data.code === 1) {
                  this.setState({
                    item:res.data.result.items[0],
                   showButton : res.data.result.items[0].owner_id
                  })  
                        
                }
            });
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
        let id = item.getId();
        let dom = document.querySelector("#ag-item-" + id);
        if (!dom) {
          dom = document.createElement("section");
          dom.setAttribute("id", "ag-item-" + id);
          dom.setAttribute("class", "ag-item");
          canvas.appendChild(dom);
          item.play("ag-item-" + id);
        }
        if (index === no - 1) {
          dom.setAttribute("style", `grid-area: span 12/span 24/13/25`);
        } else {
          dom.setAttribute(
            "style",
            `grid-area: span 3/span 4/${4 + 3 * index}/25;
                    z-index:1;width:calc(100% - 20px);height:calc(100% - 20px)`
          );
        }

        item.player.resize && item.player.resize();
      });
    }
    // tile mode
    else if (this.state.displayMode === "tile") {
      let no = this.state.streamList.length;
      this.state.streamList.map((item, index) => {
        let id = item.getId();
        let dom = document.querySelector("#ag-item-" + id);
        if (!dom) {
          dom = document.createElement("section");
          dom.setAttribute("id", "ag-item-" + id);
          dom.setAttribute("class", "ag-item");
          canvas.appendChild(dom);
          item.play("ag-item-" + id);
        }
        dom.setAttribute("style", `grid-area: ${tile_canvas[no][index]}`);
        item.player.resize && item.player.resize();
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
          console.log("Client succeed to leave.");
        },
        () => {
          console.log("Client failed to leave.");
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

  subscribeStreamEvents = () => {
    let rt = this;
    rt.client.on("stream-added", function (evt) {
      let stream = evt.stream;
      console.log("New stream added: " + stream.getId());
      console.log("At " + new Date().toLocaleTimeString());
      console.log("Subscribe ", stream);
      rt.client.subscribe(stream, function (err) {
        console.log("Subscribe stream failed", err);
      });
    });

    rt.client.on("peer-leave", function (evt) {
      console.log("Peer has left: " + evt.uid);
      console.log(new Date().toLocaleTimeString());
      console.log(evt);
      rt.removeStream(evt.uid);
    });

    rt.client.on("stream-subscribed", function (evt) {
      let stream = evt.stream;
      console.log("Got stream-subscribed event");
      console.log(new Date().toLocaleTimeString());
      console.log("Subscribe remote stream successfully: " + stream.getId());
      console.log(evt);
      rt.addStream(stream);
    });

    rt.client.on("stream-removed", function (evt) {
      let stream = evt.stream;
      console.log("Stream removed: " + stream.getId());
      console.log(new Date().toLocaleTimeString());
      console.log(evt);
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
  };

  addStream = (stream, push = false) => {
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
  };

  handleCamera = (e) => {
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
    if (e.currentTarget.classList.contains("disabled")) {
      return;
    }
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
            console.log("Client succeed to leave.");
          },
          () => {
            console.log("Client failed to leave.");
          }
        );
    } finally {
      this.setState({ readyState: false });
      this.client = null;
      this.localStream = null;
      // redirect to index
      window.location.hash = "/taxprofessional/schedule";
    }
  };

  sharingScreen = (e) => {
    if (this.state.stateSharing) {
      this.shareClient && this.shareClient.unpublish(this.shareStream);
      this.shareStream && this.shareStream.close();
      this.state.stateSharing = false;
    } else {
      this.state.stateSharing = true;
      let $ = this.props;
      // init AgoraRTC local client
      this.shareClient = AgoraRTC.createClient({ mode: $.transcode });

      this.shareClient.init($.appId, () => {
        console.log("AgoraRTC client initialized");

        this.subscribeStreamEvents();
        this.shareClient.join($.appId, $.channel, $.uid, (uid) => {
          this.state.uid = uid;
          console.log("User " + uid + " join channel successfully");
          console.log("At " + new Date().toLocaleTimeString());
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
                  console.log("Publish local stream error: " + err);
                });
              }
              this.setState({ readyState: true });
            },
            (err) => {
              console.log("getUserMedia failed", err);
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
      audio: true,
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


  CreateS3Folder = (uid) =>{
    console.log("CreateS3Folder",uid)
    axios
            .get(`https://virtualapi.multitvsolution.com/s3/createMPObject.php?folder_id=${JSON.parse(uid)}`)
            .then((res) => {
                console.log(res);    
            });
  }


encodedString = "ZDMzOTU3N2EyOTRjNDU4Yzg2ZDhhNzhiNDc0MTQxZmM6MWE2MWE0YmVmMjE0NGU3OGJlNmY2NzFkNWNmM2ZjMzI=";




sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//get recording status
 async GetRecordingStatus(json){
    console.log("GetRecordingStatus",json)

    await this.sleep(3000); 
    var resourceId = json.data.resourceId;
    var sid = json.data.sid;

    localStorage.setItem("resourceId", resourceId);
    localStorage.setItem("sid", sid);

    fetch(`https://api.agora.io/v1/apps/${this.props.appId}/cloud_recording/resourceid/${resourceId}/sid/${sid}/mode/mix/query`, {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=utf-8",
        "authorization": "Basic "+this.encodedString,
        "cache-control": "no-cache",
      },
  })
      .then((res) => res.json())
      .then((response) => {
          console.log(response);
          this.setState({
            data:response,
            recordDisplay:!this.state.recordDisplay
          })
      })
      .catch((error) => console.log(error));
  }



//start recording
async startRecording(key){
    console.log("startRecording - ",key);
    var resourceId = key.data.resourceId 
    
    this.CreateS3Folder(JSON.stringify(this.uid));

    var data =  "{\n\t\"cname\":\""+this.channelName+"\",\n\t\"uid\":\""+this.uid+"\",\n\t\"clientRequest\":{\n\t\t\"recordingConfig\":{\n\t\t\t\"maxIdleTime\":60,\n\t\t\t\"channelType\":1,\n\t\t\t\"transcodingConfig\":{\n\t\t\t\t\"width\":1280,\n\t\t\t\t\"height\":720,\n\t\t\t\t\"fps\":30,\n\t\t\t\t\"bitrate\":3420,\n\t\t\t\t\"mixedVideoLayout\":1,\n\t\t\t\t\"maxResolutionUid\":\""+this.uid+"\"\n\t\t\t\t}\n\t\t\t},\n\t\t\"storageConfig\":{\n\t\t\t\"vendor\":"+this.vendor+",\n\t\t\t\"region\":"+this.region+",\n\t\t\t\"bucket\":\""+this.bucket+"\",\n\t\t\t\"accessKey\":\""+this.accessKey+"\",\n\"fileNamePrefix\": [\"recordings\",\"mp\",\""+this.uid+"\"],\n\t\t\t\"secretKey\":\""+this.secretKey+"\"\n\t\t}\t\n\t}\n} \n"
 

  await axios({
      method: "POST",
      headers: {
        "content-type": "application/json;charset=utf-8",
        "authorization": "Basic "+this.encodedString,
        "cache-control": "no-cache",
      },
      url: `https://api.agora.io/v1/apps/${this.props.appId}/cloud_recording/resourceid/${resourceId}/mode/mix/start`,
      data: data,    
    })
    .then(json => this.GetRecordingStatus(json)) 
      .catch((error) => {
        console.log("error - ", error);
      });
  };


  //recording  acquire
   accuire = () =>{
    console.log("accuire - ");
    var data = "{\n  \"cname\": \"" + this.channelName + "\",\n  \"uid\": \"" + this.uid + "\",\n  \"clientRequest\":{\n  }\n}"

    axios({
      method: "POST",
      headers: {
        "content-type": "application/json;charset=utf-8",
        "authorization": "Basic "+this.encodedString,
        "cache-control": "no-cache",
      },
      url: `https://api.agora.io/v1/apps/${this.props.appId}/cloud_recording/acquire`,
      data: data,
    })
      .then(json => 
        this.startRecording(json)) 
        // console.log("accuire - ",json))
      .catch((error) => {
        console.log("error - ", error);
      });
  };



  //toggelStop
  toggleModal = (key) =>{
  console.log("key",key)
  this.setState({
    showModal: !this.state.showModal,
    recordDisplay:false
  })
}


 //stop recording 
 stopRecording = () => {
  console.log("stopRecording - ");

  var resourceId = localStorage.getItem("resourceId");
  var sid = localStorage.getItem("sid");

  var data = JSON.stringify({
    "cname":this.channelName,
    "uid":JSON.stringify(this.uid),
    "clientRequest":{ }});
  axios({
    method: "POST",
    headers: {
      "content-type": "application/json;charset=utf-8",
      "authorization": "Basic "+this.encodedString,
      "cache-control": "no-cache",
    },
    url: `https://api.agora.io/v1/apps/${this.props.appId}/cloud_recording/resourceid/${resourceId}/sid/${sid}/mode/mix/stop`,
    data: data,
  })
  .then(json => 
    this.toggleModal(json)) 
    .catch((error) => {
      console.log("error - ", error);
    });
};


  render() {

    // console.log("data",this.state.data)

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
          className="ag-btn videoControlBtn"
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

//recording btn on
    // const recordingBtn = (
    //   <span
    //     onClick={this.accuire}
    //     className={
    //       this.state.readyState ? "ag-btn exitBtn" : "ag-btn exitBtn disabled"
    //     }
    //     title="Record On"
    //   >
    //     <FiberManualRecordIcon style={{ color: green[500] }}/>
    //   </span>
    // );


//recording btn off
const recordingBtnOff = (
  <span
    onClick={this.stopRecording}
    className={
      this.state.readyState ? "ag-btn exitBtn" : "ag-btn exitBtn disabled"
    }
    title="Record Off"
  >
            <FiberManualRecordIcon style={{ color: red[500] }}/>
  </span>
);

    return (
      <>
      <div id="ag-canvas" style={style}>   
        <div className="ag-btn-group">

        <RecordingModal 
        isOpen={this.state.showModal}
         toggle={this.toggleModal}
         data={this.state.data}
         item={this.state.item}
         />
                
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

          {/* {
            this.state.recordDisplay || this.state.showButton == JSON.parse(this.teamKey) ? recordingBtn : null
          } */}

          {
            this.state.recordDisplay ? recordingBtnOff : null
          }
        </div>
      </div>
        </>
    );
  }
}

export default AgoraCanvas;
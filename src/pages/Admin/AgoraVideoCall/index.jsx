import React from "react";
import { merge } from "lodash";
import AgoraRTC from "agora-rtc-sdk";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import "./canvas.css";
import "../../../assets/fonts/css/icons.css";
import Swal from "sweetalert2";
import RecordingModal from "./RecordingModal";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { green ,red} from '@material-ui/core/colors';
import recImg from "../../../assets/images/loader.gif";
import Cookies from "js-cookie";
import CommonServices from "../../../common/common"
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

/**
 * @prop appId uid
 * @prop transcode attendeeMode videoProfile channel baseMode
 */

 
 
class AgoraCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.adminName = Cookies.get("adminName")
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
      articleId : [],
      articleId2 : [],
      showRecBtn : false,
      showButton : '',
      clickDisable : false,
      addRemote : null,
      disabledVedio : false,
      getAdId :'',
      remoteRemove22: false,
     
      shareValue : false,
      vedTrack : null,
      vedOffer : '',
     
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.startRecording = this.startRecording.bind(this);
  }

  // userId = window.localStorage.getItem("tlkey");
  allrecording = [];
  teamKey = window.localStorage.getItem("adminkey");
  adminEmail2 = window.localStorage.getItem("adminEmail");
  uid = Math.floor((Math.random() * 10000) + 1);
  channelName = this.props.channel
  tempArray = []
  hostId ;
  vendor = 1
 region = 14;
 bucket  = "vride-multitvm";
 accessKey = "AKIASTLI4S4OJH3WGMFM";
 secretKey = "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";
allrecording;
localVedioTrack;
remoteShare2 = false
token = window.localStorage.getItem("adminToken")
myConfig = {
  headers : {
   "uit" : this.token
  }
}
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
     
      var data_post_api = "https://virtualapi.multitvsolution.com/VstreamApi/index.php/api/vstream/userdata?channel_name="+this.channelName+"&rtm_id="+""+"&rtc_id="+uid+"&user_name="+this.adminName;
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
    this.getSchedulerData()
    this.accuire();
    // this.accuire()
  }

  getSchedulerData =() =>{
       axios
            .get(`${baseUrl}/admin/videoScheduler?id=${this.props.id}`, this.myConfig)
            .then((res) => {
                       
                if (res.data.code === 1) {
                 if(res.data.result.items){
                  this.setState({
                    item:res.data.result.items[0],
                   showButton : res.data.result.items[0].owner_id
                  })  
                 }
                        
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
     
        let txtColor = "myPartName";
        let id = item.getId();
        let dom = document.querySelector("#ag-item-" + id);
        if(dom && this.state.disabledVedio === true){
          dom.setAttribute("class", "ag-item2");
        }
        else if (dom && this.state.disabledVedio === false) {
         dom.setAttribute("class", "ag-item");
        }
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
                dom.setAttribute("style", `grid-area: span 12/span 24/13/25`);
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
        if(dom && this.state.disabledVedio === true){
          dom.setAttribute("class", "ag-item2");
        }
        else if (dom && this.state.disabledVedio === false) {
         dom.setAttribute("class", "ag-item");
        }
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
            dom.setAttribute("style", `grid-area: span 12/span 24/13/25`);
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
 
       
     rt.addStream(stream)
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
    
 
      axios.get(`${baseUrl}/tl/setgetschedular?id=${this.props.id}&uid=${this.state.showButton}&chname=${this.channelName}`, this.myConfig)
      .then((res) => {
       
        if(res.data.result.rtc_id == uid){
         
          Swal.fire({
            title: "success",
            html : "Thank you for attending this meeting, this meeting is going to be ended by host",
            icon : "success"
          })
            setTimeout((e) => {
              window.location.pathname = "/admin/schedule";
            }, 500)
           
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
   if(this.state.readyState === false){
     return false
   }
   else{
    this.setState({disabledVedio : !this.state.disabledVedio})
    e.currentTarget.classList.toggle("off");
    this.localStream.isVideoOn()
      ? this.localStream.disableVideo()
      : this.localStream.enableVideo();
   }
  };

  handleMic = (e) => {
   if(this.state.readyState === false){

   }
   else{
    e.currentTarget.classList.toggle("off");
    this.localStream.isAudioOn()
      ? this.localStream.disableAudio()
      : this.localStream.enableAudio();
   }
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
    }
  };

  hideRemote = (e) => {
    
   if(e.currentTarget === undefined){

   }
   else{
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
   }
  };  
  
  handleExit = async() => {
    if(this.state.clickDisable === false){
      this.setState({clickDisable : true})
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
     .then(response => {
       
       this.tempArray.push(response.data.serverResponse.fileList)
       this.setState({showRecBtn : true})
     })
         .catch((error) => {
        
       });
    
    }
 
     
   }
   sharingScreen = (e) => {
   if(this.remoteShare2 === true && this.state.stateSharing === false){
     Swal.fire({
       title : "error",
       html : "Only one screen can be shared at a time",
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
      

       //  this.subscribeStreamEvents();
        this.shareClient.join($.appId, $.channel, $.uid, (uid) => {
         
         
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
      video:  false,
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
    stream.setVideoProfile("1080p_2");
    return stream;
  };

  

  CreateS3Folder = (uid) =>{
    axios
            .get(`https://virtualapi.multitvsolution.com/s3/createMPObject.php?folder_id=${JSON.parse(uid)}`)
            .then((res) => {
                
            });
  }


encodedString = "N2VmMGY4ODg4NjI4NDFhYWIwNWY1NzFjNDM5MzE4OTc6NjU0ZDViYWM5ZDU2NGY4Y2JhOTJmNzJkOGM2N2FjYzI=";
sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//get recording status
async GetRecordingStatus(json){
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
        this.setState({
          data:response,
          recordDisplay:!this.state.recordDisplay
        })
        setTimeout(() => {
          this.setState({clickDisable : false})
        }, 1000)
    })
    .catch((error) => console.log(error));
}

//start recording
async startRecording(key){   
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
      });
  };

  //recording  acquire
  accuire = () =>{
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
      .catch((error) => {
      });
  };
// Start recording button
  recStart = () => {
   
    // this.localStream.enableVideo();
    this.accuire();
   
    this.setState({ showRecBtn: false  });
    
  }

  //toggelStop
  toggleModal = (key) =>{
  
  this.setState({
    showModal: !this.state.showModal,
    recordDisplay:false
  })
}


 //stop recording 
 stopRecording = () => {
  if(this.state.showRecBtn === true){
this.del();
  }
  else if(this.state.showButton == JSON.parse(this.teamKey)){
    
    if(resourceId === undefined){
      var resourceId = localStorage.getItem("resourceId");
    var sid = localStorage.getItem("sid");
    }
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
  
    this.setState({vedOffer : json}),
     this.setState({showRecBtn : true}),
   
this.del(),
    ) 
    .catch((error) => {   
    });
}
else{
  this.localStream.disableVideo()
  window.location.pathname = "/admin/schedule";
}
};

 del = (e) => {
 
    var serverResponse = this.state.data.serverResponse.fileList
  var completeRecording;
  if(this.tempArray === undefined || this.tempArray.length === 0){
      completeRecording =  serverResponse;
  }
  else if(this.tempArray != undefined || this.tempArray.length > 0){
   if(this.state.showRecBtn === true){
        completeRecording = this.tempArray 
   }
   else{
        completeRecording = this.tempArray + "," + serverResponse;
   }
  }
  else{
      completeRecording = serverResponse;
  }
 
   let formData = new FormData()
   formData.append("fileList", completeRecording)
  formData.append("schedule_id", this.props.id);
  formData.append("uid", JSON.parse(this.teamKey));
  formData.append("assign_id", this.state.item.assign_no);
  formData.append("participants", this.state.item.username);
  axios({
    method: "POST",
    url: `${baseUrl}/admin/callRecordingPost`,
    headers : {
      uit : this.token
    },
    data: formData,
})
  Swal.fire({
  title: "End this vedio call for everyone?",
  // text: "End this vedio call for everyone",
  showCloseButton:true,
   type: "warning",
   showCancelButton : true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   confirmButtonText: "End the call",
   cancelButtonText : "Just leave the meeting"
  }).then((result) => {
    if (result.value) {
      axios.get(`${baseUrl}/tl/setgetschedular?id=${this.props.id}&rtc_id=${this.state.getAdId}&uid=${JSON.parse(this.teamKey)}`, this.myConfig)
      .then((res) =>{
        if(res){
          this.client && this.client.unpublish(this.localStream);
          this.localStream && this.localStream.close();
          this.toggleModal()
        }
      })
     
     }
   else if(result.dismiss === "backdrop" || result.dismiss === "close"){
     return false
   }
   else{
    axios({
      method: "POST",
      url: `${baseUrl}/admin/callRecordingPost`,
      headers : {
        uit : this.token
      },
      data: formData,
   })
    window.location.pathname = "/admin/schedule";
   }
 });
 }
 
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
      onClick={this.stopRecording}
             className={
          this.state.readyState ? "ag-btn exitBtn" : "ag-btn exitBtn disabled"
        }
        title="Exit"
      >
       
     <i className="ag-icon ag-icon-leave"></i> 
      </span>
    );

//recording btn on

    const recordingBtn = (
      <span
        onClick={this.recStart}
        className={
          this.state.readyState ? "ag-btn exitBtn" : "ag-btn exitBtn disabled"
        }
        title="Record On"
      >{
        this.state.showRecBtn === true ?
      
        <FiberManualRecordIcon style={{ color: green[500] }}/> : ""}
      </span>
    );

//recording btn off
const recordingBtnOff = (
  <span
  onClick={this.handleExit}

    
    className={
      this.state.readyState ? "ag-btn exitBtn" : "ag-btn exitBtn disabled"
    }
    title="Record Off"
  >
     {
      this.state.showButton == JSON.parse(this.teamKey) ?
     
     <img src = {recImg} style = {{width : "20px"}} /> : ""
    }
            
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
         allrecording = {this.tempArray}
         schId = {this.props.id}
         uid = {this.state.getAdId}
         ownerId = {this.state.showButton}
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

          {
             this.state.showRecBtn === true ? recordingBtn : null
          }

          {
             this.state.showRecBtn === false ? recordingBtnOff : null
          }
        </div>
      </div>
        </>
    );
  }
}

export default AgoraCanvas;
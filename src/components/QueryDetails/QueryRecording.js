import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import ModalVideo from "react-modal-video";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
    Button,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../config/config";
import BootstrapTable from "react-bootstrap-table-next";
import "react-modal-video/scss/modal-video.scss";
import ReactHlsPlayer from 'react-hls-player'
import ReactPlayer from 'react-player';
import CloseIcon from '@material-ui/icons/Close';
// import '../../../../node_modules/react-modal-video/scss/modal-video.scss';



function QueryRecording(assingNo) {
    // const userid = window.localStorage.getItem("tlkey");
    const [feedbackData, setFeedBackData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [videoid, setVideoId] = useState(null);

    const openModal = (videoContent) => {
        setIsOpen(true);
        setVideoId(videoContent);
    };

    useEffect(() => {

        getRecording();
    }, []);
    const modalBox = {
        display : "flex",
        position : "absolute",
        top : "10%",
        left : "0%",
        botttom: "0%", 
        right: "0%",
       
        width : "100%", 
        height: "auto"
    }
const canBtn = {
    position: "absolute",
    top: "0",
    right: "10px",
    left: "90%",
    padding: "20px",
    cursor : "pointer",
    color : "red"
}
console.log("assignNo", assingNo.assingNo)
    const getRecording = () => {
        axios
            .get(`${baseUrl}/tl/callRecordingPostlist?assign_id=${assingNo.assingNo}`)
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setFeedBackData(res.data.result);
                }
            });
    };
   
    // if(assingNo.assingNo != undefined){
    //     getRecording();
    // }
    const columns = [
        {
            text: "S.No",
            dataField: "",
            formatter: (cellContent, row, rowIndex) => {
                return rowIndex + 1;
            },
            headerStyle: () => {
                return { fontSize: "12px", width: "8px", padding : "9px 5px" };
            },
        },
        {
            text: "Date",
            sort: true,
            dataField: "created_date",
            headerStyle: () => {
                return { fontSize: "12px", width: "30px" };
            },
        },
        {
            text: "Query No",
            dataField: "assign_id",
            headerStyle: () => {
                return { fontSize: "12px", width: "20px" };
            },
        },
        
        {
            text: "Participants",
            dataField: "participants",
            headerStyle: () => {
                return { fontSize: "12px", width: "40px" };
            },
        },
       
        {
            text: "Summary of Discussion",
            dataField: "message",
            headerStyle: () => {
                return { fontSize: "12px", width: "80px" };
            },
        },
        {
            text: "Action",
            headerStyle: () => {
                return { fontSize: "12px", width: "20px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        <div>
                            <i
                                className="material-icons"
                                style={{
                                    cursor: "pointer",
                                    color: "red",
                                    fontSize: "25px",
                                }}
                                onClick={() => openModal(row.file)}
                            >
                                play_circle_outline
                            </i>
                        </div>
                    </>
                );
            },
        },
    ];



    console.log("videourl", videoid)
   
    return (
     
           <div>
                <Card>
                <CardHeader>
                    <Row>
                        <Col md="7">
                            <CardTitle tag="h4">Recording of Discussion</CardTitle>
                        </Col>
                        <Col md="5"></Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={feedbackData}
                        columns={columns}
                        rowIndex
                    />
                </CardBody>
            </Card>
            {isOpen === true ?
          
                 
          <div style={modalBox}>
          <span style={canBtn} onClick= {() => setIsOpen(false)}> <CloseIcon color="red" /> </span>
         {/* <ReactHlsPlayer
     src={videoid}    autoPlay={false}
     controls={true}
     width="100%"
     height="100%"
     hlsConfig={{
         maxLoadingDelay: 4,
         minAutoBitrate: 0,
         lowLatencyMode: true,
       }}
   /> */}

   <div style={{margin: "50px 0 0 0"}}>
   <ReactPlayer
     url={videoid}
     controls={true}
     playing={true}
     width='100%'
     height='100%'
    />
       </div>
     
    </div>
  : ""}
            {/* <ReactHlsPlayer
    src={videoid}   
     autoPlay={false}
    controls={true}
    width="100%"
    height="auto"
  /> */}
            {/* <ReactHlsPlayer
    src={videoid}
    hlsConfig={{
      maxLoadingDelay: 4,
      minAutoBitrate: 0,
      lowLatencyMode: true,
    }}
  /> */}
  {/* <ReactPlayer url={videoid} /> */}
           </div>

    );
}

export default QueryRecording;
import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import RecordingEdit from './RecordingEdit';
import ReactPlayer from "react-player";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col
} from "reactstrap";
import axios from "axios";
import CloseIcon from '@material-ui/icons/Close';
import { baseUrl } from "../../../config/config";
import BootstrapTable from "react-bootstrap-table-next";
import "react-modal-video/scss/modal-video.scss";
import RecordingFilter from "../../../components/Search-Filter/RecordingFilter";
import {Link} from "react-router-dom";
// import '../../../../node_modules/react-modal-video/scss/modal-video.scss';



function Recording() {
    const userid = window.localStorage.getItem("tpkey");
    const [feedbackData, setFeedBackData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [videoid, setVideoId] = useState(null);
    const [records, setRecords] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false)
    const [editData, setEditData] = useState({
        participant : '',
        editMessage : '',
        assignid : '',
        id : ''
    })
    const openModal = (videoContent) => {
        setIsOpen(true);
        setVideoId(videoContent);
    };

    useEffect(() => {
        getRecording();
    }, []);

    const getRecording = () => {
        axios
            .get(`${baseUrl}/tl/callRecordingPostlist?uid=${JSON.parse(userid)}`)
            .then((res) => {
               
                if (res.data.code === 1) {
                    setFeedBackData(res.data.result);
                    setRecords(res.data.result.length)
                }
            });
    };
    const videoIcon = {
        display : "flex", 
        justifyContent : "space-around", 
        alignItems : "center"
    }
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
const editRecording = (participants, assign_id, message, id) => {
   
    setShowEditModal(!showEditModal)
    setEditData({
        participant : participants,
        editMessage : message,
        assignid : assign_id,
        id : id
    })
}
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
            dataField: "",
            headerStyle: () => {
                return { fontSize: "12px", width: "20px" };
            },
            formatter : function formatter(cell, row){
                let a = row.assign_id.split("-")[row.assign_id.split("-").length - 1]
                return <>
                <Link
                to = {{
                    pathname : `/taxprofessional/queries/${a}`,
                    routes : "recording"
                }}>
                {row.assign_id}
                </Link>
                </>
            }
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
             
                var recording = row.file.split(",");
                let a = 1;
                return (
                    <>
                       <div>
                    {row.record_by === JSON.parse(userid) && row.message === null?
                             <i
                             className="fa fa-edit"
                             style={{
                               fontSize: 18,
                               cursor: "pointer",
                               marginLeft: "8px",
                             }}
                             onClick = {() => editRecording(row.participants, row.assign_id, row.message, row.id)}
                           ></i> : ""}
                    </div>
                        <div>
                            {
                                recording.map((record) => {
                                   return(
                                    <>
                                    <p style={videoIcon}>
                                   {record.length === 0 ? "" : 
                                   <>
                                     <span>{a++}</span>   <i
                                        className="material-icons"
                                        style={{
                                            cursor: "pointer",
                                            color: "red",
                                            fontSize: "25px",
                                        }}
                                        onClick={() => openModal(record)}
                                    >
                                        play_circle_outline
                                     
                                    </i>
                                  
                                   </>}
                                  
                                    </p>
                                    </>
                                   )
                                })
                            }
                           
                        </div>
                    </>
                );
            },
        },
    ];



    return (
        <>
     <Layout TPDashboard="TPDashboard" TPuserId={userid}>
            <div style={{position:"relative", height : "100vh", overflow : "scroll"}}>
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
                 <RecordingFilter
                        setData={setFeedBackData}
                     //    getData={getInCompleteAssingment}
                        SearchQuery="SearchQuery"
                       setRecords={setRecords}
                        records={records} 
                        userid = {userid}
                        getRecording = {getRecording}
                     /> 
                     <BootstrapTable
                         bootstrap4
                         keyField="id"
                         data={feedbackData}
                         columns={columns}
                         rowIndex
                     />
                 </CardBody>
 
             </Card>
           
            </div>
             
            {isOpen === true ?
           
                  
                  <div style={modalBox}>
                  <span style={canBtn} onClick= {() => setIsOpen(false)}> <CloseIcon color="red" /> </span>
                 
        
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
          <RecordingEdit 
          isOpen = {showEditModal}
          recordingHandler = {editRecording}
          participants = {editData.participant}
          message = {editData.editMessage}
          assignid = {editData.assignid}
          editId = {editData.id}
          recList = {getRecording}/>
          </Layout>
            </>
 
     );
 }
 export default Recording;
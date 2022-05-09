import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { baseUrl, ReportUrl } from "../../config/config";
import CommonServices from "../../common/common";
import RejectedModal from "./RejectModal";
import DiscardReport from "./DiscardReport";
import Assignmodal from "./Assignmodal";
import PublishIcon from '@material-ui/icons/Publish';
import {Typography} from "@material-ui/core";
import MessageIcon from "../../components/Common/MessageIcon";

function ViewReport({
  reportModal,
  ViewReport,
  report,
  getPendingforAcceptance,
  dataItem,
  deleiverAble
}) {
  const userId = window.localStorage.getItem("userid");
  const [data, setData] = useState([]);
  const [docData, setDocData] = useState({});
  const [additionalQuery, setAdditionalQuery] = useState(false);
  const [assignNo, setAssignNo] = useState('');
  const [nestedModal, setNestedModal] = useState(false);
  const [modaldoc, setModaldoc] = useState({})
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const token = window.localStorage.getItem("clientToken")
  const toggleNested = (key) => {
    setNestedModal(!nestedModal);
    setDocData(key)
  }

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
  }

  useEffect(() => {
    getData();
  }, [report]);

  const downloadpdf = (qid) => {
    let userId, token;
  
    userId = window.localStorage.getItem("userid");
    token = window.localStorage.getItem("clientToken")
    const myConfig2 = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
    axios.get(`${baseUrl}/customers/viewreportdocument?assign_no=${report}&id=${qid}` , myConfig2)
    .then((res) => {
     
      if(res.status === 200){
         window.open(URL.createObjectURL(res.data));
      }
    })
   }
   const downloadpdfclient = (qid) => {
    let userId, token;
  
    userId = window.localStorage.getItem("userid");
    token = window.localStorage.getItem("clientToken")
    const myConfig2 = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
    axios.get(`${baseUrl}/customers/viewreportdocument?assign_no=${report}&id=${qid}&document=2` , myConfig2)
    .then((res) => {
     
      if(res.status === 200){
         window.open(URL.createObjectURL(res.data));
      }
    })
   }
  const getData = () => {
   if(report === undefined){

   }
   else{
    let formData = new FormData();
    formData.append("assign_no", report);
    formData.append("uid", JSON.parse(userId));

    axios({
      method: "POST",
      url: `${baseUrl}/customers/getstagesinfo`,
      headers: {
        uit: token
      },
      data: formData,
    })
      .then(function (response) {
       
        if (response.data.code === 1) {
          setData(response.data.result)
        }
      })
      .catch((error) => {
      
      });
   }
  }
  const additionalHandler = (p) => {
 setModaldoc(p.docid)
    setAdditionalQuery(!additionalQuery);
    setAssignNo(userId)
};


  //accept handler
  const acceptHandler = (key) => {
   

    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", dataItem.id);
    formData.append("query_no", dataItem.assign_no);
    formData.append("type", 1);
    formData.append("docid", key.docid);


    axios({
      method: "POST",
      url: `${baseUrl}/customers/draftAccept`,
      headers : {
        uit : token
      },
      data: formData,
    })
      .then(function (response) {
   
        if (response.data.code === 1) {
          getData();
         
        }
      })
      .catch((error) => {
     
      });
  };

console.log("data", data)

  return (
    <div>
      <Modal isOpen={reportModal} toggle={ViewReport} size="lg" scrollable>
        <ModalHeader toggle={ViewReport}>
          
           <Typography variant="h6">
           View All Report 
           </Typography>
           <button class="autoWidthBtn" onClick={() => ViewDiscussionToggel()}>
                View Discussion
              </button>
           
        </ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="row" style={{border: `1px solid ${deleiverAble}`, color: "#fff", backgroundColor: `${deleiverAble}` , width: "50px"}}>S.No</th>
                <th scope="row" style={{border: `1px solid ${deleiverAble}`, color: "#fff", backgroundColor: `${deleiverAble}`, width: "150px"}}>Date</th>
                <th scope="row" style={{border: `1px solid ${deleiverAble}`, color: "#fff", backgroundColor: `${deleiverAble}`}}>Document</th>
              
                {/* {
                  dataItem ?
                    dataItem.customer_file === null ? "" : <th scope="row">File Upload</th>
                    :
                    null
                } */}
                <th scope="row" style={{border: `1px solid ${deleiverAble}`, color: "#fff", backgroundColor: `${deleiverAble}`}}>Uploaded file
                </th>
               
                {
                  dataItem ?
                    dataItem.final_report ? null : <th scope="row" style={{border: `1px solid ${deleiverAble}`, color: "#fff", width: "100px", backgroundColor: `${deleiverAble}`}}>Action</th>
                    :
                    null
                }
              
              </tr>
            </thead>

            {data.length > 0
              ? data.map((p, i) => (
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{CommonServices.removeTime(p.created_date)}</td>
                    <td>
                      <tr>
                      {p.document && (
                        <p style={{ display: "flex" }}>
                          <span onClick={() => downloadpdf(p.docid)} style={{display: "flex"}}>
                     <i className="fa fa-photo"></i>
                      
                         
                          <p style={{ marginLeft: "15px" }}>{p.document}</p>
                          </span>
                        </p>
                      )}
                      </tr>
                     {p.customer_files && 
                      <tr>
                        <span onClick={() => downloadpdfclient(p.docid)} style={{display : "flex"}}>
                     <i className="fa fa-photo"></i>
                     
                          &nbsp; &nbsp; &nbsp;{p.customer_files}
                          </span>
                    
                    </tr> }
                    </td>
                  
                    <td>
                   {p.stages_type === "2" ?
                   <p>Draft Report</p> : null}
                   {p.stages_type === "3" ?
                   <p>Final Report</p> : null}
                 <br></br> 
                 {p.customer_files === null ?  "" : <p>   Reviewed Report </p> }
                </td>
               
  {p.stages_type === "2" ?
 <div className="px-2">
    <>
   {
        p.status === "1" ?
          <div style={{ cursor: "pointer" }} title="Client Accepted">
            <i
              class="fa fa-check"
              style={{
                color: "blue",
                fontSize: "16px",
              
              }}
            ></i>
          </div> :""}

          {p.status === "2" && p.customer_files !== null ?
          <p className="declined">Pending </p> : ""}




         { p.status === "2" || p.status === "0" ?
              <>
              <div style={{display : "flex", flexDirection: "row"}}>
               {p.status === "2" ? null :
               <>
             
              {p.tlstatus ===  "0" ?
              <div style={{ cursor: "pointer" }} title="Accept">
<i
  class="fa fa-check"
  style={{
    color: "green",
    fontSize: "16px",
  }}
  onClick={() => acceptHandler(p)}
></i>
</div> : null}
                <div title="Discussion" onClick={() => toggleNested(p)} className="ml-2">
                
             <MessageIcon />
              </div>
              
              </> }
                {p.customer_files === null ?
<div title="Upload Additional Documents"
        style={{ cursor: "pointer", display : "inline-flex" }}
        onClick={() => additionalHandler(p)}
       
    >
        <PublishIcon color="secondary" />
    </div> : ""}
    </div>
    </> :""}</>
   </div> : null}
                  </tr>
                </tbody>
              ))
              : null}
          </table>
        </ModalBody>
      </Modal>

      <RejectedModal
        toggleNested={toggleNested}
        nestedModal={nestedModal}
        dataItem={dataItem}
        docData={docData}
        getData={getData}
      />
     <Assignmodal
                        additionalHandler={additionalHandler}
                        additionalQuery={additionalQuery}
                        assignNo={assignNo}
                        modaldoc = {modaldoc}
                        getData = {getData}
                        // getQueriesData={getQueriesData}
                    />
      <DiscardReport
        ViewDiscussionToggel={ViewDiscussionToggel}
        ViewDiscussion={ViewDiscussion}
        report={report}
        headColor={deleiverAble}
        getData={getData}
      />
    </div>
  );
}

export default ViewReport;
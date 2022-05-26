import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody} from "reactstrap";
import axios from "axios";
import { baseUrl, ReportUrl } from "../../../config/config";
import * as yup from "yup";
import CommonServices from "../../../common/common";
import DiscardReport from "./DiscardReport";
import './modalSty.css';
import { makeStyles } from '@material-ui/core';
import {Typography} from "@material-ui/core"
const Schema = yup.object().shape({
  p_chat: yup.string().required(""),
});
const useStyle = makeStyles({
  modalHeaderStyle : {
    display : "flex",
    width : "100%", 
    justifyContent : "space-between"
  }
})

function ViewReport({
  reportModal,
  ViewReport,
  report,
  getPendingforAcceptance,
  deleiverAble
}) {
  const userId = window.localStorage.getItem("adminkey");
  const [data, setData] = useState([]);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const token = window.localStorage.getItem("adminToken")
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
  }
const viewStyle = {
  display: "block",
    width: "100%",
    border: "1px solid black"
}
  useEffect(() => {
    getData();
  }, [report]);
  const downloadpdf = (qid, name) => {
    let userId, token;
  console.log("dpdf", qid, name)
    userId = window.localStorage.getItem("adminkey");
    token = window.localStorage.getItem("adminToken")
    const myConfig2 = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
    axios.get(`${baseUrl}/admin/viewreportdocument?assign_no=${report}&id=${qid}` , myConfig2)
    .then((res) => {
     
      if(res.status === 200){
        window.URL = window.URL || window.webkitURL;
           var url = window.URL.createObjectURL(res.data);
           var a = document.createElement("a");
           document.body.appendChild(a);
           a.style = "display: none";
           a.href = url;
           console.log(res.headers)
           a.download = name;
           a.target = '_blank';
           a.click();
      }
    })
   }
   const downloadpdfclient = (qid, name) => {
    let userId, token;
    console.log("dcpdf", qid, name)
    userId = window.localStorage.getItem("adminkey");
    token = window.localStorage.getItem("adminToken")
    const myConfig2 = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
    axios.get(`${baseUrl}/admin/viewreportdocument?assign_no=${report}&id=${qid}&document=2` , myConfig2)
    .then((res) => {
     
      if(res.status === 200){
        window.URL = window.URL || window.webkitURL;
           var url = window.URL.createObjectURL(res.data);
           var a = document.createElement("a");
           document.body.appendChild(a);
           console.log(res.headers)
           a.style = "display: none";
           a.href = url;
           a.download = name;
           a.target = '_blank';
           a.click();
      }
    })
   }
  const getData = () => {
    let formData = new FormData();
    formData.append("assign_no", report);
    formData.append("uid", JSON.parse(userId));
    formData.append("stages_type", 2);

    axios({
      method: "POST",
      url: `${baseUrl}/admin/getstagesinfo`,
      headers : {
        uit : token
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
 const classes = useStyle()
  return (
    <>
      <Modal isOpen={reportModal} toggle={ViewReport} size="lg" scrollable>
       <ModalHeader toggle={ViewReport} className = {classes.modalHeaderStyle}>
           
           <Typography variant="h6">
           View All Report 
           </Typography>
           <button className="autoWidthBtn" onClick={() => ViewDiscussionToggel()}>
                View Discussion
              </button>
           
        </ModalHeader>
        <ModalBody>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{border: `1px solid ${deleiverAble}`, color: "#fff", backgroundColor: `${deleiverAble}`}}>S.No</th>
                <th style={{border: `1px solid ${deleiverAble}`, color: "#fff", backgroundColor: `${deleiverAble}`,  width:"120px"}}>Date</th>
                <th style={{border: `1px solid ${deleiverAble}`, color: "#fff", backgroundColor: `${deleiverAble}`}}>Document</th>
               
                <th style={{border: `1px solid ${deleiverAble}`, color: "#fff", backgroundColor: `${deleiverAble}` , width: "150px"}}>Report Type</th>
                <th style={{border: `1px solid ${deleiverAble}`, color: "#fff", backgroundColor: `${deleiverAble}`, width: "100px"}}>Action</th>
              </tr>
            </thead>

            {data.length > 0
              ? data.map((p, i) => (
                <tbody>
                  <tr className="modalTable">
                    <td>{i + 1}</td>
                    <td>{CommonServices.removeTime(p.created_date)}</td>
                    <td>
                    
                    <tr>
                      {p.document && (
                        <p style={{ display: "flex" }}>
                           <span onClick={() => downloadpdf(p.docid, p.document)} style={{display: "flex", cursor : "pointer"}}>
                     <i className="fa fa-photo"></i>
                     
                       
                          <p style={{ marginLeft: "15px" }}>{p.document}</p>
                          </span>
                        </p>
                      )}
                      </tr>
                     {p.customer_files && 
                      <tr>
                     
                     <span onClick={() => downloadpdfclient(p.docid, p.customer_files)} style={{display: "flex", cursor : "pointer"}}>
                     <i className="fa fa-photo"></i>
                      
                        &nbsp; &nbsp; &nbsp;{p.customer_files}
                        </span>
                    </tr> }
                    </td>
                  
                    
                  
                   

                    <td>
                  <p>    {p.stages_type == 2 && "Draft Report" || p.stages_type == 3 && "Final Report"}</p>
                  
                  <br>
                  </br> 
                  {p.customer_files === null ?  "" : <p>   Reviewed Report </p> }</td>
                  <td>
                  {p.stages_type === "2" ? <>
                  {p.status === "3" ? 
                   <p className="declined"> Discarded</p> : 
                   null}
                   {
                     p.status === "1" ?
                     <div style={{ cursor: "pointer" }} title="Client Accepted">
                     <i
                       className="fa fa-check"
                       style={{
                         color: "blue",
                         fontSize: "16px",
                         marginLeft: "10px"
                       }}
                     ></i>
                   </div> : null
                   }
                   {p.status === "0" || p.status === "2" ?
                   <>
                   {p.tlstatus === "0" ?
                   <p className="declined">Pending</p> :
                   <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div title="Discussion">
                      <i
                        className="fa fa-comments-o"
                        style={{
                          fontSize: 16,
                          cursor: "pointer",
                          marginLeft: "8px",
                          color: "green"
                        }}
                     
                      ></i>
                    </div>
                    <div title="Discard">
                      <i
                        className="fa fa-times"
                        style={{
                          fontSize: 16,
                          cursor: "pointer",
                          marginLeft: "8px",
                          color: "red"
                        }}
                      
                      ></i>
                    </div>
                  </div>}
                   </> : null}</> : null}
                 </td>
                  </tr>
                </tbody>
              ))
              : null}
          </table>
        </ModalBody>
      </Modal>

      <DiscardReport
        ViewDiscussionToggel={ViewDiscussionToggel}
        ViewDiscussion={ViewDiscussion}
        report={report}
        getData={getData}
        headColor="#5a625a"
      />
    </>
  );
}

export default ViewReport;

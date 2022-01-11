import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody} from "reactstrap";
import axios from "axios";
import { baseUrl, ReportUrl } from "../../../config/config";
import * as yup from "yup";
import CommonServices from "../../../common/common";
import DiscardReport from "./DiscardReport";
import './modalSty.css';
import { makeStyles } from '@material-ui/core';
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
}) {
  const userId = window.localStorage.getItem("adminkey");
  const [data, setData] = useState([]);

  const [ViewDiscussion, setViewDiscussion] = useState(false);
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

  const getData = () => {
    let formData = new FormData();
    formData.append("assign_no", report);
    formData.append("uid", JSON.parse(userId));
    formData.append("stages_type", 2);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/getstagesinfo`,
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
        <ModalHeader toggle={ViewReport} className={classes.modalHeaderStyle}>
         
            <span>View All Reports</span>
          
              <button className="btn btn-success" onClick={() => ViewDiscussionToggel()}>
                View Discussion
              </button>
           
          
        </ModalHeader>
        <ModalBody>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="row">S.No</th>
                <th scope="row">Date</th>
                <th scope="row">Document</th>
               
                <th scope="row">Report Type</th>
                <th scope="row">Action</th>
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
                          <a
                            href={`${ReportUrl}/${report}/${p.document}`}
                            target="_blank"
                          >
                            <i className="fa fa-photo"></i>
                          </a>
                          <p style={{ marginLeft: "15px" }}>{p.document}</p>
                        </p>
                      )}
                      </tr>
                     {p.customer_files && 
                      <tr>
                    
                      <a
                            href={`${ReportUrl}/${report}/${p.customer_files}`}
                            target="_blank"
                          >
                            <i className="fa fa-photo"></i> 
                          </a> &nbsp; &nbsp; &nbsp;{p.customer_files}
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
                   <p style={{ color: "red" }}> Discarded</p> : 
                   null}
                   {
                     p.status === "1" ?
                     <div style={{ cursor: "pointer" }} title="Client Accepted">
                     <i
                       class="fa fa-check"
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
                   <p style={{ color: "red" }}>Pending</p> :
                   <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div title="Discussion">
                      <i
                        class="fa fa-comments-o"
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
                        class="fa fa-times"
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
      />
    </>
  );
}

export default ViewReport;

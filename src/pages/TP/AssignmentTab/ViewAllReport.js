import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl, ReportUrl } from "../../../config/config";
import * as yup from "yup";
import CommonServices from "../../../common/common";
import RejectedModal from "./RejectModal";
import Alerts from "../../../common/Alerts";
import Swal from "sweetalert2";
import DiscardReport from "./DiscardReport";
import {Typography} from "@material-ui/core";

const Schema = yup.object().shape({
  p_chat: yup.string().required("required discussion"),
});

function ViewReport({
  reportModal,
  ViewReport,
  report,
  dataItem,
  headColor
}) {
  const userId = window.localStorage.getItem("tpkey");
  const [data, setData] = useState([]);
  const [docData, setDocData] = useState({});


  const [nestedModal, setNestedModal] = useState(false);
  const toggleNested = (key) => {
    setNestedModal(!nestedModal);
    setDocData(key)
  }

  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    // setDocData(report)
  }
  const token = window.localStorage.getItem("tptoken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }



  //check
  const toggleDiscard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to discard ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, discard it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };

  const deleteCliente = (id) => {
    
    let formData = new FormData();
    formData.append("tp_id", JSON.parse(userId));
    formData.append("id", dataItem.q_id);
    formData.append("query_no", dataItem.assign_no);
    formData.append("type", 2);
    formData.append("docid", id.docid);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/draftDiscussion`,
      headers: {
        uit : token
      },
      data: formData,
    })
      .then(function (response) {
       
        if (response.data.code === 1) {
          getData()
          Alerts.SuccessNormal("Discarded Successfully")
          ViewReport()
        }
      })
      .catch((error) => {
       
      });
  };


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
      headers: {
        uit  : token
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
                <th style={{border: `1px solid ${headColor}`,  color: "#fff", backgroundColor: `${headColor}`}}>S.No</th>
                <th style={{border: `1px solid ${headColor}`, color: "#fff", backgroundColor: `${headColor}` , width: "120px"}}>Date</th>
                <th style={{border: `1px solid ${headColor}`, color: "#fff", backgroundColor: `${headColor}`}}>Document</th>
                <th style={{border: `1px solid ${headColor}`, color: "#fff", backgroundColor: `${headColor}` , width: "150px"}}>Report Type</th>
                <th style={{border: `1px solid ${headColor}`, color: "#fff", backgroundColor: `${headColor}` , width: "100px"}}>Action</th>
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
                          <a
                            href={`${ReportUrl}/${report}/${p.document}`}
                            target="_blank"
                          >
                            <i class="fa fa-photo"></i>
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
                            <i class="fa fa-photo"></i> 
                          </a> &nbsp; &nbsp; &nbsp;{p.customer_files}
                    </tr> }
                    </td>
                  
                    <td>
                     <p> {p.stages_type == 2 && "Draft Report" || p.stages_type == 3 && "Final Report"}</p>
                 <br></br> 
                 {p.customer_files === null ?  "" : <p>   Reviewed Report </p> } </td>
                 <td>
                  {p.stages_type === "2" ?
                  <>
                   {p.status === "3" ? 
                   <p className="declined"> Discarded</p> : 
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
                   <p className="declined">Pending</p> :
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
                      onClick = {() => toggleNested(p)}
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
                       onClick={() => toggleDiscard(p)}
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

      <RejectedModal
        toggleNested={toggleNested}
        nestedModal={nestedModal}
        dataItem={dataItem}
        docData={docData}
        getData={getData}
      />


      <DiscardReport
        ViewDiscussionToggel={ViewDiscussionToggel}
        ViewDiscussion={ViewDiscussion}
        report={report}
        getData={getData} 
        headColor ={headColor}
      />

    </div>
  );
}

export default ViewReport;

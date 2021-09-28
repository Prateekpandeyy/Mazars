import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl, ReportUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import CommonServices from "../../common/common";
import RejectedModal from "./RejectModal";
import DiscardReport from "./DiscardReport";
import Assignmodal from "./Assignmodal";
import PublishIcon from '@material-ui/icons/Publish';

const Schema = yup.object().shape({
  p_chat: yup.string().required("required discussion"),
});


function ViewReport({
  reportModal,
  ViewReport,
  report,
  getPendingforAcceptance,
  dataItem
}) {
  const userId = window.localStorage.getItem("userid");
  const [data, setData] = useState([]);
  const [docData, setDocData] = useState({});
  const [additionalQuery, setAdditionalQuery] = useState(false);
  const [assignNo, setAssignNo] = useState('');
  const [nestedModal, setNestedModal] = useState(false);
  const [modaldoc, setModaldoc] = useState({})
  const toggleNested = (key) => {
    setNestedModal(!nestedModal);
    setDocData(key)
  }

  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
  }

  useEffect(() => {
    getData();
  }, [report]);


  const getData = () => {
    let formData = new FormData();
    formData.append("assign_no", report);
    formData.append("uid", JSON.parse(userId));

    axios({
      method: "POST",
      url: `${baseUrl}/customers/getstagesinfo`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setData(response.data.result)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  }
  const additionalHandler = (p) => {
 setModaldoc(p.docid)
    setAdditionalQuery(!additionalQuery);
    setAssignNo(userId)
};


  //accept handler
  const acceptHandler = (key) => {
    console.log("acceptHandler", key);

    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", dataItem.id);
    formData.append("query_no", dataItem.assign_no);
    formData.append("type", 1);
    formData.append("docid", key.docid);


    axios({
      method: "POST",
      url: `${baseUrl}/customers/draftAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("response-", response);
        if (response.data.code === 1) {
          getData();
          var variable = "Draft accepted successfully "
          // Alerts.SuccessNormal(variable)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };



  return (
    <div>
      <Modal isOpen={reportModal} toggle={ViewReport} size="lg" scrollable>
        <ModalHeader toggle={ViewReport}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "55vw" }}>
            <span>View All Reports</span>
            <span>
              <button class="btn btn-success"
              onClick={() => ViewDiscussionToggel()}
              >
                View Discussion
              </button>
            </span>
          </div>
        </ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="row">S.No</th>
                <th scope="row">Date</th>
                <th scope="row">Document</th>
              
                {/* {
                  dataItem ?
                    dataItem.customer_file === null ? "" : <th scope="row">File Upload</th>
                    :
                    null
                } */}
                <th scope="row">Uploaded file
                </th>
               
                {
                  dataItem ?
                    dataItem.final_report ? null : <th scope="row">Action</th>
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
                    <p>  {p.stages_type == 2 && "Draft Report" || p.stages_type == 3 && "Final Report"}</p>
                 <br></br> 
                 {p.customer_files === null ?  "" : <p>   Reviewed Report </p> }
                </td>
                    {
                      p.stages_type == "2" ?
                        <td>
                          {
                            p.status == "0" ?
                              <div style={{ display: "flex", justifyContent: "space-around" }}>

                                <div style={{ cursor: "pointer" }} title="Accept">
                                  <i
                                    class="fa fa-check"
                                    style={{
                                      color: "green",
                                      fontSize: "16px",
                                    }}
                                    onClick={() => acceptHandler(p)}
                                  ></i>
                                </div>
                              
                                                      
                                                
                                <div title="Discussion">
                                  <i
                                    class="fa fa-comments-o"
                                    style={{
                                      fontSize: 16,
                                      cursor: "pointer",
                                      marginLeft: "8px",
                                      color: "green"
                                    }}
                                    onClick={() => toggleNested(p)}
                                  ></i>
                                </div>
                                {p.customer_files === null ?
                                <div title="Upload Additional Documents"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => additionalHandler(p)}
                                                           
                                                        >
                                                            <PublishIcon color="secondary" />
                                                        </div> : ""}
                              </div>
                              :
                              p.status == "1" ?
                                <div style={{ cursor: "pointer" }} title="Customer Accepted">
                                  <i
                                    class="fa fa-check"
                                    style={{
                                      color: "blue",
                                      fontSize: "16px",
                                    }}
                                  ></i>
                                </div> :
                                p.status == "2" ?
                                  <div title="Discussion">
                                    <i
                                      class="fa fa-comments-o"
                                      style={{
                                        fontSize: 16,
                                        cursor: "pointer",
                                        marginLeft: "8px",
                                        color: "green"
                                      }}
                                      onClick={() => toggleNested(p)}
                                    ></i>
                                  </div> :
                                  null
                          }
                        </td>
                        :
                        null
                    }

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
        getData={getData}
      />
    </div>
  );
}

export default ViewReport;

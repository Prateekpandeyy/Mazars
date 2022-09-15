import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import CommonServices from "../../../common/common";
import Alerts from "../../../common/Alerts";
import CustomTypography from "../../../components/Common/CustomTypography";
import CustomHeading from "../../../components/Common/CustomHeading";
function DiscardReport({
  ViewDiscussion,
  ViewDiscussionToggel,
  report,
  getData,
  headColor
}) {
  const userId = window.localStorage.getItem("tpkey");
  const [data, setData] = useState([]);
  const token = window.localStorage.getItem("tptoken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  useEffect(() => {
    getHistory();
  }, [report]);
  // mazarapi/v1/tl/getMessage?id=128&q_no=Q-24-72

  const getHistory = () => {
   if(report != undefined && report.length > 0){
    axios.get(`${baseUrl}/tp/getMessage?id=${JSON.parse(userId)}&q_no=${report}`, myConfig).then((res) => {
    
      if (res.data.code === 1) {
        setData(res.data.result);
      }
    });
   }
  };


  return (
    <div>
      <Modal isOpen={ViewDiscussion} toggle={ViewDiscussionToggel} size="lg" scrollable>
        <ModalHeader toggle={ViewDiscussionToggel}>
        <CustomHeading>
          Discussion history 
          </CustomHeading>
        </ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <thead>
              <tr style={{backgroundColor: `${headColor}`,  color: "#fff"}}>
                <th style={{border: `1px solid ${headColor}`}}>S.no</th>
                <th style={{border: `1px solid ${headColor}`}}>Date</th>
                <th style={{border: `1px solid ${headColor}`}}>Name</th>
                <th style={{border: `1px solid ${headColor}`}}>Message</th>
              </tr>
            </thead>
            {data.length > 0
              ? data.map((p, i) => (
                <tbody>
                  <tr className={p.type == "sent" ? "send" : "received"}>
                    <td>
                    <CustomTypography>
                      {i + 1}
                      </CustomTypography>
                    </td>
                    <td>  
                      <CustomTypography>
                      {CommonServices.removeTime(p.setdate)}
                      </CustomTypography></td>
                    <td>
                    <CustomTypography>
                      {p.sender}
                      </CustomTypography>
                    </td>
                    <td style={{width : "460px", overflow : "wrap"}}>
                     
                        <CustomTypography>
                        {
                        p.type == "sent" ?
                          <i class="fa fa-mail-forward" style={{ color: "red", marginLeft: "10px", marginRight: "10px" }}></i>
                          :
                          <i class="fa fa-mail-reply" style={{ color: "green", marginLeft: "10px", marginRight: "10px" }}></i>
                      }
                      {p.message}
                      </CustomTypography>
                    </td>
                  </tr>
                </tbody>
              ))
              : null}
          </table>
        </ModalBody>
        <ModalFooter>
          <div>
            <button className ="customBtn" onClick={ViewDiscussionToggel}>Cancel</button>
          </div>
        </ModalFooter>
      </Modal >

    </div >
  );
}

export default DiscardReport;


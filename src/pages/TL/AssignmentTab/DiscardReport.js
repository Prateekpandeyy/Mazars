import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import CommonServices from "../../../common/common";
import Alerts from "../../../common/Alerts";


function DiscardReport({
  ViewDiscussion,
  ViewDiscussionToggel,
  report,
  getData,
  headColor
}) {
  const userId = window.localStorage.getItem("tlkey");
  const [data, setData] = useState([]);

  useEffect(() => {
    getHistory();
  }, [report]);
  const token = window.localStorage.getItem("tlToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
  const getHistory = () => {
   
  if(report != undefined && report.length > 0){
   
    axios.get(`${baseUrl}/tl/getMessage?id=${JSON.parse(userId)}&q_no=${report}`, myConfig).then((res) => {
    
      if (res.data.code === 1) {
        setData(res.data.result);
      }
    });
  }
  };


  return (
    <div>
      <Modal isOpen={ViewDiscussion} toggle={ViewDiscussionToggel} size="lg" scrollable>
        <ModalHeader toggle={ViewDiscussionToggel}>Discussion History </ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="row" style={{border: `1px solid ${headColor}`, backgroundColor: `${headColor}`, color:"#fff"}}>S.No</th>
                <th scope="row" style={{border: `1px solid ${headColor}`, backgroundColor: `${headColor}`, color:"#fff"}}>Date</th>
                <th scope="row" style={{border: `1px solid ${headColor}`, backgroundColor: `${headColor}`, color:"#fff"}}>Name</th>
                <th scope="row" style={{border: `1px solid ${headColor}`, backgroundColor: `${headColor}`, color:"#fff"}}>Message</th>
              </tr>
            </thead>
            {data.length > 0
              ? data.map((p, i) => (
                <tbody>
                  <tr className={p.type == "sent" ? "send" : "received"}>
                    <td>{i + 1}</td>
                    <td>{CommonServices.removeTime(p.setdate)}</td>
                    <td>{p.sender}</td>
                    <td style={{ width : "460px", overflow : "wrap"}}>
                      {
                        p.type == "sent" ?
                          <i class="fa fa-mail-forward" style={{ color: "red", marginLeft: "10px", marginRight: "10px" }}></i>
                          :
                          <i class="fa fa-mail-reply" style={{ color: "green", marginLeft: "10px", marginRight: "10px" }}></i>
                      }
                      {p.message}
                    </td>
                  </tr>
                </tbody>
              ))
              : null}
          </table>
        </ModalBody>
        <ModalFooter>
          <div>
            <button className="customBtn" onClick={ViewDiscussionToggel}>Cancel</button>
          </div>
        </ModalFooter>
      </Modal >

    </div >
  );
}

export default DiscardReport;


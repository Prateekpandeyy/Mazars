import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import CommonServices from "../../../common/common";

function DiscardReport({
  ViewDiscussion,
  ViewDiscussionToggel,
  report,
  getData,
  headColor
}) {
  const userId = window.localStorage.getItem("adminkey");
  const [data, setData] = useState([]);

  useEffect(() => {
    getHistory();
  }, [report]);
  const token = window.localStorage.getItem("adminToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }

  const getHistory = () => {
   
      if(report != undefined && report.length > 0){
        axios.get(`${baseUrl}/admin/getMessage?id=${JSON.parse(userId)}&q_no=${report}`, myConfig).then((res) => {
        
          if (res.data.code === 1) {
            setData(res.data.result);
          }
        });
      }
   
  };


  return (
   
      <Modal isOpen={ViewDiscussion} toggle={ViewDiscussionToggel} size="lg" scrollable = {true}>
        <ModalHeader toggle={ViewDiscussionToggel}>Discussion History </ModalHeader>
        <ModalBody>
          <table className="table table-bordered">
          <thead>
              <tr style={{backgroundColor: `${headColor}`,  color: "#fff"}}>
                <th scope="row" style={{border: `1px solid ${headColor}`}}>S.No</th>
                <th scope="row" style={{border: `1px solid ${headColor}`}}>Date</th>
                <th scope="row" style={{border: `1px solid ${headColor}`}}>Name</th>
                <th scope="row" style={{border: `1px solid ${headColor}`}}>Message</th>
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
                          <i className="fa fa-mail-forward" style={{ color: "red", marginLeft: "10px", marginRight: "10px" }}></i>
                          :
                          <i className="fa fa-mail-reply" style={{ color: "green", marginLeft: "10px", marginRight: "10px" }}></i>
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
            <button className = "autoWidthBtn" onClick={ViewDiscussionToggel}>Cancel</button>
          </div>
        </ModalFooter>
      </Modal >

  
  );
}

export default DiscardReport;


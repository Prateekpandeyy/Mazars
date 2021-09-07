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
  getData
}) {
  const userId = window.localStorage.getItem("tlkey");
  const [data, setData] = useState([]);

  useEffect(() => {
    getHistory();
  }, [report]);
  // mazarapi/v1/tl/getMessage?id=128&q_no=Q-24-72

  const getHistory = () => {
    axios.get(`${baseUrl}/tl/getMessage?id=${JSON.parse(userId)}&q_no=${report}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setData(res.data.result);
      }
    });
  };


  return (
    <div>
      <Modal isOpen={ViewDiscussion} toggle={ViewDiscussionToggel} size="lg" scrollable>
        <ModalHeader toggle={ViewDiscussionToggel}>Discussion History </ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="row">S.No</th>
                <th scope="row">Date</th>
                <th scope="row">Name</th>
                <th scope="row">Message</th>
              </tr>
            </thead>
            {data.length > 0
              ? data.map((p, i) => (
                <tbody>
                  <tr className={p.type == "sent" ? "send" : "received"}>
                    <td>{i + 1}</td>
                    <td>{CommonServices.removeTime(p.setdate)}</td>
                    <td>{p.sender}</td>
                    <td>
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
            <Button color="primary" onClick={ViewDiscussionToggel}>Cancel</Button>
          </div>
        </ModalFooter>
      </Modal >

    </div >
  );
}

export default DiscardReport;


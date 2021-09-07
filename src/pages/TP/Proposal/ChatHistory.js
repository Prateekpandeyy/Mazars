import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ChatHistory({ chatHandler, addPaymentModal, qno }) {
  const [notification, setNotification] = useState([]);
  const userId = window.localStorage.getItem("tpkey");

  useEffect(() => {
    getNotification();
  }, [qno]);

  const getNotification = () => {
    axios
      .get(
        `${baseUrl}/customers/getNotification?id=${JSON.parse(
          userId
        )}&type=2&q_no=${qno}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setNotification(res.data.result);
        }
      });
  };

  console.log("notification", notification);

  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={chatHandler} size="md">
        <ModalHeader toggle={chatHandler}>Discussion history</ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="row">S.No</th>
                <th scope="row">Message</th>
                <th scope="row">Date</th>
              </tr>
            </thead>
            {notification.length > 0
              ? notification.map((p, i) => (
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{p.message}</td>
                      <td>{p.setdate}</td>
                    </tr>
                  </tbody>
                ))
              : null}
          </table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ChatHistory;

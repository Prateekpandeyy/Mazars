import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

function History({ history, toggle,modal, bgColor }) {
  //change date format
  function ChangeFormateDate(oldDate) {
   
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }
  return (
    <div>
      <Modal isOpen={modal} fade={false} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>History</ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th  style={{backgroundColor: "#42566a", color: "#fff", border: "1px solid #42566a"}}>S.No</th>
                <th   style={{backgroundColor: "#42566a", color: "#fff",  border: "1px solid #42566a"}}>From</th>
                <th   style={{backgroundColor: "#42566a", color: "#fff",  border: "1px solid #42566a"}}>To</th>
                <th   style={{backgroundColor: "#42566a", color: "#fff",  border: "1px solid #42566a"}}>Name</th>
                <th   style={{backgroundColor: "#42566a", color: "#fff",  border: "1px solid #42566a"}}>Email</th>
                <th   style={{backgroundColor: "#42566a", color: "#fff",  border: "1px solid #42566a"}}>Phone</th>
              </tr>
            </thead>

            {history.length > 0
              ? history.map((p, i) => (
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{p.from_date}</td>
                      <td>{p.to_date}</td>
                      <td>{p.name}</td>
                      <td>{p.personal_email}</td>
                      <td>{p.phone}</td>
                    </tr>
                  </tbody>
                ))
              : null}
          </table>
        </ModalBody>
        <ModalFooter>
          <button className="customBtn" onClick={toggle}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default History;

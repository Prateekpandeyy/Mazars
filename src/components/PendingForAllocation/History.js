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

function History({ history,toggle,modal }) {
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
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="row">S.No</th>
                <th scope="row">Name</th>
                <th scope="row">Query No</th>
                <th scope="row">Status</th>
                <th scope="row">Date of Allocation</th>
                <th scope="row">Notes</th>
              </tr>
            </thead>

            {history.length > 0
              ? history.map((p, i) => (
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{p.name}</td>
                      <td>{p.assign_no}</td>
                      <td>{p.status}</td>
                      <td>{p.date_of_allocation}</td>
                      <td>{p.notes}</td>
                    </tr>
                  </tbody>
                ))
              : null}
          </table>
        </ModalBody>
        <ModalFooter>
          <button className= "autoWidthBtn" onClick={toggle}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default History;

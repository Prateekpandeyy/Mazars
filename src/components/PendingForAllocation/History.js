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
    // console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }
  return (
    <div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>History</ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
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
                      <td>{ChangeFormateDate(p.date_of_allocation)}</td>
                      <td>{p.notes}</td>
                    </tr>
                  </tbody>
                ))
              : null}
          </table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default History;

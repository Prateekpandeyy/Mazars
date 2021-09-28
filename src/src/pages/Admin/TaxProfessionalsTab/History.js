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
                <th scope="row">From</th>
                <th scope="row">To</th>
                <th scope="row">Name</th>
                <th scope="row">Email</th>
                <th scope="row">Phone</th>
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
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default History;

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

function CustHistory({ history, toggle,modal }) {
  //change date format
  function ChangeFormateDate(oldDate) {
    // console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }
console.log("history", history)
  return (
    <div>
       <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>Customer Details</ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            {/* <thead>
              <tr>
               
                <th scope="row">Query Raised</th>
                <th scope="row">Query Completed</th>
                
                <th scope="row">Query Inprogress</th>
                <th scope="row">Query Declined</th>
              </tr>
            </thead> */}

            {history != undefined 
              ? 
                  <tbody>
                      <tr>
                      <th scope="row">Query Raised</th>
                      <td>{history.total}</td>
                      </tr>
                      <tr>
                      <th scope="row">Query Completed</th>
                     <td>{history.inprogress_queries}</td>
                     </tr>
                     <tr>
                     <th scope="row">Query Inprogress</th>
                     <td>{history.complete_query}</td>
                     </tr>
                     <tr>
                     <th scope="row">Query Declined</th>
                     <td>{history.declined_queries}</td>
                    </tr>
                  </tbody>
                
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

export default CustHistory;

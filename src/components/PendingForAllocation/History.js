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
import CustomHeading from "../Common/CustomHeading";
import CustomTypography from "../Common/CustomTypography";
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
        <ModalHeader toggle={toggle}>
          <CustomHeading>
          History
          </CustomHeading>
        </ModalHeader>
        <ModalBody>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="row">S.No</th>
                <th scope="row">Name</th>
                <th scope="row">Query No</th>
                <th scope="row">Status</th>
                <th scope="row">Date of allocation</th>
                <th scope="row">Notes</th>
              </tr>
            </thead>

            {history.length > 0
              ? history.map((p, i) => (
                  <tbody>
                    <tr>
                      
                      <td>
                      <CustomTypography>
                      {i + 1}
                        </CustomTypography></td>
                      <td>
                        <CustomTypography>
                        {p.name}
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                        {p.assign_no}
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                        {p.status}
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                        {p.date_of_allocation}
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                        {p.notes}
                        </CustomTypography>
                      </td>
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

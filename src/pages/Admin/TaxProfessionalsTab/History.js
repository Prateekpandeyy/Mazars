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
import CustomHeading from "../../../components/Common/CustomHeading";
import CustomTypography from "../../../components/Common/CustomTypography";
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
                <th  style={{backgroundColor: "#42566a", color: "#fff", border: "1px solid #42566a"}}>S.No</th>
                <th  style={{backgroundColor: "#42566a", color: "#fff", border: "1px solid #42566a"}}>From</th>
                <th  style={{backgroundColor: "#42566a", color: "#fff", border: "1px solid #42566a"}}>To</th>
                <th  style={{backgroundColor: "#42566a", color: "#fff", border: "1px solid #42566a"}}>Name</th>
                <th  style={{backgroundColor: "#42566a", color: "#fff", border: "1px solid #42566a"}}>Email</th>
                <th  style={{backgroundColor: "#42566a", color: "#fff", border: "1px solid #42566a"}}>Phone</th>
              </tr>
            </thead>

            {history.length > 0
              ? history.map((p, i) => (
                  <tbody>
                      <tr>
                      <td>
                        <CustomTypography>
                        {i + 1}
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                        {p.from_date}
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                        {p.to_date}
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                        {p.name}
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                        {p.personal_email}
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                        {p.phone}
                        </CustomTypography>
                      </td>
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

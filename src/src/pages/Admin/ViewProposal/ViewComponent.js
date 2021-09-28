import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CommonServices from "../../../common/common";


function ViewComponent({ viewModal, ViewHandler, getProposalData, viewData }) {

  console.log("viewData", viewData)
  return (
    <div>
      <Modal isOpen={viewModal} toggle={ViewHandler} size="md">
        <ModalHeader toggle={ViewHandler}>View Proposal</ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">Query No</th>
                <td>{viewData.assign_no}</td>
              </tr>
              <tr>
                <th scope="row">Name of Team Leader</th>
                <td>{viewData.tl_name}</td>
              </tr>
              <tr>
                <th scope="row">Date of Allocation</th>
                <td>{CommonServices.removeTime(viewData.DateofProposal)}</td>
              </tr>
              <tr>
                <th scope="row">Proposed Amount</th>
                <td>{viewData.ProposedAmount}</td>
              </tr>
              <tr>
                <th scope="row">Status</th>
                <td>
                  {
                    viewData.status == "Inprogress" ?
                      <div>
                        {viewData.status}/
                        <p className="inprogress">
                          {viewData.statusdescription}
                        </p>
                      </div>
                      :
                      viewData.status == "Declined; Proposal" ?
                        <div>
                          {viewData.status}
                          <p className="declined">
                            {viewData.statusdescription}
                          </p>
                        </div> :
                        viewData.status == "Accepted; Proposal" ?
                          <div>
                            {viewData.status}
                            <p className=".completed{">
                              {viewData.statusdescription}
                            </p>
                          </div> :
                          null
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ViewComponent;

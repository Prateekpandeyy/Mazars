import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { Typography } from "@material-ui/core";
import classNames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "reactstrap";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Swal from "sweetalert2";
const RetviewModal = ({
    retview,
    retviewProposal,
    getProposalData,
    assignNo
}) => {
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem("adminkey")
    const Schema = yup.object().shape({
        p_reason: yup.string().required(""),
      });
      
    const { handleSubmit, register, reset, errors } = useForm({
        resolver: yupResolver(Schema),
      });
      const onSubmit = (value) => {
          setLoading(true)
        let formData = new FormData();
        formData.append("uid", JSON.parse(userId));
        formData.append("qid", assignNo);
        formData.append("notes", value.p_reason);
    
        axios({
          method: "POST",
          url: `${baseUrl}/admin/reactiveProposal`,
          data: formData,
        })
      .then((response) => {
         if(response.data.code === 1){
             setLoading(false)

             retviewProposal()
             getProposalData()
             Swal.fire({
                 "title" : "success",
                 "html" : "Proposal restored successfully",
                 "icon" : "success"
             })
         }
         else{
             setLoading(false)
             retviewProposal()
             getProposalData()
             Swal.fire({
                 "title" : "error",
                 "html" : "something went wrong , please try again",
                 "icon" :"error"
             })
         }
      })
    }
    return(
        <Modal isOpen={retview} toggle={retviewProposal}>
            <ModalHeader toggle={retviewProposal }>
<Typography variant="h6">
    Please provide the reason
</Typography>
            </ModalHeader>
            <ModalBody>
  <form onSubmit={handleSubmit(onSubmit)}>
 <div className="mb-3">
<textarea
  className={classNames("form-control", {
    "is-invalid": errors.p_reason,
  })}
name="p_reason" 
id="textarea"
ref={register}
placeholder="Enter text here..."
rows="6">
</textarea>
</div>
<div className="modal-footer">
              {
                loading ?
                  <Spinner color="primary" />
                  :
                  <button type="submit" className = "autoWidthBtn">
                    Submit
                  </button>
              }
            </div>
</form>

            </ModalBody>
           
        </Modal>
    )

}
export default RetviewModal;
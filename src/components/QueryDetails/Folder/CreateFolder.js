import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import CustomHeading from "../../Common/CustomHeading";
import classNames from "classnames";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Swal from "sweetalert2";
import Select from "react-select";
function CreateFolder({
  addPaymentModal,
  rejectHandler,
  id,
  getList,
  tab,
  movedFolder,
  set_sub_folder,
  setColor,
}) {
  const { handleSubmit, getValue, register, errors } = useForm();
  const [root2, setRoot2] = useState([
    {
      label: "...root",
      value: "0",
    },
  ]);
  const [folderid, setFolderId] = useState({
    label: "...root",
    value: "0",
  });
  useEffect(() => {
    console.log("movedFolder", movedFolder);
  }, [movedFolder]);
  const onSumbit = (value) => {
    let suburl = "createqfolder";
    if (tab === "assignment") {
      suburl = "createqfolderreport";
    } else {
      suburl = "createqfolder";
    }
    let formData = new FormData();
    formData.append("folder", value.p_name);
    formData.append("q_id", id);
    formData.append("folder_id", folderid.value);
    axios({
      method: "POST",
      url: `${baseUrl}/tl/${suburl}`,
      headers: {
        uit: localStorage.getItem("tlToken"),
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        rejectHandler();
        setFolderId("");
        set_sub_folder([]);
        setColor(0);
        getList();
        Swal.fire({
          title: "success",
          html: "Folder created successfullly",
          icon: "success",
        });
      } else if (res.data.code === 0) {
        setFolderId("");
        Swal.fire({
          title: "error",
          html: "Something went wrong, please try again",
          icon: "error",
        });
      }
    });
  };

  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={rejectHandler} size="md">
        <ModalHeader toggle={rejectHandler}>
          <CustomHeading>Create folder</CustomHeading>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSumbit)}>
            <div className="row">
              <div className="col-md-12">
                <label>Please select folder</label>
                <Select
                  onChange={(e) => setFolderId(e)}
                  value={folderid}
                  options={movedFolder}
                ></Select>
              </div>
              <div className="col-md-12">
                <label>Folder name</label>
                <input
                  name="p_name"
                  className={classNames("form-control", {
                    "is-invalid": errors.p_name,
                  })}
                  ref={register({ required: true })}
                  type="text"
                />
              </div>
            </div>
            <ModalFooter>
              <button className="autoWidthBtn mr-auto">Submit </button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CreateFolder;

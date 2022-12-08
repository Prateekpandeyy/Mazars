import React from "react";
import CustomTypography from "../Common/CustomTypography";
import Popup from "reactjs-popup";
const FolderRename = (props) => {
  return (
    <>
      {props.rename !== props.folderName ? (
        <span
          className="folderLabel"
          onDoubleClick={(e) => props.setRename(props.folderName)}
        >
          <CustomTypography>{props.folderName}</CustomTypography>
        </span>
      ) : (
        <div>
          <Popup open={true} onClose={props.closeModal} position="right center">
            <div className="renameBtn">
              <input
                placeholder="Please enter folder name"
                defaultValue={props.folderName}
                onChange={(e) => props.setRenameValue(e.target.value)}
                className="form-control my-2"
                type="text"
              />
              <button
                onClick={(e) => props.renameFolder(props.folderData, "0")}
                className="customBtn"
              >
                Rename
              </button>
            </div>
          </Popup>
        </div>
      )}
    </>
  );
};
export default FolderRename;

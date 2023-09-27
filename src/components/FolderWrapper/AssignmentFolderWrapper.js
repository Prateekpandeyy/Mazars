import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import CustomTypography from "../Common/CustomTypography";
import { FileIcon } from "../Common/MessageIcon";
import FolderRename from "./FolderRename";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { DeleteIcon } from "../Common/MessageIcon";
import Swal from "sweetalert2";
const AssignmentFolderWrapper = (props) => {
  const [show, setShow] = useState(true);
  const deleteFile = (e) => {
    console.log("eee", e);
    let formData = new FormData();
    formData.append("assign_no", e.assign_no);
    formData.append("id", e.id);
    formData.append("document", e.document);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/deletereportdocument`,
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        props.getFolerSubFile();
        Swal.fire({
          title: "success",
          html: "File deleted successfully",
          icon: "success",
        });
      }
      console.log("Response", res);
    });
  };
  return (
    <>
      <div className="myFolderWrapper">
        {props.isSubFolder === true ? (
          <div className="folderCreated">
            <FolderIcon
              onClick={(e) => props.getFolerSubFile()}
              sx={{ fontSize: "2.5rem" }}
              className="folderColor"
            />

            <span className="folderLabel">
              <CustomTypography>...</CustomTypography>
            </span>
          </div>
        ) : (
          <>
            {props?.folder?.map((i) => (
              <div className="folderCreated">
                <FolderIcon
                  sx={{ fontSize: "2.5rem" }}
                  onClick={(e) => props.getFolerSubFile(i)}
                  className={
                    props.color === Number(i.id)
                      ? "folderActive"
                      : "folderColor"
                  }
                />
                {props.panel === "tl" ? (
                  <span className="folderLabel">
                    <FolderRename
                      rename={props.rename}
                      setRename={props.setRename}
                      folderName={i.folder}
                      folderData={i}
                      setRenameValue={props.setRenameValue}
                      renameValue={props.renameValue}
                      closeModal={props.closeModal}
                      renameFolder={props.renameFolder}
                      basePath={props.basePath}
                    />
                  </span>
                ) : (
                  <span className="folderLabel">
                    <CustomTypography>{i.folder}</CustomTypography>
                  </span>
                )}
              </div>
            ))}
          </>
        )}
        {props?.file?.map((i) => (
          <>
            {props.basePath === true ? (
              <>
                {i.folder_id === "0" ? (
                  <div className="folderCreated">
                    <span
                      onContextMenu={(e) => props.moveTo(e, i, props.basePath)}
                      onDoubleClick={(e) =>
                        props.downloadFile(e, i.assign_no, i.id, i.document)
                      }
                    >
                      <span style={{ cursor: "pointer" }}>
                        <FileIcon
                          name={i.document}
                          sx={{ fontSize: "2.5rem", pointer: "cursor" }}
                        />
                      </span>
                      <span className="folderLabel">
                        <CustomTypography> {i.document}</CustomTypography>
                      </span>
                      {show === true ? (
                        <span onClick={(e) => deleteFile(i)}>
                          <DeleteIcon />
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {i.customer_files !== null &&
                i.customer_files_folder === "0" ? (
                  <div className="folderCreated">
                    <span
                      onContextMenu={(e) =>
                        props.moveTo(e, i, props.basePath, "clientFiles")
                      }
                      onDoubleClick={(e) =>
                        props.downloadFile(
                          e,
                          i.assign_no,
                          i.id,
                          i.customer_files
                        )
                      }
                    >
                      <span style={{ cursor: "pointer" }}>
                        <FileIcon
                          name={i.customer_files}
                          sx={{ fontSize: "2.5rem", pointer: "cursor" }}
                        />
                      </span>
                      <span className="folderLabel">
                        <CustomTypography> {i.customer_files}</CustomTypography>
                      </span>
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                {props.mainFolderId == i.folder_id ? (
                  <div className="folderCreated">
                    <span
                      onContextMenu={(e) => props.moveTo(e, i, props.basePath)}
                      onDoubleClick={(e) =>
                        props.downloadFile(e, i.assign_no, i.id, i.document)
                      }
                    >
                      <span style={{ cursor: "pointer" }}>
                        <FileIcon
                          name={i.document}
                          sx={{ fontSize: "2.5rem", pointer: "cursor" }}
                        />
                      </span>
                      <span className="folderLabel">
                        <CustomTypography> {i.document}</CustomTypography>
                      </span>
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {i.customer_files !== null &&
                props.mainFolderId == i.customer_files_folder ? (
                  <div className="folderCreated">
                    <span
                      onContextMenu={(e) =>
                        props.moveTo(e, i, props.basePath, "clientFiles")
                      }
                      onDoubleClick={(e) =>
                        props.downloadFile(
                          e,
                          i.assign_no,
                          i.id,
                          i.customer_files
                        )
                      }
                    >
                      <span style={{ cursor: "pointer" }}>
                        <FileIcon
                          name={i.customer_files}
                          sx={{ fontSize: "2.5rem", pointer: "cursor" }}
                        />
                      </span>
                      <span className="folderLabel">
                        <CustomTypography> {i.customer_files}</CustomTypography>
                      </span>
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        ))}
      </div>
    </>
  );
};
export default AssignmentFolderWrapper;

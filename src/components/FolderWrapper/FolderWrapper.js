import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import CustomTypography from "../Common/CustomTypography";
import { FileIcon } from "../Common/MessageIcon";
import FolderRename from "./FolderRename";
const FolderWrapper = (props) => {
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
                    props.color === i.id ? "folderActive" : "folderColor"
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
                        props.downloadFile(e, i.assign_no, i.id, i.name)
                      }
                    >
                      <FileIcon
                        name={i.name}
                        sx={{ fontSize: "2.5rem", pointer: "cursor" }}
                      />
                      <span className="folderLabel">
                        <CustomTypography> {i.name}</CustomTypography>
                      </span>
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              <div className="folderCreated">
                <span
                  onContextMenu={(e) => props.moveTo(e, i, props.basePath)}
                  onDoubleClick={(e) =>
                    props.downloadFile(e, i.assign_no, i.id, i.name)
                  }
                >
                  <FileIcon
                    name={i.name}
                    sx={{ fontSize: "2.5rem", pointer: "cursor" }}
                  />
                  <span className="folderLabel">
                    <CustomTypography> {i.name}</CustomTypography>
                  </span>
                </span>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};
export default FolderWrapper;

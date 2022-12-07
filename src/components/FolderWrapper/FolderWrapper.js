import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import CustomTypography from "../Common/CustomTypography";
import { FileIcon } from "../Common/MessageIcon";
const FolderWrapper = (props) => {
  console.log("innerFiles", props.file, props.isSubFolder);
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
            <CustomTypography>...</CustomTypography>
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
                <CustomTypography>{i.folder}</CustomTypography>
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
                      <CustomTypography> {i.name}</CustomTypography>
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
                  <CustomTypography> {i.name}</CustomTypography>
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

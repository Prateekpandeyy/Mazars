import React from "react";
import MainText from "../Common/MainText";
import CustomTypography from "../Common/CustomTypography";
const FolderBredcrumb = (props) => {
  return (
    <div className="folderDetailsWrapper">
      <div className="folderDetails">
        {props.mainFoldName.length > 0 && props.folderName.length > 0 ? (
          <div className="d-flex w-100 align-items-center">
            <span
              className="tabHover mx-1"
              onClick={() => {
                props.goBack();
              }}
            >
              <MainText>{props.mainFoldName}</MainText>
            </span>
            <CustomTypography>
              {`${props.folderName.length > 0 ? " > " : ""} ${
                props.folderName
              }`}
            </CustomTypography>
          </div>
        ) : (
          <>
            {props.mainFoldName.length > 0 || props.folderName.length > 0 ? (
              <div className="d-flex w-100 align-items-center">
                <span onClick={() => props.goBack()}>
                  <MainText>{`${props.mainFoldName}   `}</MainText>
                </span>
                <CustomTypography>
                  {props.folderName.length > 0 ? " > " : ""}
                  {props.folderName}
                </CustomTypography>
              </div>
            ) : (
              <MainText>Folder content</MainText>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default FolderBredcrumb;

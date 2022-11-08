import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FolderIcon from "@mui/icons-material/Folder";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import CustomHeading from "../../Common/CustomHeading";
import CreateFolder from "./CreateFolder";
import { styled, makeStyles } from "@material-ui/styles";
import { Box } from "@mui/material";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import ImageIcon from "@mui/icons-material/Image";
import ArticleIcon from "@mui/icons-material/Article";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Select from "react-select";
import "reactjs-popup/dist/index.css";

const FolderWrapper = styled(Box)({
  display: "flex",
  width: "50%",
  borderRight: "1px solid #ccc",
  alignItems: "flex-start",
  flexWrap: "wrap",
  margin: "0px 20px 0px 0px",
});

const FolderDetails = styled(Box)({
  display: "flex",
  width: "50%",

  alignItems: "flex-start",
  flexWrap: "wrap",
});
function ShowFolder({ addPaymentModal, rejectHandler, id }) {
  const [createFoldernew, setCreateFolder] = useState(false);
  const [folder, setFolder] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [color, setColor] = useState(0);
  const [move, setMove] = useState(false);
  const [movedFolder, setMovedFolder] = useState([]);
  const [files, setFiles] = useState([]);
  const [folderId, setFolderId] = useState([]);
  const uid = localStorage.getItem("tlkey");
  const token = window.localStorage.getItem("tlToken");

  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getList = () => {
    let kk = [];
    let movedFold = {};
    axios
      .get(
        `${baseUrl}/tl/queryfolderlist?q_id=${id}&uid=${JSON.parse(uid)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFolder(res.data.result);
          res.data.result.map((i) => {
            movedFold = {
              label: i.folder,
              value: i.id,
            };
            kk.push(movedFold);
          });
          setMovedFolder(kk);
        }
      });
  };
  useEffect(() => {
    getList();
  }, [id]);

  const getFolder = (e) => {
    setCreateFolder(!createFoldernew);
  };
  const onDrag = (e) => {};
  // get file with in folder
  const getFile = (e) => {
    setColor(e.id);

    axios
      .get(
        `${baseUrl}/tl/documentlistbyfolder?q_id=${id}&folder_id=${e.id}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFiles(res.data.result);
        }
      });
    setShowDetail(true);
  };
  const handleFile = (e) => {
    setMove(!move);
  };
  const mapIcon = (e) => {
    axios
      .get(
        `${baseUrl}/tl/ArticleIcon?q_id=${id}&folder_id=${folderId.value}&file_id=1`,
        myConfig
      )
      .then((res) => {
        console.log("response", res);
      });
  };
  console.log(folderId);
  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={rejectHandler} size="xl">
        <ModalHeader toggle={rejectHandler}>
          <div className="d-flex w-100 justify-content-between">
            <CustomHeading>Folder</CustomHeading>
            <button className="autoWidthBtn" onClick={(e) => getFolder()}>
              {" "}
              <CreateNewFolderIcon style={{ margin: "0px 5px" }} /> Create
              folder
            </button>
          </div>
        </ModalHeader>
        <ModalBody style={{ display: "flex" }}>
          <FolderWrapper>
            {folder.map((i) => (
              <div className="folderCreated">
                {color === i.id ? (
                  <FolderIcon
                    onClick={(e) => getFile(i)}
                    style={{
                      fontSize: "50px",
                      color: "#0000ff",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <FolderIcon
                    onClick={(e) => getFile(i)}
                    style={{
                      fontSize: "50px",
                      color: "#fccc77",
                      cursor: "pointer",
                    }}
                  />
                )}
                <span
                  style={{ textAlign: "center", whiteSpace: "break-spaces" }}
                >
                  {i.folder}{" "}
                </span>
              </div>
            ))}
          </FolderWrapper>
          {showDetail === true ? (
            <FolderDetails>
              <div className="folderDetails">
                <ArticleIcon
                  onClick={(e) => handleFile(e)}
                  style={{
                    fontSize: "50px",
                    color: "#fccc77",
                    cursor: "pointer",
                  }}
                />
                <span>Test</span>
              </div>

              <div className="folderDetails">
                <ArticleIcon style={{ fontSize: "50px", cursor: "pointer" }} />{" "}
                <span>RAtee</span>
              </div>
              <div className="folderDetails">
                <ImageIcon style={{ fontSize: "50px", cursor: "pointer" }} />{" "}
                <span>RAtee</span>
              </div>
              <div className="folderDetails">
                <AudioFileIcon
                  style={{ fontSize: "50px", cursor: "pointer" }}
                />{" "}
                <span>RAtee</span>
              </div>
            </FolderDetails>
          ) : (
            ""
          )}
        </ModalBody>
      </Modal>
      <CreateFolder
        addPaymentModal={createFoldernew}
        id={id}
        getList={getList}
        rejectHandler={getFolder}
      />
      {move === true ? (
        <Modal isOpen={move} toggle={handleFile} size="xs">
          <ModalHeader toggle={handleFile}>Select</ModalHeader>
          <ModalBody>
            <Select
              onChange={(e) => setFolderId(e)}
              options={movedFolder}
            ></Select>
            <button
              type="button"
              onClick={(e) => mapIcon(e)}
              className="autoWidthBtn my-2"
            >
              Submit
            </button>
          </ModalBody>
        </Modal>
      ) : (
        " "
      )}
    </div>
  );
}

export default ShowFolder;

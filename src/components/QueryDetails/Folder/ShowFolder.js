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
import Swal from "sweetalert2";
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
  const [fileId, setFileId] = useState("");
  const [innerFiles, setInnerFiles] = useState([]);
  const uid = localStorage.getItem("tlkey");
  const token = window.localStorage.getItem("tlToken");

  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getFile = () => {
    axios
      .get(
        `${baseUrl}/tl/documentlistbyfolder?q_id=${id}&uid=${JSON.parse(uid)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFiles(res.data.result);
        }
      });
  };
  const showFolder = () => {
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
    showFolder();
    getFile();
  }, [id]);

  const getFolder = (e) => {
    setCreateFolder(!createFoldernew);
  };
  const handleFile = (e) => {
    if (e) {
      setFileId(e.id);
      setMove(!move);
    } else {
      setMove(!move);
    }
  };
  const mapIcon = (e) => {
    axios
      .get(
        `${baseUrl}/tl/folderfile?q_id=${id}&folder_id=${folderId.value}&file_id=${fileId}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          handleFile();
          showFolder();
          getFile();
          setInnerFiles([]);
          setColor(0);
          Swal.fire({
            title: "success",
            html: "File transfered successfully",
            icons: "success",
          });
        } else if (res.data.code === 0) {
          Swal.fire({
            title: "error",
            html: "Something went wrong, please try again",
            icons: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "error",
          html: error,
          icons: "error",
        });
      });
  };
  const getInnerFileFile = (e) => {
    axios
      .get(
        `${baseUrl}/tl/documentlistbyfolder?q_id=${id}&folder_id=${
          e.id
        }&uid=${JSON.parse(uid)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setColor(e.id);
          setInnerFiles(res.data.result);
        }
      });
  };
  return (
    <div>
      <Modal
        isOpen={addPaymentModal}
        toggle={rejectHandler}
        size="lg"
        scrollable
      >
        <ModalHeader toggle={rejectHandler}>
          <div className="d-flex w-100 justify-content-between">
            <CustomHeading>Document</CustomHeading>
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
                    onClick={(e) => getInnerFileFile(i)}
                    style={{
                      fontSize: "50px",
                      color: "#0000ff",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <FolderIcon
                    onClick={(e) => getInnerFileFile(i)}
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
            {files.map((i) => (
              <>
                {i.folder_id === "0" ? (
                  <div className="folderCreated">
                    <ArticleIcon
                      onClick={(e) => handleFile(i)}
                      style={{
                        fontSize: "50px",
                        color: "#0000ff",
                        cursor: "pointer",
                      }}
                    />
                    <span
                      style={{
                        textAlign: "center",
                        whiteSpace: "break-spaces",
                      }}
                    >
                      {i.name}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </>
            ))}
          </FolderWrapper>

          <FolderDetails>
            <div className="folderDetails d-flex">
              {innerFiles.map((i) => (
                <>
                  <div className="folderCreated">
                    <ArticleIcon
                      onClick={(e) => handleFile(i)}
                      style={{
                        fontSize: "50px",
                        color: "#0000ff",
                        cursor: "pointer",
                      }}
                    />
                    <span
                      style={{
                        textAlign: "center",
                        whiteSpace: "break-spaces",
                      }}
                    >
                      {i.name}
                    </span>
                  </div>
                </>
              ))}
            </div>
          </FolderDetails>
        </ModalBody>
      </Modal>
      <CreateFolder
        addPaymentModal={createFoldernew}
        id={id}
        getList={showFolder}
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

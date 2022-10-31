import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FolderIcon from '@mui/icons-material/Folder';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CustomHeading from '../../Common/CustomHeading';
import CreateFolder from "./CreateFolder";
import { styled , makeStyles} from "@material-ui/styles";
import { Box } from "@mui/material";
import AudioFileIcon from '@mui/icons-material/AudioFile';
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
const FolderWrapper = styled(Box)({
    display : "flex",
    width : "100%",
    justifyContent : "space-between",
    alignItems : "center",
    flexWrap : "wrap"
})
function ShowFolder({
    addPaymentModal,
    rejectHandler,
    id
   
  }) {
    const [createFoldernew, setCreateFolder] = useState(false)
  const getFolder = (e) => {
    setCreateFolder(!createFoldernew)
  }
    return (
      <div>
        <Modal isOpen={addPaymentModal} toggle={rejectHandler} size="xl">
          <ModalHeader toggle={rejectHandler}>
          <div className="d-flex w-100 justify-content-between">
          <CustomHeading>
           Folder
            </CustomHeading>
            <button className="autoWidthBtn" onClick={(e) => getFolder()}> <CreateNewFolderIcon style={{margin : "0px 5px"}} /> Create folder</button>
          </div>
          </ModalHeader>
          <ModalBody>
<FolderWrapper>
<div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <FolderIcon style={{fontSize : "50px", color : "#fccc77", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <ArticleIcon style={{fontSize : "50px", cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <ImageIcon style={{fontSize : "50px",  cursor : "pointer"}} /> <span>RAtee</span>
           </div>
           <div className="folderCreated">
           <AudioFileIcon style={{fontSize : "50px",  cursor : "pointer"}} /> <span>RAtee</span>
           </div>
</FolderWrapper>
    
          </ModalBody>
        </Modal>
        <CreateFolder 
        addPaymentModal = {createFoldernew}
        id = {id}
        rejectHandler = {getFolder} />
      </div>
    );
  }
  
export default ShowFolder;
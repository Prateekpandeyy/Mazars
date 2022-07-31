// import React from 'react';
// import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
// import { baseUrl } from "../../config/config";
// import { Typography } from '@mui/material';
// const ShowProposal = ({setViewProposal, viewProposalModal, showProposalModal2 , proposalId}) => {
  
//     return(
       
//         <>
       
//           <Modal isOpen={viewProposalModal} toggle={showProposalModal2} size="lg" scrollable={true} style={{ height: "100%" }} >
//             <ModalHeader toggle={showProposalModal2}>
// <Typography variant="h6">
// View Proposal
// </Typography>
//             </ModalHeader>
//             <ModalBody>
//           <iframe src={`${baseUrl}/customers/dounloadpdf?id=${proposalId}&viewpdf=1`}
//             height="100%" width="100%" />
//         </ModalBody>
           
//         </Modal>
       
       
//         </>
//     )
// }
// export default ShowProposal;
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { baseUrl } from "../../config/config";
import axios from "axios";
import { Typography } from '@mui/material';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
function ShowProposal({setViewProposal, panel, viewProposalModal, showProposalModal2 , proposalId}) {
  const [url, setUrl] = useState("")
 
useEffect(() => {
  if(proposalId && panel === "admin"){
   
    const token = window.localStorage.getItem("adminToken")
    const myConfig = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
    axios.get(`${baseUrl}/admin/dounloadpdf?id=${proposalId}&viewpdf=1` , myConfig)
  .then((res) => {
   
    if(res.status === 200){
   
     var url2 = window.URL.createObjectURL(res.data);
     console.log("response", url2)
      setUrl(window.URL.createObjectURL(res.data))
    }
  })
  }
  else if(proposalId && panel === "teamleader"){
    const token = window.localStorage.getItem("tlToken")
    const myConfig = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
    axios.get(`${baseUrl}/tl/dounloadpdf?id=${proposalId}&viewpdf=1` , myConfig)
  .then((res) => {
   
    if(res.status === 200){
     
      setUrl(URL.createObjectURL(res.data))
    }
  })
  }
  else if (proposalId && panel === "taxprofessional") {
   
      const token = window.localStorage.getItem("tptoken")
      const myConfig = {
        headers : {
         "uit" : token
        },
        responseType: 'blob'
      }
      axios.get(`${baseUrl}/tl/dounloadpdf?id=${proposalId}&viewpdf=1` , myConfig)
    .then((res) => {
     
      if(res.status === 200){
       
        setUrl(URL.createObjectURL(res.data))
      }
    })
    
  }
  else{
    const token = window.localStorage.getItem("clientToken")
    const myConfig = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
    axios.get(`${baseUrl}/customers/dounloadpdf?id=${proposalId}&viewpdf=1` , myConfig)
  .then((res) => {
   
    if(res.status === 200){
     
      setUrl(URL.createObjectURL(res.data))
    }
  })
  }
  
}, [proposalId])
console.log("url", url)
  return (
    
      <Modal isOpen={viewProposalModal} toggle={showProposalModal2} size="lg" scrollable={true} style={{ height: "100%", zIndex : 99999 }}>
      <ModalHeader toggle={showProposalModal2}>
 <Typography variant="h6">
 View Proposal
 </Typography>
             </ModalHeader>
        <ModalBody>
        {/* <div style={{display : "flex", maxHeight : "100vh", overflow : "auto"}}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
    <Viewer fileUrl={`${url}`}>
      </Viewer>
      </Worker>
      </div> */}
      
          <iframe src={url}
            height="100%" width="100%" style= {{width : "100%", height : "100%", overflow : "auto"}} />
        </ModalBody>
        

      </Modal>
   
  );
}

export default ShowProposal;

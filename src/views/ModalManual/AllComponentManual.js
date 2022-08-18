import React , {useState} from 'react';
import Query from './Query';
import QueryProcessing  from './QueryProcessing';
import Proposal from './Proposal';
import Assignment from './Assignment';
import Payment from './Payment';
import Scheduler from './Scheduler';
import Feedback from './Feedback';
import Content from './Content';
import Login from './Login';
import { Container } from '@material-ui/core';
import { useEffect } from 'react';
import MyPDF from '../ManualImg/manual.pdf';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import QueryPdf from "../dFile/query.pdf";
import proposalPdf from "../dFile/proposal.pdf";
import paymentPdf from "../dFile/payment.pdf";
import assignmentPdf from "../dFile/assignment.pdf";
import schedulePdf from "../dFile/schedule.pdf";
import feedbackPdf from "../dFile/feedback.pdf";
const AllComponentManual = (tar) => {
   const [filepath, setFilepath] = useState("")
    const goToRow = (e) => {
     
const anchor = document.getElementById(e.tar)
      console.log(anchor)
     if(anchor){
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
     }
     
}
console.log("mypdf url", MyPDF + "#page=4")
useEffect(() => {
    goToRow(tar)
}, [])
console.log("tar", tar.tar)
return(
    <>

<div style={{display : "flex", height : "80vh", overflow : "auto", fontSize : "#fff"}}>
<Container maxWidth = "xl">

<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
    {
        tar.tar == "freshQuery" ?
        <Viewer fileUrl={`${QueryPdf}`}>
        </Viewer> 
        : ""
        
    }
   
      {
          tar.tar == "proposalProcessing" ?
          <Viewer fileUrl={`${proposalPdf}`}>
        </Viewer> 
        : ""
      }
      {
          tar.tar == "paymentProcess" ?
          <Viewer fileUrl={`${paymentPdf}`}>
          </Viewer> 
          : ""
        }
              {
          tar.tar == "assignProcess" ?
          <Viewer fileUrl={`${assignmentPdf}`}>
          </Viewer> 
          : ""
        }
           {
          tar.tar == "schedule" ?
          <Viewer fileUrl={`${schedulePdf}`}>
          </Viewer> 
          : ""
        }
         {
          tar.tar == "feedback" ?
          <Viewer fileUrl={`${feedbackPdf}`}>
          </Viewer> 
          : ""
        }
      </Worker>
</Container>
</div>

</>
)
}
export default AllComponentManual;
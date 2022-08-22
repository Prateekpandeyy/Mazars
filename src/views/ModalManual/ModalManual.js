import React from 'react';
import Layout from "../../components/Layout/Layout";
import Query from './Query';
import QueryProcessing  from './QueryProcessing';
import Proposal from './Proposal';
import Assignment from './Assignment';
import Payment from './Payment';
import Scheduler from './Scheduler';
import Feedback from './Feedback';
import Content from './Content';
import Login from './Login';
import finalPdf from '../dFile/final_manual.pdf';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
const ModalManual = ()  => {
    const userId = window.localStorage.getItem("userid");
  
    return(
        <Layout custDashboard="custDashboard" custUserId={userId}>   
      <>
   
 <div style={{
    display: "flex",
    flexDirection : "column",
    maxWidth : "1920px", 
    width:"100%",
    height: "600px",
    overflow: "auto"}}>
          <span className='downloadManual'>
     <a href={finalPdf} className="autoWidthBtn" target="_blank"> 
                 Download Manual</a>
     </span>
 <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <Viewer fileUrl={`${finalPdf}`}>
        </Viewer> 
      
    </Worker>
 </div>
                           

                       </>
            
        </Layout>
    )

}
export default ModalManual;
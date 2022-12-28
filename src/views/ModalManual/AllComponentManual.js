import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { useEffect } from "react";
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import QueryPdf from "../dFile/query.pdf";
import proposalPdf from "../dFile/proposal.pdf";
import paymentPdf from "../dFile/payment.pdf";
import assignmentPdf from "../dFile/assignment.pdf";
import schedulePdf from "../dFile/schedule.pdf";
import feedbackPdf from "../dFile/feedback.pdf";
const AllComponentManual = (tar) => {
  const goToRow = (e) => {
    const anchor = document.getElementById(e.tar);

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    goToRow(tar);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "80vh",
          overflow: "auto",
          fontSize: "#fff",
        }}
      >
        <Container maxWidth="xl">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            {tar.tar == "freshQuery" ? (
              <Viewer fileUrl={`${QueryPdf}`}></Viewer>
            ) : (
              ""
            )}

            {tar.tar == "proposalProcessing" ? (
              <Viewer fileUrl={`${proposalPdf}`}></Viewer>
            ) : (
              ""
            )}
            {tar.tar == "paymentProcess" ? (
              <Viewer fileUrl={`${paymentPdf}`}></Viewer>
            ) : (
              ""
            )}
            {tar.tar == "assignProcess" ? (
              <Viewer fileUrl={`${assignmentPdf}`}></Viewer>
            ) : (
              ""
            )}
            {tar.tar == "schedule" ? (
              <Viewer fileUrl={`${schedulePdf}`}></Viewer>
            ) : (
              ""
            )}
            {tar.tar == "feedback" ? (
              <Viewer fileUrl={`${feedbackPdf}`}></Viewer>
            ) : (
              ""
            )}
          </Worker>
        </Container>
      </div>
    </>
  );
};
export default AllComponentManual;

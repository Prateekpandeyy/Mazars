import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { baseUrl } from "../../config/config";
import axios from "axios";
import { Typography } from "@mui/material";
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
function ShowProposal({
  setViewProposal,
  panel,
  viewProposalModal,
  showProposalModal2,
  proposalId,
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (proposalId && panel === "admin") {
      const token = window.localStorage.getItem("adminToken");
      const myConfig = {
        headers: {
          uit: token,
        },
        responseType: "blob",
      };
      axios
        .get(
          `${baseUrl}/admin/dounloadpdf?id=${proposalId}&viewpdf=1`,
          myConfig
        )
        .then((res) => {
          if (res.status === 200) {
            window.URL = window.URL || window.webkitURL;
            var url = window.URL.createObjectURL(res.data);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = `Proposal.pdf`;
            a.target = "_blank";
            a.click();
            document.body.removeChild(a);
          }
        });
    } else if (proposalId && panel === "teamleader") {
      const token = window.localStorage.getItem("tlToken");
      const myConfig = {
        headers: {
          uit: token,
        },
        responseType: "blob",
      };
      axios
        .get(`${baseUrl}/tl/dounloadpdf?id=${proposalId}&viewpdf=1`, myConfig)
        .then((res) => {
          if (res.status === 200) {
            window.URL = window.URL || window.webkitURL;
            var url = window.URL.createObjectURL(res.data);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = `Proposal.pdf`;
            a.target = "_blank";
            a.click();
            document.body.removeChild(a);
          }
        });
    } else if (proposalId && panel === "taxprofessional") {
      const token = window.localStorage.getItem("tptoken");
      const myConfig = {
        headers: {
          uit: token,
        },
        responseType: "blob",
      };
      axios
        .get(`${baseUrl}/tl/dounloadpdf?id=${proposalId}&viewpdf=1`, myConfig)
        .then((res) => {
          if (res.status === 200) {
            window.URL = window.URL || window.webkitURL;
            var url = window.URL.createObjectURL(res.data);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = `Proposal.pdf`;
            a.target = "_blank";
            a.click();
            document.body.removeChild(a);
          }
        });
    } else {
      const token = window.localStorage.getItem("clientToken");
      const myConfig = {
        headers: {
          uit: token,
        },
        responseType: "blob",
      };

      axios
        .get(
          `${baseUrl}/customers/dounloadpdf?id=${proposalId}&viewpdf=1`,
          myConfig
        )
        .then((res) => {
          if (res.status === 200) {
            window.URL = window.URL || window.webkitURL;
            var url = window.URL.createObjectURL(res.data);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = `invoice_1.pdf`;
            a.target = "_blank";
            a.click();
          }
        });
    }
  }, [proposalId]);

  return <></>;
}

export default ShowProposal;

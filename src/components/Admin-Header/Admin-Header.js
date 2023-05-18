import React from "react";
import "../../assets/css/style.css";
import { Link, useHistory } from "react-router-dom";
import NavWrapper from "./NavWrapper";
import axios from "axios";
import { baseUrl } from "../../config/config";

function AdminHeader({
  custUserId,
  adminUserId,
  TLuserId,
  TPuserId,
  cmsDashboard,
  feedbackNumber,
}) {
  let history = useHistory();

  const custLogout = () => {
    const token = window.localStorage.getItem("clientToken");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    axios.get(`${baseUrl}/customers/logout`, myConfig).then((res) => {
      localStorage.removeItem("userid");
      localStorage.removeItem("custEmail");
      localStorage.removeItem("category");
      localStorage.removeItem("clientToken");
      localStorage.removeItem("custArrowMsg");
      localStorage.removeItem("prevcustmsg");
      localStorage.removeItem("custMessage");
      localStorage.removeItem("freezecustMsg");
      localStorage.removeItem("custQuery1");
      localStorage.removeItem("custQuery2");
      localStorage.removeItem("custQuery3");
      localStorage.removeItem("custQuery4");
      localStorage.removeItem(`freezecustQuery1`);
      localStorage.removeItem(`freezecustQuery2`);
      localStorage.removeItem(`freezecustQuery3`);
      localStorage.removeItem(`freezecustQuery4`);
      localStorage.removeItem("custArrowQuery1");
      localStorage.removeItem("prevcustq1");
      localStorage.removeItem("searchDatacustQuery1");
      localStorage.removeItem("custArrowQuery2");
      localStorage.removeItem("prevcustq2");
      localStorage.removeItem("searchDatacustQuery2");
      localStorage.removeItem("custArrowQuery3");
      localStorage.removeItem("prevcustq3");
      localStorage.removeItem("searchDatacustQuery3");
      localStorage.removeItem("custArrowQuery4");
      localStorage.removeItem("prevcustq4");
      localStorage.removeItem("searchDatacustQuery4");
      localStorage.removeItem("searchDatacustProposal1");
      localStorage.removeItem("custProposal1");
      localStorage.removeItem(`freezecustProposal1`);
      localStorage.removeItem("custArrowProposal1");
      localStorage.removeItem("prevcustp1");
      localStorage.removeItem("searchDatacustProposal2");
      localStorage.removeItem("custProposal2");
      localStorage.removeItem(`freezecustProposal2`);
      localStorage.removeItem("custArrowProposal2");
      localStorage.removeItem("prevcustp2");
      localStorage.removeItem("searchDatacustProposal3");
      localStorage.removeItem("custProposal3");
      localStorage.removeItem(`freezecustProposal3`);
      localStorage.removeItem("custArrowProposal3");
      localStorage.removeItem("prevcustp3");
      localStorage.removeItem("searchDatacustProposal4");
      localStorage.removeItem("custProposal4");
      localStorage.removeItem(`freezecustProposal4`);
      localStorage.removeItem("custArrowProposal4");
      localStorage.removeItem("prevcustp4");
      localStorage.removeItem("searchDatacustPay1");
      localStorage.removeItem("custPay1");
      localStorage.removeItem(`freezecustPay1`);
      localStorage.removeItem("custArrowPay1");
      localStorage.removeItem("prevcustPay1");
      localStorage.removeItem("searchDatacustPay2");
      localStorage.removeItem("custPay2");
      localStorage.removeItem(`freezecustPay2`);
      localStorage.removeItem("custArrowPay2");
      localStorage.removeItem("prevcustPay2");
      localStorage.removeItem("searchDatacustPay3");
      localStorage.removeItem("custPay3");
      localStorage.removeItem(`freezecustPay3`);
      localStorage.removeItem("custArrowPay3");
      localStorage.removeItem("prevcustPay3");
      localStorage.removeItem("searchDatacustAs1")
      localStorage.removeItem("custAs1");
      localStorage.removeItem(`freezecustAs1`);
      localStorage.removeItem("custArrowAs1");
      localStorage.removeItem("prevcustAs1");
      localStorage.removeItem("searchDatacustAs2")
      localStorage.removeItem("custAs2");
      localStorage.removeItem(`freezecustAs2`);
      localStorage.removeItem("custArrowAs2");
      localStorage.removeItem("prevcustAs2");
      localStorage.removeItem("searchDatacustAs3")
      localStorage.removeItem("custAs3");
      localStorage.removeItem(`freezecustAs3`);
      localStorage.removeItem("custArrowAs3");
      localStorage.removeItem("prevcustAs3");
      localStorage.removeItem("searchDatacustAs4")
      localStorage.removeItem("custAs4");
      localStorage.removeItem(`freezecustAs4`);
      localStorage.removeItem("custArrowAs4");
      localStorage.removeItem("prevcustAs4");
      localStorage.removeItem("searchDatacustAs5")
      localStorage.removeItem("custAs5");
      localStorage.removeItem(`freezecustAs5`);
      localStorage.removeItem("custArrowAs5");
      localStorage.removeItem("prevcustAs5");
      history.push("/");
    });
  };

  const adminLogout = () => {
    const token = window.localStorage.getItem("adminToken");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    axios.get(`${baseUrl}/admin/logout`, myConfig).then((res) => {
      localStorage.removeItem("adminMessage");
      localStorage.removeItem("adminFeedback");
      localStorage.removeItem("cutomFilter");
      localStorage.removeItem("recordingData");
      localStorage.removeItem("prevassign1");
      localStorage.removeItem("prevassign2");
      localStorage.removeItem("prevassign3");
      localStorage.removeItem("prevassign4");
      localStorage.removeItem("prevpay1");
      localStorage.removeItem("prevpay2");
      localStorage.removeItem("prevpay3");
      localStorage.removeItem("previnv2");
      localStorage.removeItem("previnv1");
      localStorage.removeItem("prevro3");
      localStorage.removeItem("prevro4");
      localStorage.removeItem("prevro2");
      localStorage.removeItem("prevro3");
      localStorage.removeItem("prevro1");
      localStorage.removeItem("prevq4");
      localStorage.removeItem("prevq3");
      localStorage.removeItem("prevq2");
      localStorage.removeItem("prevq1");
      localStorage.removeItem("adminkey");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("category");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("searchDataadquery1");
      localStorage.removeItem("searchDataadquery2");
      localStorage.removeItem("searchDataadquery3");
      localStorage.removeItem("searchDataadquery4");
      localStorage.removeItem("searchDataadproposal1");
      localStorage.removeItem("searchDataadproposal2");
      localStorage.removeItem("searchDataadproposal3");
      localStorage.removeItem("searchDataadproposal4");
      localStorage.removeItem("searchDataadpayment1");
      localStorage.removeItem("searchDataadpayment2");
      localStorage.removeItem("searchDataadpayment3");
      localStorage.removeItem("searchDataadAssignment1");
      localStorage.removeItem("searchDataadAssignment2");
      localStorage.removeItem("searchDataadAssignment3");
      localStorage.removeItem("searchDataadAssignment4");
      localStorage.removeItem("admincreate");
      localStorage.removeItem("admingenerated");
      localStorage.removeItem("admin_record_per_page");
      localStorage.removeItem("adminqp1");
      localStorage.removeItem("adminqp2");
      localStorage.removeItem("adminqp3");
      localStorage.removeItem("adminqp4");
      localStorage.removeItem("adminprot1");
      localStorage.removeItem("adminprot2");
      localStorage.removeItem("adminprot3");
      localStorage.removeItem("adminprot4");
      localStorage.removeItem("adminpayt1");
      localStorage.removeItem("adminpayt2");
      localStorage.removeItem("adminpayt3");
      localStorage.removeItem("sortedValue1");
      localStorage.removeItem("sortedValue2");
      localStorage.removeItem("sortedValue3");
      localStorage.removeItem("sortedValue4");
      localStorage.removeItem("sortedValuepro1");
      localStorage.removeItem("sortedValuepro2");
      localStorage.removeItem("sortedValuepro3");
      localStorage.removeItem("sortedValuepro4");
      localStorage.removeItem("admininvt2");
      localStorage.removeItem("admininvt1");
      localStorage.removeItem("sortedValuevt1");
      localStorage.removeItem("sortedValuevt2");
      localStorage.removeItem("sortedValuepay1");
      localStorage.removeItem("sortedValuepay2");
      localStorage.removeItem("sortedValuepay3");
      localStorage.removeItem("sortedValueassign1");
      localStorage.removeItem("sortedValueassign2");
      localStorage.removeItem("sortedValueassign3");
      localStorage.removeItem("sortedValueassign4");
      localStorage.removeItem("accendq1");
      localStorage.removeItem("accendq2");
      localStorage.removeItem("accendq3");
      localStorage.removeItem("accendq4");
      localStorage.removeItem("accendpro1");
      localStorage.removeItem("accendpro2");
      localStorage.removeItem("accendpro3");
      localStorage.removeItem("accendpro4");
      localStorage.removeItem("accendcreated");
      localStorage.removeItem("accendgenerated");
      localStorage.removeItem("accendpay1");
      localStorage.removeItem("accendpay2");
      localStorage.removeItem("accendpay3");
      localStorage.removeItem("accendassign1");
      localStorage.removeItem("accendassign2");
      localStorage.removeItem("accendassign3");
      localStorage.removeItem("accendassign4");
      localStorage.removeItem("adminClient");
      localStorage.removeItem("accendClient");
      localStorage.removeItem("sortedValueclient");
      localStorage.removeItem("adminMessage");
      localStorage.removeItem("accendMessage");
      localStorage.removeItem("sortedMessage");
      localStorage.removeItem("sortedfeedback");
      localStorage.removeItem("adminFeedback");
      localStorage.removeItem("accendFeedback");

      axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        if (res.data.code === 1) {
          localStorage.removeItem("admincategoryData");
          let data = res.data.result;
          data.map((i) => {
            localStorage.removeItem(`admin${i.details}`);
          });
        }
      });
      history.push("/admin/login");
    });
  };

  const cmsLogout = () => {
    const token = window.localStorage.getItem("token");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    axios.get(`${baseUrl}/cms/logout`, myConfig).then((res) => {
      localStorage.removeItem("token");

      history.push("/cms/login");
    });
  };

  const tlLogout = () => {
    const token = window.localStorage.getItem("tlToken");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    axios.get(`${baseUrl}/tl/logout`, myConfig).then((res) => {
      localStorage.removeItem("tlkey");
      localStorage.removeItem("tlEmail");
      localStorage.removeItem("category");
      localStorage.removeItem("tlToken");
      localStorage.removeItem("searchDatatlquery1");
      localStorage.removeItem("searchDatatlquery2");
      localStorage.removeItem("searchDatatlquery3");
      localStorage.removeItem("searchDatatlquery4");
      localStorage.removeItem("searchDatatlproposal1");
      localStorage.removeItem("searchDatatlproposal2");
      localStorage.removeItem("searchDatatlproposal3");
      localStorage.removeItem("searchDatatlproposal4");
      localStorage.removeItem("searchDatatlpayment1");
      localStorage.removeItem("searchDatatlpayment2");
      localStorage.removeItem("searchDatatlpayment3");
      localStorage.removeItem("searchDatatlAssignment1");
      localStorage.removeItem("searchDatatlAssignment2");
      localStorage.removeItem("searchDatatlAssignment3");
      localStorage.removeItem("searchDatatlAssignment4");
      localStorage.removeItem("tlAssignment1");
      localStorage.removeItem("tlAssignment2");
      localStorage.removeItem("tlAssignment3");
      localStorage.removeItem("tlAssignment4");
      localStorage.removeItem("tlint1");
      localStorage.removeItem("tlint2");
      localStorage.removeItem("freezetlAssignment1");
      localStorage.removeItem("freezetlAssignment2");
      localStorage.removeItem("freezetlAssignment3");
      localStorage.removeItem("freezetlAssignment4");
      localStorage.removeItem("tlcreate");
      localStorage.removeItem("tlgenerated");
      localStorage.removeItem("tl_record_per_page");
      axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        if (res.data.code === 1) {
          localStorage.removeItem("tlcategoryData");
          let data = res.data.result;
          data.map((i) => {
            localStorage.removeItem(`tl${i.details}`);
          });
        }
      });
      history.push("/teamleader/login");
    });
  };

  const tpLogout = () => {
    const token = window.localStorage.getItem("tptoken");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    axios.get(`${baseUrl}/tp/logout`, myConfig).then((res) => {
      localStorage.removeItem("tpkey");
      localStorage.removeItem("tpEmail");
      localStorage.removeItem("category");
      localStorage.removeItem("tptoken");
      localStorage.removeItem("searchDatatpquery1");
      localStorage.removeItem("searchDatatpquery2");
      localStorage.removeItem("searchDatatpquery3");
      localStorage.removeItem("searchDatatpquery4");
      localStorage.removeItem("searchDatatpproposal1");
      localStorage.removeItem("searchDatatpproposal2");
      localStorage.removeItem("searchDatatpproposal3");
      localStorage.removeItem("searchDatatpproposal4");
      localStorage.removeItem("searchDatatppayment1");
      localStorage.removeItem("searchDatatppayment2");
      localStorage.removeItem("searchDatatppayment3");
      localStorage.removeItem("searchDatatpAssignment1");
      localStorage.removeItem("searchDatatpAssignment2");
      localStorage.removeItem("searchDatatpAssignment3");
      localStorage.removeItem("searchDatatpAssignment4");
      localStorage.removeItem("tp_record_per_page");
      localStorage.removeItem("tpMessage1");
      localStorage.removeItem("tpcreate");
      localStorage.removeItem("tpFeedback");
      localStorage.removeItem("preMessage");
      localStorage.removeItem("prevtpmsg");
      localStorage.removeItem("freezetpFeedback");
      localStorage.removeItem("tpArrowFeed");
      localStorage.removeItem("tpMessage");
      localStorage.removeItem("freezetpMsg");
      localStorage.removeItem("tpArrowMsg");
      localStorage.removeItem("tpgenerated");
      localStorage.removeItem(`freezetpQuery1`);
      localStorage.removeItem(`freezetpQuery2`);
      localStorage.removeItem(`freezetpQuery3`);
      localStorage.removeItem("freezetpProposal1");
      localStorage.removeItem("freezetpProposal2");
      localStorage.removeItem("freezetpProposal3");
      localStorage.removeItem("freezetpProposal4");
      localStorage.removeItem("freezetpPayment1");
      localStorage.removeItem("freezetpPayment2");
      localStorage.removeItem("freezetpPayment3");
      localStorage.removeItem("freezetpAssignment1");
      localStorage.removeItem("freezetpAssignment2");
      localStorage.removeItem("freezetpAssignment3");
      localStorage.removeItem("freezetpAssignment4");
      localStorage.removeItem(`freezetpInvoice1`);
      localStorage.removeItem(`freezetpInvoice2`);
      localStorage.removeItem("tpQuery1");
      localStorage.removeItem("tpQuery2");
      localStorage.removeItem("tpQuery3");
      localStorage.removeItem("tpQuery4");
      localStorage.removeItem("tpProposal1");
      localStorage.removeItem("tpProposal2");
      localStorage.removeItem("tpProposal3");
      localStorage.removeItem("tpProposal4");
      localStorage.removeItem("tpPayment1");
      localStorage.removeItem("tpPayment2");
      localStorage.removeItem("tpPayment3");
      localStorage.removeItem("tpAssignment1");
      localStorage.removeItem("tpAssignment2");
      localStorage.removeItem("tpAssignment3");
      localStorage.removeItem("tpAssignment4");
      localStorage.removeItem("tpInvoice1");
      localStorage.removeItem("tpInvoice2");
      localStorage.removeItem("tpArrowQuery1");
      localStorage.removeItem("tpArrowQuery2");
      localStorage.removeItem("tpArrowQuery3");
      localStorage.removeItem("tpArrowQuery4");
      localStorage.removeItem("tpArrowProposal1");
      localStorage.removeItem("tpArrowProposal2");
      localStorage.removeItem("tpArrowProposal3");
      localStorage.removeItem("tpArrowProposal4");
      localStorage.removeItem("tpArrowPayment1");
      localStorage.removeItem("tpArrowPayment2");
      localStorage.removeItem("tpArrowPayment3");
      localStorage.removeItem("tpArrowAs1");
      localStorage.removeItem("tpArrowAs2");
      localStorage.removeItem("tpArrowAs3");
      localStorage.removeItem("tpArrowAs4");
      localStorage.removeItem("tpArrowInvoice1");
      localStorage.removeItem("tpArrowInvoice2");
      localStorage.removeItem("prevtpq1");
      localStorage.removeItem("prevtpq2");
      localStorage.removeItem("prevtpq3");
      localStorage.removeItem("prevtpq4");
      localStorage.removeItem("prevtppro1");
      localStorage.removeItem("prevtppro2");
      localStorage.removeItem("prevtppro3");
      localStorage.removeItem("prevtppro4");
      localStorage.removeItem("prevtppay1");
      localStorage.removeItem("prevtppay2");
      localStorage.removeItem("prevtppay3");
      localStorage.removeItem("prevtpAs1");
      localStorage.removeItem("prevtpAs2");
      localStorage.removeItem("prevtpAs3");
      localStorage.removeItem("prevtpAs4");

      axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        if (res.data.code === 1) {
          localStorage.removeItem("tpcategoryData");
          let data = res.data.result;
          data.map((i) => {
            localStorage.removeItem(`tp${i.details}`);
          });
        }
      });
      history.push("/taxprofessional/login");
    });
  };

  const nm = window.localStorage.getItem("name");

  var name = JSON.parse(nm);

  const CustEmail = window.localStorage.getItem("custEmail");
  const adminEmail = window.localStorage.getItem("adminEmail");
  const tlEmail = window.localStorage.getItem("tlEmail");
  const tpEmail = window.localStorage.getItem("tpEmail");
  const cmsEmail = window.localStorage.getItem("cmsName");

  return (
    <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-without-dd-arrow navbar-semi-light">
      {custUserId && (
        <NavWrapper
          color="#fff"
          logout={custLogout}
          name="customer"
          email={CustEmail}
        />
      )}

      {adminUserId && (
        <NavWrapper
          color="#fff"
          logout={adminLogout}
          name="admin"
          email={adminEmail}
          feedbackNumber={feedbackNumber}
        />
      )}
      {cmsDashboard && (
        <NavWrapper
          color="#fff"
          logout={cmsLogout}
          name="cms"
          email={cmsEmail}
        />
      )}
      {TLuserId && (
        <NavWrapper
          color="#fff"
          logout={tlLogout}
          name="Team Leader"
          email={tlEmail}
        />
      )}

      {TPuserId && (
        <NavWrapper
          color="#fff"
          logout={tpLogout}
          name="Tax Professional"
          email={tpEmail}
        />
      )}
    </nav>
  );
}

export default AdminHeader;

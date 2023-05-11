import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { baseUrl } from "../../config/config";
import { first } from "lodash";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function Paginator(props) {
  let allEnd = Number(localStorage.getItem("tp_record_per_page"));
  const history = useHistory();
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const [page, setPage] = useState(1);
  const [atPage, setAtpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageno, setPageno] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1"]);
  const [result, setResult] = useState([]);
  const [searchResult, setSearchResult] = useState(true);

  const userid = window.localStorage.getItem("tpkey");
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const {
    records,
    setRecords,
    setData,
    getData,
    resetTrigger,
    AllQuery,
    count,
    sortVal,
    sortField,
    setOnPage,
    setresetTrigger,
    Decproposal,
    pendingForAcceptence,
    InprogressQuery,
    DeclinedQuery,
    AllAssignment,
    tpDraftReport,
    tpDeliveryTab,
    tpAsAdminPermission,
    // resetPaging,
    completeAssignment,
    proposal,
    AllProposal,
    InprogressProposal,
    assignment,
    tpcreate,
    tpgenerated,
    AllPayment,
    // setCount,
    Unpaid,
    Paid,
    index,
  } = props;

  // console.log(props, "props is logged");
  // console.log(props.count, "count at beginning of pagination");
  // console.log(defaultPage);
  // console.log(big, "big");
  // console.log(end, "end");
  // console.log(count, "count");
  // console.log(index, "index");

  // let pageno = JSON.parse(localStorage.getItem("tpQuery1"));

  // console.log(pageno, "pageno");

  const renderCheck = () => {
    console.log("render being");
    if (index === "tpquery1") {
      let page = JSON.parse(localStorage.getItem("tpQuery1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpQuery1", JSON.stringify(1));
      }
    } else if (index === "tpquery2") {
      let page = JSON.parse(localStorage.getItem("tpQuery2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpQuery2", JSON.stringify(1));
      }
    } else if (index === "tpquery3") {
      let page = JSON.parse(localStorage.getItem("tpQuery3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpQuery3", JSON.stringify(1));
      }
    } else if (index === "tpproposal1") {
      let page = JSON.parse(localStorage.getItem("tpProposal1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpProposal1", JSON.stringify(1));
      }
    } else if (index === "tpproposal2") {
      let page = JSON.parse(localStorage.getItem("tpProposal2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpProposal2", JSON.stringify(1));
      }
    } else if (index === "tpproposal3") {
      let page = JSON.parse(localStorage.getItem("tpProposal3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpProposal3", JSON.stringify(1));
      }
    } else if (index === "tpproposal4") {
      let page = JSON.parse(localStorage.getItem("tpProposal4"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpProposal4", JSON.stringify(1));
      }
    } else if (index === "tppayment1") {
      let page = JSON.parse(localStorage.getItem("tpPayment1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpPayment1", JSON.stringify(1));
      }
    } else if (index === "tppayment2") {
      let page = JSON.parse(localStorage.getItem("tpPayment2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpPayment2", JSON.stringify(1));
      }
    } else if (index === "tppayment3") {
      let page = JSON.parse(localStorage.getItem("tpPayment3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpPayment3", JSON.stringify(1));
      }
    } else if (index === "tpInvoice1") {
      let page = JSON.parse(localStorage.getItem("tpInvoice1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpInvoice1", JSON.stringify(1));
      }
    } else if (index === "tpInvoice2") {
      let page = JSON.parse(localStorage.getItem("tpInvoice2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpInvoice2", JSON.stringify(1));
      }
    } else if (index === "tpAssignment1") {
      let page = JSON.parse(localStorage.getItem("tpAssignment1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpAssignment1", JSON.stringify(1));
      }
    } else if (index === "tpAssignment2") {
      let page = JSON.parse(localStorage.getItem("tpAssignment2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpAssignment2", JSON.stringify(1));
      }
    } else if (index === "tpAssignment3") {
      let page = JSON.parse(localStorage.getItem("tpAssignment3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpAssignment3", JSON.stringify(1));
      }
    } else if (index === "tpAssignment4") {
      let page = JSON.parse(localStorage.getItem("tpAssignment4"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tpAssignment4", JSON.stringify(1));
      }
    } else {
    }
  };

  //page counter
  const firstChunk = () => {
    if (atPage > 1) {
      setAtpage(1);
      setPage(1);
      getNewPage(1);
    } else {
    }
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getNewPage(Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getNewPage(Number(page) + 1);
  };
  const lastChunk = () => {
    if (atPage < defaultPage.at(-1)) {
      setPage(defaultPage.at(-1));
      setAtpage(totalPages);
      getNewPage(defaultPage.at(-1));
    }
  };

  const setting = (e) => {
    let droppage = [];
    const dynamicPage = Math.ceil(count / allEnd);
    console.log(dynamicPage, "to check dynamic page");
    setTotalPages(dynamicPage);
    let rem = (e - 1) * allEnd;
    let end = e * allEnd;
    if (dynamicPage > 1) {
      if (e == 1) {
        setBig(rem + e);
        setEnd(allEnd);
        // console.log("e at 1", big, end);
      } else if (e == dynamicPage) {
        setBig(rem + 1);
        setEnd(count);
        // console.log("e at last page");
      } else {
        setBig(rem + 1);
        setEnd(end);
        // console.log(`e at between page ${e}`, big, end);
      }
    } else {
      setBig(rem + 1);
      setEnd(count);
    }
    for (let i = 1; i <= dynamicPage; i++) {
      droppage.push(i);
    }
    setDefaultPage(droppage);
  };

  //on click
  const getNewPage = (e) => {
    console.log("getting new page", e);
    setLoading(true);
    let remainApiPath = "";

    if (AllQuery == "AllQuery") {
      let data = JSON.parse(localStorage.getItem("searchDatatpquery1"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpQuery1"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpQuery1`, JSON.stringify(e));
      if (data && !pagetry) {
        console.log("if data inpagination");
        remainApiPath = `tl/getIncompleteQues?page=${e}&cat_id=${
          data.store
        }&from=${data.fromDate?.split("-").reverse().join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=${data?.p_status}&pcat_id=${data.pcatId}&qno=${
          data?.query_no
        }`;
      } else if (data && pagetry) {
        remainApiPath = `tl/getIncompleteQues?page=${e}&cat_id=${
          data.store
        }&from=${data.fromDate?.split("-").reverse().join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=${data?.p_status}&pcat_id=${data.pcatId}&qno=${
          data?.query_no
        }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getIncompleteQues?page=${e}&orderby=${val}&orderbyfield=${field}`;
      } else {
        console.log("else in pagination");
        remainApiPath = `tl/getIncompleteQues?page=${e}`;
      }
    } else if (pendingForAcceptence == "pendingForAcceptence") {
      let data = JSON.parse(localStorage.getItem("searchDatatpquery2"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpQuery2"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpQuery2`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/pendingQues?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
      } else if (data && pagetry) {
        remainApiPath = `/tl/pendingQues?page=${e}&cat_id=${
          data.store
        }&from=${data.fromDate?.split("-").reverse().join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&pcat_id=${data.pcatId}&qno=${
          data?.query_no
        }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/pendingQues?page=${e}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/pendingQues?page=${e}&tp_id=${JSON.parse(userid)}`;
      }
    } else if (InprogressQuery == "InprogressQuery") {
      let data = JSON.parse(localStorage.getItem("searchDatatpquery3"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpQuery3"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpQuery3`, JSON.stringify(e));
      if (data && !pagetry) {
        //if Data then Api Path
        remainApiPath = `tl/getIncompleteQues?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=${data.p_status}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
      } else if (data && pagetry) {
        remainApiPath = `tl/getIncompleteQues?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=${data.p_status}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&pcat_id=${data.pcatId}&qno=${
          data.query_no
        }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getIncompleteQues?tp_id=${JSON.parse(
          userid
        )}&page=${e}&orderby=${val}&orderbyfield=${field}&status=1`;
      } else {
        //else if Empty then api path
        remainApiPath = `tl/getIncompleteQues?tp_id=${JSON.parse(
          userid
        )}&page=${e}&status=1`;
      }
    } else if (DeclinedQuery == "DeclinedQuery") {
      let data = JSON.parse(localStorage.getItem("searchDatatpquery2"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpQuery2"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpQuery2`, JSON.stringify(e));
      if (data && !pagetry) {
      } else if (data && pagetry) {
      } else if (!data && pagetry) {
      } else {
      }
    } else if (AllProposal == "AllProposal") {
      let data = JSON.parse(localStorage.getItem("searchDatatpproposal1"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpProposal1"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpProposal1`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=${data.p_status}&pcat_id=${data.pcatId}&qno=${
          data.query_no
        }`;
      } else if (data && pagetry) {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=${data.p_status}&pcat_id=${data.pcatId}&qno=${
          data.query_no
        }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getProposalTl?page=${e}&orderby=${val}&orderbyfield=${field}&tp_id=${JSON.parse(
          userid
        )}`;
      } else {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}`;
      }
    } else if (InprogressProposal == "InprogressProposal") {
      let data = JSON.parse(localStorage.getItem("searchDatatpproposal2"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpProposal2"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpProposal2`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/getProposalTl?tp_id=${JSON.parse(userid)}&cat_id=${
          data.store
        }&from=${data.fromDate?.split("-").reverse().join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=1&pcat_id=${data.pcatId}&qno=${data.query_no}`;
      } else if (data && pagetry) {
        remainApiPath = `tl/getProposalTl?tp_id=${JSON.parse(userid)}&cat_id=${
          data.store
        }&from=${data.fromDate?.split("-").reverse().join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=1&pcat_id=${data.pcatId}&qno=${
          data.query_no
        }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&orderby=${val}&orderbyfield=${field}&status=1`;
      } else {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=1`;
      }
    } else if (proposal == "proposal") {
      let data = JSON.parse(localStorage.getItem("searchDatatpproposal3"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpProposal3"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpProposal3`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=2&pcat_id=${data.pcatId}&qno=${data.query_no}`;
      } else if (data && pagetry) {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=2&pcat_id=${data.pcatId}&qno=${
          data.query_no
        }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=2&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=2`;
      }
    } else if (Decproposal == "Decproposal") {
      let data = JSON.parse(localStorage.getItem("searchDatatpproposal4"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpProposal4"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpProposal4`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=3&pcat_id=${data.pcatId}&qno=${data.query_no}`;
      } else if (data && pagetry) {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=3&pcat_id=${data.pcatId}&qno=${
          data.query_no
        }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=3&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=3`;
      }
    } else if (DeclinedQuery == "DeclinedQuery") {
      let data = JSON.parse(localStorage.getItem("searchDatatpproposal4"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpProposal4"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpProposal4`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/declinedQueries?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=${data.p_status}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
      } else if (data && pagetry) {
        remainApiPath = `tl/declinedQueries?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=${data.p_status}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&pcat_id=${data.pcatId}&qno=${
          data.query_no
        }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=3&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=3`;
      }
    } else if (AllPayment == "AllPayment") {
      let data = JSON.parse(localStorage.getItem("searchDatatppayment1"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpPayment1"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpPayment1`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=${data.p_status}&pcat_id=${data.pcatId}&qno=${
          data.query_no
        }`;
      } else if (data && pagetry) {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=${data.p_status}&pcat_id=${data.pcatId}&qno=${
          data.query_no
        }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}`;
      }
    } else if (Unpaid == "Unpaid") {
      let data = JSON.parse(localStorage.getItem("searchDatatppayment2"));
      let pagetry = JSON.parse(localStorage.getItem("freezetppayment2"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpPayment2`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=1&pcat_id=${data.pcatId}&qno=${data.query_no}`;
      } else if (data && pagetry) {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=1&pcat_id=${data.pcatId}&qno=${
          data.query_no
        }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=1&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=1`;
      }
    } else if (Paid == "Paid") {
      let data = JSON.parse(localStorage.getItem("searchDatatppayment3"));
      let pagetry = JSON.parse(localStorage.getItem("freezetppayment3"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpPayment3`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=2&pcat_id=${data.pcatId}&qno=${data.query_no}`;
      } else if (data && pagetry) {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=2&pcat_id=${data.pcatId}&qno=${
          data.query_no
        }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=2&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getUploadedProposals?page=${e}&tp_id=${JSON.parse(
          userid
        )}&status=2`;
      }
    } else if (tpgenerated == "tpgenerated") {
      let data = JSON.parse(localStorage.getItem("tpgenerated"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpInvoice1"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpInvoice1`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/getPaymentDetail?page=${e}&invoice=1&qno=${data.query_no}&payment_plan=${data.payment_plan}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.opt}&installment_no=${data?.installment_no}`;
      } else if (data && Object.values(data).length > 0 && pagetry) {
        remainApiPath = `tl/getPaymentDetail?page=${e}&invoice=1&qno=${data.query_no}&payment_plan=${data.payment_plan}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.opt}&installment_no=${data?.installment_no}&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getPaymentDetail?page=${e}&tp_id=${JSON.parse(
          userid
        )}&invoice=1&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getPaymentDetail?page=${e}&tp_id=${JSON.parse(
          userid
        )}&invoice=1`;
      }
    } else if (tpcreate == "tpcreate") {
      let searchData = JSON.parse(localStorage.getItem("tpcreate"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpInvoice2"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpInvoice2`, JSON.stringify(e));
      if (
        (searchData?.installment_no ||
          searchData?.opt ||
          searchData?.p_dateFrom ||
          searchData?.p_dateTo ||
          searchData?.query_no) &&
        !pagetry
      ) {
        remainApiPath = `tl/getPaymentDetail?page=${e}&invoice=0&qno=${searchData.query_no}&from=${searchData.p_dateFrom}&to=${searchData.p_dateTo}&installment_no=${searchData?.installment_no}`;
      } else if (
        (searchData?.installment_no ||
          searchData?.opt ||
          searchData?.p_dateFrom ||
          searchData?.p_dateTo ||
          searchData?.query_no) &&
        pagetry
      ) {
        remainApiPath = `tl/getPaymentDetail?page=${e}&invoice=0&qno=${searchData.query_no}&from=${searchData.p_dateFrom}&to=${searchData.p_dateTo}&installment_no=${searchData?.installment_no}&orderby=${val}&orderbyfield=${field}`;
      } else if (!searchData && pagetry) {
        remainApiPath = `tl/getPaymentDetail?page=${e}&tp_id=${JSON.parse(
          userid
        )}&invoice=0&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getPaymentDetail?page=${e}&tp_id=${JSON.parse(
          userid
        )}&invoice=0`;
      }
    } else if (AllAssignment == "AllAssignment") {
      let data = JSON.parse(localStorage.getItem("searchDatatpAssignment1"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpAssignment1"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpAssignment1`, JSON.stringify(e));
      if (data && pagetry) {
        if (data?.stage_status?.length > 0) {
          remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
            userid
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${
            data.toDate
          }&assignment_status=${data.stage_status}&stages_status=${
            data.p_status
          }&pcat_id=${data.pcatId}&qno=${
            data.query_no
          }&orderby=${val}&orderbyfield=${field}`;
        } else {
          remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
            userid
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${
            data.toDate
          }&assignment_status=${data.stage_status}&stages_status=${
            data.p_status
          }&pcat_id=${data.pcatId}&qno=${
            data.query_no
          }&orderby=${val}&orderbyfield=${field}`;
        }
      } else if (data && !pagetry) {
        if (data?.stage_status?.length > 0) {
          remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
            userid
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${
            data.toDate
          }&assignment_status=${data.stage_status}&stages_status=${
            data.p_status
          }&pcat_id=${data.pcatId}&qno=${data.query_no}`;
        } else {
          remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
            userid
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${
            data.toDate
          }&assignment_status=${data.stage_status}&stages_status=${
            data.p_status
          }&pcat_id=${data.pcatId}&qno=${data.query_no}`;
        }
      } else if (!data && pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
          userid
        )}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
          userid
        )}`;
      }
    } else if (tpDraftReport == "tpDraftReport") {
      let data = JSON.parse(localStorage.getItem("searchDatatpAssignment2"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpAssignment2"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpAssignment2`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&assignment_status=Draft_Report&stages_status=1&pcat_id=${
          data.pcatId
        }&qno=${data.query_no}`;
      } else if (data && pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&assignment_status=Draft_Report&stages_status=1&pcat_id=${
          data.pcatId
        }&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
          userid
        )}&assignment_status=Draft_Report&stages_status=1&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
          userid
        )}&assignment_status=Draft_Report&stages_status=1`;
      }
    } else if ((tpDeliveryTab = "tpDeliveryTab")) {
      let data = JSON.parse(localStorage.getItem("searchDatatpAssignment3"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpAssignment3"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpAssignment3`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&assignment_status=Delivery_of_report&stages_status=1&pcat_id=${
          data.pcatId
        }&qno=${data.query_no}`;
      } else if (data && pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&assignment_status=Delivery_of_report&stages_status=1&pcat_id=${
          data.pcatId
        }&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
          userid
        )}&assignment_status=Delivery_of_report&stages_status=1&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
          userid
        )}&assignment_status=Delivery_of_report&stages_status=1`;
      }
    } else if ((tpAsAdminPermission = "tpAsAdminPermission")) {
      let data = JSON.parse(localStorage.getItem("searchDatatpAssignment4"));
      let pagetry = JSON.parse(localStorage.getItem("freezetpAssignment4"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tpAssignment4`, JSON.stringify(e));
      if (data && !pagetry) {
        if (data?.stage_status?.length > 0) {
          remainApiPath = `tl/getadminpermissiona?page=${e}&tp_id=${JSON.parse(
            userid
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${
            data.toDate
          }&assignment_status=${data.stage_status}&stages_status=${
            data.p_status
          }&pcat_id=${data.pcatId}&qno=${data.query_no}`;
        } else {
          remainApiPath = `tl/getadminpermissiona?page=${e}&tp_id=${JSON.parse(
            userid
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${
            data.toDate
          }&assignment_status=${data.stage_status}&stages_status=${
            data.p_status
          }&pcat_id=${data.pcatId}&qno=${data.query_no}`;
        }
      } else if (data && pagetry) {
        if (data?.stage_status?.length > 0) {
          remainApiPath = `tl/getadminpermissiona?page=${e}&tp_id=${JSON.parse(
            userid
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${
            data.toDate
          }&assignment_status=${data.stage_status}&stages_status=${
            data.p_status
          }&pcat_id=${data.pcatId}&qno=${
            data.query_no
          }&orderby=${val}&orderbyfield=${field}`;
        } else {
          remainApiPath = `tl/getadminpermissiona?page=${e}&tp_id=${JSON.parse(
            userid
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${
            data.toDate
          }&assignment_status=${data.stage_status}&stages_status=${
            data.p_status
          }&pcat_id=${data.pcatId}&qno=${
            data.query_no
          }&orderby=${val}&orderbyfield=${field}`;
        }
      } else if (!data && pagetry) {
        remainApiPath = `tl/getadminpermissiona?page=${e}&tp_id=${JSON.parse(
          userid
        )}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getadminpermissiona?page=${e}&tp_id=${JSON.parse(
          userid
        )}`;
      }
    } else {
      console.log("into else void of pagination");
    }

    if (e) {
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        let droppage = [];
        if (res.data.code === 1) {
          let all = [];
          let customId = 1;
          console.log(e);
          if (e > 1) {
            customId = allEnd * (e - 1) + 1;
          }
          if (tpgenerated == "tpgenerated" || tpcreate == "tpcreate") {
            setResult(res.data.payment_detail);
            let data = res.data.payment_detail;
            data.map((i) => {
              let data = {
                ...i,
                cid: customId,
              };
              customId++;
              all.push(data);
            });
            setData(all);
            console.log(all);
            if (data.length > 0) {
              setSearchResult(true);
            } else {
              setSearchResult(false);
            }
            setOnPage(e);
            setAtpage(e);
            // setRecords(res.data.result.length);
            const dynamicPage = Math.ceil(count / allEnd);
            console.log(dynamicPage, "to check dynamic page");
            setTotalPages(dynamicPage);
            let rem = (e - 1) * allEnd;
            let end = e * allEnd;
            if (dynamicPage > 1) {
              if (e == 1) {
                setBig(rem + e);
                setEnd(allEnd);
                // console.log("e at 1", big, end);
              } else if (e == dynamicPage) {
                setBig(rem + 1);
                setEnd(res.data.total);
                // console.log("e at last page");
              } else {
                setBig(rem + 1);
                setEnd(end);
                // console.log(`e at between page ${e}`, big, end);
              }
            } else {
              setBig(rem + e);
              setEnd(res.data.total);
            }
            for (let i = 1; i <= dynamicPage; i++) {
              droppage.push(i);
            }
            setDefaultPage(droppage);
          } else {
            setResult(res.data.result);
            let data = res.data.result;
            data.map((i) => {
              let data = {
                ...i,
                cid: customId,
              };
              customId++;
              all.push(data);
            });
            setData(all);
            if (data.length > 0) {
              setSearchResult(true);
            } else {
              setSearchResult(false);
            }
            console.log(all);
            setOnPage(e);
            setAtpage(e);
            // setRecords(res.data.result.length);
            const dynamicPage = Math.ceil(count / allEnd);
            console.log(dynamicPage, "to check dynamic page");
            setTotalPages(dynamicPage);
            let rem = (e - 1) * allEnd;
            let end = e * allEnd;
            if (dynamicPage > 1) {
              if (e == 1) {
                setBig(rem + e);
                setEnd(allEnd);
                // console.log("e at 1", big, end);
              } else if (e == dynamicPage) {
                setBig(rem + 1);
                setEnd(res.data.total);
                // console.log("e at last page");
              } else {
                setBig(rem + 1);
                setEnd(end);
                // console.log(`e at between page ${e}`, big, end);
              }
            } else {
              setBig(rem + e);
              setEnd(res.data.total);
            }
            for (let i = 1; i <= dynamicPage; i++) {
              droppage.push(i);
            }
            setDefaultPage(droppage);
          }

          // console.log(defaultPage, "in submit of defaultPage");
        }
      });
    }
  };

  useEffect(() => {
    renderCheck();
  }, []);

  useEffect(() => {
    if (resetTrigger == true) {
      setPage(1);
      setAtpage(1);
      setting(1);
      setresetTrigger(!resetTrigger);
    }
    // setSearchResult(true);
  }, [resetTrigger]);

  useEffect(() => {
    console.log("useEffect count", count);
    if (count > 0) {
      if (pageno > 1) {
        setPage(pageno);
        setAtpage(pageno);
        setting(pageno);
        setOnPage(pageno);
      } else {
        setPage(1);
        setAtpage(1);
        setOnPage(1);
        setting(1);
      }
    }
    if (count == 0) {
      setSearchResult(false);
    } else {
      setSearchResult(true);
    }
  }, [count]);

  return (
    <div className="customPagination">
      {searchResult === true ? (
        <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
          <span className="customPaginationSpan">
            {big}-{end} of {count}
          </span>
          <span className="d-flex">
            {page > 1 ? (
              <button className="navButton" onClick={(e) => firstChunk()}>
                <KeyboardDoubleArrowLeftIcon />
              </button>
            ) : (
              ""
            )}
            {page > 1 ? (
              <button className="navButton" onClick={(e) => prevChunk()}>
                <KeyboardArrowLeftIcon />
              </button>
            ) : (
              ""
            )}
            <div className="navButtonSelectDiv">
              <select
                value={page}
                onChange={(e) => {
                  setPage(Number(e.target.value));
                  getNewPage(Number(e.target.value));
                }}
                className="form-control"
              >
                {defaultPage.map((i) => (
                  <option value={i}>{i}</option>
                ))}
              </select>
            </div>
            {defaultPage.length > page ? (
              <button className="navButton" onClick={(e) => nextChunk()}>
                <KeyboardArrowRightIcon />
              </button>
            ) : (
              ""
            )}
            {defaultPage.length > page ? (
              <button className="navButton" onClick={(e) => lastChunk()}>
                <KeyboardDoubleArrowRightIcon />
              </button>
            ) : (
              ""
            )}
          </span>
        </div>
      ) : (
        <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
          <span className="customPaginationSpan nullClass">0 - 0 of 0</span>
        </div>
      )}
    </div>
  );
}

export default Paginator;

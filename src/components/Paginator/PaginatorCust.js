import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { baseUrl } from "../../config/config";
import { first } from "lodash";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function PaginatorCust(props) {
  let allEnd = Number(localStorage.getItem("cust_record_per_page"));
  // const allEnd = 50;
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

  const userId = window.localStorage.getItem("userid");
  const token = window.localStorage.getItem("clientToken");
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
    id,
    query,
    InprogressAllocation,
    inprogressProposal,
    InprogressQueryProposal,
    acceptedProposal,
    declinedProposal,
    allPayment,
    paid,
    unpaid,
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
    console.log("render being", index);
    if (index === "custQuery1") {
      let page = JSON.parse(localStorage.getItem("custQuery1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custQuery1", JSON.stringify(1));
      }
    } else if (index === "custQuery2") {
      let page = JSON.parse(localStorage.getItem("custQuery2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custQuery2", JSON.stringify(1));
      }
    } else if (index === "custQuery3") {
      let page = JSON.parse(localStorage.getItem("custQuery3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custQuery3", JSON.stringify(1));
      }
    } else if (index == "custQuery4") {
      let page = JSON.parse(localStorage.getItem("custQuery4"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custQuery4", JSON.stringify(1));
      }
    }
    else if (index === "custProposal1") {
      let page = JSON.parse(localStorage.getItem("custProposal1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custProposal1", JSON.stringify(1));
      }
    } else if (index === "custProposal2") {
      let page = JSON.parse(localStorage.getItem("custProposal2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custProposal2", JSON.stringify(1));
      }
    } else if (index === "custProposal3") {
      let page = JSON.parse(localStorage.getItem("custProposal3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custProposal3", JSON.stringify(1));
      }
    } else if (index === "custProposal4") {
      let page = JSON.parse(localStorage.getItem("custProposal4"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custProposal4", JSON.stringify(1));
      }
    } else if (index === "custPay1") {
      let page = JSON.parse(localStorage.getItem("custPay1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custPay1", JSON.stringify(1));
      }
    } else if (index === "custPay2") {
      let page = JSON.parse(localStorage.getItem("custPay2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custPay2", JSON.stringify(1));
      }
    } else if (index === "custPay3") {
      let page = JSON.parse(localStorage.getItem("custPay3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custPay3", JSON.stringify(1));
      }
    } else if (index === "custAs1") {
      let page = JSON.parse(localStorage.getItem("custAs1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custAs1", JSON.stringify(1));
      }
    } else if (index === "custAs2") {
      let page = JSON.parse(localStorage.getItem("custAs2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custAs2", JSON.stringify(1));
      }
    } else if (index === "custAs3") {
      let page = JSON.parse(localStorage.getItem("custAs3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custAs3", JSON.stringify(1));
      }
    } else if (index === "custAs4") {
      let page = JSON.parse(localStorage.getItem("custAs4"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custAs4", JSON.stringify(1));
      }
    } else if (index === "custAs5") {
      let page = JSON.parse(localStorage.getItem("custAs5"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("custAs5", JSON.stringify(1));
      }
    } else {
      console.log("in setPageno Void");
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

    if (query == "query") {
      let data = JSON.parse(localStorage.getItem("searchDatacustQuery1"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustQuery1"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custQuery1`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=${data.p_status}&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=${data.p_status}&pcat_id=${data.pcatId
          }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}`;
      }
    } else if (InprogressAllocation == "InprogressAllocation") {
      let data = JSON.parse(localStorage.getItem("searchDatacustQuery2"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustQuery2"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custQuery2`, JSON.stringify(e));
      if (data && !pagetry) {
        if (data.p_status.length > 0) {
          remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
            id
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=${data.p_status}&pcat_id=${data.pcatId}`;
        } else {
          remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
            id
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=1&pcat_id=${data.pcatId}`;
        }
      } else if (data && pagetry) {
        if (data.p_status.length > 0) {
          remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
            userId
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=${data.p_status}&pcat_id=${data.pcatId
            }&orderby=${val}&orderbyfield=${field}`;
        } else {
          remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
            userId
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=1&pcat_id=${data.pcatId
            }&orderby=${val}&orderbyfield=${field}`;
        }
      } else if (!data && pagetry) {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=1&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=1`;
      }
    } else if (InprogressQueryProposal == "InprogressQueryProposal") {
      let data = JSON.parse(localStorage.getItem("searchDatacustQuery3"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustQuery3"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custQuery3`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=2&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=2&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=2&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=2`;
      }
    } else if (DeclinedQuery == "DeclinedQuery") {
      let data = JSON.parse(localStorage.getItem("searchDatacustQuery4"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustQuery4"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custQuery4`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `customers/declinedQueries?page=${e}&uid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&pcat_id=${data.pcatId}&status=${data.p_status}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/declinedQueries?page=${e}&uid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&pcat_id=${data.pcatId}&status=${data.p_status
          }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/declinedQueries?page=${e}&uid=${JSON.parse(
          userId
        )}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/declinedQueries?page=${e}&uid=${JSON.parse(
          userId
        )}`;
      }
    } else if (proposal == "proposal") {
      let data = JSON.parse(localStorage.getItem("searchDatacustProposal1"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustProposal1"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custProposal1`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=${data.p_status}&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=${data.p_status}&pcat_id=${data.pcatId
          }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}`;
      }
    } else if (inprogressProposal == "inprogressProposal") {
      let data = JSON.parse(localStorage.getItem("searchDatacustProposal2"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustProposal2"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custProposal2`, JSON.stringify(e));
      if (data && pagetry) {
        if (data.p_status) {
          remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
            userId
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=${data.p_status}&pcat_id=${data.pcatId
            }&orderby=${val}&orderbyfield=${field}`;
        } else {
          remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
            userId
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=1&pcat_id=${data.pcatId
            }&orderby=${val}&orderbyfield=${field}`;
        }
      } else if (data && !pagetry) {
        if (data.p_status) {
          remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
            userId
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=${data.p_status}&pcat_id=${data.pcatId}`;
        } else {
          remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
            userId
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=1&pcat_id=${data.pcatId}`;
        }
      } else if (!data && pagetry) {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&status=1&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&status=1`;
      }
    } else if (acceptedProposal == "acceptedProposal") {
      let data = JSON.parse(localStorage.getItem("searchDatacustProposal3"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustProposal3"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custProposal3`, JSON.stringify(e));
      if (data && pagetry) {
        console.log("if data inpagination");
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=2&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
      } else if (data && !pagetry) {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=2&pcat_id=${data.pcatId}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&status=2&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&status=2`;
      }
    } else if (declinedProposal == "declinedProposal") {
      let data = JSON.parse(localStorage.getItem("searchDatacustProposal4"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustProposal4"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custProposal4`, JSON.stringify(e));
      if (data && !pagetry) {
        console.log("if data inpagination");
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=3&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=3&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&status=3&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
          userId
        )}&status=3`;
      }
    } else if (assignment == "assignment") {
      let data = JSON.parse(localStorage.getItem("searchDatacustAs1"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustAs1"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custAs1`, JSON.stringify(e));
      if (data && !pagetry) {
        console.log("if data inpagination");
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=${data.p_status}&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=${data.p_status}&pcat_id=${data.pcatId
          }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}`;
      }
    } else if (assignment == "assignmentInprogress") {
      let data = JSON.parse(localStorage.getItem("searchDatacustAs2"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustAs2"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custAs2`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=1&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=1&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=1&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=1`;
      }
    } else if (assignment == "completeAssignment") {
      let data = JSON.parse(localStorage.getItem("searchDatacustAs3"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustAs3"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custAs3`, JSON.stringify(e));
      if (data && !pagetry) {
        console.log("if data inpagination");
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=2&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=2&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=2&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=2`;
      }
    } else if (assignment == "declinedAssignment") {
      let data = JSON.parse(localStorage.getItem("searchDatacustAs4"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustAs4"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custAs4`, JSON.stringify(e));
      if (data && !pagetry) {
        console.log("if data inpagination");
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=3&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=3&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=3&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/completeAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&status=3`;
      }
    } else if (assignment == "assignmentpermission") {
      let data = JSON.parse(localStorage.getItem("searchDatacustAs5"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustAs5"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custAs5`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `customers/completeAssignmentspermission?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=${data.p_status}&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/completeAssignmentspermission?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=${data.p_status}&pcat_id=${data.pcatId
          }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/completeAssignmentspermission?page=${e}&user=${JSON.parse(
          userId
        )}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/completeAssignmentspermission?page=${e}&user=${JSON.parse(
          userId
        )}`;
      }
    } else if (allPayment == "allPayment") {
      let data = JSON.parse(localStorage.getItem("searchDatacustPay1"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustPay1"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custPay1`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=${data.p_status}&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=${data.p_status}&pcat_id=${data.pcatId
          }&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}`;
      }
    } else if (unpaid == "unpaid") {
      let data = JSON.parse(localStorage.getItem("searchDatacustPay2"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustPay2"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custPay2`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=1&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=1&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&status=1&orderby=${val}&orderbyfield=${field}`;
      } else {
        console.log("else in pagination");
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&status=1`;
      }
    } else if (paid == "paid") {
      let data = JSON.parse(localStorage.getItem("searchDatacustPay3"));
      let pagetry = JSON.parse(localStorage.getItem("freezecustPay3"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`custPay3`, JSON.stringify(e));
      if (data && !pagetry) {
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=2&pcat_id=${data.pcatId}`;
      } else if (data && pagetry) {
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
          }&status=2&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
      } else if (!data && pagetry) {
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&status=2&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/getUploadedProposals?page=${e}&cid=${JSON.parse(
          userId
        )}&status=2`;
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
          console.log(all);
          console.log(data.length,"length");
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
      setPageno(1);
      setting(1);
      setresetTrigger(!resetTrigger);
    }
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
  }, [count]);

  return (
    <div className="customPagination">
      {count > 0 ? (
        <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
          {count > 0 ? (
            <span className="customPaginationSpan">
              {big}-{end} of {count}
            </span>
          ) : (
            <span className="customPaginationSpan">0-0 of 0</span>
          )}
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

export default PaginatorCust;

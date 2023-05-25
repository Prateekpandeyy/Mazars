import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { baseUrl } from "../../config/config";
import { first } from "lodash";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function PaginatorTL(props) {
  let allEnd = Number(localStorage.getItem("tl_record_per_page"));
  const userid = window.localStorage.getItem("tlkey");
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

  const token = window.localStorage.getItem("tlToken");
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
    tlDraftReport,
    tlDeliveryTab,
    tlAsAdminPermission,
    // resetPaging,
    completeAssignment,
    proposal,
    AllProposal,
    InprogressProposal,
    assignment,
    tlcreate,
    tlgenerated,
    AllPayment,
    // setCount,
    Unpaid,
    Paid,
    index,
  } = props;

  const renderCheck = () => {
    console.log("render being");
    if (index === "tlquery1") {
      let page = JSON.parse(localStorage.getItem("tlQuery1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlQuery1", JSON.stringify(1));
      }
    } else if (index === "tlquery2") {
      let page = JSON.parse(localStorage.getItem("tlQuery2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlQuery2", JSON.stringify(1));
      }
    } else if (index === "tlquery3") {
      let page = JSON.parse(localStorage.getItem("tlQuery3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlQuery3", JSON.stringify(1));
      }
    } else if (index === "tlproposal1") {
      let page = JSON.parse(localStorage.getItem("tlProposal1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlProposal1", JSON.stringify(1));
      }
    } else if (index === "tlproposal2") {
      let page = JSON.parse(localStorage.getItem("tlProposal2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlProposal2", JSON.stringify(1));
      }
    } else if (index === "tlproposal3") {
      let page = JSON.parse(localStorage.getItem("tlProposal3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlProposal3", JSON.stringify(1));
      }
    } else if (index === "tlproposal4") {
      let page = JSON.parse(localStorage.getItem("tlProposal4"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlProposal4", JSON.stringify(1));
      }
    } else if (index === "tlpayment1") {
      let page = JSON.parse(localStorage.getItem("tlPayment1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlPayment1", JSON.stringify(1));
      }
    } else if (index === "tlpayment2") {
      let page = JSON.parse(localStorage.getItem("tlPayment2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlPayment2", JSON.stringify(1));
      }
    } else if (index === "tlpayment3") {
      let page = JSON.parse(localStorage.getItem("tlPayment3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlPayment3", JSON.stringify(1));
      }
    } else if (index === "tlInvoice1") {
      let page = JSON.parse(localStorage.getItem("tlInvoice1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlInvoice1", JSON.stringify(1));
      }
    } else if (index === "tlInvoice2") {
      let page = JSON.parse(localStorage.getItem("tlInvoice2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlInvoice2", JSON.stringify(1));
      }
    } else if (index === "tlAssignment1") {
      let page = JSON.parse(localStorage.getItem("tlAssignment1"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlAssignment1", JSON.stringify(1));
      }
    } else if (index === "tlAssignment2") {
      let page = JSON.parse(localStorage.getItem("tlAssignment2"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlAssignment2", JSON.stringify(1));
      }
    } else if (index === "tlAssignment3") {
      let page = JSON.parse(localStorage.getItem("tlAssignment3"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlAssignment3", JSON.stringify(1));
      }
    } else if (index === "tlAssignment4") {
      let page = JSON.parse(localStorage.getItem("tlAssignment4"));
      if (page) {
        setPageno(page);
      } else {
        localStorage.setItem("tlAssignment4", JSON.stringify(1));
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

  const getNewPage = (e) => {
    console.log("getting new page", e);
    setLoading(true);
    let remainApiPath = "";

    if (AllQuery == "AllQuery") {
    } else if (pendingForAcceptence == "pendingForAcceptence") {
    } else if (AllAssignment == "AllAssignment") {
      let data = JSON.parse(localStorage.getItem("searchDatatlAssignment1"));
      let pagetry = JSON.parse(localStorage.getItem("freezetlAssignment1"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tlAssignment1`, JSON.stringify(e));
      if (data && pagetry) {
        if (data?.stage_status?.length > 0) {
          remainApiPath = `tl/getAssignments?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
        } else {
          remainApiPath = `tl/getAssignments?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
        }
      } else if (data && !pagetry) {
        if (data?.stage_status?.length > 0) {
          remainApiPath = `tl/getAssignments?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
        } else {
          remainApiPath = `tl/getAssignments?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
        }
      } else if (!data && pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}`;
      }
    } else if (tlDraftReport == "tlDraftReport") {
      let data = JSON.parse(localStorage.getItem("searchDatatlAssignment2"));
      let pagetry = JSON.parse(localStorage.getItem("freezetlAssignment2"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tlAssignment2`, JSON.stringify(e));
      if (data && pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&assignment_status=Draft_Report&stages_status=1&pcat_id=${
          data.pcatId
        }&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
      } else if (data && !pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&assignment_status=Draft_Report&stages_status=1&pcat_id=${
          data.pcatId
        }&qno=${data.query_no}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}&assignment_status=Draft_Report&stages_status=1&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}&assignment_status=Draft_Report&stages_status=1`;
      }
    } else if (tlDeliveryTab == "tlDeliveryTab") {
      let data = JSON.parse(localStorage.getItem("searchDatatlAssignment3"));
      let pagetry = JSON.parse(localStorage.getItem("freezetlAssignment3"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tlAssignment3`, JSON.stringify(e));
      if (data && pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&assignment_status=Delivery_of_report&stages_status=1&pcat_id=${
          data.pcatId
        }&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
      } else if (data && !pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&assignment_status=Delivery_of_report&stages_status=1&pcat_id=${
          data.pcatId
        }&qno=${data.query_no}`;
      } else if (!data && pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}&assignment_status=Delivery_of_report&stages_status=1&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}&assignment_status=Delivery_of_report&stages_status=1`;
      }
    } else if (tlAsAdminPermission == "tlAsAdminPermission") {
      let data = JSON.parse(localStorage.getItem("searchDatatlAssignment4"));
      let pagetry = JSON.parse(localStorage.getItem("freezetlAssignment4"));
      let val = pagetry?.val;
      let field = pagetry?.field;
      localStorage.setItem(`tlAssignment4`, JSON.stringify(e));
      if (data && pagetry) {
        if (data?.assignment_status?.length > 0) {
          remainApiPath = `tl/getadminpermissiona?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
        } else {
          remainApiPath = `tl/getadminpermissiona?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
        }
      } else if (data && !pagetry) {
        if (data?.stage_status?.length > 0) {
          remainApiPath = `tl/getadminpermissiona?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
        } else {
          remainApiPath = `tl/getadminpermissiona?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
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
          if (tlgenerated == "tlgenerated" || tlcreate == "tlcreate") {
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
            setOnPage(e);
            setAtpage(e);
            // setRecords(res.data.result.length);
            const dynamicPage = Math.ceil(count / allEnd);

            setTotalPages(dynamicPage);
            let rem = (e - 1) * allEnd;
            let end = e * allEnd;
            if (dynamicPage > 1) {
              if (e == 1) {
                setBig(rem + e);
                setEnd(allEnd);
              } else if (e == dynamicPage) {
                setBig(rem + 1);
                setEnd(res.data.total);
              } else {
                setBig(rem + 1);
                setEnd(end);
              }
            } else {
              setBig(rem + e);
              setEnd(res.data.total);
            }
            for (let i = 1; i <= dynamicPage; i++) {
              droppage.push(i);
            }
            if (data.length > 0) {
              setSearchResult(true);
            } else {
              setSearchResult(false);
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
            console.log(all);
            setOnPage(e);
            setAtpage(e);
            // setRecords(res.data.result.length);
            const dynamicPage = Math.ceil(count / allEnd);
            console.log(dynamicPage, "to check dynamic page");
            setTotalPages(dynamicPage);
            let rem = (e - 1) * allEnd;
            let end = e * allEnd;
            if (data.length > 0) {
              setSearchResult(true);
            } else {
              setSearchResult(false);
            }
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

export default PaginatorTL;

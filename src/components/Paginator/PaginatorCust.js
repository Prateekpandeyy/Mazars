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
    // let allEnd = Number(localStorage.getItem("cust_record_per_page"));
    const allEnd = 5;
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

    const userid = window.localStorage.getItem("userid");
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
        console.log("render being");
        if (index === "custquery1") {
            console.log(JSON.parse(localStorage.getItem("custQuery1")), "from storage one");
            setPageno(JSON.parse(localStorage.getItem("custQuery1")))
            console.log(pageno, "in all Q render check");
        }
        else if (index === "custquery2") {
            console.log(JSON.parse(localStorage.getItem("custQuery2")), "from storage two");
            setPageno(JSON.parse(localStorage.getItem("custQuery2")))
            console.log(pageno, "in PendingForAccept render check");
        }
        else if (index === "custquery3") {
            console.log(JSON.parse(localStorage.getItem("custQuery3")), "from storage three");
            setPageno(JSON.parse(localStorage.getItem("custQuery3")))
            console.log(pageno, "in inCompQ render check");
        }
        else if (index === "custProposal1") {
            setPageno(JSON.parse(localStorage.getItem("custProposal1")))
        }
        else if (index === "tpproposal2") {
            setPageno(JSON.parse(localStorage.getItem("custProposal2")))
        }
        // else if (index === "tpproposal3") {
        //     setPageno(JSON.parse(localStorage.getItem("tpProposal3")))
        // }
        // else if (index === "tpproposal4") {
        //     setPageno(JSON.parse(localStorage.getItem("tpProposal4")))
        // }
        // else if (index === "tppayment1") {
        //     setPageno(JSON.parse(localStorage.getItem("tpPayment1")))
        // }
        // else if (index === "tppayment2") {
        //     setPageno(JSON.parse(localStorage.getItem("tpPayment2")))
        // }
        // else if (index === "tppayment3") {
        //     setPageno(JSON.parse(localStorage.getItem("tpPayment3")))
        // }
        // else if (index === "tpInvoice1") {
        //     setPageno(JSON.parse(localStorage.getItem("tpInvoice1")))
        // }
        // else if (index === "tpInvoice2") {
        //     setPageno(JSON.parse(localStorage.getItem("tpInvoice2")))
        // }
        // else if (index === "tpAssignment1") {
        //     // tpAssignment1
        //     setPageno(JSON.parse(localStorage.getItem("tpAssignment1")))
        // }
        // else if (index === "tpAssignment2") {
        //     setPageno(JSON.parse(localStorage.getItem("tpAssignment2")))
        // }
        // else if (index === "tpAssignment3") {
        //     setPageno(JSON.parse(localStorage.getItem("tpAssignment3")))
        // }
        // else if (index === "tpAssignment4") {
        //     setPageno(JSON.parse(localStorage.getItem("tpAssignment4")))
        // }
        else {
            console.log('in setPageno Void');
        }
    }

    //page counter
    const firstChunk = () => {
        if (atPage > 1) {
            setAtpage(1);
            setPage(1);
            getNewPage(1);
        } else { }
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
        if (atPage < (defaultPage.at(-1))) {
            setPage(defaultPage.at(-1));
            setAtpage(totalPages);
            getNewPage(defaultPage.at(-1));
        }
    };

    const setting = (e) => {
        let droppage = [];
        const dynamicPage = Math.ceil(count / allEnd);
        console.log(dynamicPage, "to check dynamic page");
        setTotalPages(dynamicPage)
        let rem = (e - 1) * allEnd;
        let end = e * allEnd;
        if (dynamicPage > 1) {
            if (e == 1) {
                setBig(rem + e);
                setEnd(allEnd);
                // console.log("e at 1", big, end);
            }
            else if ((e == (dynamicPage))) {
                setBig(rem + 1);
                setEnd(count);
                // console.log("e at last page");
            }
            else {
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
    }

    //on click
    const getNewPage = (e) => {
        console.log("getting new page", e);
        setLoading(true);
        let remainApiPath = "";

        if (query == "query") {
            let data = JSON.parse(localStorage.getItem("searchDatacustQuery1"));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`custQuery1`, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (InprogressAllocation == "InprogressAllocation") {
            let data = JSON.parse(localStorage.getItem("searchDatacustQuery2"));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`custQuery2`, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (InprogressQueryProposal == "InprogressQueryProposal") {
            let data = JSON.parse(localStorage.getItem("searchDatacustQuery1"));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`custQuery3`, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (DeclinedQuery == "DeclinedQuery") {
            let data = JSON.parse(localStorage.getItem("searchDatacustQuery1"));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`custQuery4`, JSON.stringify(e));
            if ((data) && (!pagetry)) {

            } else if ((data) && (pagetry)) {

            } else if ((!data) && (pagetry)) {

            } else {

            }
        }
        else if (proposal == "proposal") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem("freezecustProposal1"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`custPropsosal1`, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(userid)}`;
            } else if ((data) && (pagetry)) {
                remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(userid)}`;
            } else if ((!data) && (pagetry)) {
                remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(userid)}`;
            }
            else {
                console.log('else in pagination');
                remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(userid)}`;
            }
        }
        else if (inprogressProposal == "inprogressProposal") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem("freezecustProposal2"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`custPropsosal2`, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(userid)}&status=1`;
            } else if ((data) && (pagetry)) {
                remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(userid)}&status=1`;
            } else if ((!data) && (pagetry)) {
                remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(userid)}&status=1`;
            }
            else {
                console.log('else in pagination');
                remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(userid)}&status=1`;
            }
        }
        else if (acceptedProposal == "acceptedProposal") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(``, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (declinedProposal == "declinedProposal") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(``, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (assignment == "assignment") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(``, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (assignment == "assignmentInprogress") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(``, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (assignment == "completeAssignment") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(``, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (assignment == "declinedAssignment") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(``, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (assignment == "assignmentpermission") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(``, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (allPayment == "allPayment") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(``, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (unpaid == "unpaid") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(``, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else if (paid == "paid") {
            let data = JSON.parse(localStorage.getItem(""));
            let pagetry = JSON.parse(localStorage.getItem(""));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(``, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = ``;
            } else if ((data) && (pagetry)) {
                remainApiPath = ``;
            } else if ((!data) && (pagetry)) {
                remainApiPath = ``;
            }
            else {
                console.log('else in pagination');
                remainApiPath = ``;
            }
        }
        else { console.log("into else void of pagination"); }

        if (e) {
            axios
                .get(
                    `${baseUrl}/${remainApiPath}`,
                    myConfig
                )
                .then((res) => {
                    let droppage = [];
                    if (res.data.code === 1) {
                        let all = [];
                        let customId = 1;
                        console.log(e);
                        if (e > 1) {
                            customId = allEnd * (e - 1) + 1;
                        }
                            setResult(res.data.result)
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
                            setTotalPages(dynamicPage)
                            let rem = (e - 1) * allEnd;
                            let end = e * allEnd;
                            if (dynamicPage > 1) {
                                if (e == 1) {
                                    setBig(rem + e);
                                    setEnd(allEnd);
                                    // console.log("e at 1", big, end);
                                }
                                else if ((e == (dynamicPage))) {
                                    setBig(rem + 1);
                                    setEnd(res.data.total);
                                    // console.log("e at last page");
                                }
                                else {
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
        renderCheck()
    }, []);

    useEffect(() => {
        if (resetTrigger == true) {
            setPage(1);
            setAtpage(1);
            setting(1)
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
            <div className="customPagination">
                <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                    <span className="customPaginationSpan">
                        {big}-{end} of {count}
                    </span>
                    <span className="d-flex">
                        <button
                            className="navButton"
                            onClick={(e) => firstChunk()}
                        >
                            <KeyboardDoubleArrowLeftIcon />
                        </button>

                        {page > 1 ? (
                            <button
                                className="navButton"
                                onClick={(e) => prevChunk()}
                            >
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
                                className="form-control">
                                {defaultPage.map((i) => (
                                    <option value={i} >{i}</option>
                                ))}
                            </select>
                        </div>
                        {defaultPage.length > page ? (
                            <button
                                className="navButton"
                                onClick={(e) => nextChunk()}
                            >
                                <KeyboardArrowRightIcon />
                            </button>
                        ) : (
                            ""
                        )}
                        <button
                            className="navButton"
                            onClick={(e) => lastChunk()}
                        >
                            <KeyboardDoubleArrowRightIcon />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}


export default PaginatorCust;
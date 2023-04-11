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
        pendingForAcceptence,
        InprogressQuery,
        DeclinedQuery,
        // resetPaging,
        completeAssignment,
        proposal,
        AllProposal,
        InprogressProposal,
        assignment,
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
            console.log(JSON.parse(localStorage.getItem("tpQuery1")), "from storage one");
            setPageno(JSON.parse(localStorage.getItem("tpQuery1")))
            console.log(pageno, "in all Q render check");
        }else if (index === "tpquery2"){
            console.log(JSON.parse(localStorage.getItem("tpQuery2")), "from storage two");
            setPageno(JSON.parse(localStorage.getItem("tpQuery2")))
            console.log(pageno, "in PendingForAccept render check");
        }
        else if (index === "tpquery3") {
            console.log(JSON.parse(localStorage.getItem("tpQuery3")), "from storage three");
            setPageno(JSON.parse(localStorage.getItem("tpQuery3")))
            console.log(pageno, "in inCompQ render check");
        } else {
        }
    }

    //page counter
    const firstChunk = () => {
        setAtpage(1);
        setPage(1);
        getNewPage(1);
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
        setPage(defaultPage.at(-1));
        setAtpage(totalPages);
        getNewPage(defaultPage.at(-1));
    };

    const setting = (e) => {
        let droppage = [];
        const dynamicPage = Math.ceil(count / allEnd);
        console.log(dynamicPage, "to check dynamic page");
        setTotalPages(dynamicPage)
        let rem = (e - 1) * allEnd;
        let end = e * allEnd;
        if (e == 1) {
            setBig(rem + e);
            setEnd(allEnd);
            console.log("e at 1", big, end);
        }
        else if ((e == (dynamicPage))) {
            setBig(rem + 1);
            setEnd(count);
            console.log("e at last page");
        }
        else {
            setBig(rem + 1);
            setEnd(end);
            console.log(`e at between page ${e}`, big, end);
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

        if (AllQuery == "AllQuery") {
            let data = JSON.parse(localStorage.getItem("searchDatatpquery1"));
            let pagetry = JSON.parse(localStorage.getItem("freezetpQuery1"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`tpQuery1`, JSON.stringify(e));
            if ((data) && (!pagetry)) {
                console.log('if data inpagination');
                remainApiPath = `tl/getIncompleteQues?page=${e}&cat_id=${data.store
                    }&from=${data.fromDate
                        ?.split("-")
                        .reverse()
                        .join("-")}&to=${data.toDate
                            ?.split("-")
                            .reverse()
                            .join("-")}&status=${data?.p_status}&pcat_id=${data.pcatId
                    }&qno=${data?.query_no}`;
            } else if ((data) && (pagetry)) {
                remainApiPath = `tl/getIncompleteQues?page=${e}&cat_id=${data.store
                    }&from=${data.fromDate
                        ?.split("-")
                        .reverse()
                        .join("-")}&to=${data.toDate
                            ?.split("-")
                            .reverse()
                            .join("-")}&status=${data?.p_status}&pcat_id=${data.pcatId
                    }&qno=${data?.query_no}&orderby=${val}&orderbyfield=${field}`;
            } else if ((!data) && (pagetry)) {
                remainApiPath = `tl/getIncompleteQues?page=${e}&orderby=${val}&orderbyfield=${field}`;
            }
            else {
                console.log('else in pagination');
                remainApiPath = `tl/getIncompleteQues?page=${e}`;
            }
        }
        else if (pendingForAcceptence == "pendingForAcceptence"){
            let data = JSON.parse(localStorage.getItem("searchDatatpquery2"));
            let pagetry = JSON.parse(localStorage.getItem("freezetpQuery2"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`tpQuery2`, JSON.stringify(e));
            if ((data) && (!pagetry)) {

            }else if ((data) && (pagetry)) {

            }else if ((!data) && (pagetry)) {

            }else {

            }

        }
        else if (InprogressQuery == "InprogressQuery") {
            let data = JSON.parse(localStorage.getItem("searchDatatpquery3"));
            let pagetry = JSON.parse(localStorage.getItem("freezetpQuery3"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`tpQuery3`, JSON.stringify(e));
            if ((data) && (!pagetry)) {
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

            } else if ((data) && (pagetry)) {
                remainApiPath = `tl/getIncompleteQues?page=${e}&tp_id=${JSON.parse(
                    userid
                )}&status=${data.p_status}&cat_id=${data.store}&from=${data.fromDate
                    ?.split("-")
                    .reverse()
                    .join("-")}&to=${data.toDate
                        ?.split("-")
                        .reverse()
                        .join("-")}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
            }
            else if ((!data) && (pagetry)) {
                remainApiPath = `tl/getIncompleteQues?tp_id=${JSON.parse(
                  userid
                )}&page=${e}&orderby=${val}&orderbyfield=${field}&status=1`;
              }
            else {
                //else if Empty then api path
                remainApiPath = `tl/getIncompleteQues?tp_id=${JSON.parse(
                    userid
                  )}&page=${e}&status=1`;
            }
        } 
        else if (DeclinedQuery == "DeclinedQuery"){
            let data = JSON.parse(localStorage.getItem("searchDatatpquery2"));
            let pagetry = JSON.parse(localStorage.getItem("freezetpQuery2"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`tpQuery2`, JSON.stringify(e));
            if ((data) && (!pagetry)) {

            }else if ((data) && (pagetry)) {

            }else if ((!data) && (pagetry)) {

            }else {

            }
        }
        else if (AllProposal == "AllProposal"){
            let data = JSON.parse(localStorage.getItem("searchDatatpproposal1"));
            let pagetry = JSON.parse(localStorage.getItem("freezetpproposal1"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`tpProposal1`, JSON.stringify(e));
            if ((data) && (!pagetry)) {

            }else if ((data) && (pagetry)) {

            }else if ((!data) && (pagetry)) {

            }else {

            }
        }
        else if (InprogressProposal == "InprogressProposal"){
            let data = JSON.parse(localStorage.getItem("searchDatatpproposal2"));
            let pagetry = JSON.parse(localStorage.getItem("freezetpproposal2"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`tpProposal2`, JSON.stringify(e));
            if ((data) && (!pagetry)) {

            }else if ((data) && (pagetry)) {

            }else if ((!data) && (pagetry)) {

            }else {

            }
        }
        else if (proposal == "proposal"){
            let data = JSON.parse(localStorage.getItem("searchDatatpproposal3"));
            let pagetry = JSON.parse(localStorage.getItem("freezetpproposal3"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`tpProposal3`, JSON.stringify(e));
            if ((data) && (!pagetry)) {

            }else if ((data) && (pagetry)) {

            }else if ((!data) && (pagetry)) {

            }else {

            }
        }
        else if (DeclinedQuery == "DeclinedQuery"){
            let data = JSON.parse(localStorage.getItem("searchDatatpproposal4"));
            let pagetry = JSON.parse(localStorage.getItem("freezetpproposal4"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`tpProposal4`, JSON.stringify(e));
            if ((data) && (!pagetry)) {

            }else if ((data) && (pagetry)) {

            }else if ((!data) && (pagetry)) {

            }else {

            }
        }
        else if (AllPayment == "AllPayment"){
            let data = JSON.parse(localStorage.getItem("searchDatatppayment1"));
            let pagetry = JSON.parse(localStorage.getItem("freezetppayment1"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`tpPayment1`, JSON.stringify(e));
            if ((data) && (!pagetry)) {

            }else if ((data) && (pagetry)) {

            }else if ((!data) && (pagetry)) {

            }else {

            }
        }
        else if (Unpaid == "Unpaid"){
            let data = JSON.parse(localStorage.getItem("searchDatatppayment2"));
            let pagetry = JSON.parse(localStorage.getItem("freezetppayment2"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`tpPayment2`, JSON.stringify(e));
            if ((data) && (!pagetry)) {

            }else if ((data) && (pagetry)) {

            }else if ((!data) && (pagetry)) {

            }else {

            }
        }
        else if (Paid == "Paid"){
            let data = JSON.parse(localStorage.getItem("searchDatatppayment3"));
            let pagetry = JSON.parse(localStorage.getItem("freezetppayment3"));
            let val = pagetry?.val;
            let field = pagetry?.field;
            localStorage.setItem(`tpPayment3`, JSON.stringify(e));
            if ((data) && (!pagetry)) {

            }else if ((data) && (pagetry)) {

            }else if ((!data) && (pagetry)) {

            }else {

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
                        let data = res.data.result;
                        let all = [];
                        let customId = 1;
                        if (e > 1) {
                            customId = allEnd * (e - 1) + 1;
                        }
                        data.map((i) => {
                            let data = {
                                ...i,
                                cid: customId,
                            };
                            customId++;
                            all.push(data);
                        });
                        setData(all);
                        setOnPage(e);
                        // setRecords(res.data.result.length);
                        const dynamicPage = Math.ceil(count / allEnd);
                        // console.log(dynamicPage, "to check dynamic page");
                        setTotalPages(dynamicPage)
                        let rem = (e - 1) * allEnd;
                        let end = e * allEnd;
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
            // if (index === "tpquery1") {
            //     localStorage.setItem(`tpQuery1`, JSON.stringify(1));
            // }else if (index === "tpquery2"){
            //     localStorage.setItem(`tpQuery2`, JSON.stringify(1));
            // }
            // else if (index === "tpquery3") {
            //     localStorage.setItem(`tpQuery3`, JSON.stringify(1));
            // } 
            
            // else {
            // }
            // console.log(resetTrigger, "reset at trigger");
        }
    }, [resetTrigger]);

    useEffect(() => {
        console.log("useEffect count", count);
        if (count > 0) {
            // const N = Math.ceil(count / allEnd);
            // const arr = Array.from({ length: N }, (_, index) => index + 1);
            // setDefaultPage(arr);
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

    // useEffect(() => {
    //     console.log('in useEffect pageno', pageno);
    //     if (pageno > 1) {
    //         setPage(pageno);
    //         setAtpage(pageno);
    //         setting(pageno);
    //         setOnPage(pageno);
    //     } else {
    //         setPage(1);
    //         setAtpage(1);
    //         setOnPage(1);
    //         setting(1);
    //     }
    // }, [pageno]);



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
                                    setPage(e.target.value);
                                    getNewPage(e.target.value);
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


export default Paginator;
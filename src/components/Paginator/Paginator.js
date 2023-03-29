import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useHistory } from "react-router";


function Paginator(props) {
    let allEnd = Number(localStorage.getItem("tp_record_per_page"));
    const history = useHistory();
    const [count, setCount] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [big, setBig] = useState(1);
    const [end, setEnd] = useState(50);
    const [page, setPage] = useState(0);
    const [atPage, setAtpage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sortVal, setSortVal] = useState(0);
    const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);

    //page counter
    const firstChunk = () => {
        setAtpage(1);
        setPage(1);
        // getMessage(1);
    };
    const prevChunk = () => {
        if (atPage > 1) {
            setAtpage((atPage) => atPage - 1);
        }
        setPage(Number(page) - 1);
        // getMessage(Number(page) - 1);
    };
    const nextChunk = () => {
        if (atPage < totalPages) {
            setAtpage((atPage) => atPage + 1);
        }
        setPage(Number(page) + 1);
        // getMessage(Number(page) + 1);
    };
    const lastChunk = () => {
        setPage(defaultPage.at(-1));
        // getMessage(defaultPage.at(-1));
        setAtpage(totalPages);
    };

    return (
        <div className="customPagination">
            <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                <span>
                    {big}-{end} of {count}
                </span>
                <span className="d-flex">
                    <button
                        className="navButton mx-1"
                        onClick={(e) => firstChunk()}
                    >
                        &lt; &lt;
                    </button>

                    {page > 1 ? (
                        <button
                            className="navButton mx-1"
                            onClick={(e) => prevChunk()}
                        >
                            &lt;
                        </button>
                    ) : (
                        ""
                    )}
                    <div
                        style={{
                            display: "flex",
                            maxWidth: "70px",
                            width: "100%",
                        }}
                    >
                        <select
                            value={page}
                            onChange={(e) => {
                                setPage(e.target.value);
                                //   getMessage(e.target.value);
                            }}
                            className="form-control"
                        >
                            {defaultPage.map((i) => (
                                <option value={i}>{i}</option>
                            ))}
                        </select>
                    </div>
                    {defaultPage.length > page ? (
                        <button
                            className="navButton mx-1"
                            onClick={(e) => nextChunk()}
                        >
                            &gt;
                        </button>
                    ) : (
                        ""
                    )}
                    <button
                        className="navButton mx-1"
                        onClick={(e) => lastChunk()}
                    >
                        &gt; &gt;
                    </button>
                </span>
            </div>
        </div>
    )
}


export default Paginator;
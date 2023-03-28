import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Allocation.css";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import History from "./History";
import Swal from "sweetalert2";
import AdminFilter from "../../components/Search-Filter/AdminFilter";
import DataTablepopulated from "../DataTablepopulated/DataTabel";
import {
  DeleteIcon,
  DiscussProposal,
} from "../../components/Common/MessageIcon";

function PendingAllocation({ CountPendingForAllocation }) {
  const myRef = useRef([]);
  const [pendingData, setPendingData] = useState([]);
  const [history, setHistory] = useState([]);
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const [modal, setModal] = useState(false);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const toggle = (key) => {
    if (key.length > 0) {
      setModal(!modal);
      if (modal === false) {
        setScrolledTo(key);
      }
      fetch(`${baseUrl}/admin/getQueryHistory?q_id=${key}`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/vnd.github.cloak-preview",
          uit: token,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          setHistory(response.result);
        })
        .catch((error) =>
          Swal.fire({
            tilte: "error",
            html: error,
            icon: "error",
          })
        );
    } else {
      setModal(!modal);
    }
  };
  useEffect(() => {
    setPage(1);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));

    let searchData = JSON.parse(localStorage.getItem(`searchDataadquery2`));
    if (!searchData) {
      getPendingForAllocation(1);
    }
  }, []);
  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [modal]);
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getPendingForAllocation(1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(page - 1);
    getPendingForAllocation(page - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(page + 1);
    getPendingForAllocation(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getPendingForAllocation(defaultPage.at(-1));
    setAtpage(totalPages);
  };

  const getPendingForAllocation = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));

    if (e) {
      axios
        .get(`${baseUrl}/admin/pendingAllocation?page=${e}`, myConfig)
        .then((res) => {
          let droppage = [];
          if (res.data.code === 1) {
            let data = res.data.result;
            setRecords(res.data.result.length);
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
            setPendingData(all);

            setCountNotification(res.data.total);
            let dynamicPage = Math.round(res.data.total / 50);
            let rem = (e - 1) * allEnd;
            let end = e * allEnd;
            if (e === 1) {
              setBig(rem + e);
              setEnd(end);
            } else {
              setBig(rem + 1);
              setEnd(end);
            }
            for (let i = 1; i < dynamicPage; i++) {
              droppage.push(i);
            }
            setDefaultPage(droppage);
          }
        });
    }
  };
  const sortMessage = (val, field) => {
    axios
      .get(
        `${baseUrl}/tl/getNotification?orderby=${val}&orderbyfield=${field}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];
          let sortId = 1;
          if (page > 1) {
            sortId = big;
          }
          res.data.result.map((i) => {
            let data = {
              ...i,
              cid: sortId,
            };
            sortId++;
            all.push(data);
          });

          setPendingData(all);
        }
      });
  };
  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div id={row.id} ref={(el) => (myRef.current[row.id] = el)}>
            {rowIndex + 1}
          </div>
        );
      },
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Date",
      dataField: "created",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Query no",
      dataField: "assign_no",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/admin_queries/${row.id}`,
                index: 1,
                routes: "queriestab",
              }}
            >
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      text: "Category",
      dataField: "parent_id",
      sort: true,
    },
    {
      text: "Sub category",
      dataField: "cat_name",
      sort: true,
    },
    {
      text: "Client name",
      dataField: "name",
      sort: true,
    },
    {
      text: "Status",
      dataField: "status",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status} /
              {row.status == "Inprogress Query" ? (
                <p className="inprogress">{row.statusdescription}</p>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      text: "Action",
      dataField: "",

      formatter: function (cell, row) {
        return (
          <>
            {row.is_assigned === "1" ? (
              <p className="inprogress">
                Allocated to {row.tname} on
                <p>{row.allocation_time}</p>
              </p>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Link to={`/admin_queryassing/${row.id}`}>
                  <DiscussProposal titleName="Assign to" />
                </Link>

                <Link to={`/admin/query_rejection/${row.id}`}>
                  <DeleteIcon titleName="Decline Query" />
                </Link>
              </div>
            )}
          </>
        );
      },
    },
    {
      text: "History",
      dataField: "",

      formatter: function (cell, row) {
        return (
          <>
            <button
              type="button"
              className="autoWidthBtn"
              div
              id={row.id}
              ref={(el) => (myRef.current[row.id] = el)}
              onClick={() => toggle(row.id)}
            >
              History
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setPendingData}
            getData={getPendingForAllocation}
            pendingAlloation="pendingAlloation"
            setRecords={setRecords}
            records={records}
            index="adquery2"
          />
        </CardHeader>
        <CardBody className="card-body">
          <CardHeader>
            <Row>
              <Col md="6"></Col>
              <Col md="6" align="right">
                <div className="customPagination">
                  <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                    <span>
                      {big}-{end} of {countNotification}
                    </span>
                    <span className="d-flex">
                      <button
                        className="navButton mx-1"
                        onClick={(e) => firstChunk()}
                      >
                        &lt; &lt;
                      </button>

                      <button
                        className="navButton mx-1"
                        onClick={(e) => prevChunk()}
                      >
                        &lt;
                      </button>
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
                            getPendingForAllocation(e.target.value);
                          }}
                          className="form-control"
                        >
                          {defaultPage.map((i) => (
                            <option value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        className="navButton mx-1"
                        onClick={(e) => nextChunk()}
                      >
                        &gt;
                      </button>
                      <button
                        className="navButton mx-1"
                        onClick={(e) => lastChunk()}
                      >
                        &gt; &gt;
                      </button>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </CardHeader>
          {/* <Records records={records} /> */}
          <DataTablepopulated
            bgColor="#55425f"
            keyField={"assign_no"}
            data={pendingData}
            columns={columns}
          ></DataTablepopulated>
          <History history={history} toggle={toggle} modal={modal} />
        </CardBody>
      </Card>
    </>
  );
}

export default React.memo(PendingAllocation);

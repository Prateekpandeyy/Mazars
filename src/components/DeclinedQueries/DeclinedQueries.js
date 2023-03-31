import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";
import AdminFilter from "../Search-Filter/AdminFilter";
import Records from "../../components/Records/Records";
import DiscardReport from "../../pages/Admin/AssignmentTab/DiscardReport";
import DataTablepopulated from "../DataTablepopulated/DataTabel";
import { ViewDiscussionIcon } from "../../components/Common/MessageIcon";

function DeclinedQueries() {
  const [pendingData, setPendingData] = useState([]);
  const [records, setRecords] = useState([]);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [assignNo, setAssignNo] = useState("");
  const token = window.localStorage.getItem("adminToken");
  const [scrolledTo, setScrolledTo] = useState("");
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [accend, setAccend] = useState(false);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const myRef = useRef([]);
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    setPage(1);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));

    let searchData = JSON.parse(localStorage.getItem(`searchDataadquery4`));
    if (!searchData) {
      getPendingForPayment(1);
    }
  }, []);
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getPendingForPayment(1);
    localStorage.setItem("adminqp3", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getPendingForPayment(page - 1);
    localStorage.setItem("adminqp4", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getPendingForPayment(page + 1);
    localStorage.setItem("adminqp4", Number(page) + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getPendingForPayment(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("adminqp4", defaultPage.at(-1));
  };
  const getPendingForPayment = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let remainApiPath = "";
    let searchData = JSON.parse(localStorage.getItem(`searchDataadquery4`));
    if (searchData) {
      remainApiPath = `/admin/declinedQueries?page=${e}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&status=${searchData?.p_status}&pcat_id=${
        searchData.pcatId
      }&qno=${searchData?.query_no}`;
    } else {
      remainApiPath = `admin/declinedQueries?page=${e}`;
    }
    if (e) {
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
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
          let end = e * allEnd;
          setCountNotification(res.data.total);
          if (end > res.data.total) {
            end = res.data.total;
          }
          let dynamicPage = Math.ceil(res.data.total / allEnd);

          let rem = (e - 1) * allEnd;

          if (e === 1) {
            setBig(rem + e);
            setEnd(end);
          } else {
            setBig(rem + 1);
            setEnd(end);
          }
          for (let i = 1; i <= dynamicPage; i++) {
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
        `${baseUrl}/admin/declinedQueries?orderby=${val}&orderbyfield=${field}`,
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

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key);
    }
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [ViewDiscussion]);

  const columns = [
    {
      text: "S.no",
      dataField: "cid",
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Date",
      dataField: "created",

      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
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
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 2);
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/admin_queries/${row.id}`,
                index: 3,
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
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 3);
      },
    },
    {
      text: "Sub category",
      dataField: "cat_name",

      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 4);
      },
    },
    {
      text: "Client name",
      dataField: "name",
      sort: true,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
      },
    },

    {
      text: "Status",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status} /
              {row.status == "Inprogress Query" ? (
                <p className="inprogress">{row.statusdescription}</p>
              ) : row.status == "Declined Query" ? (
                <p className="declined">{row.statusdescription}</p>
              ) : row.status == "Completed Query" ? (
                <p className="completed">{row.statusdescription}</p>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      text: "Action",
      dataField: "",

      formatter: function forma(cell, row) {
        return (
          <>
            <span
              onClick={() => ViewDiscussionToggel(row.assign_no)}
              className="ml-1"
            >
              <ViewDiscussionIcon />
            </span>
          </>
        );
      },
    },
  ];
  const resetPaging = () => {
    setPage(1);
    setBig(1);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setPendingData}
            getData={getPendingForPayment}
            declinedQueries="declinedQueries"
            setRecords={setRecords}
            records={records}
            resetPaging={resetPaging}
            setCountNotification={setCountNotification}
            index="adquery4"
          />
        </CardHeader>
        <CardBody>
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
                            getPendingForPayment(e.target.value);
                            localStorage.setItem("adminqp4", e.target.value);
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
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getPendingForPayment}
            headColor="#6e557b"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default DeclinedQueries;

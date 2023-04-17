import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
function FeedbackTab() {
  const userid = window.localStorage.getItem("adminkey");
  const [feedbackData, setFeedBackData] = useState([]);
  const [feedbackNumber, setfeedbackNumber] = useState(0);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const [accend, setAccend] = useState(false);
  const [prev, setPrev] = useState("");
  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (accend === column.dataField || prev === column.dataField) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("adminFeedback", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div
        className={
          isActive === true
            ? "d-flex filterActive text-white w-100 flex-wrap"
            : "d-flex text-white w-100 flex-wrap"
        }
      >
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {accend === column.dataField ? (
            <ArrowDropDownIcon />
          ) : (
            <ArrowDropUpIcon />
          )}
        </div>
      </div>
    );
  }

  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminFeedback"));
    if (!localPage) {
      localPage = 1;
    }
    setPrev(localStorage.getItem("adminFeedback"));
    setPage(localPage);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    setAccend(localStorage.getItem("accendFeedback"));
    getFeedback(localPage);
  }, [userid]);
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getFeedback = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let sortVal = JSON.parse(localStorage.getItem("sortedfeedback"));
    let orderBy = 0;
    let fieldBy = 0;

    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    if (e) {
      axios
        .get(
          `${baseUrl}/admin/getFeedback?page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`,
          myConfig
        )
        .then((res) => {
          let droppage = [];

          if (res.data.code === 1) {
            let data = res.data.result;
            setfeedbackNumber(res.data.total);
            setCountNotification(res.data.total);
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
            setFeedBackData(all);

            let end = e * allEnd;

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
    let sort = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem("adminFeedback", 1);
    localStorage.setItem("sortedfeedback", JSON.stringify(sort));
    axios
      .get(
        `${baseUrl}/admin/getFeedback?orderby=${val}&orderbyfield=${field}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];
          setPage(1);
          setBig(1);
          setEnd(Number(localStorage.getItem("admin_record_per_page")));
          let sortId = 1;

          res.data.result.map((i) => {
            let data = {
              ...i,
              cid: sortId,
            };
            sortId++;
            all.push(data);
          });

          setFeedBackData(all);
        }
      });
  };

  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getFeedback(1);
    localStorage.setItem("adminFeedback", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getFeedback(page - 1);
    localStorage.setItem("adminFeedback", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getFeedback(page + 1);
    localStorage.setItem("adminFeedback", Number(page) + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getFeedback(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("adminFeedback", defaultPage.at(-1));
  };

  const columns = [
    {
      text: "S.No",
      dataField: "cid",

      headerStyle: () => {
        return { width: "10px" };
      },
    },
    {
      text: "Date",
      dataField: "created",
      sort: true,
      headerFormatter: headerLabelFormatter,
      headerStyle: () => {
        return { width: "60px" };
      },
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendFeedback", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendFeedback");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
    },

    {
      text: "Query No",
      dataField: "assign_no",
      headerStyle: () => {
        return { width: "40px" };
      },
      formatter: function nameFormatter(cell, row) {
        return <>{row.assign_no}</>;
      },
      headerFormatter: headerLabelFormatter,
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
    },
    {
      text: "Feedback",

      dataField: "feedback",

      headerStyle: () => {
        return { width: "150px" };
      },

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.admin_read == "0" ? (
                <div
                  style={{
                    cursor: "pointer",
                    wordBreak: "break-word",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  title="unread"
                >
                  <p onClick={() => readNotification(row.id)}>
                    {row.feedback} - By {row.name}
                  </p>
                  <i className="fa fa-bullseye" style={{ color: "red" }}></i>
                </div>
              ) : (
                <div
                  style={{
                    cursor: "pointer",
                    wordBreak: "break-word",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  title="read"
                >
                  <p>
                    {row.feedback} - By {row.name}
                  </p>
                  <i className="fa fa-bullseye" style={{ color: "green" }}></i>
                </div>
              )}
            </div>
          </>
        );
      },
    },
  ];

  // readnotification
  const readNotification = (id) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("type", "admin");

    axios({
      method: "POST",
      url: `${baseUrl}/admin/markReadFeedback`,
      headers: {
        uit: token,
      },
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          getFeedback();
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <Layout
        adminDashboard="adminDashboard"
        adminUserId={userid}
        feedbackNumber={feedbackNumber}
      >
        <Card>
          <CardHeader>
            <Row>
              <Col md="6">
                <CustomHeading>Feedback</CustomHeading>
              </Col>
              <Col md="6" align="right">
                <div className="customPagination">
                  <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                    <span className="customPaginationSpan">
                      {big}-{end} of {countNotification}
                    </span>
                    <span className="d-flex">
                      {page > 1 ? (
                        <>
                          <button
                            className="navButton"
                            onClick={(e) => firstChunk()}
                          >
                            <KeyboardDoubleArrowLeftIcon />
                          </button>
                          <button
                            className="navButton"
                            onClick={(e) => prevChunk()}
                          >
                            <KeyboardArrowLeftIcon />
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="navButtonSelectDiv">
                        <select
                          value={page}
                          onChange={(e) => {
                            setPage(Number(e.target.value));
                            getFeedback(Number(e.target.value));
                            localStorage.setItem(
                              "adminFeedback",
                              Number(e.target.value)
                            );
                          }}
                          className="form-control"
                        >
                          {defaultPage.map((i) => (
                            <option value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                      {defaultPage.length > page ? (
                        <>
                          <button
                            className="navButton"
                            onClick={(e) => nextChunk()}
                          >
                            <KeyboardArrowRightIcon />
                          </button>
                          <button
                            className="navButton"
                            onClick={(e) => lastChunk()}
                          >
                            <KeyboardDoubleArrowRightIcon />
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col md="6">
                <CustomHeading>Feedback</CustomHeading>
              </Col>
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
                            getFeedback(e.target.value);
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
            </Row> */}
          </CardHeader>
          <CardBody>
            <DataTablepopulated
              bgColor="#081f8f"
              keyField="id"
              data={feedbackData}
              columns={columns}
            ></DataTablepopulated>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}

export default FeedbackTab;

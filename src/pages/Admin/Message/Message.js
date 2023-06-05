import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 10px",
  },
}));
function Message(props) {
  const classes = useStyles();

  const userId = window.localStorage.getItem("adminkey");
  const [query, setQuery] = useState([]);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [defaultPage, setDefaultPage] = useState([]);
  const [turnGreen, setTurnGreen] = useState(false);
  const [accend, setAccend] = useState(false);
  const [prev, setPrev] = useState("");
  const history = useHistory();
  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminMessage"));
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    if ((history.action == 'POP')) {
      setAccend(localStorage.getItem("accendMessage"));
      setTurnGreen(true);
      }
      setPrev(localStorage.getItem("adminMessage"));
      if ((history.action == 'POP')&& (localPage)) {
        setPage(localPage);
        getMessage(localPage);
      } else {
        localStorage.removeItem(`sortedMessage`);
        localStorage.removeItem("prevMessage");
        localStorage.removeItem("accendMessage");
        setPage(1);
        getMessage(1);
      }
  }, []);
  // function headerLabelFormatter(column, colIndex) {
  //   let isActive = true;

  //   if (accend === column.dataField || prev === column.dataField) {
  //     isActive = true;
  //     setPrev(column.dataField);
  //     localStorage.setItem("adminMessage", column.dataField);
  //   } else {
  //     isActive = false;
  //   }
  //   return (
  //     <div
  //       className={
  //         isActive === true
  //           ? "d-flex filterActive text-white w-100 flex-wrap"
  //           : "d-flex text-white w-100 flex-wrap"
  //       }
  //     >
  //       <div style={{ display: "flex", color: "#fff" }}>
  //         {column.text}
  //         {accend === column.dataField ? (
  //           <ArrowDropDownIcon />
  //         ) : (
  //           <ArrowDropUpIcon />
  //         )}
  //       </div>
  //     </div>
  //   );
  // }
  function headerLabelFormatter(column, colIndex) {
    let isActive = null;

    if (
      ((localStorage.getItem("accendMessage") === column.dataField)&& (turnGreen == true)) ||
      ((localStorage.getItem("prevMessage") === column.dataField)&& (turnGreen == true))
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevMessage", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendMessage") === column.dataField ? (
            <ArrowDropDownIcon
              className={isActive === true ? classes.isActive : ""}
            />
          ) : (
            <ArrowDropUpIcon
              className={isActive === true ? classes.isActive : ""}
            />
          )}
        </div>
      </div>
    );
  }
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const getMessage = (e) => {
    setLoading(true);
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let sortVal = JSON.parse(localStorage.getItem("sortedMessage"));
    let orderBy = 0;
    let fieldBy = 0;

    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    if (e) {
      axios
        .get(
          `${baseUrl}/admin/getNotification?id=${JSON.parse(
            userId
          )}&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`,
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
            setQuery(all);
            setLoading(false);
            setCountNotification(res.data.total);
            let dynamicPage = Math.ceil(res.data.total / allEnd);
            let rem = (e - 1) * allEnd;
            let end = e * allEnd;
            if (e === 1) {
              setBig(rem + e);
              setEnd(end);
            } else {
              setBig(rem + 1);
              setEnd(end);
            }
            for (let i = 1; i <= dynamicPage; i++) {
              droppage.push(Number(i));
            }
            setDefaultPage(droppage);
          }
        });
    }
  };
  const sortMessage = (val, field) => {
    setLoading(true);
    let sort = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem("adminMessage", 1);
    localStorage.setItem("sortedMessage", JSON.stringify(sort));
    axios
      .get(
        `${baseUrl}/admin/getNotification?orderby=${val}&orderbyfield=${field}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setTurnGreen(true);
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
          setLoading(false);
          setQuery(all);
          setSortVal(field);
        }
      });
  };

  //page counter
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getMessage(1);
    localStorage.setItem("adminMessage", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getMessage(page - 1);
    localStorage.setItem("adminMessage", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getMessage(page + 1);
    localStorage.setItem("adminMessage", Number(page) + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getMessage(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("adminMessage", defaultPage.at(-1));
  };

  const columns = [
    {
      text: "S.No",
      dataField: "cid",

      headerStyle: () => {
        return { fontSize: "12px", width: "20px" };
      },
    },

    {
      text: "Date",
      dataField: "setdate",
      headerFormatter: headerLabelFormatter,
      headerStyle: () => {
        return { fontSize: "12px", width: "60px" };
      },
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendMessage", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendMessage");
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
      headerFormatter: headerLabelFormatter,
      headerStyle: () => {
        return { fontSize: "12px", width: "30px" };
      },
      formatter: function nameFormatter(cell, row) {
        return <>{row.assign_no}</>;
      },
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendMessage", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendMessage");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 2);
      },
    },
    {
      text: "Message",

      headerStyle: () => {
        return { fontSize: "12px", width: "180px" };
      },

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link to={`/admin_view-notification/${row.id}`}>
              {row.is_read == "0" ? (
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    wordBreak: "break-word",
                  }}
                  onClick={() => readNotification(row.id)}
                  title="unread"
                >
                  <p>{row.message}</p>
                  <i className="fa fa-bullseye" style={{ color: "red" }}></i>
                </div>
              ) : (
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    wordBreak: "break-word",
                  }}
                  title="read"
                >
                  <p>{row.message}</p>
                  <i className="fa fa-bullseye" style={{ color: "green" }}></i>
                </div>
              )}
            </Link>
          </>
        );
      },
    },
  ];

  // readnotification
  const readNotification = (id) => {
    axios
      .get(`${baseUrl}/admin/markReadNotification?id=${id}`, myConfig)
      .then(function (response) {})
      .catch((error) => {});
  };

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button className="autoWidthBtn" onClick={() => history.goBack()}>
                Go Back
              </button>
            </Col>
            <Col md="8">
              <CustomHeading>Message</CustomHeading>
            </Col>
          </Row>
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
                          setPage(Number(e.target.value));
                          getMessage(Number(e.target.value));
                          localStorage.setItem(
                            "adminMessage",
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
            </Col>
          </Row>
        </CardHeader>
        {page && (
          <CardBody
            style={{ display: "flex", height: "80vh", overflowY: "scroll" }}
          >
            <DataTablepopulated
              bgColor="#42566a"
              keyField={"assign_no"}
              data={query}
              columns={columns}
            ></DataTablepopulated>
          </CardBody>
        )}
      </Card>
    </Layout>
  );
}

export default Message;

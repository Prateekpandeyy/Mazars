import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import CustomHeading from "../../../components/Common/CustomHeading";
import { Link } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import { useHistory } from "react-router";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function Message(props) {
  const userId = window.localStorage.getItem("tpkey");
  let allEnd = Number(localStorage.getItem("tp_record_per_page"));

  const [query, setQuery] = useState([]);
  const [atPage, setAtpage] = useState(1);
  const [count, setCount] = useState("0");

  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const history = useHistory();
  const [addPaymentModal, setPaymentModal] = useState(false);
  const token = window.localStorage.getItem("tptoken");
  const [totalPages, setTotalPages] = useState(1);
  const [accend, setAccend] = useState(false);
  const [page, setPage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const paymentHandler = (key) => {
    setPaymentModal(!addPaymentModal);
  };


  function headerLabelFormatter(column) {
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        {column.text}
        {accend === column.dataField ? (
          <ArrowDownwardIcon />
        ) : (
          <ArrowUpwardIcon />
        )}
      </div>
    );
  }

  useEffect(() => {
    setPage(1);
    setEnd(allEnd);
    getMessage(1);
  }, []);

  // set intial query here
  const getMessage = (e) => {
    // localStorage.setItem(`tpMsg`, JSON.stringify(e));
    console.log(e, "page test");
    if (e) {
      axios
        .get(
          `${baseUrl}/tl/getNotification?id=${JSON.parse(userId)}&page=${e}`,
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
            setCount(res.data.total)
            // setCountNotification(res.data.total);
            let dynamicPage = Math.round(res.data.total / allEnd);
            let rem = (e - 1) * allEnd;
            let end = e * allEnd;
            if (e === 1) {
              setBig(rem + e);
              setEnd(end);
            } else if ((e == (dynamicPage))) {
              setBig(rem + 1);
              setEnd(res.data.total);
              // console.log("e at last page");
            }
            else {
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
    let remainApiPath = "";
    localStorage.setItem(`tpMessage1`, JSON.stringify(1))
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    }
    localStorage.setItem(`freezetpMsg1`, JSON.stringify(obj));
    remainApiPath = `tl/getNotification?page=1&orderby=${val}&orderbyfield=${field}`
    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];
          let sortId = 1;
          // let record =Number(localStorage.getItem("tp_record_per_page"))
          // let startAt = 1;
          // if (onPage > 1) {
          //   sortId = 1;
          // }
          res.data.result.map((i) => {
            let data = {
              ...i,
              cid: sortId,
            };
            sortId++;
            all.push(data);
          });
          setQuery(all);
          setCount(res.data.total);
          setAtpage(1);
          setPage(1);
          setBig(1);
          setEnd(allEnd);
        }
      });
  };


  //page counter
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getMessage(1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getMessage(Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getMessage(Number(page) + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getMessage(defaultPage.at(-1));
    setAtpage(totalPages);
  };
  //page counter Ends here

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return row.cid;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "30px" };
      },
    },

    {
      text: "Date",
      dataField: "setdate",
      headerFormatter: headerLabelFormatter,
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px", width: "60px" };
      },
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          console.log("This is sorting 1");
          localStorage.setItem("tpArrowQuery1", field);
        } else {
          setAccend("");
          console.log("This is sorting 2");
          localStorage.removeItem("tpArrowQuery1");
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
      sort: true,
      onSort: (field, order) => {
        let val = 0;

        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("tpArrowQuery1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery1");
        }

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
            {/* <Link to={`/customer/my-assingment/${row.id}`}> */}
            {row.assign_no}
            {/* </Link> */}
          </>
        );
      },
    },
    {
      text: "Message",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px", width: "180px" };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link to={`/taxprofessional_view-notification/${row.id}`}>
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
                  <i class="fa fa-bullseye" style={{ color: "red" }}></i>
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
                  <i class="fa fa-bullseye" style={{ color: "green" }}></i>
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
      .get(`${baseUrl}/tl/markReadNotification?id=${id}`, myConfig)
      .then(function (response) { })
      .catch((error) => { });
  };

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userId}>
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
            <Col md="12" align="right">
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
                            getMessage(e.target.value);
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
            <PaymentModal
              paymentHandler={paymentHandler}
              addPaymentModal={addPaymentModal}
            />
          </CardBody>
        )}
      </Card>
    </Layout>
  );
}

export default Message;
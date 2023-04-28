import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import { useHistory } from "react-router";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

function Message(props) {
  const history = useHistory();
  const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  const userId = window.localStorage.getItem("tlkey");
  const [query, setQuery] = useState([]);
  const [addPaymentModal, setPaymentModal] = useState(false);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1"]);
  const classes = useStyles();
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [count, setCount] = useState("0");
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState("");
  const [resetTrigger, setresetTrigger] = useState(false);
  const paymentHandler = (key) => {
    setPaymentModal(!addPaymentModal);
  };
  useEffect(() => {
    let pageno = Number(JSON.parse(localStorage.getItem("tlMsg")));
    setEnd(Number(localStorage.getItem("tl_record_per_page")));
    if (pageno) {
      setPage(pageno);
      getMessage(pageno);
    } else {
      setPage(1);
      getMessage(1);
    }
  }, []);
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  function headerLabelFormatter(column) {
    return (
      <div>
        {column.dataField === isActive ? (
          <div className="d-flex text-white w-100 flex-wrap">
            {column.text}
            {accend === column.dataField ? (
              <ArrowDropUpIcon
                className={turnGreen === true ? classes.isActive : ""}
              />
            ) : (
              <ArrowDropDownIcon
                className={turnGreen === true ? classes.isActive : ""}
              />
            )}
          </div>
        ) : (
          <div className="d-flex text-white w-100 flex-wrap">
            {column.text}
            {accend === column.dataField ? (
              <ArrowDropUpIcon />
            ) : (
              <ArrowDropDownIcon />
            )}
          </div>
        )}
      </div>
    );
  }

  const getMessage = (e) => {
    let allEnd = Number(localStorage.getItem("tl_record_per_page"));
    let pagetry = JSON.parse(localStorage.getItem("freezetlMsg"));
    localStorage.setItem(`tlMsg`, JSON.stringify(e));
    let remainApiPath = "";
    let val = pagetry?.val;
    let field = pagetry?.field;
    console.log(allEnd);
    setAtpage(e);

    if (e) {
      if (pagetry) {
        remainApiPath = `tl/getNotification?id=${JSON.parse(
          userId
        )}&page=${e}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getNotification?id=${JSON.parse(userId)}&page=${e}`;
      }
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
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

          setCountNotification(res.data.total);
          let dynamicPage = Math.round(res.data.total / allEnd);
          let rem = (e - 1) * allEnd;
          let end = e * allEnd;
          if (e === 1) {
            setBig(rem + e);
            setEnd(end);
          } else if (e == dynamicPage) {
            setBig(rem + 1);
            setEnd(res.data.total);
            // console.log("e at last page");
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
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    };
    localStorage.setItem(`tlMsg`, JSON.stringify(1));
    localStorage.setItem(`freezetlMsg`, JSON.stringify(obj));

    axios
      .get(
        `${baseUrl}/tl/getNotification?page=1&orderby=${val}&orderbyfield=${field}`,
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
          setQuery(all);
          setCount(res.data.total);
          setTurnGreen(true);
          // setting(1);
          setAtpage(1);
          setPage(1);
        }
      });
  };

  const setting = (e) => {
    let droppage = [];
    // setAtpage(e);
    // setPage(e);
    const dynamicPage = Math.ceil(count / allEnd);
    console.log(dynamicPage, "to check dynamic page");
    setTotalPages(dynamicPage);
    let rem = (e - 1) * allEnd;
    let end = e * allEnd;
    if (dynamicPage > 1) {
      if (e == 1) {
        setBig(rem + e);
        setEnd(allEnd);
      } else if (e == dynamicPage) {
        setBig(rem + 1);
        setEnd(count);
      } else {
        setBig(rem + 1);
        setEnd(end);
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

  //page counter
  const firstChunk = () => {
    if (atPage > 1) {
      setAtpage(1);
      setPage(1);
      getMessage(1);
    }
  };
  const prevChunk = () => {
    if (atPage <= defaultPage.at(-1)) {
      setAtpage((atPage) => atPage - 1);
      setPage(Number(page) - 1);
      getMessage(Number(page) - 1);
    }
  };
  const nextChunk = () => {
    if (atPage > 0 && atPage < defaultPage.at(-1)) {
      setAtpage((atPage) => atPage + 1);
      setPage(Number(page) + 1);
      getMessage(Number(page) + 1);
    }
  };
  const lastChunk = () => {
    if (atPage < defaultPage.at(-1)) {
      setPage(defaultPage.at(-1));
      getMessage(defaultPage.at(-1));
      setAtpage(defaultPage.at(-1));
    }
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return row.cid;
      },
      headerStyle: () => {
        return { width: "50px" };
      },
    },

    {
      text: "Date",
      dataField: "setdate",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tlArrowMsg", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowMsg");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },

      headerStyle: () => {
        return { fontSize: "12px", width: "60px" };
      },
    },

    {
      text: "Query No",
      dataField: "assign_no",
      headerStyle: () => {
        return { fontSize: "12px", width: "30px" };
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tlArrowMsg", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowMsg");
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
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px", width: "180px" };
      },

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link to={`/teamleader_view-notification/${row.id}`}>
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
      .then(function (response) {})
      .catch((error) => {});
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userId}>
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
                    {page > 1 ? (
                      <button
                        className="navButton"
                        onClick={(e) => firstChunk()}
                      >
                        <KeyboardDoubleArrowLeftIcon />
                      </button>
                    ) : (
                      ""
                    )}

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
                          getMessage(e.target.value);
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
                        className="navButton"
                        onClick={(e) => nextChunk()}
                      >
                        <KeyboardArrowRightIcon />
                      </button>
                    ) : (
                      ""
                    )}
                    {defaultPage.length > page ? (
                      <button
                        className="navButton"
                        onClick={(e) => lastChunk()}
                      >
                        <KeyboardDoubleArrowRightIcon />
                      </button>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody
          style={{ display: "flex", height: "80vh", overflowY: "scroll" }}
        >
          <DataTablepopulated
            bgColor="#42566a"
            keyField="assign_no"
            data={query}
            columns={columns}
          ></DataTablepopulated>
          <PaymentModal
            paymentHandler={paymentHandler}
            addPaymentModal={addPaymentModal}
          />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Message;

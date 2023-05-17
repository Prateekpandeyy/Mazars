import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import PaymentModal from "./PaymentModal";
import CommonServices from "../../common/common";
import { useHistory } from "react-router";
import CustomHeading from "../../components/Common/CustomHeading";
import CustomTypography from "../../components/Common/CustomTypography";
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
  const userId = window.localStorage.getItem("userid");
  const [query, setQuery] = useState([]);
  const [data, setData] = useState(null);
  const [addPaymentModal, setPaymentModal] = useState(false);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [prev, setPrev] = useState("");
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
  let history = useHistory();
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
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
  const paymentHandler = (key) => {
    setPaymentModal(!addPaymentModal);
  };

  useEffect(() => {
    getMessage(1);
  }, []);
  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("tlArrowMsg") === column.dataField ||
      localStorage.getItem("prevtlmsg") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtlmsg", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("tlArrowMsg") === column.dataField ? (
            <ArrowDropUpIcon
              className={isActive === true ? classes.isActive : ""}
            />
          ) : (
            <ArrowDropDownIcon
              className={isActive === true ? classes.isActive : ""}
            />
          )}
        </div>
      </div>
    );
  }

  const getMessage = (e) => {
    axios
      .get(
        `${baseUrl}/customers/getNotification?id=${JSON.parse(
          userId
        )}&type_list=all&page=${e}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setQuery(res.data.result);
        }
      });
  };
  const sortMessage = (e) => {
    console.log("done");
  };
  const columns = [
    {
      text: "S.No",

      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return {
          fontSize: "12px",
          width: "10px",
          backgroundColor: "rgb(61, 131, 117)",
          color: "#fff",
          border: "1px solid rgb(61, 131, 117)",
        };
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
        return {
          fontSize: "12px",
          width: "60px",
          backgroundColor: "rgb(61, 131, 117)",
          color: "#fff",
          border: "1px solid rgb(61, 131, 117)",
        };
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",
      headerStyle: () => {
        return {
          fontSize: "12px",
          width: "30px",
          backgroundColor: "rgb(61, 131, 117)",
          color: "#fff",
          border: "1px solid rgb(61, 131, 117)",
        };
      },
      formatter: function nameFormatter(cell, row) {
        return <>{row.assign_no}</>;
      },
    },
    {
      text: "Message",
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
      headerStyle: () => {
        return {
          fontSize: "12px",
          width: "180px",
          backgroundColor: "rgb(61, 131, 117)",
          color: "#fff",
          border: "1px solid rgb(61, 131, 117)",
        };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link to={`/customer_view-notification/${row.id}`}>
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
                  <CustomTypography cursor="pointer" hover="hover">
                    {row.message}
                  </CustomTypography>

                  <i class="fa fa-bullseye" style={{ color: "#BC363D" }}></i>
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
                  <CustomTypography cursor="pointer" hover="hover">
                    {row.message}
                  </CustomTypography>
                  <i class="fa fa-bullseye" style={{ color: "#348719" }}></i>
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
      .get(`${baseUrl}/customers/markReadNotification?id=${id}`, myConfig)
      .then(function (response) {})
      .catch((error) => {});
  };

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button class="autoWidthBtn" onClick={() => history.goBack()}>
                Go Back
              </button>
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
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
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={query}
            columns={columns}
            rowIndex
          />

          <PaymentModal
            paymentHandler={paymentHandler}
            addPaymentModal={addPaymentModal}
            // data={data}
            // getProposalData={getAssignmentData}
          />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Message;

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { HelpIcon } from "../../components/Common/MessageIcon";
import ModalManual from "../ModalManual/AllComponentManual";
import CustomHeading from "../../components/Common/CustomHeading";
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

function FeedbackData(props) {
  let allEnd = 50;
  const classes = useStyles();
  const userId = window.localStorage.getItem("userid");
  const [query, setQuery] = useState([]);
  const [openManual, setManual] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1"]);
  const [searchResult, setSearchResult] = useState(true);
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState("");
  const [accend, setAccend] = useState(false);
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    getMessage(1);
  }, []);
  const sortMessage = (e) => {
    console.log("done");
  };
  const getMessage = (e) => {
    axios
      .get(
        `${baseUrl}/customers/getMessage?uid=${JSON.parse(userId)}&page=${e}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setQuery(res.data.result);
        }
      });
  };

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("custArrowPay1") === column.dataField ||
      localStorage.getItem("prevcustpay1") === column.dataField
    ) {
      isActive = true;

      localStorage.setItem("prevcustpay1", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("custArrowPay1") === column.dataField ? (
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
  //page counter
  const firstChunk = () => {
    if (atPage > 0) {
      setAtpage(1);
      setPage(1);
      getMessage(1);
    } else {
    }
  };
  const prevChunk = () => {
    if (atPage < defaultPage.at(-1)) {
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
      setAtpage(totalPages);
    }
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return {
          fontSize: "12px",
          width: "10px",
          border: "1px solid #081f8f",
          color: "#fff",
          backgroundColor: "#081f8f",
        };
      },
    },
    {
      text: "Date",
      dataField: "created",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowPay1", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowPay1");
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
          border: "1px solid #081f8f",
          color: "#fff",
          backgroundColor: "#081f8f",
        };
      },
    },

    {
      text: "Query No",
      dataField: "assign_no",
      headerStyle: () => {
        return {
          fontSize: "12px",
          width: "40px",
          border: "1px solid #081f8f",
          color: "#fff",
          backgroundColor: "#081f8f",
        };
      },
      formatter: function nameFormatter(cell, row) {
        return <>{row.assign_no}</>;
      },
    },
    {
      text: "Feedback",
      dataField: "feedback",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowPay1", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowPay1");
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
          width: "150px",
          border: "1px solid #081f8f",
          color: "#fff",
          backgroundColor: "#081f8f",
        };
      },
    },
  ];

  const needHelp = () => {
    setManual(!openManual);
  };
  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CustomHeading>Feedback</CustomHeading>
            </Col>
            <Col md="5">
              <span onClick={(e) => needHelp()}>
                {" "}
                <HelpIcon />
              </span>
            </Col>
          </Row>
          <Row>
            <Col md="12" align="right">
              <div className="customPagination">
                {searchResult === true ? (
                  <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                    <span>
                      {big}-{end} of {count}
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
                ) : (
                  <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                    <span className="customPaginationSpan nullClass">
                      0 - 0 of 0
                    </span>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={query}
            columns={columns}
            rowIndex
          />
        </CardBody>
      </Card>
      <Modal isOpen={openManual} toggle={needHelp} size="lg">
        <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
        <ModalBody>
          <ModalManual tar={"feedback"} />
        </ModalBody>
      </Modal>
    </Layout>
  );
}

export default FeedbackData;

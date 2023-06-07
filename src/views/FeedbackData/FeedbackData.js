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
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

function FeedbackData(props) {
  const allEnd = Number(localStorage.getItem("cust_record_per_page"));
  // let allEnd = 50;
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
    setPage(1);
  }, []);

  const getMessage = (e) => {
    let droppage = [];
    let allEnd = Number(localStorage.getItem("cust_record_per_page"));
    let sortVal = JSON.parse(localStorage.getItem("allfeedSort"));
    let orderBy = 0;
    let fieldBy = 0;

    if (sortVal) {
      orderBy = sortVal.val;
      fieldBy = sortVal.field;
    }
    let apiPath = `customers/getFeedback?uid=${JSON.parse(
      userId
    )}&page=${e}&&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    axios.get(`${baseUrl}/${apiPath}`, myConfig).then((res) => {
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
        setCount(res.data.total);

        let dynamicPage = Math.ceil(res.data.total / allEnd);
        // if (dynamicPage === 0) {
        //   dynamicPage = 1;
        // }
        let rem = (e - 1) * allEnd;
        let end = e * allEnd;
        if (dynamicPage > 1) {
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
        } else {
          setBig(rem + e);
          if (res.data.total < allEnd) {
            setEnd(res.data.total);
          } else {
            setEnd(allEnd);
          }
        }
        console.log('dym',dynamicPage);
        for (let i = 1; i <= dynamicPage; i++) {
          droppage.push(i);
        }
        console.log('drop',droppage);
        setDefaultPage(droppage);
      }
    });
  };

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("custSorting") === column.dataField ||
      localStorage.getItem("prevCustSort") === column.dataField
    ) {
      isActive = true;

      localStorage.setItem("prevCustSort", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("custSorting") === column.dataField ? (
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
  // const firstChunk = () => {
  //   if (atPage > 0) {
  //     setAtpage(1);
  //     setPage(1);
  //     getMessage(1);
  //   } else {
  //   }
  // };
  // const prevChunk = () => {
  //   console.log(atPage, defaultPage.at(-1));
  //   if (atPage > defaultPage.at(-1)) {
  //     setAtpage((atPage) => atPage - 1);
  //     setPage(Number(page) - 1);
  //     getMessage(Number(page) - 1);
  //   }
  // };
  // const nextChunk = () => {
  //   console.log(atPage, defaultPage.at(-1));
  //   if (atPage > 0 && atPage < defaultPage.at(-1)) {
  //     setAtpage((atPage) => atPage + 1);
  //     setPage(Number(page) + 1);
  //     getMessage(Number(page) + 1);
  //   }
  // };
  // const lastChunk = () => {
  //   if (page < defaultPage.at(-1)) {
  //     setPage(defaultPage.at(-1));
  //     getMessage(defaultPage.at(-1));
  //     setAtpage(totalPages);
  //   }
  // };
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
  const sortMessage = (val, field) => {
    let remainApiPath = "";
    localStorage.setItem(`custMessage`, 1);
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    };
    localStorage.setItem(`allfeedSort`, JSON.stringify(obj));
    remainApiPath = `customers/getFeedback?id=${JSON.parse(
      userId
    )}&type_list=all&page=1&orderby=${val}&orderbyfield=${field}`;
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        let all = [];
        let sortId = 1;
        res.data.result.map((i) => {
          let data = {
            ...i,
            cid: sortId,
          };
          sortId++;
          all.push(data);
        });
        console.log("all", all);
        setQuery(all);
        setCount(res.data.total);
        setAtpage(1);
        setPage(1);
        setBig(1);
        if (count < allEnd) {
          setEnd(count);
        } else {
          setEnd(allEnd);
        }
      }
    });
  };
  const columns = [
    {
      text: "S.No",
      dataField: "cid",

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
          localStorage.setItem("custSorting", field);
        } else {
          setAccend("");
          localStorage.removeItem("custSorting");
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
          <DataTablepopulated
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

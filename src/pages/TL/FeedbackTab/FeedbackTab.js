import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import CommonServices from "../../../common/common";
import BootstrapTable from "react-bootstrap-table-next";
import { useHistory } from "react-router";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
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

function FeedbackTab() {
  const history = useHistory();
  const userid = window.localStorage.getItem("tlkey");
  const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  const [feedbackData, setFeedBackData] = useState([]);
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState("");
  const [prev, setPrev] = useState("");
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1"]);
  const [searchResult, setSearchResult] = useState(true);
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  //page counter
  const firstChunk = () => {
    if (atPage > 0) {
      setAtpage(1);
      setPage(1);
      getFeedback(1);
    } else {
    }
  };
  const prevChunk = () => {
    if (atPage < defaultPage.at(-1)) {
      setAtpage((atPage) => atPage - 1);
      setPage(Number(page) - 1);
      getFeedback(Number(page) - 1);
    }
  };
  const nextChunk = () => {
    if (atPage > 0 && atPage < defaultPage.at(-1)) {
      setAtpage((atPage) => atPage + 1);
      setPage(Number(page) + 1);
      getFeedback(Number(page) + 1);
    }
  };
  const lastChunk = () => {
    if (atPage < defaultPage.at(-1)) {
      setPage(defaultPage.at(-1));
      getFeedback(defaultPage.at(-1));
      setAtpage(totalPages);
    }
  };

  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("tlFeedback"));
    setPrev(localStorage.getItem("prevtlfeedback"));
    setAccend(localStorage.getItem("tlArrowFeedback"));
    if (pageno) {
      setPage(pageno);
      getFeedback(pageno);
    } else {
      setPage(1);
      getFeedback(1);
    }
    // getFeedback();
  }, []);

  useEffect(() => {
    if (count == 0) {
      setSearchResult(false);
    } else {
      setSearchResult(true);
    }
  }, [count]);

  const getFeedback = (e) => {
    localStorage.setItem(`tlFeedback`, JSON.stringify(e));
    let allEnd = Number(localStorage.getItem("tl_record_per_page"));
    let pagetry = JSON.parse(localStorage.getItem("freezetlFeedback"));
    let remainApiPath = "";
    let val = pagetry?.val;
    let field = pagetry?.field;
    console.log(allEnd);

    if (pagetry) {
      remainApiPath = `tl/getFeedback?tl_id=${JSON.parse(
        userid
      )}&page=${e}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `tl/getFeedback?tl_id=${JSON.parse(userid)}&page=${e}`;
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
        setFeedBackData(all);
        setCount(res.data.total);
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
  };

  // function headerLabelFormatter(column) {
  //   return (
  //     <div>
  //       {column.dataField === isActive ? (
  //         <div className="d-flex text-white w-100 flex-wrap">
  //           {column.text}
  //           {accend === column.dataField ? (
  //             <ArrowDropUpIcon
  //               className={turnGreen === true ? classes.isActive : ""}
  //             />
  //           ) : (
  //             <ArrowDropDownIcon
  //               className={turnGreen === true ? classes.isActive : ""}
  //             />
  //           )}
  //         </div>
  //       ) : (
  //         <div className="d-flex text-white w-100 flex-wrap">
  //           {column.text}
  //           {accend === column.dataField ? (
  //             <ArrowDropUpIcon />
  //           ) : (
  //             <ArrowDropUpIcon />
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("tlArrowFeedback") === column.dataField ||
      localStorage.getItem("prevtlfeedback") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtlfeedback", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("tlArrowFeedback") === column.dataField ? (
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

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    };
    localStorage.setItem(`tlFeedback`, JSON.stringify(1));
    localStorage.setItem(`freezetlFeedback`, JSON.stringify(obj));

    axios
      .get(
        `${baseUrl}/tl/getFeedback?page=1&tl_id=${JSON.parse(
          userid
        )}&orderby=${val}&orderbyfield=${field}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];
          let droppage = [];
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
          setFeedBackData(all);
          setCount(res.data.total);
          setTurnGreen(true);
          setAtpage(1);
          setPage(1);
          let dynamicPage = Math.round(res.data.total / allEnd);
        let rem = (1 - 1) * allEnd;
        let end = 1 * allEnd;
          setBig(rem + 1);
          setEnd(end);
        for (let i = 1; i <= dynamicPage; i++) {
          droppage.push(i);
        }
        setDefaultPage(droppage);
        }
      });
  };

  const columns = [
    {
      text: "S.No",
      dataField: "cid",
      // formatter: (cellContent, row, rowIndex) => {
      //   return row.cid;
      // },
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
          localStorage.setItem("tlArrowFeedback", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowFeedback");
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tlArrowFeedback", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowFeedback");
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
      text: "Feedback",
      headerStyle: () => {
        return {
          fontSize: "12px",
          width: "150px",
          border: "1px solid #081f8f",
          color: "#fff",
          backgroundColor: "#081f8f",
        };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.tl_read == "0" ? (
                <div
                  style={{
                    cursor: "pointer",
                    wordBreak: "break-word",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  onClick={() => readNotification(row.id)}
                  title="unread"
                >
                  <p>
                    {row.feedback} - By {row.name}
                  </p>
                  <i class="fa fa-bullseye" style={{ color: "red" }}></i>
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
                  <i class="fa fa-bullseye" style={{ color: "green" }}></i>
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
    formData.append("type", "tl");

    axios({
      method: "POST",
      url: `${baseUrl}/tl/markReadFeedback`,
      headers: {
        uit: token,
      },
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          // alert.success("successfully read!");
          getFeedback();
        }
      })
      .catch((error) => { });
  };

  return (
    <>
      <Layout TLDashboard="TLDashboard" TLuserId={userid}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CardTitle tag="h4">Feedback</CardTitle>
              </Col>
              <Col md="5"></Col>
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
                              getFeedback(e.target.value);
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
              bgColor="#42566a"
              keyField={"assign_no"}
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

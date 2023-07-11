import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import AdminFilter from "../../components/Search-Filter/AdminFilter";
import Records from "../../components/Records/Records";
import DataTablepopulated from "../DataTablepopulated/DataTabel";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
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
function PendingForProposals(props) {
  const classes = useStyles();
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [nonpendingData, setNonPendingData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [records, setRecords] = useState([]);
  const myRef = useRef([]);
  const myRefs = useRef([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const [jumpTo, setJumpTo] = useState("");
  

  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [accend, setAccend] = useState(false);
  const [orderby, setOrderBy] = useState("");
  const [fieldBy, setFiledBy] = useState("");
  const [prev, setPrev] = useState("");
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
        console.log('key',key);
        setJumpTo(key);
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
        .catch((error) => console.log(error));
    } else {
      setModal(!modal);
    }
  };

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("accendq3") === column.dataField ||
      localStorage.getItem("prevq3") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevq3", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendq3") === column.dataField ? (
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
  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminqp3"));
    if (!localPage) {
      localPage = 1;
    }
    setAccend(localStorage.getItem("accendq3"));
    setPrev(localStorage.getItem("prevq3"));
    let sortVal = JSON.parse(localStorage.getItem("sortedValue3"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValue3", JSON.stringify(sort));
    }
    setPage(localPage);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getPendingForProposals(localPage);
  }, []);
  useEffect(() => {
    let runTo = myRefs.current[jumpTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [modal]);

  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getPendingForProposals(1);
    localStorage.setItem("adminqp3", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getPendingForProposals(page - 1);
    localStorage.setItem("adminqp3", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getPendingForProposals(page + 1);
    localStorage.setItem("adminqp3", Number(page) + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getPendingForProposals(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("adminqp3", defaultPage.at(-1));
  };
  const getPendingForProposals = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let remainApiPath = "";
    let searchData = JSON.parse(localStorage.getItem(`searchDataadquery3`));
    let orderBy = 0;
    let fieldBy = 0;
    let sortVal = JSON.parse(localStorage.getItem("sortedValue3"));
    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    if (searchData) {
      remainApiPath = `/admin/pendingProposal?page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&category=${
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
      remainApiPath = `admin/pendingProposal?page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
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
          setNonPendingData(all);
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
    setOrderBy(val);
    setFiledBy(field);
    let sort = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem("adminqp3", 1);
    localStorage.setItem("sortedValue3", JSON.stringify(sort));
    let remainApiPath = "";
    let searchData = JSON.parse(localStorage.getItem(`searchDataadquery3`));
    if (searchData) {
      remainApiPath = `/admin/pendingProposal?orderby=${val}&orderbyfield=${field}&category=${
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
      remainApiPath = `admin/pendingProposal?orderby=${val}&orderbyfield=${field}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setPage(1);
        setBig(1);
        setEnd(Number(localStorage.getItem("admin_record_per_page")));
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

        setNonPendingData(all);
      }
    });
  };

  const columns = [
    {
      dataField: "cid",
      text: "S.no",

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "created",
      text: "Date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendq3", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendq3");
        }

        if (accend === field) {
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
      dataField: "assign_no",
      text: "Query no",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/admin_queries/${row.id}`,
                index: 2,
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
      dataField: "parent_id",
      text: "Category",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendq3", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendq3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 3);
      },
    },
    {
      dataField: "cat_name",
      text: "Sub category",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendq3", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendq3");
        }
        if (accend === field) {
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendq3", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendq3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
      },
    },
    {
      text: "Status",
      dataField: "statusdescription",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendq3", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendq3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status}/
              {row.status == "Inprogress Query" ? (
                <p className="inprogress">{row.statusdescription}</p>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      dataField: "tname",
      headerFormatter: headerLabelFormatter,
      text: "TL name",
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendq3", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendq3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 7);
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
              id={row.id}
              ref={(el) => (myRefs.current[row.id] = el)}
              onClick={() => toggle(row.id)}
            >
              History
            </button>
          </>
        );
      },
    },
  ];
  const resetPaging = () => {
    setBig(1);
    setPage(1);
    setOrderBy("");
    setFiledBy("");
    localStorage.removeItem("sortedValue3");
    localStorage.removeItem("adminqp3");
    localStorage.removeItem("accendq3");
    localStorage.removeItem("prevq3");
  };
  return (
    <>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setNonPendingData}
            getData={getPendingForProposals}
            pendingForProposal="pendingForProposal"
            setRecords={setRecords}
            records={records}
            setDefaultPage={setDefaultPage}
            resetPaging={resetPaging}
            setCountNotification={setCountNotification}
            page={page}
            setBig={setBig}
            setEnd={setEnd}
            index="adquery3"
          />
        </CardHeader>
        <CardBody>
          <CardHeader>
            <Row>
              <Col md="12" align="right">
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
                            getPendingForProposals(Number(e.target.value));
                            localStorage.setItem(
                              "adminqp3",
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
                      {defaultPage?.length > page ? (
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
          </CardHeader>
          {/* <Records records={records} /> */}
          <DataTablepopulated
            bgColor="#55425f"
            keyField={"assign_no"}
            data={nonpendingData}
            columns={columns}
          ></DataTablepopulated>
          <Modal isOpen={modal} fade={false} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>History</ModalHeader>
            <ModalBody>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="row">S.no</th>
                    <th scope="row">Name</th>
                    <th scope="row">Query no</th>
                    <th scope="row">Status</th>
                    <th scope="row">Date of Allocation</th>
                  </tr>
                </thead>

                {history.length > 0
                  ? history.map((p, i) => (
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{p.name}</td>
                          <td>{p.assign_no}</td>
                          <td>{p.status}</td>
                          <td>{p.date_of_allocation}</td>
                        </tr>
                      </tbody>
                    ))
                  : null}
              </table>
            </ModalBody>
            <ModalFooter>
              <button className="autoWidthBtn" onClick={toggle}>
                Cancel
              </button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForProposals;

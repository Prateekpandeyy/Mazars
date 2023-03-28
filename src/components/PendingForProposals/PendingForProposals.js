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

function PendingForProposals({ CountPendingProposal }) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [nonpendingData, setNonPendingData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const [jumpTo, setJumpTo] = useState("");
  const myRefs = useRef([]);

  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
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
        setJumpTo(key);
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
      console.log(key, " else more");
    }
  };
  useEffect(() => {
    setPage(1);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));

    let searchData = JSON.parse(localStorage.getItem(`searchDataadquery3`));
    if (!searchData) {
      getPendingForProposals(1);
    }
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
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(page - 1);
    getPendingForProposals(page - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(page + 1);
    getPendingForProposals(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getPendingForProposals(defaultPage.at(-1));
    setAtpage(totalPages);
  };
  const getPendingForProposals = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));

    if (e) {
      axios
        .get(`${baseUrl}/admin/pendingProposal?page=${e}`, myConfig)
        .then((res) => {
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

            setCountNotification(res.data.total);
            let dynamicPage = Math.round(res.data.total / 50);
            let rem = (e - 1) * allEnd;
            let end = e * allEnd;
            if (e === 1) {
              setBig(rem + e);
              setEnd(end);
            } else {
              setBig(rem + 1);
              setEnd(end);
            }
            for (let i = 1; i < dynamicPage; i++) {
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
        `${baseUrl}/tl/getNotification?orderby=${val}&orderbyfield=${field}`,
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

          setNonPendingData(all);
        }
      });
  };

  const columns = [
    {
      dataField: "",
      text: "S.no",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div id={row.id} ref={(el) => (myRef.current[row.id] = el)}>
            {rowIndex + 1}
          </div>
        );
      },
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "created",
      text: "Date",
      sort: true,

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
      sort: true,
    },
    {
      dataField: "cat_name",
      text: "Sub category",
      sort: true,
    },
    {
      text: "Client name",
      dataField: "name",
      sort: true,
    },
    {
      text: "Status",

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
      text: "TL name",
      sort: true,
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
              onClick={() => toggle(row.id)}
            >
              History
            </button>
          </>
        );
      },
    },
  ];

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
            index="adquery3"
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
                            getPendingForProposals(e.target.value);
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

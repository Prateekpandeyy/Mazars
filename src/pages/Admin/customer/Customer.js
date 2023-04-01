import React, { useState, useEffect, useRef } from "react";
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
import axios from "axios";
import { baseUrl } from "../../../config/config";

import Swal from "sweetalert2";
import CustomerListFilter from "../../../components/Search-Filter/CustomerListFilter";
import History from "./CustHistory";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
function Customer() {
  const [data, setData] = useState([]);
  const [tpCount, setTpCount] = useState("");
  const userid = window.localStorage.getItem("adminkey");
  const [myPurpose, setPurpose] = useState([]);
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);
  const [records, setRecords] = useState([]);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [accend, setAccend] = useState(false);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const [jumpTo, setJumpTo] = useState("");
  const myRefs = useRef([]);
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  var digit2 = [];
  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminClient"));
    if (!localPage) {
      localPage = 1;
    }
    setPage(localPage);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getCustomer(localPage);
  }, []);

  const getCustomer = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    axios.get(`${baseUrl}/admin/getAllList?page=${e}`, myConfig).then((res) => {
      let droppage = [];
      if (res.data.code === 1) {
        let data = res.data.payment_detail;
        setTpCount(res.data.total);
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
        setData(all);

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
  };
  const clientEnable = (e, value) => {
    let formData = new FormData();
    if (e.target.checked === true) {
      formData.append("status", "1");
    } else {
      formData.append("status", "0");
    }

    formData.append("id", value);

    axios({
      method: "POST",
      url: `${baseUrl}/admin/clientstatus`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        getCustomer();
      } else {
        getCustomer();
        Swal.fire({
          title: "error",
          html: "Something went wrong, please try again",
          icon: "error",
        });
      }
    });
  };

  const toggle = (key) => {
    setModal(!modal);
    if (typeof key == "object") {
    } else {
      fetch(`${baseUrl}/admin/userhistory?id=${key}`, {
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
    }
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
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "user_id",
      text: "User Id",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Mobile no",
    },
    {
      dataField: "occupation",
      text: "Occupation",
      sort: true,
    },
    {
      dataField: "country",
      text: "Country",
      sort: true,
    },
    {
      dataField: "state",
      text: "State",
      sort: true,
    },

    {
      dataField: "city",
      text: "City",
      sort: true,
    },
    {
      dataField: "gstin_no",
      text: "Gstin",
      sort: true,
    },
    {
      dataField: "secondary_email",
      text: "Secondary email",
      sort: true,
    },
    {
      dataField: "created",
      text: "Date of registration",
      sort: true,
    },

    {
      dataField: "",
      text: "Action",
      headerStyle: () => {
        return { width: "100px" };
      },
      formatter: function (cell, row) {
        return (
          <div className="d-flex">
            <i
              className="fa fa-eye"
              style={{
                fontSize: 20,
                cursor: "pointer",
                margin: "0px 8px 0px 8px",
                color: "green",
              }}
              onClick={() => show(row.id)}
            ></i>
            {row.status == "1" ? (
              <span>
                <label
                  className="switch"
                  onChange={(e) => clientEnable(e, row.id)}
                >
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </span>
            ) : (
              ""
            )}
            {row.status == "0" ? (
              <span>
                <label
                  className="switch"
                  onChange={(e) => clientEnable(e, row.id)}
                >
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </span>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];

  //check
  const show = (key) => {
    setModal(!modal);
    setJumpTo(key);
    if (typeof key == "object") {
    } else {
      {
        axios
          .get(`${baseUrl}/admin/totalComplete?uid=${key}`, myConfig)

          .then((response) => {
            if (response.data.code === 1) {
              setHistory(response.data.result);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };

  useEffect(() => {
    let runTo = myRefs.current[jumpTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [modal]);

  // delete data
  const deleteCliente = (id) => {
    axios
      .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
      .then(function (response) {
        if (response.data.code === 1) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          getCustomer();
        } else {
          Swal.fire("Oops...", "Errorr ", "error");
        }
      })
      .catch((error) => {});
  };
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getCustomer(1);
    localStorage.setItem("admininvt1", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getCustomer(page - 1);
    localStorage.setItem("admininvt1", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem("admininvt1", Number(page) + 1);
    getCustomer(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getCustomer(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("admininvt1", defaultPage.at(-1));
  };
  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="6">
              <CustomHeading>Client ({tpCount})</CustomHeading>
            </Col>
            <Col md="6" align="right">
              <div className="customPagination">
                <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                  <span>
                    {big}-{end} of {countNotification}
                  </span>
                  <span className="d-flex">
                    {page > 1 ? (
                      <>
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
                      </>
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
                          getCustomer(Number(e.target.value));
                          localStorage.setItem("adminClient", e.target.value);
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
        <CardBody>
          <CustomerListFilter
            setData={setData}
            searchQuery="SearchQuery"
            setRecords={setTpCount}
            records={tpCount}
            getCustomer={getCustomer}
          />
          <DataTablepopulated
            bgColor="#42566a"
            keyField={"assign_no"}
            data={data}
            columns={columns}
          ></DataTablepopulated>
        </CardBody>
      </Card>
      <History history={history} toggle={toggle} modal={modal} />
    </Layout>
  );
}

export default Customer;

import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../components/Layout/Layout";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import Swal from "sweetalert2";
import CustomerListFilter from "../../../components/Search-Filter/CustomerListFilter";
import History from "./CustHistory";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
function Customer() {
  const [data, setData] = useState([]);
  const [tpCount, setTpCount] = useState("");
  const userid = window.localStorage.getItem("adminkey");

  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);

  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [accend, setAccend] = useState(false);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const [prev, setPrev] = useState("");
  const [jumpTo, setJumpTo] = useState("");
  const myRefs = useRef([]);
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminClient"));
    setPrev(localStorage.getItem("cutomFilter"));
    if (!localPage) {
      localPage = 1;
    }
    setAccend(localStorage.getItem("accendClient"));
    setPage(localPage);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getCustomer(localPage);
  }, []);
  function priceFormatter(column, colIndex) {
    let isActive = true;

    if (accend === column.dataField || prev === column.dataField) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("cutomFilter", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div
        className={
          isActive === true
            ? "d-flex filterActive text-white w-100 flex-wrap"
            : "d-flex text-white w-100 flex-wrap"
        }
      >
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {accend === column.dataField ? (
            <ArrowDropDownIcon />
          ) : (
            <ArrowDropUpIcon />
          )}
        </div>
      </div>
    );
  }

  useEffect(() => {
    let runTo = myRefs.current[jumpTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [modal]);
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getCustomer(1);
    localStorage.setItem("adminClient", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getCustomer(page - 1);
    localStorage.setItem("adminClient", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem("adminClient", Number(page) + 1);
    getCustomer(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getCustomer(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("adminClient", defaultPage.at(-1));
  };
  const getCustomer = (e) => {
    let sortVal = JSON.parse(localStorage.getItem("sortedValueclient"));
    let orderBy = 0;
    let fieldBy = 0;

    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";
    let data = JSON.parse(localStorage.getItem(`searchDataadclient`));

    if (data && Object.values(data).length > 0) {
      remainApiPath = `admin/getAllList?&name=${data.name}&page=${e}&country=${data.country}&state=${data.state}&city=${data.city2}&email=${data.email}&occupation=${data.occupation}&from=${data.p_dateFrom}&to=${data.p_dateTo}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    } else {
      remainApiPath = `/admin/getAllList?page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }

    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      let droppage = [];
      setPage(Number(e));
      if (res.data.code === 1) {
        let data = res.data.result;
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
  const sortMessage = (val, field) => {
    let remainApiPath = "";

    let sort = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem("adminClient", 1);
    localStorage.setItem("sortedValueclient", JSON.stringify(sort));

    let sortVal = JSON.parse(localStorage.getItem("sortedValueclient"));
    let orderBy = 0;
    let fieldBy = 0;

    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let data = JSON.parse(localStorage.getItem(`searchDataadclient`));

    if (data && Object.values(data).length > 0) {
      remainApiPath = `admin/getAllList?&name=${data.name}&country=${data.country}&state=${data.state}&city=${data.city2}&email=${data.email}&occupation=${data.occupation}&from=${data.p_dateFrom}&to=${data.p_dateTo}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    } else {
      remainApiPath = `/admin/getAllList?orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setPage(1);
        setBig(1);
        if (
          Number(
            res.data.total >
              Number(localStorage.getItem("admin_record_per_page"))
          )
        ) {
          setEnd(Number(localStorage.getItem("admin_record_per_page")));
        } else {
          setEnd(res.data.total);
        }
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

        setData(all);
      }
    });
  };
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
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendClient", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendClient");
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
      dataField: "user_id",
      text: "User Id",
      sort: true,
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendClient", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendClient");
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
      dataField: "email",
      text: "Email",
      sort: true,
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendClient", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendClient");
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
      dataField: "phone",
      text: "Mobile no",
      sort: true,
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendClient", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendClient");
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
      dataField: "occupation",
      text: "Occupation",
      headerFormatter: priceFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendClient", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendClient");
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
      dataField: "country",
      text: "Country",
      sort: true,
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendClient", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendClient");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
      },
    },
    {
      dataField: "state",
      text: "State",
      sort: true,
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendClient", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendClient");
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
      dataField: "city",
      text: "City",
      sort: true,
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendClient", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendClient");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 8);
      },
    },
    {
      dataField: "gstin_no",
      text: "GSTIN",
      sort: true,
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendClient", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendClient");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 9);
      },
    },
    {
      dataField: "secondary_email",
      text: "Secondary email",
    },
    {
      dataField: "created",
      text: "Date of registration",
      sort: true,
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendClient", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendClient");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 11);
      },
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
  console.log("data1111", data);

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="6">
              <CustomHeading>Client ({tpCount})</CustomHeading>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <CustomerListFilter
            setData={setData}
            searchQuery="SearchQuery"
            records={tpCount}
            setPage={setPage}
            setEnd={setEnd}
            setCountNotification={setCountNotification}
            setBig={setBig}
            setDefaultPage={setDefaultPage}
            localName="adminClient"
            getCustomer={getCustomer}
            lastChunk={lastChunk}
            nextChunk={nextChunk}
            page={page}
            big={big}
            end={end}
            defaultPage={defaultPage}
            prevChunk={prevChunk}
            countNotification={countNotification}
            firstChunk={firstChunk}
          />
          {/* {data.length > 0 ? (
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
                        localStorage.setItem(
                          "adminClient",
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
          ) : (
            ""
          )} */}
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

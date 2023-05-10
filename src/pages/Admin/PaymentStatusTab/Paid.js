import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";
import CommonServices from "../../../common/common";
import Records from "../../../components/Records/Records";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ViewDiscussionIcon,
  Payment,
} from "../../../components/Common/MessageIcon";
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
function Paid() {
  const classes = useStyles();
  const [payment, setPayment] = useState([]);
  const [modal, setModal] = useState(false);
  const [paymentcount, setPaymentCount] = useState("");
  const [pay, setPay] = useState([]);
  const [records, setRecords] = useState([]);
  const [assignNo, setAssignNo] = useState("");
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [accend, setAccend] = useState(false);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const [orderby, setOrderBy] = useState("");
  const [fieldBy, setFiledBy] = useState("");
  const [prev, setPrev] = useState("");
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminpayt2"));
    if (!localPage) {
      localPage = 1;
    }
    setAccend(localStorage.getItem("accendpay2"));
    setPrev(localStorage.getItem("prevpay2"));
    let sortVal = JSON.parse(localStorage.getItem("sortedValuepay2"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValuePay2", JSON.stringify(sort));
    }
    setPage(localPage);

    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getPaymentStatus(localPage);
  }, []);
  function headerLabelFormatter(column, colIndex) {
    let isActive = true;
    if (
      localStorage.getItem("accendpay2") === column.dataField ||
      localStorage.getItem("prevpay2") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevpay2", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendpay2") === column.dataField ? (
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
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getPaymentStatus(1);
    localStorage.setItem("adminpayt2", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getPaymentStatus(page - 1);
    localStorage.setItem("adminpayt2", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem("adminpayt2", Number(page) + 1);
    getPaymentStatus(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getPaymentStatus(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("adminpayt2", defaultPage.at(-1));
  };

  const getPaymentStatus = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let sortVal = JSON.parse(localStorage.getItem("sortedValuepay2"));
    let orderBy = 0;
    let fieldBy = 0;

    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";
    let searchData = JSON.parse(localStorage.getItem(`searchDataadpayment2`));

    if (searchData) {
      remainApiPath = `/admin/getUploadedProposals?page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&status=1&pcat_id=${searchData.pcatId}&qno=${
        searchData?.query_no
      }`;
    } else {
      remainApiPath = `admin/getUploadedProposals?status=1&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
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
          setPayment(all);
          setPaymentCount(all.length);
          setRecords(all.length);
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
    let remainApiPath = "";
    setOrderBy(val);
    setFiledBy(field);
    let sort = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem("adminpayt2", 1);
    localStorage.setItem("sortedValuepay2", JSON.stringify(sort));
    let searchData = JSON.parse(localStorage.getItem(`searchDataadpayment2`));
    if (searchData) {
      remainApiPath = `/admin/getUploadedProposals?orderby=${val}&orderbyfield=${field}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&status=1&pcat_id=${searchData.pcatId}&qno=${
        searchData?.query_no
      }`;
    } else {
      remainApiPath = `admin/getUploadedProposals?status=1&orderby=${val}&orderbyfield=${field}`;
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

        setPayment(all);
      }
    });
  };

  const toggle = (key) => {
    setModal(!modal);

    fetch(`${baseUrl}//admin/getPaymentDetail?id=${key}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setPay(response.payment_detail);
      })
      .catch((error) => console.log(error));
  };

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key);
    }
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [ViewDiscussion]);

  const columns = [
    {
      dataField: "",
      text: "S.no",
      formatter: (cellContent, row, rowIndex) => {
        return <div id={row.assign_no} ref={el => (myRef.current[row.assign_no] = el)}>{row.cid}</div>;
      },
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "query_created_date",
      text: "Date",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpay2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpay2");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },

      formatter: function dateFormat(cell, row) {
        var oldDate = row.query_created_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
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
                pathname: `/admin_queries/${row.assign_id}`,
                index: 1,
                routes: "paymentstatus",
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
          localStorage.setItem("accendpay2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpay2");
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
          localStorage.setItem("accendpay2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpay2");
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
      text: "Date of acceptance of proposal",
      dataField: "cust_accept_date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpay2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpay2");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
      },

      formatter: function dateFormat(cell, row) {
        var oldDate = row.cust_accept_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Status",
      dataField: "",

      formatter: function (cell, row) {
        return (
          <>
            {row.paid_status == "2" ? (
              <p className="declined">{row.status} </p>
            ) : (
              <p>{row.status}</p>
            )}
          </>
        );
      },
    },
    {
      dataField: "accepted_amount",
      text: "Accepted amount ",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpay2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpay2");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 7);
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.accepted_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Amount paid",
      dataField: "paid_amount",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpay2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpay2");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 8);
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.paid_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },

    {
      text: "Outstanding amount",
      dataField: "amount_outstanding",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpay2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpay2");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 9);
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.amount_outstanding;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Date of payment",
      dataField: "cust_paid_date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpay2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpay2");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 10);
      },
    },
    {
      dataField: "tl_name",
      text: "TL name",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpay2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpay2");
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
      text: "Action",

      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex" }}>
              <Link
                to={{
                  pathname: `/admin_chatting/${row.assign_id}`,
                  index: 1,
                  routes: "paymentstatus",
                  obj: {
                    message_type: "5",
                    query_No: row.assign_no,
                    query_id: row.assign_id,
                    routes: `/admin/paymentstatus`,
                  },
                }}
              >
                <MessageIcon />
              </Link>
              <div
                onClick={() => ViewDiscussionToggel(row.assign_no)}
                className="mx-1"
              >
                <ViewDiscussionIcon />
              </div>
              <Link
                to={{
                  pathname: `/admin_paydetails/${row.assign_id}`,
                  index: 1,
                  routes: "paymentstatus",
                }}
              >
                <Payment />
              </Link>
            </div>
          </>
        );
      },
    },
  ];

  const rowStyle2 = (row, index) => {
    const style = {};
    var warningDate = moment(row.Exp_Delivery_Date).subtract(2, "day").toDate();
    // var warnformat = warningDate.format("YYYY-MM-DD");
    var aa = moment().toDate();

    if (
      row.paid_status != "2" &&
      row.status != "Complete" &&
      warningDate < aa
    ) {
      style.backgroundColor = "#c1d8f2";
      style.color = "#000111";
    }

    return style;
  };
  const resetPaging = () => {
    setPage(1);
    setBig(1);
    setOrderBy("");
    setFiledBy("");
    localStorage.removeItem("adminpayt2");
    localStorage.removeItem("sortedValuepay2");
    localStorage.removeItem("accendpay2");
    localStorage.removeItem("prevpay2");
  };
  return (
    <Card>
      <CardHeader>
        <AdminFilter
          setData={setPayment}
          getData={getPaymentStatus}
          unpaid="unpaid"
          setRecords={setRecords}
          records={records}
          setDefaultPage={setDefaultPage}
          resetPaging={resetPaging}
          setCountNotification={setCountNotification}
          page={page}
          setBig={setBig}
          setEnd={setEnd}
          index="adpayment2"
        />
      </CardHeader>
      <CardBody>
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
                        getPaymentStatus(Number(e.target.value));
                        localStorage.setItem(
                          "adminpayt2",
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
        <DataTablepopulated
          bgColor="#3e8678"
          keyField={"assign_no"}
          data={payment}
          rowStyle2={rowStyle2}
          columns={columns}
        ></DataTablepopulated>

        <Modal isOpen={modal} fade={false} toggle={toggle}>
          <ModalHeader toggle={toggle}>History</ModalHeader>
          <ModalBody>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="row">S.No</th>
                  <th scope="row">Date</th>
                  <th scope="row">Amount</th>
                </tr>
              </thead>
              {pay.length > 0
                ? pay.map((p, i) => (
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{CommonServices.removeTime(p.payment_date)}</td>
                        <td>{p.paid_amount}</td>
                      </tr>
                    </tbody>
                  ))
                : null}
            </table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <DiscardReport
          ViewDiscussionToggel={ViewDiscussionToggel}
          ViewDiscussion={ViewDiscussion}
          report={assignNo}
          getData={getPaymentStatus}
          headColor="#3e8678"
        />
      </CardBody>
    </Card>
  );
}

export default Paid;

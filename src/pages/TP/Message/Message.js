import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Select } from "antd";


import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import PaymentModal from "./PaymentModal";
import CommonServices from "../../../common/common";
import { useHistory } from "react-router";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
function Message(props) {
  const userId = window.localStorage.getItem("tpkey");
  const [getting, setGetting] = useState([]);
  const [query, setQuery] = useState([]);
  const [atPage, setAtpage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [pages, setPages] = useState([]);
  const history = useHistory();
  const [addPaymentModal, setPaymentModal] = useState(false);
  const { Option } = Select;

  const token = window.localStorage.getItem("tptoken");
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const paymentHandler = (key) => {
    setPaymentModal(!addPaymentModal);
  };

  useEffect(() => {
    getMessage();
    totalMsg();
    setEnd(50);
  }, []);


  const onChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  };


  const chunkSize = 24;

  const sliceIntoChunks = (query, chunkSize) => {
    const res = [];
    for (let i = 0; i < query.length; i += chunkSize) {
      const chunk = query.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }
  const divided = [];
  divided.push(sliceIntoChunks(query, chunkSize))
  const un = divided[0];


  const totalMsg = () => {
    axios
      .get(`${baseUrl}/tl/getNotification?id=${JSON.parse(userId)}&type_list=uread`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          setCountNotification(res.data.result[0].total);
        }
      });
  };

  useEffect(() => {
    const totalP = Math.ceil(countNotification / 50);
    setTotalPages(totalP);
    setEnd(50);
  }, [countNotification]);

  useEffect(() => {
    const N = totalPages;
    const arr = Array.from({length: N}, (_, index) => index + 1);
    setPages(arr)
  }, [totalPages]);



  // set intial query here
  const getMessage = () => {
    axios
      .get(`${baseUrl}/tl/getNotification?id=${JSON.parse(userId)}`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          setQuery(res.data.result);
        }
      });
  };


  //page counter
  const firstChunk = () => {
    setAtpage(1);
  }
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
  }
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
  }
  const lastChunk = () => {
    setAtpage(totalPages);
  }
  
  const handlePages = (value) => {
    setAtpage(value);
  }

  //page counter Ends here

  //call for more notification on page Change
  useEffect(() => {
    setBig((50 * (atPage - 1)) + 1)
    if (atPage == totalPages) {
      setEnd(countNotification);
    } else {
      setEnd(50 * atPage);
    }
    axios
      .get(`${baseUrl}/tl/getNotification?page=${atPage}`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          setQuery(res.data.result);
        }
      });
  }, [atPage])


  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + (1 * ((atPage - 1) * 50)) + 1;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "30px" };
      },
    },

    {
      text: "Date",
      dataField: "setdate",
      sort: true,
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
            <Link to={`/taxprofessional_view-notification/${row.id}`}>
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
      .then(function (response) { })
      .catch((error) => { });
  };

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button class="autoWidthBtn" onClick={() => history.goBack()}>
                Go Back
              </button>
            </Col>
            <Col md="4">
              <h4>Message</h4>
            </Col>
            <Col md="4">
              <div className="customPagination" style={{ "textAlign": "center" }}>
                <span style={{ "margin": "0px 15px" }}>{big}-{end} of {countNotification}</span>
                <span>
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

                  <Select
                  style={{ width: 60 }}
                  placeholder="Select Category"
                  onChange={handlePages}
                  value={atPage}
                >
                  {pages.map((i) => (
                    <Option value={i} key={i}>
                      {i}
                    </Option>
                  ))}
                </Select>

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
            </Col>
          </Row>
        </CardHeader>
        <CardBody
          style={{ display: "flex", height: "80vh", overflowY: "scroll" }}
        >
          <DataTablepopulated
            bgColor="#42566a"
            keyField={"assign_no"}
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

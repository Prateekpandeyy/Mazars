import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import CustomHeading from "../../../components/Common/CustomHeading";
import { Link } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import { useHistory } from "react-router";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
function Message(props) {
  const userId = window.localStorage.getItem("tpkey");

  const [query, setQuery] = useState([]);
  const [atPage, setAtpage] = useState(1);

  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const history = useHistory();
  const [addPaymentModal, setPaymentModal] = useState(false);
  const token = window.localStorage.getItem("tptoken");
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const paymentHandler = (key) => {
    setPaymentModal(!addPaymentModal);
  };

  const chunkSize = 24;

  const sliceIntoChunks = (query, chunkSize) => {
    const res = [];
    for (let i = 0; i < query.length; i += chunkSize) {
      const chunk = query.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };
  const divided = [];
  divided.push(sliceIntoChunks(query, chunkSize));

  useEffect(() => {
    setPage(1);
    setEnd(50);
    getMessage(1);
  }, []);

  // set intial query here
  const getMessage = (e) => {
    if (e) {
      axios
        .get(
          `${baseUrl}/tl/getNotification?id=${JSON.parse(userId)}&page=${e}`,
          myConfig
        )
        .then((res) => {
          let droppage = [];
          if (res.data.code === 1) {
            let data = res.data.result;
            let all = [];
            let customId = 1;
            if (e > 1) {
              customId = 50 * (e - 1) + 1;
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

            setCountNotification(res.data.total);
            let dynamicPage = Math.round(res.data.total / 50);
            let rem = (e - 1) * 50;
            let end = e * 50;
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

  //page counter
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getMessage(1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(page - 1);
    getMessage(page - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(page + 1);
    getMessage(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getMessage(defaultPage.at(-1));
    setAtpage(totalPages);
  };
  //page counter Ends here

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return row.cid;
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
      .then(function (response) {})
      .catch((error) => {});
  };

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button className="autoWidthBtn" onClick={() => history.goBack()}>
                Go Back
              </button>
            </Col>
            <Col md="8">
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
                          getMessage(e.target.value);
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
        {page && (
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
        )}
      </Card>
    </Layout>
  );
}

export default Message;
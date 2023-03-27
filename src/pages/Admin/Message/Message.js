import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { useHistory } from "react-router";
// import PaymentModal from "./PaymentModal";
import CommonServices from "../../../common/common";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
import paginationFactory, {
  PaginationProvider,
  paginationTableProps,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

function Message(props) {
  const userId = window.localStorage.getItem("adminkey");
  const [query, setQuery] = useState([]);
  const [allId, setAllId] = useState([]);
  const [sortVal, setSortVal] = useState(0);
  const history = useHistory();
  useEffect(() => {
    getMessage();
  }, []);
  const paginationOption = {
    custom: false,
    totalSize: query.length,
  };
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );
  const pageButtonRenderer = ({
    page,
    active,
    disabled,
    title,
    onPageChange,
  }) => {
    const handleClick = (e) => {
      e.preventDefault();
      onPageChange(page);
      loadMessage(page + 1);
    };

    return (
      <li className="page-item nexIconCss">
        <a href="#" onClick={handleClick}>
          {page}
        </a>
      </li>
    );
  };

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    pageButtonRenderer,
    sizePerPageList: [
      {
        text: "50",
        value: 50,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const loadMessage = (e) => {
    let clickedId = allId.filter((i) => {
      return i === e;
    });

    if (clickedId.length === 0 && isNaN(e) === false && e > 1) {
      axios
        .get(`${baseUrl}/admin/getNotification?page=${e}`, myConfig)
        .then((res) => {
          if (res.data.code === 1) {
            let data = query.concat(res.data.result);
            let all = [];
            let customId = 1;
            data.map((i) => {
              let data = {
                ...i,
                cid: customId,
              };
              customId++;
              all.push(data);
            });
            setQuery(all);

            setAllId((payload) => {
              return [...payload, e];
            });
          }
        });
    }
  };

  const getMessage = () => {
    axios
      .get(`${baseUrl}/admin/getNotification?page=1`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];
          let customId = 1;
          res.data.result.map((i) => {
            let data = {
              ...i,
              cid: customId,
            };
            customId++;
            all.push(data);
          });

          setQuery(all);
        }
      });
  };
  const sortMessage = (val, field) => {
    axios
      .get(
        `${baseUrl}/admin/getNotification?orderby=${val}&orderbyfield=${field}`,
        myConfig
      )
      .then((res) => {
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
          setQuery(all);
          setSortVal(field);
        }
      });
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return row.cid;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "20px" };
      },
    },

    {
      text: "Date",
      dataField: "setdate",

      headerStyle: () => {
        return { fontSize: "12px", width: "60px" };
      },
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (order === "asc") {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
    },

    {
      text: "Query No",
      dataField: "assign_no",
      headerStyle: () => {
        return { fontSize: "12px", width: "30px" };
      },
      formatter: function nameFormatter(cell, row) {
        return <>{row.assign_no}</>;
      },
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (order === "asc") {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 2);
      },
    },
    {
      text: "Message",

      headerStyle: () => {
        return { fontSize: "12px", width: "180px" };
      },
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (order === "asc") {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 3);
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link to={`/admin_view-notification/${row.id}`}>
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
                  <i className="fa fa-bullseye" style={{ color: "red" }}></i>
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
                  <i className="fa fa-bullseye" style={{ color: "green" }}></i>
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
      .get(`${baseUrl}/admin/markReadNotification?id=${id}`, myConfig)
      .then(function (response) {})
      .catch((error) => {});
  };

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>
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
        </CardHeader>
        <CardBody id="messageBody">
          {sortVal === 0 ? (
            <BootstrapTable
              keyField="id"
              data={query}
              columns={columns}
              pagination={paginationFactory(options)}
            />
          ) : (
            ""
          )}
          {sortVal === 1 ? (
            <BootstrapTable
              keyField="id"
              data={query}
              columns={columns}
              pagination={paginationFactory(options)}
            />
          ) : (
            ""
          )}
          {sortVal === 2 ? (
            <BootstrapTable
              keyField="id"
              data={query}
              columns={columns}
              pagination={paginationFactory(options)}
            />
          ) : (
            ""
          )}
          {sortVal === 3 ? (
            <BootstrapTable
              keyField="id"
              data={query}
              columns={columns}
              pagination={paginationFactory(options)}
            />
          ) : (
            ""
          )}
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Message;

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import PaymentModal from "./PaymentModal";
import CommonServices from "../../common/common";
import { useHistory } from "react-router";
import CustomHeading from "../../components/Common/CustomHeading";
import CustomTypography from "../../components/Common/CustomTypography";
function Message(props) {
  const userId = window.localStorage.getItem("userid");
  const [query, setQuery] = useState([]);
  const [data, setData] = useState(null);

  const [addPaymentModal, setPaymentModal] = useState(false);
  let history = useHistory();
  const token = window.localStorage.getItem("clientToken");
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
  }, []);

  const getMessage = () => {
    axios
      .get(
        `${baseUrl}/customers/getNotification?id=${JSON.parse(userId)}
                &type_list=all`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setQuery(res.data.result);
        }
      });
  };

  const columns = [
    {
      text: "S.No",

      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return {
          fontSize: "12px",
          width: "10px",
          backgroundColor: "rgb(61, 131, 117)",
          color: "#fff",
          border: "1px solid rgb(61, 131, 117)",
        };
      },
    },

    {
      text: "Date",
      dataField: "setdate",
      sort: true,
      headerStyle: () => {
        return {
          fontSize: "12px",
          width: "60px",
          backgroundColor: "rgb(61, 131, 117)",
          color: "#fff",
          border: "1px solid rgb(61, 131, 117)",
        };
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",
      headerStyle: () => {
        return {
          fontSize: "12px",
          width: "30px",
          backgroundColor: "rgb(61, 131, 117)",
          color: "#fff",
          border: "1px solid rgb(61, 131, 117)",
        };
      },
      formatter: function nameFormatter(cell, row) {
        return <>{row.assign_no}</>;
      },
    },
    {
      text: "Message",
      headerStyle: () => {
        return {
          fontSize: "12px",
          width: "180px",
          backgroundColor: "rgb(61, 131, 117)",
          color: "#fff",
          border: "1px solid rgb(61, 131, 117)",
        };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link to={`/customer_view-notification/${row.id}`}>
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
                  <CustomTypography cursor="pointer" hover="hover">
                    {row.message}
                  </CustomTypography>

                  <i class="fa fa-bullseye" style={{ color: "#BC363D" }}></i>
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
                  <CustomTypography cursor="pointer" hover="hover">
                    {row.message}
                  </CustomTypography>
                  <i class="fa fa-bullseye" style={{ color: "#348719" }}></i>
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
      .get(`${baseUrl}/customers/markReadNotification?id=${id}`, myConfig)
      .then(function (response) {})
      .catch((error) => {});
  };

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button class="autoWidthBtn" onClick={() => history.goBack()}>
                Go Back
              </button>
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
              <CustomHeading>Message</CustomHeading>
            </Col>
            {/* <Col md="4" style={{ display: "flex", justifyContent: "flex-end" }}>
              <DeleteQuery id={id} setLoading={setLoading}/>
            </Col> */}
          </Row>
        </CardHeader>
        <CardBody
          style={{ display: "flex", height: "80vh", overflowY: "scroll" }}
        >
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={query}
            columns={columns}
            rowIndex
          />

          <PaymentModal
            paymentHandler={paymentHandler}
            addPaymentModal={addPaymentModal}
            // data={data}
            // getProposalData={getAssignmentData}
          />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Message;

import React, { useState, useEffect } from "react";
import Layout from "../../../../components/Layout/Layout";
import { Container } from "@material-ui/core";
import CustomHeading from "../../../../components/Common/CustomHeading";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { baseUrl } from "../../../../config/config";
import DataTablepopulated from "../../../../components/DataTablepopulated/DataTabel";
import {
  DeleteIcon,
  EditQuery,
} from "../../../../components/Common/MessageIcon";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Markup } from "interweave";
const EmailList = () => {
  const [list, setList] = useState([]);
  let history = useHistory();
  const token = localStorage.getItem("token");
  const userId = window.localStorage.getItem("cmsId");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios
      .get(`${baseUrl}/cms/emailerlist?uid=${JSON.parse(userId)}`, myConfig)

      .then((res) => {
        if (res.data.code === 1) {
          setList(res.data.result);
        } else if (res.data.code === 102) {
          localStorage.removeItem("token");
          history.push("/cms/login");
          return false;
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
        return { width: "50px" };
      },
    },
    {
      dataField: "email_list",
      text: "Email",
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "schedule_date",
      text: "Date",
      headerStyle: () => {
        return { width: "100px" };
      },
    },
    {
      dataField: "subject",
      text: "Subject",
      headerStyle: () => {
        return { width: "150px" };
      },
    },

    {
      dataField: "Message",
      text: "message",

      formatter: function CmsMessage(cell, row) {
        return <Markup content={row.message} />;
      },
    },
    {
      text: "Action",
      headerStyle: () => {
        return { width: "100px" };
      },
      formatter: function CmsAction(cell, row) {
        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Link to={`/cms/articlesedit/${row.id}`}>
                <span title="Edit Articles">
                  <EditQuery />
                </span>
              </Link>

              <span
                title="Delete Articles"
                // onClick={() => del(row.id)}
                className="mx-2"
              >
                <DeleteIcon />
              </span>

              {row.status == "1" ? (
                <div>
                  <label
                    className="switch"
                    // onChange={(e) => myShowValue(e, row)}
                  >
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
              ) : (
                ""
              )}
              {row.status == "0" ? (
                <div>
                  <label
                    className="switch"
                    // onChange={(e) => myShowValue(e, row)}
                  >
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        );
      },
    },
  ];
  return (
    <Layout cmsDashboard="cmsDashboard">
      <Container maxWidth="xl">
        <div className="headingContent">
          <CustomHeading>Email Schedule</CustomHeading>

          <button
            className="autoWidthBtn rightAlign my-2"
            onClick={(e) => {
              history.push("/cms/enquiry");
            }}
          >
            New Schedule
          </button>
        </div>
        {list && (
          <Card>
            <CardBody>
              <DataTablepopulated
                bgColor="#42566a"
                keyField={"id"}
                data={list}
                columns={columns}
              ></DataTablepopulated>
            </CardBody>
          </Card>
        )}
      </Container>
    </Layout>
  );
};
export default EmailList;

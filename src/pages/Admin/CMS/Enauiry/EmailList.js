import React, { useState, useEffect } from "react";
import Layout from "../../../../components/Layout/Layout";
import { Container } from "@material-ui/core";
import CustomHeading from "../../../../components/Common/CustomHeading";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { baseUrl } from "../../../../config/config";
import DataTablepopulated from "../../../../components/DataTablepopulated/DataTabel";
import { EyeIcon, EditQuery } from "../../../../components/Common/MessageIcon";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ShowHtml from "./ShowHtml";
const EmailList = () => {
  const [list, setList] = useState([]);
  const [viewHtml, setViewHtml] = useState(false);
  const [mailerBody, setMailerBody] = useState("");
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
  const getHtml = (e) => {
    setViewHtml(true);
    setMailerBody(e);
  };
  const openHandler = (e) => {
    setViewHtml(!viewHtml);
  };
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
    // {
    //   dataField: "email_list",
    //   text: "Email",
    //   headerStyle: () => {
    //     return { width: "100px" };
    //   },
    // },
    {
      dataField: "schedule_date",
      text: "Date",
      headerStyle: () => {
        return { width: "100px" };
      },
      formatter: function (cell, row) {
        let date = row.schedule_date
          .split(" ")[0]
          .split("-")
          .reverse()
          .join("-");
        let time = row.schedule_date.split(" ")[1];
        return (
          <>
            {date} {time}
          </>
        );
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
      text: "Action",
      headerStyle: () => {
        return { width: "100px" };
      },
      formatter: function CmsAction(cell, row) {
        let status = "";
        if (row.status === "1") {
          status = "Pending";
        } else if (row.status === "2") {
          status = "Failed";
        } else if (row.status === "3") {
          status = "Complete";
        }
        var finalString = row.message;
        finalString = finalString = finalString.replace("<html>", "");
        finalString = finalString.replace("</html>", "");
        finalString = finalString.replace("<body>", "");
        finalString = finalString.replace("</body>", "");
        return (
          <>
            <span
              title="View message"
              className="m-2"
              onClick={(e) => getHtml(finalString)}
            >
              <EyeIcon />
            </span>
            {row.status === "0" ? (
              <Link to={`/cms/editenquiry/${row.id}`}>
                <EditQuery />
              </Link>
            ) : (
              <span className="completed">{status}</span>
            )}
          </>
        );
      },
    },
  ];
  return (
    <Layout cmsDashboard="cmsDashboard">
      <Container maxWidth="xl">
        <div className="headingContent">
          <CustomHeading>Scheduled Email</CustomHeading>

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
        {viewHtml === true ? (
          <ShowHtml
            viewHtml={viewHtml}
            openHandler={openHandler}
            mailerBody={mailerBody}
          />
        ) : (
          " "
        )}
      </Container>
    </Layout>
  );
};
export default EmailList;

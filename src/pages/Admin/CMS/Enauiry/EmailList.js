import React, { useState, useEffect } from "react";
import Layout from "../../../../components/Layout/Layout";
import { Container } from "@material-ui/core";
import CustomHeading from "../../../../components/Common/CustomHeading";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { baseUrl } from "../../../../config/config";
import DataTablepopulated from "../../../../components/DataTablepopulated/DataTabel";
import {
  EyeIcon,
  EditQuery,
  DeleteIcon,
} from "../../../../components/Common/MessageIcon";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ShowHtml from "./ShowHtml";
import Swal from "sweetalert2";
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
        return { width: "30px" };
      },
    },

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
        let suffix = "A.M";
        if (time.split(":")[0] > 12) {
          suffix = "P.M.";
        } else {
          suffix = "A.M.";
        }
        return (
          <>
            {date} {time} {suffix}
          </>
        );
      },
    },
    {
      dataField: "type",
      text: "Send to",
      headerStyle: () => {
        return { width: "100px" };
      },
      formatter: function (cell, row) {
        let type = "";
        if (row.type === "0") {
          type = "Admin";
        } else if (row.type === "1") {
          type = "All client";
        } else if (row.type === "2") {
          type = "All TL";
        } else if (row.type === "3") {
          type = "All TP";
        } else if (row.type === "4") {
          type = "Specific email";
        }
        return (
          <>
            <p>{type}</p>
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
        return { width: "70px" };
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
            <span
              title="Delete Articles"
              onClick={() => del(row.id)}
              className="mx-2"
            >
              <DeleteIcon />
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
  const del = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to delete email? Yes, delete it!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        axios
          .get(`${baseUrl}/cms/deletemailer?id=${id}`, myConfig)
          .then((res) => {
            if (res.data.code === 1) {
              Swal.fire({
                title: "success",
                html: "Email deleted successfully",
                icon: "success",
              });
              getList();
            } else {
              Swal.fire({
                title: "error",
                html: "Something went wrong , please try again",
                icon: "error",
              });
            }
          });
      }
    });
  };
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

import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { Container } from "@material-ui/core";
import { Card, CardBody } from "reactstrap";
import axios from "axios";
import { styled } from "@material-ui/styles";
import { useHistory } from "react-router";
import { baseUrl } from "../../../config/config";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import { DeleteIcon, EditQuery } from "../../../components/Common/MessageIcon";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CustomHeading from "../../../components/Common/CustomHeading";
const MyContainer = styled(Container)({});
const Updates = () => {
  const userId = window.localStorage.getItem("adminkey");
  const [list, setList] = useState([]);
  const [check, setCheck] = useState(false);
  let history = useHistory();
  const token = window.localStorage.getItem("token");
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
      .get(`${baseUrl}/cms/getallupdate?uid=${JSON.parse(userId)}`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          setList(res.data.result);
        }
      });
  };
  const columns = [
    {
      dataField: "",
      text: "S.No",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "heading",
      text: "Heading",
      headerStyle: () => {
        return { width: "700px" };
      },
    },
    {
      dataField: "type",
      text: "Category",
      formatter: function typeName(cell, row) {
        return (
          <>
            {row.type === "direct" ? <p>Direct Tax</p> : ""}
            {row.type === "indirect" ? <p>Indirect Tax</p> : ""}
            {row.type === "miscellaneous" ? <p>Miscellaneous</p> : ""}
          </>
        );
      },
    },
    {
      dataField: "",
      text: "Action",

      formatter: function CmsAction(cell, row) {
        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Link to={`/cms_editupdates/${row.id}`}>
                <EditQuery titleName="Edit Update" />
              </Link>
              <span onClick={() => del(row.id)} className="ml-2">
                <DeleteIcon titleName="Delete Update" />
              </span>
              {row.status == "1" ? (
                <div>
                  <label
                    className="switch"
                    onChange={(e) => myShowValue(e, row)}
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
                    onChange={(e) => myShowValue(e, row)}
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

  const myShowValue = (e, row) => {
    if (e.target.checked === true) {
      axios
        .get(
          `${baseUrl}/cms/setupdatestatus?uid=${JSON.parse(userId)}&id=${
            row.id
          }&status=0`,
          myConfig
        )
        .then((res) => {
          if (res.data.result === 1) {
            setCheck(true);
          }
        });
    } else {
      axios
        .get(
          `${baseUrl}/cms/setupdatestatus?uid=${JSON.parse(userId)}&id=${
            row.id
          }&status=1`,
          myConfig
        )
        .then((res) => {
          setCheck(false);
        });
    }
  };
  const del = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to delete update? Yes, delete it!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        axios
          .get(
            `${baseUrl}/cms/removeupdate?uid=${JSON.parse(userId)}&id=${id}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              Swal.fire({
                title: "success",
                html: "Update deleted successfully",
                icon: "success",
              });
              getList();
            } else if (res.data.code === 102) {
              history.push("/cms/login");
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
          <CustomHeading>Updates</CustomHeading>

          <button
            className="autoWidthBtn rightAlign my-2"
            onClick={(e) => {
              history.push("/cms/updatecontent");
            }}
          >
            New updates
          </button>
        </div>
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
      </Container>
    </Layout>
  );
};

export default Updates;

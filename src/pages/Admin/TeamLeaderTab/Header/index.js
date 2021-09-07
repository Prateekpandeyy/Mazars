import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
import { TurnedIn } from "@material-ui/icons";
function TeamLeaderTab() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [tlCount, setTlCount] = useState("");
  const [subCat, setsubCat] = useState([])
  const userid = window.localStorage.getItem("adminkey");
  var kk = []
  var pp = []
  console.log(data)
  console.log(pp)
  const columns = [
    {
      dataField: "",
      text: "S.No",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
      },
    },
    {
      dataField: "post_name",
      text: "TL post name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },

    {
      dataField: "email",
      text: "TL post email",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "name",
      text: "Name of TL",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "personal_email",
      text: "Email",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "phone",
      text: "Mobile No",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "parent_id",
      text: "Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function nameFormatter(cell, row) {
        var digit2 = [];
        digit2 = row.allpcat_id.split(",")
        console.log("digit2", digit2)
        console.log(digit2.includes("Indirect"))
        return (
          <>

            {
              digit2.map((e) => {
                return (
                  <>
                    <p className={e.includes("Indirect") === true ? "dirCla" : "indirCla"}> {e + ","}</p>
                  </>
                )
              })
            }
          </>
        )
      }
    },
    {
      dataField: "allcat_id",
      text: "Sub Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function nameFormatter(cell, row) {
        var digit = [];
        //  console.log(JSON.parse(row.allcat_id))
        digit = JSON.parse(row.allcat_id);


        return (
          <>
            <p style={{ "color": "blue", "diplay": "block" }}>{digit.direct + ","} </p>
            <p style={{ "color": "green", "display": "block" }}>{digit.indirect + ","}</p>
          </>

        )
      }
    },

    {
      dataField: "",
      text: "Action",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <Link to={`/admin/edittl/${row.id}`}>
              <i
                className="fa fa-edit"
                style={{
                  fontSize: 18,
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              ></i>
            </Link>
            <i
              className="fa fa-trash"
              style={{ fontSize: 20, cursor: "pointer", marginLeft: "8px" }}
              onClick={() => del(row.id)}
            ></i>
          </>
        );

      },

    },

  ];

  useEffect(() => {
    getTeamLeader();

  }, []);

  const getTeamLeader = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
      console.log("Log", res.data.result)
      var dd = []
      if (res.data.code === 1) {
        pp.push(res.data.result)
        setData((res.data.result));
        setTlCount(res.data.result.length);
      }
    });
  };


  //check
  const del = (id) => {
    console.log("del", id);

    Swal.fire({
      title: "Are you sure?",
      text: "It will permanently deleted !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };

  // delete data
  const deleteCliente = (id) => {
    axios
      .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
      .then(function (response) {
        console.log("delete-", response);
        if (response.data.code === 1) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          getTeamLeader();
        } else {
          Swal.fire("Oops...", "Errorr ", "error");
        }

      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };



  return (

    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      {console.log("Layout")}
      <Card>
        <CardHeader>
          <Row>
            <Col md="10">
              <CardTitle tag="h4">Team Leaders ({tlCount})</CardTitle>
            </Col>
            <Col md="2">
              <Link to={"/admin/addnewtl"} className="btn btn-primary">
                Add New
              </Link>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data}

            columns={columns}
            rowIndex
          />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default TeamLeaderTab
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl, baseUrl3 } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import { Typography, Button, Container } from "@material-ui/core";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
const ReportList = () => {
  const userid = window.localStorage.getItem("adminkey");
  const [data, setData] = useState();
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get(
        `${baseUrl}/report/getListOfReport?uid=${JSON.parse(userid)}`,
        myConfig
      )
      .then((res) => {
        setData(res.data.result);
      });
  };
  const del = (id) => {
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
        delReprot(id);
      }
    });
  };
  const delReprot = (e) => {
    axios
      .get(
        `${baseUrl}/report/deleteRecord?id=${e}&uid=${JSON.parse(userid)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          Swal.fire({
            title: "success",
            html: "Report deleted successfully",
            icon: "success",
          });
        }
        getData();
      });
  };
  const downloadRep = (id) => {
    axios
      .get(`${baseUrl}/report/viewReport?id=${id}`, myConfig)
      .then((res) => {});
  };
  const columns = [
    {
      dataFeild: "",
      text: "S.no",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "created_date",
      text: "Created date",
      sort: true,

      formatter: function formatter(cell, row) {
        let a = row.created_date.split(" ")[0].split("-").reverse().join("-");
        let b = row.created_date.split(" ")[1];

        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <span>{a}</span>
              <span>{b}</span>
            </div>
          </>
        );
      },
    },
    {
      dataField: "",
      text: "Action",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div title="Download">
                {/* <a href ={`${baseUrl3}/${row.report_path}`} target="_blank">

                  </a> */}
                <span onClick={() => downloadRep(row.id)}>
                  <CloudDownloadIcon />
                </span>
              </div>
              <i className="fa-thin fa-file-excel"></i>

              <div title="Delete">
                <DeleteIcon color="danger" onClick={() => del(row.id)} />
              </div>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Layout adminDashboard="adminDashboard" adminUserId={userid}>
        <Container>
          <div className="row p-2">
            <div className="col-md-4">
              <CustomHeading>Report list</CustomHeading>
            </div>
            <div className="col-md-8" style={{ textAlign: "right" }}>
              <Link to="/admin/reports" className="autoWidthBtn">
                Generate report
              </Link>
            </div>
          </div>
          {data === undefined ? (
            ""
          ) : (
            <DataTablepopulated
              bgColor="#42566a"
              keyField={"assign_no"}
              data={data}
              columns={columns}
            ></DataTablepopulated>
          )}
        </Container>
      </Layout>
    </>
  );
};
export default ReportList;

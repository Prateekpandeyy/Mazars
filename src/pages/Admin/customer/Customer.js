import React, { useState, useEffect } from "react";
// import "./style.css";
import Layout from "../../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";

import BootstrapTable from "react-bootstrap-table-next";
import TaxProffesionalService from "../../../config/services/TaxProffesional";

function Customer() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [tpCount, setTpCount] = useState("");
  const [history, setHistory] = useState([]);
  const userid = window.localStorage.getItem("adminkey");
  const [myPurpose, setPurpose] = useState([])
  var digit2 = [];
  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = () => {
    axios.get(`${baseUrl}/admin/getAllList`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setData(res.data.result);
        setTpCount(res.data.result.length);
      }
    });
  };

  const [modal, setModal] = useState(false);

  const toggle = (key) => {
    console.log("key", key);
    setModal(!modal);
    if(typeof(key) == "object") {
      console.log("cancle")
    }
    else{
      fetch(`${baseUrl}/admin/userhistory?id=${key}`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/vnd.github.cloak-preview",
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setHistory(response.result);
        })
        .catch((error) => console.log(error));
    }
    
   
  };


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
      dataField: "name",
      text: "Customer Name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
        dataField: "email",
        text: "Email",
        sort: true,
        headerStyle: () => {
          return { fontSize: "12px" };
        },
      },
    {
      dataField: "country",
      text: "Country",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "state",
      text: "State",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },

    {
      dataField: "city",
      text: "City",
      sort: true,
      headerStyle: () => {
       return { fontSize: "12px" };
      },
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "pincode",
      text: "Pincode",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "occupation",
      text: "Occupation",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
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
            <Link to={`/admin/edittp/${row.id}`}>
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
    console.log("del", id);
    axios
      .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
      .then(function (response) {
        console.log("delete-", response);
        if (response.data.code === 1) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          getCustomer();
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
      <Card>
        <CardHeader>
          <Row>
            <Col md="12">
              <CardTitle tag="h4">Customer ({tpCount})</CardTitle>
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

export default Customer;


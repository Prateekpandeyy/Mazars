import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
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
import { Link } from "react-router-dom";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import TableHeader from "../../components/DataTable/Header/index";

function QueriesTab() {
  // const [queriesData, setQueriesData] = useState([]);
  const [queriesCount, setCountQueries] = useState("");
  const [query, setQuery] = useState([]);
  const userId = window.localStorage.getItem("userid");

  const [sorting, setSorting] = useState({ field: "", order: "" });
  const headers = [
    { name: "S.no", sortable: true },
    { name: "Date", field: "created", sortable: true },
    { name: "Query No", field: "assign_no", sortable: true },
    { name: "Category", field: "parent_id", sortable: true },
    { name: "Sub Category", field: "cat_name", sortable: true },
    { name: "Status", field: "status", sortable: true },
    {
      name: "Expected Delivery Date",
      field: "exp_delivery_date",
      sortable: false,
    },
  ];

  useEffect(() => {
    getQueriesData();
  }, []);

  const getQueriesData = () => {
    axios
      .get(
        `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setQuery(res.data.result);
          setCountQueries(res.data.result.length);
        }
      });
  };


  const queryData = useMemo(() => {
    let computedData = query;

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      computedData = computedData.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    return computedData;
  }, [query, sorting]);
  

  //change date format
  function ChangeFormateDate(oldDate) {
    console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

  //show status by spinner
  function showStatus(status) {
    console.log("status", status);
    if (status == null) {
      return null;
    }
  }

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="9">
              <CardTitle tag="h4">Queries ({queriesCount})</CardTitle>
            </Col>
            <Col md="3">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Link to="/customer/select-category" class="btn btn-primary">
                  Fresh Query
                </Link>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <CustomerFilter
            setData={setQuery}
            getData={getQueriesData}
            id={userId}
            query="query"
          />
        </CardHeader>
        <CardBody>
          <Table responsive="sm" bordered>
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {queryData.map((p, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{ChangeFormateDate(p.created)}</td>
                  <th>
                    <Link to={`/customer/my-assingment/${p.id}`}>
                      {p.assign_no}
                    </Link>
                  </th>
                  <td>{p.parent_id}</td>
                  <td>{p.cat_name}</td>
                  <td>{p.status}</td>
                  <td>{ChangeFormateDate(p.exp_delivery_date)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default QueriesTab;

// function ChangeFormateDate2(date) {
//   var month = (1 + date.getMonth()).toString();
//   month = month.length > 1 ? month : '0' + month;

//   var day = date.getDate().toString();
//   day = day.length > 1 ? day : '0' + day;

//   return month + '/' + day + '/' + year;
// }

{
  /* <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Query No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Status</th>
                <th>Expected Delivery Date</th>
              </tr>
            </thead>
            <tbody style={{ height: "400px", overflowY: "scroll" }}>
              {queriesData.length > 0 ? (
                queriesData.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <th>
                      <Link to={`/customer/my-assingment/${p.id}`}>
                        {p.assign_no}
                      </Link>
                    </th>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td>{p.status}</td>
                    <td>{ChangeFormateDate(p.exp_delivery_date)}</td>               
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No Records</td>
                </tr>
              )}
            </tbody>
          </Table> */
}

//   <MaterialTable
//   title={false}
//   columns={columns}
//   data={queriesData}
//   options={{
//     sorting: true,
//     search: false,
//   }}

// />

// const columns = [
//   { title: "S.No", field: "s_no" },
//   { title: "Date", field: "created" },
//   { title: "Query No", field: "assign_no" },
//   { title: "Category", field: "parent_id" },
//   { title: "Sub Category", field: "cat_name" },
//   { title: "Status", field: "status" },
//   { title: "Expected Delivery Date", field: "exp_delivery_date" },
// ];
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
import { AgGridColumn, AgGridReact } from "ag-grid-react";


function TeamLeaderTab() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [tlCount, setTlCount] = useState("");
  const userid = window.localStorage.getItem("adminkey");

  // const actionButton = () =>{}


  var hashValueGetter = function (params) {
    return params.node.rowIndex + 1;
  };

  const column = [
    {
      headerName: "S.No",
      field: "",
      valueGetter: hashValueGetter,
      sortable: true,
      width: 70,
    },
    { headerName: "Name", field: "name", sortable: true, width: 140 },
    { headerName: "Category", field: "parent_id", sortable: true, width: 140 },
    {
      headerName: "Sub Category",
      field: "cat_name",
      sortable: true,
      width: 160,
    },
    { headerName: "Email", field: "email", sortable: true, width: 160 },
    { headerName: "Phone", field: "phone", sortable: true, width: 130 },
    {
      headerName: "Edit",
      field: "id",
      width: 70,
      cellRendererFramework: (params) => {
        return (
          <div>
            <Link to={`/admin/edittl/${params.data.id}`}>
              <i
                className="fa fa-edit"
                style={{
                  fontSize: 18,
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              ></i>
            </Link>
          </div>
        );
      },
    },
    {
      headerName: "Edit",
      field: "id",
      width: 70,
      cellRendererFramework: (params) => (
        <div>
          <i
            className="fa fa-trash"
            style={{ fontSize: 22, cursor: "pointer", marginLeft: "8px" }}
            onClick={() => del(params.data.id)}
          ></i>
        </div>
      ),
    },
  ];

  // const onGridReady = (params) => {
  //   setGridApi(params.api);
  //   setGridColumnApi(params.columnApi);
  // };

  useEffect(() => {
    getTeamLeader();
  }, []);

  const getTeamLeader = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setData(res.data.result);
        setTlCount(res.data.result.length);
      }
    });
  };


  // delete data
  const del = (id) => {
    console.log("del", id);

    axios
      .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
      .then(function (response) {
        console.log("delete-", response);
        alert.success("successfully deleted ");
        getTeamLeader();
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
            <Col md="10">
              <CardTitle tag="h4">Team Leaders ({tlCount})</CardTitle>
            </Col>
            <Col md="2">
              <Link to={"/admin/addnewtl"} class="btn btn-primary">
                Add New
              </Link>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="ag-theme-alpine" style={{ height: 400, width: 950 }}>
            <AgGridReact rowData={data} columnDefs={column} />
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default TeamLeaderTab;

{
  /* <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Name</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th scope="col">Email</th>
                <th scope="col">Phone No.</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{p.name}</td>
                  <td>{p.parent_id}</td>
                  <td>{p.cat_name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>
                    <Link to={`/admin/edittl/${p.id}`}>
                      <i
                        className="fa fa-edit"
                        style={{
                          fontSize: 18,
                          cursor: "pointer",
                          marginLeft: "8px",
                        }}
                      ></i>
                    </Link>
                  </td>
                  <td onClick={() => del(p.id)}>
                    <i
                      className="fa fa-trash"
                      style={{
                        fontSize: 22,
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> */
}

// <div class="row mt-3">
//         <div class="col-md-12">
//           <div class="schedule">
//             <h3>Team Leaders</h3>
// <Link to={"/admin/addnew"} class="btn btn-primary">
//   Add New
// </Link>
//           </div>
//         </div>
//         <br />
//         <br />
//         <br />
//         <br />
//         <div class="col-md-12">
//           <table class="table">
// <thead>
//   <tr>
//     <th scope="col">No.</th>
//     <th scope="col">Name</th>
//     <th scope="col">Email</th>
//     <th scope="col">Phone No.</th>
//     <th scope="col">Edit</th>
//     <th scope="col">Delete</th>
//   </tr>
// </thead>
// {data.map((p, i) => (
//   <tr>
//     <th scope="row">{i + 1}</th>
//     <td>{p.name}</td>
//     <td>{p.email}</td>
//     <td>{p.Phone}</td>
//     <td>
//       <Link to={`/admin/edit/${p.id}`}>
//         <i
//           className="fa fa-edit"
//           style={{ fontSize: 18, cursor: "pointer", marginLeft:"8px" }}
//         ></i>
//       </Link>
//     </td>
//     <td
//     onClick={() => del(p.id)}>
// <i className="fa fa-trash" style={{ fontSize: 22, cursor: "pointer" ,marginLeft:"8px" }}>
// </i>
//     </td>
//   </tr>
// ))}
//           </table>
//         </div>
//       </div>

// cellRenderer:  (params)=> {
//   return <Link to={`/?info=${params.data.Id}`}>"+{params.value}+"</Link>,

// const [gridApi, setGridApi] = useState(null);
// const [gridColumnApi, setGridColumnApi] = useState(null);

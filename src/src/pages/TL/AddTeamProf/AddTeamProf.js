import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import { Link } from "react-router-dom";
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
import { useAlert } from "react-alert";
import BootstrapTable from "react-bootstrap-table-next";

function AddTeamProf() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [count, setCount] = useState("");
  const userid = window.localStorage.getItem("tlkey");

  useEffect(() => {
    getTaxProf();
  }, []);

  const getTaxProf = () => {
    axios
      .get(`${baseUrl}/tp/getTaxProfessional?tl_id=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setData(res.data.result);
          setCount(res.data.result.length);
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
        return { fontSize: "12px", width: "50px" };
      },
    },
   
    {
      dataField: "post_name",
      text: "TP post name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },

    {
      dataField: "email",
      text: "TP post email",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "name",
      text: "Name of TP",
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
      // dataField: "parent_id",
      text: "Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter : function nameFormatter(cell, row) {
        var digit2 = [];
        digit2 = row.allpcat_id.split(",")
       
        return(
          <>
          
          {
             digit2.map((e) => {
             return(
               <>
            <p className= {e.includes("Indirect") === true ? "dirCla" : "indirCla"}> {e + ","}</p>  
               </>
             ) 
           })
          }
           </>
        )
      }
    },
   
   
    {
      
     
      text: "Sub Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter : function nameFormatter(cell, row) {
        var digit = [];
         
        digit = row.allcat_id.split(",")
      
      
        return(
          <>
          
         {
            digit.map((e) => {
            return(
              <>
             <p className= {row.allpcat_id.includes("Indirect") === true ? "dirCla" : "indirCla"}> {e + ","}</p>  
              </>
            ) 
          })
         }
          </>
        )
      }
    },
   
  ]
  // delete data
  const del = (id) => {
    console.log("del", id);

    axios
      .get(`${baseUrl}/delete/TaxLead/${id}`)
      .then(function (response) {
        console.log("delete-", response);
        alert.success("successfully deleted ");
        getTaxProf();
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="10">
              <CardTitle tag="h4">Tax Professionals ({count})</CardTitle>
            </Col>
            <Col md="2"></Col>
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

          {/* <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table> */}
        </CardBody>
      </Card>
    </Layout>
  );
}

export default AddTeamProf;

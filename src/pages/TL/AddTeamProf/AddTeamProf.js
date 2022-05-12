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
import DataTablepopulated from '../../../components/DataTablepopulated/DataTabel'
function AddTeamProf() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [count, setCount] = useState("");
  const userid = window.localStorage.getItem("tlkey");
  const token = window.localStorage.getItem("tlToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  useEffect(() => {
    getTaxProf();
  }, []);

  const getTaxProf = () => {
    axios
      .get(`${baseUrl}/tl/getTaxProfessional?tl_id=${JSON.parse(userid)}`, myConfig)
      .then((res) => {
      
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
    

    axios
      .get(`${baseUrl}/delete/TaxLead/${id}`)
      .then(function (response) {
                alert.success("successfully deleted ");
        getTaxProf();
      })
      .catch((error) => {
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
        <DataTablepopulated 
                   bgColor="#42566a"
                   keyField= {"assign_no"}
                   data={data}
                   columns={columns}>
                    </DataTablepopulated>
        

      
        </CardBody>
      </Card>
    </Layout>
  );
}

export default AddTeamProf;

import React, { useState, useEffect } from "react";
import "./style.css";
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
import History from './History.js';
function TaxProfessionalsTab() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [tpCount, setTpCount] = useState("");
  const [history, setHistory] = useState([]);
  const userid = window.localStorage.getItem("adminkey");
  const [myPurpose, setPurpose] = useState([])
  var digit2 = [];
  useEffect(() => {
    getTaxProf();
  }, []);

  const getTaxProf = () => {
    axios.get(`${baseUrl}/tp/getTaxProfessional`).then((res) => {
    ;
      if (res.data.code === 1) {
        setData(res.data.result);
        setTpCount(res.data.result.length);
      }
    });
  };

  const [modal, setModal] = useState(false);

  const toggle = (key) => {
   
    setModal(!modal);
    if(typeof(key) == "object") {
     
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
      dataField: "tl_name",
      text: "TL post name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "tl_post_email",
      text: "TL post email",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      style : {
        wordBreak : "break-word"
        }
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
      style : {
        wordBreak : "break-word"
        }
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
      style : {
        wordBreak : "break-word"
        }
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
       
        digit2 = row.allpcat_id.split(",")
       
        return(
          <>
          
          {
             digit2.map((e) => {
             return(
               <>
            <p className= {e.includes("Indirect") === true ? "dirCla" : "indirCla"}> {e}</p>  
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
      let kk;
      if(digit.length > 1){
        kk = ","
      }
      else{
        kk = ""
      }
      
        return(
          <>
          
         {
            digit.map((e) => {
            return(
              <>
             <p className= {row.allpcat_id.includes("Indirect") === true ? "dirCla" : "indirCla"}> {e + kk}</p>  
              </>
            ) 
          })
         }
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
            {/* <i
              className="fa fa-trash"
              style={{ fontSize: 20, cursor: "pointer", marginLeft: "8px" }}
              onClick={() => del(row.id)}
            ></i> */}
          </>
        );
      },
    },
    {
      text: "History",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <button
              type="button"
              class="btn btn-info btn-sm"
              onClick={() => toggle(row.id)}
            >
              History
            </button>
          </>
        );
      },
    },
  ];

  //check
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
        deleteCliente(id);
      }
    });
  };

  // delete data
  const deleteCliente = (id) => {
  
    axios
      .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
      .then(function (response) {
       
        if (response.data.code === 1) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          getTaxProf();
        } else {
          Swal.fire("Oops...", "Errorr ", "error");
        }
      })
      .catch((error) => {
       
      });
  };


  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="10">
              <CardTitle tag="h4">Tax Professionals ({tpCount})</CardTitle>
            </Col>
            <Col md="2">
              <Link to={"/admin/addnewtp"} class="btn btn-primary">
                Add New
              </Link>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
        <div className="tableFixHead">
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data}
            columns={columns}
            rowIndex
            classes="table-responsive"
          />
          </div>
        </CardBody>
      </Card>
      <History history={history} toggle={toggle} modal={modal} />
    </Layout>
  );
}

export default TaxProfessionalsTab;



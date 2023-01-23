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
  
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import History from './History.js';
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import {EditQuery} from "../../../components/Common/MessageIcon";
import CustomHeading from "../../../components/Common/CustomHeading";
function TaxProfessionalsTab() {
  
  const [data, setData] = useState([]);
  const [tpCount, setTpCount] = useState("");
  const [history, setHistory] = useState([]);
  const userid = window.localStorage.getItem("adminkey");
  const token = window.localStorage.getItem("adminToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  var digit2 = [];
  useEffect(() => {
    getTaxProf();
  }, []);

  const getTaxProf = () => {
    axios.get(`${baseUrl}/admin/getTaxProfessional`, myConfig).then((res) => {
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
          uit : token
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
        return { width : "50px"};
      },
    },
    {
      dataField: "tl_name",
      text: "TL post name",
      sort: true,
     
    },
    {
      dataField: "tl_post_email",
      text: "TL post email",
      sort: true,
     
    },
    {
      dataField: "post_name",
      text: "TP post name",
      sort: true,
    
    },

    {
      dataField: "email",
      text: "TP post email",
      sort: true,
     
    },
    {
      dataField: "name",
      text: "Name of TP",
      sort: true,
     
    },
    {
      dataField: "personal_email",
      text: "Email",
      sort: true,
     
    },
    {
      dataField: "phone",
      text: "Mobile No",
      sort: true,
     
    },
    {
      // dataField: "parent_id",
      text: "Category",
      sort: true,
      
      formatter : function nameFormatter(cell, row) {
       
        digit2 = row.allpcat_id.split(",")
       
        return(
          <>
          
          {
             digit2.map((e) => {
             return(
               <>
            <p  className= {e.includes("Indirect") === true ? "completed" : "inprogress"}> {e}</p>  
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
             <p style={{margin : "0.5rem"}} className= {row.allpcat_id.includes("Indirect") === true ? "completed" : "inprogress"}> {e + kk}</p>  
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
     
      formatter: function (cell, row) {
        return (
          <>
            <Link to={`/admin_edittp/${row.id}`}>
             <EditQuery />
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
     
      formatter: function (cell, row) {
        return (
          <>
            <button
              type="button"
              className="autoWidthBtn"
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
      .get(`${baseUrl}/admin/deleteTeamLeader?id=${id}`, myConfig)
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
              <CustomHeading>
              Tax professionals ({tpCount})
              </CustomHeading>
            </Col>
            <Col md="2">
              <Link to={"/admin/addnewtp"} className="autoWidthBtn">
                Add New
              </Link>
            </Col>
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
      <History history={history} toggle={toggle} modal={modal} />
    </Layout>
  );
}

export default TaxProfessionalsTab;



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
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
import History from './History.js';
import {EditQuery} from "../../../components/Common/MessageIcon";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
function TeamLeaderTab() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [tlCount, setTlCount] = useState("");
  const [subCat, setsubCat] = useState([])
  const [history, setHistory] = useState([]);
  const userid = window.localStorage.getItem("adminkey");
  var kk = []
  var pp = []
  

  const [modal, setModal] = useState(false);
  const token = window.localStorage.getItem("adminToken")
  const toggle = (key) => {
   
    setModal(!modal);

   if(typeof(key) == "object") {
    
   }
   else{
    {
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
    };
   }
   
   
  }
  const columns = [
    {
      dataField: "",
      text: "S.No",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { width : "50px" };
      },
    },
    {
      dataField: "post_name",
      text: "TL post name",
      sort: true,
     
    },

    {
      dataField: "email",
      text: "TL post email",
      sort: true,
    
    },
    {
      dataField: "name",
      text: "Name of TL",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px"};
      },
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
      dataField: "parent_id",
      text: "Category",
      sort: true,
    
    
     
      formatter: function nameFormatter(cell, row) {
        var digit2 = [];
        var digit3 = []
        digit2 = row.allpcat_id.split(",")
        if(row.allpcat_id.split(",")[0] === "Indirect tax"){
        
          digit3 = row.allpcat_id.split(",")
        }
        else{
          digit3 =  row.allpcat_id.split(",").reverse()
        }
      
        return (
          <>
            {
              digit3.map((e) => {
                return (
                  <>
                 
                 <div style={{display : "flex", height : "80px"}}>
                 <p className={e.includes("Indirect") === true ? "completed" : "inprogress"}> {e}</p>
                 </div>
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
     
      formatter: function nameFormatter(cell, row) {
        var digit = [];

         digit = JSON.parse(row.allcat_id);
         console.log("digit",digit)
let k, pp;

if(digit.direct && digit.direct.length -1 == "1"){
  k = ", ";
}
else{
  k = "";
}
if(digit.indirect && digit.indirect.length -1 == "1"){
  pp = ", ";
}
else{
  pp = "";
}
        return (
          <>
           {digit.direct.length > 0 && digit.indirect.length > 0 ?
           <>
            <div style={{display : "block", height : "80px"}}>
            <p className="completed">{digit.indirect + pp}</p>
            </div>
            <div style={{display : "block", height : "70px"}}>
            <p className = "inprogress">{digit.direct + k} </p> 
            </div>
           </> : <>
           {digit.direct.length > 0 ?
            <p className = "inprogress">{digit.direct + k} </p> :
            <p className="completed">{digit.indirect + pp}</p>
           }
           </>
           }
          
           {/* {digit.direct === null ? null :
            <p style={{ "color": "green", "display": "block" }}>{digit.indirect + pp}</p>}
         {digit.indirect === null ? null : 
            <p style={{ "color": "blue", "diplay": "block" }}>{digit.direct + k} </p> } */}
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
            <Link to={`/admin/edittl/${row.id}`}>
            <EditQuery />
            </Link>
          
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
              class="autoWidthBtn"
              onClick={() => toggle(row.id)}
            >
              History
            </button>
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
          getTeamLeader();
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
              <CardTitle tag="h4">Team Leaders ({tlCount})</CardTitle>
            </Col>
            <Col md="2">
              <Link to={"/admin/addnewtl"} className="customBtn">
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
      <History history={history} bgColor="#42566" toggle={toggle} modal={modal} />
    </Layout>
  );
}

export default TeamLeaderTab
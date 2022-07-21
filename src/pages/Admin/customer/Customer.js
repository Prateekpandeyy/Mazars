import React, { useState, useEffect } from "react";
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
import CustomerListFilter from "../../../components/Search-Filter/CustomerListFilter";
import BootstrapTable from "react-bootstrap-table-next";
import TaxProffesionalService from "../../../config/services/TaxProffesional";
import History from "./CustHistory";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
function Customer() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [tpCount, setTpCount] = useState("");
  const userid = window.localStorage.getItem("adminkey");
  const [myPurpose, setPurpose] = useState([])
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);
  const token = window.localStorage.getItem("adminToken")
  const myConfig = {
    headers : {
     "uit" : token
    }
  }
  var digit2 = [];
  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = () => {
    axios.get(`${baseUrl}/admin/getAllList`, myConfig).then((res) => {
     
      if (res.data.code === 1) {
        setData(res.data.result);
        setTpCount(res.data.result.length);
      }
    });
  };

 

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
        return {  width: "50px" };
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
     
    },
    {
      dataField: "user_id",
      text: "User Id",
      sort: true,
     
    },
    {
        dataField: "email",
        text: "Email",
        sort: true,
      
        
      },
      {
        dataField: "phone",
        text: "Mobile No",
     
      },
      {
        dataField: "occupation",
        text: "Occupation",
        sort: true,
       
      },
    {
      dataField: "country",
      text: "Country",
      sort: true,
     
    },
    {
      dataField: "state",
      text: "State",
      sort: true,
      
    },

    {
      dataField: "city",
      text: "City",
      sort: true,
     
    },
    {
      dataField: "gstin_no",
      text: "GSTIN",
      sort: true,
     
    },
    {
      dataField: "secondary_email",
      text: "Secondary Email",
      sort: true,
     
    },
    {
      dataField: "created",
      text: "Date of Registration",
      sort: true,
      
    },
    
  
   
    {
      dataField: "",
      text: "Action",
      
      formatter: function (cell, row) {
        return (
          <>
           
            <i
              className="fa fa-eye"
              style={{ fontSize: 20, cursor: "pointer", marginLeft: "8px" , color : "green"}}
              onClick={() => show(row.id)}
            ></i>
          </>
        );
      },
    },
   
  ];

  //check
  const show = (key) => {
 
    setModal(!modal);

   if(typeof(key) == "object") {
    
   }
   else{
    {
      axios.
      get(`${baseUrl}/admin/totalComplete?uid=${key}`, myConfig)
        
        .then((response) => {
         
         if(response.data.code === 1){
        
           setHistory(response.data.result)
         }
        })
        .catch((error) => console.log(error));
    };
   }
   
  
  };

  // delete data
  const deleteCliente = (id) => {
  
    axios
      .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
      .then(function (response) {
      
        if (response.data.code === 1) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          getCustomer();
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
            <Col md="6">
              <CardTitle tag="h4">Client ({tpCount})</CardTitle>
            </Col>
           <Col md="6">
           
           </Col>
          </Row>
        </CardHeader>
        <CardBody>
        <CustomerListFilter
        setData={setData}
        searchQuery = "SearchQuery"
        setRecords={setTpCount}
         records={tpCount} 
         getCustomer = {getCustomer} />
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

export default Customer;


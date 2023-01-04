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

import Swal from "sweetalert2";
import CustomerListFilter from "../../../components/Search-Filter/CustomerListFilter";
import History from "./CustHistory";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
function Customer() {
 
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
        console.log("Got All list")
      }
    });
  };
  const clientEnable = (e, value) => {
    let formData = new FormData()
    if(e.target.checked === true){
      formData.append("status", "1")
    }
    else{
     
        formData.append("status", "0")
      
    }
  
    formData.append("id", value);
    
    axios({
      method : "POST",
      url : `${baseUrl}/admin/clientstatus`,
      headers : {
        uit : token
      },
      data : formData
    })
    .then((res) => {
    if(res.data.code === 1){
      getCustomer();
    }
    else {
      getCustomer();
      Swal.fire({
        title : "error",
        html : "Something went wrong, please try again",
        icon : "error"
      })
    }
    })
   
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
      text: "S.no",
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
        text: "Mobile no",
     
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
      text: "Gstin",
      sort: true,
     
    },
    {
      dataField: "secondary_email",
      text: "Secondary email",
      sort: true,
     
    },
    {
      dataField: "created",
      text: "Date of registration",
      sort: true,
      
    },
    
  
   
    {
      dataField: "",
      text: "Action",
      headerStyle: () => {
        return {  width: "100px" };
      },
      formatter: function (cell, row) {
        return (
     <div className="d-flex">
       <i
              className="fa fa-eye"
              style={{ fontSize: 20, cursor: "pointer", margin: "0px 8px 0px 8px" , color : "green"}}
              onClick={() => show(row.id)}
            ></i>
             {
                  row.status ===  "1" ?
                  <span>
                  <label className="switch" onChange= {(e) => clientEnable(e, row.id)}>
    <input type="checkbox"  defaultChecked/>
    <span className="slider round"></span>
  </label>
  
                  </span> :
                  ""
                }
                {
                  row.status ===  "0" ?
                  <span>
                  <label className="switch" onChange= {(e) => clientEnable(e, row.id)}>
    <input type="checkbox"  />
    <span className="slider round"></span>
  </label>
  
                  </span> : ""
                }
             
     </div>
        );
      },
    },
   
  ];

  //check
  const show = (key) => {
 
    setModal(!modal);

   if(typeof(key) ===  "object") {
    
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
            <CustomHeading>
            Client ({tpCount})
            </CustomHeading>
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


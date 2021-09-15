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

function Customer() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [tpCount, setTpCount] = useState("");
  const userid = window.localStorage.getItem("adminkey");
  const [myPurpose, setPurpose] = useState([])
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);

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
      text: "Name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
        dataField: "",
        text: "Email",
        sort: true,
        headerStyle: () => {
          return { fontSize: "12px", cursor: "pointer" };
        },
        formatter : function(cell, row) {
          return(
            <a   onClick={() => show(row.id)}>{row.email}</a>
          )
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
        dataField: "occupation",
        text: "Occupation",
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
      dataField: "created",
      text: "Date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    
  
   
    // {
    //   dataField: "",
    //   text: "Action",
    //   headerStyle: () => {
    //     return { fontSize: "12px" };
    //   },
    //   formatter: function (cell, row) {
    //     return (
    //       <>
           
    //         <i
    //           className="fa fa-eye"
    //           style={{ fontSize: 20, cursor: "pointer", marginLeft: "8px" , color : "green"}}
    //           onClick={() => show(row.id)}
    //         ></i>
    //       </>
    //     );
    //   },
    // },
   
  ];

  //check
  const show = (key) => {
  console.log("showId", key)
    setModal(!modal);

   if(typeof(key) == "object") {
     console.log("cancle")
   }
   else{
    {
      axios.
      get(`${baseUrl}/customers/totalComplete?uid=${key}`)
        
        .then((response) => {
         
         if(response.data.code === 1){
          console.log("response", response.data.result)
           setHistory(response.data.result)
         }
        })
        .catch((error) => console.log(error));
    };
   }
   
  
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
            <Col md="6">
              <CardTitle tag="h4">Customer ({tpCount})</CardTitle>
            </Col>
           <Col md="6">
           
           </Col>
          </Row>
        </CardHeader>
        <CardBody>
        <CustomerListFilter
        setData={setData}
        listData={data}
        searchQuery = "SearchQuery"
        setRecords={setTpCount}
         records={tpCount} 
         getCustomer = {getCustomer} />
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data}
            columns={columns}
            rowIndex
          />
        </CardBody>
      </Card>
      <History history={history} toggle={toggle} modal={modal} />
    </Layout>
  );
}

export default Customer;


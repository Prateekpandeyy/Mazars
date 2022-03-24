import React , {useState, useEffect} from 'react';
import Layout from "../../../components/Layout/Layout";
import {Container} from '@material-ui/core';
import {
  Card,
  CardBody,
} from "reactstrap";
import axios from 'axios';
import { styled } from "@material-ui/styles";
import { useHistory } from 'react-router';
import { baseUrl } from '../../../config/config';
import DataTablepopulated from '../../../components/DataTablepopulated/DataTabel';
import  {DeleteIcon, EditQuery,} from "../../../components/Common/MessageIcon";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Markup } from 'interweave';

const MyContainer = styled(Container)({

})
const Updates = () =>{ 
    const userId = window.localStorage.getItem("adminkey");
    const [list, setList] = useState([])
    let history = useHistory()
    useEffect(() => {
      getList()
    }, [])
  
    const getList = () => {
      axios.get(`${baseUrl}/cms/getalllinks?uid=${JSON.parse(userId)}`)
      .then((res) => {
      console.log("ress", res)
       if(res.data.code === 1){
        setList(res.data.result)
        
       }
      })
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
        dataField : "heading",
        text : "Heading",
        
      },
      {
        dataField : "",
        text : "Link",
        formatter: function urlFormatter(cell, row){
          return(
            <a href={row.url} target="blank">{row.url}</a>
          )
        }
        
      },
     
      {
        dataField : "",
        text : "Action",
        headerStyle : () => {
          return{ width: "150px"}
        },
        formatter : function CmsAction(cell, row) {
         return(
         <>
       
                  <div style={{display : "flex", justifyContent : "space-evenly"}}>
                  <Link to={`/admin/linksedit/${row.id}`}>
         <div title="Edit link">
         <EditQuery />
         </div>
      </Link>
      <span   onClick={() => del(row.id)} className="ml-2" title="Delete links">
       <DeleteIcon />
    </span>
                
             </div>
         </>
         )
        }
      }
    ]
    
    const del = (id) => {
 

      Swal.fire({
          title: "Are you sure?",
          text: "Want to delete link? Yes, delete it!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.value) {
            axios.get(`${baseUrl}/cms/removelinks?uid=${JSON.parse(userId)}&id=${id}`)
            .then((res) => {
console.log("response", res)
if(res.data.code === 1){
  Swal.fire({
    title : "success",
    html  : "Link deleted successfully",
    icon : "success"
  })
  getList()
}
else{
  Swal.fire({
    title :"error",
    html : "Something went wrong , please try again",
    icon : "error"
  })
}
            })
          }
      });
  };
  
return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>

<MyContainer>
<div className="headingContent">
        <h4>Important Links </h4>
        <button 
    
      className="autoWidthBtn rightAlign my-2" onClick={(e) => {
        history.push("/admin/links")
      }}>New Links</button>
        </div>
    
    <Card>
        <CardBody>
        <DataTablepopulated 
                   bgColor="#42566a"
                   keyField={'id'}
                   data={list}
                   columns={columns}>
                    </DataTablepopulated>
        </CardBody>
        </Card>
   
    </MyContainer>
</Layout>
  );
}

export default Updates;





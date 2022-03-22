import React , {useState, useEffect} from 'react';
import Layout from "../../../components/Layout/Layout";
import {Container} from '@material-ui/core';
import {
  Card,
  CardBody,
} from "reactstrap";
import { styled } from "@material-ui/styles";
import { useHistory } from 'react-router';
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import DataTablepopulated from '../../../components/DataTablepopulated/DataTabel';
import  {DeleteIcon, EditQuery,} from "../../../components/Common/MessageIcon";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const MyContainer = styled(Container)({

})
const Cms = () =>{ 
  const [list, setList] = useState([])
    const userId = window.localStorage.getItem("adminkey");
    let history = useHistory()
    useEffect(() => {
      getList()
    }, [])
  
    const getList = () => {
      axios.get(`${baseUrl}/cms/getallarticles?uid=${JSON.parse(userId)}`)
      .then((res) => {
      
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
        dataField : "publish_date",
        text : "Date",
        headerStyle : () => {
          return { width : "100px" };
        }
      },
    
      {
        dataField : "type",
        text : "Category",
        headerStyle : () => {
          return { width : "100px" };
        }
      },
      {
        dataField : "heading",
        text : "Heading"
      },
      {
        dataField : "writer",
        text : "Writer",
        headerStyle : () => {
          return { width : "150px" };
        }
      },
      {
        dataField : "",
        text : "Action",
        headerStyle : () => {
          return { width : "100px" };
        },
        formatter : function CmsAction(cell, row) {
         return(
         <>
          <Link to={`/admin/articlesedit/${row.id}`}>
         <span title="Edit Articles">
         <EditQuery />
         </span>
      </Link>
      
      <span  title="Delete Articles" onClick={() => del(row.id)} className="ml-2">
       <DeleteIcon />
    </span>

         </>
         )
        }
      }
    ]
    const del = (id) => {
 

      Swal.fire({
          title: "Are you sure?",
          text: "Want to delete articles? Yes, delete it!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.value) {
            axios.get(`${baseUrl}/cms/removearticle?uid=${JSON.parse(userId)}&id=${id}`)
            .then((res) => {
console.log("response", res)
if(res.data.code === 1){
  Swal.fire({
    title : "success",
    html  : "Articles deleted successfully",
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
   
     {/* <button 
    
      className="autoWidthBtn rightAlign my-2" onClick={(e) => {
        history.push("/admin/articles")
      }}>Add Articles</button> */}
        <div className="headingContent">
        <h4>Articles </h4>
        <button 
    
    className="autoWidthBtn rightAlign my-2" onClick={(e) => {
      history.push("/admin/articles")
    }}>New Article</button> 
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

export default Cms;





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
  const [check, setCheck] = useState(false)
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
    const myShowValue = (e, row) => {
     
        if(e.target.checked === true){

            
            axios.get(`${baseUrl}/cms/setarticlestatus?uid=${JSON.parse(userId)}&id=${row.id}&status=0`)
       .then((res) => {
         
           if(res.data.result === 1){
             setCheck(true)
           }
       })
        }
        else{
           
            axios.get(`${baseUrl}/cms/setarticlestatus?uid=${JSON.parse(userId)}&id=${row.id}&status=1`)
            .then((res) => {
              
                setCheck(false)
            })
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
        dataField : "publish_date",
        text : "Date",
        headerStyle : () => {
          return { width : "100px" };
        },
        formatter : function dateFun (cell, row) {

return(
  <p>{row.publish_date.split("-").reverse().join("-")}</p>
)
        }
      },
    
      {
        dataField : "type",
        text : "Category",
        headerStyle : () => {
          return { width : "100px" };
        },
        formatter : function (cell, row){
       
          return(
            <p>{row.type.charAt(0).toUpperCase()+ row.type.slice(1)}</p>
          )
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
           <div style={{display : "flex", justifyContent : "space-evenly"}}>
          <Link to={`/cms/articlesedit/${row.id}`}>
         <span title="Edit Articles">
         <EditQuery />
         </span>
      </Link>
      
      <span  title="Delete Articles" onClick={() => del(row.id)} className="mx-2">
       <DeleteIcon />
    </span>

    {
                  row.status == "1" ?
                  <div>
                  <label class="switch" onChange= {(e) => myShowValue(e, row)}>
    <input type="checkbox"  defaultChecked/>
    <span class="slider round"></span>
  </label>
  
                  </div> :
                  ""
                }
                {
                  row.status == "0" ?
                  <div>
                  <label class="switch" onChange= {(e) => myShowValue(e, row)}>
    <input type="checkbox"  />
    <span class="slider round"></span>
  </label>
  
                  </div> : ""
                }
                </div>
         </>
         )
        }
      }
    ]
    const del = (id) => {
 

      Swal.fire({
          title: "Are you sure?",
          text: "Want to delete article? Yes, delete it!",
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
    html  : "Article deleted successfully",
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

<Container maxWidth="xl">
   
  
        <div className="headingContent">
        <h4>Articles </h4>
        <button 
    
    className="autoWidthBtn rightAlign my-2" onClick={(e) => {
      history.push("/cms/articles")
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
   
    </Container>
</Layout>
  );
}

export default Cms;





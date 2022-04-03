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
const MediaText = () =>{ 
    const userId = window.localStorage.getItem("adminkey");
    const [list, setList] = useState([])
    const [check, setCheck] = useState(false)
    let history = useHistory()
    useEffect(() => {
      getList()
    }, [])
  
    const getList = () => {
      axios.get(`${baseUrl}/cms/getallgalleryupdate?uid=${JSON.parse(userId)}`)
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
        headerStyle : () => {
          return{ width: "750px"}
        },
      },
     
      {
        dataField : "",
        text : "Action",
        headerStyle : () => {
          return{textAlign : "center"}
        },
        formatter : function CmsAction(cell, row) {
         return(
         <>
       
                  <div style={{display : "flex", justifyContent : "space-evenly"}}>
                  <Link to={`/cms/mediatext/${row.id}`}>
          <EditQuery titleName="Edit media news" />
      </Link>
      <span   onClick={() => del(row.id)} className="ml-2">
       <DeleteIcon titleName="Delete media news" />
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
    const myShowValue = (e, row) => {
      // console.log("etarget", e.target.checked)
      //   if(e.target.checked === true){
      //       e.target.checked = true
      //       axios.get(`${baseUrl}/cms/setgalleryupdatestatus?uid=${JSON.parse(userId)}&id=${row.id}&status=0`)
      //  .then((res) => {
         
      //      setCheck(true)
      //  })
      //   }
      //   else{
      //       e.target.checked = false
      //       axios.get(`${baseUrl}/cms/setgalleryupdatestatus?uid=${JSON.parse(userId)}&id=${row.id}&status=1`)
      //       .then((res) => {
               
      //           setCheck(false)
      //       })
      //   }
          
      if(e.target.checked === true){

            
        axios.get(`${baseUrl}/cms/setgalleryupdatestatus?uid=${JSON.parse(userId)}&id=${row.id}&status=0`)
   .then((res) => {
     
       if(res.data.result === 1){
         setCheck(true)
       }
   })
    }
    else{
       
        axios.get(`${baseUrl}/cms/setgalleryupdatestatus?uid=${JSON.parse(userId)}&id=${row.id}&status=1`)
        .then((res) => {
          
            setCheck(false)
        })
    }
     
  }
    const del = (id) => {
 

      Swal.fire({
          title: "Are you sure?",
          text: "Want to delete media news? Yes, delete it!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.value) {
            axios.get(`${baseUrl}/cms/removemedianews?uid=${JSON.parse(userId)}&id=${id}`)
            .then((res) => {
console.log("response", res)
if(res.data.code === 1){
  Swal.fire({
    title : "success",
    html  : "Media news deleted successfully",
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


<MyContainer>
     
    
        <div className="headingContent">
        <h4> Media News </h4>
        <button 
    
    className="autoWidthBtn rightAlign my-2" onClick={(e) => {
      history.push("/cms/mediatext")
    }}>New Media News</button>  
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

  );
}

export default MediaText;





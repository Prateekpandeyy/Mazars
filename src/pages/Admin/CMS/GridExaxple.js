import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import  {DeleteIcon, EditQuery,} from "../../../components/Common/MessageIcon";
const GridExample = () => {
    
   const [rowData, setRowData] = useState([])
  const [order, setOrder] = useState("")
  const token = window.localStorage.getItem("token")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
   const getList = () => {
       axios.get(`${baseUrl}/cms/getalllinks?uid=${JSON.parse(userId)}`, myConfig)
       .then((res) => {
       console.log("ress", res)
        if(res.data.code === 1){
         setRowData(res.data.result)
         let linkOrder = []
         res.data.result.map((i) => {
             
             let a = {
             "position" : i.id
             }
             linkOrder.push(a)
            
         })
         
       setOrder(linkOrder)
        }
       })
     }
     useEffect(() => {
         getList()
     }, [])
   const userId = window.localStorage.getItem("adminkey")
const allLinkOrder = (e) => {
  
    let formData = new FormData();
    formData.append("position", JSON.stringify(order));
    axios({

        method : "POST",
        url : `${baseUrl}/cms/linkspace`,
        headers : {
          uit : token
        },
        data : formData
    })
    .then((res) => {
       if(res.data.code === 1){
         Swal.fire({
           title :"success",
           html : "Order rearranged successfully",
           icon : "success"
         })
       }
       else{
        if(res.data.code === 1){
          Swal.fire({
            title :"error",
            html : "Something went wrong",
            icon : "error"
          })
        }
       }
    })
}

const [columnDefs] = useState([
        {
            field: 'Url',
            headerName : "URL",
            label : "URL",
            rowDrag: true,
            initialWidth: 250,
            cellRenderer: function(params) {
                let keyData = params.data.url;
                let newLink = 
                `<a href= ${keyData}
                target="_blank">${keyData}</a>`;
                return newLink;
            }
          
    
        },
        {
            field: 'Website',
            initialWidth: 500,
            cellRendererFramework:(params) =>
            <p>
{params.data.heading}
            </p>
    
        },
      
        {
            field: 'Action',
           
            initialWidth: 100,
          cellRendererFramework:(params) =>
              
               
          <div style={{display : "flex", justifyContent : "space-evenly"}}>
          <Link to={`/cms/linksedit/${params.data.id}`}>
 <div title="Edit link">
 <EditQuery />
 </div>
</Link>
<span   onClick={() => del(params.data.id)} className="ml-2" title="Delete links">
<DeleteIcon />
</span>
        
     </div>
  
              
        
            
        },
    ]);
    function del(id){
 

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
              axios.get(`${baseUrl}/cms/removelinks?uid=${JSON.parse(userId)}&id=${id}`, myConfig)
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
    
    const onRowDragEnd = (e) => {
        let linkOrder = []
        e.node.parent.allLeafChildren.map((i) => {
            
            let a = {
            "position" : i.data.id
            }
            linkOrder.push(a)
           
        })
     
      setOrder(linkOrder)
    }

   return (
   <>
    <div className="ag-theme-alpine" style={{height: 400, overflow: "auto"}}>
        <AgGridReact
            rowData={rowData}
            rowDragManaged={true}
            onRowDragEnd={onRowDragEnd}
            
            columnDefs={columnDefs}>
        </AgGridReact>
    </div>
    <button className="autoWidthBtn my-5" onClick={() => allLinkOrder()}>Set order</button>
   </>
);
};
export default GridExample;
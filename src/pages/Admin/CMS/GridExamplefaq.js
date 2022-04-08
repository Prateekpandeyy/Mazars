import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import  {DeleteIcon, EditQuery,} from "../../../components/Common/MessageIcon";
import { Markup } from 'interweave';
const GirdExamplefaq = () => {
  const [check, setCheck] = useState(false)
   const [rowData, setRowData] = useState([])
  const [order, setOrder] = useState("")
   const getList = () => {
    axios.get(`${baseUrl}/cms/getallfaq?uid=${JSON.parse(userId)}`)
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
        url : `${baseUrl}/cms/faqspace`,
        data : formData
    })
    .then((res) => {
      if(res.data.code === 1){
        Swal.fire({
          title :"success",
          html : "Order Rearranged successfully",
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
            field: 'question',
            rowDrag: true,
            initialWidth: 300,
            
          
    
        },
        {
            field: 'answer',
            initialWidth: 150,
            cellRendererFramework:(params) =>
            <Markup content={params.data.answer} />
    
        },
        {
            field: 'Date',
            initialWidth: 150,
            valueGetter: function (params) {
              
                return params.data.created_date.split(" ")[0].split("-").reverse().join("-");
              },
           
    
        },
        {
            field: 'Action',
           
            initialWidth: 150,
          cellRendererFramework:(params) =>
              
     <>
                   <div style={{display : "flex", alignContent: "center", justifyContent : "space-evenly"}}>
              <Link to={`/cms/editfaq/${params.data.id}`}>
  
              <EditQuery titleName="Edit Flash Update"/>
            
              </Link>
                     <div onClick = {(e) => del(params.data)}> 
      <DeleteIcon titleName="Delete Flash Update" />
                     </div>
                  
{
              params.data.status == "1" ?
              <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <label class="switch" onChange= {(e) => myShowValue(e, params.data)}>
<input type="checkbox"  defaultChecked/>
<span class="slider round"></span>
</label>

              </div> :
              ""
            }
            {
              params.data == "0" ?
              <div>
              <label class="switch" onChange= {(e) => myShowValue(e, params.data)}>
<input type="checkbox"  />
<span class="slider round"></span>
</label>

              </div> : ""
            }
         </div>
     
     </>
  
              
        
            
        },
    ]);
    const myShowValue = (e, row) => {
 
      if(e.target.checked === true){
      
          
          axios.get(`${baseUrl}/cms/setfaqstatus?uid=${JSON.parse(userId)}&id=${row.id}&status=0`)
      .then((res) => {
         console.log("res", res)
         if(res.data.result === 1){
           setCheck(true)
         }
      })
      }
      else{
         
          axios.get(`${baseUrl}/cms/setfaqstatus?uid=${JSON.parse(userId)}&id=${row.id}&status=1`)
          .then((res) => {
              console.log("res", res)
              setCheck(false)
          })
      }
        
      
      }
      const del = (id) => {
      
      
        Swal.fire({
            title: "Are you sure?",
            text: "Want to delete faq? Yes, delete it!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
              axios.get(`${baseUrl}/cms/removefaq?uid=${JSON.parse(userId)}&id=${id.id}`)
              .then((res) => {
      console.log("response", res)
      if(res.data.code === 1){
      Swal.fire({
      title : "success",
      html  : "faq deleted successfully",
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
  console.log("order", order)
   return (
   <>
    <div className="ag-theme-alpine" style={{height: 400, width: 800, overflow: "auto"}}>
        <AgGridReact
            rowData={rowData}
            rowDragManaged={true}
            onRowDragEnd={onRowDragEnd}
            
            columnDefs={columnDefs}>
        </AgGridReact>
    </div>
    <button className="autoWidthBtn my-5" onClick={() => allLinkOrder()}>Set Order</button>
   </>
);
};
export default GirdExamplefaq;
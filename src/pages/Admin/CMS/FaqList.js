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
import CommonServices from "../../../common/common";
import GirdExamplefaq from './GridExamplefaq';
const MyContainer = styled(Container)({

})
const Updates = () =>{ 
    const userId = window.localStorage.getItem("adminkey");
    const [list, setList] = useState([])
    const [check, setCheck] = useState(false)
    let history = useHistory()
    useEffect(() => {
      getList()
    }, [])
  
    const getList = () => {
      axios.get(`${baseUrl}/cms/getallfaq?uid=${JSON.parse(userId)}`)
      .then((res) => {
      console.log("ress", res)
       if(res.data.code === 1){
        setList(res.data.result)
        
       }
      })
    }
   
    
//     const columns = [
//       {
//         text: "S.No",
//         dataField: "",
//         formatter: (cellContent, row, rowIndex) => {
//           return rowIndex + 1;
//         },
//         headerStyle: () => {
//           return { width: "50px" };
//         },
//       },
//       {
//         text: "Question",
//         dataField: "question",
//         headerStyle : () => {
//           return {width: "150px"}
//         },
       
       
//       },
//       {
//           text: "Answer",
//           dataField: "",
//           formatter: function nameFunction(cell, row) {
//             return(
//               <Markup content={row.answer} />
//             )
//           }
         
//         },
       
//         {
//           text: "Action",
//           dataField: "",
//           headerStyle : () => {
//               return {width: "150px"}
//           },
//           formatter : function(cell, row) {
//          if(row.status == "1"){
//            setCheck(true)
//            console.log("doneeee", row.id)
//          }
//          else{
//            setCheck(false)
//          }
//               return(
//                   <>
//                <div style={{display : "flex", justifyContent : "space-evenly"}}>
//                <Link to={`/cms/editfaq/${row.id}`}>
  
//            <EditQuery titleName="Edit Flash Update"/>
          
//            </Link>
//                   {/* <div onClick = {(e) => delQuery(row)}> 
//    <DeleteIcon titleName="Delete Flash Update" />
//                   </div> */}
                
//                 {
//                   row.status == "1" ?
//                   <div>
//                   <label class="switch" onChange= {(e) => myShowValue(e, row)}>
//     <input type="checkbox"  defaultChecked/>
//     <span class="slider round"></span>
//   </label>
  
//                   </div> :
//                   ""
//                 }
//                 {
//                   row.status == "0" ?
//                   <div>
//                   <label class="switch" onChange= {(e) => myShowValue(e, row)}>
//     <input type="checkbox"  />
//     <span class="slider round"></span>
//   </label>
  
//                   </div> : ""
//                 }
           
//                </div>
//                   </>
              
//               )
//           }
          
//         },
     
//   ]
//   const myShowValue = (e, row) => {
     
//     if(e.target.checked === true){

        
//         axios.get(`${baseUrl}/cms/setfaqstatus?uid=${JSON.parse(userId)}&id=${row.id}&status=0`)
//    .then((res) => {
     
//        if(res.data.result === 1){
//          setCheck(true)
//        }
//    })
//     }
//     else{
       
//         axios.get(`${baseUrl}/cms/setfaqstatus?uid=${JSON.parse(userId)}&id=${row.id}&status=1`)
//         .then((res) => {
          
//             setCheck(false)
//         })
//     }
      
 
// }
  

// const delQuery = (e) => {
//   //   axios.get(`${baseUrl}/admin/removenews?uid=${userId}&id=${e.id}`)
//   //   .then((res) => {
//   //       console.log("response", res)
//   //   })
//   Swal.fire({
//       title: "Are you sure?",
//       text: "do you wnat to delete flash updates",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes",
//     }).then((result) => {
//       if (result.value === true) {
//           axios.get(`${baseUrl}/cms/removenews?uid=${JSON.parse(userId)}&id=${e.id}`)
//     .then((res) => {
//         if(res.data.code === 1){
//             Swal.fire({
//                 title : "success",
//                 html : "Flash Update deleted successfully", 
//                 icon : "success"
//             })
//             getList()
//         }
//         else{
//           Swal.fire({
//               title : "error",
//               html : "something went wrong, please try again", 
//               icon : "error"
//           })
//         }
//     })
// }
// })
// }
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
    dataField : "question",
    text : "Question",
    headerStyle : () => {
      return{ width: "150px"}
    },
  },
  {
              text: "Answer",
              dataField: "",
              formatter: function nameFunction(cell, row) {
                return(
                  <Markup content={row.answer} />
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
              <Link to={`/cms/editfaq/${row.id}`}>
  
              <EditQuery titleName="Edit Flash Update"/>
            
              </Link>
                     <div onClick = {(e) => del(row)}> 
      <DeleteIcon titleName="Delete Flash Update" />
                     </div>
                  
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
return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>

<MyContainer>
<div className="headingContent">
        <h4>FAQs </h4>
        <Link to={`/cms/faqedit/4`}>
<button 
    
    className="autoWidthBtn rightAlign my-2">Add FAQ</button>
      </Link> 
        </div>

        <Card>
          <CardBody>
          {/* <DataTablepopulated 
                  bgColor = "#5a625a"
                   keyField= {"assign_no"}
                   data={list}
                   columns={columns}>
                    </DataTablepopulated> */}
                    <GirdExamplefaq />
          </CardBody>
          </Card>
    </MyContainer>
</Layout>
  );
}

export default Updates;





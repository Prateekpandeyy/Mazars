// import React, { useCallback, useMemo, useRef, useState } from 'react';
// import { render } from 'react-dom';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import axios from 'axios';
// import { baseUrl } from '../../../config/config';
// var rowDragText = function (params) {
//   // keep double equals here because data can be a string or number
//   if (params.rowNode.data.year == '2012') {
//     return params.defaultTextValue + ' (London Olympics)';
//   }
//   return params.defaultTextValue;
// };

// const GridExample = () => {
//   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
//   const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
//   const [rowData, setRowData] = useState();
//   const columnDefs = [
//     {
//         field: 'url',
//         rowDrag: true,

//     }
// ];

//   const userId = window.localStorage.getItem("adminkey");
//   const defaultColDef = useMemo(() => {
//     return {
//       width: 170,
//       sortable: true,
//       filter: true,
//     };
//   }, []);
//   const getList = () => {
//     axios.get(`${baseUrl}/cms/getalllinks?uid=${JSON.parse(userId)}`)
//     .then((res) => {
//     console.log("ress", res)
//      if(res.data.code === 1){
//       setRowData(res.data.result)
      
//      }
//     })
//   }
//   const onGridReady = useCallback((params) => {
//    getList()}, []);
//   console.log("done")
//   return (
    
//     <div style={containerStyle}>
//       <div style={gridStyle} className="ag-theme-alpine">
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={columnDefs}
//           defaultColDef={defaultColDef}
//           rowDragManaged={true}
//           animateRows={true}
//           onGridReady={onGridReady}
//         ></AgGridReact>
//       </div>
//     </div>
//   );
// };
// export default GridExample;
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from 'axios';
import { baseUrl } from '../../../config/config';
const GridExample = () => {
    
   const [rowData, setRowData] = useState([])
   const getList = () => {
       axios.get(`${baseUrl}/cms/getalllinks?uid=${JSON.parse(userId)}`)
       .then((res) => {
       console.log("ress", res)
        if(res.data.code === 1){
         setRowData(res.data.result)
          
        }
       })
     }
     useEffect(() => {
         getList()
     }, [])
   const userId = window.localStorage.getItem("adminkey")
const rowDragText = (e) => {
    console.log("eee", e.rowNode.childIndex)
    let formData = new FormData();
    formData.append("position", e.rowNode.childIndex);
    axios({
        method: "POST",
        url : `${baseUrl}/cms/linkspace`,
        method: formData
    })
    .then((res) => {
        console.log("res", res)
    })
}
const [columnDefs] = useState([
        {
            field: 'url',
            rowDrag: true,
            rowDragText: rowDragText,
    
        },
        {
            field: 'heading',
           
    
        }
    ]);
   return (
    <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
        <AgGridReact
            rowData={rowData}
            rowDragManaged={true}
            columnDefs={columnDefs}>
        </AgGridReact>
    </div>
);
};
export default GridExample;
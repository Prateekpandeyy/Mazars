import React from "react";
import { Container , Paper} from  "@material-ui/core";
import BootstrapTable from "react-bootstrap-table-next";
import { styled } from "@material-ui/styles";


const DataTablepopulated = (props) => {
    const colorCode = props.bgColor;

const MyContainer = styled(Container)({
    display: 'flex',
    height : "65vh",
    overflowY : 'auto',
    "& thead": {
        position :"sticky",
        top : "0",
        zIndex : 1,
        border : "0px",
        color : "#fff",
        backgroundColor : `${props.bgColor}`
     
      
    }, 
    "& thead tr th" : {
     border : "0px",
     fontSize : "12px",
     padding: "10px 2px"
    },

    "& tbody tr td" : {
       
        fontSize : "11px",
    }
   
 })
    return(
        <>
<MyContainer disableGutters>
 
 <BootstrapTable 
  keyField = {props.keyField}
  data = {props.data}
  columns = {props.columns}
  rowStyle = {props.rowStyle2}
  rowIndex/>

</MyContainer>
        </>
    )

}
export default DataTablepopulated;
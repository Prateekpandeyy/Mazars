import React from "react";
import { Container , Paper} from  "@material-ui/core";
import BootstrapTable from "react-bootstrap-table-next";
import { styled } from "@material-ui/styles";


const DataTablepopulated = (props) => {
    const colorCode = props.bgColor;

const MyContainer = styled(Container)({
    display: 'flex',
    height : "65vh",
    maxWidth: "1920px", 
    width: "100%",
   
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
     fontSize : "0.8rem",
     padding: "5px"
    },

    "& tbody tr td" : {
       padding : "0.50rem",
        fontSize : "0.77rem",
    }
   
 })
    return(
        <>
{
    props.data ?
    <MyContainer disableGutters id = "veRep">
 
 <BootstrapTable 
  keyField = {props.keyField}
  data = {props.data}
  columns = {props.columns}
  rowStyle = {props.rowStyle2}
  rowIndex/>

</MyContainer> : ""
}
        </>
    )

}
export default DataTablepopulated;
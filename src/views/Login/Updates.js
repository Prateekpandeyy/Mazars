import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import './style.css';
import {Box} from "@material-ui/core";
import { styled , makeStyles} from "@material-ui/styles";
import { Markup } from "interweave";
import { useHistory, useParams } from "react-router";
import axios from 'axios';
import {baseUrl} from '../../config/config';
import { Table, TableContainer, 
  TableHead, TablePagination, TableBody, TableRow, TableCell} from "@material-ui/core";
const MyBox = styled(Box)({
  display: "flex", 
 width: "1000px",
 margin: "10px 0px",
  justifyContent : "space-between",
 
  padding : "10px"
})
const ImgBox = styled(Box)({
display: "flex",
width: "20%",
flexDirection: "column",
minHeight: "200px",
alignItems : "center",
padding : "10px"
})
const MyContainer = styled(Box)({
  display : "flex", 
  justifyContent : "center", 
  alignItems : "center", 
  width: "100%",
  flexDirection : "column"
})
const useStyle = makeStyles({
  imgResponsive : {
    display : "flex",
    maxWidth: "25%",
    height : "50px", 
    cursor : "pointer",
   alignItems : "space-between",
    justifyContent: "center",
    textAlign : "justify"
  }
})

function Updates() {
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [linkData, setLinkData] = useState([])
  const [showData, setShowData] = useState(false)
  const [updates, isUpdates] = useState(false)
  const [myData, setMyData] = useState()
  const [ description, setDescription] = useState(false)
  const [linkData22, showLinkData22] = useState(false)
  let history = useHistory()
  let id = useParams()
  const getId = history.location.index;
useEffect(() => {
  showLinkData()
}, [])
const showLinkData = () => {
 
  if(getId === 2){
    axios.get(`${baseUrl}/customers/getupdated`)
    .then((res) => {
     isUpdates(true)
      setLinkData(res.data.result)
    })
   }
   else if(getId === 3){
    axios.get(`${baseUrl}/customers/getimportantlink`)
    .then((res) => {
     console.log("res", res)
      setLinkData(res.data.result)
      showLinkData22(true)
      isUpdates(false)
    })
   }
   else if (getId === 4){
    axios.get(`${baseUrl}/customers/getpage?page=${getId}`)
    .then((res) => {
      console.log("res", res)
      setLinkData([res.data.result])
      isUpdates(false)
    })
   }
  }
  
  
  
  if(window.location.origin === "http://mazars.multitvsolution.com" && window.location.protocol == 'http:'){
    window.location.href = window.location.href.replace('http:', 'https:')
  }
  
  

 const getData = (e) => {
setDescription(true);
setMyData(e)
 }
 const onChangePage = (event, nextPage) => {
  setPage(nextPage)
}
const onChangeRowsPerPage = (e) => {
  setRowsPerPage(e.target.value)
}
  
const classes = useStyle()

  return (
    <>
      <Header noSign="noSign" getData = {setShowData} />
     <MyContainer>
   
  
   {
     description === false ? 
     <div className="StartPageDetails">
     <div className="mainContent222">


  <>
 {
   updates === true ?
  <TableContainer>
    <Table>
      <TableBody>
      {
  linkData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, e) => (
        <TableRow>
          <TableCell onClick={(p) => getData(i.content)} style={{pointer : "cursor"}}>
         
     <Markup content = {i.heading} /> 
  
          </TableCell>
        </TableRow>
         ))
        }
      </TableBody>
    </Table>
    <TablePagination 
        rowsPerPageOptions = {[5, 10, 15, 20, 25]}
        count = {10}
        rowsPerPage = {rowsPerPage}
        page = {page}
        onChangePage = {onChangePage}
        onChangeRowsPerPage = {onChangeRowsPerPage}
         />
  </TableContainer>
   : 
   <>
     {/* {
  linkData.map((i) => (
   <Markup content = {`${i.heading}  ${i.url}`} />
   ))
  } */}
    <TableContainer>
    <Table>
      <TableBody>
      {
  linkData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, e) => (
 
 <>
  {linkData22 === true ?
    <TableRow>
      <TableCell>
      <Markup content = {`<div id="myValue22"> <h6> ${e + 1}</h6> <h4>${i.heading} </h4>  <a href=${i.url} target="_blank">${i.url}</a></div>`} />
      </TableCell>
    </TableRow>
  : 
  <TableRow>
 <TableCell onClick={(p) => getData(i.content)} style={{pointer : "cursor"}}>
   </TableCell>
   <Markup content = {i.content} />
    </TableRow> }
 </>
         ))
        }
      </TableBody>
    </Table>
    <TablePagination 
        rowsPerPageOptions = {[5, 10, 15, 20, 25]}
        count = {10}
        rowsPerPage = {rowsPerPage}
        page = {page}
        onChangePage = {onChangePage}
        onChangeRowsPerPage = {onChangeRowsPerPage}
         />
  </TableContainer>
   </>
 }
  </>
 
   </div>

 </div> : 
   <div className="StartPageDetails">
   <div className="mainContent222">

   <Markup content = {myData} />
 </div>

</div>

   }
     </MyContainer>


      <Footer />
    </>
  );
}

export default Updates;

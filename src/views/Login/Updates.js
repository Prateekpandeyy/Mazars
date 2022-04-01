import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import './style.css';
import {Box} from "@material-ui/core";
import { styled , makeStyles} from "@material-ui/styles";
import { Markup } from "interweave";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from 'axios';
import {baseUrl} from '../../config/config';
import {Typography, Breadcrumbs, Table, TableContainer, 
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
  const [rowsPerPage, setRowsPerPage] = useState(10)
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
  
  
  
  if(window.location.origin === "http://masindia.live" && window.location.protocol == 'http:'){
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
       <Breadcrumbs separator="<" maxItems={3} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" to={{
    pathname : "/customer/updates",
    index : 2
  }}>
   Updates
  </Link>
  
 
  </Breadcrumbs>
    <Table>
      <TableBody>
      {
  linkData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, e) => (
        <TableRow>
          <TableCell  onClick={(p) => getData(i)}className="tableCellStyle">
         <span className="tabHover">
    <span className="updatesLink">
     {`${e + 1} . ${i.heading} -    ${i.publish_date.split("-").reverse().join("-")}`}
      </span>
  </span>
          </TableCell>
        </TableRow>
         ))
        }
      </TableBody>
    </Table>
   {
     linkData.length > 10 ?
     <TablePagination 
     rowsPerPageOptions = {[5, 10, 15, 20, 25]}
     count = {linkData.length}
     rowsPerPage = {rowsPerPage}
     page = {page}
     onChangePage = {onChangePage}
     onChangeRowsPerPage = {onChangeRowsPerPage}
      /> : ""
   }
  </TableContainer>
   : 
   <>
   
    <TableContainer>
    {linkData22 === true ? <>
    <Breadcrumbs separator="<" maxItems={3} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" to={{
    pathname : "/customer/updates",
    index : 3
  }}>
  Important Links
  </Link>
  

  </Breadcrumbs>
    <Table>
    <TableHead>
   <TableRow>
     <TableCell style= {{width : "50px"}}>S.No</TableCell>
     <TableCell style={{width : "400px"}}>Heading</TableCell>
     <TableCell>Url</TableCell>
   </TableRow>
   </TableHead>
      <TableBody>
      {
  linkData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, e) => (
 
 <>

  
    <TableRow>
      <TableCell style={{padding: "8px 16px"}} className="tableCellStyle">
     
        {e + 1}
      </TableCell>
      <TableCell>
        {i.heading}
      </TableCell>
      <TableCell>
        <a href={i.url} target="_blank">{i.url}</a>
      </TableCell>
    </TableRow>
 
 </>
         ))
        }
      </TableBody>
    </Table>
    </> : "" }
    {linkData22 === false ? <>
 {
   linkData.length > 0 ?
   <Breadcrumbs separator="<" maxItems={3} aria-label="breadcrumb">
   <Link underline="hover" color="inherit" to={{
    pathname : "/customer/updates",
    index : 4
  }}>
   FAQs
   </Link>
   
   
   </Breadcrumbs> : ""
 }
   {
     linkData.map((i) => (
      <Markup className="myFaq" content = {i.content} />
     ))
   }
    </> : "" }
    {
      linkData.length > 10 ?
      <TablePagination 
        rowsPerPageOptions = {[5, 10, 15, 20, 25]}
        count = {linkData.length}
        rowsPerPage = {rowsPerPage}
        page = {page}
        onChangePage = {onChangePage}
        onChangeRowsPerPage = {onChangeRowsPerPage}
         /> : ""
    }
  </TableContainer>
   </>
 }
  </>
 
   </div>

 </div> : 
   <div className="StartPageDetails">
   <div className="mainContent222">
   <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
  
  <Link underline="hover" color="inherit" to = {{
  pathname : "/customer/updates",
  index : 2
}}>
   Updates
  </Link>
  <Typography color="text.primary">{myData.heading}</Typography>
  </Breadcrumbs>
   <Markup content = {`<h4>${myData.heading} </h4> <span>${myData.content}</span>`} />
 </div>

</div>

   }
     </MyContainer>


      <Footer />
    </>
  );
}

export default Updates;

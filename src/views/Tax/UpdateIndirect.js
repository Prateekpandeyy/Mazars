import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import Footer from '../../components/Footer/Footer';
import { useHistory, useParams  } from 'react-router';
import axios from 'axios';
import { baseUrl, baseUrl3 } from '../../config/config';
import { Box, Breadcrumbs, Table, TableContainer, 
  TableHead, TablePagination, TableBody, TableRow, TableCell} from "@material-ui/core";
import classes from './design.module.css';

import { OuterloginContainer } from '../../components/Common/OuterloginContainer';

import { Link } from 'react-router-dom';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
  const Disclamair = styled(Box)({
display: "flex",
flexDirection: "column",
width:"100%",
padding: "20px"
  })
  const ArticleWrapper = styled(Box)({
    display: "flex", 
    flexDirection: "column",
  
    padding: "5px"
  })
  const ArticleHeader = styled(Box)({
    display : "flex",
    width: "100%",
    justifyContent: "space-between",
   
    backgroundColor: "#e4f0fa",
  
    padding: "10px 5px",
    margin: "8px 0px"
  })
  const MyLogo = styled(Box)({
    display : "flex",
    width: "100%",
    height: "auto",
    maxWidth: "100px",
    objectFit: "contain"
  })
  const MyHeading = styled(Box)({
    display : "flex",
    justifyContent: "space-between"
  })
  const RightContent = styled(Box)({
    display: "flex",
    flexDirection: "column"
  })
const UpdateIndirect = () => {
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [data, setData] = useState([])
 
  useEffect(() => {
    getData()

  }, [])
  let wirtten = "-"
  const onChangePage = (event, nextPage) => {
      setPage(nextPage)
  }
  const onChangeRowsPerPage = (e) => {
      setRowsPerPage(e.target.value)
  }
  const getData = (e) => {
    let dataObj = {}
  let dataList = []
  
    axios.get(`${baseUrl}/customers/getupdated?type=indirect`)
    
      .then((res) => {
    
        res.data.result.map((i, e) => {
    dataObj = {
      sn : ++e,
      content : i.content,
      file : i.file,
      heading : i.heading,
      id : i.id,
      publish_date : i.publish_date,
      status : i.status,
      type : i.type
    }
    dataList.push(dataObj)
        })
          setData(dataList)
          
        })
      
    }
    
return(
  <>

  <OuterloginContainer>
  <Header noSign="noSign"/>
   <MyContainer>


   <div className={classes.articleContent}>
   
       <div className={classes.articlesDetails}>
       <TableContainer>
<>
<Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
    <Link underline="hover" color="inherit" to="/customer/updatedirect">
 Update
  </Link>
  <Link underline="hover" color="inherit" to = {`/customer/updateindirect`}>
 Indirect Tax
  </Link>
  

  </Breadcrumbs>
<div className={classes.articleContent}>
<div className={classes.articlesDetails}>

<Table>
<TableHead>
<TableRow>
<TableCell style= {{width : "50px"}}>S.No</TableCell>
<TableCell style={{width : "150px"}}>Publish Date</TableCell>
<TableCell>Heading </TableCell>
</TableRow>
</TableHead>
 <TableBody>
 {
data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, e) => (

<>


<TableRow>
<TableCell style={{padding: "8px 16px"}} className="tableCellStyle">
     
     {i.sn}
   </TableCell>
 <TableCell>
 {i.publish_date.split("-").reverse().join("-")}
 </TableCell>
 <TableCell>

  <Link to = {{
                            pathname : `/customer/update-details/${i.id}`,
                            index : "indirect"
                            
                        }}>
 {i.heading}</Link>
 </TableCell>
</TableRow>

</>
    ))
   }
 </TableBody>
 {
           data.length > 10 ?
           <TablePagination 
           rowsPerPageOptions = {[5, 10, 15, 20, 25]}
           count = {data.length}
           rowsPerPage = {rowsPerPage}
           page = {page}
           onChangePage = {onChangePage}
           onChangeRowsPerPage = {onChangeRowsPerPage} />
         : ""    
       }
</Table>
</div>
</div>
</>


</TableContainer>
       </div>
   </div>
 
  </MyContainer>
  <Footer />
  </OuterloginContainer>
  </>

)
}
export default UpdateIndirect;
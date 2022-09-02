import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import './style.css';
import {Box} from "@material-ui/core";
import { styled , makeStyles} from "@material-ui/styles";
import { Markup } from "interweave";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from 'axios';
import { baseUrl, baseUrl3 } from '../../config/config';
import ima from "../../mazars_logo.png";
import classesCustom from './design.module.css';
import CommonServices from '../../common/common.js';
import {  VscFilePdf} from "react-icons/vsc";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import {Typography, Breadcrumbs, Table, TableContainer, 
  TableHead, TablePagination, TableBody, TableRow, TableCell} from "@material-ui/core";
import MyContainer from "../../components/Common/MyContainer";

function Linklist() {
 
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
 
  
  
    axios.get(`${baseUrl}/customers/getimportantlink`)
    .then((res) => {
     console.log("res", res)
      setLinkData(res.data.result)
      showLinkData22(true)
      isUpdates(false)
    })
   
  
  }
  
  
  return (
    <>
    <OuterloginContainer>
      <Header noSign="noSign" getData = {setShowData} />
     <MyContainer>
   
  

     <div className={classesCustom.articleContent}>
     <div className={classesCustom.articlesDetails}>

 

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
  <div className={classesCustom.articleContent}>
     <div className={classesCustom.articlesDetails}>

    <Table>
    <TableHead>
   <TableRow>
     <TableCell style= {{width : "50px"}}>S.No</TableCell>
     <TableCell style={{width : "400px"}}>Website</TableCell>
     <TableCell>URL</TableCell>
   </TableRow>
   </TableHead>
      <TableBody>
      {
  linkData.map((i, e) => (
 
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
    </div>
    </div>
    </> : "" }
  
    
  </TableContainer>
   </>


 
   </div>

 </div> 
     </MyContainer>


      <Footer />
      </OuterloginContainer>
    </>
  );
}

export default Linklist;

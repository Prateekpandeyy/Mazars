import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../../config/config';
import Footer from '../../components/Footer/Footer';
import { Button, Box, Typography, Table, TableContainer, 
TableHead, TablePagination, TableBody, TableRow, TableCell } from "@material-ui/core";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import classesCustom from './design.module.css';
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
const MyContainer = styled(Box)({
    display: "flex",
  padding : "0 15px",
  height: "100%",
  flexDirection: "column",
  justifyContent: "space-between"
  })
const Direct = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [data, setData] = useState([])
    const [count2, setCount] = useState(0)
    let wirtten = "-"
    const onChangePage = (event, nextPage) => {
        setPage(nextPage)
    }
    const onChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value)
    }
    const getData =() => {
        axios.get(`${baseUrl}/customers/getarticles?type=direct`)
        .then((res) => {
          console.log("response", res)

         
          console.log("resDaata", res.data.result.length)
          setCount(res.data.result)
          let dataObj = {}
          let dataList = []
          res.data.result.map((i, e) => {
            dataObj = {
              sn : ++e,
              content : i.content,
              file : i.file,
              heading : i.heading,
              id : i.id,
              publish_date : i.publish_date,
              status : i.status,
              type : i.type,
              writer : i.writer
            }
            dataList.push(dataObj)
                })
                setData(dataList)
        })
    }
  useEffect(()=> {
      getData()
  }, [])
    return(
       <>
<OuterloginContainer>
<Header noSign="noSign" />
        <MyContainer>
   
  
        <div className={classesCustom.articleContent}>
     <div className={classesCustom.articlesDetails}>

          <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/customer/direct">
  Articles
  </Link>
  <Link underline="hover" color="inherit" to="/customer/direct">
  Direct Tax
  </Link>
  
  
</Breadcrumbs>
    <TableContainer>
        <Table>
    <TableHead>
   <TableRow>
   <TableCell style= {{width : "50px"}}>S.No</TableCell>
     <TableCell style= {{width : "150px"}}>Publishing Date</TableCell>
     <TableCell style={{width : "400px", margin: "0 10px"}}>Heading</TableCell>
     <TableCell>Name of Writer</TableCell>
   </TableRow>
   </TableHead>

            <TableBody>
               {
                   data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, e) => (
                    <TableRow>
                         <TableCell style={{padding: "8px 16px"}} className="tableCellStyle">
     
     {i.sn}
   </TableCell>
                        <TableCell style= {{width : "150px"}}>
                            {i.publish_date.split("-").reverse().join("-")}
                            </TableCell>
                    <TableCell style={{width : "400px", margin: "0 10px", wordBreak : "break-all"}} className="tableCellStyle">
                        <Link to = {{
                            pathname : "/customer/details",
                            index : i.id,
                            hash : "direct"
                        }}>
                   {`${i.heading}` } 
                
                        </Link>
                    </TableCell>
                    <TableCell>
                            {i.writer}
                            </TableCell>
                </TableRow>
                   ))
               }
               
            </TableBody>
        </Table>
    
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
      
    </TableContainer>
          </div>
      
        </div>
      
       </MyContainer>
       <Footer />
</OuterloginContainer>
       </>
  
    )
}
export default Direct;
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
const MyContainer = styled(Box)({
    display: "flex",
  minHeight: "100vh",
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
          setData(res.data.result)
          console.log("resDaata", res.data.result.length)
          setCount(res.data.result)
        })
    }
  useEffect(()=> {
      getData()
  }, [])
    return(
       <>
        <Header noSign="noSign" />
        <MyContainer>
   
  
        <div className={classesCustom.articleContent}>
     <div className={classesCustom.articlesDetails}>

          <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/customer/direct">
  Articles
  </Link>
  <Link underline="hover" color="inherit" to="/customer/direct">
  Direct tax
  </Link>
  
  
</Breadcrumbs>
    <TableContainer>
        <Table>
            <TableBody>
               {
                   data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, e) => (
                    <TableRow>
                    <TableCell className="tableCellStyle">
                        <Link to = {{
                            pathname : "/customer/details",
                            index : i.id,
                            hash : "direct"
                        }}>
                   {`${e + 1 } . ${i.heading} ${wirtten}` } <span style={{fontWeight: "bold",  margin:"0 10px"}}>{i.writer}</span>
                  -  {i.publish_date.split("-").reverse().join("-")}
                        </Link>
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
       </>
  
    )
}
export default Direct;
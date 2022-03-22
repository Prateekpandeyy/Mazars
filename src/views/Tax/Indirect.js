
import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import Data from './directData.js';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import Footer from '../../components/Footer/Footer';
import { Button, Breadcrumbs, Box, Typography, Table, TableContainer, 
TableHead, TablePagination, TableBody, TableRow, TableCell } from "@material-ui/core";
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
const Indirect = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [data, setData] = useState([])
    let wirtten = "-"
    const onChangePage = (event, nextPage) => {
        setPage(nextPage)
    }
    const onChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value)
    }
    const getData =() => {
        axios.get(`${baseUrl}/customers/getarticles?type=indirect`)
        .then((res) => {
          console.log("response", res)
          setData(res.data.result)
        })
    }
  useEffect(()=> {
      getData()
  }, [])
    return(
       <>
        <Header noSign="noSign" />
        <MyContainer>
   
  
        <div className="StartPageDetails">
          <div className="mainContent222">
          
          <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/customer/direct">
  Articles
  </Link>
  <Link underline="hover" color="inherit" to="/customer/indirect">
  Indirect tax
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
                            hash : "indirect"
                        }}>
                    {e + 1} {i.heading} {wirtten} <span style={{fontWeight: "bold",  margin:"0 10px"}}>{i.writer}</span>
                    -  {i.publish_date.split("-").reverse().join("-")}
                        </Link>
                    </TableCell>
                </TableRow>
                   ))
               }
               
            </TableBody>
        </Table>
       {
           data.length > 4 ?
           <TablePagination 
           rowsPerPageOptions = {[5, 10, 15, 20, 25]}
           count = {data.length}
           rowsPerPage = {rowsPerPage}
           page = {page}
           onChangePage = {onChangePage}
           onChangeRowsPerPage = {onChangeRowsPerPage}
            /> : ""
       }
    </TableContainer>
          </div>
      
        </div>
      
       </MyContainer>
       <Footer />
       </>
  
    )
}
export default Indirect;
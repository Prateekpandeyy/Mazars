import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../../config/config';
import Footer from '../../components/Footer/Footer';
import { Button, Box, Typography, Table, TableContainer, 
TableHead, TablePagination, TableBody, TableRow, TableCell } from "@material-ui/core";
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
const Direct = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)
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
   
  
        <div className="StartPageDetails">
          <div className="mainContent222">
          <h4> Articles - Direct Tax </h4>
   
    <TableContainer>
        <Table>
            <TableBody>
               {
                   data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i) => (
                    <TableRow>
                    <TableCell>
                        <Link to = {{
                            pathname : "/customer/details",
                            index : i.id
                        }}>
                     {i.heading} {wirtten} <span style={{fontWeight: "bold"}}>{i.writer}</span>
                        </Link>
                    </TableCell>
                </TableRow>
                   ))
               }
               
            </TableBody>
        </Table>
    
                <TablePagination 
            rowsPerPageOptions = {[5, 10, 15, 20, 25]}
            count = {100}
            rowsPerPage = {rowsPerPage}
            page = {page}
            onChangePage = {onChangePage}
            onChangeRowsPerPage = {onChangeRowsPerPage} />
             
      
    </TableContainer>
          </div>
      
        </div>
      
       </MyContainer>
       <Footer />
       </>
  
    )
}
export default Direct;
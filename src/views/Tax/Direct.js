import React , {useState} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import Data from './directData.js';
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
    const onChangePage = (event, nextPage) => {
        setPage(nextPage)
    }
    const onChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value)
    }
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
                   Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i) => (
                    <TableRow>
                    <TableCell>
                        <Link to = "/customer/details">
                      {i.title}
                        </Link>
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
          </div>
      
        </div>
      
       </MyContainer>
       <Footer />
       </>
  
    )
}
export default Direct;
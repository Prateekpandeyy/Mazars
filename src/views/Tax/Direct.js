import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../../config/config';
import Footer from '../../components/Footer/Footer';
import { Button, Box, Typography, TableContainer, TableFooter,
TableHead, TablePagination, TableBody, TableRow, TableCell } from "@material-ui/core";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import classesCustom from './design.module.css';
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
import CommonServices from "../../common/common";
import Table from "./Table/Table";
const MyContainer = styled(Box)({
    display: "flex",
  padding : "0 15px",
  height: "100%",
  flexDirection: "column",
  justifyContent: "space-between"
  })
const Direct = () => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [data, setData] = useState([])
    const [count2, setCount] = useState(0)
    const [dataCount, setDataCount] = useState(0)
    const loadpage = Number(localStorage.getItem("prevPage"))
    let wirtten = "-"
    const onChangePage = (event, nextPage) => {
        setPage(nextPage)
        localStorage.setItem("prevPage", nextPage)
        axios.get(`${baseUrl}/customers/getarticles?page=${++nextPage}`)
        .then((res) => {
          setCount(res.data.result)
          let dataObj = {}
          let dataList = []
          setDataCount(res.data.total)
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
    const onChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value)
    }
    const getPage  = () => {
      setPage(loadpage)
      localStorage.removeItem("prevPage")
    }
    const getData =() => {
        axios.get(`${baseUrl}/customers/getarticles`)
        .then((res) => {
          setDataCount(res.data.total)
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
      getPage()
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
  
  
</Breadcrumbs>
<div className={classesCustom.articlesDetails}>
<Table data={data} setData = {setData} total = {dataCount} rowsPerPage={10} />
</div>

    {/* <TableContainer>
        <Table>
    <TableHead>
   <TableRow>
   <TableCell style= {{width : "50px"}}>S.No</TableCell>
     <TableCell style= {{width : "150px"}}>Date of publishing
</TableCell>
     <TableCell style= {{width : "150px"}}>Subject</TableCell>
     <TableCell style={{width : "400px", margin: "0 10px"}}>Heading</TableCell>
     
     <TableCell>Name of Writer</TableCell>
   </TableRow>
   </TableHead>

            <TableBody>
               {
                   data.map((i, e) => (
                    <TableRow>
                         <TableCell style={{padding: "8px 16px"}} className="tableCellStyle">
     
     {page * 10 + ++e}
   </TableCell>
                        <TableCell style= {{width : "150px"}}>
                            {i.publish_date.split("-").reverse().join("-")}
                            </TableCell>
                            <TableCell style= {{width : "150px"}}>
                            {CommonServices.capitalizeFirstLetter(i.type)}
                            </TableCell>
                    <TableCell style={{width : "400px", margin: "0 10px", wordBreak : "break-all"}} className="tableCellStyle">
                        <Link to = {{
                            pathname : "/customer/details",
                            index : i.id,
                            hash : i.type
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
            {
              dataCount > 9 ?
              <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                 
                  count = {dataCount}
                  rowsPerPage = {rowsPerPage}
                  page = {page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page"
                    }
                  }}
                  onChangePage = {onChangePage}
                  onChangeRowsPerPage = {onChangeRowsPerPage} 
                  //ActionsComponent={TablePaginationActions}
                  //component={Box}
                  labelDisplayedRows={({ page }) => {
                    return `Page: ${++page}`;
                  }}
                  backIconButtonProps={{
                    color: "secondary"
                  }}
                  nextIconButtonProps={{ color: "secondary" }}
                  showFirstButton={true}
                  showLastButton={true}
                  labelRowsPerPage={<span>Rows:</span>}
                  sx={{
                    ".MuiTablePagination-toolbar": {
                      backgroundColor: "rgba(100,100,100,0.5)"
                    },
                    ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                      fontWeight: "bold",
                      color: "blue"
                    }
                  }}
                />
              </TableRow>
            </TableFooter> : ""
            }
        </Table>
    
           
    </TableContainer> */}
          </div>
      
        </div>
      
       </MyContainer>
       <Footer />
</OuterloginContainer>
       </>
  
    )
}
export default Direct;
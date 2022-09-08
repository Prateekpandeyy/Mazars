import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../../config/config';
import Footer from '../../components/Footer/Footer';
import { Button, Box, Table,  Typography, TableContainer, TableFooter,
TableHead, TablePagination, TableBody, TableRow, TableCell } from "@material-ui/core";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import classesCustom from './design.module.css';
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
import CommonServices from "../../common/common";
import MyContainer from "../../components/Common/MyContainer";
import CustomHeading from "../../components/Common/CustomHeading";
import CustomTypography from "../../components/Common/CustomTypography";
import SubHeading from "../../components/Common/SubHeading";
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
          <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb" style={{fontSize : "18px"}}>
          <Link underline="hover" color="inherit" to="/customer/direct">
 
  Articles
 
  </Link>
  
  
</Breadcrumbs>

    <TableContainer>
        <Table>
    <TableHead>
   <TableRow>
   <TableCell style= {{width : "50px"}}>
    <SubHeading>
    S.No
    </SubHeading>
   </TableCell>
     <TableCell style= {{width : "200px"}}>
     <SubHeading>
     Date of publishing
    </SubHeading>
</TableCell>
     <TableCell style= {{width : "150px"}}>
      <SubHeading>
      Subject
      </SubHeading>
      </TableCell>
     <TableCell style={{width : "400px", margin: "0 10px"}}>
      <SubHeading>
      Heading
      </SubHeading>

     </TableCell>
     
     <TableCell>
      <SubHeading>
      Name of writer
      </SubHeading>
     </TableCell>
   </TableRow>
   </TableHead>

            <TableBody>
               {
                  data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, e) => (
                    <TableRow>
                         <TableCell style={{padding: "8px 16px"}} className="tableCellStyle">
     
     {page * 10 + ++e}
   </TableCell>
                        <TableCell style= {{width : "150px"}}>
                         <CustomTypography>
                         {i.publish_date.split("-").reverse().join("-")}
                         </CustomTypography>
                            </TableCell>
                            <TableCell style= {{width : "150px"}}>
                           <CustomTypography>
                           {CommonServices.capitalizeFirstLetter(i.type)}
                           </CustomTypography>
                            </TableCell>
                    <TableCell style={{width : "400px", margin: "0 10px", wordBreak : "break-all"}} className="tableCellStyle">
                        <Link to = {{
                            pathname : "/customer/details",
                            index : i.id,
                            hash : i.type
                        }}>
                  <CustomTypography>
                  {`${i.heading}` } 
                  </CustomTypography>
                
                        </Link>
                    </TableCell>
                    <TableCell>
                       <CustomTypography>
                       {i.writer}
                       </CustomTypography>
                            </TableCell>
                </TableRow>
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
            {/* {
              dataCount > 9 ?
              <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                 
                  count = {dataCount}
                  rowsPerPage = {10}
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
            } */}
        </Table>
    
           
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
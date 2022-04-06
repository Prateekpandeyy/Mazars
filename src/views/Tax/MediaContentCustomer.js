import React, {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import { baseUrl } from '../../config/config';
import {Typography, Breadcrumbs, Table, TableContainer, Box,  
   TablePagination, TableBody, TableRow, TableCell} from "@material-ui/core";
import axios from 'axios';
import { Markup } from 'interweave';
import Footer from '../../components/Footer/Footer';
import CommonServices from '../../common/common.js';
import classesCustom from './design.module.css';
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
  const MyHeading = styled(Box)({
    display : "flex",
    justifyContent: "space-between"
  })
const MediaContentCustomer = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [myData, setMyData] = useState()
  const [ description, setDescription] = useState(false)
    useEffect(() => {
        getMediaData()
    }, [])
    const getMediaData = () => {
        axios.get(`${baseUrl}/customers/getgalleryupdated`)
        .then((res) => {
            console.log("res", res.data.result)
            setData(res.data.result)
        })
    }
    const onChangePage = (event, nextPage) => {
        setPage(nextPage)
      }
      const onChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value)
      }
      const getData = (e) => {
        setDescription(true);
        console.log("eee", e.publish_date.split(" ")[0].split("-").reverse().join("-"))
        setMyData(e)
         }     
    return(
        <>
      
        <Header noSign="noSign" />
        <MyContainer>
       {
           description === false ?
           <div className={classesCustom.articleContent}>
     <div className={classesCustom.articlesDetails}>
              <TableContainer>
             <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
             <Link underline="hover" color="inherit" to="/customer/media">
  Media Gallery
  </Link>
  <Typography color="text.primary">  Media News</Typography>
        
       
        </Breadcrumbs>
          <Table>
            <TableBody>
            {
        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, e) => (
              <TableRow>
               
               <TableCell className="tableCellStyle" style={{cursor: "pointer"}} onClick={(p) => getData(i)}>
             
          <span className="updatesLink">
           {`${e + 1} . ${i.heading} -    ${i.publish_date.split(" ")[0].split("-").reverse().join("-")}`}
        
        </span>
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
           onChangeRowsPerPage = {onChangeRowsPerPage}
            /> : ""
         }
          </TableContainer>
              </div>
              </div> : ""
       }
        {description === true ?
         <div className="StartPageDetails">
         <div className="mainContent222">
         <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
         <Link underline="hover" color="inherit" to="/customer/media">
  Media Gallery
  </Link>
        <Link underline="hover" color="inherit" to={{
          pathname : "/customer/mediacontent",
          index : 2
        }}>
       Media News
        </Link>
        <Typography color="text.primary">{myData.heading}</Typography>
        </Breadcrumbs>
       <div style={{margin: "20px 0px 10px 0px"}}>
       <div>
           <MyHeading>
           <h5>  {CommonServices.capitalizeFirstLetter(myData.heading)}</h5>
          
         
           </MyHeading>

           <h6>Date -   {myData.publish_date.split(" ")[0].split("-").reverse().join("-")} </h6>
         
            
             </div>
             <Markup content={myData.content} />
       </div>
       </div>
      
      </div>
       : ""}
       </MyContainer>
       <Footer />
       </>
  
    )
}
export default MediaContentCustomer;
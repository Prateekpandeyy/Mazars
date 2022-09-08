import React, {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import { baseUrl } from '../../config/config';
import {Typography, Breadcrumbs, Table, TableHead,  TableContainer, Box,  
   TablePagination, TableBody, TableRow, TableCell} from "@material-ui/core";
import axios from 'axios';
import { Markup } from 'interweave';
import Footer from '../../components/Footer/Footer';
import CommonServices from '../../common/common.js';
import classesCustom from './design.module.css';
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
import MyContainer from "../../components/Common/MyContainer";
import CustomTypography from "../../components/Common/CustomTypography";
import SubHeading from "../../components/Common/SubHeading";
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
      let dataObj = {}
      let dataList = []
        axios.get(`${baseUrl}/customers/getgalleryupdated`)
        .then((res) => {
            // console.log("res", res.data.result)
            // setData(res.data.result)
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
      
       <OuterloginContainer>
       <Header noSign="noSign" />
        <MyContainer>
       {
           description === false ?
           <div className={classesCustom.articleContent}>
     <div className={classesCustom.articlesDetails}>
            
             <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
             <Link underline="hover" color="inherit" to="/customer/media">
  Media gallery
  </Link>
  <Typography color="text.primary">  Media news</Typography>
        
       
        </Breadcrumbs>
           <div className={classesCustom.articlesDetails}>
    <Table>
    <TableHead>
   <TableRow>
     <TableCell style= {{width : "50px"}}>
      <SubHeading>
      S.No
      </SubHeading>
     </TableCell>
     <TableCell style={{width : "200px"}}>
      <SubHeading>
      Date of publishing
      </SubHeading>
</TableCell>
     <TableCell>
      <SubHeading>
      Heading
      </SubHeading> </TableCell>
   </TableRow>
   </TableHead>
      <TableBody>
      {
 data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, e) => (
 
 <>

  
    <TableRow>
      <TableCell style={{padding: "8px 16px"}} className="tableCellStyle">
     
       <CustomTypography>
       {i.sn}
       </CustomTypography>
      </TableCell>
      <TableCell>
      <CustomTypography>
      {i.publish_date.split(" ")[0].split("-").reverse().join("-")}
      </CustomTypography>
      </TableCell>
      <TableCell>
     <span onClick={(p) => getData(i)} className="primary" style={{cursor  : "pointer"}}>
     <CustomTypography>
     {i.heading}
     </CustomTypography>
     </span>
 
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
              </div> : ""
       }
        {description === true ?
       <div className={classesCustom.articleContent}>
       <div className={classesCustom.articlesDetails}>
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
       </OuterloginContainer>
       </>
  
    )
}
export default MediaContentCustomer;
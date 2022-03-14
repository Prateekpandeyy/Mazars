import React from 'react';
import Layout from "../../../components/Layout/Layout";
import { Container, Box, Paper } from '@material-ui/core';
import {  styled } from '@mui/material';
import { useHistory, useParams } from 'react-router';
const MyContainer = styled(Container)({

})
const MyBox = styled(Box)({
    display: "flex",
    width: "100%", 
    height: "500px",
    justifyContent: "center",
    alignItems: "center"
  })
  const InnerBox = styled(Paper)({
    display :"flex",
    flexDirection: "column",
    padding: "20px",
    minHeight: "300px",
    width: "400px",
    lineHeight : "30px",
    borderRadius: "10px"
  })
const MediaContent = () => {
    const userId = window.localStorage.getItem("adminkey");
    let history = useHistory()
    return(
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>

        <MyContainer>
           
             {/* <button 
            
              className="autoWidthBtn rightAlign my-2" onClick={(e) => {
                history.push("/admin/articles")
              }}>Add Articles</button> */}
                <div className="headingContent">
                <h4>Media </h4>
                <button 
            
            className="autoWidthBtn rightAlign my-2" onClick={(e) => {
              history.push("/admin/mediagallery")
            }}>New Media Gallery</button> 
                </div>
                </MyContainer>
                </Layout>
    )
}
export default MediaContent;
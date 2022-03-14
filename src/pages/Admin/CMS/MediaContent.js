import React, {useState, useEffect} from 'react';
import Layout from "../../../components/Layout/Layout";
import { Container, Box, Paper } from '@material-ui/core';
import {  styled } from '@mui/material';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { baseUrl, baseUrl3 } from '../../../config/config';
import {DeleteIcon} from "../../../components/Common/MessageIcon"
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
  const [galleryData, setGalleryData] = useState([])
    const userId = window.localStorage.getItem("adminkey");
    useEffect(() => {
      getGalleryData()
    }, [])
    const getGalleryData = () => {
    
      axios.get(`${baseUrl}/customers/getgallery`)
      .then((res) => {
        console.log("res", res.data.result)
        setGalleryData(res.data.result)
      })
    }
    let history = useHistory()
    return(
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>

        <MyContainer>
                <div className="headingContent">
                <h4>Media </h4>
                <button 
            
            className="autoWidthBtn rightAlign my-2" onClick={(e) => {
              history.push("/admin/mediagallery")
            }}>New Media Gallery</button> 
                </div>
                <div className="galleryContainer">
                 
                 {
                   galleryData.map((i) => (
                    <div className="galleryBox"> 
                    <h4>{i.title}</h4> 
                    <img src={`${baseUrl3}/assets/gallery/${i.name}`} /></div>
                   ))
                 }
               <span>
               <DeleteIcon />
               </span>
                </div>
                </MyContainer>
                </Layout>
    )
}
export default MediaContent;
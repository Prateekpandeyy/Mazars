import React , {useState, useEffect} from "react";
import { styled , makeStyles} from "@material-ui/styles";
import { baseUrl, baseUrl3 } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import {Container } from '@material-ui/core';
import { useHistory } from "react-router";
import {DeleteIcon} from "../../../components/Common/MessageIcon";
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import {
 
  Row,
  Col,
  
} from "reactstrap";
import CustomHeading from '../../../components/Common/CustomHeading';
const MyContainer = styled(Container)({

})
const GroupImage = () => {
  const [galleryData, setGalleryData] = useState([])
  const [imageId, setImageId] = useState(0)
  const userId = window.localStorage.getItem("adminkey");
  let history = useHistory();
  const token = localStorage.getItem("token")
  const myConfig = {
    headers : {
     "uit" : token
    }
  }
    useEffect(() => {
      getImages()
    }, [])
 
    const getImages = () => {
   if(history.location.index){
     
   
    axios.get(`${baseUrl}/cms/getgallarylist?uid=${JSON.parse(userId)}&type=image&id=${history.location.index.id}`, myConfig)
    .then((res) => {
     setImageId(res.data.result)
      setGalleryData(res.data.files)
      
    })
    }
    
  }
  const del = (e) => {
 console.log("eee", e)

    Swal.fire({
        title: "Are you sure?",
        text: "Want to delete Photo? Yes, delete it!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.value) {
          axios.get(`${baseUrl}/cms/deleteimage?uid=${JSON.parse(userId)}&id=${imageId[0].id}&imageid=${e.imageid}`, myConfig)
          .then((res) => {
console.log("response", res)
if(res.data.code === 1){
Swal.fire({
  title : "success",
  html  : "Photo deleted successfully",
  icon : "success"
})
getImages()
}
else if (res.data.code === 102){
  history.push("/cms/login")
}
else{
Swal.fire({
  title :"error",
  html : "Something went wrong , please try again",
  icon : "error"
})
}
          })
        }
    });
};
    return(
        <>
    <Layout cmsDashboard="cmsDashboard">
 <MyContainer>
 <div className="py-2">
      <Row>
          <Col md="4">
          <button
                className="autoWidthBtn" 
                onClick={() => history.goBack()}
              >
               
                Go Back
              </button>
              
            </Col>
            <Col md="4" align="center">
              <CustomHeading>
                Photo gallery
              </CustomHeading>
             
            </Col>
            </Row>
        </div>
 <div className="galleryContainer">
  
 {
                   galleryData.map((i) => (
                    <div className="galleryBox" key={i.id}> 
                    
                  
                     <a src={`${baseUrl3}/assets/gallery/${i.name}`} style={{display : "flex", flexDirection : "column", height : "80%", overflow : "hidden"}} target = "_blank" >
                    <img  id={i.id} key={i.id} src={`${baseUrl3}/assets/gallery/${i.name.split(".")[0] +  "_thumb." + i.name.split(".")[1]}`} />
                  <h4 style={{margin: "5px 10px"}}>{imageId[0].title}</h4>
                  </a>
                   
                  
                  <div className="delIcon">
                  <span title="Delete Photo" onClick={() => del(i)}>
                   <DeleteIcon />
                   </span>

                    </div>
                 
                   </div>
                  
                  ))
                 }
              
                </div>
 </MyContainer>
       </Layout>  
       </>
    )
}
export default GroupImage;
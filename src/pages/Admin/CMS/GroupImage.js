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
const MyContainer = styled(Container)({

})
const GroupImage = () => {
  const [galleryData, setGalleryData] = useState([])
  const userId = window.localStorage.getItem("adminkey");
  let history = useHistory();
  
    useEffect(() => {
      getImages()
    }, [])
 
    const getImages = () => {
   if(history.location.index){
     
   
    axios.get(`${baseUrl}/cms/getgallarylist?uid=${JSON.parse(userId)}&type=image&id=${history.location.index.id}`)
    .then((res) => {
     
      setGalleryData(res.data.result)
      
    })
    }
    
  }
  const del = (e) => {
 

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
          axios.get(`${baseUrl}/cms/deleteimage?uid=${JSON.parse(userId)}&id=${e.imageid}&imageid=${e.id}`)
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
     <Layout adminDashboard="adminDashboard" adminUserId={userId}>   
     
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
              <h4>Photo Gallery</h4>
            </Col>
            </Row>
        </div>
 <div className="galleryContainer">
                 
 {
                   galleryData.map((i) => (
                    <div className="galleryBox" key={i.id}> 
                    
                  
                     <Link style={{display : "flex", height : "80%", overflow : "hidden"}} to = {{
                      pathname : "/admin/imagegallery", 
                      index : i
                    }}>
                    <img  id={i.id} key={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`} />
                  <h4 style={{margin: "5px 10px"}}>{i.title}</h4>
                  </Link>
                   
                  
                  <div className="delIcon">
                  <span title="Delete Photo" onClick={() => del(i)}>
                   <DeleteIcon />
                   </span>
                   <h6>
                     {i.created_date.split(" ")[0].split("-").reverse().join("-")}
                   </h6>
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
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
const MyContainer = styled(Container)({

})
const Groupvideo = () => {
  const [galleryData, setGalleryData] = useState([])
  const userId = window.localStorage.getItem("adminkey");
  let history = useHistory();
  
    useEffect(() => {
      getImages()
    }, [])
 
    const getImages = () => {
   if(history.location.index){
     
   
    axios.get(`${baseUrl}/cms/getgallarylist?uid=${JSON.parse(userId)}&type=video&id=${history.location.index.id}`)
    .then((res) => {
     
      setGalleryData(res.data.result)
      
    })
    }
    
  }
  const del = (e) => {
 

    Swal.fire({
        title: "Are you sure?",
        text: "Want to delete articles? Yes, delete it!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.value) {
          axios.get(`${baseUrl}/cms/deletevideo?uid=${JSON.parse(userId)}&id=${e.id}&imageid=${e.imageid}`)
          .then((res) => {
console.log("response", res)
if(res.data.code === 1){
Swal.fire({
  title : "success",
  html  : "Articles deleted successfully",
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
 <div className="galleryContainer">
                 
 {
                   galleryData.map((i) => (
                    <div className="galleryBox" key={i.id}> 
                    
                    {/* <img id={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`}
                    onClick={() => enLarge(i.id)} /> */}
                     <Link style={{display : "flex", height : "80%", overflow : "hidden"}} to = {{
                      pathname : "/admin/imagegallery", 
                      index : i
                    }}>
                  <video id={i.id} src={`${baseUrl3}/assets/gallery/${i.name}`}></video>
                  <h4 style={{margin: "5px 10px"}}>{i.title}</h4>
                  </Link>
                   
                  
                  <div className="delIcon">
                  <span title="Delete Media" onClick={() => del(i)}>
                   <DeleteIcon />
                   </span>
                   <h6>
                     {i.created_date}
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
export default Groupvideo;
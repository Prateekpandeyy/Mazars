import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import Data from './directData.js';
import Footer from '../../components/Footer/Footer';
import { useHistory, useParams  } from 'react-router';
import axios from 'axios';
import { baseUrl , baseUrl3} from '../../config/config';
import { Markup } from 'interweave';
import ReactPlayer from "react-player";
import CloseIcon from '@material-ui/icons/Close';
import {Breadcrumbs, Box, Typography  } from "@material-ui/core";
import pngAlbum from './album.png';
import classes from './design.module.css';
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
const VideoList = () => {
    const [galleryData, setGalleryData] = useState([])
    const userId = window.localStorage.getItem("adminkey");
    const [videoId, setVideoId] = useState()
    const [play, isPlay] = useState(false)
    useEffect(() => {
      getGalleryData()
    }, [])
    const getGalleryData = () => {
    
      axios.get(`${baseUrl}/customers/getvideogallery`)
      .then((res) => {
      
        setGalleryData(res.data.result)
      })
    }
    let history = useHistory()
    let kk = []
    const playVideo2 = (e) => {
        isPlay(true)
        setVideoId(`${baseUrl3}/assets/gallery/${e}`)
      }
  console.log("galleryData", galleryData)
    return(
        <>
     <OuterloginContainer>
     <Header noSign="noSign" />

<MyContainer>


<div className={classes.articleContent}>
{

<div className={classes.articlesDetails}>
<Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
<Link underline="hover" color="inherit" to="/customer/media">
Media Gallery
</Link>
<Typography color="text.primary">  Video Gallery</Typography>

</Breadcrumbs>

<div className={classes.articlesDetailsgallery}>
{

galleryData.map((i) => (



<div className="galleryBoxvideo">
<div style={{display : "flex", justifyContent: "center", height: "70%", width: "100%", alignItems: "center"}}>
<Link style={{display: "flex"}}
to = {{
                    pathname : "/customer/videogallery", 
                    index : i
                  }}>
     <img src={pngAlbum} 
  style={{display : "flex", width: "50%", height: "50%", margin: "auto" }}
   id={i.id} 
  />
                           
         </Link>
</div>
         <div style={{ padding: "5px 10px", width: "100%", justifyContent: "space-between"}}>
          <h5 style={{textAlign: "center"}}>{i.title}</h5>
          <h5 style={{textAlign: "center"}}>{i.created_date.split(" ")[0].split("-").reverse().join("-")}</h5>
              </div>
               </div>
))
}
</div>


</div>


}
</div>
{
play === true ?

<div className="modalBox">
<div className="boxContainer">
<div className="canBtn"  title="cancel">
<h4>Recording Player</h4>
<CloseIcon  onClick= {() => isPlay(false)} id="myBtn"/> </div>


<div className="my2">
<ReactPlayer
url={videoId}
controls={true}
playing={true}
/>
</div>
</div>

</div> : ""
}
</MyContainer>
<Footer />
     </OuterloginContainer>
               </>
    )
}
export default VideoList;
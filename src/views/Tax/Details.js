import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import Footer from '../../components/Footer/Footer';
import { useHistory, useParams  } from 'react-router';
import axios from 'axios';
import { baseUrl, baseUrl3 } from '../../config/config';
import { Markup } from 'interweave';
import {Breadcrumbs, Box, Typography } from "@material-ui/core";
import CommonServices from '../../common/common.js';
import {  VscFilePdf} from "react-icons/vsc";
import classes from './design.module.css';
import ima from "../../mazars_logo.png";
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
import { Link } from 'react-router-dom';
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
  const Disclamair = styled(Box)({
display: "flex",
flexDirection: "column",
width:"100%",
padding: "20px"
  })
  const ArticleWrapper = styled(Box)({
    display: "flex", 
    flexDirection: "column",
    border: "1px solid #081f8f",
    padding: "5px"
  })
  const ArticleHeader = styled(Box)({
    display : "flex",
    width: "100%",
    justifyContent: "space-between",
   
    backgroundColor: "#e4f0fa",
  
    padding: "10px 5px",
    margin: "8px 0px"
  })
  const MyLogo = styled(Box)({
    display : "flex",
    width: "100%",
    height: "auto",
    maxWidth: "100px",
    objectFit: "contain"
  })
  const MyHeading = styled(Box)({
    display : "flex",
    justifyContent: "space-between"
  })
  const RightContent = styled(Box)({
    display: "flex",
    flexDirection: "column"
  })
const Details = () => {
  let history = useHistory();
  let getId = useParams();
  const [data, setData] = useState([])
  const [linkdata, setLinkData] = useState("direct")
 
  useEffect(() => {
    getData()
  }, [])
  const getData = (e) => {
   
   if(history.location.index !== undefined){
    axios.get(`${baseUrl}/customers/getarticles?id=${history.location.index}`)
    .then((res) => {
     
      setData(res.data.result)
      if(history.location.hash == "#direct"){
        setLinkData("direct")
      }
      else if(history.location.hash == "#indirect"){
        setLinkData("indirect")
      }
    })
  }
}

    return(
       <>
       <OuterloginContainer>
       <Header noSign="noSign"/>
        <MyContainer>
   
  
        <div className={classes.articleContent}>
         {
           data.map((i) => (
            <div className={classes.articlesDetails}>
             <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
             <Link underline="hover" color="inherit" to="/customer/direct">
  Articles
  </Link>
  <Link underline="hover" color="inherit" to = {`/customer/${linkdata}`}>
  {CommonServices.capitalizeFirstLetter(linkdata) + " tax"}
  </Link>
  
 
</Breadcrumbs>
<ArticleWrapper>
<ArticleHeader>
<MyLogo>
<Link to = "/">
<img className={classes.myLogo} src={`${ima}`}/>
</Link>

</MyLogo>
<RightContent>
<h4 style={{color: "#081f8f"}}>Mazars Advisory Solutions (MAS)</h4>
<span style={{color: "#0071ce", fontSize: "18px"}}>Building Lasting Relationships</span>
<a href="https://www.masindia.live" target="_blank">www.masindia.live</a>
</RightContent>
  </ArticleHeader>
           <div>
           <MyHeading>
           <h5>  {CommonServices.capitalizeFirstLetter(i.heading)}</h5>
         
          <a href={`${baseUrl3}${i.file}`} target="_blank">
          <VscFilePdf style={{display: "flex", width: "40px", height: "40px"}} />
          </a>
         
         
           </MyHeading>
            <h6>Writer :  {i.writer} </h6>
            <h6> Email : {i.email} </h6>
           <h6>Date of publishing :   {i.publish_date.split("-").reverse().join("-")} </h6>
         
            
             </div>
     
    <Markup content={i.content} />
    <a href={`${baseUrl3}/${i.file}`} target="_blank" 
    className={classes.myLink}>

    <button className="downloadBtnPdf"> Download  <VscFilePdf style={{display: "flex",
     margin: "0 10px", color: "#e4f0fa", width: "20px", height: "20px"}} /></button>
    </a> 
    {/* <Disclamair>
      <h6>Disclaimer</h6>
      <h4>By clicking on the "AGREE" button below, the user hereby acknowledges having read and understood the disclaimer below:</h4>
  <ul>
    <li>The user on his own accord wishes to know more about Mazars Advisory Solutions (MAS) and any of its members for his own information and use.</li>
<li>The user acknowledges that there has been no solicitation, invitation, or inducement of any sort whatsoever from MAS or any of its members to create an Attorney/Consultant-Client relationship.</li>
  <li>The user acknowledges that MAS makes every effort to maintain updated and accurate information on this website and cannot accept responsibility for any prejudice, loss or damage which may occur from use of such information. MAS assumes no liability for the interpretation or use of content or information contained on this website, nor does it offer any warranty of any kind, either express or implied in relation to such content or information.</li>
 <li>     The user acknowledges that MAS does not intend that links / URLs contained on this website re-directing users to third party websites be considered as referrals to, endorsements of, or affiliations with any such third-party website operators. MAS is not responsible for, and makes no representation or warranty, express or implied, about the content or information contained on such third-party websites.
</li>
  </ul>
  <p className={classes.agree}>Agree</p>
    </Disclamair> */}
    </ArticleWrapper>
            </div>
        
           ))
         }
        </div>
      
       </MyContainer>
       <Footer />
       </OuterloginContainer>
       </>
  
    )
}
export default Details;
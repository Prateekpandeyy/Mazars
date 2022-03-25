import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { Box } from "@material-ui/core";
import { useHistory } from 'react-router';
import { Markup } from 'interweave';
import Footer from '../../components/Footer/Footer';
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
 
const LatestUpdates = () => {
    const [news, getNews] = useState([])
    const [pos,setPos] = useState(0);   
    const [run, setRun] = useState(true);
    const [description, setDescription] = useState({})
    let history = useHistory()
    let getId = history.location.index;
    let  width = 800
    useEffect(() => {
        latestNews()
      }, [])
      const latestNews = () => {
        axios.get(`${baseUrl}/customers/getnews`)
        .then((res) =>{
        let pp = []
        console.log("getId", getId, history)
          if(res.data.code === 1){
            res.data.result.map((i) => {
             pp.push(i)
             if(i.id === getId){
               console.log("fixedId", i)
               setDescription(i)
             }
            })
            getNews(pp)
          }
        })
      }
      const scrollEff = () => {
        if(run) setPos(p=>p<width? p+1: -width);        
      }
      
      useEffect(() => {
        const tm = setTimeout(scrollEff, 10);
        return () => clearTimeout(tm);
      },[pos]);
      
      const onMouseEnter = (e) => {
        // console.log("mouse enter");
        setRun(false);
      }
      
      const onMouseLeave = (e) => {
        // console.log("mouse leave");
        setRun(true);
        setPos(pos+1); // to trigger useEffect 
      }
      const styles = {
        position: "relative", 
        fontSize: "1em",
        right: pos + "px"
      };

    return(
       <>
        <Header noSign="noSign" />
        <MyContainer>
   
        <div style={{width: "100%", marginBottom : "15px", 
  padding: "3px 0px", fontSize: "14px", backgroundColor : "rgb(159 155 155 / 39%)"}}> 
  <h1 style={styles} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave} 
        >
  {
     news.map((i, e) => (
<>
<span style={{padding: "0px 20px", fontSize: "16px", color: "464b4b"}}> 

 <Link className="tabHover" to = {{
  pathname : "/customer/latestupdates",
  index : i.id
                        }}>
{i.heading} 
</Link> </span> {e < news.length - 1 === true ? <span> | </span> : ""}
</> 

     ))
   }
  </h1>
    </div>
    <div className="StartPageDetails">
          <div className="mainContent222">
          <h4>{description.heading} </h4>
   <Markup content={description.news} />

          </div>
      
        </div>
      
       </MyContainer>
       <Footer />
       </>
  
    )
}
export default LatestUpdates;
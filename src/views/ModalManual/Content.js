import React from 'react';
import { makeStyles, Button, Typography, Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
// import { Link} from "react-scroll";
import {Link} from 'react-router-dom';
import {mainScroll as scroll} from 'react-scroll';
import MyPDF from '../ManualImg/manual.pdf';
const Content  = () => {
    const goToRow = (e) => {
        console.log("e3", e)
            const anchor = document.querySelector(e)
            console.log("an", anchor)
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
         
    }
    return (
        <>
         <Container>
         <Card>
             {/* <CardHeader title={
                 <>
                  <Typography variant="h4">
                  Contents
               
                      </Typography>
                 </>
             }/> */}
             <div className="row mx-1 my-2">
                 <div className="col-md-6">
                 <Typography variant="h4">
                Mazars Contents
               
                      </Typography>
                 </div>
                 <div className="col-md-6" style={{display: "flex", justifyContent : "flex-end"}}>
                 <a href={MyPDF} className="btn btn-success" target="_blank"> 
                 Download Manual</a>
                
                     </div>
                 
                 </div>
            
                 <CardContent>
                   
<table style={{display : "flex", flexDirection : "column", width: "100vw"}}>
    <tr onClick = {() => goToRow("#onlyLogin")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
            For New Client Registration	
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex", justifyContent : "flex-end", width: "20vw"}}>
            02
        </td>
    </tr>
    <tr onClick = {() => goToRow("#existing")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        For Existing Client
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            05
        </td>
    </tr>

    <tr onClick = {() => goToRow("#forgetPassword")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Forgot Password 
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            06
        </td>
    </tr>
    <tr onClick = {() => goToRow("#changePassword")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Change Password	 
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            11
        </td>
    </tr>
    <tr onClick = {() => goToRow("#freshQuery")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Register Fresh Query
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            15
        </td>
    </tr>
   
    <tr onClick = {() => goToRow("#proposalProcessing")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Proposal processing  </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            29
        </td>
    </tr>
    <tr onClick = {() => goToRow("#assignProcess")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Assignment process
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            39
        </td>
    </tr>
    <tr onClick = {() => goToRow("#paymentProcess")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Making Payment
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            46
        </td>
    </tr>
    <tr onClick = {() => goToRow("#mazarDashboard")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Mazars Dashboard
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            53
        </td>
    </tr>
    <tr onClick = {() => goToRow("#showMessage")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Message Inbox
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            55
        </td>
    </tr>
    <tr onClick = {() => goToRow("#seceduler")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Scheduling a meeting
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            56
        </td>
    </tr>
    <tr onClick = {() => goToRow("#feedbackProcess")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Sending feedback
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            57
        </td>
    </tr>
  
                       
                       </table>
      
                 </CardContent>
           
         </Card>
     </Container>
        </>
    )
}
export default Content;
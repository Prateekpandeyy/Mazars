import React from 'react';
import { makeStyles, Button, Typography, Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
// import { Link} from "react-scroll";
import {Link} from 'react-router-dom';
import {mainScroll as scroll} from 'react-scroll';
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
             <CardHeader title={
                 <>
                  <Typography variant="h4">
                  Contents
               
                      </Typography>
                 </>
             }/>
            
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
    <tr onClick = {() => goToRow("#forgetPassword")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Change Password	 
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            09
        </td>
    </tr>
    <tr onClick = {() => goToRow("#query")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Register Fresh Query
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            12
        </td>
    </tr>
    <tr onClick = {() => goToRow("#query")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Query Detail Page – Basic Query Information
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            14
        </td>
    </tr>
    <tr onClick = {() => goToRow("#query")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Proposal  </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            15
        </td>
    </tr>
    <tr onClick = {() => goToRow("#query")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Engagement Letter
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            17
        </td>
    </tr>
    <tr onClick = {() => goToRow("#query")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Query Detail Page – Proposal
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            20
        </td>
    </tr>
    <tr onClick = {() => goToRow("#query")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Assignments
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            21
        </td>
    </tr>
    <tr onClick = {() => goToRow("#query")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Query Detail Page – Assignments
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            23
        </td>
    </tr>
    <tr onClick = {() => goToRow("#query")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Payment Status
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            24
        </td>
    </tr>
    <tr onClick = {() => goToRow("#inbox")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Inbox
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            28
        </td>
    </tr>
    <tr onClick = {() => goToRow("#feedback")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Feedback
          </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            29
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